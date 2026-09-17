"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Révèle le texte mot à mot au fil du défilement, comme sur le gabarit.
 * La progression est calculée sur la traversée du bloc par la fenêtre.
 */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respecte la préférence système de réduction des animations.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let frame = 0;
    const update = () => {
      frame = 0;
      if (reduce) {
        setProgress(1);
        return;
      }
      const r = el.getBoundingClientRect();
      const start = window.innerHeight * 0.9;
      const end = window.innerHeight * 0.35;
      const p = (start - r.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Première mesure hors du corps de l'effet, pour ne pas enchaîner les rendus.
    onScroll();
    if (reduce) return () => cancelAnimationFrame(frame);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        // Chaque mot s'allume un peu après le précédent.
        const at = i / words.length;
        const lit = Math.min(1, Math.max(0, (progress - at) * words.length * 0.6 + 0.25));
        return (
          <span key={i} style={{ opacity: 0.18 + lit * 0.82 }} className="transition-opacity duration-150">
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}
