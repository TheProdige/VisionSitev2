"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { benefits } from "./content";
import { Eyebrow } from "./ui";

type Line = { x1: number; y1: number; x2: number; y2: number };

/**
 * Scène épinglée : la photo reste fixe le temps d'une longue section et les
 * fiches annotées apparaissent l'une après l'autre au fil du défilement,
 * reliées à leur repère par un trait pointillé.
 */
export function Benefits() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const dots = useRef<(HTMLSpanElement | null)[]>([]);

  const [shown, setShown] = useState(0);
  const [lines, setLines] = useState<Line[]>([]);

  /** Relie le bord de chaque fiche au repère correspondant. */
  const measure = useCallback(() => {
    const box = stage.current?.getBoundingClientRect();
    if (!box) return;
    const next: Line[] = [];
    benefits.hotspots.forEach((_, i) => {
      const c = cards.current[i]?.getBoundingClientRect();
      const d = dots.current[i]?.getBoundingClientRect();
      if (!c || !d) return;
      const dx = d.left + d.width / 2 - box.left;
      const dy = d.top + d.height / 2 - box.top;
      const cx = c.left + c.width / 2 - box.left;
      const cy = c.top + c.height / 2 - box.top;
      // Point d'attache : sur le bord de la fiche, du côté du repère.
      const ax = Math.min(Math.max(dx, c.left - box.left), c.right - box.left);
      const ay = Math.min(Math.max(dy, c.top - box.top), c.bottom - box.top);
      next.push({ x1: ax === cx && ay === cy ? cx : ax, y1: ay, x2: dx, y2: dy });
    });
    setLines(next);
  }, []);

  useEffect(() => {
    const el = section.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = benefits.hotspots.length;

    let frame = 0;
    const update = () => {
      frame = 0;
      if (reduce) {
        setShown(total);
      } else {
        const r = el.getBoundingClientRect();
        const travel = r.height - window.innerHeight;
        const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0;
        setShown(Math.min(total, Math.floor(p * (total + 0.6)) + 1));
      }
      measure();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [measure]);

  return (
    <section ref={section} className="relative h-[300vh]">
      <div ref={stage} className="sticky top-0 h-screen w-full overflow-hidden">
        <Image src={benefits.background} alt="" fill sizes="100vw" className="object-cover" />

        <div className="absolute left-5 top-6 md:left-[30px]">
          <Eyebrow light>{benefits.eyebrow}</Eyebrow>
        </div>

        {/* Traits de liaison */}
        <svg className="pointer-events-none absolute inset-0 z-10 size-full" aria-hidden>
          {lines.map((l, i) => (
            <line
              key={i}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="white"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              className="transition-opacity duration-500"
              style={{ opacity: i < shown ? 0.9 : 0 }}
            />
          ))}
        </svg>

        {benefits.hotspots.map((h, i) => {
          const visible = i < shown;
          return (
            <div key={h.title}>
              <span
                ref={(n) => {
                  dots.current[i] = n;
                }}
                className="absolute z-20 grid size-6 place-items-center rounded-full bg-white/90 shadow-[0_2px_10px_rgba(0,0,0,.35)] transition-all duration-500"
                style={{
                  left: `${h.x}%`,
                  top: `${h.y}%`,
                  opacity: visible ? 1 : 0,
                  transform: `translate(-50%,-50%) scale(${visible ? 1 : 0.4})`,
                }}
                aria-hidden
              >
                <span className="size-2.5 rounded-full bg-[#303030]" />
              </span>

              <div
                ref={(n) => {
                  cards.current[i] = n;
                }}
                className="absolute z-30 w-[min(78vw,300px)] rounded-2xl bg-white p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,.6)] transition-all duration-500"
                style={{
                  left: h.card.left,
                  top: h.card.top,
                  opacity: visible ? 1 : 0,
                  transform: `translateY(${visible ? 0 : 14}px)`,
                }}
              >
                <h3 className="text-[17px] leading-tight tracking-[-0.02em] text-black">{h.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.55] text-[#5e5a56]">{h.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
