/**
 * Catalogue de services. Chaque entrée génère une page `/services/[slug]`
 * et une carte sur l'accueil.
 *
 * `intro` sert de meta description : la garder sous ~155 caractères.
 */

export type Service = {
  slug: string
  titre: string
  clientele: 'Résidentiel' | 'Commercial' | 'Les deux'
  resume: string
  intro: string
  prestations: string[]
  /** Question fréquente, affichée en bas de la page service. */
  faq: { question: string; reponse: string }[]
  urgence?: boolean
}

export const services: Service[] = [
  {
    slug: 'depannage-urgence',
    titre: 'Dépannage d’urgence',
    clientele: 'Les deux',
    urgence: true,
    resume:
      'Panne, odeur de brûlé, disjoncteur qui saute sans arrêt : on répond jour et nuit.',
    intro:
      'Dépannage électrique d’urgence 24/7 au Québec. Panne, court-circuit, ' +
      'odeur de brûlé : un maître électricien se déplace.',
    prestations: [
      'Panne totale ou partielle de courant',
      'Disjoncteur qui déclenche à répétition',
      'Odeur de brûlé, prise ou interrupteur qui chauffe',
      'Dégât d’eau ayant touché une installation électrique',
      'Remise en service après un sinistre',
    ],
    faq: [
      {
        question: 'Que faire avant l’arrivée de l’électricien ?',
        reponse:
          'S’il y a une odeur de brûlé ou de la fumée, coupez l’entrée ' +
          'principale au panneau si vous pouvez le faire sans risque, et ' +
          'sortez. En cas de feu, appelez le 911 avant de nous appeler.',
      },
      {
        question: 'Les urgences coûtent-elles plus cher ?',
        reponse:
          'Un déplacement hors des heures ouvrables est facturé à un taux ' +
          'majoré. Le taux vous est annoncé au téléphone, avant le départ.',
      },
    ],
  },
  {
    slug: 'panneau-electrique',
    titre: 'Panneau électrique et entrée de service',
    clientele: 'Les deux',
    resume:
      'Remplacement de panneau, augmentation d’ampérage, mise aux normes de l’entrée.',
    intro:
      'Remplacement et mise à niveau de panneau électrique : passage à 200 A, ' +
      'retrait des panneaux à fusibles, mise aux normes de l’entrée de service.',
    prestations: [
      'Remplacement d’un panneau à fusibles',
      'Passage de 100 A à 200 A',
      'Ajout d’un panneau secondaire',
      'Mise à la terre et mise aux normes de l’entrée',
      'Coordination avec Hydro-Québec pour le raccordement',
    ],
    faq: [
      {
        question: 'Dois-je passer à 200 A ?',
        reponse:
          'C’est souvent nécessaire quand on ajoute une borne de recharge, ' +
          'un spa, une thermopompe ou un plancher chauffant. On calcule la ' +
          'charge réelle de votre bâtiment avant de recommander quoi que ce soit.',
      },
      {
        question: 'Combien de temps dure l’intervention ?',
        reponse:
          'Le remplacement d’un panneau résidentiel prend généralement une ' +
          'journée, avec une coupure de courant de quelques heures.',
      },
    ],
  },
  {
    slug: 'borne-recharge',
    titre: 'Borne de recharge pour véhicule électrique',
    clientele: 'Les deux',
    resume:
      'Installation de bornes 240 V à domicile ou en milieu commercial, admissibles aux subventions.',
    intro:
      'Installation de bornes de recharge 240 V pour véhicule électrique, ' +
      'à domicile comme en stationnement commercial.',
    prestations: [
      'Borne résidentielle 240 V (niveau 2)',
      'Vérification de la capacité du panneau',
      'Bornes multiples pour immeubles et entreprises',
      'Gestion de charge pour éviter une mise à niveau d’entrée',
      'Accompagnement pour les programmes de subvention',
    ],
    faq: [
      {
        question: 'Mon panneau peut-il recevoir une borne ?',
        reponse:
          'Pas toujours. On fait un calcul de charge selon le Code : selon le ' +
          'résultat, une gestion de charge suffit, ou il faut augmenter ' +
          'l’entrée de service.',
      },
      {
        question: 'Y a-t-il des subventions ?',
        reponse:
          'Des programmes existent pour le résidentiel et pour les ' +
          'entreprises. On vous indique lesquels s’appliquent et on fournit ' +
          'les documents demandés.',
      },
    ],
  },
  {
    slug: 'renovation-residentielle',
    titre: 'Rénovation et construction résidentielle',
    clientele: 'Résidentiel',
    resume:
      'Filage complet, ajout de circuits, éclairage, sous-sol, agrandissement.',
    intro:
      'Travaux électriques de rénovation résidentielle : filage, circuits, ' +
      'éclairage et mise aux normes, du sous-sol à l’agrandissement.',
    prestations: [
      'Filage complet d’une construction neuve',
      'Aménagement de sous-sol',
      'Ajout de prises et de circuits dédiés',
      'Éclairage encastré et sur rail',
      'Remplacement de filage aluminium ou de câblage désuet',
      'Plancher chauffant et thermopompe',
    ],
    faq: [
      {
        question: 'Faut-il un permis ?',
        reponse:
          'La plupart des travaux touchant le filage ou le panneau exigent ' +
          'une déclaration de travaux. C’est nous qui nous en occupons.',
      },
      {
        question: 'Travaillez-vous avec mon entrepreneur général ?',
        reponse:
          'Oui. On se coordonne avec les autres corps de métier et on ' +
          'respecte le calendrier du chantier.',
      },
    ],
  },
  {
    slug: 'commercial',
    titre: 'Électricité commerciale',
    clientele: 'Commercial',
    resume:
      'Locaux, commerces et bureaux : aménagement, éclairage LED, entretien préventif.',
    intro:
      'Travaux électriques commerciaux : aménagement de local, éclairage LED, ' +
      'mise aux normes et entretien préventif.',
    prestations: [
      'Aménagement et réaménagement de local',
      'Conversion d’éclairage vers le LED',
      'Éclairage d’urgence et de sortie',
      'Entretien préventif et inspection thermographique',
      'Alimentation d’équipements spécialisés',
      'Contrats d’entretien annuels',
    ],
    faq: [
      {
        question: 'Pouvez-vous travailler hors des heures d’ouverture ?',
        reponse:
          'Oui. Pour un commerce, on planifie généralement les travaux le ' +
          'soir ou la fin de semaine afin de ne pas interrompre vos activités.',
      },
      {
        question: 'Qu’est-ce qu’une inspection thermographique ?',
        reponse:
          'Une lecture à la caméra thermique des panneaux et des connexions. ' +
          'Elle repère les points chauds — donc les pannes et les débuts ' +
          'd’incendie — avant qu’ils ne surviennent.',
      },
    ],
  },
  {
    slug: 'mise-aux-normes',
    titre: 'Inspection et mise aux normes',
    clientele: 'Les deux',
    resume:
      'Rapport avant achat, correction d’avis de non-conformité, remise à niveau.',
    intro:
      'Inspection électrique et mise aux normes : rapport avant achat, ' +
      'correction d’avis de non-conformité et remise à niveau d’installation.',
    prestations: [
      'Inspection avant achat ou avant vente',
      'Correction d’un avis de non-conformité',
      'Remplacement de filage non conforme',
      'Ajout de disjoncteurs différentiels (DDFT) et AFCI',
      'Mise à la terre et continuité des masses',
      'Rapport écrit remis au client',
    ],
    faq: [
      {
        question: 'Mon assureur exige une mise aux normes. Que faites-vous ?',
        reponse:
          'On inspecte, on corrige ce qui doit l’être et on vous remet un ' +
          'rapport que vous pouvez transmettre à votre assureur.',
      },
      {
        question: 'Le filage en aluminium est-il dangereux ?',
        reponse:
          'Pas en soi, mais les raccords se relâchent en vieillissant et ' +
          'chauffent. On vérifie les connexions et on les corrige au besoin.',
      },
    ],
  },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)
