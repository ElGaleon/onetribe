"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { 
  Trophy, 
  Users, 
  MapPin, 
  Clock, 
  User, 
  Star,
  Activity
} from "lucide-react"

import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01"
import OneTribeLogo from "@/app/svg/one-tribe-logo"
import { exampleImages } from "@/utils/demo-images"

interface TeamData {
  id: string
  name: string
  category: string
  desc: string
  image: string
  location: string
  schedule: string
  coaches: string[]
  captains: string[]
  roster: string[]
  palmares: string[]
}

export default function Squadre() {
  const [activeTab, setActiveTab] = useState<string>("mixed")

  const navLinks = [
    { href: "/squadre", label: "Squadre", active: true },
    { href: "/scuole", label: "Scuole" },
    { href: "/news", label: "News" },
    { href: "/contatti", label: "Contatti" },
    { href: "/soci", label: "Soci" },
    { href: "/summer-camp", label: "Summer Camp" },
  ]

  const teams: Record<string, TeamData> = {
    mixed: {
      id: "mixed",
      name: "Mixed Division",
      category: "Serie A / B (Co-Ed)",
      desc: "La massima espressione dello spirito di squadra e del rispetto reciproco. La formazione mista di One Tribe compete ai vertici dei campionati italiani, unendo atleti e atlete in una perfetta sinergia tattica ed atletica.",
      image: exampleImages[0].url,
      location: "Centro Sportivo Barca, Via Raffaello Sanzio, Bologna",
      schedule: "Martedì e Giovedì, 20:00 - 22:00",
      coaches: ["Piero Pisano (Head Coach)", "Silvia Bargellini (Assistant Coach)"],
      captains: ["Matteo S.", "Francesca M."],
      roster: [
        "Davide G.", "Chiara L.", "Pietro B.", "Silvia R.", "Matteo S.", 
        "Francesca M.", "Federico D.", "Giulia C.", "Alessandro V.", 
        "Elena T.", "Lorenzo M.", "Sofia N.", "Gabriele F.", "Valeria P."
      ],
      palmares: [
        "Campioni Italiani Mixed 2024",
        "Premio Spirit of the Game - European Championship 2023",
        "1° Posto Coppa Italia 2023"
      ]
    },
    open: {
      id: "open",
      name: "Open Division",
      category: "Serie A (Maschile/Libera)",
      desc: "Velocità pura, atletismo esplosivo e lanci spettacolari. La divisione Open raccoglie la grinta e la forza competitiva della nostra associazione, puntando a traguardi prestigiosi in ambito nazionale ed europeo.",
      image: exampleImages[1].url,
      location: "Centro Sportivo Barca, Via Raffaello Sanzio, Bologna",
      schedule: "Lunedì e Mercoledì, 20:30 - 22:30",
      coaches: ["Sergio Albertazzi (Head Coach)"],
      captains: ["Tommaso R.", "Filippo B."],
      roster: [
        "Tommaso R.", "Filippo B.", "Andrea G.", "Luca Z.", "Marco P.", 
        "Stefano V.", "Giacomo L.", "Nicola F.", "Roberto M.", 
        "Daniele S.", "Edoardo C.", "Christian G.", "Samuel T."
      ],
      palmares: [
        "Vice-Campioni Italiani Open 2024",
        "1° Posto Bologna Spring Tournament 2025",
        "Top 10 European Ultimate Championship 2023"
      ]
    },
    women: {
      id: "women",
      name: "Women's Division",
      category: "Serie A (Femminile)",
      desc: "Coordinazione d'élite, determinazione indistruttibile e tattica di ferro. La divisione femminile di One Tribe è una realtà solida e agguerrita, composta da atlete di caratura nazionale con una forte identità di squadra.",
      image: exampleImages[2].url,
      location: "Centro Sportivo Barca, Via Raffaello Sanzio, Bologna",
      schedule: "Martedì e Venerdì, 19:30 - 21:30",
      coaches: ["Elena Rossi (Coach)"],
      captains: ["Chiara N.", "Beatrice V."],
      roster: [
        "Chiara N.", "Beatrice V.", "Alessia M.", "Marta C.", "Giorgia P.", 
        "Sara B.", "Alice G.", "Federica L.", "Camilla S.", 
        "Veronica D.", "Noemi F.", "Ludovica R.", "Martina B."
      ],
      palmares: [
        "Campionesse Italiane Serie A 2023",
        "Premio Spirit of the Game - Campionato Italiano 2024",
        "2° Posto Venice Cup 2024"
      ]
    },
    junior: {
      id: "junior",
      name: "Junior Division (U20/U17)",
      category: "Campionato Giovanile",
      desc: "Il cuore pulsante del nostro futuro. I corsi giovanili e le squadre Junior nascono per coltivare il talento e diffondere lo Spirit of the Game tra i ragazzi e le ragazze, gettando le basi per i campioni di domani.",
      image: exampleImages[4].url,
      location: "Centro Sportivo Barca, Via Raffaello Sanzio, Bologna",
      schedule: "Mercoledì e Venerdì, 17:30 - 19:30",
      coaches: ["Matteo Sandri (Junior Coach)", "Luca Bianchi (Assistant Coach)"],
      captains: ["Samuele F.", "Greta M."],
      roster: [
        "Samuele F.", "Greta M.", "Leonardo P.", "Simone G.", "Christian L.", 
        "Martina F.", "Vittorio C.", "Matilde R.", "Filippo M.", 
        "Sofia Z.", "Tommaso D.", "Erika S.", "Jacopo B."
      ],
      palmares: [
        "Campioni Italiani Under 20 2024",
        "1° Posto Coppa delle Regioni Under 17 2023",
        "Premio Spirit of the Game Nazionale Junior 2024"
      ]
    }
  }

  const activeTeam = teams[activeTab]

  return (
    <div className="min-h-screen bg-brand-navy bg-dots-pattern text-foreground font-sans overflow-x-hidden relative">
      {/* Background watermark */}
      <div className="absolute top-10 left-10 font-bebas text-[20vw] text-outline opacity-[0.02] tracking-tighter uppercase italic select-none pointer-events-none transform -skew-x-12">
        TEAMS
      </div>

      {/* Sticky Blurred Navbar */}
      <Navbar01 
        logo={<OneTribeLogo className="py-2 h-10 cursor-pointer" onClick={() => window.location.href = "/"} />}
        navigationLinks={navLinks}
        signInText="Accedi a Golee"
        ctaText="Entra in ONE TRIBE"
        onSignInClick={() => window.open("https://app.golee.it", "_blank")}
        onCtaClick={() => window.location.href = "/contatti"}
        className="sticky top-0 z-[100] bg-brand-navy/90 backdrop-blur-md border-b border-white/5"
      />

      {/* Header Banner */}
      <section className="relative py-20 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-[#1E2543] to-brand-navy bg-grid-pattern border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(112,165,237,0.1),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center space-y-4 relative z-10">
          <div className="flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-xs font-semibold uppercase tracking-wider font-montserrat w-max mx-auto">
            <Activity className="w-4 h-4" />
            Le Nostre Squadre
          </div>
          <h1 className="font-bebas text-6xl md:text-8xl text-white uppercase italic tracking-tighter transform -skew-x-12 leading-none">
            DIVISIONI & <span className="text-brand-red">ROSTER</span>
          </h1>
          <p className="font-montserrat text-xs md:text-sm text-muted-foreground uppercase tracking-widest max-w-xl mx-auto">
            Scopri le nostre formazioni, gli orari degli allenamenti, gli staff tecnici e le vittorie conquistate sul campo.
          </p>
          <div className="w-16 h-1 bg-brand-blue mx-auto mt-6 transform -skew-x-12" />
        </div>
      </section>

      {/* Roster & Info Hub */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        
        {/* Dynamic Division Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 select-none">
          {Object.keys(teams).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-3 font-montserrat font-bold uppercase tracking-wider text-xs transform -skew-x-12 transition-expo duration-300 border-2 cursor-pointer ${
                activeTab === key
                  ? "bg-brand-red border-brand-red text-white shadow-lg shadow-brand-red/25"
                  : "glass-card border-transparent text-muted-foreground hover:border-brand-blue/55 hover:text-white"
              }`}
            >
              {teams[key].name}
            </button>
          ))}
        </div>

        {/* Tab Panel Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
          >
            {/* Left Block: Team Intro & Info */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Image banner */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl p-1 bg-brand-navy">
                <img 
                  src={activeTeam.image} 
                  alt={activeTeam.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* General Description */}
              <div className="space-y-4">
                <span className="font-bebas text-brand-red text-lg tracking-widest uppercase italic">{activeTeam.category}</span>
                <h2 className="font-bebas text-4xl md:text-5xl text-white uppercase italic tracking-tight leading-none transform -skew-x-6">
                  {activeTeam.name}
                </h2>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {activeTeam.desc}
                </p>
              </div>

              {/* Schedule and Location info */}
              <div className="p-6 glass-card rounded-xl space-y-4">
                <h4 className="font-montserrat font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                  <Star className="w-4 h-4 text-brand-blue" /> Info Allenamenti
                </h4>
                
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Luogo</span>
                    <span className="text-muted-foreground text-xs">{activeTeam.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm">
                  <Clock className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Orari</span>
                    <span className="text-muted-foreground text-xs">{activeTeam.schedule}</span>
                  </div>
                </div>
              </div>

              {/* Palmares Section */}
              <div className="p-6 glass-card rounded-xl space-y-4">
                <h4 className="font-montserrat font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-brand-blue" /> Palmares Divisione
                </h4>
                <ul className="space-y-2">
                  {activeTeam.palmares.map((award, index) => (
                    <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Star className="w-3.5 h-3.5 text-brand-red fill-brand-red shrink-0" />
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Right Block: Coaches & Roster */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Technical Staff & Captains */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Staff */}
                <div className="p-6 glass-card transition-expo hover:scale-[1.02] rounded-xl space-y-3 shadow-md">
                  <h4 className="font-montserrat font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                    <User className="w-4 h-4 text-brand-blue" /> Staff Tecnico
                  </h4>
                  <ul className="space-y-1">
                    {activeTeam.coaches.map((coach, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                        {coach}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Captains */}
                <div className="p-6 glass-card transition-expo hover:scale-[1.02] rounded-xl space-y-3 shadow-md">
                  <h4 className="font-montserrat font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                    <Star className="w-4 h-4 text-brand-red" /> Capitani
                  </h4>
                  <ul className="space-y-1">
                    {activeTeam.captains.map((captain, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0" />
                        {captain}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Roster Grid */}
              <div className="space-y-4">
                <h3 className="font-bebas text-3xl text-white uppercase italic tracking-tight flex items-center gap-2">
                  <Users className="w-5 h-5 text-brand-blue" /> Roster Atleti
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 select-none">
                  {activeTeam.roster.map((player, idx) => (
                    <div 
                      key={idx}
                      className="p-4 glass-card transition-expo hover:-translate-y-1 hover:scale-[1.04] hover:rotate-1 rounded-xl text-center shadow-lg"
                    >
                      <div className="w-10 h-10 rounded-full bg-brand-navy border border-white/5 flex items-center justify-center mx-auto text-brand-blue font-bold mb-2">
                        {player.split(" ")[0][0]}
                      </div>
                      <span className="font-montserrat text-xs font-semibold text-white block">
                        {player}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </section>

      {/* Footer */}
      <footer className="bg-[#1E2543] border-t border-white/5 py-12 px-4 select-none mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <h4 className="font-bebas text-2xl text-white tracking-tighter uppercase italic leading-none">
              ONE TRIBE
            </h4>
            <p className="font-sans text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
              Bologna Ultimate Frisbee · BUG ASD
            </p>
          </div>
          <div className="flex gap-6 font-montserrat text-xs text-muted-foreground uppercase tracking-wider">
            <Link href="/" className="hover:text-brand-blue duration-200">Home</Link>
            <Link href="/squadre" className="hover:text-brand-blue duration-200">Squadre</Link>
            <Link href="/scuole" className="hover:text-brand-blue duration-200">Scuole</Link>
            <Link href="/news" className="hover:text-brand-blue duration-200">News</Link>
            <Link href="/contatti" className="hover:text-brand-blue duration-200">Contatti</Link>
          </div>
          <div className="font-sans text-[10px] text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} BUG ASD. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
