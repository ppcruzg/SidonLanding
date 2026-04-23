"use client"
import { withBase } from "@/lib/paths";


import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/lib/language-context"
import {
    Database,
    Search,
    FileSpreadsheet,
    Mail,
    ArrowRight,
    Clock,
    Zap,
    Target,
    History,
    CheckCircle2,
    ChevronRight,
    Sparkles,
    Activity
} from "lucide-react"

const DumaSection = () => {
    const { t } = useLanguage()
    const [activeStep, setActiveStep] = useState(0)

    // Auto-cycle through the Closed Loop steps
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % 4)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    const steps = [
        {
            id: 0,
            title: t("duma.step.insight.title"),
            desc: t("duma.step.insight.desc"),
            icon: Search,
            color: "blue",
            detail: t("duma.step.insight.detail")
        },
        {
            id: 1,
            title: t("duma.step.action.title"),
            desc: t("duma.step.action.desc"),
            icon: Zap,
            color: "emerald",
            detail: t("duma.step.action.detail")
        },
        {
            id: 2,
            title: t("duma.step.resolution.title"),
            desc: t("duma.step.resolution.desc"),
            icon: CheckCircle2,
            color: "green",
            detail: t("duma.step.resolution.detail")
        },
        {
            id: 3,
            title: t("duma.step.memory.title"),
            desc: t("duma.step.memory.desc"),
            icon: History,
            color: "purple",
            detail: t("duma.step.memory.detail")
        }
    ]

    const dataSymptoms = [
        { icon: Search, label: t("duma.fatigue.search"), time: "45 min" },
        { icon: Database, label: t("duma.fatigue.consolidate"), time: "60 min" },
        { icon: FileSpreadsheet, label: t("duma.fatigue.format"), time: "30 min" },
        { icon: Mail, label: t("duma.fatigue.report"), time: "45 min" },
    ]

    return (
        <section id="duma-value" className="relative py-16 lg:py-24 bg-slate-950 overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
                {/* Subtle Watermark Logo */}
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-[0.03] pointer-events-none -z-10">
                    <img
                        src={withBase("/LOGO DUMA(1).png")}
                        alt=""
                        className="w-[600px] h-auto grayscale brightness-0 invert"
                    />
                </div>

                {/* Header Section Compacted */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-5"
                    >
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute -inset-2 bg-emerald-500/20 blur-xl rounded-full opacity-50" />
                                <img
                                    src={withBase("/LOGO DUMA(1).png")}
                                    alt="DUMA Logo"
                                    className="h-10 w-auto relative z-10 brightness-110 contrast-125"
                                />
                            </div>
                            <div className="h-6 w-px bg-slate-800" />
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm">
                                <Sparkles className="w-3 h-3 text-emerald-400" />
                                <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase">
                                    {t("duma.badge")}
                                </span>
                            </div>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                            {t("duma.title1")} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                                {t("duma.title2")}
                            </span>
                        </h2>
                        <p className="text-base text-slate-400 max-w-xl font-light leading-relaxed">
                            {t("duma.description")}
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
                                <p className="text-2xl font-bold text-emerald-400">2 a 4</p>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter mt-1">{t("duma.hours")}</p>
                            </div>
                            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
                                <p className="text-2xl font-bold text-blue-400">100%</p>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter mt-1">{t("duma.traceability")}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Digital Inefficiency Diagnostic - Expert Redesign */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative p-6 rounded-3xl bg-[#0a0f1a]/80 border border-red-500/20 backdrop-blur-3xl shadow-[0_0_50px_rgba(239,68,68,0.05)] overflow-hidden group"
                    >
                        {/* Interactive Background Elements */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_var(--tw-gradient-stops))] from-red-500/5 via-transparent to-transparent opacity-50" />

                        {/* Animated Scanning Line */}
                        <motion.div
                            className="absolute inset-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/10 to-transparent z-10 pointer-events-none"
                            animate={{ top: ['-10%', '110%'] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        />

                        {/* Diagnostic Header */}
                        <div className="relative flex items-center justify-between mb-8 z-20">
                            <div className="flex items-center gap-3">
                                <div className="relative flex items-center justify-center">
                                    <Activity className="w-5 h-5 text-red-500 animate-pulse" />
                                    <div className="absolute inset-0 bg-red-500/20 blur-md rounded-full" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-white/90 uppercase tracking-widest">
                                        {t("duma.fatigue.title")}
                                    </h3>
                                    <p className="text-[9px] font-bold text-red-400/60 uppercase tracking-tighter">Diagnostic Scan: Active</p>
                                </div>
                            </div>
                            <div className="px-2 py-1 rounded bg-red-500/10 border border-red-500/20">
                                <span className="text-[10px] font-mono text-red-400 font-bold">LOSS_DETECTED</span>
                            </div>
                        </div>

                        {/* Diagnostic List with Live Metrics */}
                        <div className="space-y-4 relative z-20">
                            {dataSymptoms.map((symptom, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ x: -20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group/item"
                                >
                                    <div className="flex items-center justify-between mb-1.5 px-1">
                                        <div className="flex items-center gap-3">
                                            <symptom.icon className="w-3.5 h-3.5 text-slate-500 group-hover/item:text-red-400 transition-colors" />
                                            <span className="text-xs font-bold text-slate-400 group-hover/item:text-slate-200 transition-colors">{symptom.label}</span>
                                        </div>
                                        <span className="text-white/60 font-mono text-[10px] font-bold">{symptom.time}</span>
                                    </div>

                                    {/* Efficiency Leakage Bar */}
                                    <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-red-500/40 to-red-500 opacity-60"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: idx === 0 ? '45%' : idx === 1 ? '75%' : idx === 2 ? '30%' : '60%' }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                        />
                                    </div>

                                    {/* Micro-activity dots */}
                                    <div className="flex gap-1 mt-1 justify-end opacity-20 group-hover/item:opacity-50 transition-opacity">
                                        {[1, 2, 3, 4, 5].map(d => (
                                            <div key={d} className="w-0.5 h-0.5 rounded-full bg-red-400" />
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Financial/Time Impact Summary */}
                        <div className="mt-8 pt-6 border-t border-slate-800/50 relative z-20">
                            <div className="flex justify-between items-end mb-4">
                                <div className="text-left">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t("duma.fatigue.quote")}</p>
                                    <div className="h-0.5 w-full bg-emerald-500/20 mt-1 overflow-hidden">
                                        <motion.div
                                            className="h-full bg-emerald-500"
                                            animate={{ x: ['-100%', '100%'] }}
                                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="relative group/btn overflow-hidden rounded-xl">
                                <div className="absolute inset-0 bg-red-500/10 group-hover/btn:bg-red-500/20 transition-colors" />
                                <div className="flex items-center justify-between py-3 px-5 border border-red-500/20 rounded-xl relative z-10 transition-transform active:scale-[0.98]">
                                    <span className="text-[11px] font-black text-red-400 uppercase tracking-widest">
                                        {t("duma.fatigue.solution")}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                                        <span className="text-[10px] font-mono text-red-500 font-black">RECOVER_NOW</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Technical Grid Overlay */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
                    </motion.div>
                </div>

                {/* Closed Loop Interaction Compacted */}
                <div className="mt-16">
                    <div className="text-center mb-10 space-y-2">
                        <h3 className="text-2xl font-bold text-white tracking-tight">{t("duma.loop.title")}</h3>
                        <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                            {t("duma.loop.description")}
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {steps.map((step, idx) => {
                            const isActive = activeStep === idx
                            const Icon = step.icon

                            return (
                                <motion.div
                                    key={step.id}
                                    onClick={() => setActiveStep(idx)}
                                    className={`relative p-5 rounded-xl border transition-all duration-500 cursor-pointer ${isActive
                                        ? `bg-slate-900 shadow-xl scale-[1.02] border-emerald-500/50 shadow-emerald-500/10`
                                        : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                                        }`}
                                    whileHover={{ y: -2 }}
                                >
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors duration-500 ${isActive ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400"
                                        }`}>
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    <h4 className={`text-base font-bold mb-2 transition-colors ${isActive ? "text-white" : "text-slate-400"}`}>
                                        {step.title}
                                    </h4>
                                    <p className="text-xs text-slate-500 leading-relaxed mb-4 font-light min-h-[40px]">
                                        {step.desc}
                                    </p>

                                    <AnimatePresence mode="wait">
                                        {isActive && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-wider"
                                            >
                                                {step.detail}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Indicator Line */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute -bottom-px left-6 right-6 h-0.5 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                        />
                                    )}
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* Comparison Footnote Compacted */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 relative overflow-hidden text-center"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent" />

                    <div className="relative z-10 space-y-4">
                        <h4 className="text-lg font-bold text-white italic">
                            {t("duma.footer.quote")}
                        </h4>
                        <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-full bg-slate-800/50">
                                    <Target className="w-4 h-4 text-emerald-400" />
                                </div>
                                <span className="text-slate-400 text-sm font-medium">{t("duma.footer.priority")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-full bg-slate-800/50">
                                    <Clock className="w-4 h-4 text-emerald-400" />
                                </div>
                                <span className="text-slate-400 text-sm font-medium">{t("duma.footer.agent")}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-full bg-slate-800/50">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                </div>
                                <span className="text-slate-400 text-sm font-medium">{t("duma.footer.error")}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default DumaSection
