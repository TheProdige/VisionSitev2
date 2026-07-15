import { Quote, Star } from "lucide-react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

/**
 * Témoignages. Contenu à remplacer par de vrais avis Google/clients.
 * (Placeholders réalistes pour établir la mise en page.)
 */
const testimonials = [
  {
    quote:
      "Mes vitres n'avaient jamais été aussi propres. Ponctuels, polis, et un résultat impeccable. Je recommande sans hésiter.",
    name: "Mélanie G.",
    ville: "Drummondville",
  },
  {
    quote:
      "Ils ont redonné vie à mon entrée et ma terrasse au lavage à pression. On dirait du neuf. Service local et humain.",
    name: "Patrick L.",
    ville: "Granby",
  },
  {
    quote:
      "Estimation claire, aucune surprise, travail soigné. Ça fait plaisir de faire affaire avec du monde qui a de l'allure.",
    name: "Sophie R.",
    ville: "Magog",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Ce qu'on dit de nous"
            title="Des clients qui reviennent (et qui parlent)."
            align="center"
          />
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-[var(--shadow-card)] ring-1 ring-ink/5">
                <Quote className="size-8 text-clay-400" aria-hidden />
                <blockquote className="mt-4 flex-1 text-ink-soft">
                  <p>« {t.quote} »</p>
                </blockquote>
                <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4">
                  <figcaption>
                    <span className="block font-semibold text-ink">{t.name}</span>
                    <span className="block text-sm text-ink-soft">{t.ville}</span>
                  </figcaption>
                  <span className="flex text-sun-500" aria-label="5 étoiles sur 5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="size-4 fill-current" aria-hidden />
                    ))}
                  </span>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
