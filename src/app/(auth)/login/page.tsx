import { getCurrentSession } from "@/lib/session";
import { redirect } from "next/navigation";
import LoginForm from "./form";

export default async function Page() {
  const { session } = await getCurrentSession();

  if (session !== null) {
    return redirect("/");
  }

  return (
    <section className="flex h-full w-full items-center justify-center">
      <LoginForm />
    </section>
  );
}
