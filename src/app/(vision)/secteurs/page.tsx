import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import { secteurs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Secteurs desservis",
  description: `Vision Lavage dessert ${site.baseVille}, Bromont, Magog, Granby, Trois-Rivières et la Rive-Sud. Lavage de vitres et lavage à pression près de chez vous.`,
  alternates: { canonical: `${site.url}/secteurs` },
};

export default function SecteursPage() {
  return (
    <>
      <section className="bg-dusk-gradient pt-28 pb-16">
        <Container>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-brand-100 ring-1 ring-white/15">
            Zone desservie
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-white text-balance sm:text-5xl">
            On lave dans votre coin.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-brand-100/90">
            Basés à {site.baseVille}, on rayonne dans le Centre-du-Québec, l'Estrie et la Rive-Sud.
            Trouvez votre ville ci-dessous.
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {secteurs.map((v) => (
              <Link
                key={v.slug}
                href={`/secteurs/${v.slug}`}
                className="group flex flex-col rounded-3xl bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-ink/5 transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-brand-600/10 text-brand-700">
                    <MapPin className="size-5" aria-hidden />
                  </span>
                  <h2 className="text-lg font-semibold text-ink">{v.name}</h2>
                </div>
                <p className="mt-4 flex-1 text-ink-soft">{v.blurb}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700">
                  Lavage à {v.name}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
