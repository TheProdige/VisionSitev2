"use client";

import Image from "next/image";
import { useState } from "react";
import { Play, Star } from "lucide-react";
import { testimonials } from "./content";
import { Display, Eyebrow, Shell } from "./ui";

export function Testimonials() {
  // Index de la carte dont la vidéo est en lecture (null = aucune).
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <section className="bg-[#303030] py-15 md:py-20 lg:pt-30 lg:pb-[110px]">
      <Shell className="flex flex-col items-center text-center">
        <Eyebrow light>{testimonials.eyebrow}</Eyebrow>
        <Display lines={testimonials.title} className="mt-5 text-white" />
      </Shell>

      <Shell className="mt-12 lg:mt-16">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <li key={t.name} className="flex flex-col rounded-3xl bg-white p-4">
              <div className="relative aspect-[404/247] overflow-hidden rounded-2xl">
                {playing === i && t.video ? (
                  <video
                    src={t.video}
                    poster={t.poster}
                    controls
                    autoPlay
                    playsInline
                    className="size-full object-cover"
                  />
                ) : (
                  <>
                    <Image
                      src={t.poster}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 404px"
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => t.video && setPlaying(i)}
                      aria-label={t.video ? `Play ${t.name}'s testimonial` : undefined}
                      aria-hidden={!t.video}
                      tabIndex={t.video ? 0 : -1}
                      className="absolute inset-0 grid place-items-center"
                    >
                      <span className="grid size-12 place-items-center rounded-full bg-white/85 backdrop-blur-sm transition-transform duration-300 hover:scale-105">
                        <Play className="size-4 translate-x-px fill-[#303030] text-[#303030]" />
                      </span>
                    </button>
                  </>
                )}
              </div>

              <blockquote className="mt-5 flex-1 text-[16px] leading-[1.55] text-[#303030]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-black/8 pt-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={t.avatar}
                    alt=""
                    width={52}
                    height={52}
                    className="size-[52px] rounded-full object-cover"
                  />
                  <div>
                    <p className="text-[15px] font-medium text-black">{t.name}</p>
                    <p className="text-[13px] text-[#5e5a56]">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5" aria-label="5 out of 5">
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star key={s} className="size-3.5 fill-[#fdcb28] text-[#fdcb28]" aria-hidden />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
