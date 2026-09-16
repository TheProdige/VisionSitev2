# Design — Lussier Électrique

## Logos

Les pistes de logo sont **générées**, pas dessinées à la main : la piste A
remplace le « I » de LUSSIER par un éclair, ce qui demande la largeur réelle
des glyphes pour savoir où couper le mot. Le script mesure dans Chromium
(polices Google chargées) puis écrit des SVG aux coordonnées figées.

```sh
node design/build-logos.mjs   # régénère design/logos/*.svg
node design/shoot.mjs         # régénère design/planche-logos.png
```

### Dépendance

Ces deux scripts ont besoin de **Playwright**, qui n'est volontairement pas
une dépendance du site (outillage de design, pas de production) :

```sh
npm install -g playwright && npx playwright install chromium
```

Si Playwright est installé globalement, lier les paquets dans le projet :

```sh
ln -sfn "$(npm root -g)/playwright" node_modules/playwright
ln -sfn "$(npm root -g)/playwright-core" node_modules/playwright-core
```

### Fichiers produits

| Fichier | Usage |
| --- | --- |
| `logos/piste-*-lockup.svg` | Verrouillage horizontal (en-tête du site) |
| `logos/piste-*-mark.svg` | Marque seule, carrée (favicon, icône d'app, portière) |
| `planche-logos.png` | Planche contact des trois pistes |

> Les lockups s'appuient sur `<text>` et donc sur la police Google associée.
> Une fois la piste retenue, la version finale devra être **vectorisée**
> (glyphes convertis en tracés) pour l'impression et pour ne plus dépendre
> du chargement de la police.

## Revue visuelle

```sh
npx next build && npx next start -p 3210
node design/capture.mjs              # toutes les pages, bureau + mobile
node design/capture.mjs / /contact   # ou seulement certaines
```

Les captures atterrissent dans `design/captures/`, qui n'est pas versionné :
ce sont des artefacts régénérables.

## Vérification du formulaire

```sh
node design/verifier-formulaire.mjs
```

Parcourt les cinq chemins du formulaire de soumission dans un vrai navigateur.
Chacun correspond à une façon concrète de perdre un client : validation muette,
saisie effacée entre deux tentatives, faux succès alors que rien n'est envoyé,
pourriel. Le script s'adapte selon que `RESEND_API_KEY` est défini ou non.
