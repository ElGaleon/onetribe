"use client"

import React, { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { 
  Calendar, 
  User, 
  ArrowLeft, 
  Share2, 
  Link as LinkIcon, 
  Check, 
  ChevronLeft,
  ChevronRight,
  MapPin,
  Navigation
} from "lucide-react"

import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01"
import OneTribeLogo from "@/app/svg/one-tribe-logo"
import { FacebookIcon, WhatsappIcon, XIcon } from "@/components/ui/social-icons"
import { defaultArticles, mergeStoredArticles, type Article } from "../articles-data"
import { SiteFooter } from "@/components/site-footer"

const narrativeTerms = [
  "One Tribe",
  "titolo italiano",
  "categorie giovanili",
  "Under 15",
  "Under 17",
  "Under 20",
  "U20 Red",
  "U20 White",
  "U17 Red",
  "U15 Red",
  "bronzo",
  "Spirito del Gioco",
  "scudetto",
  "finale",
  "imbattuti",
  "fatto la storia",
  "Welcome to the Jungle",
  "School Edition",
  "One Tribe",
  "75 ragazze e ragazzi",
  "Sasso Marconi",
  "Borgonuovo",
  "MVP maschile",
  "MVP femminile",
  "Lorenzo Pighini",
  "Emma Moscato",
  "movimento giovanile",
  "Ultimate Frisbee",
  "Open Day",
  "Allenamenti liberi",
  "U15 Red",
  "U15 Blue",
  "U15",
  "U17",
  "U20 Red",
  "U20 Blue",
  "U20",
  "Mista",
  "Master",
  "Femminile",
  "Anzola",
  "Campo sportivo Anzola",
  "Campo Borgonuovo",
  "Stadio Nobile",
  "Casalecchio",
  "San Biagio",
  "Battiferro/Borgonuovo",
  "Marco Dellavedova",
  "Direttore tecnico",
]

const highlightNarrative = (text: string) => {
  const pattern = new RegExp(`(${narrativeTerms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi")

  return text.split(pattern).map((part, index) => {
    const isMatch = narrativeTerms.some((term) => term.toLowerCase() === part.toLowerCase())

    if (!isMatch) {
      return part
    }

    return (
      <strong key={`${part}-${index}`} className="font-semibold text-white">
        {part}
      </strong>
    )
  })
}

const sectionMedia: Record<string, { src: string; alt: string }> = {
  "Under 20 - il risultato è attesissimo": {
    src: "/images/news/one-tribe-u20-scudetto.png",
    alt: "One Tribe Under 20 con le medaglie",
  },
  "Under 17 - il dominio assoluto": {
    src: "/images/news/one-tribe-u17-scudetto.png",
    alt: "One Tribe Under 17 con le medaglie",
  },
  "Under 15 - una finale da spettacolo": {
    src: "/images/news/one-tribe-u15-scudetto.png",
    alt: "One Tribe Under 15 con le medaglie",
  },
}

const editorialSectionTitles = new Set([
  "Allenamenti liberi",
  "Per contattare",
  "Welcome to the Jungle - School Edition",
  "Una festa dello sport",
  "In campo",
  "Premi e riconoscimenti",
  "Il valore della giornata",
  "Grazie alla tribù",
])

const scheduleTeamNames = [
  "U15 Red",
  "U15 Blue",
  "U15",
  "U17",
  "U20 Red",
  "U20 Blue",
  "U20",
  "Mista",
  "Master",
  "Femminile",
]

const isScheduleBlock = (block: string) => {
  const lines = block.split("\n").map((line) => line.trim()).filter(Boolean)

  return lines.length > 0 && lines.every((line) => scheduleTeamNames.some((team) => line.startsWith(`${team}:`)))
}

const september2026DatesByDay: Record<string, number[]> = {
  "Lunedì": [7, 14, 21, 28],
  "Martedì": [1, 8, 15, 22, 29],
  "Mercoledì": [2, 9, 16, 23, 30],
  "Giovedì": [3, 10, 17, 24],
  "Venerdì": [4, 11, 18, 25],
}

const venueDetails: Record<string, { label: string; address: string; mapsQuery: string }> = {
  "Campo Borgonuovo": {
    label: "Campo Borgonuovo",
    address: "Via Cartiera 74/88, 40037 Borgonuovo BO",
    mapsQuery: "Campo Borgonuovo Via Cartiera 74/88 40037 Borgonuovo BO",
  },
  "Campo sportivo Anzola": {
    label: "Campo sportivo Anzola",
    address: "Via Lunga 29, 40011 Anzola dell'Emilia BO",
    mapsQuery: "Campo sportivo Anzola Via Lunga 29 40011 Anzola dell'Emilia BO",
  },
  "Stadio Nobile": {
    label: "Stadio Nobile",
    address: "Via dello Sport, 40033 Casalecchio di Reno BO",
    mapsQuery: "Stadio Nobile Via dello Sport 40033 Casalecchio di Reno BO",
  },
}

const teamStyles: Record<string, { label: string; chip: string; border: string; text: string; dot: string; panel: string }> = {
  U15: {
    label: "U15",
    chip: "bg-[#F59E0B]/18 text-[#FDBA3B] border-[#F59E0B]/35",
    border: "border-[#F59E0B]/45",
    text: "text-[#FDBA3B]",
    dot: "bg-[#F59E0B]",
    panel: "bg-[#F59E0B]/10",
  },
  U17: {
    label: "U17",
    chip: "bg-[#20D85A]/16 text-[#67F08F] border-[#20D85A]/35",
    border: "border-[#20D85A]/45",
    text: "text-[#67F08F]",
    dot: "bg-[#20D85A]",
    panel: "bg-[#20D85A]/10",
  },
  U20: {
    label: "U20",
    chip: "bg-brand-red/18 text-[#FF7584] border-brand-red/45",
    border: "border-brand-red/55",
    text: "text-[#FF7584]",
    dot: "bg-brand-red",
    panel: "bg-brand-red/10",
  },
  Master: {
    label: "Master",
    chip: "bg-brand-blue/16 text-brand-blue border-brand-blue/40",
    border: "border-brand-blue/45",
    text: "text-brand-blue",
    dot: "bg-brand-blue",
    panel: "bg-brand-blue/10",
  },
}

const getVenueKey = (session: string) =>
  Object.keys(venueDetails).find((venue) => session.includes(venue))

const parseScheduleBlock = (block: string) =>
  block.split("\n").map((line) => {
    const [teamName, scheduleText = ""] = line.split(":")
    const sessions = scheduleText.split(";").map((session) => {
      const parts = session.trim().split(" - ")
      const day = parts[0] ?? ""
      const time = parts.at(-1) ?? ""
      const venue = parts.slice(1, -1).join(" - ")
      const venueKey = getVenueKey(venue) ?? venue

      return {
        day,
        time,
        venue,
        venueKey,
        dates: september2026DatesByDay[day] ?? [],
      }
    }).filter((session) => session.day && session.time)

    return {
      teamName: teamName.trim(),
      sessions,
    }
  })

type TrainingEvent = {
  date: number
  team: string
  day: string
  time: string
  venueKey: string
}

const OpenDaySchedule = ({ block }: { block: string }) => {
  const teams = parseScheduleBlock(block)
  const events = teams.flatMap((team) =>
    team.sessions.flatMap((session) =>
      session.dates.map((date) => ({
        date,
        team: team.teamName,
        day: session.day,
        time: session.time,
        venueKey: session.venueKey,
      }))
    )
  )
  const calendarCells = Array.from({ length: 35 }, (_, index) => {
    const date = index >= 1 && index <= 30 ? index : null
    const dayEvents = date ? events.filter((event) => event.date === date) : []

    return { date, dayEvents }
  })
  const mobileWeeks = [
    { label: "1-6 settembre", dates: [1, 2, 3, 4, 5, 6] },
    { label: "7-13 settembre", dates: [7, 8, 9, 10, 11, 12, 13] },
    { label: "14-20 settembre", dates: [14, 15, 16, 17, 18, 19, 20] },
    { label: "21-27 settembre", dates: [21, 22, 23, 24, 25, 26, 27] },
    { label: "28-30 settembre", dates: [28, 29, 30] },
  ]

  const mapsHref = (venueKey: string) => {
    const venue = venueDetails[venueKey]

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue?.mapsQuery ?? venueKey)}`
  }

  const eventLink = (event: TrainingEvent, compact = false) => {
    const style = teamStyles[event.team] ?? teamStyles.U15
    const venue = venueDetails[event.venueKey]

    return (
      <a
        key={`${event.date}-${event.team}-${event.time}-${event.venueKey}`}
        href={mapsHref(event.venueKey)}
        target="_blank"
        rel="noopener noreferrer"
        className={`block w-full rounded-sm border px-2 py-1 text-left leading-tight transition-expo hover:bg-white/[0.08] active:translate-y-px ${style.chip} ${compact ? "text-[11px]" : "text-[10px]"}`}
      >
        <span className="flex items-center gap-1.5 font-semibold text-white">
          <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
          {event.team}
        </span>
        <span className="block text-current opacity-90">{event.time}</span>
        {compact && venue && (
          <span className="mt-1 flex items-start gap-1.5 text-[10px] leading-snug text-slate-200/90">
            <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
            {venue.label}
          </span>
        )}
      </a>
    )
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-white/[0.08] bg-brand-navy/45 p-3 shadow-[0_22px_70px_rgba(8,12,28,0.22)]">
        <div className="mb-3 flex flex-wrap gap-2 px-1">
          {Object.values(teamStyles).map((style) => (
            <span
              key={style.label}
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-montserrat text-[10px] font-semibold uppercase tracking-[0.1em] ${style.chip}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
              {style.label}
            </span>
          ))}
        </div>

        <div className="hidden md:block">
          <div className="mb-3 flex items-end justify-between gap-4 px-1">
            <div>
              <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-red">
                Settembre 2026
              </p>
              <h3 className="font-bebas text-4xl uppercase italic leading-none text-white">
                Calendario Open Day
              </h3>
            </div>
            <p className="max-w-xs text-right font-sans text-xs leading-relaxed text-slate-300">
              Tutte le occasioni libere per provare con U15, U17, U20 e Master.
            </p>
          </div>

          <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-white/[0.06] bg-white/[0.06]">
            {["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"].map((day) => (
              <div key={day} className="bg-[#11172c] px-2 py-2 text-center font-montserrat text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-blue">
                {day}
              </div>
            ))}

            {calendarCells.map(({ date, dayEvents }, index) => (
              <div
                key={`${date ?? "empty"}-${index}`}
                className="min-h-28 bg-[#192039]/96 p-2"
              >
                {date && (
                  <>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-bebas text-2xl italic leading-none text-white">
                        {date}
                      </span>
                      {dayEvents.length > 0 && (
                        <span className="rounded-full bg-brand-red px-1.5 py-0.5 font-montserrat text-[9px] font-semibold text-white">
                          {dayEvents.length}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 3).map((event) => (
                        eventLink(event)
                      ))}
                      {dayEvents.length > 3 && (
                        <p className="px-1 font-montserrat text-[9px] font-semibold uppercase tracking-[0.08em] text-brand-blue">
                          +{dayEvents.length - 3} altri
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="md:hidden">
          <div className="mb-4 px-1">
            <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-red">
              Settembre 2026
            </p>
            <h3 className="font-bebas text-4xl uppercase italic leading-none text-white">
              Calendario Open Day
            </h3>
          </div>

          <div className="space-y-4">
            {mobileWeeks.map((week) => {
              const weekEvents = events
                .filter((event) => week.dates.includes(event.date))
                .sort((a, b) => a.date - b.date || a.time.localeCompare(b.time))
              const groupedDays = week.dates
                .map((date) => ({
                  date,
                  events: weekEvents.filter((event) => event.date === date),
                }))
                .filter((day) => day.events.length > 0)

              return (
                <section key={week.label} className="rounded-lg border border-white/[0.07] bg-[#11172c]/55 p-3">
                  <h4 className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-blue">
                    {week.label}
                  </h4>
                  <div className="mt-3 space-y-3">
                    {groupedDays.map(({ date, events: dayEvents }) => {
                      const firstEvent = dayEvents[0]

                      return (
                        <div key={`${week.label}-${date}`} className="grid grid-cols-[48px_1fr] gap-3 rounded-md border border-white/[0.07] bg-brand-navy/45 p-2">
                          <div className="text-center">
                            <span className="block font-bebas text-3xl italic leading-none text-white">
                              {date}
                            </span>
                            <span className="block font-montserrat text-[9px] uppercase tracking-[0.08em] text-slate-300">
                              {firstEvent?.day.slice(0, 3)}
                            </span>
                          </div>
                          <div className="space-y-2">
                            {dayEvents.map((event) => eventLink(event, true))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </div>

      <section className="rounded-xl border border-white/[0.08] bg-[#11172c]/78 p-4 shadow-[0_22px_70px_rgba(8,12,28,0.18)]">
        <div className="mb-4">
          <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-red">
            Ogni settimana
          </p>
          <h3 className="font-bebas text-4xl uppercase italic leading-none text-white">
            Allenamenti divisi per squadra
          </h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {teams.map((team) => (
            <div
              key={team.teamName}
              className={`rounded-lg border ${teamStyles[team.teamName]?.border ?? "border-white/[0.08]"} bg-brand-navy/45 p-4 shadow-[0_16px_44px_rgba(8,12,28,0.16)]`}
            >
              <h3 className={`font-bebas text-3xl uppercase italic leading-none tracking-tight ${teamStyles[team.teamName]?.text ?? "text-brand-blue"}`}>
                {team.teamName}
              </h3>
              <div className="mt-3 space-y-2">
                {team.sessions.map((session) => (
                  <a
                    key={`${team.teamName}-${session.day}-${session.time}-${session.venueKey}`}
                    href={mapsHref(session.venueKey)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block w-full rounded-md border border-white/[0.07] bg-white/[0.04] px-3 py-3 text-left transition-colors hover:border-brand-blue/35 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/70"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-montserrat text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
                          {session.day} · {session.time}
                        </div>
                        <div className="mt-1 text-xs leading-relaxed text-slate-300">
                          {session.venue}
                        </div>
                      </div>
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-brand-blue/25 bg-brand-blue/[0.08] text-brand-blue transition-colors group-hover:border-brand-blue/45 group-hover:bg-brand-blue/[0.14]">
                        <Navigation className="h-4 w-4" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

const renderArticleTitle = (title: string) => {
  const parts = title.split(/(ONE TRIBE)/gi)

  return parts.map((part, index) => {
    if (part.toLowerCase() !== "one tribe") {
      return part
    }

    return (
      <span key={`${part}-${index}`} className="text-brand-red">
        {part}
      </span>
    )
  })
}

const ArticleBody = ({ content }: { content: string }) => {
  const blocks = content.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean)

  return (
    <div className="space-y-7">
      {blocks.map((block, index) => {
        if (block.startsWith("Instagram:")) {
          const url = block.replace("Instagram:", "").trim()

          return (
            <a
              key={block}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-brand-red/35 bg-brand-red/[0.13] px-4 py-3 font-montserrat text-xs font-semibold uppercase tracking-[0.12em] text-white transition-expo hover:-translate-y-0.5 hover:border-brand-red/60 hover:bg-brand-red/[0.2]"
            >
              <LinkIcon className="h-4 w-4 text-brand-blue" />
              Vedi il post su Instagram
            </a>
          )
        }

        if (isScheduleBlock(block)) {
          return <OpenDaySchedule key={block} block={block} />
        }

        if (block.includes("Marco Dellavedova") && block.includes("Direttore tecnico")) {
          const [nameRole, email, phone] = block.split("\n").map((line) => line.trim())

          return (
            <div key={block} className="rounded-lg border border-brand-blue/20 bg-brand-blue/[0.08] p-4">
              <p className="font-montserrat text-sm font-semibold uppercase tracking-[0.08em] text-white">
                {nameRole}
              </p>
              <div className="mt-2 flex flex-col gap-1">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex font-sans text-sm text-brand-blue underline decoration-brand-blue/40 underline-offset-4 transition-colors hover:text-white"
                  >
                    {email}
                  </a>
                )}
                {phone && (
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="inline-flex font-sans text-sm text-brand-blue underline decoration-brand-blue/40 underline-offset-4 transition-colors hover:text-white"
                  >
                    {phone}
                  </a>
                )}
              </div>
            </div>
          )
        }

        if (/^Under\s+\d+\s+-/.test(block) || editorialSectionTitles.has(block)) {
          const [sectionTitle, ...rest] = block.split("\n")
          const media = sectionMedia[sectionTitle]

          return (
            <section key={sectionTitle} className="space-y-5 border-l-2 border-brand-red/70 pl-5">
              <h2 className="font-bebas text-4xl uppercase italic leading-none tracking-tight text-white md:text-5xl">
                {sectionTitle}
              </h2>
              {media && (
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-white/[0.08] bg-[#11172c] shadow-[0_20px_70px_rgba(8,12,28,0.26)] sm:aspect-[16/11]">
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(min-width: 768px) 768px, calc(100vw - 56px)"
                    className="object-cover"
                  />
                </div>
              )}
              {rest.length > 0 && (
                <p className="text-base leading-8 text-slate-200 md:text-lg">
                  {highlightNarrative(rest.join("\n"))}
                </p>
              )}
            </section>
          )
        }

        if (index === 0) {
          return (
            <p key={block} className="font-bebas text-4xl uppercase italic leading-none tracking-tight text-brand-blue md:text-5xl">
              {highlightNarrative(block)}
            </p>
          )
        }

        return (
          <p key={block} className="text-base leading-8 text-slate-200 md:text-lg">
            {highlightNarrative(block)}
          </p>
        )
      })}
    </div>
  )
}

export default function BlogPostDetail() {
  const params = useParams()
  const id = params?.id as string

  const [articles, setArticles] = useState<Article[]>([])
  const [article, setArticle] = useState<Article | null>(null)
  const [copied, setCopied] = useState<boolean>(false)
  const [shareUrl, setShareUrl] = useState<string>("")

  const navLinks = [
    { href: "/squadre", label: "Squadre" },
    { href: "/ultimate", label: "Ultimate" },
    { href: "/scuole", label: "Scuole" },
    { href: "/news", label: "News", active: true },
    { href: "/contatti", label: "Contatti" },
    { href: "/soci", label: "Soci" },
  ]

  // Safe client-side localstorage loading
  useEffect(() => {
    const saved = localStorage.getItem("one_tribe_news")
    let currentArticles = defaultArticles
    if (saved) {
      currentArticles = mergeStoredArticles(JSON.parse(saved))
      localStorage.setItem("one_tribe_news", JSON.stringify(currentArticles))
    } else {
      localStorage.setItem("one_tribe_news", JSON.stringify(defaultArticles))
    }
    setArticles(currentArticles)

    const found = currentArticles.find((art) => art.id === id)
    if (found) {
      setArticle(found)
    }

    if (typeof window !== "undefined") {
      setShareUrl(window.location.href)
    }
  }, [id])

  if (!article) {
    return (
      <div className="min-h-screen bg-brand-navy bg-logo-pattern text-foreground font-sans flex flex-col justify-between">
        <Navbar01 
          logo={<OneTribeLogo className="py-2 h-10 cursor-pointer" onClick={() => window.location.href = "/"} />}
          navigationLinks={navLinks}
          signInText="Accedi a Golee"
          ctaText="Entra nel club"
          onSignInClick={() => window.open("https://app.golee.it", "_blank")}
          onCtaClick={() => window.location.href = "/contatti"}
        />
        <div className="max-w-7xl mx-auto py-24 text-center space-y-6 px-4">
          <h1 className="font-bebas text-5xl text-white uppercase italic tracking-tighter transform -skew-x-12">
            Articolo <span className="text-brand-red">Non Trovato</span>
          </h1>
          <p className="font-montserrat text-xs text-muted-foreground uppercase tracking-widest max-w-md mx-auto">
            La notizia cercata potrebbe essere stata rimossa o l&apos;URL non è corretto.
          </p>
          <Link 
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white font-montserrat font-bold uppercase tracking-wider text-xs transform -skew-x-12 hover:scale-105 duration-300 shadow-lg shadow-brand-red/20 hover:shadow-brand-red/40"
          >
            <ArrowLeft className="w-4 h-4" /> Torna alle News
          </Link>
        </div>
        <SiteFooter />
      </div>
    )
  }

  // Prev / Next article logic
  const currentIndex = articles.findIndex((art) => art.id === article.id)
  const nextArticle = currentIndex > 0 ? articles[currentIndex - 1] : null
  const prevArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null

  const handleCopyLink = () => {
    if (navigator.clipboard && shareUrl) {
      navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareText = `Leggi l'articolo: "${article.title}" su One Tribe Ultimate`

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
          href="/news"
          className="mb-8 inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/[0.035] px-3 py-2 font-montserrat text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-brand-blue/35 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          News
        </Link>

        <section className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="space-y-6 lg:col-span-5">
            <span className="font-bebas text-lg uppercase italic tracking-widest text-brand-red">
              {article.category}
            </span>

            <h1 className="font-bebas text-6xl uppercase italic leading-none tracking-tighter text-white md:text-8xl">
              {renderArticleTitle(article.title)}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs uppercase text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-blue" /> {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-brand-blue" /> {article.author}
              </span>
            </div>

            <p className="border-l-4 border-brand-blue pl-4 text-base font-medium leading-relaxed text-white md:text-lg">
              {article.excerpt}
            </p>

            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {article.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-sm bg-brand-blue/10 border border-brand-blue/30 text-[10px] text-brand-blue font-semibold uppercase tracking-[0.12em] hover:bg-brand-blue/20 duration-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="relative h-72 overflow-hidden rounded-xl border border-white/[0.08] bg-[#192039] shadow-[0_28px_90px_rgba(8,12,28,0.32)] sm:h-96 lg:col-span-7">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#11172C]/50 via-transparent to-transparent" />
          </div>
        </section>

        {/* Article Content - High Contrast Legible Layout */}
        <article className="mx-auto mt-14 max-w-4xl rounded-xl border border-white/[0.08] bg-[#192039]/84 p-6 shadow-[0_28px_90px_rgba(8,12,28,0.22)] md:p-8">
          <ArticleBody content={article.content} />
        </article>

        <div className="mx-auto mt-10 max-w-4xl">
          <hr className="border-white/5" />
        </div>

        {/* Sharing Widget & Actions Panel */}
        <div className="mx-auto mt-10 flex max-w-4xl flex-col items-center justify-between gap-6 rounded-xl p-6 glass-card sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-montserrat font-bold text-white text-xs uppercase tracking-wider block">Condividi questo post</span>
              <span className="font-sans text-[10px] text-muted-foreground block">Diffondi i valori dello Spirit of the Game.</span>
            </div>
          </div>

          {/* Social icons row */}
          <div className="flex flex-wrap gap-3">
            {/* Facebook Share */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Condividi su Facebook"
              className="w-10 h-10 rounded-lg bg-brand-navy border border-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:border-brand-blue hover:bg-brand-navy/80 transition-expo duration-200 cursor-pointer"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>

            {/* X (formerly Twitter) Share */}
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Condividi su X"
              className="w-10 h-10 rounded-lg bg-brand-navy border border-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:border-brand-blue hover:bg-brand-navy/80 transition-expo duration-200 cursor-pointer"
            >
              <XIcon className="w-4 h-4" />
            </a>

            {/* WhatsApp Share */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Condividi su WhatsApp"
              className="w-10 h-10 rounded-lg bg-brand-navy border border-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:border-brand-blue hover:bg-brand-navy/80 transition-expo duration-200 cursor-pointer"
            >
              <WhatsappIcon className="w-4 h-4" />
            </a>

            {/* Copy link button */}
            <button
              onClick={handleCopyLink}
              title="Copia link"
              className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-expo duration-200 cursor-pointer ${
                copied 
                  ? "bg-brand-blue/10 border-brand-blue/40 text-brand-blue" 
                  : "bg-brand-navy border-white/5 text-muted-foreground hover:text-white hover:border-brand-blue hover:bg-brand-navy/80"
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
            </button>
            
            {copied && (
              <span className="font-montserrat text-[10px] text-brand-blue font-semibold uppercase tracking-wider self-center ml-1">
                Link copiato
              </span>
            )}
          </div>
        </div>

        {/* Prev / Next Article Suggestions */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 pt-6 sm:grid-cols-2">
          {prevArticle ? (
            <Link 
              href={`/news/${prevArticle.id}`}
              className="p-5 glass-card transition-expo hover:scale-[1.02] rounded-xl flex items-center gap-4 text-left group cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-8 h-8 text-brand-blue shrink-0 group-hover:-translate-x-1 transition-expo duration-200" />
              <div>
                <span className="font-montserrat text-[9px] text-muted-foreground uppercase tracking-widest block font-bold">Articolo Precedente</span>
                <span className="font-montserrat font-bold text-white text-xs line-clamp-1 block mt-1 group-hover:text-brand-blue transition-expo duration-200">{prevArticle.title}</span>
              </div>
            </Link>
          ) : <div className="hidden sm:block" />}

          {nextArticle ? (
            <Link 
              href={`/news/${nextArticle.id}`}
              className="p-5 glass-card transition-expo hover:scale-[1.02] rounded-xl flex items-center justify-between gap-4 text-right group cursor-pointer shadow-md"
            >
              <div className="text-left sm:text-right">
                <span className="font-montserrat text-[9px] text-muted-foreground uppercase tracking-widest block font-bold">Prossimo Articolo</span>
                <span className="font-montserrat font-bold text-white text-xs line-clamp-1 block mt-1 group-hover:text-brand-blue transition-expo duration-200">{nextArticle.title}</span>
              </div>
              <ChevronRight className="w-8 h-8 text-brand-blue shrink-0 group-hover:translate-x-1 transition-expo duration-200" />
            </Link>
          ) : <div className="hidden sm:block" />}
        </div>

      </main>

      <SiteFooter />

    </div>
  )
}
