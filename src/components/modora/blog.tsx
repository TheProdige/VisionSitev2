import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { blog } from "./content";
import { Display, Eyebrow, Pill, Section, Shell } from "./ui";

export function Blog() {
  return (
    <Section id="blog">
      <Shell className="grid gap-12 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-20">
        <div>
          <Eyebrow>{blog.eyebrow}</Eyebrow>
          <Display lines={blog.title} className="mt-5 text-black" />
          <div className="mt-8">
            <Pill href={blog.cta.href}>{blog.cta.label}</Pill>
          </div>
        </div>

        <ul>
          {blog.posts.map((p, i) => (
            <li key={p.title} className={i > 0 ? "border-t border-black/10" : undefined}>
              <Link
                href={p.href}
                className="group flex items-start gap-6 py-8 transition-opacity hover:opacity-75 sm:gap-10"
              >
                <div className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 text-[13px] text-[#5e5a56]">
                    <Calendar className="size-3.5" strokeWidth={1.6} aria-hidden />
                    {p.date}
                  </span>
                  <h3 className="mt-3 text-[20px] leading-[1.3] tracking-[-0.03em] text-black lg:text-[24px]">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-[48ch] text-[14px] leading-[1.55] text-[#5e5a56]">{p.body}</p>
                </div>
                <div className="relative aspect-[345/196] w-[130px] shrink-0 overflow-hidden rounded-2xl sm:w-[240px] lg:w-[345px]">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 130px, (max-width: 1024px) 240px, 345px"
                    className="object-cover"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Shell>
    </Section>
  );
}
