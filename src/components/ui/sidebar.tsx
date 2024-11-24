"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { text: "Information", href: "/create/information" },
  { text: "Source Code", href: "/create/source-code" },
  { text: "Preview", href: "/create/preview" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="col-span-3">
      <nav>
        <ul className="space-y-6">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "block rounded-md px-4 py-2 transition-colors duration-200 hover:underline",
                  { "bg-primary text-white": pathname === item.href },
                )}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
