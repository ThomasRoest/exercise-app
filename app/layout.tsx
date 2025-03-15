import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HtmlRoot } from "@/components/HtmlRoot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fit app",
  description: "fit app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HtmlRoot>
      <body className={inter.className}>
        {children}
      </body>
    </HtmlRoot>
  );
}
