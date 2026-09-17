/**
 * Contenu du gabarit Modora.
 *
 * Tout le texte, les images et les liens de la page vivent ici : c'est le seul
 * fichier à toucher pour rebrander la page. Les composants de section ne
 * contiennent que de la mise en page.
 */

export const brand = {
  name: "Modora",
  phone: "+1 271 281 9795",
  phoneHref: "tel:+12712819795",
};

export const nav = [
  { label: "All Pages", href: "#", items: ["Home", "About Us", "Services", "Blog", "Contact"] },
  { label: "About", href: "#about" },
  { label: "Service", href: "#services" },
  { label: "Project", href: "#projects" },
];

export const hero = {
  title: ["Make more space", "for what matters"],
  primary: { label: "View All Services", href: "#services" },
  secondary: { label: "Contact Now", href: "#contact" },
  scrollLabel: "Explore more",
  image: "/modora/hero-bg.webp",
  card: {
    tag: "News",
    title: "How to Make the Most of a Smaller Space",
    image: "/modora/blog-1.webp",
    href: "#blog",
  },
};

export const about = {
  eyebrow: "About Modora",
  statement:
    "We create modern homes with smart spaces, simple designs, and lasting quality for everyday living.",
  cards: [
    {
      title: "Thoughtful design",
      body: "Innovative designs that transform every room into a cozy, practical, and inviting living space.",
      image: "/modora/about-1.webp",
    },
    {
      title: "Quality craftsmanship",
      body: "Built with quality materials and careful attention to every detail, from the first plan to the final finish.",
      image: "/modora/about-2.webp",
    },
    {
      title: "Built around you",
      body: "Every home is designed around your lifestyle, needs, and vision for better everyday living.",
      image: "/modora/about-3.webp",
    },
  ],
};

export const services = {
  eyebrow: "Services",
  title: ["Building better homes", "with a simple process"],
  images: ["/modora/service-1.webp", "/modora/service-2.webp"],
  cta: { label: "View All Services", href: "#services" },
  items: [
    "Custom home design",
    "Modular home building",
    "Tiny home building",
    "Interior space planning",
    "Home customization",
    "Home delivery setup",
    "Tiny home design",
    "Smart space planning",
    "Exterior home design",
  ],
};

export const process = {
  eyebrow: "Our Process",
  title: ["An easy approach to", "creating better homes"],
  band: "/modora/process-band.webp",
  steps: [
    { n: "01", title: "Smart design", body: "Make the most of every space with practical and thoughtful layouts." },
    { n: "02", title: "Quality materials", body: "We use reliable materials to create comfortable and lasting homes." },
    { n: "03", title: "Efficient building", body: "A streamlined building process helps bring your home to life faster." },
    { n: "04", title: "Flexible living", body: "Create a home that fits your lifestyle, space, and everyday needs." },
  ],
};

export const benefits = {
  eyebrow: "Smart use of space",
  background: "/modora/benefits-bg.webp",
  /**
   * Points d'intérêt annotés posés sur la photo épinglée. `x` et `y` sont en
   * pourcentage de l'image ; `card` place la fiche par rapport au point.
   */
  hotspots: [
    {
      title: "Smart use of space",
      body: "Every detail is planned to give you more comfort, better function, and usable space, while making everyday living simple and enjoyable.",
      x: 43,
      y: 30,
      card: { left: "17%", top: "14%" },
    },
    {
      title: "Thoughtful Design",
      body: "Every element is carefully considered to create a space that feels comfortable, practical, and perfectly suited to everyday living.",
      x: 62,
      y: 58,
      card: { left: "64%", top: "24%" },
    },
    {
      title: "Built for Everyday Living",
      body: "Smart layouts and functional details come together to make daily life easier, more comfortable, and enjoyable.",
      x: 30,
      y: 66,
      card: { left: "8%", top: "62%" },
    },
  ],
};

export const projects = {
  eyebrow: "Our Projects",
  title: ["Creating spaces that", "feel like home"],
  items: [
    {
      tag: "The haven",
      title: "Peaceful haven home",
      body: "A modern modular home designed for comfortable everyday living,",
      image: "/modora/project-1.webp",
      href: "#projects",
    },
    {
      tag: "Modular home",
      title: "Custom home design",
      body: "We design and build modular and tiny homes with smart spaces.",
      image: "/modora/project-2.webp",
      href: "#projects",
    },
    {
      tag: "Tiny home",
      title: "Serene Living Space",
      body: "Thoughtful tiny homes designed to make the most of every space.",
      image: "/modora/project-3.webp",
      href: "#projects",
    },
  ],
};

export const testimonials = {
  eyebrow: "Our Homeowners",
  title: ["What our happy", "homeowners say"],
  items: [
    {
      quote:
        "Working with Modora has transformed our vision into reality with ease and confidence, thanks to their transparent updates.",
      name: "Jack Wyatt",
      role: "Homeowner",
      avatar: "/modora/avatar-1.webp",
      poster: "/modora/testimonial-1.webp",
      /** Dépose un .mp4 dans /public/modora et mets son chemin ici pour activer la lecture. */
      video: null as string | null,
    },
    {
      quote:
        "From the initial plan to the finished home, everything was handled with exceptional care. We now have a comfortable space.",
      name: "Emily Parker",
      role: "Homeowner",
      avatar: "/modora/avatar-2.webp",
      poster: "/modora/testimonial-2.webp",
      video: null as string | null,
    },
    {
      quote:
        "We're so happy with our new modular home. The design is beautiful, the craftsmanship is impressive, and the entire building.",
      name: "Michael Brooks",
      role: "Homeowner",
      avatar: "/modora/avatar-3.webp",
      poster: "/modora/testimonial-3.webp",
      video: null as string | null,
    },
  ],
};

export const blog = {
  eyebrow: "Insights & ideas",
  title: ["How to plan your", "perfect tiny home"],
  cta: { label: "See All Blog", href: "#blog" },
  posts: [
    {
      date: "Aug 12, 2026",
      title: "How to Make the Most of a Smaller Space",
      body: "Explore the essential details that make a tiny home feel open, practical, and comfortable.",
      image: "/modora/blog-1.webp",
      href: "#blog",
    },
    {
      date: "Aug 8, 2026",
      title: "Choosing the Perfect Floor Plan",
      body: "Discover simple tips for designing a cozy tiny home with smart layouts and abundant.",
      image: "/modora/blog-2.webp",
      href: "#blog",
    },
    {
      date: "Aug 8, 2026",
      title: "A Guide to Choosing Your Home",
      body: "Explore simple tips to create a cozy tiny home with smart layouts and abundant natural light.",
      image: "/modora/blog-3.webp",
      href: "#blog",
    },
  ],
};

export const cta = {
  title: ["Homes designed just", "for your life"],
  body: ["Thoughtfully designed modular and tiny", "homes built around your lifestyle"],
  button: { label: "Contact Now", href: "#contact" },
  image: "/modora/cta-bg.webp",
  features: [
    { icon: "clipboard", title: "Certified & guaranteed", body: "Expertly trained teams dedicated to caring for your home." },
    { icon: "user", title: "Over 20 years serving Modora", body: "Trusted expertise on every roof style throughout the borough." },
    { icon: "badge", title: "Guaranteed written warranty", body: "Every project guaranteed in writing no hidden clauses, no hassle." },
  ],
};

export const footer = {
  columns: [
    { title: "Pages", links: ["Home", "About Us", "Services"] },
    { title: "Resource", links: ["Blog", "Contact"] },
    { title: "Services", links: ["Custom home design", "Modular home building", "Tiny home building"] },
    { title: "Legal", links: ["Terms & Conditions", "Privacy Policy", "404"] },
  ],
  copyright: "© 2026 All Right Reserved",
  disclaimer:
    "This website is operated by Modora, a modular and tiny home builder specializing in thoughtfully designed, high-quality homes. Our services are provided in accordance with applicable local building codes, regulations, and industry standards. All information presented on this website is for general informational purposes and does not constitute legal, financial, architectural, or construction advice. Project costs, timelines, specifications, and availability may vary based on location, design, materials, site conditions, and applicable approvals.",
};
