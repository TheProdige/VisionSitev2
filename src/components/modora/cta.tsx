import Image from "next/image";
import { BadgeDollarSign, ClipboardCheck, UserRoundCheck } from "lucide-react";
import { cta } from "./content";
import { Display, Pill, Shell } from "./ui";

const icons = {
  clipboard: ClipboardCheck,
  user: UserRoundCheck,
  badge: BadgeDollarSign,
} as const;

export function CtaBand() {
  return (
    <section id="contact">
      <div className="relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden px-5 py-20 text-center lg:min-h-[500px] lg:pt-[147px]">
        <Image src={cta.image} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
        <div className="relative">
          <Display lines={cta.title} className="text-white" />
          <p className="mt-5 text-[15px] leading-[1.6] text-white/85">
            {cta.body.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
          <div className="mt-8 flex justify-center">
            <Pill href={cta.button.href}>{cta.button.label}</Pill>
          </div>
        </div>
      </div>

      {/* Bandeau garanties */}
      <div className="bg-[#303030]">
        <Shell>
          <ul className="grid divide-y divide-white/12 md:grid-cols-3 md:divide-x md:divide-y-0">
            {cta.features.map((f) => {
              const Icon = icons[f.icon as keyof typeof icons];
              return (
                <li key={f.title} className="flex gap-4 px-0 py-8 md:px-8 md:first:pl-0 md:last:pr-0">
                  <Icon className="size-6 shrink-0 text-white" strokeWidth={1.4} aria-hidden />
                  <div>
                    <h3 className="text-[15px] font-medium text-white">{f.title}</h3>
                    <p className="mt-2 max-w-[42ch] text-[14px] leading-[1.5] text-white/70">{f.body}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Shell>
      </div>
    </section>
  );
}
