import { Inter as FontSans } from "next/font/google";

import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Blog",
  description: "Esta pagina esta desarollada por ibra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={cn("font-sans dark", fontSans.variable)}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
