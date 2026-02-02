"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { motion } from "framer-motion"
import {
    QrCode,
    Calendar,
    Users,
    ShieldCheck,
    ArrowRight,
    CheckCircle2,
    Clock,
    Search,
    Lock,
    Smartphone,
    Mail
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function SmartCitasPage() {
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
                        SmartCitas
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
                                <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                                    {t("citas.hero.badge")}
                                </span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                                {t("citas.hero.title1")} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">
                                    {t("citas.hero.title2")}
                                </span>
                            </h1>

                            <p className="text-lg lg:text-xl text-slate-400 leading-relaxed max-w-xl font-light">
                                {t("citas.hero.description")}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="#contacto">
                                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl h-14 px-8 font-bold group w-full sm:w-auto">
                                        {t("citas.hero.cta")}
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </a>
                                <Button size="lg" variant="ghost" className="border border-slate-700/50 text-slate-300 hover:bg-slate-900 rounded-xl h-14 px-8">
                                    {t("citas.hero.cta2")}
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
                                    src="/smart-citas-dashboard.png"
                                    alt="Smart Citas Dashboard"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Floating Card */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-6 -right-6 p-6 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl hidden sm:block"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-emerald-500/20 rounded-xl">
                                        <Users className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-400">Visitantes Hoy</p>
                                        <p className="text-2xl font-bold">24 <span className="text-xs text-emerald-400 font-normal">registrados</span></p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Business Case / Problem Section */}
            <section className="py-24 relative overflow-hidden bg-slate-950">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                                {t("citas.problem.title")}
                            </h2>
                            <div className="grid gap-6">
                                {[
                                    { title: t("citas.problem.item1.title"), desc: t("citas.problem.item1.desc"), icon: Clock },
                                    { title: t("citas.problem.item2.title"), desc: t("citas.problem.item2.desc"), icon: Search },
                                    { title: t("citas.problem.item3.title"), desc: t("citas.problem.item3.desc"), icon: Users },
                                    { title: t("citas.problem.item4.title"), desc: t("citas.problem.item4.desc"), icon: Lock }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800/50">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                                            <item.icon className="w-6 h-6 text-red-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{item.title}</h3>
                                            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8 bg-slate-900/40 p-10 rounded-[2.5rem] border border-slate-800">
                            <h3 className="text-3xl font-bold">{t("citas.about.title")}</h3>
                            <div className="space-y-6 text-lg text-slate-300 font-light leading-relaxed">
                                <p>{t("citas.about.desc1")}</p>
                                <p>{t("citas.about.desc2")}</p>
                            </div>
                            <div className="pt-6 border-t border-slate-800">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                        <ShieldCheck className="w-6 h-6 text-emerald-500" />
                                    </div>
                                    <p className="text-sm font-semibold text-emerald-400">Certificación Sidón: Orden y Seguridad</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features Grid */}
            <section className="py-24 bg-slate-950/50">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">{t("citas.features.title")}</h2>
                </div>
                <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: t("citas.features.1.title"), desc: t("citas.features.1.desc"), icon: Calendar },
                        { title: t("citas.features.2.title"), desc: t("citas.features.2.desc"), icon: Smartphone },
                        { title: t("citas.features.3.title"), desc: t("citas.features.3.desc"), icon: RefreshCw },
                        { title: t("citas.features.4.title"), desc: t("citas.features.4.desc"), icon: CheckCircle2 }
                    ].map((feature, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/50 transition-all group">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <feature.icon className="w-7 h-7 text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Control & Security Section */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[3rem] p-12 border border-slate-800 relative overflow-hidden">
                        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full" />

                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
                                    {t("citas.security.title")}
                                </h2>
                                <p className="text-xl text-slate-400 font-light leading-relaxed">
                                    {t("citas.security.desc")}
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        t("citas.security.item1"),
                                        t("citas.security.item2"),
                                        t("citas.security.item3")
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4 items-center text-slate-200">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                            </div>
                                            <span className="font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative">
                                <div className="aspect-square bg-slate-800/20 rounded-full border border-slate-700/50 p-8 flex items-center justify-center">
                                    <div className="aspect-square w-full bg-emerald-500/5 rounded-full border border-emerald-500/20 flex items-center justify-center">
                                        <Lock className="w-32 h-32 text-emerald-500/40" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Bento */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <h2 className="text-4xl font-bold text-center mb-16">{t("citas.benefits.title")}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: t("citas.benefits.1.title"), desc: t("citas.benefits.1.desc"), color: "from-blue-500/20" },
                            { title: t("citas.benefits.2.title"), desc: t("citas.benefits.2.desc"), color: "from-emerald-500/20" },
                            { title: t("citas.benefits.3.title"), desc: t("citas.benefits.3.desc"), color: "from-purple-500/20" }
                        ].map((benefit, i) => (
                            <div key={i} className={`p-10 rounded-[2.5rem] bg-gradient-to-br ${benefit.color} to-transparent border border-white/5 backdrop-blur-sm`}>
                                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategic Message CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
                    <div className="space-y-4">
                        <p className="text-emerald-400 font-bold uppercase tracking-[0.4em] text-sm">
                            {t("citas.footer.tagline")}
                        </p>
                        <h2 className="text-5xl lg:text-7xl font-bold tracking-tight">
                            {t("citas.footer.cta1")}
                        </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <a href="#contacto">
                            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl h-16 px-12 text-xl font-bold shadow-2xl shadow-emerald-500/20 w-full sm:w-auto">
                                {t("citas.footer.demo")}
                            </Button>
                        </a>
                        <a href="#contacto">
                            <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-900 rounded-2xl h-16 px-12 text-xl font-bold w-full sm:w-auto">
                                {t("citas.footer.expert")}
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

function RefreshCw(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M3 21v-5h5" />
        </svg>
    )
}
