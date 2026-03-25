"use client"

import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Database,
  Eye,
  MousePointer,
  Shield,
  TrendingDown,
} from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export function Hero() {
  const { t } = useLanguage()
  const [activeStatusIndex, setActiveStatusIndex] = useState(0)
  const [closedLoopStep, setClosedLoopStep] = useState(0)
  const [efficiencyHours, setEfficiencyHours] = useState(3.5)
  const [processingSource, setProcessingSource] = useState(0)
  const [barHeights, setBarHeights] = useState([55, 68, 78, 65, 82, 90, 100])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStatusIndex((prev) => (prev + 1) % 4)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setClosedLoopStep((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingSource((prev) => (prev + 1) % 4)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setEfficiencyHours((prev) => {
        const variation = (Math.random() - 0.5) * 0.2
        return Math.max(3.2, Math.min(3.8, prev + variation))
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setBarHeights((prev) =>
        prev.map((height) => {
          const variation = (Math.random() - 0.5) * 8
          const nextHeight = height + variation
          return Math.max(50, Math.min(100, nextHeight))
        }),
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const statusItems = [
    {
      icon: AlertTriangle,
      label: "Venta baja critica - Sucursal Centro",
      severity: "critical",
      bgGradient: "from-red-500/20 to-red-600/10",
      borderColor: "border-red-500/40",
      iconBg: "bg-red-500/20",
      iconBorder: "border-red-400/40",
      textColor: "text-red-100",
      glowColor: "shadow-red-500/50",
    },
    {
      icon: TrendingDown,
      label: "Auditoria pendiente - Refrigeracion",
      severity: "warning",
      bgGradient: "from-orange-500/20 to-orange-600/10",
      borderColor: "border-orange-500/35",
      iconBg: "bg-orange-500/20",
      iconBorder: "border-orange-400/35",
      textColor: "text-orange-100",
      glowColor: "shadow-orange-500/45",
    },
    {
      icon: CheckCircle2,
      label: "Objetivo cumplido - Energia optimizada",
      severity: "success",
      bgGradient: "from-emerald-500/20 to-emerald-600/10",
      borderColor: "border-emerald-500/30",
      iconBg: "bg-emerald-500/20",
      iconBorder: "border-emerald-400/30",
      textColor: "text-emerald-100",
      glowColor: "shadow-emerald-500/40",
    },
    {
      icon: Shield,
      label: "Riesgos prevenidos - Sistema estable",
      severity: "info",
      bgGradient: "from-slate-700/40 to-slate-800/20",
      borderColor: "border-slate-600/30",
      iconBg: "bg-slate-700/50",
      iconBorder: "border-slate-600/30",
      textColor: "text-slate-200",
      glowColor: "shadow-slate-500/40",
    },
  ]

  const closedLoopSteps = [
    { icon: Eye, label: "Insight", sublabel: "Detecta problema" },
    { icon: MousePointer, label: "Accion", sublabel: "Genera tarea" },
    { icon: CheckCircle2, label: "Resolucion", sublabel: "Staff resuelve" },
    { icon: Database, label: "Memoria", sublabel: "Registra analisis" },
  ]

  const dataSources = ["Sidon", "Excel", "SAP", "Emails"]

  const floatingInsights = [
    { text: "Ahorro detectado +15%", delay: 0, duration: 4 },
    { text: "Eficiencia +22%", delay: 1.5, duration: 5 },
    { text: "0 incidentes criticos", delay: 3, duration: 4.5 },
  ]

  const heroProofItems = [
    "IoT + IA aplicada a retail",
    "Alertas con seguimiento operativo",
    "Implementacion guiada por expertos",
  ]

  const heroSignals = [
    { value: "127", label: "despliegues activos" },
    { value: "24/7", label: "soporte operativo" },
    { value: "3.5h", label: "tiempo recuperado diario" },
  ]

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-24 lg:pt-0">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-950/24 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-800/30 via-transparent to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(255 255 255) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(255 255 255) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-12 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 backdrop-blur-sm"
            >
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                {t("hero.badge")}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="space-y-5"
            >
              <h1 className="max-w-4xl text-5xl font-bold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
                <span className="block">{t("hero.title1")}</span>
                <span className="mt-2 block bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                  {t("hero.title2")}
                </span>
              </h1>

              <div className="flex flex-wrap gap-3 pt-2">
                {heroProofItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm font-medium text-white/72 backdrop-blur-xl"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="max-w-2xl text-lg leading-relaxed text-slate-300 lg:text-xl"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: "easeOut" }}
              className="grid gap-3 sm:grid-cols-3"
            >
              {heroSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-5 py-4 shadow-[0_18px_40px_rgba(2,6,23,0.18)] backdrop-blur-2xl"
                >
                  <p className="text-2xl font-bold tracking-tight text-white">{signal.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{signal.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-4 pt-4 sm:flex-row"
            >
              <a href="#contacto">
                <Button
                  size="lg"
                  className="group relative h-14 overflow-hidden rounded-xl bg-emerald-600 px-10 text-base font-semibold text-white shadow-xl shadow-emerald-900/50 transition-all duration-300 hover:scale-[1.02] hover:bg-emerald-500 hover:shadow-2xl hover:shadow-emerald-800/60"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative z-10 flex items-center gap-2">
                    {t("hero.cta.primary")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </a>

              <a href="#contacto">
                <Button
                  size="lg"
                  variant="ghost"
                  className="group h-14 rounded-xl border border-slate-700/50 px-8 text-base font-medium text-slate-300 hover:border-slate-600 hover:bg-slate-800/50 hover:text-white"
                >
                  {t("hero.cta.secondary")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="grid gap-4 border-t border-slate-800 pt-8 sm:grid-cols-[1.1fr_0.9fr]"
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                  {t("hero.trust.title")}
                </p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
                  SIDON conecta visibilidad, accion y seguimiento para que la operacion mejore incluso cuando el director no esta encima del proceso.
                </p>
              </div>

              <div className="rounded-[24px] border border-white/8 bg-white/4 p-5 backdrop-blur-xl">
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Prueba social</p>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-300">
                  {t("hero.social.proof")}
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="relative lg:col-span-5"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            <div className="relative">
              {floatingInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  className="absolute z-20 hidden rounded-full border border-emerald-500/30 bg-slate-900/80 px-4 py-2 shadow-lg shadow-emerald-900/20 backdrop-blur-xl xl:block"
                  style={{
                    top: index === 0 ? "10%" : index === 1 ? "45%" : "75%",
                    left: index === 0 ? "-15%" : index === 1 ? "105%" : "-10%",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: [0, 1, 1, 0], y: [20, 0, -10, -20] }}
                  transition={{
                    duration: insight.duration,
                    delay: insight.delay,
                    repeat: Infinity,
                    repeatDelay: 8,
                    ease: "easeInOut",
                  }}
                >
                  <p className="whitespace-nowrap text-xs font-semibold text-emerald-400">
                    {insight.text}
                  </p>
                </motion.div>
              ))}

              <a
                href="#duma-value"
                className="group relative block overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/40 shadow-2xl backdrop-blur-2xl transition-colors duration-300 hover:border-emerald-500/30"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/5 opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />

                <div className="relative border-b border-slate-700/50 bg-slate-800/40 px-6 py-4 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md" />
                        <div className="relative h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                      </div>
                      <div className="flex items-center gap-2.5">
                        <img
                          src="/LOGO DUMA(1).png"
                          alt="DUMA"
                          className="h-6 w-auto brightness-110 contrast-125"
                        />
                        <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-xl font-bold tracking-tight text-transparent">
                          Duma
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="hidden flex-col items-end sm:flex">
                        <div className="flex items-center gap-1.5 text-emerald-400">
                          <Clock className="h-3 w-3" />
                          <span className="text-sm font-bold tabular-nums">+{efficiencyHours.toFixed(1)}h</span>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-tighter text-slate-500">
                          Recuperadas hoy
                        </span>
                      </div>

                      <div className="relative flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/50 px-3 py-1.5">
                        <div className="relative h-1.5 w-1.5 rounded-full bg-emerald-400">
                          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400" />
                        </div>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={processingSource}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="min-w-[45px] text-[10px] font-bold uppercase tracking-widest text-slate-300"
                          >
                            {dataSources[processingSource]}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative space-y-3 p-6">
                  {statusItems.map((status, index) => {
                    const Icon = status.icon
                    const isActive = activeStatusIndex === index

                    return (
                      <motion.div
                        key={index}
                        className={`flex items-center gap-3 rounded-xl border bg-gradient-to-r p-4 transition-all duration-500 ${status.bgGradient} ${status.borderColor} ${isActive ? `scale-[1.02] shadow-xl ${status.glowColor}` : "opacity-60 shadow-md grayscale-[0.2]"}`}
                        animate={{ x: isActive ? 4 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className={`rounded-lg border p-2 shadow-inner ${status.iconBg} ${status.iconBorder}`}>
                          <Icon className={`h-4 w-4 ${status.textColor}`} strokeWidth={2.5} />
                        </div>
                        <div className="flex-1">
                          <p className={`text-[13px] font-bold leading-none tracking-tight ${status.textColor}`}>
                            {status.label}
                          </p>
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="mt-1 text-[10px] font-medium text-white/40"
                            >
                              Prioridad: {status.severity === "critical" ? "Maxima" : status.severity === "warning" ? "Alta" : "Estandar"}
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
                              <div className={`absolute h-4 w-4 animate-ping rounded-full opacity-20 ${status.iconBg}`} />
                              <div className={`h-2 w-2 rounded-full ${status.iconBg.replace("/20", "")}`} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  })}

                  <div className="mt-2 px-1 pt-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-1 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-bold uppercase leading-none tracking-widest text-slate-400">
                          Flujo Operativo (Closed Loop)
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {closedLoopSteps.map((step, idx) => {
                        const StepIcon = step.icon
                        const isCurrent = closedLoopStep === idx
                        const isPast = closedLoopStep > idx

                        return (
                          <div key={idx} className="relative flex flex-col items-center">
                            <motion.div
                              className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-500 ${isCurrent ? "border-emerald-500/50 bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]" : isPast ? "border-emerald-500/20 bg-slate-800/40" : "border-slate-700/30 bg-slate-900/40"}`}
                              animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                              transition={{ repeat: Infinity, duration: 2 }}
                            >
                              <StepIcon
                                className={`h-5 w-5 ${isCurrent ? "text-emerald-400" : isPast ? "text-emerald-400/50" : "text-slate-600"}`}
                              />
                            </motion.div>

                            {idx < 3 && (
                              <div className="absolute left-[calc(100%-8px)] top-5 z-0 h-[1px] w-[calc(100%-12px)]">
                                <div className={`h-full w-full ${isPast ? "bg-emerald-500/30" : "bg-slate-700/20"}`} />
                              </div>
                            )}

                            <span className={`mt-2 text-[9px] font-black uppercase tracking-tighter ${isCurrent ? "text-emerald-400" : "text-slate-500"}`}>
                              {step.label}
                            </span>

                            {isCurrent && (
                              <motion.span
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute -bottom-4 whitespace-nowrap text-center text-[7px] font-bold text-white/40"
                              >
                                {step.sublabel}
                              </motion.span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="mt-6 border-t border-slate-700/50 pt-8"
                  >
                    <div className="flex h-28 items-end justify-between gap-1.5 px-2">
                      {barHeights.map((height, index) => (
                        <motion.div
                          key={index}
                          className={`flex-1 rounded-t-md bg-gradient-to-t shadow-lg ${index === barHeights.length - 1 ? "border-t-2 border-emerald-400/50 from-emerald-500/60 to-emerald-400/30 shadow-emerald-800/40" : "from-emerald-500/40 to-emerald-400/20 shadow-emerald-900/20"}`}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ duration: 2, delay: index * 0.1, ease: "easeOut" }}
                        />
                      ))}
                    </div>
                    <p className="mt-4 text-center text-xs font-medium tracking-wide text-slate-500">
                      Eficiencia operativa - Ultimos 7 dias
                    </p>
                  </motion.div>
                </div>
              </a>

              <div className="absolute -inset-6 -z-10 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/5 opacity-40 blur-3xl" />
              <div className="absolute -right-12 top-1/4 -z-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
              <div className="absolute -left-12 bottom-1/4 -z-10 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
