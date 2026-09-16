import type { Metadata } from 'next'
import { site, telHref } from '@/content/site'
import { Bouton, Conteneur, Section, TitreSection } from '@/components/ui'
import { Marque } from '@/components/logo'

export const metadata: Metadata = {
  title: 'À propos',
  description:
    'Antoine Lussier, maître électricien licencié RBQ et membre de la CMEQ, au service du résidentiel et du commercial à Drummondville.',
  alternates: { canonical: '/a-propos' },
}

export default function PageAPropos() {
  return (
    <>
      <div className="border-b border-trait bg-ivoire">
        <Conteneur className="py-16 sm:py-20">
          <div className="grid items-center gap-10 sm:grid-cols-[auto_1fr]">
            <Marque className="h-24 w-24 shrink-0 rounded-[22px]" />
            <div>
              <h1 className="text-[2.6rem] leading-[1.06] sm:text-[3.4rem]">
                Un métier qui ne pardonne pas l’à-peu-près.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-texte-doux">
                {site.slogan}
              </p>
            </div>
          </div>
        </Conteneur>
      </div>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-texte-doux">
            {/* À REMPLIR — ce récit est un canevas : le remplacer par le
                parcours réel de l'entreprise avant la mise en ligne. */}
            <p>
              <strong className="text-texte">{site.nom}</strong>, c’est{' '}
              {site.proprietaire}, maître électricien établi à{' '}
              {site.contact.adresse.ville}. On y fait ce que font les
              électriciens depuis toujours : tirer des fils, monter des
              panneaux, et s’assurer que rien ne chauffe là où ça ne devrait
              pas.
            </p>
            <p>
              La différence tient rarement au prix. Elle tient à la connexion
              qui est serrée au bon couple, au circuit qui est identifié dans le
              panneau, au permis qui est bel et bien déclaré. Ce sont des
              détails invisibles le jour de la facture, et très visibles cinq
              ans plus tard.
            </p>
            <p>
              C’est aussi pour ça qu’on répond aux urgences. Un panneau qui
              grésille un dimanche soir, ce n’est pas un rendez-vous à prendre
              le lundi.
            </p>
          </div>

          <div className="space-y-8">
            <div className="border-t border-trait pt-7">
              <h2 className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-texte-doux">Licences et affiliations</h2>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="font-medium">Licence RBQ</dt>
                  <dd className="mt-1 text-texte-doux">{site.licences.rbq}</dd>
                </div>
                {site.licences.cmeq && (
                  <div>
                    <dt className="font-medium">CMEQ</dt>
                    <dd className="mt-1 text-texte-doux">
                      Membre de la Corporation des maîtres électriciens du
                      Québec
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="font-medium">Assurance responsabilité</dt>
                  <dd className="mt-1 text-texte-doux">
                    En vigueur — attestation fournie sur demande
                  </dd>
                </div>
              </dl>
            </div>

            <div className="border-t-2 border-encre-800 bg-ivoire p-8">
              <h2 className="text-[1.5rem]">Une question ?</h2>
              <p className="mt-4 text-[0.95rem] leading-[1.7] text-texte-doux">
                Appeler ne coûte rien, et on répond honnêtement même quand la
                réponse est « ce n’est pas nécessaire ».
              </p>
              <div className="mt-5">
                <Bouton href={telHref} variante="principal">
                  {site.contact.telephoneAffiche}
                </Bouton>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section fond="ivoire">
        <TitreSection
          surtitre="Engagements"
          titre="Ce sur quoi vous pouvez compter."
        />
        <ul className="mt-10 grid gap-8 sm:grid-cols-3">
          {[
            ['Soumission écrite', 'Détaillée, avant le début des travaux. Aucun montant ne sort du chapeau en cours de route.'],
            ['Travaux déclarés', 'Permis et déclaration de travaux pris en charge par nous, pas par vous.'],
            ['Garantie', 'La main-d’œuvre est garantie, et les fabricants couvrent le matériel posé.'],
          ].map(([titre, texte]) => (
            <li key={titre}>
              <h3 className="text-[1.05rem] font-medium">{titre}</h3>
              <p className="mt-2.5 leading-relaxed text-texte-doux">{texte}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
