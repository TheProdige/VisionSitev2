import Link from "next/link";
import { FileText } from "lucide-react";

/** Bouton flottant mobile — la soumission reste toujours à portée de pouce. */
export function FloatingCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 md:hidden">
      <Link
        href="/soumission"
        className="flex items-center justify-center gap-2 rounded-2xl bg-clay-600 px-5 py-4 text-base font-bold text-sand-100 shadow-[0_-8px_30px_-8px_rgba(42,32,25,.5)]"
      >
        <FileText className="size-5" aria-hidden />
        Obtenir ma soumission gratuite
      </Link>
    </div>
  );
}
