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
