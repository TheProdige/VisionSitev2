'use client'

import { useActionState } from 'react'
import { envoyerDemande } from './actions'
import type { EtatFormulaire } from './validation'
import { services } from '@/content/services'
import { site, telHref } from '@/content/site'

const INITIAL: EtatFormulaire = { statut: 'vierge' }

const champBase =
  'w-full rounded-[4px] border bg-blanc px-4 py-3 text-[1rem] outline-none transition placeholder:text-texte-doux/55 focus:border-encre-800 focus:ring-2 focus:ring-accent-500/30'

export function Formulaire() {
  const [etat, action, enCours] = useActionState(envoyerDemande, INITIAL)

  if (etat.statut === 'succes') {
    return (
      <div
        role="status"
        className="border-t-2 border-accent-500 bg-accent-100 p-9"
      >
        <h2 className="text-[1.9rem]">Demande reçue.</h2>
        <p className="mt-3 leading-relaxed text-texte-doux">
          On vous revient d’ici un jour ouvrable. Si c’est urgent, n’attendez
          pas le courriel :{' '}
          <a href={telHref} className="font-semibold text-accent-700 underline">
            {site.contact.telephoneAffiche}
          </a>
          .
        </p>
      </div>
    )
  }

  const err = etat.champs ?? {}
  // React vide les champs non contrôlés après chaque action : ils reprennent
  // leur `defaultValue`. On y remet la saisie renvoyée par le serveur, ce qui
  // restitue exactement ce que le visiteur avait écrit.
  const val = etat.valeurs

  return (
    <form action={action} noValidate className="space-y-6">
      {etat.statut === 'erreur' && etat.message && (
        <p
          role="alert"
          className="rounded-[4px] border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
        >
          {etat.message}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Champ id="nom" libelle="Votre nom" erreur={err.nom} requis>
          <input
            id="nom"
            name="nom"
            defaultValue={val?.nom ?? ''}
            autoComplete="name"
            className={`${champBase} ${err.nom ? 'border-red-400' : 'border-trait'}`}
          />
        </Champ>

        <Champ id="telephone" libelle="Téléphone" erreur={err.telephone} requis>
          <input
            id="telephone"
            name="telephone"
            defaultValue={val?.telephone ?? ''}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="819 555-1234"
            className={`${champBase} ${err.telephone ? 'border-red-400' : 'border-trait'}`}
          />
        </Champ>

        <Champ
          id="courriel"
          libelle="Courriel"
          indice="Facultatif"
          erreur={err.courriel}
        >
          <input
            id="courriel"
            name="courriel"
            defaultValue={val?.courriel ?? ''}
            type="email"
            autoComplete="email"
            className={`${champBase} ${err.courriel ? 'border-red-400' : 'border-trait'}`}
          />
        </Champ>

        <Champ id="ville" libelle="Ville" erreur={err.ville} requis>
          <input
            id="ville"
            name="ville"
            defaultValue={val?.ville ?? ''}
            autoComplete="address-level2"
            className={`${champBase} ${err.ville ? 'border-red-400' : 'border-trait'}`}
          />
        </Champ>
      </div>

      <Champ id="service" libelle="De quoi s’agit-il ?" erreur={err.service}>
        <select
          id="service"
          name="service"
          defaultValue={val?.service ?? ''}
          className={`${champBase} ${err.service ? 'border-red-400' : 'border-trait'}`}
        >
          <option value="">Je ne sais pas trop</option>
          {services.map((s) => (
            <option key={s.slug} value={s.titre}>
              {s.titre}
            </option>
          ))}
        </select>
      </Champ>

      <Champ
        id="message"
        libelle="Décrivez le projet"
        indice="Âge du bâtiment, ce que vous voulez faire, délai souhaité"
        erreur={err.message}
        requis
      >
        <textarea
          id="message"
          name="message"
          defaultValue={val?.message ?? ''}
          rows={6}
          maxLength={4000}
          className={`${champBase} resize-y ${err.message ? 'border-red-400' : 'border-trait'}`}
        />
      </Champ>

      <label className="flex cursor-pointer items-start gap-3 rounded-[4px] border border-trait bg-ivoire px-4 py-4">
        <input
          type="checkbox"
          name="urgent"
          defaultChecked={val?.urgent ?? false}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--accent-500)]"
        />
        <span className="text-sm">
          <span className="font-medium">C’est une urgence.</span>{' '}
          <span className="text-texte-doux">
            Pour une panne en cours ou une odeur de brûlé, appelez plutôt au{' '}
            <a href={telHref} className="font-semibold text-accent-700 underline">
              {site.contact.telephoneAffiche}
            </a>
            .
          </span>
        </span>
      </label>

      {/* Pot de miel : masqué aux humains, rempli par les robots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 overflow-hidden">
        <label htmlFor="site_web">Ne pas remplir</label>
        <input id="site_web" name="site_web" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={enCours}
        className="w-full rounded-full bg-encre-800 px-9 py-4 text-[0.95rem] font-medium text-blanc transition-colors hover:bg-encre-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {enCours ? 'Envoi en cours…' : 'Envoyer ma demande'}
      </button>

      <p className="text-sm text-texte-doux">
        Vos coordonnées servent uniquement à vous répondre. Aucune infolettre,
        aucun partage.
      </p>
    </form>
  )
}

function Champ({
  id,
  libelle,
  indice,
  erreur,
  requis,
  children,
}: {
  id: string
  libelle: string
  indice?: string
  erreur?: string
  requis?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {libelle}
        {requis && (
          <span className="ml-1 text-accent-700" aria-hidden="true">
            *
          </span>
        )}
        {indice && (
          <span className="ml-2 font-normal text-texte-doux">{indice}</span>
        )}
      </label>
      <div className="mt-2">{children}</div>
      {erreur && (
        <p className="mt-2 text-sm font-medium text-red-700">{erreur}</p>
      )}
    </div>
  )
}
