import { Metadata } from "next";
import { Rajdhani, DM_Sans } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = { title: 'Horizon' }

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr" className={`${rajdhani.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}

