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

## Aperçu partageable

```sh
EXPORT_STATIQUE=1 npx next build
node design/apercu-artefact.mjs
```

Produit `design/apercu-site.html` : le site complet en **un seul fichier
autonome**, publiable tel quel comme artefact ou envoyable par courriel.

Le HTML de chaque page vient de l'export réel (`out/`), pas d'une
reconstruction à la main — l'aperçu ne peut donc pas diverger du site. Le
script inline la feuille de style et les polices, remplace les liens absolus
par une navigation locale, reconstruit le menu mobile (rendu par React dans le
vrai site, donc absent du HTML statique) et neutralise le formulaire, qui n'a
pas de serveur dans un export statique.

> Le mode `EXPORT_STATIQUE=1` résout `./actions` vers `actions.statique.ts`,
> qui valide avec les mêmes règles que la fonction serveur — module partagé,
> `app/soumission/validation.ts` — puis renvoie vers le téléphone. Ce mode
> n'est pas destiné à la mise en ligne : le vrai site a besoin d'un serveur
> pour recevoir les demandes.

## Entrée « le camion » (prototype)

`design/transit-lussier.html` — page autonome : le fourgon plein écran, où
chaque caisse du rack ouvre une section. Publiée comme artefact, elle a besoin
de `scene/scene.jpg` et `scene/scene-portrait.jpg` à côté d'elle, sous les noms
`scene.jpg` et `scene-portrait.jpg`.

### Les deux cadrages

Il y a **deux scènes, pas une**. Une image 16:9 recadrée en `cover` sur un
écran de téléphone ne laisse voir que la colonne du milieu : six sections sur
neuf deviennent inatteignables. D'où une seconde version verticale, où les
trois colonnes tiennent sur toute la hauteur. La bascule se fait à
`max-aspect-ratio: 6/5`, et chaque cadrage a sa propre carte de zones.

| Fichier | Rôle |
| --- | --- |
| `scene/scene.jpg` | Scène 16:9, écrans larges |
| `scene/scene-portrait.jpg` | Scène 9:16, téléphones |
| `scene/*.source.png` | Originaux pleine qualité, avant réencodage |

### Les zones cliquables

Elles sont décrites en **fractions de l'image**, pas de l'écran, et replacées
en JS à partir de la géométrie réelle du `cover` : sans ce calcul, elles se
décalent des caisses dès que le format de la fenêtre change. Si on remplace une
scène, il faut relever les nouvelles fractions dans `CADRAGES`.

### Remplacer par le vrai camion

Les scènes sont générées (Higgsfield, `gpt_image_2_5`), volontairement sans
marque ni texte sur les caisses. Pour passer aux photos réelles : deux prises
du Transit portes ouvertes, une cadrée large et une verticale, sur trépied,
à l'heure bleue avec les LED allumées. Puis réencoder et relever les zones.

## Scène 3D du fourgon (Blender → navigateur)

`design/transit3d.html` — vraie scène 3D : on tourne autour du fourgon, chaque
caisse rouge ouvre une section. Three.js r147, modèle embarqué en base64 dans
la page (l'extension `.glb` n'est pas servie comme fichier joint d'artefact).

Le modèle est construit dans Blender via l'outillage 3D de Higgsfield, projet
`501b9e74-ca0c-4c1d-8a6a-5a52da3e72d2` : habitacle, rack trois travées, six
niveaux, dix-huit caisses partageant un seul maillage. Les neuf caisses de
navigation portent le nom `Caisse_<clé>` ; c'est par ce nom que le navigateur
les retrouve. Source du GLB dans `design/scene3d/`.

> Une caisse a deux matériaux, donc deux primitives : glTF en fait un **groupe**
> nommé contenant des `Mesh` anonymes. Filtrer les cibles sur `isMesh` ne
> trouve rien — il faut viser le nœud nommé et remonter depuis le sous-maillage
> touché.

> `RoomEnvironment` est une pièce éclairée : à pleine intensité elle crame
> l'habitacle. `envMapIntensity` est réduit à 0,16 et l'exposition à 0,78.

**Ce que la scène n'est pas :** photoréaliste. C'est un rendu 3D propre et
net, sans texture ni usure. Y arriver demanderait des textures PBR, de la
géométrie de détail et beaucoup d'itération — ou, bien plus court, des photos
du vrai camion.
