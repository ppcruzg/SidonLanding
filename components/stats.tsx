"use client"

import { useEffect, useRef, useState } from "react"
import { Activity, ArrowUpRight, CalendarCheck, ShieldCheck, TrendingUp, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/lib/language-context"

function Sparkline({ data, color, delay = 0 }: { data: number[]; color: string; delay?: number }) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 110
  const height = 42
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return `${x},${y}`
    })
    .join(" ")

  const areaPoints = `0,${height} ${points} ${width},${height}`
  const endY = height - ((data[data.length - 1] - min) / range) * height

  return (
    <div className="relative overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-12 w-full overflow-visible">
        <defs>
          <linearGradient id={`sparkGradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.32" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          fill={`url(#sparkGradient-${color})`}
          points={areaPoints}
          className={`transition-all duration-1000 ${animate ? "opacity-100" : "opacity-0"}`}
        />
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          className={`transition-all duration-1000 ${animate ? "opacity-100" : "opacity-0"}`}
          style={{
            strokeDasharray: animate ? "none" : "500",
            strokeDashoffset: animate ? 0 : 500,
          }}
        />
        {animate && (
          <>
            <circle cx={width} cy={endY} r="3" fill={color} className="animate-pulse" />
            <circle cx={width} cy={endY} r="7" fill={color} opacity="0.16">
              <animate attributeName="r" values="6;9;6" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.16;0.04;0.16" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </>
        )}
      </svg>
    </div>
  )
}

function AnimatedCounter({
  value,
  prefix,
  suffix,
  className,
}: {
  value: number
  prefix: string
  suffix: string
  className?: string
}) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 1600
          const steps = 60
          const increment = value / steps
          let current = 0

          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.45 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <div ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </div>
  )
}

export function Stats() {
  const { t, language } = useLanguage()

  const proofTitle = language === "es" ? "Panel de impacto real" : "Real impact board"
  const proofCopy =
    language === "es"
      ? "Visibilidad ejecutiva sobre ahorro, productividad y continuidad operativa en una sola capa."
      : "Executive visibility into savings, productivity, and operational continuity in one layer."
  const deploymentCopy =
    language === "es" ? "despliegues activos con trazabilidad en vivo" : "active deployments with live traceability"
  const proofPills =
    language === "es"
      ? ["Retail multisede", "IoT + auditorias", "Soporte 24/7"]
      : ["Multi-site retail", "IoT + audits", "24/7 support"]

  const proofRows = [
    {
      label: language === "es" ? "Sucursales con visibilidad diaria" : "Branches with daily visibility",
      value: "127",
    },
    {
      label: language === "es" ? "Rutinas auditadas cada semana" : "Routines audited each week",
      value: "3.2k",
    },
    {
      label: language === "es" ? "Cobertura tecnica garantizada" : "Guaranteed technical coverage",
      value: "99.9%",
    },
  ]

  const stats = [
    {
      icon: Zap,
      value: 18,
      suffix: "%",
      prefix: "10-",
      label: t("stats.energy.label"),
      description: t("stats.energy.description"),
      sparkData: [45, 52, 48, 61, 55, 67, 72, 68, 75, 82, 78, 85],
      trend: "-15%",
      eyebrow: language === "es" ? "Costo controlado" : "Cost under control",
      detail:
        language === "es"
          ? "Menos consumo en A/C e iluminacion gracias a monitoreo continuo y decisiones operativas mas rapidas."
          : "Lower A/C and lighting consumption through continuous monitoring and faster operating decisions.",
      tone: "text-emerald-300",
      border: "border-emerald-400/18",
      glow: "from-emerald-500/18 via-emerald-500/4 to-transparent",
      surface: "bg-[linear-gradient(180deg,rgba(6,20,18,0.92),rgba(5,16,14,0.82))]",
      chip: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
    },
    {
      icon: TrendingUp,
      value: 30,
      suffix: "%",
      prefix: "20-",
      label: t("stats.productivity.label"),
      description: t("stats.productivity.description"),
      sparkData: [30, 35, 42, 38, 52, 48, 55, 62, 58, 68, 75, 82],
      trend: "+28%",
      eyebrow: language === "es" ? "Operacion mas enfocada" : "Sharper execution",
      detail:
        language === "es"
          ? "Mas tiempo resolviendo desvíos y menos tiempo persiguiendo tareas sin evidencia ni seguimiento."
          : "More time solving deviations and less time chasing tasks without evidence or follow-through.",
      tone: "text-white",
      border: "border-white/16",
      glow: "from-emerald-400/22 via-cyan-300/8 to-transparent",
      surface: "bg-[linear-gradient(145deg,rgba(9,28,26,0.96),rgba(8,14,22,0.90))]",
      chip: "bg-white text-slate-950 border-white/30",
      featured: true,
    },
    {
      icon: CalendarCheck,
      value: 365,
      suffix: "",
      prefix: "",
      label: t("stats.operation.label"),
      description: t("stats.operation.description"),
      sparkData: [95, 97, 96, 98, 97, 99, 98, 99, 99, 100, 99, 100],
      trend: "99.9%",
      eyebrow: language === "es" ? "Continuidad operativa" : "Operational continuity",
      detail:
        language === "es"
          ? "Disponibilidad sostenida por soporte tecnico, mantenimiento y visibilidad operativa permanente."
          : "Availability sustained by support, maintenance, and permanent operational visibility.",
      tone: "text-slate-200",
      border: "border-white/12",
      glow: "from-slate-300/16 via-white/4 to-transparent",
      surface: "bg-[linear-gradient(180deg,rgba(11,18,32,0.92),rgba(8,13,24,0.84))]",
      chip: "bg-slate-200/10 text-slate-200 border-slate-200/16",
    },
  ]

  return (
    <section id="roi" className="relative overflow-hidden py-14 lg:py-18">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#06110f_0%,#08131f_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(16,185,129,0.16),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(255,255,255,0.06),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.12),transparent_30%)]" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "68px 68px",
          maskImage: "linear-gradient(180deg, transparent, black 10%, black 90%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="lg:sticky lg:top-24"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/16 bg-emerald-400/8 px-4 py-2">
              <Activity className="h-4 w-4 text-emerald-300" />
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
                Real-time Analytics
              </span>
            </div>

            <h2 className="mt-5 max-w-xl text-4xl font-bold leading-[0.96] tracking-tight text-white sm:text-5xl lg:text-[3.35rem]">
              {t("stats.title1")}
              <span className="block bg-[linear-gradient(135deg,#d1fae5_0%,#34d399_45%,#10b981_100%)] bg-clip-text text-transparent">
                {t("stats.title2")}
              </span>
            </h2>

            <p className="mt-4 max-w-md text-[15px] leading-7 text-slate-300 sm:text-base">
              {t("stats.subtitle")}
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {proofPills.map((pill) => (
                <div
                  key={pill}
                  className="rounded-full border border-white/10 bg-white/6 px-3.5 py-2 text-xs font-medium text-white/72"
                >
                  {pill}
                </div>
              ))}
            </div>

            <div className="mt-7 overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 shadow-[0_24px_60px_rgba(2,6,23,0.26)] backdrop-blur-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
                    {proofTitle}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{proofCopy}</p>
                </div>
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-emerald-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {proofRows.map((row, index) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-3 border-b border-white/10 pb-3 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/6 text-[11px] font-semibold text-white/50">
                        0{index + 1}
                      </span>
                      <span className="text-sm text-slate-300">{row.label}</span>
                    </div>
                    <span className="font-mono text-lg font-bold text-white">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon

              return (
                <motion.article
                  key={stat.label}
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
                  whileHover={{ y: -4 }}
                  className={`group relative overflow-hidden rounded-[30px] border p-5 shadow-[0_24px_70px_rgba(2,6,23,0.28)] backdrop-blur-2xl transition-shadow duration-500 hover:shadow-[0_30px_80px_rgba(2,6,23,0.32)] ${stat.border} ${stat.surface}`}
                >
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${stat.glow}`} />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/16" />
                  <div className="pointer-events-none absolute -right-8 top-0 h-32 w-32 rounded-full bg-white/8 blur-3xl transition-transform duration-500 group-hover:-translate-x-4 group-hover:translate-y-2" />

                  <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_196px] lg:items-stretch">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${stat.chip}`}>
                          {stat.eyebrow}
                        </div>
                        <div className={`flex h-12 w-12 items-center justify-center rounded-[18px] border border-white/12 bg-white/6 ${stat.tone}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="mt-6 flex items-end justify-between gap-4">
                        <AnimatedCounter
                          value={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                          className={`font-mono text-5xl font-bold tracking-[-0.05em] sm:text-[3.4rem] ${stat.tone}`}
                        />
                        <div className={`inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 text-xs font-semibold ${stat.tone}`}>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                          {stat.trend}
                        </div>
                      </div>

                      <h3 className="mt-3 text-[1.65rem] font-semibold tracking-tight text-white">{stat.label}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">{stat.description}</p>
                      <p className="mt-3 max-w-xl border-l-2 border-emerald-400/30 pl-4 text-sm leading-6 text-slate-400">
                        {stat.detail}
                      </p>
                    </div>

                    <div className="flex h-full flex-col rounded-[24px] border border-white/10 bg-black/16 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/44">
                        {language === "es" ? "Tendencia operativa" : "Operational trend"}
                      </p>
                      <div className="mt-4 flex-1">
                        <Sparkline data={stat.sparkData} color="#34d399" delay={index * 140} />
                      </div>
                      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                        <span className="text-xs text-white/42">
                          {language === "es" ? "Ultimos 90 dias" : "Last 90 days"}
                        </span>
                        <span className="text-xs font-medium text-emerald-300">
                          {language === "es" ? "Validado en campo" : "Field validated"}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              <div className="flex flex-col gap-3 rounded-[26px] border border-emerald-400/16 bg-[linear-gradient(135deg,rgba(5,78,59,0.55),rgba(15,23,42,0.72))] px-5 py-4 shadow-[0_22px_60px_rgba(2,6,23,0.26)] lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-300" />
                  </span>
                  <p className="text-sm text-white/78 sm:text-base">
                    <span className="font-semibold text-white">127</span> {deploymentCopy}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    language === "es" ? "Retail" : "Retail",
                    language === "es" ? "Plantas" : "Plants",
                    language === "es" ? "Cadenas multisede" : "Multi-site chains",
                  ].map((pill) => (
                    <span
                      key={pill}
                      className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-xs font-medium text-white/72"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
