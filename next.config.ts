import type { NextConfig } from 'next'

/**
 * `EXPORT_STATIQUE=1 npx next build` produit un site entièrement statique dans
 * `out/`, publiable sur n'importe quel hébergeur de fichiers — pratique pour
 * un aperçu partageable.
 *
 * Ce n'est pas le mode par défaut : un export statique n'a pas de serveur pour
 * recevoir le formulaire de soumission. Dans ce mode, `./actions` est résolu
 * vers `actions.statique.ts`, qui valide la saisie avec les mêmes règles puis
 * renvoie le visiteur vers le téléphone. Pour la vraie mise en ligne, on garde
 * le build normal, avec le formulaire fonctionnel.
 */
const EXPORT = process.env.EXPORT_STATIQUE === '1'

const nextConfig: NextConfig = {
  ...(EXPORT
    ? {
        output: 'export' as const,
        turbopack: {
          // La liste écrase celle par défaut : les extensions usuelles doivent
          // y rester, précédées de la variante statique.
          resolveExtensions: [
            '.statique.tsx',
            '.statique.ts',
            '.mdx',
            '.tsx',
            '.ts',
            '.jsx',
            '.js',
            '.mjs',
            '.json',
          ],
        },
      }
    : {}),
}

export default nextConfig
