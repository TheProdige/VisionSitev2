import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/container";
import { SoumissionForm } from "@/components/soumission-form";
import { secteurs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contactez Vision Lavage à ${site.baseVille}. Téléphone, courriel et demande de soumission gratuite.`,
  alternates: { canonical: `${site.url}/contact` },
};

export default function ContactPage() {
  return (
    <section className="bg-sand-100 pt-24 pb-20 sm:pb-24">
      <Container>
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
            Contact
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink text-balance sm:text-5xl">
            Parlons de votre projet.
          </h1>
          <p className="mt-5 text-lg text-ink-soft">
            Une question, un besoin précis, ou envie d'une estimation ? On est là.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="flex flex-col gap-4">
            <a
              href={`tel:${site.phoneHref}`}
              className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5 transition-colors hover:ring-brand-500/40"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-brand-600/10 text-brand-700">
                <Phone className="size-6" aria-hidden />
              </span>
              <span>
                <span className="block text-sm text-ink-soft">Téléphone</span>
                <span className="block text-lg font-bold text-ink">{site.phoneDisplay}</span>
              </span>
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5 transition-colors hover:ring-brand-500/40"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-brand-600/10 text-brand-700">
                <Mail className="size-6" aria-hidden />
              </span>
              <span>
                <span className="block text-sm text-ink-soft">Courriel</span>
                <span className="block text-lg font-bold text-ink">{site.email}</span>
              </span>
            </a>
            <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-600/10 text-brand-700">
                <MapPin className="size-6" aria-hidden />
              </span>
              <span>
                <span className="block text-sm text-ink-soft">Zone desservie</span>
                <span className="block font-bold text-ink">
                  {site.baseVille} et environs
                </span>
                <span className="mt-1 block text-sm text-ink-soft">
                  {secteurs.map((v) => v.name).join(" · ")}
                </span>
              </span>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-display text-2xl font-semibold text-ink">
              Demander une soumission
            </h2>
            <SoumissionForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
