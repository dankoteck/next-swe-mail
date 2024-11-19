import Sidebar from "@/components/ui/sidebar";

import "./styles.css";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="">
      <div className="space-y-1 border-b border-primary pb-6">
        <h1 className="text-3xl">CREATE NEW COLLECTION</h1>
        <h2 className="text-lg">Add new collection</h2>
      </div>

      <div className="grid grid-cols-12 gap-4 pt-6">
        <Sidebar />

        <article className="col-span-9">{children}</article>
      </div>
    </section>
  );
}
