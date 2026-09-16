# Lussier Électrique

Site vitrine de **Lussier Électrique**, entrepreneur électricien au Québec —
résidentiel, commercial et dépannage d'urgence 24/7.

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. Toutes les
pages sont prérendues statiquement.

## Démarrer

```sh
npm install
npm run dev
```

## Avant la mise en ligne

Le contenu de l'entreprise est **centralisé dans deux fichiers** : il n'y a pas
à fouiller les composants.

| Fichier | Contient |
| --- | --- |
| `content/site.ts` | Nom, domaine, téléphone, courriel, ville, **licence RBQ**, zones desservies, horaires |
| `content/services.ts` | Les six services, leurs prestations et leurs questions fréquentes |

Les valeurs marquées `À REMPLIR` sont des placeholders. Trois d'entre elles ne
peuvent pas partir en production telles quelles :

- **`licences.rbq`** — mention obligatoire pour un entrepreneur électricien au
  Québec. Le numéro est publiquement vérifiable : afficher un faux numéro
  expose à des sanctions.
- **`contact.telephone`** — le site pousse à l'appel partout ; un mauvais
  numéro rend le reste inutile.
- **`url`** — sert aux balises canoniques, au sitemap et aux données
  structurées.

Le texte de `app/a-propos/page.tsx` est également un canevas, à remplacer par
le parcours réel de l'entreprise.

## Réception des demandes de soumission

Le formulaire n'envoie rien tant qu'un fournisseur de courriel n'est pas
configuré — et il le dit au visiteur plutôt que d'afficher un faux succès.
Copier `.env.example` vers `.env.local` et renseigner :

```
RESEND_API_KEY=
COURRIEL_DESTINATAIRE=
COURRIEL_EXPEDITEUR=
```

Pour un autre fournisseur, seule `lib/livraison.ts` est à réécrire.

## Identité visuelle

Piste retenue : **A — « L'accent éclair »**, où le « I » de LUSSIER devient un
éclair. Encre `#0B0E14`, ambre `#FFB524`, typographie Archivo.

Les couleurs et la typo passent toutes par les jetons de `app/globals.css`.
Ils sont nommés par leur rôle (`marque`, `accent`, `clair`) et non par leur
couleur : changer de direction visuelle ne touche que ce bloc.

Les sources du logo, les deux autres pistes et l'outillage de design sont
documentés dans [`design/README.md`](design/README.md).

## Scripts

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Développement |
| `npm run build` | Build de production |
| `npm run lint` | ESLint |
| `node design/capture.mjs` | Captures de revue, bureau et mobile |
| `node design/verifier-formulaire.mjs` | Test du formulaire dans un navigateur |
| `node design/build-logos.mjs` | Régénère les SVG des pistes de logo |
