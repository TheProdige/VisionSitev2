import { Bouton, Conteneur } from '@/components/ui'
import { site, telHref } from '@/content/site'

export default function Introuvable() {
  return (
    <Conteneur className="py-24 text-center sm:py-32">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-accent-700">
        Erreur 404
      </p>
      <h1 className="mt-5 text-[2.6rem] leading-[1.06] sm:text-[3.4rem]">
        Cette page a sauté.
      </h1>
      <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-texte-doux">
        L’adresse demandée n’existe pas ou n’existe plus. Le reste du site, lui,
        est bien alimenté.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Bouton href="/">Retour à l’accueil</Bouton>
        <Bouton href="/services" variante="contour">
          Voir les services
        </Bouton>
        <Bouton href={telHref} variante="contour">
          {site.contact.telephoneAffiche}
        </Bouton>
      </div>
    </Conteneur>
  )
}
