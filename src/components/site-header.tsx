"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/button";
import { Wordmark } from "@/components/wordmark";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-cream/90 backdrop-blur-md transition-shadow duration-300",
        scrolled
          ? "border-ink/10 shadow-[0_6px_24px_-16px_rgba(18,48,58,.5)]"
          : "border-transparent"
      )}
    >
      <Container className="flex h-18 items-center justify-between gap-4 py-3">
        <Link href="/" aria-label={`${site.name} — accueil`} className="shrink-0">
          <Wordmark dark />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-ink/80 transition-colors hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${site.phoneHref}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-ink transition-colors hover:text-brand-700"
          >
            <Phone className="size-4" aria-hidden />
            {site.phoneDisplay}
          </a>
          <ButtonLink href="/soumission" variant="primary" size="md">
            Soumission gratuite
          </ButtonLink>
        </div>

        {/* Menu mobile */}
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-xl text-ink lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      {open && (
        <div className="lg:hidden">
          <Container className="pb-5">
            <div className="flex flex-col gap-1 rounded-2xl bg-cream p-3 shadow-[var(--shadow-card)] ring-1 ring-ink/5">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-semibold text-ink hover:bg-sand-100"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-ink/10 pt-3">
                <a
                  href={`tel:${site.phoneHref}`}
                  className="inline-flex items-center gap-2 px-4 py-2 text-base font-bold text-ink"
                >
                  <Phone className="size-4" aria-hidden />
                  {site.phoneDisplay}
                </a>
                <ButtonLink href="/soumission" variant="primary" size="lg" className="w-full">
                  Obtenir ma soumission gratuite
                </ButtonLink>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
