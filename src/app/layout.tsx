import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const font = localFont({
  src: "./fonts/ComicShanns.otf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next SWE Mail",
  description:
    "A product made by bitA, for bitA. It streamlines all SWE mail tasks, making the process easier and more efficient.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <main className="container h-full w-full py-10">{children}</main>
      </body>
    </html>
  );
}
