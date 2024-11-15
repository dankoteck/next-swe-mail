import { db } from "@/db";
import { userTable } from "@/db/schema";
import { google } from "@/lib/auth";
import { createSession } from "@/lib/session";
import { decodeIdToken, OAuth2Tokens } from "arctic";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

type ClaimsPayload = {
  sub: string;
  name?: string;
};

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const cookieStore = await cookies();

  const storedState = cookieStore.get("google_oauth_state")?.value ?? null;
  const codeVerifier = cookieStore.get("google_code_verifier")?.value ?? null;

  if (
    code === null ||
    state === null ||
    storedState === null ||
    codeVerifier === null
  ) {
    return new Response(null, { status: 400 });
  }

  if (state !== storedState) {
    return new Response(null, { status: 400 });
  }

  let tokens: OAuth2Tokens;
  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier);
  } catch (e) {
    console.error(e);
    // Invalid code or client credentials
    return new Response(null, { status: 400 });
  }

  const claims = decodeIdToken(tokens.idToken()) as ClaimsPayload;
  const googleId = claims.sub;

  const existingUser = await db.query.userTable.findFirst({
    where: eq(userTable.googleId, googleId),
  });

  if (typeof existingUser !== "undefined") {
    await createSession(existingUser.id);

    return new Response(null, {
      status: 302,
      headers: { Location: "/" },
    });
  }

  const name = claims.name;
  const user = await db
    .insert(userTable)
    .values({ googleId, name })
    .returning({ id: userTable.id });

  await createSession(user[0].id);

  return new Response(null, {
    status: 302,
    headers: { Location: "/" },
  });
}
