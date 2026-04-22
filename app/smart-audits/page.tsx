"use client"
import { withBase } from "@/lib/paths";


import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import {
    ShieldCheck,
    ClipboardList,
    Camera,
    Cpu,
    CheckCircle2,
    ArrowRight,
    Search,
    AlertCircle,
    Clock,
    BarChart3,
    Layers,
    UserCheck,
    Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function SmartAuditsPage() {
    const { t } = useLanguage()

    return (
        <main className="dark min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
            <Header />

            {/* Breadcrumbs / Page Indicator */}
            <div className="absolute top-24 left-0 right-0 z-20 pointer-events-none">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] pointer-events-auto">
                    <Link href="/" className="text-slate-500 hover:text-emerald-400 transition-colors">
                        Inicio
                    </Link>
                    <span className="text-slate-700">/</span>
                    <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                        Módulos
                    </span>
                    <span className="text-slate-700">/</span>
                    <span className="text-white">
                        SmartAudits
                    </span>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Ambient Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 -z-10" />

                <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                                    {t("audits.hero.badge")}
                                </span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                                {t("audits.hero.title1")} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                                    {t("audits.hero.title2")}
                                </span>
                            </h1>

                            <p className="text-lg lg:text-xl text-slate-400 leading-relaxed max-w-xl font-light">
                                {t("audits.hero.description")}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="#contacto">
                                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl h-14 px-8 font-bold group w-full sm:w-auto">
                                        {t("audits.hero.cta")}
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </a>
                                <Button size="lg" variant="ghost" className="border border-slate-700/50 text-slate-300 hover:bg-slate-900 rounded-xl h-14 px-8">
                                    {t("audits.hero.cta2")}
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-emerald-900/20">
                                <Image
                                    src={withBase("/smart-audits-dashboard.png")}
                                    alt="SmartAudits AI Analysis Dashboard"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Floating Stat Card */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-6 -left-6 p-6 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl hidden sm:block"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-emerald-500/20 rounded-xl">
                                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-400">Cumplimiento Operativo</p>
                                        <p className="text-2xl font-bold">+24% <span className="text-xs text-emerald-400 font-normal">esta semana</span></p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Problem Section - Bento Grid Style */}
            <section className="py-24 bg-slate-950/50">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
                            {t("audits.problem.title")}
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            {t("audits.problem.desc")}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Clock, title: t("audits.problem.1.title"), desc: t("audits.problem.1.desc"), color: "emerald" },
                            { icon: AlertCircle, title: t("audits.problem.2.title"), desc: t("audits.problem.2.desc"), color: "blue" },
                            { icon: Search, title: t("audits.problem.3.title"), desc: t("audits.problem.3.desc"), color: "amber" },
                            { icon: BarChart3, title: t("audits.problem.4.title"), desc: t("audits.problem.4.desc"), color: "purple" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="rounded-3xl bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-8 group transition-all duration-300 hover:border-emerald-500/30"
                            >
                                <div className={`p-3 bg-${item.color}-500/10 border border-${item.color}-500/20 rounded-xl w-fit mb-6`}>
                                    <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What is SmartAudits Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[150px] rounded-full -z-10 focus:outline-none" />

                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="aspect-square rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between group hover:border-emerald-500/50 transition-colors">
                                        <UserCheck className="w-8 h-8 text-emerald-500" />
                                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-emerald-400 transition-colors">Disciplina</p>
                                    </div>
                                    <div className="aspect-[4/5] rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-6 flex flex-col justify-between">
                                        <Layers className="w-8 h-8 text-emerald-400" />
                                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Estandarización</p>
                                    </div>
                                </div>
                                <div className="space-y-4 pt-8">
                                    <div className="aspect-[4/5] rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 flex flex-col justify-between focus:outline-none">
                                        <Cpu className="w-8 h-8 text-blue-400" />
                                        <p className="text-xs font-bold uppercase tracking-wider text-blue-400">IA Activa</p>
                                    </div>
                                    <div className="aspect-square rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between group hover:border-emerald-500/50 transition-colors">
                                        <Zap className="w-8 h-8 text-yellow-500" />
                                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-yellow-400 transition-colors">Ejecución</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-[0.3em]">{t("audits.whatis.title")}</h2>
                                <h3 className="text-4xl lg:text-5xl font-bold tracking-tight">{t("audits.whatis.subtitle")}</h3>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    {t("audits.whatis.description")}
                                </p>
                            </div>

                            <ul className="space-y-4">
                                {[
                                    t("audits.features.1.title"),
                                    t("audits.features.2.title"),
                                    t("audits.features.3.title"),
                                    t("audits.features.4.title")
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                        </div>
                                        <span className="text-slate-300 font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Workflow Section */}
            <section className="py-24 bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/3 space-y-6">
                            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                                {t("audits.workflow.title")}
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Automatizamos el ciclo completo de supervisión para que tú te enfoques en la estrategia.
                            </p>

                            <div className="space-y-4 pt-6">
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
                                    <Cpu className="w-5 h-5 text-emerald-500 animate-pulse" />
                                    <span className="text-sm font-bold uppercase tracking-wider">Supervisión en Tiempo Real</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-2/3 grid sm:grid-cols-2 gap-8 relative">
                            {/* Connector lines (decorative) */}
                            <div className="hidden lg:block absolute top-[25%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent -z-10" />

                            {/* Workflow Cards */}
                            {[
                                { icon: Cpu, title: t("audits.workflow.step1.title"), desc: t("audits.workflow.step1.desc"), step: "01" },
                                { icon: ClipboardList, title: t("audits.workflow.step2.title"), desc: t("audits.workflow.step2.desc"), step: "02" },
                                { icon: Camera, title: t("audits.workflow.step3.title"), desc: t("audits.workflow.step3.desc"), step: "03" },
                                { icon: CheckCircle2, title: t("audits.workflow.step4.title"), desc: t("audits.workflow.step4.desc"), step: "04" },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.02 }}
                                    className="p-8 rounded-3xl bg-slate-900/60 backdrop-blur-md border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 relative group"
                                >
                                    <div className="absolute top-6 right-8 text-4xl font-black text-slate-800 group-hover:text-emerald-500/20 transition-colors">
                                        {item.step}
                                    </div>
                                    <div className="p-4 bg-emerald-500/10 rounded-2xl w-fit mb-6">
                                        <item.icon className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 bg-gradient-to-b from-slate-950 to-emerald-950/20">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
                            {t("audits.benefits.title")}
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: t("audits.benefits.1.title"),
                                desc: t("audits.benefits.1.desc"),
                                icon: ShieldCheck,
                                stat: "75%",
                                statLabel: "Cumplimiento"
                            },
                            {
                                title: t("audits.benefits.2.title"),
                                desc: t("audits.benefits.2.desc"),
                                icon: UserCheck,
                                stat: "100%",
                                statLabel: "Objetividad"
                            },
                            {
                                title: t("audits.benefits.3.title"),
                                desc: t("audits.benefits.3.desc"),
                                icon: Zap,
                                stat: "60%",
                                statLabel: "Prod. Supervisión"
                            }
                        ].map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="relative p-10 rounded-[40px] bg-slate-900/40 backdrop-blur-xl border border-slate-800 group hover:border-emerald-500/30 transition-all duration-500"
                            >
                                <div className="mb-8 focus:outline-none">
                                    <div className="text-6xl font-black text-emerald-500/20 mb-2">{benefit.stat}</div>
                                    <div className="text-sm font-bold text-emerald-400 uppercase tracking-widest">{benefit.statLabel}</div>
                                </div>

                                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                                <p className="text-slate-400 leading-relaxed mb-8">{benefit.desc}</p>

                                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 group-hover:bg-emerald-500/10 transition-colors focus:outline-none">
                                    <div className="flex items-center gap-3">
                                        <benefit.icon className="w-5 h-5 text-emerald-400" />
                                        <span className="text-xs font-bold text-slate-300 leading-none">Certificado por Sidón AI</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategic Message CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
                    <div className="space-y-4">
                        <p className="text-emerald-400 font-bold uppercase tracking-[0.4em] text-sm">
                            {t("audits.footer.tagline")}
                        </p>
                        <h2 className="text-5xl lg:text-7xl font-bold tracking-tight">
                            {t("audits.footer.cta1")}
                        </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <a href="#contacto">
                            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl h-16 px-12 text-xl font-bold shadow-2xl shadow-emerald-500/20 w-full sm:w-auto">
                                {t("audits.footer.demo")}
                            </Button>
                        </a>
                        <a href="#contacto">
                            <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-900 rounded-2xl h-16 px-12 text-xl font-bold w-full sm:w-auto">
                                {t("audits.footer.expert")}
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            <ContactForm />
            <Footer />

            <style jsx global>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>
        </main>
    )
}
