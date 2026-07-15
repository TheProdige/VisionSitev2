import { secteurs, services, site } from "@/lib/site";

/**
 * Données structurées schema.org LocalBusiness — aide Google à comprendre
 * l'entreprise, la zone desservie et les services (SEO local).
 */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: site.phoneHref,
    image: `${site.url}/heros/crew/crew-wide.png`,
    priceRange: "$$",
    areaServed: secteurs.map((v) => ({ "@type": "City", name: v.name })),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.baseVille,
      addressRegion: "QC",
      addressCountry: "CA",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de lavage",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, description: s.short },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
