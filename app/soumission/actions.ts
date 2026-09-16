'use server'

import { livrerDemande } from '@/lib/livraison'
import {
  estRobot,
  lireDemande,
  validerDemande,
  type EtatFormulaire,
} from './validation'

export type { EtatFormulaire }

/**
 * Traite une demande de soumission.
 *
 * Cette fonction est joignable par POST direct, pas seulement par le
 * formulaire : toute la validation est refaite ici, côté serveur.
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

  try {
    await livrerDemande(demande)
  } catch (erreur) {
    // La cause exacte reste dans les journaux du serveur : elle peut contenir
    // une clé d'API ou un message du fournisseur, qui n'ont rien à faire dans
    // le navigateur du visiteur.
    console.error('Échec de la livraison de la demande', erreur)
    return {
      statut: 'erreur',
      message:
        'L’envoi a échoué. Appelez-nous directement — on répond plus vite au téléphone de toute façon.',
      valeurs: demande,
    }
  }

  return { statut: 'succes' }
}
