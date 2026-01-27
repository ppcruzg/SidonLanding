"use client"

import React from 'react';
import { Users2, MessagesSquare, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';

const CSQCommitmentSection = () => {
    const { t } = useLanguage();

    const services = [
        {
            id: 1,
            icon: Users2,
            title: t("csqSection.card1.title"),
            description: t("csqSection.card1.description"),
            color: "emerald"
        },
        {
            id: 2,
            icon: MessagesSquare,
            title: t("csqSection.card2.title"),
            description: t("csqSection.card2.description"),
            color: "emerald"
        },
        {
            id: 3,
            icon: TrendingUp,
            title: t("csqSection.card3.title"),
            description: t("csqSection.card3.description"),
            color: "emerald"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        {t("csqSection.title")}
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                        {t("csqSection.subtitle")}
                    </p>
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Left Column - Image */}
                    <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl group">
                        <Image
                            src="/csq-consultant.png"
                            alt="CSQ consultant collaborating with branch manager"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                        {/* Overlay gradient for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Right Column - Service Cards */}
                    <div className="space-y-6">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                                <div
                                    key={service.id}
                                    className="group relative bg-white rounded-2xl p-6 border-l-4 border-emerald-500 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-x-2"
                                    style={{
                                        animation: `fadeInRight 0.6s ease-out ${index * 150}ms backwards`
                                    }}
                                >
                                    {/* Icon Circle */}
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors duration-300">
                                            <Icon size={28} className="text-emerald-600" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors duration-300">
                                                {service.title}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Decorative accent */}
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Closing Statement */}
                <div className="relative">
                    <div className="max-w-4xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border border-emerald-100 shadow-lg">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="h-1 w-12 bg-emerald-500 rounded-full" />
                            <Users2 size={32} className="text-emerald-600" />
                            <div className="h-1 w-12 bg-emerald-500 rounded-full" />
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-slate-900 leading-relaxed">
                            {t("csqSection.closing").split(t("csqSection.closing.highlight"))[0]}
                            <span className="text-emerald-600">{t("csqSection.closing.highlight")}</span>
                            {t("csqSection.closing").split(t("csqSection.closing.highlight"))[1]}
                        </p>
                    </div>
                </div>
            </div>

            {/* Custom Animation */}
            <style dangerouslySetInnerHTML={{
                __html: `
          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `
            }} />
        </section>
    );
};

export default CSQCommitmentSection;
