import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-600",
        className
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink text-balance sm:text-4xl">
        {title}
      </h2>
      {intro && (
        <p className={cn("max-w-2xl text-lg text-ink-soft", align === "center" && "mx-auto")}>
          {intro}
        </p>
      )}
    </div>
  );
}
