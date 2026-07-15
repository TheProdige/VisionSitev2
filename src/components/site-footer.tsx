import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { nav, secteurs, services, site } from "@/lib/site";
import { Container } from "@/components/container";
import { Wordmark } from "@/components/wordmark";

export function SiteFooter() {
  const year = 2026;
  return (
    <footer className="bg-dusk-gradient text-brand-50">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm text-brand-100/80">
              Lavage de vitres et lavage à pression à {site.baseVille} et dans les environs.
              Un crew local, un fini éclatant.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-200">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-brand-50/85 hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/soumission" className="font-semibold text-sun-300 hover:text-sun-400">
                  Soumission gratuite →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-200">Secteurs</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {secteurs.map((v) => (
                <li key={v.slug}>
                  <Link href={`/secteurs/${v.slug}`} className="text-brand-50/85 hover:text-white">
                    {v.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-200">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`tel:${site.phoneHref}`} className="flex items-center gap-2.5 text-brand-50/85 hover:text-white">
                  <Phone className="size-4 shrink-0 text-brand-300" aria-hidden />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 text-brand-50/85 hover:text-white">
                  <Mail className="size-4 shrink-0 text-brand-300" aria-hidden />
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-brand-50/85">
                <MapPin className="size-4 shrink-0 text-brand-300" aria-hidden />
                {site.baseVille}, {site.region}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-brand-100/70 sm:flex-row">
          <p>© {year} {site.name}. Tous droits réservés.</p>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
