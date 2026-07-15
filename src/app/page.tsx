import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Sparkles,
  SprayCan,
  ThumbsUp,
} from "lucide-react";
import { Container } from "@/components/container";
import { Hero } from "@/components/home/hero";
import { Testimonials } from "@/components/home/testimonials";
import { SectionHeading, Eyebrow } from "@/components/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { LocalBusinessJsonLd } from "@/components/json-ld";
import { secteurs, services, site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Hero />

      {/* Bandeau de réassurance */}
      <section className="border-b border-ink/5 bg-cream">
        <Container className="grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
          {[
            { icon: MapPin, label: "Basé à Drummondville", sub: "Service local et rapide" },
            { icon: ShieldCheck, label: "Entreprise assurée", sub: "Vous êtes protégé" },
            { icon: ThumbsUp, label: "Satisfaction garantie", sub: "On reprend au besoin" },
            { icon: CalendarCheck, label: "Estimation gratuite", sub: "Sans engagement" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-start gap-3">
              <Icon className="mt-0.5 size-6 shrink-0 text-brand-600" aria-hidden />
              <div>
                <p className="text-sm font-bold leading-tight text-ink">{label}</p>
                <p className="text-xs text-ink-soft">{sub}</p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* Services */}
      <section id="services" className="py-20 sm:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Nos services"
              title="Deux spécialités, un seul standard : l'éclat."
              intro="On se concentre sur ce qu'on fait de mieux. Pas de compromis, juste des surfaces impeccables."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 100}>
              <Link
                href={`/services/${s.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-card)] ring-1 ring-ink/5 transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={`${s.name} — Vision Lavage`}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-bold text-ink backdrop-blur-sm">
                    <span aria-hidden>{s.emoji}</span> {s.name}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="text-lg font-semibold text-ink">{s.short}</p>
                  <p className="mt-2 text-ink-soft">{s.hook}</p>
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
                </div>
              </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Pourquoi Vision Lavage */}
      <section className="bg-sand-100 py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Pourquoi nous"
                title="Un crew qui traite votre propriété comme la sienne."
                intro="On n'est pas une grosse franchise anonyme. On est une équipe locale, minutieuse, qui tient à son nom — et à vos vitres."
              />
              <div className="mt-8 grid gap-5">
                {[
                  {
                    icon: Sparkles,
                    title: "Le souci du détail",
                    text: "Coins, rebords, moustiquaires : on ne laisse rien de côté. Un fini sans traces, garanti.",
                  },
                  {
                    icon: SprayCan,
                    title: "Le bon équipement",
                    text: "Eau purifiée pour les vitres, pression ajustée à chaque surface. On protège autant qu'on nettoie.",
                  },
                  {
                    icon: ThumbsUp,
                    title: "Simple et sans pression",
                    text: "Estimation claire, rendez-vous ponctuel, satisfaction garantie. Vous n'avez qu'à profiter du résultat.",
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex gap-4">
                    <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-600/10 text-brand-700">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink">{title}</h3>
                      <p className="mt-1 text-ink-soft">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[var(--shadow-soft)]">
                <Image
                  src="/heros/crew/crew-A.png"
                  alt="Membre du crew Vision Lavage lavant une vitre au squeegee, la camionnette turquoise en arrière-plan."
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white p-5 shadow-[var(--shadow-card)] ring-1 ring-ink/5 sm:block">
                <p className="font-display text-3xl font-semibold text-brand-700">100 %</p>
                <p className="text-sm text-ink-soft">satisfaction<br />ou on reprend</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Comment ça marche */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Comment ça marche"
            title="Trois étapes, zéro casse-tête."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", title: "Vous demandez une soumission", text: "Remplissez le court formulaire ou appelez-nous. On revient vers vous rapidement avec un prix clair." },
              { n: "02", title: "On planifie la visite", text: "On fixe un rendez-vous qui vous convient. Pas de fenêtre de 4 heures : on est ponctuels." },
              { n: "03", title: "Vos surfaces retrouvent leur éclat", text: "Le crew débarque, fait le travail avec soin, et vous profitez du résultat. Satisfaction garantie." },
            ].map((step) => (
              <div key={step.n} className="rounded-3xl bg-white p-7 shadow-[var(--shadow-card)] ring-1 ring-ink/5">
                <span className="font-display text-4xl font-semibold text-brand-200">{step.n}</span>
                <h3 className="mt-3 text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-ink-soft">{step.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Secteurs desservis */}
      <section className="bg-sand-100 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Secteurs desservis"
            title="On lave dans votre coin."
            intro={`Basés à ${site.baseVille}, on rayonne dans le Centre-du-Québec, l'Estrie et la Rive-Sud.`}
          />
          <div className="mt-10 flex flex-wrap gap-3">
            {secteurs.map((v) => (
              <Link
                key={v.slug}
                href={`/secteurs/${v.slug}`}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-sm ring-1 ring-ink/5 transition-colors hover:bg-brand-600 hover:text-white"
              >
                <MapPin className="size-4 text-brand-500 group-hover:text-white" aria-hidden />
                {v.name}
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-soft">
            Votre ville n'est pas dans la liste ?{" "}
            <Link href="/contact" className="font-semibold text-brand-700 underline-wave">
              Écrivez-nous
            </Link>
            , on a peut-être une place pour vous.
          </p>
        </Container>
      </section>

      {/* Témoignages */}
      <Testimonials />

      {/* CTA final */}
      <section className="relative overflow-hidden bg-dusk-gradient">
        <div className="absolute inset-0 bg-grain opacity-[0.15] mix-blend-overlay" aria-hidden />
        <Container className="relative py-20 text-center sm:py-24">
          <Eyebrow className="justify-center text-sun-300">Prêt à voir la différence ?</Eyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold text-white text-balance sm:text-5xl">
            Demandez votre soumission gratuite dès aujourd'hui.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-brand-100/90">
            Ça prend deux minutes. On vous revient avec un prix clair, sans engagement.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/soumission" variant="primary" size="lg">
              Obtenir ma soumission gratuite →
            </ButtonLink>
            <ButtonLink href={`tel:${site.phoneHref}`} variant="outline" size="lg">
              Appeler {site.phoneDisplay}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
