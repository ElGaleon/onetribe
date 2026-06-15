"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { 
  Calendar, 
  User, 
  Plus, 
  X, 
  Send, 
  CheckCircle,
  FileText,
  Clock
} from "lucide-react"

import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01"
import OneTribeLogo from "@/app/svg/one-tribe-logo"
import { exampleImages } from "@/utils/demo-images"
import { defaultArticles, type Article } from "./articles-data"

export default function News() {
  const [articles, setArticles] = useState<Article[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "General",
    author: "Membro della Tribù",
    excerpt: "",
    content: "",
    imageIndex: "0",
    tagsInput: ""
  })
  
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)

  const navLinks = [
    { href: "/squadre", label: "Squadre" },
    { href: "/scuole", label: "Scuole" },
    { href: "/news", label: "News", active: true },
    { href: "/contatti", label: "Contatti" },
    { href: "/soci", label: "Soci" },
    { href: "/summer-camp", label: "Summer Camp" },
  ]

  // Safe localStorage loading in client-side useEffect
  useEffect(() => {
    const saved = localStorage.getItem("one_tribe_news")
    if (saved) {
      setArticles(JSON.parse(saved))
    } else {
      setArticles(defaultArticles)
      localStorage.setItem("one_tribe_news", JSON.stringify(defaultArticles))
    }
  }, [])

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault()
    
    const imagePreset = exampleImages[parseInt(formData.imageIndex) % exampleImages.length].url
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' }
    const todayStr = new Date().toLocaleDateString('it-IT', options)

    const tagsList = formData.tagsInput
      ? formData.tagsInput.split(",").map(t => t.trim()).filter(Boolean)
      : []

    const newArticle: Article = {
      id: `custom-${Math.random().toString(36).substring(7)}`,
      title: formData.title,
      date: todayStr,
      author: formData.author,
      category: formData.category,
      excerpt: formData.excerpt,
      content: formData.content,
      image: imagePreset,
      tags: tagsList
    }

    const updated = [newArticle, ...articles]
    setArticles(updated)
    localStorage.setItem("one_tribe_news", JSON.stringify(updated))
    setFormSubmitted(true)
    
    // Clear form
    setFormData({
      title: "",
      category: "General",
      author: "Membro della Tribù",
      excerpt: "",
      content: "",
      imageIndex: "0",
      tagsInput: ""
    })

    setTimeout(() => {
      setShowModal(false)
      setFormSubmitted(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-brand-navy text-foreground font-sans overflow-x-hidden">
      
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
      <section className="relative py-20 px-4 md:px-8 overflow-hidden bg-gradient-to-b from-[#1E2543] to-brand-navy">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(112,165,237,0.1),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue text-xs font-semibold uppercase tracking-wider font-montserrat w-max">
              <FileText className="w-4 h-4" />
              Notizie della Tribù
            </div>
            <h1 className="font-bebas text-6xl md:text-8xl text-white uppercase italic tracking-tighter transform -skew-x-12 leading-none">
              NEWS & <span className="text-brand-red">STORIE</span>
            </h1>
            <p className="font-montserrat text-xs md:text-sm text-muted-foreground uppercase tracking-widest max-w-xl">
              Rimani sempre aggiornato sugli ultimi campionati, lezioni didattiche, eventi sociali e tornei.
            </p>
            <div className="w-16 h-1 bg-brand-blue transform -skew-x-12 hidden md:block" />
          </div>

          {/* CTA Button to publish article */}
          <button
            onClick={() => setShowModal(true)}
            className="group px-6 py-4 bg-brand-red hover:bg-brand-red/90 text-white font-montserrat font-bold uppercase tracking-wider text-xs transform -skew-x-12 duration-300 flex items-center gap-2 cursor-pointer shadow-lg shadow-brand-red/25 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Pubblica un Articolo
          </button>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto bg-dots-pattern rounded-3xl my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art) => (
            <Link
              key={art.id}
              href={`/news/${art.id}`}
              className="group glass-card transition-expo hover:scale-[1.02] rounded-xl overflow-hidden flex flex-col justify-between cursor-pointer shadow-md hover:shadow-xl"
            >
              <div>
                {/* Image block */}
                <div className="relative h-48 overflow-hidden bg-brand-navy p-1">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 duration-300"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-brand-red/90 text-[9px] font-bold uppercase tracking-wider font-montserrat text-white shadow-md">
                    {art.category}
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-sans uppercase">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {art.date}</span>
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {art.author.split(" ")[0]}</span>
                  </div>
                  <h3 className="font-montserrat font-bold text-white text-sm leading-snug group-hover:text-brand-blue duration-200">
                    {art.title}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    {art.excerpt}
                  </p>

                  {/* Tags block */}
                  {art.tags && art.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {art.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded bg-brand-navy border border-brand-blue/20 text-[9px] text-brand-blue font-semibold uppercase tracking-wider">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom footer bar */}
              <div className="px-6 py-4 bg-brand-navy/30 border-t border-white/5 flex items-center gap-1 text-[10px] text-brand-blue uppercase tracking-wider font-montserrat font-semibold group-hover:text-brand-red duration-200">
                <span>Leggi di più</span>
                <Clock className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Publish Article Modal Form */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-brand-navy/95 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -15 }}
              className="bg-[#1E2543] border border-white/10 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl space-y-6 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-brand-navy border border-white/5 text-muted-foreground hover:text-white cursor-pointer hover:border-brand-red duration-200"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center space-y-2">
                <h3 className="font-bebas text-3xl text-white uppercase italic">Pubblica un Articolo</h3>
                <p className="font-montserrat text-[10px] text-brand-blue uppercase tracking-widest">
                  Compila i campi sottostanti per mostrare la notizia sulla bacheca.
                </p>
                <div className="w-12 h-1 bg-brand-red mx-auto mt-3 transform -skew-x-12" />
              </div>

              {formSubmitted ? (
                <div className="p-8 bg-brand-navy border border-brand-blue/30 rounded-xl text-center space-y-4">
                  <CheckCircle className="w-12 h-12 text-brand-blue mx-auto animate-bounce" />
                  <h4 className="font-bebas text-2xl text-white uppercase italic">Articolo Pubblicato!</h4>
                  <p className="font-sans text-xs text-muted-foreground">
                    La notizia è stata salvata con successo ed è ora consultabile nella bacheca di One Tribe.
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePublish} className="space-y-4 font-montserrat text-xs">
                  
                  <div className="space-y-1">
                    <label className="text-muted-foreground uppercase tracking-wider font-bold block">Titolo Notizia</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="es. Riaprono i corsi di Ultimate Frisbee..."
                      className="w-full px-4 py-3 bg-brand-navy border border-white/5 text-white focus:outline-none focus:border-brand-blue rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-muted-foreground uppercase tracking-wider font-bold block">Autore</label>
                      <input
                        type="text"
                        required
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        placeholder="es. Redazione BUG ASD"
                        className="w-full px-4 py-3 bg-brand-navy border border-white/5 text-white focus:outline-none focus:border-brand-blue rounded-lg text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-muted-foreground uppercase tracking-wider font-bold block">Categoria</label>
                      <input
                        type="text"
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="es. Mixed Division, Scuole..."
                        className="w-full px-4 py-3 bg-brand-navy border border-white/5 text-white focus:outline-none focus:border-brand-blue rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-muted-foreground uppercase tracking-wider font-bold block">Sfondo Immagine Copertina</label>
                    <select
                      value={formData.imageIndex}
                      onChange={(e) => setFormData({ ...formData, imageIndex: e.target.value })}
                      className="w-full px-4 py-3 bg-brand-navy border border-white/5 text-white focus:outline-none focus:border-brand-blue rounded-lg text-xs"
                    >
                      <option value="0">Preset Squadra Mixed (Foto 1)</option>
                      <option value="1">Preset Squadra Open (Foto 2)</option>
                      <option value="2">Preset Squadra Women (Foto 3)</option>
                      <option value="4">Preset Squadra Junior (Foto 4)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-muted-foreground uppercase tracking-wider font-bold block">Breve Sommario (Anteprima)</label>
                    <input
                      type="text"
                      required
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Sommario di una riga che appare nella bacheca..."
                      className="w-full px-4 py-3 bg-brand-navy border border-white/5 text-white focus:outline-none focus:border-brand-blue rounded-lg text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-muted-foreground uppercase tracking-wider font-bold block">Tag (separati da virgola)</label>
                    <input
                      type="text"
                      value={formData.tagsInput}
                      onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })}
                      placeholder="es. Scudetto, Mixed, Bologna, Campionato"
                      className="w-full px-4 py-3 bg-brand-navy border border-white/5 text-white focus:outline-none focus:border-brand-blue rounded-lg text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-muted-foreground uppercase tracking-wider font-bold block">Testo Articolo</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Scrivi qui il contenuto completo dell'articolo..."
                      className="w-full px-4 py-3 bg-brand-navy border border-white/5 text-white focus:outline-none focus:border-brand-blue rounded-lg text-xs resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-red text-white font-bold uppercase tracking-wider text-xs transform -skew-x-6 hover:scale-[1.01] duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-red/20"
                  >
                    Pubblica Notizia
                    <Send className="w-4 h-4" />
                  </button>

                </form>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
