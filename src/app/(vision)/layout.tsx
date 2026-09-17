import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingCTA } from "@/components/floating-cta";
import { site } from "@/lib/site";

export const metadata: Metadata = {
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

/**
 * Habillage du site Vision Lavage : en-tête, pied de page et CTA flottant.
 * Isolé du groupe (modora), qui a son propre habillage.
 */
export default function VisionLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-full flex-col bg-cream text-ink">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <FloatingCTA />
      {/* Espace pour ne pas masquer le pied de page sous le CTA flottant mobile */}
      <div className="h-20 md:hidden" aria-hidden />
    </div>
  );
}
