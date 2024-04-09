import { TopMenu } from "@/components/ui/TopMenu";
import { inter } from "@/config/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Testlo | Shop",
  description: "Online product shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopMenu />
        {children}
      </body>
    </html>
  );
}
