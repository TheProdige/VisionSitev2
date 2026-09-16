#!/usr/bin/env python3
"""Masque des sources lumineuses du héro.

Le shader a besoin de savoir *où* la lumière est émise, pour pouvoir
l'éteindre puis la rallumer. Une fenêtre éteinte la nuit est presque noire,
pas grise : sans ce masque, baisser la luminosité de toute l'image donne une
photo sous-exposée, pas une maison éteinte.

Deux détecteurs, parce que la scène a deux familles de sources :

  - les sources chaudes (2700 K) — fenêtres, DEL de soffite, appliques,
    bornes de l'allée, uplights des arbres ;
  - le témoin bleu de la borne VÉ, qui est saturé et froid.

Le piège, c'est le ciel : à l'heure bleue il est lumineux et bleu, donc un
simple seuil sur la luminance ou sur la teinte l'attrape en entier. On mesure
donc le *contraste local* — la luminance moins sa version très floutée. Une
source lumineuse est bien plus claire que son voisinage immédiat ; un ciel,
non, il est uniformément clair.

    python3 scripts/generate-lightmask.py

Options utiles : --seuil pour durcir la détection, --flou pour la diffusion
du halo, --apercu pour écrire une image de contrôle superposée.
"""
import argparse
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter

RACINE = Path(__file__).resolve().parent.parent
SOURCE = RACINE / "public/images/hero/source/house-lit.png"
SORTIE = RACINE / "public/images/hero/house-lightmask.png"


def affiche(chemin):
    """Chemin relatif au projet quand c'est possible, absolu sinon."""
    try:
        return chemin.relative_to(RACINE)
    except ValueError:
        return chemin


def lisser(x, bas, haut):
    """Rampe douce entre deux bornes (smoothstep)."""
    t = np.clip((x - bas) / max(haut - bas, 1e-6), 0.0, 1.0)
    return t * t * (3.0 - 2.0 * t)


def construire(img, seuil, flou):
    rgb = np.asarray(img.convert("RGB"), dtype=np.float32) / 255.0
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    lum = 0.2126 * r + 0.7152 * g + 0.0722 * b

    # Contraste local : ce qui dépasse nettement son voisinage. C'est ce qui
    # sépare une fenêtre allumée d'un ciel clair.
    voisinage = gaussian_filter(lum, sigma=max(rgb.shape[1] * 0.02, 8))
    saillance = np.clip(lum - voisinage, 0.0, 1.0)

    # Sources chaudes : le rouge domine le bleu.
    chaleur = lisser(r - b, 0.02, 0.22)
    chaud = lisser(lum, seuil * 0.55, seuil * 1.25) * chaleur

    # Témoin de la borne VÉ : bleu franc et saturé, donc l'inverse.
    froideur = lisser(b - r, 0.10, 0.34)
    satur = lisser(rgb.max(axis=-1) - rgb.min(axis=-1), 0.12, 0.40)
    froid = lisser(lum, 0.30, 0.72) * froideur * satur

    # La saillance arbitre : sans elle, le ciel entier passerait pour une source.
    masque = np.clip((chaud + froid) * lisser(saillance, 0.01, 0.12) * 3.2, 0.0, 1.0)

    # Les sources les plus intenses restent pleines même sans contraste local
    # (le cœur d'une fenêtre est uniforme, donc peu saillant).
    coeur = lisser(lum, 0.80, 0.97) * chaleur
    masque = np.maximum(masque, coeur)

    # Le halo : une source éclaire aussi ce qui l'entoure.
    halo = gaussian_filter(masque, sigma=flou)
    return np.clip(np.maximum(masque, halo * 0.85), 0.0, 1.0)


def principal():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--source", type=Path, default=SOURCE)
    ap.add_argument("--sortie", type=Path, default=SORTIE)
    ap.add_argument("--seuil", type=float, default=0.55, help="luminance minimale d'une source (0-1)")
    ap.add_argument("--flou", type=float, default=9.0, help="rayon du halo, en pixels")
    ap.add_argument("--apercu", type=Path, default=None, help="écrit une image de contrôle")
    a = ap.parse_args()

    if not a.source.exists():
        sys.exit(f"Image introuvable : {a.source}\nDéposez la photo du héro à cet emplacement.")

    img = Image.open(a.source)
    masque = construire(img, a.seuil, a.flou)

    a.sortie.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray((masque * 255).astype(np.uint8), mode="L").save(a.sortie)
    couvert = float((masque > 0.25).mean()) * 100
    print(f"Masque écrit : {affiche(a.sortie)}  ({img.width}×{img.height}, {couvert:.1f} % de l'image)")
    if couvert > 35:
        print("  ⚠ Plus du tiers de l'image est vu comme lumineux — montez --seuil.")
    if couvert < 1.5:
        print("  ⚠ Presque rien n'est détecté — baissez --seuil.")

    if a.apercu:
        base = np.asarray(img.convert("RGB"), dtype=np.float32)
        teinte = np.stack([masque * 255, masque * 90, masque * 0], axis=-1)
        melange = np.clip(base * (1 - masque[..., None] * 0.65) + teinte * 0.65, 0, 255)
        Image.fromarray(melange.astype(np.uint8)).save(a.apercu)
        print(f"Aperçu écrit  : {affiche(a.apercu)}")


if __name__ == "__main__":
    principal()
