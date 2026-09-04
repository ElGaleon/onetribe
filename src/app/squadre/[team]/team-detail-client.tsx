"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Clock, MapPin, Star, Trophy, User, Users } from "lucide-react"

import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01"
import { SiteFooter } from "@/components/site-footer"
import OneTribeLogo from "@/app/svg/one-tribe-logo"
import { getPlayerPhoto, getTeamPhoto, type TeamData } from "../teams-data"

const navLinks = [
  { href: "/squadre", label: "Squadre", active: true },
  { href: "/ultimate", label: "Ultimate" },
  { href: "/scuole", label: "Scuole" },
  { href: "/news", label: "News" },
  { href: "/contatti", label: "Contatti" },
  { href: "/soci", label: "Soci" },
]

const PlayerPhoto = ({ name }: { name: string }) => {
  const [hasPhoto, setHasPhoto] = useState(true)
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)

  if (!hasPhoto) {
    return (
      <div className="flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_50%_30%,rgba(141,179,229,0.16),rgba(17,23,44,0.9)_65%)]">
        <span className="font-bebas text-5xl italic tracking-tight text-brand-blue/70">
          {initials}
        </span>
      </div>
    )
  }

  return (
    <Image
      src={getPlayerPhoto(name)}
      alt={name}
      fill
      sizes="(min-width: 1024px) 14rem, (min-width: 640px) 33vw, 50vw"
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      onError={() => setHasPhoto(false)}
    />
  )
}

const TeamPhoto = ({ team }: { team: TeamData }) => {
  const [hasTeamPhoto, setHasTeamPhoto] = useState(true)
  const src = getTeamPhoto(team.name)

  React.useEffect(() => {
    setHasTeamPhoto(true)
  }, [src])

  return (
    <>
      <Image
        src={hasTeamPhoto ? src : team.image}
        alt={hasTeamPhoto ? team.name : `${team.name} - immagine fallback`}
        fill
        sizes="(min-width: 1024px) 42vw, 100vw"
        className="object-cover"
        priority
        onError={() => setHasTeamPhoto(false)}
      />
      {!hasTeamPhoto && (
        <>
          <div className="absolute inset-0 bg-[#11172C]/18" />
          <div className="absolute bottom-3 left-3 rounded-sm border border-white/10 bg-[#11172C]/72 px-3 py-1.5 font-montserrat text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 backdrop-blur-md">
            Foto squadra in arrivo
          </div>
        </>
      )}
    </>
  )
}

export function TeamDetailClient({ team }: { team: TeamData }) {
  const hasRoster = team.roster.length > 0

  return (
    <div className="min-h-screen bg-brand-navy bg-logo-pattern text-foreground font-sans overflow-x-hidden relative">
      <Navbar01
        logo={<OneTribeLogo className="py-2 h-10 cursor-pointer" onClick={() => window.location.href = "/"} />}
        navigationLinks={navLinks}
        signInText="Accedi a Golee"
        ctaText="Entra nel club"
        onSignInClick={() => window.open("https://app.golee.it", "_blank")}
        onCtaClick={() => window.location.href = "/contatti"}
      />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-32 md:px-8 md:pt-36">
        <Link
          href="/squadre"
          className="mb-8 inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/[0.035] px-3 py-2 font-montserrat text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-brand-blue/35 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Squadre
        </Link>

        <section className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="space-y-6 md:space-y-8 lg:col-span-5">
            <div className="space-y-4">
              <span className="font-bebas text-lg uppercase italic tracking-widest text-brand-red">
                {team.category}
              </span>
              <h1 className="font-bebas text-7xl uppercase italic leading-none tracking-tighter text-white md:text-9xl">
                {team.name}
              </h1>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {team.desc}
              </p>
            </div>

            <div className="relative h-72 overflow-hidden rounded-xl border border-white/10 bg-brand-navy shadow-[0_28px_90px_rgba(8,12,28,0.32)] sm:h-96">
              <TeamPhoto team={team} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11172C]/55 via-transparent to-transparent" />
            </div>

            <InfoBlock icon={<Trophy className="h-4 w-4 text-brand-blue" />} title="Palmares Divisione">
              <ul className="space-y-2">
                {team.palmares.map((award) => (
                  <li key={award} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="h-px w-4 shrink-0 bg-brand-red" />
                    <span>{award}</span>
                  </li>
                ))}
              </ul>
            </InfoBlock>

            {hasRoster ? (
              <>
                <InfoBlock icon={<User className="h-4 w-4 text-brand-blue" />} title="Staff Tecnico">
                  <List items={team.coaches} accent="blue" />
                </InfoBlock>

                <InfoBlock icon={<Star className="h-4 w-4 text-brand-red" />} title="Capitani">
                  <List items={team.captains} accent="red" />
                </InfoBlock>
              </>
            ) : (
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.035] p-6">
                <p className="font-bebas text-3xl uppercase italic leading-none tracking-tight text-white">
                  Dettagli stagione in arrivo
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Roster, staff e capitani saranno pubblicati appena confermati.
                </p>
              </div>
            )}

            <InfoBlock icon={<Star className="h-4 w-4 text-brand-blue" />} title="Info Allenamenti">
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
                  <div>
                    <span className="block font-semibold text-white">Luogo</span>
                    <span className="text-xs text-muted-foreground">{team.location}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                  <div>
                    <span className="block font-semibold text-white">Orari</span>
                    <ScheduleList schedule={team.schedule} />
                  </div>
                </div>
              </div>
            </InfoBlock>

            <Link
              href="/contatti"
              className="group flex items-center justify-between rounded-xl border border-brand-red/35 bg-brand-red/[0.12] p-5 text-white transition-expo hover:-translate-y-1 hover:border-brand-red/60 hover:bg-brand-red/[0.18]"
            >
              <span>
                <span className="block font-montserrat text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
                  Vuoi giocare con {team.name}?
                </span>
                <span className="mt-1 block text-sm text-white/80">Scrivici per informazioni.</span>
              </span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="space-y-4 lg:col-span-7">
            <h2 className="flex items-center gap-2 font-bebas text-4xl uppercase italic tracking-tight text-white">
              <Users className="h-5 w-5 text-brand-blue" />
              Roster Atleti
            </h2>

            {hasRoster ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                {team.roster.map((player) => {
                  const isCaptain = team.captains.includes(player.name)

                  return (
                    <article
                      key={player.name}
                      className={`group relative overflow-hidden rounded-xl border transition-expo hover:-translate-y-1 ${
                        isCaptain
                          ? "border-brand-red/35 bg-brand-red/[0.12] hover:border-brand-red/60"
                          : "border-white/10 bg-white/[0.035] hover:border-brand-blue/35"
                      }`}
                    >
                      {isCaptain && (
                        <span className="absolute right-2 top-2 z-20 rounded-sm bg-brand-red px-1.5 py-0.5 font-montserrat text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
                          C
                        </span>
                      )}
                      <div className="relative aspect-[4/5] overflow-hidden bg-brand-navy">
                        <PlayerPhoto name={player.name} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#11172C] via-[#11172C]/20 to-transparent" />
                        <span className="absolute bottom-2 left-2 font-bebas text-5xl italic leading-none tracking-tight text-white">
                          {player.number}
                        </span>
                      </div>
                      <div className="p-3 text-left">
                        <span className="block font-montserrat text-xs font-semibold leading-snug text-white">
                          {player.name}
                        </span>
                      </div>
                    </article>
                  )
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-white/12 bg-white/[0.025] p-8 text-sm text-muted-foreground">
                Roster in aggiornamento.
              </div>
            )}
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  )
}

const InfoBlock = ({
  children,
  icon,
  title,
}: {
  children: React.ReactNode
  icon: React.ReactNode
  title: string
}) => (
  <section className="space-y-4 rounded-xl p-6 glass-card">
    <h2 className="flex items-center gap-2 font-montserrat text-xs font-bold uppercase tracking-wider text-white">
      {icon}
      {title}
    </h2>
    {children}
  </section>
)

const List = ({ items, accent }: { items: string[]; accent: "blue" | "red" }) => (
  <ul className="space-y-1">
    {items.map((item) => (
      <li key={item} className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <span className={`h-px w-3 shrink-0 ${accent === "blue" ? "bg-brand-blue" : "bg-brand-red"}`} />
        {item}
      </li>
    ))}
  </ul>
)

const ScheduleList = ({ schedule }: { schedule: Record<string, string> }) => (
  <dl className="mt-2 grid gap-2">
    {Object.entries(schedule).map(([day, time]) => (
      <div
        key={day}
        className="flex items-center justify-between gap-4 rounded-sm border border-white/[0.08] bg-white/[0.025] px-3 py-2"
      >
        <dt className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-blue">
          {day}
        </dt>
        <dd className="text-right text-xs font-semibold text-white/90">
          {time}
        </dd>
      </div>
    ))}
  </dl>
)
