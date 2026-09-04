"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  Calendar, 
  User, 
  FileText,
  Clock
} from "lucide-react"

import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01"
import { SiteFooter } from "@/components/site-footer"
import OneTribeLogo from "@/app/svg/one-tribe-logo"
import { defaultArticles, mergeStoredArticles, type Article } from "./articles-data"

export default function News() {
  const [articles, setArticles] = useState<Article[]>([])

  const navLinks = [
    { href: "/squadre", label: "Squadre" },
    { href: "/ultimate", label: "Ultimate" },
    { href: "/scuole", label: "Scuole" },
    { href: "/news", label: "News", active: true },
    { href: "/contatti", label: "Contatti" },
    { href: "/soci", label: "Soci" },
  ]

  // Safe localStorage loading in client-side useEffect
  useEffect(() => {
    const saved = localStorage.getItem("one_tribe_news")
    if (saved) {
      const mergedArticles = mergeStoredArticles(JSON.parse(saved))
      setArticles(mergedArticles)
      localStorage.setItem("one_tribe_news", JSON.stringify(mergedArticles))
    } else {
      setArticles(defaultArticles)
      localStorage.setItem("one_tribe_news", JSON.stringify(defaultArticles))
    }
  }, [])

  return (
    <div className="min-h-screen bg-brand-navy text-foreground font-sans overflow-x-hidden">
      
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
          <div className="max-w-3xl space-y-4">
            <div className="flex w-max items-center gap-2 rounded-sm border border-white/10 bg-white/[0.045] px-3 py-1 font-montserrat text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
              <FileText className="w-4 h-4" />
              Notizie della tribù
            </div>
            <h1 className="font-bebas text-6xl md:text-8xl text-white uppercase italic tracking-tighter transform -skew-x-12 leading-none">
              News <span className="text-brand-red">e storie</span>
            </h1>
            <p className="max-w-2xl font-sans text-base leading-relaxed text-muted-foreground md:text-lg">
              Campionati, attività didattiche, eventi sociali e tornei raccontati con il ritmo del campo.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((art) => (
            <Link
              key={art.id}
              href={`/news/${art.id}`}
              className="group bg-[#192039]/80 border border-white/[0.07] transition-expo hover:-translate-y-1 hover:border-brand-blue/30 rounded-xl overflow-hidden flex flex-col justify-between cursor-pointer shadow-[0_24px_70px_rgba(8,12,28,0.20)]"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-brand-navy">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover group-hover:scale-[1.035] duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11172C]/45 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-sm bg-brand-red/90 text-[9px] font-semibold uppercase tracking-[0.12em] font-montserrat text-white shadow-md">
                    {art.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-sans uppercase">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {art.date}</span>
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {art.author.split(" ")[0]}</span>
                  </div>
                  <h3 className="font-montserrat font-semibold text-white text-base leading-snug text-pretty group-hover:text-brand-blue duration-200">
                    {art.title}
                  </h3>
                  <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                    {art.excerpt}
                  </p>

                  {/* Tags block */}
                  {art.tags && art.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {art.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded-sm bg-brand-navy border border-brand-blue/20 text-[9px] text-brand-blue font-semibold uppercase tracking-[0.1em]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 py-4 bg-brand-navy/30 border-t border-white/5 flex items-center gap-1 text-[10px] text-brand-blue uppercase tracking-wider font-montserrat font-semibold group-hover:text-brand-red duration-200">
                <span>Leggi di più</span>
                <Clock className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter />

    </div>
  )
}
