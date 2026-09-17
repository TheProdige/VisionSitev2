import type { Metadata } from "next";
import Image from "next/image";
import { HeartHandshake, Leaf, MapPin, Sparkles } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand } from "@/components/cta-band";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos",
  description: `Vision Lavage, c'est un crew local basé à ${site.baseVille} qui prend soin de vos vitres et de vos surfaces comme si c'était les siennes.`,
  alternates: { canonical: `${site.url}/a-propos` },
};

export default function AProposPage() {
  return (
    <>
      <section className="bg-dusk-gradient pt-28 pb-16">
        <Container>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-brand-100 ring-1 ring-white/15">
            Notre histoire
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-white text-balance sm:text-5xl">
            Un crew local, un standard élevé, une van bien remplie.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-brand-100/90">
            Vision Lavage est né d'une idée simple : offrir un service de lavage soigné, ponctuel et
            humain, à un prix honnête — sans les tracas des grosses franchises.
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[var(--shadow-soft)]">
              <Image
                src="/heros/crew/crew-B.png"
                alt="Le crew Vision Lavage et son matériel devant la camionnette turquoise."
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <SectionHeading
                eyebrow="Ce qui nous distingue"
                title="On fait les choses comme du monde."
                intro={`Basés à ${site.baseVille}, on connaît la région et on tient à notre réputation. Chaque contrat compte.`}
              />
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {[
                  { icon: Sparkles, title: "Minutieux", text: "On soigne chaque détail, jusqu'aux recoins qu'on ne voit pas au premier regard." },
                  { icon: HeartHandshake, title: "Humain", text: "Un vrai contact, des réponses claires, du respect pour votre propriété." },
                  { icon: Leaf, title: "Responsable", text: "Eau purifiée et produits doux, sans danger pour vos plantes et l'environnement." },
                  { icon: MapPin, title: "Local", text: "On habite la région et on s'y déplace avec plaisir. Votre coin, c'est le nôtre." },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="rounded-2xl bg-sand-100 p-5">
                    <Icon className="size-6 text-brand-600" aria-hidden />
                    <h3 className="mt-3 font-semibold text-ink">{title}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-sand-100 py-16">
        <Container>
          <div className="rounded-3xl bg-white p-8 text-center shadow-[var(--shadow-card)] ring-1 ring-ink/5 sm:p-12">
            <p className="font-display text-2xl font-semibold text-ink text-balance sm:text-3xl">
              « Satisfaction garantie : si quelque chose ne vous convient pas, on revient le corriger. »
            </p>
            <p className="mt-4 text-ink-soft">— L'engagement Vision Lavage</p>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
