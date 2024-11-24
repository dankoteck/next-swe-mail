import Sidebar from "@/components/ui/sidebar";

import "./styles.css";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-full">
      <div className="space-y-1 border-b border-primary pb-6">
        <h1 className="text-3xl">CREATE</h1>
        <h2 className="text-lg">Add new template</h2>
      </div>

      <div className="grid h-full grid-cols-12 gap-4 pt-6">
        <Sidebar />
        <article className="col-span-9 h-full">{children}</article>
      </div>
    </section>
  );
}
