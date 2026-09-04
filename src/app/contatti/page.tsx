"use client"

import React from "react"
import { motion } from "motion/react"
import { 
  Mail, 
  MapPin, 
  Clock, 
  User, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Users
} from "lucide-react"

import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01"
import { SiteFooter } from "@/components/site-footer"
import OneTribeLogo from "@/app/svg/one-tribe-logo"

export default function Contatti() {
  const navLinks = [
    { href: "/squadre", label: "Squadre" },
    { href: "/ultimate", label: "Ultimate" },
    { href: "/scuole", label: "Scuole" },
    { href: "/news", label: "News" },
    { href: "/contatti", label: "Contatti", active: true },
    { href: "/soci", label: "Soci" },
  ]

  const tesseramentoSteps = [
    {
      num: "01",
      title: "Modulo Tesseramento",
      desc: "Clicca sul link del portale Golee e inserisci i dati dell'atleta. Assicurati della correttezza del codice fiscale. Per più atleti in famiglia, ripeti la procedura."
    },
    {
      num: "02",
      title: "Consensi Privacy",
      desc: "Approva i consensi obbligatori per il trattamento dei dati personali e per la raccolta di immagini/video durante l'attività sportiva."
    },
    {
      num: "03",
      title: "Quota Associativa",
      desc: "Effettua il pagamento della quota associativa annuale o carica sul portale la ricevuta dell'avvenuto bonifico bancario."
    },
    {
      num: "04",
      title: "Assegnazione Gruppo",
      desc: "Una volta accettata la richiesta, l'atleta verrà assegnato al suo gruppo sportivo di riferimento e riceverà via mail il link per l'iscrizione specifica."
    },
    {
      num: "05",
      title: "Modulo Gruppo Sportivo",
      desc: "Clicca sul link ricevuto via mail e compila il modulo di iscrizione al gruppo sportivo con tutti i dati aggiuntivi richiesti."
    },
    {
      num: "06",
      title: "Certificato Medico",
      desc: "Carica sul portale il certificato medico di idoneità all'attività sportiva (agonistica o non agonistica a seconda del gruppo) in corso di validità."
    },
    {
      num: "07",
      title: "Quota Iscrizione",
      desc: "Effettua il pagamento della quota di iscrizione per il gruppo assegnato o fornisci la ricevuta dell'avvenuto bonifico."
    },
    {
      num: "08",
      title: "Attivazione App Golee",
      desc: "Riceverai via mail l'invito ad attivare il tuo account sull'applicazione gestionale Golee per monitorare allenamenti e comunicazioni."
    }
  ]

  const boardMembers = [
    { name: "Piero Pisano", role: "Presidente" },
    { name: "Sergio Albertazzi", role: "Vicepresidente" },
    { name: "Silvia Bargellini", role: "Tesoriere" },
    { name: "Matteo Sandri", role: "Consigliere" },
    { name: "Elena Rossi", role: "Consigliere" },
    { name: "Luca Bianchi", role: "Consigliere" },
    { name: "Chiara Neri", role: "Segretario Generale" }
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
    <div className="min-h-screen bg-brand-navy text-foreground font-sans overflow-x-hidden relative">
      <Navbar01 
        logo={<OneTribeLogo className="py-2 h-10 cursor-pointer" onClick={() => window.location.href = "/"} />}
        navigationLinks={navLinks}
        signInText="Accedi a Golee"
        ctaText="Entra nel club"
        onSignInClick={() => window.open("https://app.golee.it", "_blank")}
        onCtaClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />

      <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#18203A] bg-logo-pattern px-4 pb-20 pt-32 md:px-8 md:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_18%,rgba(162,41,59,0.16),transparent_48%),linear-gradient(180deg,rgba(17,23,44,0.12),rgba(17,23,44,0.72))] pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-3xl space-y-5">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex w-max items-center gap-2 rounded-sm border border-white/10 bg-white/[0.045] px-3 py-1 font-montserrat text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue"
          >
            <Mail className="w-4 h-4" />
            Contatti e tesseramento
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-bebas text-6xl md:text-8xl text-white uppercase italic tracking-tighter transform -skew-x-12 leading-none"
          >
            Info <span className="text-brand-red">iscrizioni</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="max-w-2xl font-sans text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Tutti i passaggi per associarti, i recapiti della segreteria e i riferimenti della società.
          </motion.p>
          </div>
        </div>
      </section>

      {/* Secretariat & Organigram Grid */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Left Column: Segreteria Info */}
          <motion.div variants={itemVariants} className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h2 className="font-bebas text-4xl md:text-5xl text-white uppercase italic tracking-tight transform -skew-x-6">
                INFO SEGRETERIA
              </h2>
              <div className="w-12 h-1 bg-brand-red transform -skew-x-12" />
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                La nostra segreteria didattica e amministrativa è a tua disposizione per supporto tecnico con il modulo Golee, tesseramenti, visite mediche e quote.
              </p>
            </div>

            <div className="p-6 glass-card rounded-xl space-y-6 transition-expo hover:scale-[1.01] shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-montserrat font-bold text-white text-xs uppercase tracking-wider block">Sede Legale BUG ASD</span>
                  <span className="font-sans text-xs text-muted-foreground block mt-1">Via Rumpianesi n. 77, Anzola dell&apos;Emilia (BO) 40011</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-montserrat font-bold text-white text-xs uppercase tracking-wider block">Contatti E-mail</span>
                  <span className="font-sans text-xs text-muted-foreground block mt-1">E-mail: <a href="mailto:info@onetribebologna.it" className="text-brand-blue underline hover:text-white duration-200">info@onetribebologna.it</a></span>
                  <span className="font-sans text-xs text-muted-foreground block mt-0.5">PEC: <a href="mailto:bug.asd@pec.it" className="text-brand-blue underline hover:text-white duration-200">bug.asd@pec.it</a></span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-montserrat font-bold text-white text-xs uppercase tracking-wider block">Orari di Apertura</span>
                  <span className="font-sans text-xs text-muted-foreground block mt-1">Lunedì e Mercoledì, dalle 17:00 alle 19:30.</span>
                  <span className="font-sans text-[10px] text-brand-red uppercase tracking-wider font-semibold block mt-1">*Risposte e-mail entro 48 ore.</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Organigramma */}
          <motion.div variants={itemVariants} className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h2 className="font-bebas text-4xl md:text-5xl text-white uppercase italic tracking-tight transform -skew-x-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-brand-blue" /> ORGANIGRAMMA
              </h2>
              <div className="w-12 h-1 bg-brand-blue transform -skew-x-12" />
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                Il consiglio direttivo e lo staff organizzativo di BUG ASD che coordina le attività sportive e didattiche di One Tribe.
              </p>
            </div>

            <div className="glass-card rounded-xl divide-y divide-white/5 overflow-hidden transition-expo hover:scale-[1.01] shadow-xl">
              {boardMembers.map((member, idx) => (
                <div key={idx} className="p-4 flex justify-between items-center text-xs hover:bg-white/2 duration-200">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-brand-blue shrink-0" />
                    <span className="font-montserrat font-bold text-white">{member.name}</span>
                  </div>
                  <span className="px-3 py-1 rounded bg-brand-navy/60 border border-white/5 text-slate-300 font-medium uppercase tracking-wider text-[10px]">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Steps of Tesseramento (Iscrizioni) */}
      <section className="relative py-20 bg-[#1E2543] bg-logo-pattern border-y border-white/5 px-4 md:px-8 overflow-hidden">
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(146,23,46,0.06),transparent_50%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto space-y-16 relative z-10">
          
          <div className="text-center space-y-3">
            <h3 className="font-bebas text-4xl md:text-5xl text-white uppercase italic transform -skew-x-12">
              PROCEDURA DI ISCRIZIONE & TESSERAMENTO
            </h3>
            <p className="font-montserrat text-xs text-brand-blue uppercase tracking-widest">
              Segui attentamente gli 8 passaggi richiesti sul portale Golee per completare la tua iscrizione.
            </p>
            <div className="w-16 h-1 bg-brand-red mx-auto mt-4 transform -skew-x-12" />
          </div>

          {/* Warning Banner */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-6 glass-card border-brand-red/30 hover:border-brand-red/50 rounded-xl flex items-start gap-4 max-w-4xl mx-auto transition-expo shadow-xl"
          >
            <AlertTriangle className="w-6 h-6 text-brand-red shrink-0 mt-0.5" />
            <div>
              <h4 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider">Attenzione per i Genitori</h4>
              <p className="font-sans text-xs text-slate-300 mt-1 leading-relaxed">
                Nel caso di genitore con più figli minori, occorrerà ripetere la procedura di accettazione dell&apos;invito sul gestionale per ogni atleta, assicurandosi di utilizzare lo stesso account Golee.
              </p>
            </div>
          </motion.div>

          {/* Steps Timeline Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none"
          >
            {tesseramentoSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="p-6 glass-card transition-expo hover:scale-[1.03] hover:-translate-y-1 rounded-xl flex flex-col justify-between shadow-lg"
              >
                <div>
                  <span className="font-bebas text-4xl text-brand-blue italic">{step.num}</span>
                  <h4 className="font-montserrat font-bold text-white text-sm uppercase tracking-wide mt-2">
                    {step.title}
                  </h4>
                  <p className="font-sans text-xs text-slate-300 mt-3 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-brand-blue/50">
                  <CheckCircle2 className="w-4 h-4 text-brand-blue" />
                  <span className="font-montserrat text-[9px] uppercase tracking-wider font-semibold">Richiesto</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call to action tesseramento */}
          <div className="text-center pt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.open("https://moduli.golee.it/bug-asd/tesseramento", "_blank")}
              className="group px-10 py-5 bg-brand-red text-white font-montserrat font-bold uppercase tracking-wider text-sm transform -skew-x-12 transition-expo duration-300 cursor-pointer shadow-xl shadow-brand-red/20 hover:shadow-brand-red/40"
            >
              <span className="flex items-center justify-center gap-2">
                Accedi al modulo di tesseramento
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 duration-200" />
              </span>
            </motion.button>
          </div>

        </div>
      </section>

      <SiteFooter />

    </div>
  )
}
