import type { Metadata } from "next";
import { CheckCircle2, Clock, Phone, ShieldCheck } from "lucide-react";
import { Container } from "@/components/container";
import { SoumissionForm } from "@/components/soumission-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Soumission gratuite",
  description:
    "Demandez votre soumission gratuite pour le lavage de vitres ou le lavage à pression. Réponse rapide, sans engagement.",
  alternates: { canonical: `${site.url}/soumission` },
};

export default function SoumissionPage() {
  return (
    <section className="bg-sand-100 pt-24 pb-20 sm:pb-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Argumentaire */}
          <div className="lg:pt-6">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
              Estimation gratuite
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight text-ink text-balance sm:text-5xl">
              Obtenez votre soumission en deux minutes.
            </h1>
            <p className="mt-5 max-w-md text-lg text-ink-soft">
              Dites-nous ce dont vous avez besoin. On vous revient rapidement avec un prix clair,
              sans engagement ni pression.
            </p>

            <ul className="mt-8 grid gap-4">
              {[
                { icon: Clock, title: "Réponse rapide", text: "On revient vers vous sans vous faire attendre des jours." },
                { icon: ShieldCheck, title: "Sans engagement", text: "Une estimation, pas un contrat. Vous décidez ensuite." },
                { icon: CheckCircle2, title: "Prix clair", text: "Pas de surprise : ce qu'on annonce, c'est ce que vous payez." },
              ].map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-600/10 text-brand-700">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{title}</p>
                    <p className="text-sm text-ink-soft">{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-ink/5">
              <p className="text-sm text-ink-soft">Vous préférez parler à quelqu'un ?</p>
              <a
                href={`tel:${site.phoneHref}`}
                className="mt-1 inline-flex items-center gap-2 text-lg font-bold text-brand-700"
              >
                <Phone className="size-5" aria-hidden />
                {site.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Formulaire */}
          <div>
            <SoumissionForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
