import Link from "next/link";

export default function Page() {
  return (
    <section className="">
      <h1 className="">Login</h1>
      <Link href="/api/login/google">Sign in with Google</Link>
    </section>
  );
}
