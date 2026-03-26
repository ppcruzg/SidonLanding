"use client"

import { useEffect, useRef, useState } from "react"
import { AlertTriangle, ArrowUpRight, Check, ShieldCheck, TrendingDown, TrendingUp, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className,
}: {
  value: number
  suffix?: string
  prefix?: string
  className?: string
}) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 1400
          const steps = 50
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
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 100
  const height = 34

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return `${x},${y}`
    })
    .join(" ")

  const areaPoints = `0,${height} ${points} ${width},${height}`

  return (
    <svg className="h-10 w-full overflow-visible" viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={`comparison-${color.replace("#", "")}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#comparison-${color.replace("#", "")})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Comparison() {
  const { t, language } = useLanguage()

  const proofTitle = language === "es" ? "Transformacion operativa" : "Operational transformation"
  const proofCopy =
    language === "es"
      ? "Compara el costo de operar reaccionando tarde contra un modelo preventivo respaldado por datos, auditorias y automatizacion."
      : "Compare the cost of reacting late versus a preventive model backed by data, audits, and automation."
  const proofPills =
    language === "es"
      ? ["Auditorias automatizadas", "Mantenimiento preventivo", "Operacion trazable"]
      : ["Automated audits", "Preventive maintenance", "Traceable operations"]

  const comparisonData = {
    before: {
      title: t("comparison.before.title"),
      subtitle: t("comparison.before.subtitle"),
      items: [
        t("comparison.before.item1"),
        t("comparison.before.item2"),
        t("comparison.before.item3"),
        t("comparison.before.item4"),
        t("comparison.before.item5"),
        t("comparison.before.item6"),
      ],
    },
    after: {
      title: t("comparison.after.title"),
      subtitle: t("comparison.after.subtitle"),
      items: [
        t("comparison.after.item1"),
        t("comparison.after.item2"),
        t("comparison.after.item3"),
        t("comparison.after.item4"),
        t("comparison.after.item5"),
        t("comparison.after.item6"),
      ],
    },
  }

  const beforeMetrics = [
    { label: t("comparison.metrics.costs"), value: 100, suffix: "%", trend: [80, 85, 90, 88, 95, 100], color: "#f87171" },
    { label: t("comparison.metrics.downtime"), value: 45, suffix: "h", trend: [30, 35, 40, 38, 42, 45], color: "#fb923c" },
    { label: t("comparison.metrics.efficiency"), value: 62, suffix: "%", trend: [70, 68, 65, 64, 63, 62], color: "#fbbf24" },
  ]

  const afterMetrics = [
    { label: t("comparison.metrics.costs"), value: 18, suffix: "%", prefix: "-", trend: [100, 95, 88, 85, 82, 82], color: "#34d399" },
    { label: t("comparison.metrics.downtime"), value: 8, suffix: "h", trend: [45, 35, 25, 18, 12, 8], color: "#34d399" },
    { label: t("comparison.metrics.efficiency"), value: 94, suffix: "%", trend: [62, 70, 78, 85, 90, 94], color: "#6ee7b7" },
  ]

  const columns = [
    {
      key: "before",
      subtitle: comparisonData.before.subtitle,
      title: comparisonData.before.title,
      metrics: beforeMetrics,
      items: comparisonData.before.items,
      icon: AlertTriangle,
      badge: language === "es" ? "Modelo reactivo" : "Reactive model",
      trendText: t("comparison.trend.negative"),
      trendIcon: TrendingDown,
      surface: "bg-[linear-gradient(180deg,rgba(30,13,13,0.92),rgba(20,12,15,0.84))]",
      border: "border-red-400/16",
      glow: "from-red-500/16 via-orange-500/5 to-transparent",
      chip: "bg-red-400/10 border-red-400/18 text-red-300",
      iconWrap: "bg-red-400/10 border-red-400/16 text-red-300",
      itemSurface: "bg-white/[0.04] border-white/8",
      itemIcon: "bg-red-400/10 text-red-300",
      tone: "text-red-300",
    },
    {
      key: "after",
      subtitle: comparisonData.after.subtitle,
      title: comparisonData.after.title,
      metrics: afterMetrics,
      items: comparisonData.after.items,
      icon: Zap,
      badge: language === "es" ? "Recomendado" : "Recommended",
      trendText: t("comparison.trend.positive"),
      trendIcon: TrendingUp,
      surface: "bg-[linear-gradient(145deg,rgba(8,28,24,0.96),rgba(7,16,26,0.90))]",
      border: "border-emerald-400/18",
      glow: "from-emerald-400/18 via-cyan-300/6 to-transparent",
      chip: "bg-emerald-400/12 border-emerald-400/18 text-emerald-300",
      iconWrap: "bg-emerald-400/10 border-emerald-400/16 text-emerald-300",
      itemSurface: "bg-white/[0.05] border-white/10",
      itemIcon: "bg-emerald-400/10 text-emerald-300",
      tone: "text-emerald-300",
      featured: true,
    },
  ]

  return (
    <section id="comparison" className="relative overflow-hidden py-14 lg:py-18">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f4fbf7_0%,#edf5f1_42%,#f7faf8_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(16,185,129,0.10),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(15,23,42,0.06),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.08),transparent_28%)]" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.08) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "linear-gradient(180deg, transparent, black 10%, black 90%, transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="lg:sticky lg:top-24"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/16 bg-emerald-500/8 px-4 py-2">
              <Zap className="h-4 w-4 text-emerald-700" />
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                {t("comparison.badge")}
              </span>
            </div>

            <h2 className="mt-5 max-w-xl text-4xl font-bold leading-[0.96] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.35rem]">
              {t("comparison.title1")}
              <span className="block bg-[linear-gradient(135deg,#065f46_0%,#10b981_45%,#34d399_100%)] bg-clip-text text-transparent">
                {t("comparison.title2")}
              </span>
            </h2>

            <p className="mt-4 max-w-md text-[15px] leading-7 text-slate-600 sm:text-base">
              {proofCopy}
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {proofPills.map((pill) => (
                <div
                  key={pill}
                  className="rounded-full border border-white/70 bg-white/68 px-3.5 py-2 text-xs font-medium text-slate-700 shadow-[0_10px_20px_rgba(15,23,42,0.04)]"
                >
                  {pill}
                </div>
              ))}
            </div>

            <div className="mt-7 overflow-hidden rounded-[28px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.55))] p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                    {proofTitle}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {language === "es"
                      ? "SIDON reduce friccion operativa al cambiar supervision manual por disciplina digital y evidencia continua."
                      : "SIDON reduces operational friction by replacing manual supervision with digital discipline and continuous evidence."}
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald-300/50 bg-emerald-50 p-3 text-emerald-700">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  {
                    label: language === "es" ? "Costos de operacion" : "Operating costs",
                    reactive: "100%",
                    digital: "-18%",
                  },
                  {
                    label: language === "es" ? "Tiempo muerto acumulado" : "Downtime accumulated",
                    reactive: "45h",
                    digital: "8h",
                  },
                  {
                    label: language === "es" ? "Eficiencia de ejecucion" : "Execution efficiency",
                    reactive: "62%",
                    digital: "94%",
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-slate-200/70 pb-3 last:border-b-0 last:pb-0"
                  >
                    <span className="text-sm text-slate-600">{row.label}</span>
                    <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500">
                      {row.reactive}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {row.digital}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4 lg:grid-cols-2">
            {columns.map((column, index) => {
              const Icon = column.icon
              const TrendIcon = column.trendIcon

              return (
                <motion.article
                  key={column.key}
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
                  whileHover={{ y: -4 }}
                  className={`group relative overflow-hidden rounded-[30px] border p-5 shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-2xl transition-shadow duration-500 hover:shadow-[0_30px_80px_rgba(15,23,42,0.14)] ${column.border} ${column.surface}`}
                >
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${column.glow}`} />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/14" />
                  <div className="pointer-events-none absolute -right-8 top-0 h-28 w-28 rounded-full bg-white/8 blur-3xl" />

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${column.chip}`}>
                        {column.badge}
                      </div>
                      <div className={`flex h-12 w-12 items-center justify-center rounded-[18px] border ${column.iconWrap}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="mt-5">
                      <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${column.tone}`}>
                        {column.subtitle}
                      </p>
                      <h3 className="mt-2 text-[1.8rem] font-semibold tracking-tight text-white">
                        {column.title}
                      </h3>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                      {column.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="rounded-[22px] border border-white/10 bg-white/[0.05] p-3"
                        >
                          <p className="truncate text-[11px] uppercase tracking-[0.16em] text-white/45">
                            {metric.label}
                          </p>
                          <div className="mt-2 block text-xl font-bold tracking-tight text-white">
                            <AnimatedCounter
                              value={metric.value}
                              suffix={metric.suffix}
                              prefix={metric.prefix ?? ""}
                              className="font-mono"
                            />
                          </div>
                          <div className="mt-3">
                            <MiniSparkline data={metric.trend} color={metric.color} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <ul className="mt-5 space-y-2.5">
                      {column.items.map((item) => (
                        <li
                          key={item}
                          className={`flex items-start gap-3 rounded-[18px] border px-4 py-3 ${column.itemSurface}`}
                        >
                          <div className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full ${column.itemIcon}`}>
                            {column.key === "after" ? <Check className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                          </div>
                          <span className="text-sm leading-6 text-white/82">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                      <div className={`inline-flex items-center gap-2 text-sm font-medium ${column.tone}`}>
                        <TrendIcon className="h-4 w-4" />
                        {column.trendText}
                      </div>

                      {column.featured && (
                        <Button className="h-10 rounded-full bg-white px-5 text-slate-950 hover:bg-white/90">
                          {t("comparison.cta")}
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
