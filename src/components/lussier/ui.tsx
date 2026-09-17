import Link from "next/link";
import { House } from "lucide-react";
import { cn } from "@/lib/utils";

/** Largeur de contenu du gabarit : 1380px, gouttières 20/30px. */
export function Shell({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1380px] px-5 md:px-[30px]", className)}>{children}</div>
  );
}

/** Rythme vertical des sections : 60 / 80 / 120px. */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-15 md:py-20 lg:py-30", className)}>
      {children}
    </section>
  );
}

/** Surtitre : pictogramme maison + libellé. */
export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-[13px] leading-none",
        light ? "text-white/80" : "text-[#5e5a56]"
      )}
    >
      <House className="size-3.5" strokeWidth={1.6} aria-hidden />
      {children}
    </p>
  );
}

/**
 * Titres du gabarit. Graisse légère et interlettrage négatif serré —
 * c'est la signature typographique du gabarit.
 */
export function Display({
  as: Tag = "h2",
  lines,
  className,
}: {
  as?: "h1" | "h2" | "h3";
  lines: string[];
  className?: string;
}) {
  const size =
    Tag === "h1"
      ? "text-[44px] leading-[1.06] tracking-[-0.045em] sm:text-[58px] lg:text-[78px]"
      : "text-[30px] leading-[1.2] tracking-[-0.04em] sm:text-[36px] lg:text-[44px]";
  return (
    <Tag className={cn(size, Tag === "h1" ? "font-light" : "font-normal", className)}>
      {lines.map((l, i) => (
        <span key={i} className="block">
          {l}
        </span>
      ))}
    </Tag>
  );
}

type PillProps = {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light";
  className?: string;
};

/** Bouton pilule : noir plein ou blanc plein. */
export function Pill({ href, children, variant = "dark", className }: PillProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-[15px] leading-none transition-colors duration-200",
        variant === "dark"
          ? "bg-black text-white hover:bg-[#303030]"
          : "bg-white text-black hover:bg-white/90",
        className
      )}
    >
      {children}
    </Link>
  );
}

/** Mot-symbole Lussier Électrique : éclair + nom. Remplace-le par le vrai logo. */
export function LussierMark({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden>
        <rect
          x="0.75"
          y="0.75"
          width="30.5"
          height="30.5"
          rx="8"
          fill="none"
          stroke={light ? "#fff" : "#000"}
          strokeWidth="1.5"
        />
        <path d="M17.6 6 9.5 17.4h4.9L13.2 26l9.3-12.2h-5.6z" fill={light ? "#fff" : "#000"} />
      </svg>
      <span
        className={cn(
          "text-[22px] leading-none tracking-[-0.04em]",
          light ? "text-white" : "text-black"
        )}
      >
        <span className="font-medium">Lussier</span>{" "}
        <span className="opacity-70">Électrique</span>
      </span>
    </span>
  );
}
