import { site } from '@/content/site'
import {
  estRobot,
  lireDemande,
  validerDemande,
  type EtatFormulaire,
} from './validation'

export type { EtatFormulaire }

/**
 * Remplace la fonction serveur dans le build statique (`EXPORT_STATIQUE=1`),
 * substitué via `turbopack.resolveExtensions` dans `next.config.ts`.
 *
 * Un export statique n'a pas de serveur pour recevoir la demande. Le
 * formulaire valide donc la saisie exactement comme en production — mêmes
 * règles, module partagé — puis dirige le visiteur vers le téléphone, au lieu
 * d'afficher un succès qui n'enverrait rien.
 */
export async function envoyerDemande(
  _precedent: EtatFormulaire,
  donnees: FormData
): Promise<EtatFormulaire> {
  if (estRobot(donnees)) return { statut: 'succes' }

  const demande = lireDemande(donnees)
  const champs = validerDemande(demande)

  if (Object.keys(champs).length > 0) {
    return {
      statut: 'erreur',
      message: 'Quelques champs sont à corriger.',
      champs,
      valeurs: demande,
    }
  }

  return {
    statut: 'erreur',
    message: `Cet aperçu n’envoie pas les demandes. Appelez au ${site.contact.telephoneAffiche} — c’est de toute façon le plus rapide.`,
    valeurs: demande,
  }
}
