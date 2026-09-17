import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { CtaBand } from "@/components/cta-band";
import { secteurs, services, site } from "@/lib/site";

export function generateStaticParams() {
  return secteurs.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = secteurs.find((s) => s.slug === slug);
  if (!v) return {};
  return {
    title: `Lavage de vitres et lavage à pression à ${v.name}`,
    description: `Vision Lavage offre le lavage de vitres et le lavage à pression à ${v.name}. ${v.blurb} Estimation gratuite, sans engagement.`,
    alternates: { canonical: `${site.url}/secteurs/${v.slug}` },
  };
}

export default async function SecteurPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const v = secteurs.find((s) => s.slug === slug);
  if (!v) notFound();

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <Image
          src="/heros/crew/crew-wide.png"
          alt={`Vision Lavage à ${v.name}`}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-golden-veil" aria-hidden />
        <Container className="flex min-h-[50vh] flex-col justify-center py-24">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-white ring-1 ring-white/25 backdrop-blur-sm">
            <MapPin className="size-3.5" aria-hidden /> Secteur desservi
          </span>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-semibold leading-tight text-white text-balance sm:text-5xl">
            Lavage de vitres et à pression à {v.name}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/90">{v.blurb}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/soumission" variant="primary" size="lg">
              Soumission gratuite à {v.name} →
            </ButtonLink>
            <ButtonLink href={`tel:${site.phoneHref}`} variant="outline" size="lg">
              <Phone className="size-5" aria-hidden />
              {site.phoneDisplay}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={`Nos services à ${v.name}`}
            title={`Un fini éclatant, livré à ${v.name}.`}
            intro={`Que ce soit pour vos vitres ou vos surfaces extérieures, le crew Vision Lavage se déplace à ${v.name} avec le même souci du détail qu'à ${site.baseVille}.`}
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col rounded-3xl bg-white p-7 shadow-[var(--shadow-card)] ring-1 ring-ink/5 transition-transform hover:-translate-y-1"
              >
                <p className="text-xl font-semibold text-ink">
                  {s.emoji} {s.name}
                </p>
                <p className="mt-2 text-ink-soft">{s.short}</p>
                <ul className="mt-5 grid gap-2">
                  {s.inclus.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-ink-soft">
                      <CheckCircle2 className="size-4 shrink-0 text-brand-500" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700">
                  Voir le service
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-ink-soft">
            <Link href="/secteurs" className="font-semibold text-brand-700 underline-wave">
              ← Tous les secteurs desservis
            </Link>
          </p>
        </Container>
      </section>

      <CtaBand title={`Prêt à faire briller votre propriété à ${v.name} ?`} />
    </>
  );
}
