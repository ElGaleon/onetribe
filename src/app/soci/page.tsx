"use client"

import React from "react"
import { ArrowLeft, Disc3, Eye, Shirt, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Navbar01 } from "@/components/ui/shadcn-io/navbar-01"
import { SiteFooter } from "@/components/site-footer"
import OneTribeLogo from "@/app/svg/one-tribe-logo"

const memberProducts = [
  {
    name: "Divisa Home One Tribe",
    type: "Divisa",
    price: "Solo soci",
    image: "/images/onetribe-5.jpg",
    description: "Completo gara ufficiale One Tribe con maglia tecnica e pantaloncino coordinato.",
    details: ["Taglie adulto e junior", "Personalizzazione su richiesta", "Disponibilita riservata ai tesserati"],
  },
  {
    name: "Divisa Away One Tribe",
    type: "Divisa",
    price: "Solo soci",
    image: "/images/onetribe-6.jpg",
    description: "Seconda divisa per allenamenti, trasferte e tornei ufficiali della societa.",
    details: ["Tessuto leggero", "Colori sociali", "Acquisto tramite segreteria"],
  },
  {
    name: "Disco Gara One Tribe",
    type: "Disco",
    price: "Solo soci",
    image: "/images/onetribe-2.jpg",
    description: "Disco da Ultimate con grafica One Tribe, pensato per allenamento e partita.",
    details: ["Peso regolamentare", "Grip da gara", "Disponibile fino a esaurimento"],
  },
  {
    name: "Disco Spirit One Tribe",
    type: "Disco",
    price: "Solo soci",
    image: "/images/onetribe-3.jpg",
    description: "Edizione sociale dedicata allo Spirit of the Game e alla community bolognese.",
    details: ["Grafica celebrativa", "Ideale per corsi e scuole", "Riservato ai soci"],
  },
]

export default function SociPage() {
  const navLinks = [
    { href: "/squadre", label: "Squadre" },
    { href: "/ultimate", label: "Ultimate" },
    { href: "/scuole", label: "Scuole" },
    { href: "/news", label: "News" },
    { href: "/contatti", label: "Contatti" },
    { href: "/soci", label: "Soci", active: true },
  ]

  return (
    <div className="min-h-screen bg-brand-navy text-foreground font-sans overflow-x-hidden">
      <Navbar01
        logo={<OneTribeLogo className="py-2 h-10 cursor-pointer" />}
        navigationLinks={navLinks}
        signInText="Accedi a Golee"
        ctaText="Contatti"
        onSignInClick={() => window.open("https://app.golee.it", "_blank")}
        onCtaClick={() => window.location.href = "/contatti"}
      />

      <main>
        <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#18203A] bg-logo-pattern px-4 pb-20 pt-32 md:px-8 md:pt-36">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_18%,rgba(141,179,229,0.13),transparent_48%),linear-gradient(180deg,rgba(17,23,44,0.12),rgba(17,23,44,0.72))] pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-montserrat font-bold uppercase tracking-widest text-brand-blue hover:text-white duration-200 mb-10">
              <ArrowLeft className="w-4 h-4" />
              Torna alla home
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/[0.045] border border-white/10 text-brand-blue text-xs font-semibold uppercase tracking-[0.14em] font-montserrat mb-5">
                  <Users className="w-4 h-4 text-brand-red" />
                  Vendita riservata ai soci
                </div>
                <h1 className="font-bebas text-6xl md:text-8xl text-white uppercase italic tracking-tighter transform -skew-x-12 leading-none">
                  Divise <span className="text-brand-blue">e dischi</span>
                </h1>
              </div>
              <p className="lg:col-span-4 font-sans text-base text-muted-foreground leading-relaxed">
                Catalogo in sola visualizzazione dei materiali disponibili per i tesserati One Tribe. Per disponibilita, taglie e ritiro passa dalla segreteria o dai referenti di squadra.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 md:px-8 py-16 md:py-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {memberProducts.map((product) => {
              const Icon = product.type === "Disco" ? Disc3 : Shirt
              return (
                <article key={product.name} className="group bg-[#192039]/80 border border-white/[0.07] hover:border-brand-blue/35 overflow-hidden rounded-xl shadow-[0_24px_70px_rgba(8,12,28,0.22)] duration-300">
                  <div className="relative aspect-[4/5] overflow-hidden bg-brand-navy">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover group-hover:scale-[1.035] duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent opacity-[0.85]" />
                    <div className="absolute top-3 left-3 flex items-center gap-2 rounded-sm px-3 py-1 bg-brand-navy/80 border border-white/10 backdrop-blur-sm">
                      <Icon className="w-4 h-4 text-brand-blue" />
                      <span className="font-montserrat text-[10px] font-bold uppercase tracking-widest text-white">{product.type}</span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-flex items-center gap-2 rounded-sm px-3 py-1 bg-brand-red text-white font-montserrat text-[10px] font-semibold uppercase tracking-[0.14em]">
                        <Eye className="w-3.5 h-3.5" />
                        {product.price}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    <h2 className="font-montserrat text-lg font-semibold text-white leading-tight">
                      {product.name}
                    </h2>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      {product.details.map((detail) => (
                        <p key={detail} className="font-montserrat text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
