"use client"

import { useEffect, useState, useRef } from "react"
import { Zap, TrendingUp, CalendarCheck, Activity } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

// Mini Sparkline component
function Sparkline({ data, color, delay = 0 }: { data: number[]; color: string; delay?: number }) {
  const [animate, setAnimate] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 100
  const height = 40
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width
    const y = height - ((value - min) / range) * height
    return `${x},${y}`
  }).join(" ")

  const areaPoints = `0,${height} ${points} ${width},${height}`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-10 overflow-visible">
      <defs>
        <linearGradient id={`sparkGradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
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
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        className={`transition-all duration-1000 ${animate ? "opacity-100" : "opacity-0"}`}
        style={{
          strokeDasharray: animate ? "none" : "500",
          strokeDashoffset: animate ? 0 : 500,
        }}
      />
      {/* Glowing dot at end */}
      {animate && (
        <circle
          cx={width}
          cy={height - ((data[data.length - 1] - min) / range) * height}
          r="3"
          fill={color}
          className="animate-pulse"
        >
          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  )
}

function AnimatedCounter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 2000
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
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <div ref={ref} className="text-4xl lg:text-5xl font-mono font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
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
      trendLabel: "vs anterior",
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
      trendLabel: "vs anterior",
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
      trendLabel: "uptime",
    },
  ]

  return (
    <section id="roi" className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background with subtle grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Real-time Analytics</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            {t("stats.title1")}<span className="text-primary">{t("stats.title2")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("stats.subtitle")}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group relative"
            >
              {/* Glassmorphism Card */}
              <div className="relative h-full p-8 rounded-2xl bg-card/80 backdrop-blur-xl border border-primary/20 overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]">
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-emerald-500/50 via-transparent to-emerald-500/50 animate-pulse" />
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon with pulse */}
                  <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-shadow duration-300">
                    <stat.icon className="w-7 h-7 text-primary" />
                    {/* Pulse indicator */}
                    <span className="absolute -top-1 -right-1 w-3 h-3">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                    </span>
                  </div>
                  
                  {/* Value */}
                  <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  
                  {/* Label */}
                  <h3 className="text-lg font-semibold text-foreground mt-2 mb-1">
                    {stat.label}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {stat.description}
                  </p>

                  {/* Sparkline Chart */}
                  <div className="pt-4 border-t border-primary/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground font-mono">Trend 12m</span>
                      <span className={`text-xs font-mono font-semibold ${
                        stat.trend.startsWith("+") || stat.trend === "99.9%" 
                          ? "text-emerald-500" 
                          : "text-emerald-500"
                      }`}>
                        {stat.trend} {stat.trendLabel}
                      </span>
                    </div>
                    <Sparkline 
                      data={stat.sparkData} 
                      color="#10b981" 
                      delay={index * 200}
                    />
                  </div>
                </div>

                {/* Bottom glow line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom indicator */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/60 backdrop-blur border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-sm font-mono text-muted-foreground">
              Live data from <span className="text-primary font-semibold">127</span> active deployments
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
