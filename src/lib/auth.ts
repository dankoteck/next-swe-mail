import { Google } from "arctic";

const redirectURI = "http://localhost:3000/api/login/google/callback";

export const google = new Google(
  process.env.AUTH_GOOGLE_ID!,
  process.env.AUTH_GOOGLE_SECRET!,
  redirectURI
);
