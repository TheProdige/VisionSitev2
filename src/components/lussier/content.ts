/**
 * Contenu du site Lussier Électrique.
 *
 * Tout le texte, les images et les liens de la page vivent ici : c'est le seul
 * fichier à toucher pour ajuster le contenu. Les composants de section ne
 * contiennent que de la mise en page.
 *
 * À remplacer avant une mise en ligne :
 *   - `brand.phone` : numéro fictif (plage 555 réservée à la fiction).
 *   - `testimonials` : témoignages et portraits de démonstration, générés.
 *     Ne jamais publier ces citations comme de vrais avis clients.
 *   - `projects` : réalisations d'exemple.
 *   - Les images de `public/lussier` sont générées ; les remplacer par des
 *     photos réelles de chantiers.
 */

export const brand = {
  name: "Lussier Électrique",
  short: "Lussier",
  phone: "819 555-0142",
  phoneHref: "tel:+18195550142",
};

export const nav = [
  {
    label: "Tous les services",
    href: "#services",
    items: [
      "Panneau électrique",
      "Borne de recharge",
      "Mise aux normes",
      "Éclairage",
      "Panneaux solaires",
    ],
  },
  { label: "À propos", href: "#a-propos" },
  { label: "Services", href: "#services" },
  { label: "Réalisations", href: "#realisations" },
];

export const hero = {
  title: ["Le travail bien fait,", "jusqu'au dernier fil"],
  primary: { label: "Voir nos services", href: "#services" },
  secondary: { label: "Nous joindre", href: "#contact" },
  scrollLabel: "Découvrir",
  image: "/lussier/hero-bg.webp",
  card: {
    tag: "Conseil",
    title: "Batterie résidentielle : est-ce que ça vaut le coup ?",
    image: "/lussier/blog-1.webp",
    href: "#conseils",
  },
};

export const about = {
  eyebrow: "À propos de Lussier Électrique",
  statement:
    "Nous câblons, rénovons et modernisons les installations électriques résidentielles et commerciales, avec le même soin du détail à chaque raccordement.",
  cards: [
    {
      title: "Travail soigné",
      body: "Des panneaux ordonnés, des conduits alignés, des circuits identifiés un par un : le genre d'installation qu'on est content de vous montrer à la fin.",
      image: "/lussier/about-1.webp",
    },
    {
      title: "Maîtres électriciens",
      body: "Une équipe licenciée RBQ et membre de la CMEQ, formée aux exigences du Code de construction du Québec, chapitre Électricité.",
      image: "/lussier/about-2.webp",
    },
    {
      title: "Devis clair",
      body: "Un prix détaillé avant de commencer, matériaux et main-d'œuvre séparés, sans extra de dernière minute une fois les murs ouverts.",
      image: "/lussier/about-3.webp",
    },
  ],
};

export const services = {
  eyebrow: "Services",
  title: ["Du panneau à la borne,", "on s'occupe de tout"],
  images: ["/lussier/service-1.webp", "/lussier/service-2.webp"],
  cta: { label: "Voir tous les services", href: "#services" },
  items: [
    "Installation de panneau électrique",
    "Entrée électrique 200 A",
    "Borne de recharge pour véhicule",
    "Mise aux normes",
    "Éclairage intérieur et extérieur",
    "Recherche de panne",
    "Filage de rénovation",
    "Génératrice d'urgence",
    "Panneaux solaires",
  ],
};

export const process = {
  eyebrow: "Notre façon de faire",
  title: ["Une méthode simple,", "du devis à la mise sous tension"],
  band: "/lussier/process-band.webp",
  steps: [
    {
      n: "01",
      title: "Évaluation",
      body: "On passe sur place, on regarde l'installation existante et on écoute ce dont vous avez besoin.",
    },
    {
      n: "02",
      title: "Devis détaillé",
      body: "Un prix ferme, ligne par ligne, avec les matériaux et les délais. Aucune surprise en cours de route.",
    },
    {
      n: "03",
      title: "Installation",
      body: "Une équipe licenciée, un chantier tenu propre, et le courant rétabli le jour même quand c'est possible.",
    },
    {
      n: "04",
      title: "Vérification",
      body: "Essais, identification complète du panneau et attestation de conformité remise à la fin des travaux.",
    },
  ],
};

export const benefits = {
  eyebrow: "Une maison bien alimentée",
  background: "/lussier/benefits-bg.webp",
  /**
   * Points d'intérêt annotés posés sur la photo épinglée. `x` et `y` sont en
   * pourcentage de l'image ; `card` place la fiche par rapport au point.
   */
  hotspots: [
    {
      title: "Toiture solaire",
      body: "Production raccordée au réseau, avec onduleur et sectionneur installés selon les exigences d'Hydro-Québec.",
      x: 43,
      y: 30,
      card: { left: "17%", top: "14%" },
    },
    {
      title: "Borne de recharge",
      body: "Une borne de niveau 2 sur circuit dédié, dimensionnée pour votre véhicule et la capacité réelle de votre entrée.",
      x: 62,
      y: 58,
      card: { left: "64%", top: "24%" },
    },
    {
      title: "Entrée et panneau",
      body: "Entrée de 200 A, panneau identifié au complet et mise à la terre vérifiée avant la mise sous tension.",
      x: 30,
      y: 66,
      card: { left: "8%", top: "62%" },
    },
  ],
};

export const projects = {
  eyebrow: "Réalisations",
  title: ["Des installations", "faites pour durer"],
  items: [
    {
      tag: "Résidentiel",
      title: "Toiture solaire, 24 panneaux",
      body: "Raccordement au réseau, onduleur et suivi de production sur une maison de plain-pied.",
      image: "/lussier/project-1.webp",
      href: "#realisations",
    },
    {
      tag: "Mise aux normes",
      title: "Entrée électrique 200 A",
      body: "Remplacement complet de l'entrée et du panneau dans une maison des années 60.",
      image: "/lussier/project-2.webp",
      href: "#realisations",
    },
    {
      tag: "Recharge",
      title: "Deux bornes en abri d'auto",
      body: "Circuits dédiés et gestion de charge pour deux véhicules sur la même entrée.",
      image: "/lussier/project-3.webp",
      href: "#realisations",
    },
  ],
};

export const testimonials = {
  eyebrow: "Nos clients",
  title: ["Ce que disent", "nos clients"],
  /**
   * TÉMOIGNAGES DE DÉMONSTRATION — citations, noms et portraits inventés,
   * là uniquement pour montrer la mise en page. À remplacer par de vrais
   * avis, avec l'accord des personnes, avant toute mise en ligne.
   */
  items: [
    {
      quote:
        "Le panneau a été remplacé en une journée, tout est identifié au crayon, et ils ont passé le balai avant de partir. Rien à redire.",
      name: "Témoignage à venir",
      role: "Client résidentiel",
      avatar: "/lussier/avatar-1.webp",
      poster: "/lussier/testimonial-1.webp",
      /** Dépose un .mp4 dans /public/lussier et mets son chemin ici pour activer la lecture. */
      video: null as string | null,
    },
    {
      quote:
        "On a fait installer la borne de recharge en même temps que la mise aux normes. Le devis annoncé est exactement ce qu'on a payé.",
      name: "Témoignage à venir",
      role: "Cliente résidentielle",
      avatar: "/lussier/avatar-2.webp",
      poster: "/lussier/testimonial-2.webp",
      video: null as string | null,
    },
    {
      quote:
        "Ils ont trouvé la panne en moins d'une heure alors que ça durait depuis des mois. Explications claires, travail propre.",
      name: "Témoignage à venir",
      role: "Client commercial",
      avatar: "/lussier/avatar-3.webp",
      poster: "/lussier/testimonial-3.webp",
      video: null as string | null,
    },
  ],
};

export const blog = {
  eyebrow: "Conseils et repères",
  title: ["Comprendre votre", "installation électrique"],
  cta: { label: "Voir tous les articles", href: "#conseils" },
  posts: [
    {
      date: "12 août 2026",
      title: "Batterie résidentielle : est-ce que ça vaut le coup ?",
      body: "Autonomie réelle, capacité de l'entrée et coût d'installation : les points à peser avant de se lancer.",
      image: "/lussier/blog-1.webp",
      href: "#conseils",
    },
    {
      date: "8 août 2026",
      title: "Faut-il passer à une entrée de 200 A ?",
      body: "Les signes qu'une entrée de 100 A ne suffit plus, et ce que le remplacement implique concrètement.",
      image: "/lussier/blog-2.webp",
      href: "#conseils",
    },
    {
      date: "8 août 2026",
      title: "Borne de recharge : ce qu'il faut vérifier avant d'installer",
      body: "Circuit dédié, gestion de charge et capacité disponible au panneau : le tour de la question en cinq minutes.",
      image: "/lussier/blog-3.webp",
      href: "#conseils",
    },
  ],
};

export const cta = {
  title: ["Une installation", "prête pour la suite"],
  body: [
    "Panneaux, bornes de recharge et mises aux normes",
    "réalisés par des maîtres électriciens licenciés",
  ],
  button: { label: "Demander une soumission", href: "#contact" },
  image: "/lussier/cta-bg.webp",
  features: [
    {
      icon: "clipboard",
      title: "Licence RBQ et CMEQ",
      body: "Une équipe licenciée, assurée et formée aux normes en vigueur au Québec.",
    },
    {
      icon: "user",
      title: "Plus de 20 ans de métier",
      body: "Du résidentiel au commercial léger, partout au Centre-du-Québec.",
    },
    {
      icon: "badge",
      title: "Garantie écrite",
      body: "Main-d'œuvre et matériaux garantis par écrit, sans clause cachée.",
    },
  ],
};

export const footer = {
  columns: [
    { title: "Pages", links: ["Accueil", "À propos", "Services"] },
    { title: "Ressources", links: ["Conseils", "Nous joindre"] },
    {
      title: "Services",
      links: ["Panneau électrique", "Borne de recharge", "Mise aux normes"],
    },
    { title: "Légal", links: ["Conditions générales", "Confidentialité", "404"] },
  ],
  copyright: "© 2026 Lussier Électrique",
  disclaimer:
    "Lussier Électrique est un entrepreneur électricien. Les travaux sont exécutés conformément au Code de construction du Québec, chapitre V — Électricité, et aux exigences du distributeur. Les renseignements présentés sur ce site sont d'ordre général et ne constituent pas un avis technique, juridique ou financier. Les prix, délais, capacités et disponibilités varient selon l'état de l'installation existante, la capacité de l'entrée électrique, les matériaux et les autorisations applicables. Toute soumission est établie après visite des lieux.",
};
