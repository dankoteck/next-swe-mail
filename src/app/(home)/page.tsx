import { Button } from "@/components/ui/button";
import { getCurrentSession } from "@/lib/session";
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const { session } = await getCurrentSession();

  if (session === null) {
    return redirect("/login");
  }

  return (
    <section className="h-full w-full space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl">Next SWE Mail</h1>
        <h2 className="text-lg">
          All you need about research, developments, etc... is in here.
        </h2>
      </div>

      <div className="flex items-center justify-between">
        <Button asChild size="lg">
          <Link href="/create">
            <Plus className="size-6" />
            <span className="text-lg">Create</span>
          </Link>
        </Button>
      </div>
    </section>
  );
}
