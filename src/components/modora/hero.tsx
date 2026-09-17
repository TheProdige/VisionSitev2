import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { hero } from "./content";
import { Display, Pill, Shell } from "./ui";

export function Hero() {
  return (
    <section className="relative flex min-h-[640px] flex-col justify-between overflow-hidden pt-32 pb-12 lg:h-[900px] lg:pt-[151px] lg:pb-[47px]">
      <Image
        src={hero.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 object-cover object-center"
      />
      {/* Voile pour garder le titre lisible sur la photo */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 to-black/25"
        aria-hidden
      />

      <Shell className="relative z-10">
        <Display as="h1" lines={hero.title} className="max-w-[16ch] text-white" />
        <div className="mt-8 flex flex-wrap gap-3">
          <Pill href={hero.primary.href}>{hero.primary.label}</Pill>
          <Pill href={hero.secondary.href} variant="light">
            {hero.secondary.label}
          </Pill>
        </div>
      </Shell>

      <Shell className="relative z-10 flex items-end justify-between gap-6">
        <Link
          href="#about"
          className="group flex items-center gap-3 text-[15px] text-white/90 transition-colors hover:text-white"
        >
          <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/50 transition-transform duration-300 group-hover:translate-y-0.5">
            <ArrowDown className="size-4" strokeWidth={1.6} aria-hidden />
          </span>
          {hero.scrollLabel}
        </Link>

        {/* Carte article flottante */}
        <Link
          href={hero.card.href}
          className="hidden w-[420px] items-center gap-4 rounded-2xl bg-white/12 p-3 backdrop-blur-md transition-colors duration-300 hover:bg-white/20 md:flex"
        >
          <Image
            src={hero.card.image}
            alt=""
            width={136}
            height={136}
            className="size-[136px] shrink-0 rounded-xl object-cover"
          />
          <span className="min-w-0">
            <span className="block text-[20px] leading-[1.25] tracking-[-0.03em] text-white">
              {hero.card.title}
            </span>
            <span className="mt-3 inline-block rounded-full bg-white/20 px-3 py-1 text-[13px] leading-none text-white">
              {hero.card.tag}
            </span>
          </span>
        </Link>
      </Shell>
    </section>
  );
}
