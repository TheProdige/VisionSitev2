# Phase 1 — trois directions visuelles

Trois pages d'accueil complètes, chacune dans un fichier HTML autonome : on
ouvre le fichier dans un navigateur, rien à installer. Même contenu, même
logo, même palette tirée du logo (ambre `#FFB524`, encre `#0D0F13`) — seule la
direction change, pour que la comparaison porte sur le parti pris et pas sur
le texte.

Chaque fichier porte en tête un objet `SITE` : c'est la préfiguration de
`src/config/site.ts`. Services, villes, avis, téléphone, RBQ en sortent tous.
Changer le numéro à un seul endroit le change dans l'entête, le héro, le
bandeau d'urgence, le pied de page et la barre mobile.

| Fichier | Direction |
| --- | --- |
| `direction-a.html` | A — « Le courant » |
| `direction-b.html` | B — « Chantier » |
| `direction-c.html` | C — « Le panneau » |

## A — « Le courant »

Blanc éditorial, titres en sérif, beaucoup d'air : le registre d'un cabinet
d'architectes plutôt que d'un électricien. Un fil de cuivre traverse la page
et une impulsion ambre y circule en continu — l'électricité est suggérée par
le mouvement, jamais par le cliché de l'éclair partout.

## B — « Chantier »

Encre et ambre sécurité, typographie condensée surdimensionnée, rubans de
signalisation. Le titre « Le jus au bout du fil » est traversé par une
surtension : une bande ambre balaie les lettres de gauche à droite. Ça parle
fort, ça parle québécois, et ça ne ressemble à aucun site d'électricien.

## C — « Le panneau »

Un vrai panneau électrique en 3D légère (CSS 3D, aucun WebGL, aucun modèle à
télécharger) tient le héro : il s'incline sous le curseur et chaque
disjoncteur est une section du site. On ouvre « Résidentiel », la section
s'allume et la page y descend. La navigation devient le métier.

## Ce qui est déjà vrai dans les trois

- Appel au-dessus de la ligne de flottaison, sur bureau comme sur téléphone
- Barre d'appel fixe en bas sur mobile : Appeler / Texto / Soumission
- Bandeau d'urgence 24/7 en haut de page
- Un seul `h1`, liens `tel:` et `sms:` réels, `lang="fr-CA"`
- `prefers-reduced-motion` respecté : aucune des trois animations ne joue
- Aucun débordement horizontal à 390 px

## Ce qui ne l'est pas encore

Les images sont des cadres qui affichent leur nom de fichier et leurs
dimensions. **Les trois avis sont fictifs**, comme le numéro de téléphone, le
courriel et le numéro de RBQ — ce sont les placeholders demandés, à remplacer
avant toute mise en ligne. Le numéro de licence RBQ est une mention légale
vérifiable publiquement : il ne s'invente pas.
