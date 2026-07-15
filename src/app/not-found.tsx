import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="bg-dusk-gradient">
      <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-display text-6xl font-semibold text-sun-400">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-white text-balance">
          Cette page a pris le large.
        </h1>
        <p className="mt-4 max-w-md text-brand-100/90">
          La page que vous cherchez n'existe pas ou a été déplacée. Retournons à la maison.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" variant="primary" size="lg">
            Retour à l'accueil
          </ButtonLink>
          <ButtonLink href="/soumission" variant="outline" size="lg">
            Demander une soumission
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
