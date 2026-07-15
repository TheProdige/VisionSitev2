# Vision Lavage — site web

Site vitrine de **Vision Lavage** (lavage de vitres et lavage à pression), orienté
génération de demandes de soumission. Direction visuelle : côtière « Outer Banks / Pogue »
(Westfalia turquoise, golden hour, tons sable).

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** — système de design dans `src/app/globals.css`
- **React Hook Form + Zod** — formulaire de soumission validé
- **Resend** — envoi des soumissions par courriel
- **lucide-react** — icônes

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis remplir RESEND_API_KEY
npm run dev
```

Ouvrir http://localhost:3000

## Configuration

Toute l'information de l'entreprise est centralisée dans **`src/lib/site.ts`**
(nom, téléphone, courriel, services, secteurs desservis, navigation). C'est le
premier fichier à ajuster.

⚠️ **À remplacer avant la mise en ligne :**
- Le numéro de téléphone `phoneDisplay` / `phoneHref` (placeholder `819 000-0000`).
- Le domaine `url` si différent de `visionlavage.ca`.

## Envoi des soumissions (Resend)

Les demandes du formulaire sont envoyées à `visionlavage@gmail.com` via Resend.

1. Créer un compte sur [resend.com](https://resend.com).
2. Générer une clé API et la mettre dans `RESEND_API_KEY`.
3. (Production) Vérifier un domaine d'envoi et ajuster `SOUMISSION_FROM`.

Sans `RESEND_API_KEY`, le site fonctionne quand même : les demandes sont
journalisées côté serveur (console) et l'utilisateur reçoit une confirmation,
mais aucun courriel n'est envoyé. Pratique en développement.

## Structure

```
src/
  app/
    page.tsx                 # Accueil
    soumission/              # Formulaire de soumission
    services/[slug]/         # Pages services (vitres, pression)
    secteurs/                # Liste + pages par ville (SEO local)
    a-propos/  contact/
    api/soumission/route.ts  # Envoi courriel (Resend)
    sitemap.ts  robots.ts
  components/                # Header, footer, hero, formulaire, UI…
  lib/site.ts                # Config centrale
public/heros/                # Visuels (fonds de héro, crew + Westfalia)
```

## Visuels

Les images de `public/heros/` ont été générées pour établir la direction
artistique. À remplacer par de vraies photos de réalisations (avant/après)
quand elles seront disponibles.
