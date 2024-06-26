import { inter } from "@/config/fonts";
import { Providers } from "@/providers/Providers";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tusitioweb.com"),
  title: {
    template: "%s - Testlo | Shop",
    default: "Home - Testlo | Shop",
  },
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
