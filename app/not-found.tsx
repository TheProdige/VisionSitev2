import { Bouton, Conteneur } from '@/components/ui'
import { site, telHref } from '@/content/site'

export default function Introuvable() {
  return (
    <Conteneur className="py-24 text-center sm:py-32">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent-700">
        Erreur 404
      </p>
      <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
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
