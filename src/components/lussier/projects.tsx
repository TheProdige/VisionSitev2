"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "./content";
import { Display, Eyebrow, Section, Shell } from "./ui";

export function Projects() {
  const track = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    // Un « pas » = la largeur d'une carte + la gouttière.
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <Section id="realisations">
      <Shell className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>{projects.eyebrow}</Eyebrow>
          <Display lines={projects.title} className="mt-5 text-black" />
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Réalisation précédente"
            className="inline-flex size-12 items-center justify-center rounded-2xl bg-black text-white transition-colors hover:bg-[#303030]"
          >
            <ArrowLeft className="size-5" strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Réalisation suivante"
            className="inline-flex size-12 items-center justify-center rounded-2xl bg-black text-white transition-colors hover:bg-[#303030]"
          >
            <ArrowRight className="size-5" strokeWidth={1.6} />
          </button>
        </div>
      </Shell>

      <Shell className="mt-10">
        <div
          ref={track}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.items.map((p) => (
            <article
              key={p.title}
              className="flex w-[300px] shrink-0 snap-start gap-6 rounded-3xl bg-[#f5f5f5] p-5 sm:w-[560px] lg:w-[678px]"
            >
              <div className="relative hidden aspect-[295/399] w-[295px] shrink-0 overflow-hidden rounded-2xl sm:block">
                <Image src={p.image} alt="" fill sizes="295px" className="object-cover" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-[14px] text-[#5e5a56]">{p.tag}</span>
                <div className="relative mt-6 aspect-[295/240] overflow-hidden rounded-2xl sm:hidden">
                  <Image src={p.image} alt="" fill sizes="260px" className="object-cover" />
                </div>
                <h3 className="mt-6 text-[22px] leading-[1.3] tracking-[-0.04em] text-black lg:text-[24px]">
                  {p.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.55] text-[#5e5a56]">{p.body}</p>
                <Link
                  href={p.href}
                  className="group mt-auto inline-flex items-center gap-2 pt-8 text-[15px] text-black transition-opacity hover:opacity-70"
                >
                  Voir la réalisation
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.6}
                    aria-hidden
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Shell>
    </Section>
  );
}
