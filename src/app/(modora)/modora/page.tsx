import type { Metadata } from "next";
import { ModoraHeader } from "@/components/modora/header";
import { Hero } from "@/components/modora/hero";
import { About } from "@/components/modora/about";
import { Services } from "@/components/modora/services";
import { Process } from "@/components/modora/process";
import { Benefits } from "@/components/modora/benefits";
import { Projects } from "@/components/modora/projects";
import { Testimonials } from "@/components/modora/testimonials";
import { Blog } from "@/components/modora/blog";
import { CtaBand } from "@/components/modora/cta";
import { ModoraFooter } from "@/components/modora/footer";

const description =
  "Modora is a modern template for modular and tiny home builders, prefab housing companies, and sustainable living brands.";

export const metadata: Metadata = {
  // `absolute` empêche le gabarit de titre de Vision Lavage de s'appliquer ici.
  title: { absolute: "Modora — Modular & Tiny Home Builder" },
  description,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Modora",
    title: "Modora — Modular & Tiny Home Builder",
    description,
    images: [],
  },
  twitter: { card: "summary_large_image", title: "Modora", description, images: [] },
  alternates: { canonical: "/modora" },
  robots: { index: false, follow: false },
};

export default function ModoraPage() {
  return (
    <>
      <ModoraHeader />
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
      <ModoraFooter />
    </>
  );
}
