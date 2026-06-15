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
  Tag as TagIcon,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01"
import OneTribeLogo from "@/app/svg/one-tribe-logo"
import { FacebookIcon, WhatsappIcon, XIcon } from "@/components/ui/social-icons"
import { defaultArticles, type Article } from "../articles-data"

export default function BlogPostDetail() {
  const params = useParams()
  const id = params?.id as string

  const [articles, setArticles] = useState<Article[]>([])
  const [article, setArticle] = useState<Article | null>(null)
  const [copied, setCopied] = useState<boolean>(false)
  const [shareUrl, setShareUrl] = useState<string>("")

  const navLinks = [
    { href: "/squadre", label: "Squadre" },
    { href: "/scuole", label: "Scuole" },
    { href: "/news", label: "News", active: true },
    { href: "/contatti", label: "Contatti" },
    { href: "/soci", label: "Soci" },
    { href: "/summer-camp", label: "Summer Camp" },
  ]

  // Safe client-side localstorage loading
  useEffect(() => {
    const saved = localStorage.getItem("one_tribe_news")
    let currentArticles = defaultArticles
    if (saved) {
      currentArticles = JSON.parse(saved)
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
      <div className="min-h-screen bg-brand-navy text-foreground font-sans flex flex-col justify-between">
        <Navbar01 
          logo={<OneTribeLogo className="py-2 h-10 cursor-pointer" onClick={() => window.location.href = "/"} />}
          navigationLinks={navLinks}
          signInText="Accedi a Golee"
          ctaText="Entra in ONE TRIBE"
          onSignInClick={() => window.open("https://app.golee.it", "_blank")}
          onCtaClick={() => window.location.href = "/contatti"}
          className="sticky top-0 z-[100] bg-brand-navy/90 backdrop-blur-md border-b border-white/5"
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
        <footer className="bg-[#1E2543] border-t border-white/5 py-12 px-4 select-none">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div>
              <h4 className="font-bebas text-2xl text-white tracking-tighter uppercase italic leading-none">ONE TRIBE</h4>
              <p className="font-sans text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                Bologna Ultimate Frisbee · BUG ASD
              </p>
            </div>
            <div className="font-sans text-[10px] text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} BUG ASD. Tutti i diritti riservati.</p>
            </div>
          </div>
        </footer>
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
    <div className="min-h-screen bg-brand-navy bg-dots-pattern text-foreground font-sans overflow-x-hidden relative">
      {/* Background watermark */}
      <div className="absolute top-20 right-10 font-bebas text-[22vw] text-outline opacity-[0.02] tracking-tighter uppercase italic select-none pointer-events-none transform -skew-x-12">
        READ
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

      {/* Header Back CTA */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-10 pb-4 relative z-10">
        <Link 
          href="/news"
          className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-wider font-bold text-brand-blue hover:text-brand-red transition-expo duration-200"
        >
          <ArrowLeft className="w-4 h-4" /> Torna alla bacheca
        </Link>
      </div>

      {/* Article Detail Canvas */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 pb-24 space-y-10 relative z-10">
        
        {/* Cover Photo */}
        <div className="relative h-64 md:h-120 w-full overflow-hidden rounded-2xl border border-white/5 bg-[#1E2543] p-1.5 shadow-2xl">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(min-width: 768px) 56rem, 100vw"
            className="object-cover rounded-xl"
          />
          <div className="absolute top-6 left-6 px-3 py-1.5 rounded bg-brand-red/90 text-xs font-bold uppercase tracking-wider font-montserrat text-white shadow-lg">
            {article.category}
          </div>
        </div>

        {/* Title, Meta, and Tags */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground uppercase font-sans">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-blue" /> {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-brand-blue" /> Scritto da: {article.author}
            </span>
          </div>

          <h1 className="font-bebas text-5xl md:text-7xl text-white uppercase italic tracking-tighter transform -skew-x-12 leading-tight">
            {article.title}
          </h1>

          {/* Tags Pills Section */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="flex items-center text-[10px] text-muted-foreground font-semibold uppercase tracking-wider font-montserrat mr-1.5">
                <TagIcon className="w-3.5 h-3.5 mr-1 text-brand-blue" /> Tag:
              </div>
              {article.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 rounded bg-brand-blue/10 border border-brand-blue/30 text-[10px] text-brand-blue font-bold uppercase tracking-wider hover:bg-brand-blue/20 duration-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <hr className="border-white/5" />
        </div>

        {/* Article Content - High Contrast Legible Layout */}
        <article className="font-sans text-slate-100 text-sm md:text-base leading-relaxed space-y-6 max-w-none">
          <p className="font-montserrat font-bold text-white text-base md:text-lg italic border-l-4 border-brand-blue pl-4 py-1 leading-snug">
            {article.excerpt}
          </p>
          <div className="whitespace-pre-wrap">
            {article.content}
          </div>
        </article>

        <hr className="border-white/5" />

        {/* Sharing Widget & Actions Panel */}
        <div className="p-6 glass-card rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6">
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
              <span className="font-montserrat text-[10px] text-brand-blue font-bold uppercase tracking-wider self-center ml-1 animate-pulse">
                Link Copiato!
              </span>
            )}
          </div>
        </div>

        {/* Prev / Next Article Suggestions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
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
