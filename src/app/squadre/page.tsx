"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Trophy, Users } from "lucide-react"

import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01"
import { SiteFooter } from "@/components/site-footer"
import OneTribeLogo from "@/app/svg/one-tribe-logo"
import { getTeamPhoto, orderedTeams, type TeamData } from "./teams-data"

const navLinks = [
  { href: "/squadre", label: "Squadre", active: true },
  { href: "/ultimate", label: "Ultimate" },
  { href: "/scuole", label: "Scuole" },
  { href: "/news", label: "News" },
  { href: "/contatti", label: "Contatti" },
  { href: "/soci", label: "Soci" },
]

const TeamCardImage = ({ team }: { team: TeamData }) => {
  const [hasTeamPhoto, setHasTeamPhoto] = useState(true)
  const imageSrc = hasTeamPhoto ? getTeamPhoto(team.name) : team.image

  return (
    <div className="relative aspect-[16/11] overflow-hidden bg-brand-navy">
      <Image
        src={imageSrc}
        alt={team.name}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        onError={() => setHasTeamPhoto(false)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#11172C]/50 via-transparent to-transparent" />
      {!hasTeamPhoto && (
        <span className="absolute left-3 top-3 rounded-sm border border-white/10 bg-[#11172C]/72 px-2.5 py-1 font-montserrat text-[9px] font-semibold uppercase tracking-[0.12em] text-white/80 backdrop-blur-md">
          Foto in arrivo
        </span>
      )}
    </div>
  )
}

export default function Squadre() {
  const agonisticTeams = orderedTeams.slice(0, 4)
  const youthTeams = orderedTeams.slice(4)

  return (
    <div className="min-h-screen bg-brand-navy text-foreground font-sans overflow-x-hidden relative">
      <Navbar01
        logo={<OneTribeLogo className="py-2 h-10 cursor-pointer" onClick={() => window.location.href = "/"} />}
        navigationLinks={navLinks}
        signInText="Accedi a Golee"
        ctaText="Entra nel club"
        onSignInClick={() => window.open("https://app.golee.it", "_blank")}
        onCtaClick={() => window.location.href = "/contatti"}
      />

      <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#18203A] bg-logo-pattern px-4 pb-20 pt-32 md:px-8 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_18%,rgba(141,179,229,0.16),transparent_48%),linear-gradient(180deg,rgba(17,23,44,0.18),rgba(17,23,44,0.68))] pointer-events-none" />
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="space-y-5 lg:col-span-7">
            <h1 className="font-bebas text-6xl uppercase italic leading-none tracking-tighter text-white md:text-8xl">
              Tutte le <span className="text-brand-red">squadre</span>
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              <span className="block">Accompagniamo atlete e atleti in tutte le fasce d&apos;età.</span>
              <span className="block">Dai primi lanci al campo agonistico, ogni percorso ha il suo ritmo.</span>
              <span className="block">Le squadre giovanili crescono dentro un ambiente attento e progressivo.</span>
              <span className="block">Le divisioni agonistiche lavorano su tecnica, intensità e identità di gioco.</span>
              <span className="block">Ogni gruppo condivide lo stesso modo di stare in campo.</span>
              <span className="block">Rispetto, responsabilità e fiducia sono parte dell&apos;allenamento.</span>
              <span className="block">Lo staff supporta lo sviluppo individuale e la crescita collettiva.</span>
              <span className="block">L&apos;obiettivo è formare giocatrici e giocatori consapevoli.</span>
              <span className="block">Il club costruisce continuità tra scuola, giovani e prime squadre.</span>
              <span className="block">Una sola comunità, con percorsi diversi e una cultura condivisa.</span>
            </p>
          </div>
          <div className="relative w-full max-w-[11rem] overflow-hidden rounded-xl border border-brand-red/70 bg-brand-red p-5 shadow-[0_24px_70px_rgba(162,41,59,0.24)] sm:max-w-[12rem] md:max-w-[13rem] lg:col-span-5 lg:justify-self-end">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
            <span className="block font-bebas text-5xl italic leading-none tracking-tight text-white md:text-6xl">
              300+
            </span>
            <span className="mt-1 block font-bebas text-3xl italic leading-none tracking-tight text-white/92 md:text-4xl">
              atleti
            </span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <section className="space-y-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-bebas text-5xl uppercase italic leading-none tracking-tight text-white md:text-6xl">
                Agonistico
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Le squadre che rappresentano il club nei campionati e nei tornei di riferimento.
              </p>
            </div>
            <Trophy className="hidden h-8 w-8 text-brand-blue md:block" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {agonisticTeams.map((team) => (
              <TeamOverviewCard key={team.id} team={team} />
            ))}
          </div>
        </section>

        <section className="mt-20 space-y-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-bebas text-5xl uppercase italic leading-none tracking-tight text-white md:text-6xl">
                Giovanili
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Il percorso giovanile per crescere dentro lo sport e dentro la squadra.
              </p>
            </div>
            <Users className="hidden h-8 w-8 text-brand-blue md:block" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {youthTeams.map((team) => (
              <TeamOverviewCard key={team.id} team={team} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

const TeamOverviewCard = ({ team }: { team: TeamData }) => (
  <Link
    href={`/squadre/${team.slug}`}
    className="group block overflow-hidden rounded-xl border border-white/[0.08] bg-[#151C34]/80 no-underline shadow-[0_24px_70px_rgba(8,12,28,0.2)] transition-all duration-500 hover:-translate-y-1 hover:border-brand-blue/35 hover:bg-[#18203A]"
  >
    <TeamCardImage team={team} />
    <div className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-blue">
            {team.category}
          </span>
          <h3 className="mt-2 font-bebas text-5xl uppercase italic leading-none tracking-tight text-white">
            {team.name}
          </h3>
        </div>
        <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-white/15 bg-[#11172C]/72 text-white backdrop-blur-md transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>

      <p className="mt-4 line-clamp-3 min-h-[4.5rem] text-sm leading-relaxed text-white/70">
        {team.desc}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4 font-montserrat text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        <span>{team.roster.length ? `${team.roster.length} atleti` : "Dettagli in arrivo"}</span>
        <span className="text-brand-red">Scopri</span>
      </div>
    </div>
  </Link>
)
