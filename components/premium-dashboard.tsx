"use client"

import React from "react"

import { useEffect, useState, useRef } from "react"
import { Camera, Wifi, Shield, Zap, Users, AlertTriangle, Activity } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

// Mini sparkline component
function Sparkline({ data, color, height = 24 }: { data: number[], color: string, height?: number }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  
  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * 100
    const y = height - ((value - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  const areaPoints = `0,${height} ${points} 100,${height}`

  return (
    <svg viewBox={`0 0 100 ${height}`} className="w-full" style={{ height }}>
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#gradient-${color})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Dual area chart component
function DualAreaChart() {
  const actualData = [30, 45, 35, 55, 48, 62, 58, 72, 65, 78, 82, 88]
  const goalData = [40, 50, 55, 60, 65, 70, 75, 80, 82, 85, 88, 90]
  
  const allData = [...actualData, ...goalData]
  const max = Math.max(...allData)
  const min = Math.min(...allData)
  const range = max - min || 1
  const height = 140
  const padding = 10

  const getPoints = (data: number[]) => {
    return data.map((value, i) => {
      const x = padding + (i / (data.length - 1)) * (100 - padding * 2)
      const y = padding + (1 - (value - min) / range) * (height - padding * 2)
      return `${x},${y}`
    }).join(' ')
  }

  const getAreaPoints = (data: number[]) => {
    const points = getPoints(data)
    return `${padding},${height - padding} ${points} ${100 - padding},${height - padding}`
  }

  // Create smooth curve path
  const createSmoothPath = (data: number[]) => {
    const points = data.map((value, i) => ({
      x: padding + (i / (data.length - 1)) * (100 - padding * 2),
      y: padding + (1 - (value - min) / range) * (height - padding * 2)
    }))

    let path = `M ${points[0].x},${points[0].y}`
    
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i - 1] || points[i]
      const p1 = points[i]
      const p2 = points[i + 1]
      const p3 = points[i + 2] || p2

      const cp1x = p1.x + (p2.x - p0.x) / 6
      const cp1y = p1.y + (p2.y - p0.y) / 6
      const cp2x = p2.x - (p3.x - p1.x) / 6
      const cp2y = p2.y - (p3.y - p1.y) / 6

      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`
    }

    return path
  }

  const actualPath = createSmoothPath(actualData)
  const goalPath = createSmoothPath(goalData)

  return (
    <svg viewBox={`0 0 100 ${height}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="goalGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Grid lines */}
      {[0, 1, 2, 3, 4].map(i => (
        <line
          key={i}
          x1={padding}
          y1={padding + (i / 4) * (height - padding * 2)}
          x2={100 - padding}
          y2={padding + (i / 4) * (height - padding * 2)}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.5"
        />
      ))}
      
      {/* Goal area */}
      <path
        d={`${goalPath} L ${100 - padding},${height - padding} L ${padding},${height - padding} Z`}
        fill="url(#goalGradient)"
      />
      
      {/* Actual area */}
      <path
        d={`${actualPath} L ${100 - padding},${height - padding} L ${padding},${height - padding} Z`}
        fill="url(#actualGradient)"
      />
      
      {/* Goal line */}
      <path
        d={goalPath}
        fill="none"
        stroke="#34d399"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        strokeOpacity="0.6"
      />
      
      {/* Actual line */}
      <path
        d={actualPath}
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        filter="url(#glow)"
      />
      
      {/* Data points */}
      {actualData.map((value, i) => {
        const x = padding + (i / (actualData.length - 1)) * (100 - padding * 2)
        const y = padding + (1 - (value - min) / range) * (height - padding * 2)
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="1.5"
            fill="#10b981"
            className="opacity-0 hover:opacity-100 transition-opacity"
          />
        )
      })}
    </svg>
  )
}

// Activity feed item with pulse
function ActivityItem({ 
  icon: Icon, 
  text, 
  time, 
  type,
  delay 
}: { 
  icon: React.ElementType
  text: string
  time: string
  type: "success" | "warning" | "info"
  delay: number
}) {
  const typeColors = {
    success: "bg-emerald-500/20 text-emerald-400",
    warning: "bg-amber-500/20 text-amber-400",
    info: "bg-sky-500/20 text-sky-400"
  }

  const pulseColors = {
    success: "bg-emerald-400",
    warning: "bg-amber-400",
    info: "bg-sky-400"
  }

  return (
    <div 
      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-emerald-500/30 transition-all duration-300 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`relative w-9 h-9 rounded-lg ${typeColors[type]} flex items-center justify-center`}>
        <Icon className="w-4 h-4" />
        {/* Pulse indicator */}
        <span className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 ${pulseColors[type]} rounded-full`}>
          <span className={`absolute inset-0 ${pulseColors[type]} rounded-full animate-ping opacity-75`} />
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white/90 truncate group-hover:text-white transition-colors">{text}</p>
        <p className="text-xs font-mono text-white/40">{time}</p>
      </div>
      <Activity className="w-3 h-3 text-emerald-400/50 group-hover:text-emerald-400 transition-colors" />
    </div>
  )
}

export function PremiumDashboard() {
  const { t } = useLanguage()
  const [scrollOffset, setScrollOffset] = useState(0)
  const feedRef = useRef<HTMLDivElement>(null)

  // Sparkline data
  const energyData = [45, 42, 48, 40, 38, 42, 35, 32, 38, 30, 28, 32]
  const productivityData = [60, 65, 62, 70, 75, 72, 78, 82, 80, 85, 88, 92]
  const incidentData = [25, 28, 22, 20, 24, 18, 16, 20, 14, 12, 15, 10]

  const stats = [
    { 
      label: t("hero.dashboard.energy"), 
      value: "-15%", 
      icon: Zap,
      data: energyData,
      color: "#10b981",
      trend: "down"
    },
    { 
      label: t("hero.dashboard.productivity"), 
      value: "+28%", 
      icon: Users,
      data: productivityData,
      color: "#34d399",
      trend: "up"
    },
    { 
      label: t("hero.dashboard.incidents"), 
      value: "-42%", 
      icon: AlertTriangle,
      data: incidentData,
      color: "#6ee7b7",
      trend: "down"
    },
  ]

  const activityFeed = [
    { icon: Camera, text: t("hero.dashboard.audit"), time: t("hero.dashboard.timeAgo1"), type: "success" as const },
    { icon: Wifi, text: t("hero.dashboard.sensor"), time: t("hero.dashboard.timeAgo2"), type: "info" as const },
    { icon: Shield, text: "Sistema de seguridad verificado", time: "hace 8 min", type: "success" as const },
    { icon: AlertTriangle, text: "Alerta de temperatura resuelta", time: "hace 15 min", type: "warning" as const },
    { icon: Zap, text: "Optimización energética aplicada", time: "hace 22 min", type: "success" as const },
  ]

  // Auto-scroll animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollOffset(prev => {
        const maxScroll = activityFeed.length * 60
        return prev >= maxScroll ? 0 : prev + 0.5
      })
    }, 50)
    return () => clearInterval(interval)
  }, [activityFeed.length])

  return (
    <div className="relative">
      {/* Glow effects */}
      <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-emerald-600/10 to-emerald-500/20 rounded-3xl blur-2xl opacity-60" />
      
      {/* Main container with glassmorphism */}
      <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.15)]">
        {/* Glass background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl" />
        
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-2xl border border-emerald-500/20" 
          style={{
            boxShadow: 'inset 0 0 30px rgba(16,185,129,0.1), 0 0 20px rgba(16,185,129,0.1)'
          }}
        />

        {/* Dashboard Header */}
        <div className="relative border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)]" />
              <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-mono font-medium text-emerald-400/80">{t("hero.dashboard.title")}</span>
            </div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="relative p-6 space-y-5">
          {/* Stats Row with Sparklines */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div 
                key={stat.label} 
                className="relative rounded-xl p-4 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-emerald-500/40 transition-all duration-300 group overflow-hidden"
              >
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-transparent transition-all duration-300 rounded-xl" />
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="w-4 h-4 text-emerald-400/60" />
                    <span className={`text-xs font-mono ${stat.trend === 'up' ? 'text-emerald-400' : 'text-emerald-400'}`}>
                      {stat.trend === 'up' ? '↑' : '↓'}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 mb-1">{stat.label}</p>
                  <p className="text-xl font-mono font-bold text-white tracking-tight">
                    {stat.value}
                  </p>
                  <div className="mt-2 -mx-1">
                    <Sparkline data={stat.data} color={stat.color} height={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Chart */}
          <div className="relative rounded-xl p-4 bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-medium text-white/80">Performance Overview</h4>
                <p className="text-xs font-mono text-white/40">Actual vs Meta</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-mono text-white/50">Actual</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400/50 border border-dashed border-emerald-400" />
                  <span className="font-mono text-white/50">Meta</span>
                </div>
              </div>
            </div>
            <div className="h-36">
              <DualAreaChart />
            </div>
          </div>

          {/* Activity Feed */}
          <div className="relative rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-medium text-white/80">Live Activity</h4>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                En vivo
              </span>
            </div>
            <div 
              ref={feedRef}
              className="relative h-44 overflow-hidden"
            >
              <div 
                className="space-y-2 p-3 transition-transform duration-100 ease-linear"
                style={{ transform: `translateY(-${scrollOffset}px)` }}
              >
                {/* Duplicate items for seamless scroll */}
                {[...activityFeed, ...activityFeed].map((item, i) => (
                  <ActivityItem
                    key={i}
                    icon={item.icon}
                    text={item.text}
                    time={item.time}
                    type={item.type}
                    delay={i * 100}
                  />
                ))}
              </div>
              {/* Fade overlays */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-slate-900/80 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating glow orbs */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-emerald-600/15 rounded-full blur-3xl" />
    </div>
  )
}
