import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = {
  title: "Sales Leads",
  description: "Import and browse sales leads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/leads">Leads</Link>
          <Link href="/leads/import">Import CSV</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
