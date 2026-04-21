"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { Wifi, Camera, Wrench, QrCode, UserCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { motion, AnimatePresence } from 'framer-motion';

const Features = () => {
    const { t } = useLanguage();
    const [activeModule, setActiveModule] = useState<string | null>("sense");

    const modules = [
        {
            id: 'sense',
            icon: Wifi,
            title: t("solutions.sense.title"),
            subtitle: t("solutions.sense.subtitle"),
            description: t("solutions.sense.description"),
            features: [
                t("solutions.sense.feature1"),
                t("solutions.sense.feature2"),
                t("solutions.sense.feature3")
            ],
            bgImage: "/sense-bg.png",
            color: "from-blue-500 to-cyan-500",
            iconColor: "text-blue-600",
            borderColor: "border-blue-500",
            glowColor: "shadow-blue-500/30",
            href: "/sense-iot"
        },
        {
            id: 'audits',
            icon: Camera,
            title: t("solutions.audits.title"),
            subtitle: t("solutions.audits.subtitle"),
            description: t("solutions.audits.description"),
            features: [
                t("solutions.audits.feature1"),
                t("solutions.audits.feature2"),
                t("solutions.audits.feature3")
            ],
            bgImage: "/audits-bg.png",
            color: "from-emerald-500 to-green-500",
            iconColor: "text-emerald-600",
            borderColor: "border-emerald-500",
            glowColor: "shadow-emerald-500/30",
            href: "/smart-audits"
        },
        {
            id: 'mantiz',
            icon: Wrench,
            title: t("solutions.mantiz.title"),
            subtitle: t("solutions.mantiz.subtitle"),
            description: t("solutions.mantiz.description"),
            features: [
                t("solutions.mantiz.feature1"),
                t("solutions.mantiz.feature2"),
                t("solutions.mantiz.feature3")
            ],
            bgImage: "/mantiz-bg.png",
            color: "from-purple-500 to-pink-500",
            iconColor: "text-purple-600",
            borderColor: "border-purple-500",
            glowColor: "shadow-purple-500/30",
            href: "https://servicios.sidon.mx/",
            external: true
        },
        {
            id: 'citas',
            icon: QrCode,
            title: t("solutions.citas.title"),
            subtitle: t("solutions.citas.subtitle"),
            description: t("solutions.citas.description"),
            features: [
                t("solutions.citas.feature1"),
                t("solutions.citas.feature2"),
                t("solutions.citas.feature3")
            ],
            bgImage: "/citas-bg.png",
            color: "from-orange-500 to-red-500",
            iconColor: "text-orange-600",
            borderColor: "border-orange-500",
            glowColor: "shadow-orange-500/30",
            href: "/smart-citas"
        },
        {
            id: 'axess',
            icon: UserCheck,
            title: t("solutions.axess.title"),
            subtitle: t("solutions.axess.subtitle"),
            description: t("solutions.axess.description"),
            features: [
                t("solutions.axess.feature1"),
                t("solutions.axess.feature2"),
                t("solutions.axess.feature3")
            ],
            bgImage: "/citas-bg.png",
            color: "from-sky-500 to-blue-600",
            iconColor: "text-sky-600",
            borderColor: "border-sky-500",
            glowColor: "shadow-sky-500/30",
            href: "https://axess.sidon.mx/demo_poa_qa/",
            external: true,
            isNew: true
        }
    ];

    const currentBgImage = modules.find(m => m.id === activeModule)?.bgImage || null;

    return (
        <section id="soluciones" className="relative py-24 overflow-hidden">
            {/* Dynamic Background Images */}
            <div className="absolute inset-0 bg-slate-50">
                <AnimatePresence mode="wait">
                    {currentBgImage && (
                        <motion.div
                            key={currentBgImage}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url(${currentBgImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            {/* Dark overlay for readability */}
                            <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm mb-6">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className={`text-sm font-medium ${activeModule ? 'text-white' : 'text-emerald-600'}`}>
                            {t("solutions.badge")}
                        </span>
                    </div>

                    <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${activeModule ? 'text-white' : 'text-slate-900'
                        }`}>
                        {t("solutions.title1")}
                        <span className="text-emerald-600">{t("solutions.title2")}</span>
                    </h2>

                    <p className={`text-xl max-w-3xl mx-auto transition-colors duration-300 ${activeModule ? 'text-white/90' : 'text-slate-600'
                        }`}>
                        {t("solutions.subtitle")}
                    </p>
                </div>

                {/* Modules Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {modules.map((module, index) => {
                        const Icon = module.icon;
                        const isActive = activeModule === module.id;

                        return (
                            <motion.article
                                key={module.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onMouseEnter={() => setActiveModule(module.id)}
                                onFocus={() => setActiveModule(module.id)}
                                onClick={() => setActiveModule(module.id)}
                                className="group"
                            >
                                {/* Glassmorphism Card */}
                                <div
                                    className={`relative h-full p-8 rounded-3xl transition-all duration-500 cursor-pointer ${isActive
                                        ? `backdrop-blur-xl bg-white/95 border-2 ${module.borderColor} shadow-2xl ${module.glowColor} scale-[1.03]`
                                        : 'backdrop-blur-xl bg-white/80 border border-white/40 shadow-lg hover:shadow-xl'
                                        }`}
                                    tabIndex={0}
                                >
                                    {/* NUEVO badge */}
                                    {'isNew' in module && module.isNew && (
                                        <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-sky-500 text-white text-[10px] font-bold tracking-widest uppercase">
                                            NUEVO
                                        </div>
                                    )}
                                    {/* Icon Circle */}
                                    <div className={`mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${module.color} p-0.5 transition-transform duration-500 ${isActive ? 'scale-110 rotate-6' : 'group-hover:scale-105'
                                        }`}>
                                        <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                                            <Icon size={32} className={`${module.iconColor} transition-transform duration-500 ${isActive ? 'scale-110' : ''
                                                }`} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-3">
                                        <p className={`text-sm font-semibold uppercase tracking-wide transition-colors duration-300 ${isActive ? module.iconColor : 'text-slate-500'
                                            }`}>
                                            {module.subtitle}
                                        </p>

                                        <h3 className="text-2xl font-bold text-slate-900">
                                            {module.title}
                                        </h3>

                                        <p className="text-slate-600 leading-relaxed">
                                            {module.description}
                                        </p>

                                        {/* Features List - Visible on active card for mobile and desktop */}
                                        <AnimatePresence initial={false}>
                                            {isActive && (
                                                <motion.ul
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="space-y-2 pt-4 border-t border-slate-200"
                                                >
                                                    {module.features.map((feature, idx) => (
                                                        <motion.li
                                                            key={idx}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: idx * 0.08 }}
                                                            className="flex items-start gap-2 text-sm text-slate-700"
                                                        >
                                                            <span className={`mt-1 w-1.5 h-1.5 rounded-full ${module.iconColor.replace('text-', 'bg-')} flex-shrink-0`} />
                                                            {feature}
                                                        </motion.li>
                                                    ))}
                                                </motion.ul>
                                            )}
                                        </AnimatePresence>

                                        <div className="pt-4">
                                            {module.external ? (
                                                <a
                                                    href={module.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`inline-flex items-center gap-2 text-sm font-semibold ${module.iconColor} transition-all ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}
                                                >
                                                    {t("solutions.learnMore")}
                                                    <ArrowRight size={16} />
                                                </a>
                                            ) : (
                                                <Link
                                                    href={module.href}
                                                    className={`inline-flex items-center gap-2 text-sm font-semibold ${module.iconColor} transition-all ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}
                                                >
                                                    {t("solutions.learnMore")}
                                                    <ArrowRight size={16} />
                                                </Link>
                                            )}
                                        </div>
                                    </div>

                                    {/* Decorative Corner Accent */}
                                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${module.color} opacity-0 ${isActive ? 'opacity-10' : 'group-hover:opacity-5'
                                        } rounded-bl-full transition-opacity duration-500`} />
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;
