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
 * c'est la signature typographique de Modora.
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

/** Logo Modora : maison au trait + mot-symbole. Remplace-le par le tien. */
export function ModoraMark({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" fill={light ? "#fff" : "#000"} aria-hidden>
        <path d="M0 9.23 16.002 0 32 9.23v16.752l-3.7 2.136v-16.74l-12.293-7.1-12.307 7.1v16.74L0 25.982z" />
        <path d="m10.41 31.991-3.824-2.21V13.033L16.002 7.6l9.415 5.433v16.748l-3.823 2.21-5.592-3.23zm11.184-4.414.009-12.472-5.593-3.224-5.592 3.224-.009 12.47 5.59-3.23z" />
      </svg>
      <span
        className={cn(
          "text-[26px] leading-none font-medium tracking-[-0.04em]",
          light ? "text-white" : "text-black"
        )}
      >
        Modora
      </span>
    </span>
  );
}
