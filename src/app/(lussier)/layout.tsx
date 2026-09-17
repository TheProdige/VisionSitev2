/**
 * Habillage du site Lussier Électrique : fond et typographie propres, sans
 * l'en-tête ni le pied de page de Vision Lavage.
 */
export default function LussierLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-full bg-[#fafafa] font-lussier text-black">{children}</div>
  );
}
