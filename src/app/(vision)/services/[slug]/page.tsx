import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading, Eyebrow } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { CtaBand } from "@/components/cta-band";
import { services, site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} à ${site.baseVille}`,
    description: service.metaDescription,
    alternates: { canonical: `${site.url}/services/${service.slug}` },
    openGraph: {
      title: `${service.name} — ${site.name}`,
      description: service.metaDescription,
      images: [{ url: service.image }],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const other = services.find((s) => s.slug !== service.slug);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* En-tête */}
      <section className="relative isolate overflow-hidden">
        <Image
          src={service.image}
          alt={`${service.name} par Vision Lavage`}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-golden-veil" aria-hidden />
        <Container className="flex min-h-[52vh] flex-col justify-center py-24">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-white ring-1 ring-white/25 backdrop-blur-sm">
            <span aria-hidden>{service.emoji}</span> Service
          </span>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tight text-white text-balance sm:text-5xl">
            {service.name} à {site.baseVille}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">{service.hook}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/soumission" variant="primary" size="lg">
              Obtenir ma soumission gratuite →
            </ButtonLink>
            <ButtonLink href={`tel:${site.phoneHref}`} variant="outline" size="lg">
              <Phone className="size-5" aria-hidden />
              {site.phoneDisplay}
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Ce qui est inclus */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <SectionHeading
              eyebrow="Ce qui est inclus"
              title={service.short}
              intro="Un travail complet, soigné, du premier au dernier détail."
            />
            <ul className="grid gap-3">
              {service.inclus.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-white p-4 text-ink shadow-sm ring-1 ring-ink/5"
                >
                  <CheckCircle2 className="size-5 shrink-0 text-brand-600" aria-hidden />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-sand-100 py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Questions fréquentes" title="Bon à savoir" align="center" />
          <div className="mx-auto mt-10 max-w-3xl divide-y divide-ink/10 overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-card)] ring-1 ring-ink/5">
            {service.faq.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                  {f.q}
                  <span className="text-brand-600 transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-3 text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Autre service */}
      {other && (
        <section className="py-16">
          <Container>
            <Link
              href={`/services/${other.slug}`}
              className="group flex flex-col items-start justify-between gap-4 rounded-3xl bg-white p-7 shadow-[var(--shadow-card)] ring-1 ring-ink/5 sm:flex-row sm:items-center"
            >
              <div>
                <Eyebrow>Autre service</Eyebrow>
                <p className="mt-2 text-xl font-semibold text-ink">
                  {other.emoji} {other.name}
                </p>
                <p className="text-ink-soft">{other.short}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 font-bold text-brand-700">
                Découvrir
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          </Container>
        </section>
      )}

      <CtaBand title={`Un extérieur qui brille à ${site.baseVille} et partout autour.`} />
    </>
  );
}
