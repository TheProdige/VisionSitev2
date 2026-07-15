import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-bold tracking-tight transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        // CTA principal — terracotta
        primary:
          "bg-clay-600 text-sand-100 shadow-[var(--shadow-cta)] hover:bg-clay-500 hover:-translate-y-0.5",
        // Teal van
        brand:
          "bg-brand-600 text-sand-100 shadow-[var(--shadow-card)] hover:bg-brand-500 hover:-translate-y-0.5",
        // Contour clair sur fond foncé
        outline:
          "bg-transparent text-white ring-2 ring-white/50 hover:bg-white/10",
        // Contour foncé sur fond clair
        ghost:
          "bg-white/70 text-ink ring-1 ring-ink/10 hover:bg-white",
      },
      size: {
        md: "px-5 py-3 text-sm",
        lg: "px-7 py-4 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
};

/** Bouton lien (usage principal : CTA vers /soumission, tel:, etc.). */
export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...props
}: ButtonBaseProps & { href: string } & React.ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Link>
  );
}

/** Bouton natif (usage : soumission de formulaire). */
export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: ButtonBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}

export { buttonVariants };
