"use client"

import Link from "next/link"
import { ArrowRight, Clock, Handshake, ShieldCheck, Target, Users } from "lucide-react"

import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01"
import { SiteFooter } from "@/components/site-footer"
import OneTribeLogo from "@/app/svg/one-tribe-logo"

const navLinks = [
  { href: "/squadre", label: "Squadre" },
  { href: "/ultimate", label: "Ultimate", active: true },
  { href: "/scuole", label: "Scuole" },
  { href: "/news", label: "News" },
  { href: "/contatti", label: "Contatti" },
  { href: "/soci", label: "Soci" },
]

const rules = [
  {
    title: "Niente arbitro",
    body: "Le giocatrici e i giocatori chiamano falli e infrazioni, dialogano e risolvono ogni situazione in campo.",
    icon: <Handshake className="h-5 w-5" />,
  },
  {
    title: "Si segna in meta",
    body: "Il punto arriva quando un passaggio viene ricevuto dentro la zona di meta avversaria.",
    icon: <Target className="h-5 w-5" />,
  },
  {
    title: "Non si corre col disco",
    body: "Chi riceve deve fermarsi, stabilire un piede perno e cercare il passaggio successivo.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Sette contro sette",
    body: "All'aperto si gioca con sette atleti per squadra. Indoor e beach usano formati ridotti.",
    icon: <Users className="h-5 w-5" />,
  },
]

export default function UltimatePage() {
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_18%,rgba(141,179,229,0.13),transparent_48%),linear-gradient(180deg,rgba(17,23,44,0.12),rgba(17,23,44,0.72))] pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl space-y-5">
            <h1 className="font-bebas text-6xl uppercase italic leading-none tracking-tighter text-white md:text-8xl">
              Ultimate
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Uno sport veloce, autoarbitrato e profondamente collettivo. Il disco si muove con i passaggi, il gioco cresce con la responsabilità di chi lo pratica.
            </p>
          </div>
        </div>
      </section>

      <main>
        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-20 md:px-8 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-4">
            <h2 className="font-bebas text-5xl uppercase italic leading-none tracking-tight text-white md:text-6xl">
              Regole principali
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Poche regole rendono il gioco leggibile fin da subito. Il resto nasce da tecnica, scelte e collaborazione.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            {rules.map((rule) => (
              <article
                key={rule.title}
                className="rounded-xl border border-white/[0.08] bg-[#151C34]/80 p-6 shadow-[0_22px_65px_rgba(8,12,28,0.18)]"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-white/[0.04] text-brand-blue">
                  {rule.icon}
                </div>
                <h3 className="font-bebas text-4xl uppercase italic leading-none tracking-tight text-white">
                  {rule.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {rule.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-white/[0.08] bg-[#192039] px-4 py-20 md:px-8 md:py-28">
          <div className="absolute right-6 top-8 font-bebas text-[18vw] uppercase italic leading-none tracking-tighter text-outline-blue opacity-[0.05] pointer-events-none select-none">
            DISC
          </div>

          <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-sm border border-white/10 bg-white/[0.04] text-brand-red">
                <Clock className="h-5 w-5" />
              </div>
              <h2 className="font-bebas text-5xl uppercase italic leading-none tracking-tight text-white md:text-7xl">
                Storia del <span className="text-brand-red">disco</span>
              </h2>
            </div>

            <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg lg:col-span-8">
              <p>
                Nato alla fine degli anni Sessanta negli Stati Uniti, l&apos;Ultimate Frisbee approda in Italia circa un decennio più tardi, prima a Milano, a Rimini e poi a Bologna.
              </p>
              <p>
                Nel 1979 viene fondata la Federazione Italiana Flying Disc e nel 2015 lo sport viene ufficialmente riconosciuto dal CIO, il Comitato Olimpico Internazionale.
              </p>
              <p>
                Negli ultimi anni l&apos;Ultimate si è diffuso in modo sempre più capillare: oggi le società associate alla Federazione sono numerose e Bologna è uno dei centri più vivi del movimento europeo.
              </p>
              <p className="border-l-4 border-brand-blue pl-4 font-medium text-white">
                Questo sviluppo nasce anche dalla collaborazione tra club, scuole e territori: il disco diventa uno strumento semplice per imparare gioco, rispetto e responsabilità.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-16 md:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-bebas text-4xl uppercase italic leading-none tracking-tight text-white md:text-5xl">
              Vuoi provarlo?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Abbiamo percorsi per chi inizia, per chi rientra in campo e per chi vuole competere.
            </p>
          </div>
          <Link
            href="/contatti"
            className="group inline-flex w-max items-center gap-2 rounded-sm bg-brand-red px-6 py-3.5 font-montserrat text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_18px_45px_rgba(162,41,59,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B23347]"
          >
            Entra nel club
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
