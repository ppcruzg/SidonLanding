"use client"
import { withBase } from "@/lib/paths";


import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import {
    Wifi,
    Thermometer,
    Zap,
    Wind,
    Activity,
    ShieldCheck,
    ArrowRight,
    Cloud,
    Database,
    Bell,
    Settings,
    Cpu,
    RefreshCw,
    Clock,
    CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function SenseIoTPage() {
    const { t } = useLanguage()

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

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
                        Sense IoT
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
                                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                                    {t("sense.hero.badge")}
                                </span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                                {t("sense.hero.title1")} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                                    {t("sense.hero.title2")}
                                </span>
                            </h1>

                            <p className="text-lg lg:text-xl text-slate-400 leading-relaxed max-w-xl font-light">
                                {t("sense.hero.description")}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="#contacto">
                                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl h-14 px-8 font-bold group w-full sm:w-auto">
                                        {t("sense.hero.cta")}
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </a>
                                <Button size="lg" variant="ghost" className="border border-slate-700/50 text-slate-300 hover:bg-slate-900 rounded-xl h-14 px-8">
                                    Descargar Ficha Técnica
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
                                    src={withBase("/sense-dashboard.png")}
                                    alt="Sense IoT Dashboard"
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
                                        <Activity className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-400">Consumo Energético</p>
                                        <p className="text-2xl font-bold">-12.5% <span className="text-xs text-emerald-400 font-normal">este mes</span></p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Bento Grid Features */}
            <section className="py-24 bg-slate-950/50">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">
                            Especialización que <span className="text-emerald-500">importa</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            No medimos todo, medimos lo que impacta en tu rentabilidad.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
                        {/* Cold Control - LARGE */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="md:col-span-2 md:row-span-1 rounded-3xl bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-8 flex flex-col justify-between group overflow-hidden relative"
                        >
                            <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Thermometer className="w-48 h-48 text-emerald-500" />
                            </div>
                            <div className="relative z-10">
                                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl w-fit mb-6">
                                    <Thermometer className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{t("sense.bento.cold.title")}</h3>
                                <p className="text-slate-400 max-w-sm">{t("sense.bento.cold.desc")}</p>
                            </div>
                            <div className="relative z-10 flex gap-4 text-xs font-bold text-blue-400 uppercase tracking-tighter">
                                <span>Alertas en tiempo real</span>
                                <span>•</span>
                                <span>Historial de 5 años</span>
                            </div>
                        </motion.div>

                        {/* Energy Management - SQUARE */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="rounded-3xl bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-8 flex flex-col justify-between group"
                        >
                            <div>
                                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl w-fit mb-6">
                                    <Zap className="w-6 h-6 text-yellow-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{t("sense.bento.energy.title")}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{t("sense.bento.energy.desc")}</p>
                            </div>
                            <div className="pt-4 text-xs font-bold text-yellow-400 uppercase">
                                ROI proyectado: 6 meses
                            </div>
                        </motion.div>

                        {/* Ambient - SQUARE */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="rounded-3xl bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-8 flex flex-col justify-between group"
                        >
                            <div>
                                <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl w-fit mb-6">
                                    <Wind className="w-6 h-6 text-purple-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{t("sense.bento.ambient.title")}</h3>
                                <p className="text-slate-400 text-sm">{t("sense.bento.ambient.desc")}</p>
                            </div>
                            <div className="w-full bg-slate-800/50 h-1.5 rounded-full mt-4 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "85%" }}
                                    className="bg-purple-500 h-full"
                                />
                            </div>
                        </motion.div>

                        {/* Assets Health - LARGE */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="md:col-span-2 rounded-3xl bg-slate-900/40 backdrop-blur-sm border border-slate-800 p-8 flex items-center gap-8 group overflow-hidden"
                        >
                            <div className="flex-1 space-y-4">
                                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl w-fit">
                                    <Settings className="w-6 h-6 text-emerald-400" />
                                </div>
                                <h3 className="text-2xl font-bold">{t("sense.bento.assets.title")}</h3>
                                <p className="text-slate-400 max-w-sm">{t("sense.bento.assets.desc")}</p>
                                <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                                    <span>Mantenimiento Predictivo</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="hidden sm:block flex-1 h-full bg-gradient-to-br from-emerald-500/20 to-emerald-900/10 rounded-2xl relative">
                                {/* Simulated Waveform */}
                                <div className="absolute inset-x-4 inset-y-8 flex items-end gap-1">
                                    {[40, 60, 45, 70, 50, 80, 55, 90, 65, 85, 40, 75, 55, 60, 45].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h}%` }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex-1 bg-emerald-500/40 rounded-t-sm"
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Workflow Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/3 space-y-6">
                            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                                {t("sense.workflow.title")}
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Nuestra tecnología no solo recolecta datos, construye un ciclo de confianza y ejecución automatizada.
                            </p>

                            <div className="space-y-4 pt-6">
                                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
                                    <RefreshCw className="w-5 h-5 text-emerald-500 animate-spin-slow" />
                                    <span className="text-sm font-bold uppercase tracking-wider">Flujo Closed-Loop</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-2/3 grid sm:grid-cols-2 gap-8 relative">
                            {/* Connector lines (decorative) */}
                            <div className="hidden lg:block absolute top-[25%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent -z-10" />

                            {/* Workflow Cards */}
                            {[
                                { icon: Thermometer, title: t("sense.workflow.step1.title"), desc: t("sense.workflow.step1.desc"), step: "01" },
                                { icon: Cloud, title: t("sense.workflow.step2.title"), desc: t("sense.workflow.step2.desc"), step: "02" },
                                { icon: Cpu, title: t("sense.workflow.step3.title"), desc: t("sense.workflow.step3.desc"), step: "03" },
                                { icon: CheckCircle2, title: t("sense.workflow.step4.title"), desc: t("sense.workflow.step4.desc"), step: "04" },
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
                            {t("sense.benefits.title")}
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: t("sense.benefits.1.title"),
                                desc: t("sense.benefits.1.desc"),
                                icon: ShieldCheck,
                                stat: "30%",
                                statLabel: "Menos Mermas"
                            },
                            {
                                title: t("sense.benefits.2.title"),
                                desc: t("sense.benefits.2.desc"),
                                icon: Zap,
                                stat: "15%",
                                statLabel: "Ahorro Recibo"
                            },
                            {
                                title: t("sense.benefits.3.title"),
                                desc: t("sense.benefits.3.desc"),
                                icon: Database,
                                stat: "100%",
                                statLabel: "Cumplimiento"
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
                                <div className="mb-8">
                                    <div className="text-6xl font-black text-emerald-500/20 mb-2">{benefit.stat}</div>
                                    <div className="text-sm font-bold text-emerald-400 uppercase tracking-widest">{benefit.statLabel}</div>
                                </div>

                                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                                <p className="text-slate-400 leading-relaxed mb-8">{benefit.desc}</p>

                                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 group-hover:bg-emerald-500/10 transition-colors">
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

            {/* CTA Section */}
            <section className="py-24 border-t border-slate-900">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Listo para escalar</span>
                    </div>

                    <h2 className="text-5xl lg:text-7xl font-bold tracking-tight">
                        Transforma tus activos en <span className="text-emerald-500 italic">ventaja competitiva</span>.
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <a href="#contacto">
                            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl h-16 px-12 text-xl font-bold shadow-2xl shadow-emerald-500/20 w-full sm:w-auto">
                                Solicitar Demo
                            </Button>
                        </a>
                        <a href="#contacto">
                            <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-900 rounded-2xl h-16 px-12 text-xl font-bold w-full sm:w-auto">
                                Hablar con Experto
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            <ContactForm />
            <Footer />

            {/* global custom styles for scroll/spin */}
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
