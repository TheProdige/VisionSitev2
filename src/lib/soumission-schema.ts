import { z } from "zod";

/** Schéma partagé (client + serveur) de la demande de soumission. */
export const soumissionSchema = z.object({
  nom: z.string().min(2, "Entrez votre nom.").max(80),
  telephone: z
    .string()
    .min(10, "Entrez un numéro de téléphone valide.")
    .max(20)
    .regex(/[0-9]/, "Entrez un numéro de téléphone valide."),
  courriel: z.string().email("Entrez un courriel valide.").max(120).or(z.literal("")).optional(),
  ville: z.string().min(2, "Indiquez votre ville.").max(80),
  services: z
    .array(z.enum(["vitres", "pression"]))
    .min(1, "Choisissez au moins un service."),
  typePropriete: z.enum(["residentiel", "commercial"]),
  message: z.string().max(1500).optional().or(z.literal("")),
  // Champ anti-spam (honeypot) : doit rester vide.
  entreprise: z.string().max(0).optional(),
});

export type SoumissionInput = z.infer<typeof soumissionSchema>;

export const serviceLabels: Record<"vitres" | "pression", string> = {
  vitres: "Lavage de vitres",
  pression: "Lavage à pression",
};

export const proprieteLabels: Record<"residentiel" | "commercial", string> = {
  residentiel: "Résidentiel",
  commercial: "Commercial",
};
