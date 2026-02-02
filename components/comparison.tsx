"use client"

import React from "react"

import { X, Check, ArrowRight, TrendingDown, TrendingUp, Zap, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"

function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
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
  }, [value])
  
  return <span className="font-mono">{prefix}{count}{suffix}</span>
}

function MiniSparkline({ data, color, isNegative = false }: { data: number[]; color: string; isNegative?: boolean }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((value - min) / range) * 80 - 10
    return `${x},${y}`
  }).join(' ')
  
  const areaPoints = `0,100 ${points} 100,100`
  
  return (
    <svg className="w-full h-12" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={areaPoints}
        fill={`url(#gradient-${color})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-[draw_2s_ease-out_forwards]"
      />
    </svg>
  )
}

function PulseIcon({ icon: Icon, color }: { icon: React.ElementType; color: string }) {
  return (
    <div className="relative">
      <div 
        className="absolute inset-0 rounded-full animate-ping opacity-30"
        style={{ backgroundColor: color }}
      />
      <div 
        className="relative w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
    </div>
  )
}

export function Comparison() {
  const { t } = useLanguage()

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
    { label: t("comparison.metrics.costs"), value: 100, suffix: "%", trend: [80, 85, 90, 88, 95, 100], color: "#ef4444" },
    { label: t("comparison.metrics.downtime"), value: 45, suffix: "h", trend: [30, 35, 40, 38, 42, 45], color: "#f97316" },
    { label: t("comparison.metrics.efficiency"), value: 62, suffix: "%", trend: [70, 68, 65, 64, 63, 62], color: "#eab308" },
  ]

  const afterMetrics = [
    { label: t("comparison.metrics.costs"), value: -18, suffix: "%", trend: [100, 95, 88, 85, 82, 82], color: "#10b981", prefix: "" },
    { label: t("comparison.metrics.downtime"), value: 8, suffix: "h", trend: [45, 35, 25, 18, 12, 8], color: "#10b981" },
    { label: t("comparison.metrics.efficiency"), value: 94, suffix: "%", trend: [62, 70, 78, 85, 90, 94], color: "#10b981" },
  ]

  return (
    <section id="soluciones" className="py-16 lg:py-24 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            {t("comparison.badge")}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t("comparison.title1")}<span className="text-primary">{t("comparison.title2")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("comparison.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-6 items-stretch">
          {/* Before - Glassmorphism Card */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur opacity-50 group-hover:opacity-75 transition duration-500" />
            <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl border border-red-500/20 p-8 lg:p-10 h-full">
              {/* Glow line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-t-2xl" />
              
              {/* Header with Icon */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <span className="text-sm font-medium text-red-400 uppercase tracking-wider font-mono">
                    {comparisonData.before.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold text-foreground mt-1">
                    {comparisonData.before.title}
                  </h3>
                </div>
                <PulseIcon icon={AlertTriangle} color="#ef4444" />
              </div>

              {/* Metrics Cards with Sparklines */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {beforeMetrics.map((metric) => (
                  <div 
                    key={metric.label}
                    className="bg-background/50 backdrop-blur-sm rounded-lg p-3 border border-red-500/10"
                  >
                    <p className="text-xs text-muted-foreground mb-1 truncate">{metric.label}</p>
                    <p className="text-lg font-bold font-mono" style={{ color: metric.color }}>
                      <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                    </p>
                    <MiniSparkline data={metric.trend} color={metric.color} />
                  </div>
                ))}
              </div>
              
              {/* Items List */}
              <ul className="space-y-3">
                {comparisonData.before.items.map((item, index) => (
                  <li 
                    key={item} 
                    className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10 transition-all duration-300 hover:bg-red-500/10"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom Trend Indicator */}
              <div className="mt-6 pt-6 border-t border-red-500/10 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-400" />
                <span className="text-sm text-red-400 font-mono">{t("comparison.trend.negative")}</span>
              </div>
            </div>
          </div>

          {/* After - Premium Glassmorphism Card */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/40 to-emerald-400/40 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse" />
            <div className="relative bg-card/90 backdrop-blur-xl rounded-2xl border border-primary/30 p-8 lg:p-10 h-full shadow-[0_0_40px_rgba(16,185,129,0.15)]">
              {/* Animated Glow line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-emerald-400 to-primary rounded-t-2xl bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite]" />
              
              {/* Recommended Badge */}
              <div className="absolute -top-4 right-8">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-primary to-emerald-400 text-primary-foreground text-xs font-semibold rounded-full shadow-lg shadow-primary/30">
                  <Check className="w-3 h-3" />
                  {t("comparison.recommended")}
                </span>
              </div>
              
              {/* Header with Icon */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <span className="text-sm font-medium text-primary uppercase tracking-wider font-mono">
                    {comparisonData.after.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold text-foreground mt-1">
                    {comparisonData.after.title}
                  </h3>
                </div>
                <PulseIcon icon={Zap} color="#10b981" />
              </div>

              {/* Metrics Cards with Sparklines */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {afterMetrics.map((metric) => (
                  <div 
                    key={metric.label}
                    className="bg-primary/5 backdrop-blur-sm rounded-lg p-3 border border-primary/20 shadow-[inset_0_1px_0_rgba(16,185,129,0.1)]"
                  >
                    <p className="text-xs text-muted-foreground mb-1 truncate">{metric.label}</p>
                    <p className="text-lg font-bold font-mono text-primary">
                      <AnimatedCounter value={Math.abs(metric.value)} suffix={metric.suffix} prefix={metric.prefix || (metric.value < 0 ? "-" : "")} />
                    </p>
                    <MiniSparkline data={metric.trend} color={metric.color} />
                  </div>
                ))}
              </div>
              
              {/* Items List */}
              <ul className="space-y-3">
                {comparisonData.after.items.map((item, index) => (
                  <li 
                    key={item} 
                    className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10 transition-all duration-300 hover:bg-primary/10 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom Trend Indicator */}
              <div className="mt-6 pt-6 border-t border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="text-sm text-primary font-mono">{t("comparison.trend.positive")}</span>
                </div>
              </div>

              <Button className="w-full mt-6 bg-gradient-to-r from-primary to-emerald-400 hover:from-primary/90 hover:to-emerald-400/90 text-primary-foreground gap-2 shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40">
                {t("comparison.cta")}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  )
}
