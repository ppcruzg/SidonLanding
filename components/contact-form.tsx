"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Send, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export function ContactForm() {
    const { t } = useLanguage()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simular envío de correo
        await new Promise(resolve => setTimeout(resolve, 1500))

        setIsSubmitting(false)
        setIsSubmitted(true)

        // Reset after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000)
    }

    return (
        <section id="contacto" className="py-24 relative overflow-hidden bg-slate-950">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                            <Mail className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                                {t("nav.contact")}
                            </span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1]">
                            {t("contact.title")}
                        </h2>

                        <p className="text-xl text-slate-400 max-w-lg font-light leading-relaxed">
                            {t("contact.subtitle")}
                        </p>

                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 bg-emerald-500/10 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                                    <Mail className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium">Email de Ventas</p>
                                    <p className="text-lg text-white font-semibold">ventas@ecosat.com.mx</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-800 shadow-2xl">
                            <CardContent className="p-8">
                                {isSubmitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-12 text-center space-y-4"
                                    >
                                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 mb-4">
                                            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">{t("contact.success")}</h3>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-slate-300 ml-1">{t("contact.name")}</Label>
                                                <Input
                                                    id="name"
                                                    required
                                                    placeholder="John Doe"
                                                    className="bg-slate-950/50 border-slate-800 focus:border-emerald-500/50 focus:ring-emerald-500/20 text-white h-12 rounded-xl"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-slate-300 ml-1">{t("contact.email")}</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    required
                                                    placeholder="john@company.com"
                                                    className="bg-slate-950/50 border-slate-800 focus:border-emerald-500/50 focus:ring-emerald-500/20 text-white h-12 rounded-xl"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="company" className="text-slate-300 ml-1">{t("contact.company")}</Label>
                                            <Input
                                                id="company"
                                                placeholder="ECOSAT"
                                                className="bg-slate-950/50 border-slate-800 focus:border-emerald-500/50 focus:ring-emerald-500/20 text-white h-12 rounded-xl"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="message" className="text-slate-300 ml-1">{t("contact.message")}</Label>
                                            <Textarea
                                                id="message"
                                                required
                                                placeholder="..."
                                                className="bg-slate-950/50 border-slate-800 focus:border-emerald-500/50 focus:ring-emerald-500/20 text-white min-h-[120px] rounded-xl resize-none"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white h-14 rounded-xl font-bold text-lg shadow-xl shadow-emerald-500/10 transition-all duration-300 group"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    {t("contact.sending")}
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    {t("contact.submit")}
                                                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </span>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
