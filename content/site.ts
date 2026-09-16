/**
 * Toutes les données de l'entreprise vivent ici.
 *
 * ⚠️ Les valeurs marquées À REMPLIR sont des placeholders : elles doivent être
 * corrigées avant toute mise en ligne. Le numéro de licence RBQ en particulier
 * est une mention obligatoire pour un entrepreneur électricien au Québec, et
 * afficher un faux numéro expose à des sanctions.
 */

/**
 * Années de métier. `null` tant que le chiffre n'est pas confirmé : la tuile
 * correspondante disparaît alors du héro, plutôt que d'annoncer une ancienneté
 * inventée à des clients qui choisissent justement sur ce critère.
 */
const anneesExperience: number | null = null // À REMPLIR

export const site = {
  nom: 'Lussier Électrique',
  nomCourt: 'Lussier',
  /** Le maître électricien derrière l'entreprise. */
  proprietaire: 'Antoine Lussier',

  /** Utilisé dans les balises canoniques, le sitemap et les données structurées. */
  url: 'https://lussierelectrique.ca', // À REMPLIR — domaine réel

  slogan: 'Maître électricien au service du résidentiel et du commercial.',

  description:
    'Électricien à Drummondville et dans le Centre-du-Québec. Installation, ' +
    'rénovation, mise aux normes, bornes de recharge et dépannage d’urgence ' +
    '24/7, en résidentiel comme en commercial.',

  contact: {
    telephone: '+1-819-817-9526', // format E.164, sert aux liens tel:
    telephoneAffiche: '819 817-9526',
    courriel: 'info@lussierelectrique.ca', // À REMPLIR
    adresse: {
      rue: '', // À REMPLIR si l'entreprise reçoit à un local
      ville: 'Drummondville',
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
    'Drummondville',
    'Saint-Cyrille-de-Wendover',
    'Saint-Germain-de-Grantham',
    'Wickham',
    'Victoriaville',
    'Nicolet',
    'Bécancour',
  ], // À CONFIRMER — villes plausibles autour de Drummondville, pas le
     // territoire déclaré par l'entreprise

  horaires: {
    semaine: 'Lundi au vendredi, 7 h à 17 h',
    urgence: 'Urgences : 24 heures sur 24, 7 jours sur 7',
  },
} as const

/**
 * Chiffres affichés en preuve dans le héro.
 *
 * Rien n'y entre qui ne soit vérifiable : l'ancienneté n'apparaît que si elle
 * est renseignée. Mieux vaut deux tuiles vraies que trois dont une est gonflée.
 */
export const preuves = [
  ...(anneesExperience
    ? [{ valeur: `${anneesExperience} ans`, libelle: 'de métier' }]
    : []),
  { valeur: '24/7', libelle: 'pour les urgences' },
  { valeur: '100 %', libelle: 'des travaux garantis' },
]

/** Lien `tel:` prêt à l'emploi. */
export const telHref = `tel:${site.contact.telephone}`
