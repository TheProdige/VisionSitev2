# Lussier Électrique

Site vitrine de **Lussier Électrique**, maître électricien à Drummondville.
Résidentiel, commercial, urgence 24/7.

Le parti pris tient en une phrase : **le site est porté par la photographie**.
Une seule série d'images, la même lumière et la même palette sur toutes ;
une seule famille de titres ; beaucoup de vide ; et pas un effet de plus que
nécessaire. C'est la retenue qui fait le haut de gamme, pas l'accumulation.

## Lancer

```sh
npm run dev          # sert site/ sur http://localhost:8000
```

Aucune compilation : `site/index.html` est du HTML, du CSS et une trentaine
de lignes de JavaScript. Il s'ouvre aussi par un double-clic.

## Structure

```
site/
  index.html          la page
  images/             la série photo, en WebP et JPEG
outils/
  optimiser-images.mjs  redimensionne et encode la série
  verifier.mjs          rend la page dans un vrai navigateur et relève les défauts
```

## La direction visuelle, en bref

| | |
| --- | --- |
| **Titres** | Fraunces, graisse 300, `SOFT 20` — un sérif à optique variable, italique pour la seconde ligne du héro |
| **Texte** | Instrument Sans, 400 et 500 |
| **Neutres** | `#17150f` encre chaude · `#f7f4ee` crème · `#eae5dc` pierre · `#ddd6c9` filets |
| **Accent** | `#a8813f` laiton. L'ambre `#ffb524` du logo ne reste que dans l'éclair — à pleine saturation il tire le site vers le néon |

Les couleurs sont des jetons CSS en tête de `index.html`, nommés par leur
rôle. Changer de direction ne touche que ce bloc.

## Le mouvement

Deux gestes, pas trois : le texte monte de 18 px en se révélant, l'image se
pose d'un `scale(1.06)` à `scale(1)`. Rien ne rebondit, rien ne tourne.

La révélation se fait par comparaison de position à chaque image, pas par
`IntersectionObserver` : un observateur ne rattrape pas ce qu'on a sauté, et
une touche Fin laisserait des blocs invisibles pour de bon. Sans JavaScript,
tout est visible d'emblée — le script ne fait qu'armer l'effet.

`prefers-reduced-motion` coupe les deux gestes.

## Ce qui reste à faire

Tout le contenu est du placeholder. La liste complète est dans
[`PLACEHOLDERS.md`](PLACEHOLDERS.md) — à lire avant toute mise en ligne.
