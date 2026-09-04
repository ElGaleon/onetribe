"use client"

import Link from "next/link"
import { FileText, Heart, Mail, MapPin } from "lucide-react"

import OneTribeLogo from "@/app/svg/one-tribe-logo"

export function SiteFooter() {
  return (
    <footer className="bg-brand-navy border-t border-white/5 py-16 px-4 select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center">
              <OneTribeLogo className="h-16 w-16" />
            </div>
          </div>

          <div className="md:col-span-4 space-y-3 font-sans text-xs text-muted-foreground">
            <h5 className="font-montserrat font-bold text-white uppercase tracking-wider text-xs">BUG ASD</h5>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-blue" />
              Via Rumpianesi n. 77 Anzola dell&apos;Emilia (BO) 40011
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

          <div className="md:col-span-3 space-y-3 font-montserrat text-xs text-muted-foreground uppercase tracking-wider">
            <h5 className="font-montserrat font-bold text-white uppercase tracking-wider text-xs">Documenti</h5>
            <p><Link href="/privacy-policy" className="hover:text-brand-blue duration-200">Privacy & Cookie Policy</Link></p>
            <p><Link href="/gestione-cookie" className="hover:text-brand-blue duration-200">Gestione Cookie</Link></p>
          </div>
        </div>

        <hr className="border-white/5" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left font-sans text-[10px] text-muted-foreground">
          <div>
            <p>Copyright &copy; {new Date().getFullYear()} BUG ASD. Tutti i diritti riservati.</p>
            <p className="mt-0.5">Associazione Sportiva Dilettantistica affiliata alla FIFD.</p>
          </div>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-brand-red fill-brand-red" />
            <span>& Spirit of the Game.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
