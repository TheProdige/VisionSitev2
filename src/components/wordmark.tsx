import { cn } from "@/lib/utils";

/**
 * Wordmark Vision Lavage : badge rond (soleil golden-hour + vague turquoise)
 * suivi du nom. `dark` bascule la couleur du texte pour fond clair.
 */
export function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid size-10 place-items-center rounded-2xl bg-brand-600 shadow-[var(--shadow-card)]">
        <svg viewBox="0 0 32 32" className="size-7" aria-hidden role="img">
          {/* soleil */}
          <circle cx="16" cy="12.5" r="5" fill="var(--color-sun-400)" />
          {/* vagues */}
          <path
            d="M3 21c2.6 0 2.6 2 5.2 2s2.6-2 5.2-2 2.6 2 5.2 2 2.6-2 5.2-2 2.6 2 5.2 2"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M3 26c2.6 0 2.6 2 5.2 2s2.6-2 5.2-2 2.6 2 5.2 2 2.6-2 5.2-2 2.6 2 5.2 2"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.6"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span
          className={cn(
            "block font-display text-lg font-semibold tracking-tight",
            dark ? "text-ink" : "text-white"
          )}
        >
          Vision Lavage
        </span>
        <span
          className={cn(
            "block text-[10px] font-semibold uppercase tracking-[0.22em]",
            dark ? "text-brand-600" : "text-brand-100"
          )}
        >
          Salt life · Clean vibes
        </span>
      </span>
    </span>
  );
}
