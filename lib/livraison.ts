import { site } from '@/content/site'

export type Demande = {
  nom: string
  telephone: string
  courriel: string
  ville: string
  service: string
  urgent: boolean
  message: string
}

/**
 * Achemine une demande de soumission vers la boîte de l'entreprise.
 *
 * Aucun fournisseur d'envoi n'est câblé par défaut : il faut choisir celui de
 * l'hébergeur et renseigner les variables d'environnement. Tant que ce n'est
 * pas fait, la fonction refuse la demande au lieu de faire croire au visiteur
 * qu'elle est partie — une soumission perdue en silence, pour un artisan,
 * c'est un contrat perdu.
 *
 * Configuration attendue (voir `.env.example`) :
 *   RESEND_API_KEY   clé d'API Resend
 *   COURRIEL_DESTINATAIRE  boîte qui reçoit les demandes
 *   COURRIEL_EXPEDITEUR    adresse d'envoi, sur un domaine vérifié
 */
export async function livrerDemande(demande: Demande): Promise<void> {
  const cle = process.env.RESEND_API_KEY
  const destinataire = process.env.COURRIEL_DESTINATAIRE
  const expediteur = process.env.COURRIEL_EXPEDITEUR

  if (!cle || !destinataire || !expediteur) {
    throw new Error(
      'Envoi de courriel non configuré : RESEND_API_KEY, ' +
        'COURRIEL_DESTINATAIRE et COURRIEL_EXPEDITEUR sont requis.'
    )
  }

  const sujet = demande.urgent
    ? `🚨 URGENCE — ${demande.nom} (${demande.ville})`
    : `Soumission — ${demande.nom} (${demande.ville})`

  const corps = [
    `Nom       : ${demande.nom}`,
    `Téléphone : ${demande.telephone}`,
    `Courriel  : ${demande.courriel || '—'}`,
    `Ville     : ${demande.ville}`,
    `Service   : ${demande.service}`,
    `Urgence   : ${demande.urgent ? 'OUI' : 'non'}`,
    '',
    demande.message,
  ].join('\n')

  const reponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cle}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `${site.nom} <${expediteur}>`,
      to: [destinataire],
      // La réponse doit partir vers le client, pas vers le site.
      reply_to: demande.courriel || undefined,
      subject: sujet,
      text: corps,
    }),
  })

  if (!reponse.ok) {
    throw new Error(
      `Resend a répondu ${reponse.status} : ${await reponse.text()}`
    )
  }
}
