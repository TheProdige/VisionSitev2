import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/section-heading";
import { site } from "@/lib/site";

/** Bandeau d'appel à l'action réutilisable (bas de pages). */
export function CtaBand({
  title = "Prêt pour un résultat éclatant ?",
  subtitle = "Estimation gratuite, sans engagement. On vous revient rapidement.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-dusk-gradient">
      <Container className="py-16 text-center sm:py-20">
        <Eyebrow className="justify-center text-brand-200">Soumission gratuite</Eyebrow>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold text-white text-balance sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100/90">{subtitle}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/soumission" variant="primary" size="lg">
            Obtenir ma soumission gratuite →
          </ButtonLink>
          <ButtonLink href={`tel:${site.phoneHref}`} variant="outline" size="lg">
            Appeler {site.phoneDisplay}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
