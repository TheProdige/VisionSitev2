import Image from "next/image";
import { about } from "./content";
import { Eyebrow, Section, Shell } from "./ui";
import { ScrollText } from "./scroll-text";

export function About() {
  return (
    <Section id="a-propos">
      <Shell>
        <Eyebrow>{about.eyebrow}</Eyebrow>
        <ScrollText
          text={about.statement}
          className="mt-8 max-w-[22ch] text-[30px] leading-[1.18] tracking-[-0.04em] sm:text-[44px] lg:max-w-[26ch] lg:text-[58px]"
        />
      </Shell>

      {/* Bande d'images débordant à droite, comme sur le gabarit */}
      <div className="mt-14 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-6 px-5 md:px-[30px]">
          {about.cards.map((c) => (
            <article
              key={c.title}
              className="relative aspect-[611/661] w-[280px] shrink-0 overflow-hidden rounded-3xl sm:w-[420px] lg:w-[611px]"
            >
              <Image
                src={c.image}
                alt=""
                fill
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 420px, 611px"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <h3 className="text-[20px] leading-[1.2] tracking-[-0.03em] text-white lg:text-[24px]">
                  {c.title}
                </h3>
                <p className="mt-3 max-w-[46ch] text-[14px] leading-[1.5] text-white/80">{c.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
