/**
 * Toutes les données de l'entreprise vivent ici.
 *
 * ⚠️ Les valeurs marquées À REMPLIR sont des placeholders : elles doivent être
 * corrigées avant toute mise en ligne. Le numéro de licence RBQ en particulier
 * est une mention obligatoire pour un entrepreneur électricien au Québec, et
 * afficher un faux numéro expose à des sanctions.
 */

export const site = {
  nom: 'Lussier Électrique',
  nomCourt: 'Lussier',

  /** Utilisé dans les balises canoniques, le sitemap et les données structurées. */
  url: 'https://lussierelectrique.ca', // À REMPLIR — domaine réel

  slogan: 'Maître électricien au service du résidentiel et du commercial.',

  description:
    'Lussier Électrique, entrepreneur électricien. Installation, rénovation, ' +
    'mise aux normes, bornes de recharge et dépannage d’urgence 24/7 pour le ' +
    'résidentiel et le commercial.',

  contact: {
    telephone: '+1-450-000-0000', // À REMPLIR — format E.164, sert aux liens tel:
    telephoneAffiche: '450 000-0000', // À REMPLIR — format lisible
    courriel: 'info@lussierelectrique.ca', // À REMPLIR
    adresse: {
      rue: '', // À REMPLIR si l'entreprise reçoit à un local
      ville: 'Saint-Hyacinthe', // À REMPLIR — ville d'attache
      province: 'QC',
      codePostal: '', // À REMPLIR
    },
  },

  /** Mentions réglementaires. Ne rien inventer : ces numéros sont vérifiables. */
  licences: {
    rbq: '0000-0000-00', // À REMPLIR — numéro de licence RBQ
    cmeq: true, // Membre de la Corporation des maîtres électriciens du Québec
  },

  urgence: {
    actif: true,
    libelle: 'Dépannage d’urgence 24/7',
    promesse: 'Un maître électricien au bout du fil, jour et nuit.',
  },

  /** Villes desservies — nourrit la page contact et le référencement local. */
  zones: [
    'Saint-Hyacinthe',
    'Beloeil',
    'Mont-Saint-Hilaire',
    'Saint-Bruno',
    'Sorel-Tracy',
    'Granby',
    'Rive-Sud de Montréal',
  ], // À AJUSTER — territoire réellement couvert

  /** Chiffres affichés en preuve. Mettre à zéro plutôt que de gonfler. */
  preuves: [
    { valeur: '15 ans', libelle: 'de métier' }, // À REMPLIR
    { valeur: '24/7', libelle: 'pour les urgences' },
    { valeur: '100 %', libelle: 'des travaux garantis' },
  ],

  horaires: {
    semaine: 'Lundi au vendredi, 7 h à 17 h',
    urgence: 'Urgences : 24 heures sur 24, 7 jours sur 7',
  },
} as const

/** Lien `tel:` prêt à l'emploi. */
export const telHref = `tel:${site.contact.telephone}`
