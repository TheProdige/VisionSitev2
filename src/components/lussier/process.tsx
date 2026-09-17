import Image from "next/image";
import { process } from "./content";
import { Display, Eyebrow, Section, Shell } from "./ui";

export function Process() {
  return (
    <Section>
      <Shell className="flex flex-col items-center text-center">
        <Eyebrow>{process.eyebrow}</Eyebrow>
        <Display lines={process.title} className="mt-5 text-black" />
      </Shell>

      <Shell className="mt-12 lg:mt-16">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((s) => (
            <li
              key={s.n}
              className="flex min-h-[200px] flex-col justify-between rounded-3xl bg-[#f5f5f5] p-6 lg:min-h-[240px]"
            >
              <span className="text-[36px] leading-none tracking-[-0.04em] text-black lg:text-[44px]">
                {s.n}
              </span>
              <div>
                <h3 className="text-[16px] font-semibold text-black">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.5] text-[#5e5a56]">{s.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Shell>

      {/* Bandeau photo panoramique */}
      <Shell className="mt-12 lg:mt-20">
        <div className="relative aspect-[1380/323] overflow-hidden rounded-3xl">
          <Image
            src={process.band}
            alt=""
            fill
            sizes="(max-width: 1440px) 100vw, 1380px"
            className="object-cover"
          />
        </div>
      </Shell>
    </Section>
  );
}
