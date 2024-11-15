import { Button } from "@/components/ui/button";
import { getCurrentSession, invalidateSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const { session } = await getCurrentSession();

  if (session === null) {
    return redirect("/login");
  }

  const logout = async (): Promise<never> => {
    "use server";
    await invalidateSession(session.id);
    return redirect("/login");
  };

  return (
    <main className="">
      <form action={logout}>
        <Button type="submit">Log out</Button>
      </form>
    </main>
  );
}
