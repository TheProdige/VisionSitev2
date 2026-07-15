"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  soumissionSchema,
  serviceLabels,
  type SoumissionInput,
} from "@/lib/soumission-schema";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-ink placeholder:text-ink-soft/60 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

export function SoumissionForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SoumissionInput>({
    resolver: zodResolver(soumissionSchema),
    defaultValues: { services: [], typePropriete: "residentiel" },
  });

  async function onSubmit(values: SoumissionInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/soumission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Une erreur est survenue.");
      }
      setSubmitted(true);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Une erreur est survenue. Réessayez ou appelez-nous."
      );
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-8 text-center shadow-[var(--shadow-card)] ring-1 ring-ink/5 sm:p-12">
        <span className="grid size-16 place-items-center rounded-full bg-brand-600/10 text-brand-700">
          <CheckCircle2 className="size-9" aria-hidden />
        </span>
        <h2 className="font-display text-2xl font-semibold text-ink">Demande envoyée !</h2>
        <p className="max-w-md text-ink-soft">
          Merci ! On a bien reçu votre demande et on vous revient rapidement avec une estimation.
          Un besoin urgent ? Appelez-nous directement.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-5 rounded-3xl bg-white p-6 shadow-[var(--shadow-card)] ring-1 ring-ink/5 sm:p-8"
      noValidate
    >
      {/* Honeypot anti-spam (caché) */}
      <div className="hidden" aria-hidden>
        <label>
          Ne pas remplir
          <input type="text" tabIndex={-1} autoComplete="off" {...register("entreprise")} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom complet" error={errors.nom?.message} required>
          <input
            className={cn(fieldBase, errors.nom && "border-red-400")}
            placeholder="Jean Tremblay"
            autoComplete="name"
            {...register("nom")}
          />
        </Field>
        <Field label="Téléphone" error={errors.telephone?.message} required>
          <input
            className={cn(fieldBase, errors.telephone && "border-red-400")}
            placeholder="819 000-0000"
            inputMode="tel"
            autoComplete="tel"
            {...register("telephone")}
          />
        </Field>
        <Field label="Courriel (optionnel)" error={errors.courriel?.message}>
          <input
            className={cn(fieldBase, errors.courriel && "border-red-400")}
            placeholder="vous@exemple.com"
            inputMode="email"
            autoComplete="email"
            {...register("courriel")}
          />
        </Field>
        <Field label="Ville" error={errors.ville?.message} required>
          <input
            className={cn(fieldBase, errors.ville && "border-red-400")}
            placeholder="Drummondville"
            autoComplete="address-level2"
            {...register("ville")}
          />
        </Field>
      </div>

      <Field label="Service(s) souhaité(s)" error={errors.services?.message} required>
        <div className="flex flex-wrap gap-3">
          {(Object.keys(serviceLabels) as ("vitres" | "pression")[]).map((key) => (
            <label
              key={key}
              className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-medium text-ink has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50"
            >
              <input
                type="checkbox"
                value={key}
                className="size-4 accent-brand-600"
                {...register("services")}
              />
              {serviceLabels[key]}
            </label>
          ))}
        </div>
      </Field>

      <Field label="Type de propriété" error={errors.typePropriete?.message} required>
        <div className="flex flex-wrap gap-3">
          {[
            { value: "residentiel", label: "Résidentiel" },
            { value: "commercial", label: "Commercial" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm font-medium text-ink has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50"
            >
              <input
                type="radio"
                value={opt.value}
                className="size-4 accent-brand-600"
                {...register("typePropriete")}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </Field>

      <Field label="Détails (optionnel)" error={errors.message?.message}>
        <textarea
          className={cn(fieldBase, "min-h-28 resize-y")}
          placeholder="Ex. : maison à deux étages, environ 20 fenêtres, entrée de garage à laver…"
          {...register("message")}
        />
      </Field>

      {serverError && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {serverError}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden /> Envoi en cours…
          </>
        ) : (
          "Envoyer ma demande de soumission"
        )}
      </Button>
      <p className="text-center text-xs text-ink-soft">
        En envoyant ce formulaire, vous acceptez d'être contacté au sujet de votre demande.
        Aucune obligation.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-brand-600"> *</span>}
      </span>
      {children}
      {error && <span className="text-sm font-medium text-red-600">{error}</span>}
    </label>
  );
}
