/**
 * Habillage du gabarit Modora : fond et typographie propres, sans l'en-tête
 * ni le pied de page de Vision Lavage.
 */
export default function ModoraLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-full bg-[#fafafa] font-modora text-black">{children}</div>
  );
}
