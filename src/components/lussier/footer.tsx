import Link from "next/link";
import { brand, footer } from "./content";
import { LussierMark, Shell } from "./ui";

const socials = [
  {
    label: "Facebook",
    path: "M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.54-1.5H16.7V3.6c-.28-.04-1.26-.12-2.4-.12-2.38 0-4 1.45-4 4.11V9.9H7.6V13h2.7v8z",
  },
  {
    label: "Instagram",
    path: "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2m0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6m5.8-7.8a1.07 1.07 0 1 1-2.15 0 1.07 1.07 0 0 1 2.15 0M21 8.8c-.05-1.44-.38-2.71-1.43-3.76S17.25 3.66 15.8 3.6C14.33 3.5 9.67 3.5 8.2 3.6c-1.44.05-2.71.38-3.76 1.43S3.66 7.35 3.6 8.8c-.1 1.47-.1 6.13 0 7.6.05 1.44.38 2.71 1.43 3.76s2.32 1.38 3.76 1.44c1.47.08 6.13.08 7.6 0 1.45-.06 2.72-.39 3.77-1.44s1.38-2.32 1.43-3.76c.1-1.47.1-6.12 0-7.6m-1.9 9.18a3.04 3.04 0 0 1-1.71 1.71c-1.19.47-4 .36-5.31.36s-4.13.1-5.31-.36a3.04 3.04 0 0 1-1.71-1.71c-.47-1.18-.36-4-.36-5.31s-.11-4.13.36-5.31A3.04 3.04 0 0 1 6.77 5.65c1.18-.47 4-.36 5.31-.36s4.13-.1 5.31.36a3.04 3.04 0 0 1 1.71 1.71c.47 1.18.36 4 .36 5.31s.11 4.13-.36 5.31",
  },
  {
    label: "X",
    path: "M17.2 3.8h2.9l-6.34 7.25L21.2 20.2h-5.83l-4.57-5.97-5.22 5.97H2.68l6.78-7.75L2.8 3.8h5.98l4.13 5.46zm-1.02 14.66h1.6L8.1 5.45H6.38z",
  },
  {
    label: "LinkedIn",
    path: "M6.94 8.4H4.02V20.2h2.92zM5.48 3.8a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4M20.2 13.5c0-3.13-1.67-4.58-3.9-4.58-1.8 0-2.6.99-3.05 1.68V8.4H10.4V20.2h2.85v-6.2c0-1.4.26-2.76 2-2.76 1.7 0 1.73 1.6 1.73 2.85v6.11h2.92z",
  },
];

export function LussierFooter() {
  return (
    <footer className="bg-black pt-15 pb-14 md:pt-20 lg:pt-30">
      <Shell>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <Link href="#" aria-label={brand.name} className="h-fit">
            <LussierMark light className="[&_svg]:size-11 [&_span:last-child]:text-[34px]" />
          </Link>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[15px] text-white">{col.title}</h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link
                        href="#"
                        className="text-[15px] text-white/60 transition-colors hover:text-white"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-white/12 pt-6">
          <p className="text-[14px] text-white/60">{footer.copyright}</p>
          <ul className="flex gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <Link
                  href="#"
                  aria-label={s.label}
                  className="grid size-8 place-items-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 max-w-[120ch] text-[12px] leading-[1.6] text-white/35">
          {footer.disclaimer}
        </p>
      </Shell>
    </footer>
  );
}
