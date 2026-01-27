"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import Features from "@/components/features"
import ROISection from "@/components/roi-section"
import CSQCommitmentSection from "@/components/csq-commitment-section"
import MantizTimeline from "@/components/mantiz-timeline"
import { Comparison } from "@/components/comparison"
import { Support } from "@/components/support"
import { CSQCommitment } from "@/components/csq-commitment"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/lib/language-context"

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <Header />
        <Hero />
        <Stats />
        <Features />
        <ROISection />
        <CSQCommitmentSection />
        <MantizTimeline />
        <Comparison />
        <Support />
        <CSQCommitment />
        <CTA />
        <Footer />
      </main>
    </LanguageProvider>
  )
}
