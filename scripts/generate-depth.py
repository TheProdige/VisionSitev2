#!/usr/bin/env python3
"""Carte de profondeur du héro, pour le parallax par couche.

Le shader décale les UV proportionnellement à la profondeur : le ciel bouge à
peine, l'entrée et les arbres bougent le plus. Sans carte, tout glisse d'un
bloc et l'effet ressemble à une image qu'on traîne.

Convention de sortie : **blanc = proche**, noir = loin. C'est celle que
Depth-Anything produit (une disparité), et celle qu'attend le shader.

Deux chemins :

  --modele   Depth-Anything V2 Small par `transformers`. C'est le bon
             résultat, et celui à utiliser pour la production. Demande torch
             (~200 Mo) et télécharge le modèle (~100 Mo) au premier appel.

  --approx   Dépannage sans torch. Ne devine rien : il combine la position
             verticale (le bas d'un cadrage à hauteur d'œil est proche, la
             ligne d'horizon est loin) avec le contraste local, qui marque
             les contours nets de l'avant-plan. Sur une photo prise de la rue
             vers une maison, c'est grossier mais utilisable ; sur un autre
             cadrage, ça ne veut plus rien dire.

    python3 scripts/generate-depth.py            # modèle, sinon approximation
    python3 scripts/generate-depth.py --modele   # exige le modèle
    python3 scripts/generate-depth.py --approx   # force l'approximation

Regardez toujours le résultat : l'avant-plan doit être plus clair que la
maison, et la maison plus claire que le ciel.
"""
import argparse
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter

RACINE = Path(__file__).resolve().parent.parent
SOURCE = RACINE / "public/images/hero/source/house-lit.png"
SORTIE = RACINE / "public/images/hero/house-depth.png"
MODELE = "depth-anything/Depth-Anything-V2-Small-hf"


def affiche(chemin):
    """Chemin relatif au projet quand c'est possible, absolu sinon."""
    try:
        return chemin.relative_to(RACINE)
    except ValueError:
        return chemin


def par_modele(img):
    from transformers import pipeline  # importé ici : inutile en mode --approx

    estimateur = pipeline("depth-estimation", model=MODELE)
    brut = np.asarray(estimateur(img)["depth"], dtype=np.float32)
    return brut, "Depth-Anything V2 Small"


def par_approximation(img):
    rgb = np.asarray(img.convert("RGB"), dtype=np.float32) / 255.0
    h, w = rgb.shape[:2]
    lum = 0.2126 * rgb[..., 0] + 0.7152 * rgb[..., 1] + 0.0722 * rgb[..., 2]

    # 1. La position verticale porte l'essentiel : bas = proche.
    y = np.linspace(0.0, 1.0, h, dtype=np.float32)[:, None]
    vertical = np.repeat(y ** 1.35, w, axis=1)

    # 2. Le contraste local marque les objets nets, donc proches.
    detail = np.abs(lum - gaussian_filter(lum, sigma=max(w * 0.006, 3)))
    detail = gaussian_filter(detail, sigma=max(w * 0.01, 4))
    detail /= max(float(detail.max()), 1e-6)

    # 3. Le ciel : bleu, en haut, sans contraste — on l'enfonce franchement.
    bleuite = np.clip(rgb[..., 2] - rgb[..., 0], 0.0, 1.0)
    ciel = np.clip(bleuite * 3.0, 0, 1) * np.clip(1.0 - y * 2.2, 0, 1)

    profondeur = np.clip(vertical * 0.78 + detail * 0.22 - ciel * 0.55, 0.0, 1.0)
    return profondeur, "approximation géométrique (sans modèle)"


def principal():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--source", type=Path, default=SOURCE)
    ap.add_argument("--sortie", type=Path, default=SORTIE)
    ap.add_argument("--flou", type=float, default=2.5, help="lissage, contre les artefacts de bord")
    groupe = ap.add_mutually_exclusive_group()
    groupe.add_argument("--modele", action="store_true", help="exige Depth-Anything, échoue sinon")
    groupe.add_argument("--approx", action="store_true", help="force l'approximation sans torch")
    a = ap.parse_args()

    if not a.source.exists():
        sys.exit(f"Image introuvable : {a.source}\nDéposez la photo du héro à cet emplacement.")

    img = Image.open(a.source).convert("RGB")

    if a.approx:
        brut, methode = par_approximation(img)
    else:
        try:
            brut, methode = par_modele(img)
        except Exception as erreur:
            if a.modele:
                sys.exit(f"Depth-Anything indisponible : {erreur}\n"
                         f"  python3 -m pip install torch --index-url https://download.pytorch.org/whl/cpu\n"
                         f"  python3 -m pip install transformers")
            print(f"Depth-Anything indisponible ({type(erreur).__name__}) — bascule sur l'approximation.")
            brut, methode = par_approximation(img)

    etendue = float(brut.max() - brut.min())
    norm = (brut - brut.min()) / etendue if etendue > 1e-6 else np.zeros_like(brut)
    # Un lissage léger : sans lui, les bords francs font baver le parallax.
    norm = np.clip(gaussian_filter(norm, sigma=a.flou), 0.0, 1.0)

    if norm.shape != (img.height, img.width):
        norm = np.asarray(Image.fromarray((norm * 255).astype(np.uint8), "L")
                          .resize((img.width, img.height), Image.LANCZOS), dtype=np.float32) / 255.0

    a.sortie.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray((norm * 255).astype(np.uint8), mode="L").save(a.sortie)

    h = norm.shape[0]
    print(f"Profondeur écrite : {affiche(a.sortie)}  ({img.width}×{img.height})")
    print(f"Méthode           : {methode}")
    print(f"Contrôle — tiers haut (ciel) {norm[:h//3].mean():.2f} · "
          f"milieu (maison) {norm[h//3:2*h//3].mean():.2f} · "
          f"tiers bas (entrée) {norm[2*h//3:].mean():.2f}")
    if not norm[:h//3].mean() < norm[h//3:2*h//3].mean() < norm[2*h//3:].mean():
        print("  ⚠ L'ordre attendu ciel < maison < avant-plan n'est pas respecté. Regardez l'image.")


if __name__ == "__main__":
    principal()
