"use client"

import React, { useEffect, useState } from 'react';
import { Zap, Users, BarChart3, CheckCircle2, Shield, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

const ROISection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Live activity feed data
    const activities = [
        {
            id: 1,
            icon: CheckCircle2,
            text: t("roi.activity.1"),
            time: t("roi.activity.time.1"),
            color: "emerald"
        },
        {
            id: 2,
            icon: Shield,
            text: t("roi.activity.2"),
            time: t("roi.activity.time.2"),
            color: "blue"
        },
        {
            id: 3,
            icon: BarChart3,
            text: t("roi.activity.3"),
            time: t("roi.activity.time.3"),
            color: "amber"
        },
        {
            id: 4,
            icon: CheckCircle2,
            text: t("roi.activity.4"),
            time: t("roi.activity.time.4"),
            color: "emerald"
        },
        {
            id: 5,
            icon: Clock,
            text: t("roi.activity.5"),
            time: t("roi.activity.time.5"),
            color: "slate"
        }
    ];

    return (
        <section className="relative py-32 overflow-hidden">
            {/* Layered Background with Image */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/operational-team-bg.png')",
                        backgroundPosition: "center 40%"
                    }}
                />
                {/* Emerald Gradient Overlay - 80% to 40% opacity */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-emerald-800/60 to-emerald-900/40" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-10">
                {/* Main Heading - Culture Message */}
                <div
                    className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
                        {t("roi.heading")}
                    </h2>
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light drop-shadow-lg">
                        {t("roi.subtitle")}
                    </p>
                </div>

                {/* Glassmorphism Metric Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {/* Card: Ahorro Energético */}
                    <div
                        className={`group relative p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 
              transition-all duration-700 hover:bg-white/15 hover:shadow-2xl hover:shadow-emerald-500/30 hover:scale-105
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                        style={{ transitionDelay: '200ms' }}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-emerald-500/90 backdrop-blur-sm rounded-2xl text-white shadow-lg shadow-emerald-500/50">
                                <Zap size={32} />
                            </div>
                            <span className="text-6xl font-black text-white drop-shadow-lg">10-18%</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-md">{t("roi.energy.title")}</h3>
                        <p className="text-white/90 text-lg mb-6 leading-relaxed">
                            {t("roi.energy.description")}
                        </p>
                        {/* Enhanced Bar Chart */}
                        <div className="h-28 flex items-end gap-2 px-2">
                            {[40, 70, 45, 90, 65, 80, 95].map((h, i) => (
                                <div
                                    key={i}
                                    className="flex-1 bg-emerald-300/40 backdrop-blur-sm rounded-t-xl transition-all duration-500 group-hover:bg-emerald-400/70 shadow-lg"
                                    style={{
                                        height: `${h}%`,
                                        transitionDelay: `${i * 50}ms`
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Card: Productividad with CSQ Element */}
                    <div
                        className={`group relative p-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 
              transition-all duration-700 hover:bg-white/15 hover:shadow-2xl hover:shadow-white/30 hover:scale-105
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                        style={{ transitionDelay: '400ms' }}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-white/90 backdrop-blur-sm rounded-2xl text-emerald-900 shadow-lg shadow-white/50">
                                <Users size={32} />
                            </div>
                            <span className="text-6xl font-black text-white drop-shadow-lg">20-30%</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-md">{t("roi.productivity.title")}</h3>
                        <p className="text-white/90 text-lg mb-6 leading-relaxed">
                            {t("roi.productivity.description")}
                        </p>

                        {/* CSQ Human Touch Badge */}
                        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 flex items-center gap-3">
                            <div className="flex -space-x-2">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm">
                                    CS
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm">
                                    Q
                                </div>
                            </div>
                            <p className="text-white font-semibold text-sm leading-tight">
                                {t("roi.csq.badge")}
                            </p>
                        </div>

                        {/* Bar Chart */}
                        <div className="h-28 flex items-end gap-2 px-2">
                            {[30, 50, 70, 60, 85, 90, 100].map((h, i) => (
                                <div
                                    key={i}
                                    className="flex-1 bg-white/30 backdrop-blur-sm rounded-t-xl transition-all duration-500 group-hover:bg-emerald-400/70 shadow-lg"
                                    style={{
                                        height: `${h}%`,
                                        transitionDelay: `${i * 50}ms`
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Live Activity Feed - Carousel */}
                <div
                    className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                        }`}
                    style={{ transitionDelay: '600ms' }}
                >
                    <h3 className="text-2xl font-bold text-white mb-6 text-center drop-shadow-md">
                        {t("roi.activity.title")}
                    </h3>

                    {/* Scrollable Feed Container */}
                    <div className="relative">
                        <div className="overflow-x-auto pb-4 scrollbar-hide">
                            <div className="flex gap-4 min-w-max px-2">
                                {activities.map((activity, index) => {
                                    const Icon = activity.icon;
                                    const colorClasses = {
                                        emerald: 'bg-emerald-500/20 border-emerald-400/30 group-hover:bg-emerald-500/30',
                                        blue: 'bg-blue-500/20 border-blue-400/30 group-hover:bg-blue-500/30',
                                        amber: 'bg-amber-500/20 border-amber-400/30 group-hover:bg-amber-500/30',
                                        slate: 'bg-slate-500/20 border-slate-400/30 group-hover:bg-slate-500/30'
                                    };

                                    return (
                                        <div
                                            key={activity.id}
                                            className="w-80 p-5 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 
                        hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/20
                        flex items-start gap-4 group"
                                            style={{
                                                animation: `fadeInUp 0.6s ease-out ${(index * 100) + 800}ms backwards`
                                            }}
                                        >
                                            <div className={`p-3 rounded-xl backdrop-blur-sm border transition-colors ${colorClasses[activity.color as keyof typeof colorClasses]
                                                }`}>
                                                <Icon size={24} className="text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white font-medium text-sm leading-snug mb-2">
                                                    {activity.text}
                                                </p>
                                                <p className="text-white/60 text-xs font-medium">
                                                    {activity.time}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Gradient Fade Edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-emerald-900/60 to-transparent pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-emerald-900/60 to-transparent pointer-events-none" />
                    </div>
                </div>

                {/* CTA Section */}
                <div
                    className={`mt-16 p-8 rounded-3xl backdrop-blur-xl bg-slate-900/80 border border-white/20 
            flex flex-col md:flex-row items-center justify-between shadow-2xl
            transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                        }`}
                    style={{ transitionDelay: '800ms' }}
                >
                    <div className="mb-6 md:mb-0">
                        <h4 className="text-2xl font-bold mb-2 text-white">{t("roi.cta.title")}</h4>
                        <p className="text-white/70 text-lg">
                            {t("roi.cta.description")}
                        </p>
                    </div>
                    <button className="px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-lg rounded-xl 
            transition-all duration-300 flex items-center gap-3 shadow-lg shadow-emerald-500/50 hover:shadow-xl 
            hover:shadow-emerald-400/60 hover:scale-105">
                        <BarChart3 size={24} />
                        {t("roi.cta.button")}
                    </button>
                </div>
            </div>

            {/* Custom Animation Keyframes - Using inline style tag */}
            <style dangerouslySetInnerHTML={{
                __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `
            }} />
        </section>
    );
};

export default ROISection;
