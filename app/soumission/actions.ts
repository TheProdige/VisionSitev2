'use server'

import { livrerDemande, type Demande } from '@/lib/livraison'
import { services } from '@/content/services'

export type EtatFormulaire = {
  statut: 'vierge' | 'succes' | 'erreur'
  message?: string
  /** Erreurs par champ, pour l'affichage sous chaque entrée. */
  champs?: Partial<Record<keyof Demande, string>>
  /**
   * La saisie, renvoyée telle quelle en cas d'échec.
   *
   * React réinitialise un formulaire non contrôlé dès que l'action se termine.
   * Sans ce renvoi, une faute de frappe dans le téléphone effacerait la
   * description du projet que le visiteur vient d'écrire — et il partirait.
   */
  valeurs?: Demande
}

const texte = (v: FormDataEntryValue | null) =>
  typeof v === 'string' ? v.trim() : ''

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
  // Pot de miel : un champ invisible que seuls les robots remplissent.
  if (texte(donnees.get('site_web'))) {
    return { statut: 'succes' }
  }

  const demande: Demande = {
    nom: texte(donnees.get('nom')),
    telephone: texte(donnees.get('telephone')),
    courriel: texte(donnees.get('courriel')),
    ville: texte(donnees.get('ville')),
    service: texte(donnees.get('service')),
    urgent: donnees.get('urgent') === 'on',
    message: texte(donnees.get('message')),
  }

  const champs: EtatFormulaire['champs'] = {}

  if (demande.nom.length < 2) champs.nom = 'Indiquez votre nom.'

  // 10 chiffres, avec ou sans indicatif de pays : on reste permissif sur la
  // mise en forme, le but est d'attraper les fautes de frappe.
  const chiffres = demande.telephone.replace(/\D/g, '')
  if (chiffres.length < 10 || chiffres.length > 11) {
    champs.telephone = 'Numéro à 10 chiffres, par exemple 819 555-1234.'
  }

  if (demande.courriel && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(demande.courriel)) {
    champs.courriel = 'Cette adresse ne semble pas valide.'
  }

  if (!demande.ville) champs.ville = 'Indiquez votre ville.'

  if (demande.service && !services.some((s) => s.titre === demande.service)) {
    champs.service = 'Choisissez un service dans la liste.'
  }

  if (demande.message.length < 10) {
    champs.message = 'Décrivez le projet en quelques mots.'
  }
  if (demande.message.length > 4000) {
    champs.message = 'Message trop long (4000 caractères maximum).'
  }

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
