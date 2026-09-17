import type { Metadata } from "next";
import { LussierHeader } from "@/components/lussier/header";
import { Hero } from "@/components/lussier/hero";
import { About } from "@/components/lussier/about";
import { Services } from "@/components/lussier/services";
import { Process } from "@/components/lussier/process";
import { Benefits } from "@/components/lussier/benefits";
import { Projects } from "@/components/lussier/projects";
import { Testimonials } from "@/components/lussier/testimonials";
import { Blog } from "@/components/lussier/blog";
import { CtaBand } from "@/components/lussier/cta";
import { LussierFooter } from "@/components/lussier/footer";

const description =
  "Entrepreneur électricien : panneaux électriques, bornes de recharge, mises aux normes et éclairage, au Centre-du-Québec.";

export const metadata: Metadata = {
  // `absolute` empêche le gabarit de titre de Vision Lavage de s'appliquer ici.
  title: { absolute: "Lussier Électrique — Maîtres électriciens" },
  description,
  openGraph: {
    type: "website",
    locale: "fr_CA",
    siteName: "Lussier Électrique",
    title: "Lussier Électrique — Maîtres électriciens",
    description,
    images: [],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lussier Électrique",
    description,
    images: [],
  },
  alternates: { canonical: "/lussier" },
  // Maquette : contenu et visuels de démonstration, à ne pas indexer.
  robots: { index: false, follow: false },
};

export default function LussierPage() {
  return (
    <>
      <LussierHeader />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Benefits />
        <Projects />
        <Testimonials />
        <Blog />
        <CtaBand />
      </main>
      <LussierFooter />
    </>
  );
}
