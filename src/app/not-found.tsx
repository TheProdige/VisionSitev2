import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NotFoundContent } from "@/components/not-found-content";

/**
 * 404 global (URL ne correspondant à aucune route). Comme il vit hors du
 * groupe (vision), il porte lui-même l'habillage du site.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col bg-cream text-ink">
      <SiteHeader />
      <main className="flex-1">
        <NotFoundContent />
      </main>
      <SiteFooter />
    </div>
  );
}
