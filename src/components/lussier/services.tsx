import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "./content";
import { Display, Eyebrow, Pill } from "./ui";

export function Services() {
  return (
    <section id="services" className="px-5 md:px-[30px]">
      <div className="mx-auto w-full max-w-[1380px] rounded-[32px] bg-[#f5f5f5] px-6 py-15 md:px-12 md:py-20 lg:px-[60px] lg:py-30">
        <Eyebrow>{services.eyebrow}</Eyebrow>
        <Display lines={services.title} className="mt-5 text-black" />

        <div className="mt-12 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-16">
          {/* Visuels */}
          <div className="flex items-end gap-5">
            <div className="relative aspect-[415/478] w-[62%] overflow-hidden rounded-3xl">
              <Image
                src={services.images[0]}
                alt=""
                fill
                sizes="(max-width: 1024px) 60vw, 415px"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[281/262] w-[38%] overflow-hidden rounded-3xl">
              <Image
                src={services.images[1]}
                alt=""
                fill
                sizes="(max-width: 1024px) 36vw, 281px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Liste des services */}
          <div className="flex flex-col justify-end">
            <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {services.items.map((s) => (
                <li key={s}>
                  <Link
                    href="#services"
                    className="group flex items-center gap-3 text-[16px] text-black transition-opacity hover:opacity-70"
                  >
                    <ArrowRight
                      className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={1.6}
                      aria-hidden
                    />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Pill href={services.cta.href}>{services.cta.label}</Pill>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
