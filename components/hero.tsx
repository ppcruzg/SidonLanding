"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, CheckCircle2, Zap, Shield, Activity, AlertTriangle, TrendingDown, Clock, Database, Eye, MousePointer } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function Hero() {
  const { t } = useLanguage()
  const [activeStatusIndex, setActiveStatusIndex] = useState(0)
  const [closedLoopStep, setClosedLoopStep] = useState(0) // 0: Insight, 1: Acción, 2: Resolución, 3: Memoria
  const [efficiencyHours, setEfficiencyHours] = useState(3.5)
  const [processingSource, setProcessingSource] = useState(0) // Rotating data sources

  // Rotate active status every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStatusIndex((prev) => (prev + 1) % 4)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Closed Loop Animation - Cycles every 12 seconds (3s per step)
  useEffect(() => {
    const interval = setInterval(() => {
      setClosedLoopStep((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Rotate processing sources
  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingSource((prev) => (prev + 1) % 4)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  // Efficiency counter fluctuation (simulates real-time calculation)
  useEffect(() => {
    const interval = setInterval(() => {
      setEfficiencyHours(prev => {
        const variation = (Math.random() - 0.5) * 0.2
        return Math.max(3.2, Math.min(3.8, prev + variation))
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // DUMA Alert System - Jerarquización (Crítico, Advertencia, Éxito, Info)
  const statusItems = [
    {
      icon: AlertTriangle,
      label: "Venta baja crítica - Sucursal Centro",
      severity: "critical",
      color: "red",
      bgGradient: "from-red-500/20 to-red-600/10",
      borderColor: "border-red-500/40",
      iconBg: "bg-red-500/20",
      iconBorder: "border-red-400/40",
      textColor: "text-red-100",
      glowColor: "shadow-red-500/50"
    },
    {
      icon: TrendingDown,
      label: "Auditoría pendiente - Refrigeración",
      severity: "warning",
      color: "orange",
      bgGradient: "from-orange-500/20 to-orange-600/10",
      borderColor: "border-orange-500/35",
      iconBg: "bg-orange-500/20",
      iconBorder: "border-orange-400/35",
      textColor: "text-orange-100",
      glowColor: "shadow-orange-500/45"
    },
    {
      icon: CheckCircle2,
      label: "Objetivo cumplido - Energía optimizada",
      severity: "success",
      color: "emerald",
      bgGradient: "from-emerald-500/20 to-emerald-600/10",
      borderColor: "border-emerald-500/30",
      iconBg: "bg-emerald-500/20",
      iconBorder: "border-emerald-400/30",
      textColor: "text-emerald-100",
      glowColor: "shadow-emerald-500/40"
    },
    {
      icon: Shield,
      label: "Riesgos prevenidos - Sistema estable",
      severity: "info",
      color: "slate",
      bgGradient: "from-slate-700/40 to-slate-800/20",
      borderColor: "border-slate-600/30",
      iconBg: "bg-slate-700/50",
      iconBorder: "border-slate-600/30",
      textColor: "text-slate-200",
      glowColor: "shadow-slate-500/40"
    }
  ]

  // Closed Loop Steps
  const closedLoopSteps = [
    { icon: Eye, label: "Insight", sublabel: "Detecta problema", color: "text-blue-400" },
    { icon: MousePointer, label: "Acción", sublabel: "Genera tarea", color: "text-emerald-400" },
    { icon: CheckCircle2, label: "Resolución", sublabel: "Staff resuelve", color: "text-green-400" },
    { icon: Database, label: "Memoria", sublabel: "Registra análisis", color: "text-purple-400" }
  ]

  // Data sources being processed
  const dataSources = ["Sidón", "Excel", "SAP", "Emails"]

  // Floating insights data
  const floatingInsights = [
    { text: "Ahorro detectado +15%", delay: 0, duration: 4 },
    { text: "Eficiencia +22%", delay: 1.5, duration: 5 },
    { text: "0 incidentes críticos", delay: 3, duration: 4.5 }
  ]

  // Bar chart data with fluctuation
  const [barHeights, setBarHeights] = useState([55, 68, 78, 65, 82, 90, 100])

  useEffect(() => {
    const interval = setInterval(() => {
      setBarHeights(prev => prev.map(h => {
        const variation = (Math.random() - 0.5) * 8
        const newHeight = h + variation
        return Math.max(50, Math.min(100, newHeight))
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-24 lg:pt-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-950/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-800/30 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(255 255 255) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(255 255 255) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24 w-full">
        {/* Asymmetric Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Content - 7 columns (60%) */}
          <div className="lg:col-span-7 space-y-12">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-emerald-400 tracking-wider uppercase">
                {t("hero.badge")}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="space-y-4"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
                {t("hero.title1")}
              </h1>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 leading-[1.05] tracking-tight">
                {t("hero.title2")}
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-2xl font-light"
            >
              {t("hero.description")}
            </motion.p>



            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <a href="#contacto">
                <Button
                  size="lg"
                  className="relative bg-emerald-600 hover:bg-emerald-500 text-white h-14 px-10 rounded-xl font-semibold text-base transition-all duration-300 shadow-xl shadow-emerald-900/50 hover:shadow-2xl hover:shadow-emerald-800/60 hover:scale-[1.02] group overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2">
                    {t("hero.cta.primary")}
                  </span>
                </Button>
              </a>

              <a href="#contacto">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-slate-300 hover:text-white hover:bg-slate-800/50 h-14 px-8 rounded-xl font-medium text-base group border border-slate-700/50 hover:border-slate-600"
                >
                  {t("hero.cta.secondary")}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </motion.div>

            {/* Micro-copy de confianza */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="pt-8 border-t border-slate-800"
            >
              <p className="text-xs text-slate-500 leading-relaxed tracking-wide">
                {t("hero.trust.title")}
              </p>
            </motion.div>

            {/* Prueba social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <p className="text-sm font-semibold text-slate-400">
                {t("hero.social.proof")}
              </p>
            </motion.div>
          </div>

          {/* Right Content - 5 columns (40%) - LIVE DASHBOARD */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Floating Insights */}
              {floatingInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  className="absolute z-20 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-xl border border-emerald-500/30 shadow-lg shadow-emerald-900/20"
                  style={{
                    top: index === 0 ? '10%' : index === 1 ? '45%' : '75%',
                    left: index === 0 ? '-15%' : index === 1 ? '105%' : '-10%',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    y: [20, 0, -10, -20]
                  }}
                  transition={{
                    duration: insight.duration,
                    delay: insight.delay,
                    repeat: Infinity,
                    repeatDelay: 8,
                    ease: "easeInOut"
                  }}
                >
                  <p className="text-xs font-semibold text-emerald-400 whitespace-nowrap">
                    {insight.text}
                  </p>
                </motion.div>
              ))}

              {/* Main Dashboard Card - Glassmorphism - Clickable */}
              <a href="#duma-value" className="block relative bg-slate-900/40 backdrop-blur-2xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden cursor-pointer hover:border-emerald-500/30 transition-colors duration-300 group">

                {/* Ambient glow */}
                <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/5 blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Header */}
                <div className="relative px-6 py-4 border-b border-slate-700/50 bg-slate-800/40 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full" />
                        <div className="relative w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <div className="flex items-center gap-2.5">
                        <img
                          src="/LOGO DUMA(1).png"
                          alt="DUMA"
                          className="h-6 w-auto brightness-110 contrast-125"
                        />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
                          Duma
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Efficiency Widget */}
                      <div className="hidden sm:flex flex-col items-end">
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <Clock className="w-3 h-3" />
                          <span className="text-sm font-bold tabular-nums">+{efficiencyHours.toFixed(1)}h</span>
                        </div>
                        <span className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter">Recuperadas hoy</span>
                      </div>

                      {/* Live Source Indicator */}
                      <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
                        <div className="relative w-1.5 h-1.5 rounded-full bg-emerald-400">
                          <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
                        </div>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={processingSource}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-[10px] font-bold text-slate-300 uppercase tracking-widest min-w-[45px]"
                          >
                            {dataSources[processingSource]}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DUMA Operational Intelligence - Status Cards */}
                <div className="relative p-6 space-y-3">
                  {statusItems.map((status, index) => {
                    const Icon = status.icon
                    const isActive = activeStatusIndex === index

                    return (
                      <motion.div
                        key={index}
                        className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${status.bgGradient} border ${status.borderColor} transition-all duration-500 ${isActive ? `shadow-xl ${status.glowColor} scale-[1.02]` : 'opacity-60 shadow-md grayscale-[0.2]'
                          }`}
                        animate={{
                          x: isActive ? 4 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={`p-2 rounded-lg ${status.iconBg} border ${status.iconBorder} shadow-inner`}>
                          <Icon className={`w-4 h-4 ${status.textColor}`} strokeWidth={2.5} />
                        </div>
                        <div className="flex-1">
                          <p className={`text-[13px] font-bold ${status.textColor} tracking-tight leading-none`}>
                            {status.label}
                          </p>
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-[10px] text-white/40 mt-1 font-medium"
                            >
                              Prioridad: {status.severity === 'critical' ? 'Máxima' : status.severity === 'warning' ? 'Alta' : 'Estándar'}
                            </motion.p>
                          )}
                        </div>
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="relative flex items-center justify-center"
                            >
                              <div className={`absolute w-4 h-4 rounded-full ${status.iconBg} animate-ping opacity-20`} />
                              <div className={`w-2 h-2 rounded-full ${status.iconBg.replace('/20', '')}`} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  })}

                  {/* DUMA CLI / Closed Loop Process */}
                  <div className="pt-4 mt-2 px-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-3 bg-emerald-500 rounded-full" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Flujo Operativo (Closed Loop)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {closedLoopSteps.map((step, idx) => {
                        const StepIcon = step.icon;
                        const isCurrent = closedLoopStep === idx;
                        const isPast = closedLoopStep > idx;

                        return (
                          <div key={idx} className="relative flex flex-col items-center">
                            <motion.div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-500 ${isCurrent
                                ? 'bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                                : isPast
                                  ? 'bg-slate-800/40 border-emerald-500/20'
                                  : 'bg-slate-900/40 border-slate-700/30'
                                }`}
                              animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                              transition={{ repeat: Infinity, duration: 2 }}
                            >
                              <StepIcon className={`w-5 h-5 ${isCurrent ? 'text-emerald-400' : isPast ? 'text-emerald-400/50' : 'text-slate-600'}`} />
                            </motion.div>

                            {/* Connector Line */}
                            {idx < 3 && (
                              <div className="absolute top-5 left-[calc(100%-8px)] w-[calc(100%-12px)] h-[1px] z-0">
                                <div className={`w-full h-full transition-colors duration-500 ${isPast ? 'bg-emerald-500/30' : 'bg-slate-700/20'}`} />
                              </div>
                            )}

                            <span className={`text-[9px] font-black uppercase tracking-tighter mt-2 ${isCurrent ? 'text-emerald-400' : 'text-slate-500'}`}>
                              {step.label}
                            </span>

                            {isCurrent && (
                              <motion.span
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute -bottom-4 text-[7px] text-white/40 font-bold whitespace-nowrap text-center"
                              >
                                {step.sublabel}
                              </motion.span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Efficiency / Performance Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="pt-8 mt-6 border-t border-slate-700/50"
                  >
                    <div className="flex items-end justify-between h-28 gap-1.5 px-2">
                      {barHeights.map((height, index) => (
                        <motion.div
                          key={index}
                          className={`flex-1 bg-gradient-to-t rounded-t-md shadow-lg ${index === barHeights.length - 1
                            ? 'from-emerald-500/60 to-emerald-400/30 shadow-emerald-800/40 border-t-2 border-emerald-400/50'
                            : 'from-emerald-500/40 to-emerald-400/20 shadow-emerald-900/20'
                            }`}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{
                            duration: 2,
                            delay: index * 0.1,
                            ease: "easeOut"
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 text-center mt-4 font-medium tracking-wide">
                      Eficiencia operativa · Últimos 7 días
                    </p>
                  </motion.div>
                </div>
              </a>

              {/* Decorative depth elements */}
              <div className="absolute -inset-6 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/5 blur-3xl -z-10 opacity-40" />
              <div className="absolute top-1/4 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-1/4 -left-12 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div >
    </section >
  )
}
