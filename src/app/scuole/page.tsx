"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { 
  BookOpen, 
  Heart, 
  Users, 
  Calendar, 
  Send, 
  CheckCircle,
  GraduationCap,
  Award
} from "lucide-react"

import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01"
import OneTribeLogo from "@/app/svg/one-tribe-logo"

export default function Scuole() {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
    role: "docente",
    message: ""
  })

  const navLinks = [
    { href: "/squadre", label: "Squadre" },
    { href: "/scuole", label: "Scuole", active: true },
    { href: "/news", label: "News" },
    { href: "/contatti", label: "Contatti" },
    { href: "/soci", label: "Soci" },
    { href: "/summer-camp", label: "Summer Camp" },
  ]

  const collaboratingSchools = [
    "Liceo Scientifico A. B. Sabin (Bologna)",
    "Liceo Classico L. Galvani (Bologna)",
    "Istituto di Istruzione Superiore Belluzzi-Fioravanti (Bologna)",
    "Liceo Scientifico N. Copernico (Bologna)",
    "Scuola Media Statale Salvo D&apos;Acquisto (Bologna)",
    "Istituto Comprensivo di Casalecchio di Reno",
    "Istituto Comprensivo di Anzola dell&apos;Emilia",
    "Liceo Scientifico E. Fermi (Bologna)"
  ]

  const tournaments = [
    {
      title: "Torneo delle Scuole di Bologna - Ultimate Camp",
      date: "Maggio 2026",
      desc: "L'evento culmine dell'anno scolastico, in cui oltre 500 studenti delle scuole medie e superiori si sfidano sui campi del Centro Barca per aggiudicarsi il titolo cittadino e il prestigioso Premio Spirit of the Game."
    },
    {
      title: "Campionati Studenteschi Regionali",
      date: "Aprile 2026",
      desc: "Torneo ufficiale in collaborazione con l'Ufficio Scolastico Regionale, valido per la qualificazione alle fasi nazionali dei campionati studenteschi di Flying Disc."
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submit logic
    setFormSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-brand-navy bg-dots-pattern text-foreground font-sans overflow-x-hidden relative">
      {/* Background watermark */}
      <div className="absolute top-10 left-10 font-bebas text-[20vw] text-outline opacity-[0.02] tracking-tighter uppercase italic select-none pointer-events-none transform -skew-x-12">
        SCHOOLS
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
            <GraduationCap className="w-4 h-4" />
            Ultimate nelle Scuole
          </div>
          <h1 className="font-bebas text-6xl md:text-8xl text-white uppercase italic tracking-tighter transform -skew-x-12 leading-none">
            PROGETTO <span className="text-brand-red">SCUOLE</span>
          </h1>
          <p className="font-montserrat text-xs md:text-sm text-muted-foreground uppercase tracking-widest max-w-xl mx-auto">
            Promuoviamo l&apos;Ultimate Frisbee e i suoi valori educativi negli istituti scolastici di Bologna e provincia.
          </p>
          <div className="w-16 h-1 bg-brand-blue mx-auto mt-6 transform -skew-x-12" />
        </div>
      </section>

      {/* Intro Description & Mission */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Description */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-bebas text-4xl md:text-5xl text-white uppercase italic tracking-tight transform -skew-x-6">
            DI COSA SI TRATTA
          </h2>
          <div className="w-12 h-1 bg-brand-red transform -skew-x-12" />
          <div className="font-sans text-muted-foreground space-y-4 text-base leading-relaxed">
            <p>
              BUG ASD promuove attivamente la disciplina dell&apos;Ultimate Frisbee all&apos;interno delle scuole secondarie di primo e secondo grado del territorio bolognese. Attraverso moduli didattici tenuti dai nostri tecnici qualificati, offriamo agli studenti l&apos;opportunità di conoscere uno sport dinamico, divertente ed altamente educativo.
            </p>
            <p>
              I nostri laboratori scolastici si integrano con le ore di Scienze Motorie e prevedono lezioni pratiche incentrate sulle tecniche di lancio, sulle regole del gioco e sullo sviluppo delle capacità coordinative. Il nostro operato culmina ogni anno con l&apos;organizzazione di tornei interscolastici che vedono sfidarsi centinaia di studenti.
            </p>
            <p className="text-white font-medium">
              Attualmente collaboriamo con oltre 15 istituti scolastici a Bologna, Casalecchio di Reno e Anzola dell&apos;Emilia, coinvolgendo migliaia di ragazzi e ragazze.
            </p>
          </div>
        </div>

        {/* Right Column: Mission & Values */}
        <div className="lg:col-span-5 p-6 glass-card rounded-xl space-y-6 shadow-xl relative z-10">
          <h3 className="font-montserrat font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-blue" /> I Nostri Pilastri Educativi
          </h3>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-montserrat font-bold text-white text-xs uppercase tracking-wide">Spirit of the Game</h4>
                <p className="font-sans text-[11px] text-muted-foreground mt-1 leading-relaxed">
                  L&apos;Ultimate si basa sull&apos;assenza dell&apos;arbitro: i giocatori stessi risolvono le infrazioni in campo nel massimo fair play. Questo educa all&apos;onestà e all&apos;autoregolazione.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-montserrat font-bold text-white text-xs uppercase tracking-wide">Inclusione e Genere</h4>
                <p className="font-sans text-[11px] text-muted-foreground mt-1 leading-relaxed">
                  La formula mista (Co-Ed) e l&apos;assenza di contatto fisico riducono le barriere motorie e relazionali, permettendo a tutti i ragazzi e ragazze di competere su base paritaria.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-montserrat font-bold text-white text-xs uppercase tracking-wide">Risoluzione dei Conflitti</h4>
                <p className="font-sans text-[11px] text-muted-foreground mt-1 leading-relaxed">
                  Il processo di discussione e conciliazione diretta in campo stimola l&apos;autonomia comunicativa e la negoziazione pacifica dei conflitti.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Collaborating Schools & Tournaments */}
      <section className="relative py-20 bg-[#1E2543] bg-grid-pattern border-y border-white/5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
          
          {/* Schools list */}
          <div className="space-y-6">
            <h3 className="font-bebas text-3xl text-white uppercase italic tracking-tight flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-brand-blue" /> Scuole in Collaborazione
            </h3>
            <div className="w-12 h-1 bg-brand-blue transform -skew-x-12" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {collaboratingSchools.map((school, idx) => (
                <div key={idx} className="p-4 glass-card transition-expo hover:scale-[1.03] rounded-xl flex items-center gap-2.5 shadow-md">
                  <CheckCircle className="w-4 h-4 text-brand-blue shrink-0" />
                  <span className="font-montserrat text-xs text-white font-medium leading-tight">{school}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scheduled Tournaments */}
          <div className="space-y-6">
            <h3 className="font-bebas text-3xl text-white uppercase italic tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-red" /> Tornei Scolastici Previsti
            </h3>
            <div className="w-12 h-1 bg-brand-red transform -skew-x-12" />

            <div className="space-y-4">
              {tournaments.map((tournament, idx) => (
                <div key={idx} className="p-6 glass-card transition-expo hover:scale-[1.02] rounded-xl space-y-2 shadow-md">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <h4 className="font-montserrat font-bold text-white text-sm uppercase tracking-wide">
                      {tournament.title}
                    </h4>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-brand-red/10 border border-brand-red/30 text-brand-red text-[10px] font-bold uppercase tracking-wider font-montserrat">
                      <Calendar className="w-3.5 h-3.5" />
                      {tournament.date}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed pt-2 border-t border-white/5">
                    {tournament.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Contact Form for PE Teachers */}
      <section className="py-24 px-4 md:px-8 max-w-3xl mx-auto">
        <div className="space-y-8 glass-card rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center space-y-3">
            <h3 className="font-bebas text-4xl text-white uppercase italic">Attiva un Progetto nella tua Scuola</h3>
            <p className="font-montserrat text-xs text-brand-blue uppercase tracking-widest">
              Sei un docente o un dirigente scolastico? Compila il form per essere ricontattato.
            </p>
            <div className="w-12 h-1 bg-brand-red mx-auto mt-4 transform -skew-x-12" />
          </div>

          {formSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 bg-brand-navy border border-brand-blue/30 rounded-xl text-center space-y-4"
            >
              <CheckCircle className="w-12 h-12 text-brand-blue mx-auto animate-bounce" />
              <h4 className="font-bebas text-2xl text-white uppercase italic">Messaggio Inviato!</h4>
              <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                Grazie per averci contattato. La nostra segreteria didattica esaminerà la richiesta e ti ricontatterà via e-mail entro 48 ore lavorative.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 font-montserrat text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-muted-foreground uppercase tracking-wider font-bold block">Nome e Cognome</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Mario Rossi"
                    className="w-full px-4 py-3 bg-brand-navy border border-white/5 text-white focus:outline-none focus:border-brand-blue rounded-lg text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-muted-foreground uppercase tracking-wider font-bold block">E-mail di Contatto</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="mario.rossi@scuola.it"
                    className="w-full px-4 py-3 bg-brand-navy border border-white/5 text-white focus:outline-none focus:border-brand-blue rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-muted-foreground uppercase tracking-wider font-bold block">Istituto Scolastico</label>
                  <input
                    type="text"
                    required
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    placeholder="Liceo Sabin"
                    className="w-full px-4 py-3 bg-brand-navy border border-white/5 text-white focus:outline-none focus:border-brand-blue rounded-lg text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-muted-foreground uppercase tracking-wider font-bold block">Ruolo</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 bg-brand-navy border border-white/5 text-white focus:outline-none focus:border-brand-blue rounded-lg text-xs"
                  >
                    <option value="docente">Docente Scienze Motorie</option>
                    <option value="dirigente">Dirigente Scolastico</option>
                    <option value="genitore">Rappresentante Genitori / Studenti</option>
                    <option value="altro">Altro</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-muted-foreground uppercase tracking-wider font-bold block">Messaggio o Dettagli Richiesta</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Descrivi brevemente il progetto di cui necessiti o chiedi informazioni..."
                  className="w-full px-4 py-3 bg-brand-navy border border-white/5 text-white focus:outline-none focus:border-brand-blue rounded-lg text-xs resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-brand-red text-white font-bold uppercase tracking-wider text-xs transform -skew-x-6 hover:scale-[1.01] duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-red/20"
              >
                Invia Richiesta
                <Send className="w-4 h-4" />
              </button>

            </form>
          )}

        </div>
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
