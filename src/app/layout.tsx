import type { Metadata } from "next";
import { Hanken_Grotesk, Fraunces, Inter_Tight } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const bodyFont = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

// Police du site Lussier Électrique (route /lussier).
// L'original utilise Stack Sans Text, une police propriétaire hébergée par
// Framer ; Inter Tight en est le substitut libre le plus proche.
const interTight = Inter_Tight({
  variable: "--font-lussier-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr-CA"
      className={`${bodyFont.variable} ${fraunces.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
