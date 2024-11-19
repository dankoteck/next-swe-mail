"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { text: "General", href: "/create/general" },
  { text: "Text Coding", href: "/create/text-coding" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="col-span-3">
      <nav>
        <ul className="space-y-6">
          {nav.map((item, idx) => (
            <li key={idx}>
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
