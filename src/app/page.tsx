"use client"

import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import {
  ArrowRight,
  Shield,
} from "lucide-react"

import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01"
import { SiteFooter } from "@/components/site-footer"
import OneTribeLogo from "@/app/svg/one-tribe-logo"
import OneTribeText from "@/app/svg/one-tribe-text"
import Floating, { FloatingElement } from "@/components/fancy/image/parallax-floating"
import { exampleImages } from "@/utils/demo-images"
import { defaultArticles, mergeStoredArticles, type Article } from "./news/articles-data"

const heroReels = [
  { id: 1, videoSrc: "/videos/hero-reel-h264.mp4" },
  { id: 2, videoSrc: "/videos/reel-2-h264.mp4" },
  { id: 3, videoSrc: "/videos/reel-3-h264.mp4" },
  { id: 4, videoSrc: "/videos/reel-4-h264.mp4" },
  { id: 5, videoSrc: "/videos/reel-5.mp4" },
  { id: 6, videoSrc: "/videos/reel-6-h264.mp4" },
  { id: 7, videoSrc: "/videos/reel-7-h264.mp4" },
  { id: 8, videoSrc: "/videos/reel-8-h264.mp4" }
]

const HeroVideoBackdrop = () => {
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(() => Math.floor(Math.random() * heroReels.length))
  const transitionStartedRef = useRef(false)
  const activeReelIdRef = useRef(heroReels[activeIndex].id)
  const activeReel = heroReels[activeIndex]

  useEffect(() => {
    transitionStartedRef.current = false
    activeReelIdRef.current = activeReel.id
  }, [activeReel.id])

  const playNextReel = (reelId: number) => {
    if (reelId !== activeReelIdRef.current || transitionStartedRef.current) return

    transitionStartedRef.current = true
    setActiveIndex((current) => {
      if (heroReels.length <= 1) return current

      let next = Math.floor(Math.random() * heroReels.length)
      while (next === current) {
        next = Math.floor(Math.random() * heroReels.length)
      }
      return next
    })
  }

  const handleVideoTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>, reelId: number) => {
    const video = event.currentTarget
    if (!Number.isFinite(video.duration) || video.duration <= 0) return

    const shouldCrossfade = video.duration - video.currentTime <= 1.35
    if (!shouldCrossfade) return

    playNextReel(reelId)
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#11172C]">
      <AnimatePresence initial={false}>
        <motion.div
          key={activeReel.id}
          className="absolute inset-0"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.video
            autoPlay
            muted
            playsInline
            preload="metadata"
            onTimeUpdate={(event) => handleVideoTimeUpdate(event, activeReel.id)}
            onEnded={() => playNextReel(activeReel.id)}
            className="absolute inset-0 h-full w-full object-cover"
            initial={prefersReducedMotion ? false : { scale: 1.018 }}
            animate={{ scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <source src={activeReel.videoSrc} type="video/mp4" />
          </motion.video>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-[#071126]/58 mix-blend-multiply" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,38,0.44),rgba(7,17,38,0.22)_42%,rgba(7,17,38,0.58))]" />
    </div>
  )
}

export default function Home() {
  const router = useRouter()
  const prefersReducedMotion = useReducedMotion()
  const [showIntroLoader, setShowIntroLoader] = useState(true)
  const [articles, setArticles] = useState<Article[]>(defaultArticles)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowIntroLoader(false)
    }, prefersReducedMotion ? 450 : 1850)

    return () => window.clearTimeout(timer)
  }, [prefersReducedMotion])

  useEffect(() => {
    const saved = localStorage.getItem("one_tribe_news")
    let loadedArticles = defaultArticles
    if (saved) {
      try {
        loadedArticles = mergeStoredArticles(JSON.parse(saved))
        localStorage.setItem("one_tribe_news", JSON.stringify(loadedArticles))
      } catch (e) {
        console.error(e)
      }
    } else {
      localStorage.setItem("one_tribe_news", JSON.stringify(defaultArticles))
    }
    setArticles(loadedArticles)
  }, [])

  const navLinks = [
    { href: "/squadre", label: "Squadre" },
    { href: "/ultimate", label: "Ultimate" },
    { href: "/scuole", label: "Scuole" },
    { href: "/news", label: "News" },
    { href: "/contatti", label: "Contatti" },
    { href: "/soci", label: "Soci" },
  ]

  const sponsors = [
    { name: "Lavoro più", url: "https://www.onetribeultimate.it/images/sponsor/logo-sponsor-lavoropiu_webready.webp" },
    { name: "NaturaSi", url: "https://www.onetribeultimate.it/images/sponsor/logo-sponsor-naturasi_webready.webp" },
    { name: "Mielizia", url: "https://www.onetribeultimate.it/images/sponsor/logo-sponsor-mielizia_webready.webp" },
    { name: "3Cime", url: "https://www.onetribeultimate.it/images/sponsor/logo-sponsor-3cime_webready.webp" },
    { name: "BDC28", url: "https://www.onetribeultimate.it/images/sponsor/logo-sponsor-bdc28_webready.webp" },
    { name: "CSI", url: "https://www.onetribeultimate.it/images/sponsor/logo-sponsor-csi_webready.webp" },
    { name: "Meridiana Medical", url: "https://www.onetribeultimate.it/images/sponsor/logo-sponsor-meridiana-medical_webready.webp" },
    { name: "Creatiwe", url: "https://www.onetribeultimate.it/images/sponsor/logo-sponsor-creatiwe_webready.webp" },
    { name: "Espresso", url: "https://www.onetribeultimate.it/images/sponsor/logo-sponsor-espresso_webready.webp" },
    { name: "Hanky & Panky - Parrucchieri", url: "https://www.onetribeultimate.it/images/sponsor/logo-sponsor-hanky_webready.webp" },
  ]

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-brand-navy text-foreground font-sans overflow-x-hidden selection:bg-brand-red selection:text-white">
      <AnimatePresence>
        {showIntroLoader && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-[#11172C]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 bg-logo-pattern opacity-[0.12]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(141,179,229,0.12),transparent_58%)]" />
            <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-6 text-center">
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-center justify-center"
              >
                <motion.div
                  animate={prefersReducedMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.86, 1, 0.86] }}
                  transition={{ duration: 1.25, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
                  className="flex h-full w-full items-center justify-center"
                >
                  <OneTribeLogo className="h-24 w-auto drop-shadow-[0_18px_45px_rgba(8,12,28,0.42)] md:h-32" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar01 
        logo={<OneTribeLogo className="py-2 h-10 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />}
        navigationLinks={navLinks}
        signInText="Accedi a Golee"
        ctaText="Entra nel club"
        onSignInClick={() => window.open("https://app.golee.it", "_blank")}
        onCtaClick={() => router.push("/contatti")}
      />

      <section className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col justify-center items-center px-4 bg-brand-navy z-10">
        <HeroVideoBackdrop />

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center justify-center px-4 pt-16 text-center"
        >
            <div className="flex w-full flex-col items-center justify-center">
              <OneTribeLogo className="hero-center-fist mb-6 h-auto w-28 drop-shadow-[0_22px_45px_rgba(8,12,28,0.45)] sm:w-36 md:w-44" />
              <div
                className="h-auto w-[300px] max-w-[92vw] select-none drop-shadow-[0_28px_70px_rgba(8,12,28,0.48)] pointer-events-none sm:w-[520px] md:w-[720px]"
              >
                <OneTribeText className="hero-center-text w-full h-auto text-white fill-white" />
              </div>
            </div>

            <div className="mt-7 w-[300px] max-w-[92vw] text-center sm:w-[520px] md:w-[720px]">
              <p className="font-bebas text-3xl uppercase italic leading-[1.08] text-white drop-shadow-[0_16px_34px_rgba(8,12,28,0.42)] sm:text-4xl md:text-5xl">
                Libertà. Lealtà. Inclusione.
              </p>
              <p className="mx-auto mt-3 max-w-2xl font-montserrat text-sm font-medium leading-relaxed text-[#E3E8F4] drop-shadow-[0_12px_28px_rgba(8,12,28,0.36)] md:text-base">
                Molto più di uno sport. Una tribù in cui crescere, competere e vivere esperienze insieme.
              </p>
            </div>

            <div className="z-20 mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => handleScrollTo("tesseramento")}
                className="group relative px-6 py-3.5 rounded-sm bg-brand-red text-white font-montserrat font-semibold uppercase tracking-[0.14em] text-xs transition-all duration-300 cursor-pointer shadow-[0_18px_45px_rgba(162,41,59,0.28)] hover:-translate-y-0.5 hover:bg-[#B23347] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/80"
              >
                <span className="flex items-center gap-2">
                  Entra nel club
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 duration-200" />
                </span>
              </button>
              
              <button
                onClick={() => handleScrollTo("progetto")}
                className="group px-6 py-3.5 rounded-sm border border-white/[0.22] bg-black/15 text-white backdrop-blur-sm hover:text-brand-navy font-montserrat font-semibold uppercase tracking-[0.14em] text-xs hover:bg-brand-blue duration-300 cursor-pointer active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/80"
              >
                Scopri il progetto
              </button>
            </div>

        </motion.div>
      </section>

      <section id="progetto" className="relative py-28 px-4 md:px-8 bg-brand-navy overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 mb-14">

          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-bebas text-6xl md:text-8xl uppercase italic tracking-tighter text-white transform -skew-x-12 leading-none">
              IL PROGETTO<br/>
              <span className="text-brand-blue">ONE TRIBE</span>
            </h2>
            <div className="w-20 h-1.5 bg-brand-red transform -skew-x-12 mt-6" />
          </div>

          <div className="lg:col-span-7 space-y-6 text-muted-foreground font-sans text-base md:text-lg leading-relaxed">
            <p>
              One Tribe nasce dalla volontà di costruire un luogo in cui vivere lo sport in tutte le sue forme: dalla prima esperienza con un disco alla competizione, dalla scuola alla prima squadra.
            </p>
            <p className="border-l-4 border-brand-blue pl-4 text-white font-medium">
              Un percorso fatto di allenamenti, persone, viaggi, sfide ed esperienze, nel quale ogni atleta possa trovare il proprio spazio, crescere e scoprire fin dove può arrivare.
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            ["Libertà", "Allenarsi, giocare e crescere dentro uno sport che chiede responsabilità personale."],
            ["Lealtà", "Ogni chiamata in campo parte dal rispetto: dell'avversario, della squadra, del gioco."],
            ["Inclusione", "Gruppi misti, percorsi giovani e spazi aperti a chi vuole provare davvero."]
          ].map(([title, body]) => (
            <article key={title} className="rounded-xl border border-white/[0.08] bg-[#192039]/70 p-6 shadow-[0_20px_65px_rgba(8,12,28,0.18)]">
              <h3 className="font-bebas text-4xl uppercase italic leading-none tracking-tight text-white">
                {title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {articles.length > 0 && (
        <section id="news" className="relative py-20 px-4 md:px-8 bg-[#1B223D] border-y border-white/[0.08] select-none">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-4 border-b border-white/10 pb-5 mb-9 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-bebas text-5xl md:text-6xl text-white tracking-tight uppercase italic leading-none">
                Ultime <span className="text-brand-blue">notizie</span>
              </h2>
              <Link 
                href="/news" 
                className="font-montserrat text-xs font-semibold text-white/[0.78] hover:text-white transition-colors duration-200 border-b border-white/30 hover:border-brand-blue pb-1 w-max uppercase tracking-[0.14em]"
              >
                Tutte le notizie
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
              {articles.slice(0, 3).map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.id}`}
                  className="group flex flex-col gap-4 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/80"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-navy rounded-sm border border-white/[0.07] group-hover:border-brand-blue/[0.26] transition-all duration-300 shadow-[0_24px_65px_rgba(8,12,28,0.22)]">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover grayscale-[18%] group-hover:grayscale-0 group-hover:scale-[1.035] transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#11172C]/55 via-transparent to-transparent opacity-80" />
                  </div>
                  <div className="space-y-2">
                    <div className="font-montserrat text-[10px] md:text-xs font-semibold uppercase tracking-[0.14em]">
                      <span className="text-brand-blue">{article.category}</span>
                      <span className="mx-2 text-white/30">-</span>
                      <span className="text-muted-foreground">{article.date}</span>
                    </div>
                    <h3 className="font-montserrat font-semibold text-white text-base md:text-lg leading-snug text-pretty group-hover:text-brand-blue transition-colors duration-200">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}

              <Link
                href="/contatti"
                className="group relative flex flex-col justify-between p-6 overflow-hidden aspect-[4/5] w-full rounded-sm bg-[#18203A] border border-white/[0.07] hover:border-brand-blue/[0.26] shadow-[0_28px_80px_rgba(8,12,28,0.28)] transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/80"
              >
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/images/onetribe-5.jpg"
                    alt="Divisa ufficiale One Tribe indossata in campo"
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-[1.035] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11172C] via-[#202847]/70 to-[#202847]/20 opacity-95" />
                </div>

                <div className="relative z-10">
                  <span className="font-montserrat font-semibold text-[10px] uppercase tracking-[0.16em] text-brand-blue">
                    HOME KIT 26/27
                  </span>
                  <h3 className="font-bebas text-4xl text-white uppercase italic tracking-tight mt-2 leading-none">
                    Divisa ufficiale<br/>One Tribe
                  </h3>
                </div>

                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-sm bg-brand-navy/70 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>

                <div className="relative z-10 flex">
                  <span className="px-4 py-2 rounded-sm bg-brand-red text-white font-montserrat font-semibold text-[10px] uppercase tracking-[0.14em] group-hover:bg-[#B23347] transition-colors duration-300">
                    Acquista
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Club History */}
      <section id="storia" className="relative py-28 px-4 md:px-8 bg-brand-navy bg-logo-pattern overflow-hidden border-y border-white/5">
        <div className="absolute top-10 left-10 font-bebas text-[20vw] text-outline-blue opacity-[0.03] tracking-tighter uppercase italic select-none pointer-events-none transform -skew-x-12">
          EST. 2009
        </div>
        <div className="absolute bottom-10 right-10 font-bebas text-[20vw] text-outline-red opacity-[0.03] tracking-tighter uppercase italic select-none pointer-events-none transform -skew-x-12">
          ULTIMATE
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-bebas text-brand-red text-xl tracking-wide uppercase italic">Dal 2009 a oggi</span>
              <h3 className="font-bebas text-5xl md:text-7xl uppercase italic tracking-tighter text-white transform -skew-x-12 leading-none mt-2">
                STORIA DI<br/><span className="text-brand-blue">ONE TRIBE</span>
              </h3>
              <div className="w-16 h-1 bg-brand-blue mt-4 transform -skew-x-12" />
            </div>

            <div className="lg:col-span-7 space-y-6 text-muted-foreground font-sans text-base md:text-lg leading-relaxed">
              <p>
                Ed è il settembre del 2009 quando Piero Pisano, Sergio Albertazzi e Silvia Bargellini fondarono gli Alligators, un gruppo di ragazzi e ragazze delle superiori con la passione per un disco di plastica.
              </p>
              <p>
                Allora, a vestire la maglia della squadra erano poco più di 10 atleti. Nel tempo, i numeri ed il livello di gioco sono cresciuti esponenzialmente, portando la squadra Alligators ad una riorganizzazione e alla decisione di costituire una nuova associazione sportiva dilettantistica.
              </p>
              <p className="text-white font-medium">
                Così nel luglio 2023 nasce la squadra One Tribe, che con i suoi oltre 200 atleti suddivisi tra squadre agonistiche e corsi di avviamento è la prima società in Italia e una delle maggiori in Europa.
              </p>
            </div>
          </div>

        </div>
      </section>

      <section className="relative w-full min-h-[92dvh] bg-[#192039] border-y border-white/[0.08] overflow-hidden flex flex-col justify-center items-center">
        
        <div className="absolute z-10 text-center select-none pointer-events-none px-4">
          <h2 className="font-bebas text-6xl md:text-9xl uppercase italic tracking-tighter text-white/95 leading-none transform -skew-x-12">
            GALLERY <span className="text-brand-blue">ONETRIBE</span>
          </h2>
          <p className="font-montserrat text-xs text-brand-red uppercase tracking-[0.14em] mt-3">
            Momenti catturati all&apos;interno della nostra avventura
          </p>
        </div>

        <Floating sensitivity={-0.85} className="absolute inset-0 w-full h-full z-1 overflow-hidden">
          <FloatingElement depth={0.4} className="top-[15%] left-[8%]">
            <motion.img
              src={exampleImages[0].url}
              alt="Partita One Tribe in azione"
              className="w-52 h-36 md:w-64 md:h-48 object-cover rounded-sm border border-white/10 hover:border-brand-blue hover:scale-[1.025] duration-300 cursor-pointer shadow-[0_28px_80px_rgba(8,12,28,0.34)]"
              whileHover={{ rotate: -2 }}
            />
          </FloatingElement>
          <FloatingElement depth={0.8} className="top-[8%] left-[40%]">
            <motion.img
              src={exampleImages[1].url}
              alt="Allenamento One Tribe"
              className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-sm border border-white/10 hover:border-brand-blue hover:scale-[1.025] duration-300 cursor-pointer shadow-[0_28px_80px_rgba(8,12,28,0.34)]"
              whileHover={{ rotate: 3 }}
            />
          </FloatingElement>
          <FloatingElement depth={0.6} className="top-[12%] right-[10%]">
            <motion.img
              src={exampleImages[2].url}
              alt="Atleti One Tribe durante una partita"
              className="w-48 h-36 md:w-72 md:h-48 object-cover rounded-sm border border-white/10 hover:border-brand-blue hover:scale-[1.025] duration-300 cursor-pointer shadow-[0_28px_80px_rgba(8,12,28,0.34)]"
              whileHover={{ rotate: -1 }}
            />
          </FloatingElement>
          <FloatingElement depth={1.2} className="bottom-[15%] left-[12%]">
            <motion.img
              src={exampleImages[4].url}
              alt="Giocatore One Tribe con disco"
              className="w-44 h-48 md:w-56 md:h-72 object-cover rounded-sm border border-white/10 hover:border-brand-blue hover:scale-[1.025] duration-300 cursor-pointer shadow-[0_28px_80px_rgba(8,12,28,0.34)]"
              whileHover={{ rotate: 2 }}
            />
          </FloatingElement>
          <FloatingElement depth={0.7} className="bottom-[18%] right-[15%]">
            <motion.img
              src={exampleImages[5].url}
              alt="Squadra One Tribe in campo"
              className="w-56 h-40 md:w-80 md:h-56 object-cover rounded-sm border border-white/10 hover:border-brand-blue hover:scale-[1.025] duration-300 cursor-pointer shadow-[0_28px_80px_rgba(8,12,28,0.34)]"
              whileHover={{ rotate: -3 }}
            />
          </FloatingElement>
          <FloatingElement depth={0.5} className="bottom-[10%] left-[45%]">
            <motion.img
              src={exampleImages[6].url}
              alt="Scatto di gioco One Tribe"
              className="w-48 h-32 md:w-64 md:h-44 object-cover rounded-sm border border-white/10 hover:border-brand-blue hover:scale-[1.025] duration-300 cursor-pointer shadow-[0_28px_80px_rgba(8,12,28,0.34)]"
              whileHover={{ rotate: 1 }}
            />
          </FloatingElement>
        </Floating>
      </section>

      <section id="sponsor" className="py-28 px-4 md:px-8 bg-brand-navy overflow-hidden select-none">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center space-y-4">
            <h2 className="font-bebas text-5xl md:text-7xl uppercase italic tracking-tighter text-white transform -skew-x-12">
              CONDIVIDONO I NOSTRI <span className="text-brand-red">VALORI</span>
            </h2>
            <div className="w-16 h-1 bg-brand-blue mx-auto mt-4 transform -skew-x-12" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5 items-center justify-items-center">
            {sponsors.map((sponsor, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="group relative flex items-center justify-center p-6 bg-[#192039]/70 border border-white/[0.07] hover:border-brand-blue/[0.24] rounded-sm w-full h-32 overflow-hidden duration-300 shadow-[0_18px_55px_rgba(8,12,28,0.16)]"
              >
                <Image
                  src={sponsor.url}
                  alt={sponsor.name}
                  width={180}
                  height={90}
                  sizes="(min-width: 768px) 12rem, 50vw"
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 duration-300 opacity-[0.68] group-hover:opacity-100"
                />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <section className="py-12 px-4 md:px-8 bg-brand-red border-y border-white/10 select-none">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-white" />
            <div>
              <h3 className="font-bebas text-2xl md:text-3xl text-white uppercase italic tracking-tight">SAFEGUARDING POLICY</h3>
              <p className="font-sans text-xs text-white/80 mt-0.5">Tutela dei minori e politiche di salvaguardia BUG ASD.</p>
            </div>
          </div>
          <button
            onClick={() => window.open("/safeguarding-policy", "_blank")}
            className="group px-5 py-3 rounded-sm border border-white/75 text-white font-montserrat font-semibold uppercase tracking-[0.14em] text-xs hover:bg-white hover:text-brand-red duration-300 cursor-pointer active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            Visualizza Policy
          </button>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
