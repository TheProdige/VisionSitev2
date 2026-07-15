import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingCTA } from "@/components/floating-cta";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Lavage de vitres et lavage à pression à ${site.baseVille}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "lavage de vitres",
    "lavage à pression",
    "nettoyage de vitres Drummondville",
    "lavage à pression Drummondville",
    "laveur de vitres",
    site.baseVille,
  ],
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Vitres et surfaces éclatantes`,
    description: site.description,
    images: [{ url: "/heros/crew/crew-wide.png", width: 2048, height: 1152, alt: site.name }],
  },
  alternates: { canonical: site.url },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr-CA"
      className={`${bodyFont.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <FloatingCTA />
        {/* Espace pour ne pas masquer le pied de page sous le CTA flottant mobile */}
        <div className="h-20 md:hidden" aria-hidden />
      </body>
    </html>
  );
}
