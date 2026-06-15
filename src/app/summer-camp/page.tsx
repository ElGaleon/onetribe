"use client"

import React from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { 
  MapPin, 
  Clock, 
  Utensils, 
  Info, 
  ArrowRight,
  Sun,
  Flame
} from "lucide-react"

import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01"
import OneTribeLogo from "@/app/svg/one-tribe-logo"

export default function SummerCamp() {
  const navLinks = [
    { href: "/squadre", label: "Squadre" },
    { href: "/scuole", label: "Scuole" },
    { href: "/news", label: "News" },
    { href: "/contatti", label: "Contatti" },
    { href: "/soci", label: "Soci" },
    { href: "/summer-camp", label: "Summer Camp", active: true },
  ]

  const weeks = [
    { dates: "08 Giugno - 12 Giugno 2026", status: "Iscrizioni Aperte" },
    { dates: "15 Giugno - 19 Giugno 2026", status: "Iscrizioni Aperte" },
    { dates: "22 Giugno - 26 Giugno 2026", status: "Iscrizioni Aperte" },
    { dates: "29 Giugno - 03 Luglio 2026", status: "Ultime Disponibilità" }
  ]

  const features = [
    {
      icon: <Flame className="w-5 h-5 text-brand-red" />,
      title: "Ultimate Frisbee & Multisport",
      desc: "Allenamenti giornalieri di Ultimate Frisbee condotti dai campioni di One Tribe, alternati a basket, volley, calcio e giochi d&apos;acqua."
    },
    {
      icon: <Utensils className="w-5 h-5 text-brand-blue" />,
      title: "Pranzo e Merenda Inclusi",
      desc: "Pranzi sani e nutrienti cucinati in loco e due merende giornaliere per mantenere l&apos;energia alta durante tutte le attività."
    },
    {
      icon: <Sun className="w-5 h-5 text-brand-red" />,
      title: "Attività all&apos;Aperto",
      desc: "Immersi nel verde del Centro Sportivo Barca, alternando sport sui campi in erba a laboratori ludici e attività all&apos;ombra."
    }
  ]

  // Framer Motion animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15
      }
    }
  }

  return (
    <div className="min-h-screen bg-brand-navy bg-dots-pattern text-foreground font-sans overflow-x-hidden relative">
      {/* Background watermark */}
      <div className="absolute top-10 left-10 font-bebas text-[20vw] text-outline opacity-[0.02] tracking-tighter uppercase italic select-none pointer-events-none transform -skew-x-12">
        CAMP
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
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-xs font-semibold uppercase tracking-wider font-montserrat w-max mx-auto"
          >
            <Sun className="w-4 h-4 text-amber-400 animate-spin" />
            Camp Estivo 2026
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-bebas text-6xl md:text-8xl text-white uppercase italic tracking-tighter transform -skew-x-12 leading-none"
          >
            SUMMER <span className="text-brand-red">CAMP</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="font-montserrat text-xs md:text-sm text-muted-foreground uppercase tracking-widest max-w-xl mx-auto"
          >
            Vivi un&apos;estate all&apos;insegna dello sport, dell&apos;amicizia e dei valori dello Spirit of the Game al Centro Barca.
          </motion.p>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-1 bg-brand-blue mx-auto mt-6 transform -skew-x-12" 
          />
        </div>
      </section>

      {/* Intro Description & Features */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left: Text Info */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
            <h2 className="font-bebas text-4xl md:text-5xl text-white uppercase italic tracking-tight transform -skew-x-6">
              L&apos;ESTATE CON ONE TRIBE
            </h2>
            <div className="w-12 h-1 bg-brand-red transform -skew-x-12" />
            <div className="font-sans text-muted-foreground space-y-4 text-base leading-relaxed">
              <p>
                Il Summer Camp di One Tribe è l&apos;esperienza estiva ideale per ragazzi e ragazze dagli 8 ai 16 anni. Cinque giorni alla settimana all&apos;insegna dell&apos;attività fisica, del divertimento e della socialità, immersi nel polmone verde del Centro Sportivo Barca di Bologna.
              </p>
              <p>
                I partecipanti avranno l&apos;opportunità unica di imparare e praticare l&apos;Ultimate Frisbee insieme ai nostri campioni e allenatori delle nazionali italiane, alternando l&apos;attività principale con tornei di pallavolo, basket, calcio, e rigeneranti giochi d&apos;acqua.
              </p>
              <p className="text-white font-medium">
                Al centro di ogni nostra giornata poniamo il rispetto reciproco, la cooperazione e lo Spirit of the Game, garantendo un ambiente sicuro, sano e altamente stimolante per tutti.
              </p>
            </div>
          </motion.div>

          {/* Right: Feature Blocks */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-4">
            {features.map((feat, idx) => (
              <div key={idx} className="p-6 glass-card rounded-xl flex gap-4 transition-expo hover:scale-[1.02] shadow-md">
                <div className="w-10 h-10 rounded-full bg-brand-navy border border-white/5 flex items-center justify-center shrink-0">
                  {feat.icon}
                </div>
                <div>
                  <h4 className="font-montserrat font-bold text-white text-xs uppercase tracking-wide">
                    {feat.title}
                  </h4>
                  <p className="font-sans text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Info Box Cards (Logistics) */}
      <section className="relative py-16 bg-[#1E2543] bg-grid-pattern border-y border-white/5 px-4 md:px-8 overflow-hidden">
        {/* Glow accent */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(112,165,237,0.06),transparent_50%)] pointer-events-none" />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left relative z-10"
        >
          <motion.div variants={itemVariants} className="p-6 glass-card rounded-xl space-y-3 transition-expo hover:scale-[1.03] hover:-translate-y-1 shadow-lg">
            <MapPin className="w-8 h-8 text-brand-red mx-auto md:mx-0" />
            <h4 className="font-montserrat font-bold text-white text-sm uppercase tracking-wide">Dove</h4>
            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              Centro Sportivo Barca, Via Raffaello Sanzio, Bologna. Ampi spazi verdi, campi regolamentari e zone d&apos;ombra attrezzate.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="p-6 glass-card rounded-xl space-y-3 transition-expo hover:scale-[1.03] hover:-translate-y-1 shadow-lg">
            <Clock className="w-8 h-8 text-brand-blue mx-auto md:mx-0" />
            <h4 className="font-montserrat font-bold text-white text-sm uppercase tracking-wide">Orari e Giorni</h4>
            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              Dal Lunedì al Venerdì, dalle 8:30 alle 17:00. <br />
              Servizio di accoglienza anticipata a partire dalle 8:00.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="p-6 glass-card rounded-xl space-y-3 transition-expo hover:scale-[1.03] hover:-translate-y-1 shadow-lg">
            <Info className="w-8 h-8 text-white mx-auto md:mx-0" />
            <h4 className="font-montserrat font-bold text-white text-sm uppercase tracking-wide">Prezzi e Sconti</h4>
            <p className="font-sans text-xs text-slate-300 leading-relaxed">
              Quota settimanale: 140€ (tutto incluso). <br />
              Sconto fratelli/sorelle: 10% sulla seconda quota. Sconto plurisettimanale disponibile.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Roster Weeks Grid & Sign-up CTA */}
      <section className="py-24 px-4 md:px-8 max-w-5xl mx-auto space-y-16">
        
        {/* Weeks status */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="font-bebas text-4xl text-white uppercase italic">Settimane Disponibili - Giugno/Luglio 2026</h3>
            <div className="w-12 h-1 bg-brand-blue mx-auto mt-4 transform -skew-x-12" />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {weeks.map((week, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="p-6 glass-card rounded-xl flex justify-between items-center transition-expo hover:scale-[1.02] shadow-md"
              >
                <div className="space-y-1">
                  <span className="font-montserrat text-[10px] text-brand-blue uppercase tracking-widest block font-bold">Settimana {idx+1}</span>
                  <span className="font-montserrat font-bold text-white text-xs block">{week.dates}</span>
                </div>
                <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider font-montserrat border ${
                  week.status.includes("Aperte") 
                    ? "bg-brand-blue/10 border-brand-blue/30 text-brand-blue"
                    : "bg-brand-red/10 border-brand-red/30 text-brand-red"
                }`}>
                  {week.status}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Final call to action card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 glass-card border-brand-blue/30 hover:border-brand-blue/50 rounded-2xl flex flex-col md:flex-row gap-8 items-center justify-between transition-expo shadow-2xl"
        >
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-bebas text-4xl text-white uppercase italic">Riserva un Posto per il tuo Campione</h3>
            <p className="font-sans text-xs text-slate-300 max-w-md">
              Le iscrizioni si effettuano sul modulo Golee o contattando direttamente la nostra segreteria didattica.
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open("https://moduli.golee.it/bug-asd/tesseramento", "_blank")}
            className="group px-8 py-4 bg-brand-red text-white font-montserrat font-bold uppercase tracking-wider text-xs transform -skew-x-12 transition-expo duration-300 flex items-center gap-2 cursor-pointer shadow-lg shadow-brand-red/25"
          >
            Iscriviti al Camp
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 duration-200" />
          </motion.button>
        </motion.div>

      </section>

      {/* Footer */}
      <footer className="bg-[#1E2543] border-t border-white/5 py-12 px-4 select-none">
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
