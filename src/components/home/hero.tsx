import { Phone, Star } from "lucide-react";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[92vh] flex-col overflow-hidden">
      {/* Vidéo de fond — plan large Westfalia (poster en repli le temps du chargement) */}
      <video
        className="absolute inset-0 -z-20 size-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        poster="/heros/crew/crew-wide.png"
        aria-hidden
      >
        <source src="/heros/hero.mp4" type="video/mp4" />
      </video>

      {/* Voile chaud + grain film */}
      <div className="absolute inset-0 -z-10 bg-golden-veil" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-grain opacity-[0.12] mix-blend-overlay" aria-hidden />

      <Container className="flex flex-1 flex-col justify-center py-32">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-white/12 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-sand-100 ring-1 ring-white/20 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-sun-400" aria-hidden />
            {site.baseVille} · Estrie · Rive-Sud
          </span>

          <h1 className="mt-7 font-display text-[2.75rem] font-medium leading-[1.02] tracking-[-0.01em] text-sand-100 text-balance sm:text-7xl">
            Des surfaces{" "}
            <span className="italic text-sun-300">propres</span> comme
            <br className="hidden sm:block" /> au bord de mer.
          </h1>

          <p className="mt-7 max-w-lg text-lg leading-relaxed text-sand-100/85 sm:text-xl">
            Lavage de vitres et lavage à pression par un crew local qui a le souci du détail.
            Fini éclatant, estimation gratuite, zéro tracas.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/soumission" variant="primary" size="lg">
              Obtenir ma soumission gratuite →
            </ButtonLink>
            <ButtonLink href={`tel:${site.phoneHref}`} variant="outline" size="lg">
              <Phone className="size-5" aria-hidden />
              {site.phoneDisplay}
            </ButtonLink>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-sand-100/85">
            <span className="inline-flex items-center gap-1.5">
              <span className="flex text-sun-400" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </span>
              Clients satisfaits
            </span>
            <span className="hidden h-4 w-px bg-white/25 sm:block" aria-hidden />
            <span>Sans engagement</span>
            <span className="hidden h-4 w-px bg-white/25 sm:block" aria-hidden />
            <span>Entreprise assurée</span>
          </div>
        </div>
      </Container>

      {/* Indicateur de défilement */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center" aria-hidden>
        <span className="flex h-9 w-6 items-start justify-center rounded-full border border-white/40 p-1.5">
          <span className="size-1 animate-bounce rounded-full bg-white/80" />
        </span>
      </div>
    </section>
  );
}
