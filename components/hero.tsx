"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Wifi, Camera, Shield, Users, Building2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { PremiumDashboard } from "@/components/premium-dashboard"
import { motion } from "framer-motion"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden bg-slate-50">
      {/* Tech Grid Pattern Background - Left Side Only */}
      <div className="absolute inset-0 lg:inset-y-0 lg:left-0 lg:right-1/2">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(16 185 129) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(16 185 129) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        {/* Subtle emerald gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">
        {/* 50/50 Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - 50% */}
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-emerald-600">{t("hero.badge")}</span>
            </div>

            {/* Variable Typography with CULTURA emphasis */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight text-balance">
              <span className="block text-slate-900 font-normal">
                {t("hero.title1").split("cultura")[0]}
              </span>
              <span className="block text-slate-900">
                <span className="font-black text-emerald-600 tracking-tight">
                  {t("hero.title1").includes("cultura") ? "CULTURA" : t("hero.title1").includes("culture") ? "CULTURE" : ""}
                </span>
                <span className="font-normal">
                  {t("hero.title1").split("cultura")[1] || t("hero.title1").split("culture")[1] || ""}
                </span>
              </span>
              <span className="block text-emerald-600 font-bold mt-2">
                {t("hero.title2")}
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl">
              {t("hero.description")}
            </p>

            {/* CTA Buttons with Pulsing Glow */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="relative bg-emerald-500 hover:bg-emerald-600 text-white gap-2 h-12 px-8 rounded-xl font-semibold transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                {/* Pulsing Glow Effect */}
                <span className="absolute inset-0 bg-emerald-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 animate-pulse" />
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

                <span className="relative z-10">{t("hero.cta.demo")}</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="gap-2 h-12 px-8 rounded-xl border-slate-300 hover:bg-slate-100 bg-white font-semibold transition-all duration-300"
              >
                <Play className="w-4 h-4" />
                {t("hero.cta.video")}
              </Button>
            </div>

            {/* Trust Bar - Human Metrics */}
            <div className="pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-500 mb-4 font-medium">{t("hero.trust.title")}</p>

              {/* Two Rows: Tech + Human */}
              <div className="space-y-4">
                {/* Tech Badges */}
                <div className="flex items-center gap-6 text-slate-600">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-medium">{t("hero.trust.iso")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-medium">{t("hero.trust.iot")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-medium">{t("hero.trust.ai")}</span>
                  </div>
                </div>

                {/* Human Impact Metrics */}
                <div className="flex items-center gap-6 text-slate-700">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-semibold">
                      {t("hero.trust.branches")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-emerald-600" />
                    <span className="text-sm font-semibold">
                      {t("hero.trust.users")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - 50% Floating Dashboard */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Floating Animation with Framer Motion */}
            <motion.div
              className="relative w-full"
              initial={{ y: 0 }}
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Glow Effect Behind Dashboard */}
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full scale-110 opacity-50" />

              {/* Dashboard Component */}
              <div className="relative">
                <PremiumDashboard />
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-1/4 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 bottom-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      {/* Custom Pulse Animation for Glow */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse {
            0%, 100% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.6;
            }
          }
        `
      }} />
    </section>
  )
}
