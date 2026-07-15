/**
 * Configuration centrale de Vision Lavage.
 * Source unique de vérité : coordonnées, services, secteurs desservis, navigation.
 * À ajuster ici — tout le site s'y réfère.
 */

export const site = {
  name: "Vision Lavage",
  tagline: "Salt life · Clean vibes",
  // Adresse courriel où sont envoyées les demandes de soumission.
  email: "visionlavage@gmail.com",
  // Numéro à remplacer par le vrai numéro d'affaires.
  phoneDisplay: "819 000-0000",
  phoneHref: "+18190000000",
  baseVille: "Drummondville",
  region: "Centre-du-Québec, Estrie et Rive-Sud",
  url: "https://visionlavage.ca",
  description:
    "Lavage de vitres et lavage à pression à Drummondville et dans les environs. " +
    "Un crew local, un fini éclatant, une estimation gratuite et sans engagement.",
} as const;

export type ServiceKey = "vitres" | "pression";

export interface Service {
  key: ServiceKey;
  slug: string;
  name: string;
  short: string;
  emoji: string;
  /** Bénéfice principal affiché en accroche. */
  hook: string;
  /** Ce qui est inclus / traité. */
  inclus: string[];
  /** Photo d'entête de la page service. */
  image: string;
  /** Questions fréquentes (SEO + réassurance). */
  faq: { q: string; a: string }[];
  /** Meta description dédiée. */
  metaDescription: string;
}

export const services: Service[] = [
  {
    key: "vitres",
    slug: "lavage-de-vitres",
    name: "Lavage de vitres",
    short: "Des vitres sans traces, dedans comme dehors.",
    emoji: "🪟",
    hook:
      "On redonne à vos fenêtres leur transparence d'origine — sans coulisses, sans traces, sans stress.",
    inclus: [
      "Vitres intérieures et extérieures",
      "Cadres, rebords et moustiquaires",
      "Portes-patio et solariums",
      "Résidentiel et commercial",
      "Puits de lumière et fenêtres en hauteur",
    ],
    image: "/heros/crew/crew-A.png",
    metaDescription:
      "Lavage de vitres résidentiel et commercial à Drummondville et environs. Vitres sans traces, intérieur et extérieur. Estimation gratuite.",
    faq: [
      {
        q: "Lavez-vous les vitres intérieures et extérieures ?",
        a: "Oui. On peut faire l'extérieur seulement, ou l'intérieur et l'extérieur — dites-nous ce dont vous avez besoin dans la soumission.",
      },
      {
        q: "Utilisez-vous des produits sécuritaires ?",
        a: "On travaille avec de l'eau purifiée et des produits doux, sans danger pour vos plantes, vos cadres et l'environnement.",
      },
      {
        q: "À quelle fréquence devrais-je faire laver mes vitres ?",
        a: "Deux fois par an (printemps et automne) suffit pour la plupart des résidences. On peut établir un calendrier récurrent si vous le souhaitez.",
      },
    ],
  },
  {
    key: "pression",
    slug: "lavage-a-pression",
    name: "Lavage à pression",
    short: "On décape la crasse, on ravive vos surfaces.",
    emoji: "💦",
    hook:
      "Entrées, terrasses, revêtements : on efface l'accumulation d'algues, de mousse et de saleté pour un extérieur comme neuf.",
    inclus: [
      "Entrées de garage et allées",
      "Terrasses, patios et clôtures",
      "Revêtements extérieurs (vinyle, brique, aluminium)",
      "Trottoirs et murets",
      "Traitement des mousses et algues",
    ],
    image: "/heros/crew/crew-B.png",
    metaDescription:
      "Lavage à pression à Drummondville et environs : entrées, terrasses, revêtements, clôtures. On enlève mousses et algues. Estimation gratuite.",
    faq: [
      {
        q: "Le lavage à pression peut-il abîmer mes surfaces ?",
        a: "Non, quand c'est bien fait. On ajuste la pression et la technique à chaque matériau — vinyle, brique, bois, béton — pour nettoyer sans endommager.",
      },
      {
        q: "Pouvez-vous enlever les taches vertes d'algues et de mousse ?",
        a: "Oui. C'est justement notre spécialité : on traite en profondeur pour un résultat durable, pas juste en surface.",
      },
      {
        q: "Faut-il que je sois présent pendant les travaux ?",
        a: "Pas nécessairement, tant qu'on a accès à l'eau et aux surfaces. On s'organise avec vous au moment de la planification.",
      },
    ],
  },
];

/** Secteurs desservis — Drummondville prioritaire, puis en ordre de priorité. */
export interface Secteur {
  slug: string;
  name: string;
  priority: number;
  /** Précision géographique pour le SEO local. */
  blurb: string;
}

export const secteurs: Secteur[] = [
  { slug: "drummondville", name: "Drummondville", priority: 1, blurb: "Notre point d'ancrage. Service rapide dans tous les quartiers." },
  { slug: "bromont", name: "Bromont", priority: 2, blurb: "Résidences et chalets — vitres et surfaces impeccables." },
  { slug: "magog", name: "Magog", priority: 3, blurb: "Bord du lac : on garde vos vitres claires face au paysage." },
  { slug: "orford", name: "Orford", priority: 4, blurb: "Propriétés de montagne et de villégiature." },
  { slug: "granby", name: "Granby", priority: 5, blurb: "Résidentiel et commercial, avec le même soin." },
  { slug: "trois-rivieres", name: "Trois-Rivières", priority: 6, blurb: "Un fini éclatant pour la région trifluvienne." },
  { slug: "candiac", name: "Candiac", priority: 7, blurb: "Rive-Sud : entrées, terrasses et vitres nickel." },
  { slug: "brossard", name: "Brossard", priority: 8, blurb: "Maisons et commerces sur la Rive-Sud." },
  { slug: "saint-bruno", name: "Saint-Bruno", priority: 9, blurb: "Au pied du mont, des surfaces qui brillent." },
];

export const nav = [
  { href: "/services/lavage-de-vitres", label: "Lavage de vitres" },
  { href: "/services/lavage-a-pression", label: "Lavage à pression" },
  { href: "/secteurs", label: "Secteurs" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
] as const;
