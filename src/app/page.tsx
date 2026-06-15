"use client"

import React, { useRef, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "motion/react"
import { 
  ArrowRight, 
  Trophy, 
  Shield, 
  Sparkles, 
  Mail, 
  MapPin, 
  Heart, 
  FileText, 
  Activity,
  Instagram
} from "lucide-react"

import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01"
import OneTribeLogo from "@/app/svg/one-tribe-logo"
import OneTribeText from "@/app/svg/one-tribe-text"
import Floating, { FloatingElement } from "@/components/fancy/image/parallax-floating"
import ImageTrail, { ImageTrailItem } from "@/components/fancy/image/image-trail"
import { exampleImages } from "@/utils/demo-images"
import { defaultArticles, type Article } from "./news/articles-data"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const heroReels = [
  { id: 1, videoSrc: "/videos/hero-reel.mp4", url: "https://www.instagram.com/p/DZHhqEYKOgq/", depth: 0.5, className: "top-[8%] left-[4%] md:left-[6%]" },
  { id: 2, videoSrc: "/videos/reel-2.mp4", url: "https://www.instagram.com/p/DXmcgttCvd9/", depth: 0.9, className: "top-[12%] right-[4%] md:right-[6%]" },
  { id: 3, videoSrc: "/videos/reel-3.mp4", url: "https://www.instagram.com/p/DXmBN0xCsD8/", depth: 0.7, className: "bottom-[16%] left-[16%] md:left-[20%]" },
  { id: 4, videoSrc: "/videos/reel-4.mp4", url: "https://www.instagram.com/p/DYCQ0-uKr9O/", depth: 0.4, className: "bottom-[14%] right-[16%] md:right-[20%]" },
  { id: 5, videoSrc: "/videos/reel-5.mp4", url: "https://www.instagram.com/p/DYHgSvwCvmm/?img_index=6", depth: 0.6, className: "top-[32%] left-[2%] md:left-[4%]" },
  { id: 6, videoSrc: "/videos/reel-6.mp4", url: "https://www.instagram.com/p/DYJ7_jXqvQf/", depth: 0.8, className: "top-[35%] right-[2%] md:right-[4%]" },
  { id: 7, videoSrc: "/videos/reel-7.mp4", url: "https://www.instagram.com/p/DY_983yuk9u/", depth: 0.55, className: "top-[5%] left-[28%] md:left-[32%]" },
  { id: 8, videoSrc: "/videos/reel-8.mp4", url: "https://www.instagram.com/p/DZITLT7q2s0/", depth: 0.45, className: "bottom-[8%] left-[45%] md:left-[48%]" }
]

interface ParallaxVideoCardProps {
  reel: typeof heroReels[0]
  position?: { top: number; left: number; rotate: number }
  containerRef: React.RefObject<HTMLDivElement | null>
}

const ParallaxVideoCard = ({ reel, position, containerRef }: ParallaxVideoCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const isDraggingRef = useRef(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleCardClick = (e: React.MouseEvent) => {
    if (isDraggingRef.current) return
    if (!isFlipped) {
      e.preventDefault()
      e.stopPropagation()
      setIsFlipped(true)
      const video = videoRef.current
      if (video) {
        video.currentTime = 0
        void video.play()
      }
    }
  }

  return (
    <motion.div
      layout
      drag
      dragConstraints={containerRef}
      dragElastic={0.12}
      dragMomentum={false}
      onDragStart={() => {
        isDraggingRef.current = true
      }}
      onDragEnd={() => {
        window.setTimeout(() => {
          isDraggingRef.current = false
        }, 0)
      }}
      onDoubleClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (isFlipped) window.open(reel.url, "_blank")
      }}
      className={`hero-reel-card absolute perspective-1000 select-none touch-none ${
        isFlipped 
          ? "w-[122px] h-[217px] sm:w-[144px] sm:h-[256px] md:w-[170px] md:h-[302px] cursor-grab" 
          : "w-[78px] h-[62px] sm:w-[88px] sm:h-[70px] md:w-[104px] md:h-[82px] cursor-pointer"
      }`}
      style={position ? { top: position.top, left: position.left, rotate: position.rotate } : { opacity: 0 }}
      onClick={handleCardClick}
      whileDrag={{ scale: 1.04, cursor: "grabbing" }}
    >
      <motion.div
        layout
        className="w-full h-full preserve-3d relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front Side: Fist Logo Cover (Only the logo shape itself) */}
        <div className="absolute inset-0 w-full h-full bg-transparent flex items-center justify-center backface-hidden select-none">
          <OneTribeLogo className="w-full h-full filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:scale-105 duration-300 transition-transform" />
        </div>

        {/* Back Side: Video Loop in the original reel format */}
        <div className="absolute inset-0 w-full h-full bg-transparent backface-hidden [transform:rotateY(180deg)] drop-shadow-2xl group">
          <div className="relative w-full h-full overflow-hidden rounded-xl border border-white/10 bg-[#1E2543]">
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            >
              <source src={reel.videoSrc} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-brand-navy/10 pointer-events-none" />
            {/* Hover overlay with Instagram logo */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1 text-white pointer-events-none">
              <Instagram className="w-5 h-5 text-brand-red fill-brand-red" />
              <span className="font-montserrat text-[9px] font-bold uppercase tracking-wider">Doppio click</span>
            </div>
          </div>
          
          {/* Flip-back button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              videoRef.current?.pause()
              setIsFlipped(false)
            }}
            className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-[10px] text-white/70 hover:text-white hover:bg-black/90 cursor-pointer z-20"
            title="Gira di nuovo"
          >
            ↺
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Home() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const progettoRef = useRef<HTMLDivElement>(null)
  const [articles, setArticles] = useState<Article[]>(defaultArticles)
  const [cardPositions, setCardPositions] = useState<Record<number, { top: number; left: number; rotate: number }>>({})

  useEffect(() => {
    const generatePositions = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const heroTop = Math.max(heroRef.current?.getBoundingClientRect().top ?? 0, 0)
      const visibleHeroHeight = Math.min(heroRef.current?.clientHeight ?? height, height - heroTop)
      const expandedWidth = width >= 768 ? 170 : width >= 640 ? 144 : 122
      const expandedHeight = width >= 768 ? 302 : width >= 640 ? 256 : 217
      const marginX = width >= 768 ? 48 : 18
      const marginTop = width >= 768 ? 42 : 24
      const marginBottom = width >= 768 ? 42 : 24
      const lanes = [
        [0.06, 0.08],
        [0.76, 0.1],
        [0.18, 0.35],
        [0.66, 0.38],
        [0.04, 0.62],
        [0.78, 0.62],
        [0.39, 0.18],
        [0.43, 0.7],
      ]
      const generated: Record<number, { top: number; left: number; rotate: number }> = {}

      heroReels.forEach((reel, index) => {
        const [baseLeft, baseTop] = lanes[index % lanes.length]
        const jitterX = (Math.random() - 0.5) * (width >= 768 ? 96 : 38)
        const jitterY = (Math.random() - 0.5) * (width >= 768 ? 84 : 42)
        const maxLeft = Math.max(marginX, width - expandedWidth - marginX)
        const maxTop = Math.max(marginTop, visibleHeroHeight - expandedHeight - marginBottom)
        const left = Math.min(maxLeft, Math.max(marginX, width * baseLeft + jitterX))
        const top = Math.min(maxTop, Math.max(marginTop, visibleHeroHeight * baseTop + jitterY))
        generated[reel.id] = {
          top,
          left,
          rotate: Math.round((Math.random() - 0.5) * 18),
        }
      })

      setCardPositions(generated)
    }

    generatePositions()
    window.addEventListener("resize", generatePositions)
    return () => window.removeEventListener("resize", generatePositions)
  }, [])

  // GSAP Scroll-linked animations
  const heroScrollRef = useRef<HTMLDivElement>(null)
  const bgOverlayRef = useRef<HTMLDivElement>(null)
  const initialBgRef = useRef<HTMLDivElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)
  const marqueeLine1Ref = useRef<HTMLDivElement>(null)
  const marqueeLine2Ref = useRef<HTMLDivElement>(null)
  const marqueeLine3Ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!heroRef.current) return

    // 1. Hero Pinned Scroll Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=130%", // Pinned scroll duration (130% of viewport height)
        pin: true,
        scrub: true,
        anticipatePin: 1,
      }
    })

    // Blue wash first: it covers the scattered reels before the logo/text appears.
    tl.to(bgOverlayRef.current, { opacity: 1, duration: 0.35, ease: "none" }, 0)
    tl.to(initialBgRef.current, { opacity: 0, duration: 0.3, ease: "none" }, 0)

    // Hero Text Reveal: Badge, Logo, Title SVG, paragraph, CTAs
    tl.fromTo(heroTextRef.current,
      { opacity: 0, y: 80, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power2.out" },
      0.42
    )

    // Toggle pointer events reactively
    tl.set(heroTextRef.current, { pointerEvents: "auto" }, 0.62)
    tl.set(heroTextRef.current, { pointerEvents: "none" }, 0)

    tl.to(".hero-reel-card", {
      opacity: 0,
      scale: 0.55,
      y: -120,
      duration: 0.3,
      stagger: 0.015,
      ease: "power1.out",
    }, 0)

    // 2. Project scrolling text marquee values
    if (progettoRef.current) {
      gsap.fromTo(marqueeLine1Ref.current, 
        { xPercent: 0 },
        {
          xPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: progettoRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      )

      gsap.fromTo(marqueeLine2Ref.current, 
        { xPercent: -20 },
        {
          xPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: progettoRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      )

      gsap.fromTo(marqueeLine3Ref.current, 
        { xPercent: 0 },
        {
          xPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: progettoRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      )
    }
  }, { scope: containerRef })

  useEffect(() => {
    const saved = localStorage.getItem("one_tribe_news")
    let loadedArticles = defaultArticles
    if (saved) {
      try {
        loadedArticles = JSON.parse(saved)
      } catch (e) {
        console.error(e)
      }
    }
    setArticles(loadedArticles)
  }, [])

  const navLinks = [
    { href: "/squadre", label: "Squadre" },
    { href: "/scuole", label: "Scuole" },
    { href: "/news", label: "News" },
    { href: "/contatti", label: "Contatti" },
    { href: "/soci", label: "Soci" },
    { href: "/summer-camp", label: "Summer Camp" },
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
    { name: "Hanky & Panky – Parrucchieri", url: "https://www.onetribeultimate.it/images/sponsor/logo-sponsor-hanky_webready.webp" },
  ]

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-brand-navy text-foreground font-sans overflow-x-hidden selection:bg-brand-red selection:text-white"
    >
      {/* Dynamic Sticky Blurred Navbar */}
      <Navbar01 
        logo={<OneTribeLogo className="py-2 h-10 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />}
        navigationLinks={navLinks}
        signInText="Accedi a Golee"
        ctaText="Entra in ONE TRIBE"
        onSignInClick={() => window.open("https://app.golee.it", "_blank")}
        onCtaClick={() => router.push("/contatti")}
        className="sticky top-0 z-[100] bg-brand-navy/90 backdrop-blur-md border-b border-white/5"
      />

      {/* Pinned Scroll Wrapper */}
      <div ref={heroScrollRef} className="relative w-full bg-brand-navy">
        {/* Pinned Hero Container */}
        <section 
          ref={heroRef} 
          className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center px-4 bg-logo-pattern z-10"
        >
          {/* Blue Background Overlay */}
          <div
            ref={bgOverlayRef}
            style={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-navy pointer-events-none z-[6]"
          />

          {/* Initial Background Gradient (fades out as blue background fades in) */}
          <div 
            ref={initialBgRef}
            style={{ opacity: 1 }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(112,165,237,0.22),transparent_70%)] pointer-events-none z-0"
          />

          {/* Random Logo/Reel Cards */}
          <div className="absolute inset-0 w-full h-full z-5 overflow-hidden">
            {heroReels.map((reel) => (
              <ParallaxVideoCard
                key={reel.id}
                reel={reel}
                position={cardPositions[reel.id]}
                containerRef={heroRef}
              />
            ))}
          </div>

          {/* Hollow Watermark backdrop */}
          <div className="absolute bottom-4 left-0 w-full text-center overflow-hidden pointer-events-none select-none z-1">
            <div className="font-bebas text-[16vw] text-outline opacity-10 tracking-tighter uppercase italic transform -skew-x-12 leading-none">
              BOLOGNA
            </div>
          </div>

          {/* Hero Main Content */}
          <div 
            ref={heroTextRef}
            style={{ 
              opacity: 0, 
              pointerEvents: "none" 
            }}
            className="absolute inset-0 z-10 text-center flex flex-col items-center justify-center px-4"
          >
            {/* Badge */}
            <div
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-blue text-xs font-semibold tracking-widest uppercase font-montserrat mb-6 shadow-[0_0_15px_rgba(146,23,46,0.1)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-red animate-pulse" />
              Bologna Capitale dell&apos;Ultimate
            </div>

            {/* Logo Container in the Center */}
            <div className="flex flex-col items-center justify-center mb-6 w-full">
              {/* Fist Logo */}
              <OneTribeLogo className="hero-center-fist w-28 sm:w-36 md:w-44 h-auto mb-6 filter drop-shadow-[0_0_35px_rgba(112,165,237,0.35)]" />
              {/* One Tribe Logo Text SVG */}
              <div
                className="w-[300px] sm:w-[520px] md:w-[720px] max-w-[92vw] h-auto drop-shadow-[0_0_35px_rgba(112,165,237,0.25)] select-none pointer-events-none"
              >
                <OneTribeText className="hero-center-text w-full h-auto text-white fill-white" />
              </div>
            </div>

            <p
              className="font-montserrat text-base md:text-lg text-muted-foreground uppercase tracking-widest mt-6 max-w-3xl text-center leading-relaxed"
            >
              La prima società di Ultimate Frisbee in Italia per numero di atleti e corsi. Condividiamo sul campo i valori di libertà, lealtà e inclusione.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10 z-20">
              <button
                onClick={() => handleScrollTo("tesseramento")}
                className="group relative px-8 py-4 bg-brand-red text-white font-montserrat font-bold uppercase tracking-wider text-xs transform -skew-x-12 hover:scale-105 duration-300 cursor-pointer shadow-lg shadow-brand-red/30 hover:shadow-brand-red/50 overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                <span className="flex items-center gap-2">
                  Entra in ONE TRIBE
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 duration-200" />
                </span>
              </button>
              
              <button
                onClick={() => handleScrollTo("progetto")}
                className="group px-8 py-4 border-2 border-brand-blue/80 text-brand-blue hover:text-white font-montserrat font-bold uppercase tracking-wider text-xs transform -skew-x-12 hover:bg-brand-blue/20 duration-300 cursor-pointer"
              >
                Scopri il Progetto
              </button>
            </div>

          </div>
        </section>
      </div>

      {/* Latest News Section (Inter.it style with Social Colors) */}
      {articles.length > 0 && (
        <section id="news" className="relative py-16 px-4 md:px-8 bg-brand-navy border-y border-white/5 select-none bg-grid-pattern">
          <div className="max-w-7xl mx-auto">
            {/* Header: Title on left, Link on right */}
            <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-8">
              <h2 className="font-montserrat font-bold text-xl md:text-2xl text-white tracking-wide uppercase">
                ULTIME NOTIZIE
              </h2>
              <Link 
                href="/news" 
                className="font-montserrat text-xs font-bold text-white hover:text-brand-red transition-colors duration-200 border-b border-white hover:border-brand-red pb-0.5"
              >
                Tutte le notizie
              </Link>
            </div>

            {/* 4-Column Horizontal Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {/* Columns 1, 2, 3: News Articles */}
              {articles.slice(0, 3).map((article) => (
                <Link
                  key={article.id}
                  href={`/news/${article.id}`}
                  className="group flex flex-col gap-4"
                >
                  {/* Portrait Image */}
                  <div className="aspect-[3/4] w-full overflow-hidden bg-brand-navy rounded-none border border-white/5 group-hover:border-brand-blue/30 transition-all duration-300">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                  {/* Article Info */}
                  <div className="space-y-2">
                    <div className="font-montserrat text-[10px] md:text-xs font-bold uppercase tracking-wider">
                      <span className="text-brand-blue">{article.category}</span>
                      <span className="mx-2 text-white/30">—</span>
                      <span className="text-muted-foreground">{article.date}</span>
                    </div>
                    <h3 className="font-montserrat font-bold text-white text-base md:text-lg leading-snug group-hover:text-brand-blue transition-colors duration-200">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}

              {/* Column 4: Promo Call to Action Card */}
              <Link
                href="/contatti"
                className="group relative flex flex-col justify-between p-6 overflow-hidden aspect-[3/4] w-full bg-[#1E2543] border border-white/5 hover:border-brand-blue/30 shadow-2xl transition-all duration-500"
              >
                {/* Full bleed background image */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src="/images/onetribe-5.jpg"
                    alt="Promo Kit"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-brand-navy/30 opacity-95" />
                </div>

                {/* Top Label */}
                <div className="relative z-10">
                  <span className="font-montserrat font-bold text-[10px] uppercase tracking-widest text-brand-blue">
                    HOME KIT 26/27
                  </span>
                  <h3 className="font-montserrat font-black text-xl text-white uppercase tracking-tight mt-1">
                    DIVISA UFFICIALE<br/>ONE TRIBE
                  </h3>
                </div>

                {/* Right Arrow on middle edge */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-brand-navy/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>

                {/* Bottom White Button */}
                <div className="relative z-10 flex">
                  <span className="px-5 py-2 bg-brand-red text-white font-montserrat font-bold text-[10px] uppercase tracking-widest group-hover:bg-brand-blue transition-colors duration-300">
                    ACQUISTA
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Continuous Marquee Ticker */}
      <div className="w-full bg-brand-red py-3.5 overflow-hidden border-y border-white/10 rotate-1 transform scale-105 select-none shadow-[0_4px_25px_rgba(0,0,0,0.35)]">
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite] gap-16 font-bebas text-2xl md:text-3xl italic uppercase tracking-widest text-white/95">
          <span>LIBERTÀ</span>
          <span className="text-brand-blue">•</span>
          <span>LEALTÀ</span>
          <span className="text-brand-blue">•</span>
          <span>INCLUSIONE</span>
          <span className="text-brand-blue">•</span>
          <span>BOLOGNA ULTIMATE FRISBEE</span>
          <span className="text-brand-blue">•</span>
          <span>ONE TRIBE</span>
          <span className="text-brand-blue">•</span>
          <span>SPIRIT OF THE GAME</span>
          <span className="text-brand-blue">•</span>
          
          <span>LIBERTÀ</span>
          <span className="text-brand-blue">•</span>
          <span>LEALTÀ</span>
          <span className="text-brand-blue">•</span>
          <span>INCLUSIONE</span>
          <span className="text-brand-blue">•</span>
          <span>BOLOGNA ULTIMATE FRISBEE</span>
          <span className="text-brand-blue">•</span>
          <span>ONE TRIBE</span>
          <span className="text-brand-blue">•</span>
          <span>SPIRIT OF THE GAME</span>
          <span className="text-brand-blue">•</span>
        </div>
      </div>

      {/* Il Progetto Section */}
      <section ref={progettoRef} id="progetto" className="relative py-28 px-4 md:px-8 bg-brand-navy bg-dots-pattern overflow-hidden border-b border-white/5">
        {/* Background outlined text */}
        <div className="absolute -top-10 -right-10 font-bebas text-[22vw] text-outline opacity-5 tracking-tighter uppercase italic select-none pointer-events-none transform -skew-x-12">
          PROJECT
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 mb-12">
          
          {/* Left Block: Bold Big Text */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-bebas text-6xl md:text-8xl uppercase italic tracking-tighter text-white transform -skew-x-12 leading-none">
              IL PROGETTO<br/>
              <span className="text-brand-blue">ONE TRIBE</span>
            </h2>
            <div className="w-20 h-1.5 bg-brand-red transform -skew-x-12 mt-6" />
          </div>

          {/* Right Block: Content */}
          <div className="lg:col-span-7 space-y-6 text-muted-foreground font-sans text-base md:text-lg leading-relaxed">
            <p>
              L’Ultimate Frisbee è uno sport in grandissima crescita che sta vivendo il passaggio da sport di nicchia, amatoriale, dove la passione ed il coinvolgimento personale sono decisivi, ad attività strutturata che necessita di un approccio più professionale, sia dal punto di vista organizzativo che da quello tecnico.
            </p>
            <p className="border-l-4 border-brand-blue pl-4 text-white font-medium">
              L’obiettivo del progetto ONE TRIBE è di creare una realtà strutturata e professionale, capace di far avvicinare a questo sport un numero sempre maggiore di ragazze e ragazzi, garantendo la continuità e la sostenibilità nel tempo dei suoi valori fondanti:
            </p>
          </div>

        </div>

        {/* Scroll Text Lines Banner (Full Width Breakout) */}
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-brand-red py-8 md:py-12 overflow-hidden select-none border-y border-white/10 shadow-[0_4px_25px_rgba(0,0,0,0.3)] z-10">
          <div className="flex flex-col gap-3 md:gap-5">
            
            {/* Line 1: LIBERTÀ */}
            <div className="flex whitespace-nowrap overflow-hidden">
              <div 
                ref={marqueeLine1Ref} 
                className="flex gap-8 font-bebas text-5xl sm:text-7xl md:text-9xl italic uppercase tracking-wider text-brand-navy"
              >
                <span>LIBERTÀ</span><span className="text-brand-navy/35">•</span>
                <span>LIBERTÀ</span><span className="text-brand-navy/35">•</span>
                <span>LIBERTÀ</span><span className="text-brand-navy/35">•</span>
                <span>LIBERTÀ</span><span className="text-brand-navy/35">•</span>
                <span>LIBERTÀ</span><span className="text-brand-navy/35">•</span>
                <span>LIBERTÀ</span><span className="text-brand-navy/35">•</span>
                <span>LIBERTÀ</span><span className="text-brand-navy/35">•</span>
                <span>LIBERTÀ</span>
              </div>
            </div>

            {/* Line 2: LEALTÀ */}
            <div className="flex whitespace-nowrap overflow-hidden">
              <div 
                ref={marqueeLine2Ref} 
                className="flex gap-8 font-bebas text-5xl sm:text-7xl md:text-9xl italic uppercase tracking-wider text-brand-navy"
              >
                <span>LEALTÀ</span><span className="text-brand-navy/35">•</span>
                <span>LEALTÀ</span><span className="text-brand-navy/35">•</span>
                <span>LEALTÀ</span><span className="text-brand-navy/35">•</span>
                <span>LEALTÀ</span><span className="text-brand-navy/35">•</span>
                <span>LEALTÀ</span><span className="text-brand-navy/35">•</span>
                <span>LEALTÀ</span><span className="text-brand-navy/35">•</span>
                <span>LEALTÀ</span><span className="text-brand-navy/35">•</span>
                <span>LEALTÀ</span>
              </div>
            </div>

            {/* Line 3: INCLUSIONE */}
            <div className="flex whitespace-nowrap overflow-hidden">
              <div 
                ref={marqueeLine3Ref} 
                className="flex gap-8 font-bebas text-5xl sm:text-7xl md:text-9xl italic uppercase tracking-wider text-brand-navy"
              >
                <span>INCLUSIONE</span><span className="text-brand-navy/35">•</span>
                <span>INCLUSIONE</span><span className="text-brand-navy/35">•</span>
                <span>INCLUSIONE</span><span className="text-brand-navy/35">•</span>
                <span>INCLUSIONE</span><span className="text-brand-navy/35">•</span>
                <span>INCLUSIONE</span><span className="text-brand-navy/35">•</span>
                <span>INCLUSIONE</span><span className="text-brand-navy/35">•</span>
                <span>INCLUSIONE</span>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* Interactive Photo Reveal Playground */}
      <section className="relative w-full h-[75vh] bg-[#1E2543] border-y border-white/5 flex flex-col justify-center items-center overflow-hidden select-none">
        
        {/* Background Watermark */}
        <h2 className="absolute pointer-events-none font-bebas text-8xl md:text-[12rem] text-white/[0.02] uppercase italic tracking-tighter text-center leading-none transform -skew-6">
          LA TRIBÙ IN AZIONE
        </h2>

        {/* Cursor Image Trail */}
        <ImageTrail
          threshold={80}
          intensity={0.65}
          baseZIndex={20}
          className="absolute inset-0 cursor-crosshair z-10"
        >
          {exampleImages.map((img, idx) => (
            <ImageTrailItem key={idx} className="w-52 h-36 md:w-60 md:h-44 rounded-lg overflow-hidden border-2 border-brand-blue/30 shadow-2xl p-1 bg-brand-navy">
              <img
                src={img.url}
                alt="One Tribe Action"
                className="w-full h-full object-cover rounded"
                draggable={false}
              />
            </ImageTrailItem>
          ))}
        </ImageTrail>

        {/* Overlay Banner */}
        <div className="z-20 pointer-events-none text-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <Activity className="w-8 h-8 text-brand-blue animate-pulse mb-3" />
            <p className="font-bebas text-3xl md:text-4xl text-white uppercase italic tracking-wider">
              Esplora con il mouse
            </p>
            <p className="font-montserrat text-xs text-brand-blue/70 uppercase tracking-widest mt-1">
              Muovi il cursore per scorrere i nostri scatti storici
            </p>
          </motion.div>
        </div>
      </section>

      {/* History Sections */}
      <section id="storia" className="relative py-28 px-4 md:px-8 bg-brand-navy bg-dots-pattern overflow-hidden border-y border-white/5">
        {/* Background watermark */}
        <div className="absolute top-10 left-10 font-bebas text-[20vw] text-outline-blue opacity-[0.03] tracking-tighter uppercase italic select-none pointer-events-none transform -skew-x-12">
          EST. 2009
        </div>
        <div className="absolute bottom-10 right-10 font-bebas text-[20vw] text-outline-red opacity-[0.03] tracking-tighter uppercase italic select-none pointer-events-none transform -skew-x-12">
          ULTIMATE
        </div>

        <div className="max-w-7xl mx-auto space-y-24 relative z-10">
          
          {/* History of One Tribe */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-bebas text-brand-red text-xl tracking-widest uppercase italic">Dal 2009 ad Oggi</span>
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
                Così nel luglio 2023 nasce la squadra One Tribe, che con i suoi oltre 200 atleti suddivisi tra squadre agonistiche e corsi di avviamento è la prima società in Italia e una delle maiores in Europa.
              </p>
            </div>
          </div>

          <hr className="border-white/5" />

          {/* History of the Disc */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-bebas text-brand-blue text-xl tracking-widest uppercase italic">Cenni sullo Sport</span>
              <h3 className="font-bebas text-5xl md:text-7xl uppercase italic tracking-tighter text-white transform -skew-x-12 leading-none mt-2">
                STORIA DEL<br/><span className="text-brand-red">DISCO</span>
              </h3>
              <div className="w-16 h-1 bg-brand-red mt-4 transform -skew-x-12" />
            </div>

            <div className="lg:col-span-7 space-y-6 text-muted-foreground font-sans text-base md:text-lg leading-relaxed">
              <p>
                Nato alla fine degli anni Sessanta negli Stati Uniti, l&apos;Ultimate Frisbee approda in Italia circa un decennio più tardi, prima a Milano, a Rimini e poi a Bologna. Nel 1979 viene fondata la Federazione Italiana Flying Disc e nel 2015 lo sport viene ufficialmente riconosciuto dal CIO (Comitato Olimpico Internazionale).
              </p>
              <p>
                Tuttavia è solo negli ultimi anni che l&apos;Ultimate si espande in tutta Italia: attualmente sono 35 le società associate alla Federazione e proprio a Bologna si trova la più alta concentrazione di giocatori di tutta Europa.
              </p>
              <p className="text-white font-medium">
                Un primato che è frutto di una stretta collaborazione tra le società che promuovono questo sport e gli Istituti Scolastici del territorio.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Chi Siamo - Bologna Capitale */}
      <section className="relative py-28 px-4 md:px-8 bg-[#1E2543] bg-grid-pattern border-y border-white/5 overflow-hidden">
        {/* Background outlined text */}
        <div className="absolute bottom-6 right-6 font-bebas text-[24vw] text-outline-blue opacity-[0.03] tracking-tighter uppercase italic select-none pointer-events-none transform -skew-x-12">
          BOLOGNA
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-xs font-semibold uppercase tracking-wider font-montserrat w-max mx-auto">
            <Trophy className="w-4.5 h-4.5" />
            Focus Sportivo
          </div>
          
          <h2 className="font-bebas text-5xl md:text-7xl uppercase italic tracking-tighter text-white transform -skew-x-12">
            CHI <span className="text-brand-blue">SIAMO</span>
          </h2>

          <div className="w-16 h-1.5 bg-brand-red mx-auto mt-4 transform -skew-x-12" />

          <div className="space-y-6 text-muted-foreground font-sans text-base md:text-lg leading-relaxed max-w-4xl mx-auto">
            <p>
              Chi dice Bologna dice tortellini, le due Torri, San Luca, ma anche Ultimate Frisbee. In pochi sanno che da alcuni anni <strong>Bologna è diventata la capitale europea dell&apos;Ultimate</strong>: sport di squadra giocato 7 contro 7 su campi in erba da 100m x 37m. L&apos;obiettivo del gioco è quello di prendere al volo il disco nell&apos;area di meta avversaria tramite passaggi tra compagni, senza però né camminare né correre con il disco in mano. Con l&apos;Ultimate non c&apos;è arbitro, le decisioni vengono prese in campo dai giocatori nel pieno rispetto del fair play. Da qui nasce uno sport dinamico, semplice e altamente spettacolare.
            </p>
            <p className="text-white font-medium">
              Proprio grazie al coinvolgimento che questo sport crea, la provincia di Bologna siede sul tetto d&apos;Europa sia per i risultati raggiunti sia per il numero di giocatori.
            </p>
          </div>

          {/* Quick Roster Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 text-center select-none">
            <div className="p-5 glass-card transition-expo hover:-translate-y-1 hover:scale-[1.03] hover:rotate-1 rounded-xl shadow-lg">
              <span className="font-bebas text-5xl md:text-6xl text-brand-blue italic block">200+</span>
              <span className="font-montserrat text-[10px] text-muted-foreground uppercase tracking-widest block mt-2">Atleti Associati</span>
            </div>
            <div className="p-5 glass-card transition-expo hover:-translate-y-1 hover:scale-[1.03] hover:-rotate-1 rounded-xl shadow-lg">
              <span className="font-bebas text-5xl md:text-6xl text-brand-red italic block">09</span>
              <span className="font-montserrat text-[10px] text-muted-foreground uppercase tracking-widest block mt-2">Settembre 2009</span>
            </div>
            <div className="p-5 glass-card transition-expo hover:-translate-y-1 hover:scale-[1.03] hover:rotate-1 rounded-xl shadow-lg">
              <span className="font-bebas text-5xl md:text-6xl text-brand-blue block">1ª</span>
              <span className="font-montserrat text-[10px] text-muted-foreground uppercase tracking-widest block mt-2">Società d&apos;Italia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Gallery Showcase */}
      <section className="relative w-full h-[95vh] bg-[#1E2543] border-y border-white/5 overflow-hidden flex flex-col justify-center items-center">
        
        {/* Gallery Titles overlay */}
        <div className="absolute z-10 text-center select-none pointer-events-none px-4">
          <h2 className="font-bebas text-6xl md:text-9xl uppercase italic tracking-tighter text-white/95 leading-none transform -skew-x-12">
            GALLERY <span className="text-brand-blue">ONETRIBE</span>
          </h2>
          <p className="font-montserrat text-xs text-brand-red uppercase tracking-widest mt-3">
            Momenti catturati all&apos;interno della nostra avventura
          </p>
        </div>

        {/* Parallax Floating Canvas */}
        <Floating sensitivity={-0.85} className="absolute inset-0 w-full h-full z-1 overflow-hidden">
          <FloatingElement depth={0.4} className="top-[15%] left-[8%]">
            <motion.img
              src={exampleImages[0].url}
              className="w-52 h-36 md:w-64 md:h-48 object-cover rounded-lg border border-white/10 hover:border-brand-blue hover:scale-105 duration-300 cursor-pointer shadow-2xl"
              whileHover={{ rotate: -2 }}
            />
          </FloatingElement>
          <FloatingElement depth={0.8} className="top-[8%] left-[40%]">
            <motion.img
              src={exampleImages[1].url}
              className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-lg border border-white/10 hover:border-brand-blue hover:scale-105 duration-300 cursor-pointer shadow-2xl"
              whileHover={{ rotate: 3 }}
            />
          </FloatingElement>
          <FloatingElement depth={0.6} className="top-[12%] right-[10%]">
            <motion.img
              src={exampleImages[2].url}
              className="w-48 h-36 md:w-72 md:h-48 object-cover rounded-lg border border-white/10 hover:border-brand-blue hover:scale-105 duration-300 cursor-pointer shadow-2xl"
              whileHover={{ rotate: -1 }}
            />
          </FloatingElement>
          <FloatingElement depth={1.2} className="bottom-[15%] left-[12%]">
            <motion.img
              src={exampleImages[4].url}
              className="w-44 h-48 md:w-56 md:h-72 object-cover rounded-lg border border-white/10 hover:border-brand-blue hover:scale-105 duration-300 cursor-pointer shadow-2xl"
              whileHover={{ rotate: 2 }}
            />
          </FloatingElement>
          <FloatingElement depth={0.7} className="bottom-[18%] right-[15%]">
            <motion.img
              src={exampleImages[5].url}
              className="w-56 h-40 md:w-80 md:h-56 object-cover rounded-lg border border-white/10 hover:border-brand-blue hover:scale-105 duration-300 cursor-pointer shadow-2xl"
              whileHover={{ rotate: -3 }}
            />
          </FloatingElement>
          <FloatingElement depth={0.5} className="bottom-[10%] left-[45%]">
            <motion.img
              src={exampleImages[6].url}
              className="w-48 h-32 md:w-64 md:h-44 object-cover rounded-lg border border-white/10 hover:border-brand-blue hover:scale-105 duration-300 cursor-pointer shadow-2xl"
              whileHover={{ rotate: 1 }}
            />
          </FloatingElement>
        </Floating>
      </section>

      {/* Sponsors Section */}
      <section id="sponsor" className="py-28 px-4 md:px-8 bg-brand-navy overflow-hidden select-none">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="font-bebas text-5xl md:text-7xl uppercase italic tracking-tighter text-white transform -skew-x-12">
              CONDIVIDONO I NOSTRI <span className="text-brand-red">VALORI</span>
            </h2>
            <div className="w-16 h-1 bg-brand-blue mx-auto mt-4 transform -skew-x-12" />
          </div>

          {/* Sponsors grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center">
            {sponsors.map((sponsor, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="group relative flex items-center justify-center p-6 bg-[#1E2543] border border-white/5 hover:border-brand-blue/30 rounded-lg w-full h-32 overflow-hidden duration-300"
              >
                <img
                  src={sponsor.url}
                  alt={sponsor.name}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 duration-300 opacity-60 group-hover:opacity-100"
                />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Safeguarding Section Link */}
      <section className="py-12 px-4 md:px-8 bg-brand-red border-y border-white/10 select-none">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-white animate-pulse" />
            <div>
              <h3 className="font-bebas text-2xl md:text-3xl text-white uppercase italic tracking-tight">SAFEGUARDING POLICY</h3>
              <p className="font-sans text-xs text-white/80 mt-0.5">Tutela dei minori e politiche di salvaguardia BUG ASD.</p>
            </div>
          </div>
          <button
            onClick={() => window.open("/safeguarding-policy", "_blank")}
            className="group px-6 py-3 border border-white text-white font-montserrat font-bold uppercase tracking-wider text-xs transform -skew-x-12 hover:bg-white hover:text-brand-red duration-300 cursor-pointer"
          >
            Visualizza Policy
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-navy border-t border-white/5 py-16 px-4 select-none">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Column 1: Info brand */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-4">
                <OneTribeLogo className="w-14 h-14" />
                <div>
                  <h4 className="font-bebas text-3xl text-white tracking-tighter uppercase italic leading-none">
                    ONE TRIBE
                  </h4>
                  <p className="font-sans text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                    Bologna Ultimate Frisbee
                  </p>
                </div>
              </div>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed max-w-sm">
                La prima società sportiva di Ultimate Frisbee in Italia per numero di tesserati. Valorizziamo lo sport come strumento di crescita, divertimento e fair play.
              </p>
            </div>

            {/* Column 2: Legal BUG ASD data */}
            <div className="md:col-span-4 space-y-3 font-sans text-xs text-muted-foreground">
              <h5 className="font-montserrat font-bold text-white uppercase tracking-wider text-xs">BUG ASD</h5>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-blue" />
                Via Rumpianesi n. 77 Anzola dell’Emilia (BO) 40011
              </p>
              <p className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-red" />
                CF / P.IVA 04140151202
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-blue" />
                PEC: <a href="mailto:bug.asd@pec.it" className="hover:text-white underline">bug.asd@pec.it</a>
              </p>
            </div>

            {/* Column 3: Links */}
            <div className="md:col-span-3 space-y-3 font-montserrat text-xs text-muted-foreground uppercase tracking-wider">
              <h5 className="font-montserrat font-bold text-white uppercase tracking-wider text-xs">Documenti</h5>
              <p><a href="/privacy-policy" target="_blank" className="hover:text-brand-blue duration-200">Privacy & Cookie Policy</a></p>
              <p><a href="/gestione-cookie" target="_blank" className="hover:text-brand-blue duration-200">Gestione Cookie</a></p>
              <p><a href="/summer-camp" className="hover:text-brand-blue duration-200">Summer Camp info</a></p>
            </div>

          </div>

          <hr className="border-white/5" />

          {/* Copyright & Disclaimer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left font-sans text-[10px] text-muted-foreground">
            <div>
              <p>Copyright &copy; {new Date().getFullYear()} BUG ASD. Tutti i diritti riservati.</p>
              <p className="mt-0.5">Associazione Sportiva Dilettantistica affiliata alla FIFD.</p>
            </div>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-brand-red fill-brand-red animate-pulse" />
              <span>& Spirit of the Game.</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  )
}
