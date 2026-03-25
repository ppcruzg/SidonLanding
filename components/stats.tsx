"use client"

import { useEffect, useRef, useState } from "react"
import { Activity, CalendarCheck, TrendingUp, Zap } from "lucide-react"
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
  const width = 96
  const height = 34
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - ((value - min) / range) * height
    return `${x},${y}`
  }).join(" ")

  const areaPoints = `0,${height} ${points} ${width},${height}`

  const endY = height - ((data[data.length - 1] - min) / range) * height

  return (
    <div className="relative overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-8 w-full overflow-visible">
        <defs>
          <linearGradient id={`sparkGradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.22" />
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
            <circle
              cx={width}
              cy={endY}
              r="2.8"
              fill={color}
              className="animate-pulse"
            />
            <circle cx={width} cy={endY} r="6" fill={color} opacity="0.18">
              <animate attributeName="r" values="5;8;5" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.18;0.05;0.18" dur="2.4s" repeatCount="indefinite" />
            </circle>
          </>
        )}
      </svg>

      {animate && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 top-0 w-10 bg-[linear-gradient(90deg,transparent,rgba(16,185,129,0.16),transparent)] blur-sm"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: [0, 90, 0], opacity: [0, 0.9, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: delay / 1000 }}
        />
      )}
    </div>
  )
}

function AnimatedCounter({ value, prefix, suffix, className }: { value: number; prefix: string; suffix: string; className?: string }) {
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
      {prefix}{count}{suffix}
    </div>
  )
}

export function Stats() {
  const { t } = useLanguage()

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
      tone: "text-emerald-700",
      shell: "border-white/60 bg-white/58",
      glow: "from-emerald-400/16 via-emerald-300/4 to-transparent",
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
      tone: "text-primary",
      shell: "border-white/70 bg-white/64",
      glow: "from-primary/20 via-emerald-300/6 to-transparent",
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
      tone: "text-slate-700",
      shell: "border-white/60 bg-white/58",
      glow: "from-slate-300/18 via-slate-200/4 to-transparent",
    },
  ]

  return (
    <section id="roi" className="relative overflow-hidden py-14 lg:py-18">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(248,251,249,0.98))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(16,185,129,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.95),transparent_30%)]" />
      <div className="absolute left-1/2 top-24 h-56 w-56 -translate-x-1/2 rounded-full bg-emerald-300/20 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.18) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(16, 185, 129, 0.18) 1px, transparent 1px)`,
          backgroundSize: "58px 58px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/78 px-4 py-2 shadow-[0_10px_24px_rgba(15,23,42,0.05)] backdrop-blur-xl">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Real-time Analytics</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t("stats.title1")}
            <span className="text-primary">{t("stats.title2")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            {t("stats.subtitle")}
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon

            return (
              <motion.article
                key={stat.label}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.015 }}
                className={`group relative overflow-hidden rounded-[26px] border p-6 shadow-[0_20px_40px_rgba(15,23,42,0.06)] backdrop-blur-2xl transition-shadow duration-500 hover:shadow-[0_28px_60px_rgba(15,23,42,0.12)] ${stat.shell} ${stat.featured ? "lg:-translate-y-2" : ""}`}
              >
                <div className="pointer-events-none absolute -inset-px rounded-[26px] bg-[linear-gradient(135deg,rgba(255,255,255,0.6),transparent_24%,transparent_70%,rgba(255,255,255,0.36))] opacity-70" />
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${stat.glow}`} />
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 top-0 h-32 w-24 rotate-12 bg-white/30 blur-2xl"
                  initial={{ opacity: 0.2, x: 10 }}
                  whileHover={{ opacity: 0.55, x: -8 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0.28)_26%,rgba(255,255,255,0.08)_52%,rgba(255,255,255,0.24)_100%)] opacity-90" />
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-white/80" />
                <div className="flex items-start justify-between gap-4">
                  <motion.div
                    className={`relative flex h-12 w-12 items-center justify-center rounded-[16px] border border-white/70 bg-white/58 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur ${stat.tone}`}
                    whileHover={{ rotate: -6, scale: 1.06 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  <motion.span
                    className={`text-xs font-semibold ${stat.tone}`}
                    initial={{ opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.2 + index * 0.08 }}
                  >
                    {stat.trend}
                  </motion.span>
                </div>

                <div className="relative mt-8">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.16 + index * 0.08 }}
                  >
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      className={`font-mono text-5xl font-bold tracking-tight ${stat.tone}`}
                    />
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.22 + index * 0.08 }}
                    className="mt-3 text-xl font-semibold text-foreground"
                  >
                    {stat.label}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.28 + index * 0.08 }}
                    className="mt-2 text-sm leading-7 text-muted-foreground"
                  >
                    {stat.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.34 + index * 0.08 }}
                    className="mt-7 border-t border-white/70 pt-4"
                  >
                    <Sparkline data={stat.sparkData} color="#10b981" delay={index * 140} />
                  </motion.div>
                </div>
              </motion.article>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, delay: 0.22 }}
          className="mt-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/62 px-5 py-2.5 shadow-[0_12px_26px_rgba(15,23,42,0.05)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm text-muted-foreground">
              Live data from <span className="font-semibold text-primary">127</span> active deployments
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
