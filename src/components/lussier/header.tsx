"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { brand, nav } from "./content";
import { LussierMark, Shell } from "./ui";
import { cn } from "@/lib/utils";

/** En-tête transparent posé par-dessus le héros. */
export function LussierHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <Shell className="flex items-center justify-between py-4">
        <Link href="#" aria-label={brand.name}>
          <LussierMark light />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                href={item.href}
                className="flex items-center gap-1 text-[15px] text-white/90 transition-colors hover:text-white"
              >
                {item.label}
                {item.items && <ChevronDown className="size-3.5" strokeWidth={2} aria-hidden />}
              </Link>
              {item.items && (
                <div className="invisible absolute left-0 top-full z-10 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="min-w-44 rounded-2xl bg-white p-2 shadow-[0_18px_40px_-18px_rgba(0,0,0,.45)]">
                    {item.items.map((sub) => (
                      <Link
                        key={sub}
                        href="#"
                        className="block rounded-xl px-3 py-2 text-[15px] text-[#303030] transition-colors hover:bg-[#f5f5f5]"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={brand.phoneHref}
            className="hidden rounded-full bg-black px-5 py-3 text-[15px] leading-none text-white transition-colors hover:bg-[#303030] sm:inline-flex"
          >
            {brand.phone}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="inline-flex size-11 items-center justify-center rounded-full bg-black text-white lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Shell>

      {/* Menu mobile */}
      <div
        className={cn(
          "overflow-hidden transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-[520px]" : "max-h-0"
        )}
      >
        <Shell className="pb-4">
          <div className="rounded-3xl bg-white p-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,.45)]">
            {nav.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-[17px] text-[#303030] transition-colors hover:bg-[#f5f5f5]"
                >
                  {item.label}
                </Link>
                {item.items?.map((sub) => (
                  <Link
                    key={sub}
                    href="#"
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-8 py-2 text-[15px] text-[#5e5a56] transition-colors hover:bg-[#f5f5f5]"
                  >
                    {sub}
                  </Link>
                ))}
              </div>
            ))}
            <Link
              href={brand.phoneHref}
              className="mt-2 block rounded-full bg-black px-5 py-3 text-center text-[15px] text-white"
            >
              {brand.phone}
            </Link>
          </div>
        </Shell>
      </div>
    </header>
  );
}
