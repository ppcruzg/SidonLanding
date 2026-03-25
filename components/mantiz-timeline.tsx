"use client"

import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, UserCheck, QrCode, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/lib/language-context';

const MantizTimeline = () => {
    const { t } = useLanguage();
    const [activeNode, setActiveNode] = useState<number | null>(null);
    const [lineProgress, setLineProgress] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);

    // Scroll-based line animation
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const section = sectionRef.current;
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate progress based on scroll position
            const sectionTop = rect.top;
            const sectionHeight = rect.height;

            // Start animation when section enters viewport
            if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
                const scrollProgress = (windowHeight - sectionTop) / (windowHeight + sectionHeight);
                const progress = Math.min(Math.max(scrollProgress * 100, 0), 100);
                setLineProgress(progress);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const timelineNodes = [
        {
            id: 1,
            icon: AlertCircle,
            number: "01",
            title: t("mantiz.node1.title"),
            description: t("mantiz.node1.description"),
            image: "/mantiz-node1.png",
            imageAlt: t("mantiz.node1.imageAlt"),
            color: "from-red-500 to-orange-500"
        },
        {
            id: 2,
            icon: UserCheck,
            number: "02",
            title: t("mantiz.node2.title"),
            description: t("mantiz.node2.description"),
            image: "/mantiz-node2.png",
            imageAlt: t("mantiz.node2.imageAlt"),
            color: "from-blue-500 to-cyan-500"
        },
        {
            id: 3,
            icon: QrCode,
            number: "03",
            title: t("mantiz.node3.title"),
            description: t("mantiz.node3.description"),
            image: "/mantiz-node3.png",
            imageAlt: t("mantiz.node3.imageAlt"),
            color: "from-purple-500 to-pink-500"
        },
        {
            id: 4,
            icon: CheckCircle2,
            number: "04",
            title: t("mantiz.node4.title"),
            description: t("mantiz.node4.description"),
            image: "/mantiz-node4.png",
            imageAlt: t("mantiz.node4.imageAlt"),
            color: "from-emerald-500 to-green-500"
        }
    ];

    return (
        <section id="mantenimiento" ref={sectionRef} className="py-24 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-medium text-emerald-600">{t("mantiz.badge")}</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        {t("mantiz.title")}
                    </h2>

                    <p className="text-xl md:text-2xl text-emerald-600 font-semibold max-w-4xl mx-auto leading-relaxed">
                        {t("mantiz.subtitle")}
                    </p>
                </div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Horizontal Timeline - Desktop */}
                    <div className="hidden lg:block">
                        {/* Background Line */}
                        <div className="absolute top-24 left-0 right-0 h-2 bg-slate-200 rounded-full" />

                        {/* Animated Progress Line */}
                        <div
                            className="absolute top-24 left-0 h-2 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 rounded-full transition-all duration-500 shadow-lg shadow-emerald-500/50"
                            style={{ width: `${lineProgress}%` }}
                        />

                        {/* Timeline Nodes */}
                        <div className="relative grid grid-cols-4 gap-8">
                            {timelineNodes.map((node, index) => {
                                const Icon = node.icon;
                                const isActive = activeNode === node.id;
                                const isCompleted = lineProgress >= ((index + 1) / timelineNodes.length) * 100;

                                return (
                                    <div key={node.id} className="relative">
                                        {/* Node Circle */}
                                        <div
                                            className="relative z-10 mx-auto w-48 h-48 cursor-pointer group"
                                            onMouseEnter={() => setActiveNode(node.id)}
                                            onMouseLeave={() => setActiveNode(null)}
                                            onClick={() => setActiveNode(isActive ? null : node.id)}
                                        >
                                            {/* Outer Glow Ring */}
                                            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${node.color} opacity-20 group-hover:opacity-40 transition-opacity duration-300 blur-xl`} />

                                            {/* Main Circle */}
                                            <div className={`relative w-full h-full rounded-full border-4 transition-all duration-500 flex flex-col items-center justify-center ${isCompleted
                                                ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-white shadow-xl shadow-emerald-500/30'
                                                : 'border-slate-300 bg-white shadow-lg'
                                                } group-hover:scale-110 group-hover:shadow-2xl`}>
                                                {/* Icon */}
                                                <Icon
                                                    size={48}
                                                    className={`mb-3 transition-colors duration-300 ${isCompleted ? 'text-emerald-600' : 'text-slate-400'
                                                        } group-hover:text-emerald-600`}
                                                />

                                                {/* Number */}
                                                <span className={`text-5xl font-black transition-colors duration-300 ${isCompleted ? 'text-emerald-600' : 'text-slate-300'
                                                    } group-hover:text-emerald-600`}>
                                                    {node.number}
                                                </span>
                                            </div>

                                            {/* Glassmorphism Tooltip */}
                                            {isActive && (
                                                <div
                                                    className="absolute top-full mt-8 left-1/2 -translate-x-1/2 w-96 z-50"
                                                    style={{ animation: 'fadeInUp 0.3s ease-out' }}
                                                >
                                                    <div className="relative p-6 rounded-3xl backdrop-blur-xl bg-white/90 border border-white/40 shadow-2xl">
                                                        {/* Image */}
                                                        <div className="relative h-48 rounded-2xl overflow-hidden mb-4 shadow-lg">
                                                            <Image
                                                                src={node.image}
                                                                alt={node.imageAlt}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>

                                                        {/* Content */}
                                                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                                                            {node.title}
                                                        </h3>
                                                        <p className="text-slate-600 leading-relaxed">
                                                            {node.description}
                                                        </p>

                                                        {/* Arrow Pointer */}
                                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 bg-white/90 backdrop-blur-xl border-l border-t border-white/40" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Node Title (Always Visible) */}
                                        <div className="mt-6 text-center">
                                            <h4 className="text-lg font-bold text-slate-900 mb-1">
                                                {node.title}
                                            </h4>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Vertical Timeline - Mobile */}
                    <div className="lg:hidden space-y-8">
                        {timelineNodes.map((node, index) => {
                            const Icon = node.icon;
                            const isActive = activeNode === node.id;

                            return (
                                <div key={node.id} className="relative">
                                    {/* Vertical Line */}
                                    {index < timelineNodes.length - 1 && (
                                        <div className="absolute left-16 top-32 bottom-0 w-1 bg-slate-200">
                                            <div
                                                className="w-full bg-gradient-to-b from-emerald-500 to-emerald-600 transition-all duration-500"
                                                style={{
                                                    height: lineProgress >= ((index + 1) / timelineNodes.length) * 100 ? '100%' : '0%'
                                                }}
                                            />
                                        </div>
                                    )}

                                    {/* Node Card */}
                                    <div
                                        className="relative flex gap-6 cursor-pointer"
                                        onClick={() => setActiveNode(isActive ? null : node.id)}
                                    >
                                        {/* Node Circle */}
                                        <div className="flex-shrink-0">
                                            <div className={`relative w-32 h-32 rounded-full border-4 transition-all duration-500 flex flex-col items-center justify-center ${lineProgress >= ((index + 1) / timelineNodes.length) * 100
                                                ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-white shadow-xl shadow-emerald-500/30'
                                                : 'border-slate-300 bg-white shadow-lg'
                                                }`}>
                                                <Icon
                                                    size={32}
                                                    className={`mb-2 transition-colors duration-300 ${lineProgress >= ((index + 1) / timelineNodes.length) * 100 ? 'text-emerald-600' : 'text-slate-400'
                                                        }`}
                                                />
                                                <span className={`text-3xl font-black transition-colors duration-300 ${lineProgress >= ((index + 1) / timelineNodes.length) * 100 ? 'text-emerald-600' : 'text-slate-300'
                                                    }`}>
                                                    {node.number}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pt-4">
                                            <h4 className="text-xl font-bold text-slate-900 mb-2">
                                                {node.title}
                                            </h4>
                                            <p className="text-slate-600 mb-4">
                                                {node.description}
                                            </p>

                                            {/* Expandable Image */}
                                            {isActive && (
                                                <div
                                                    className="relative h-64 rounded-2xl overflow-hidden shadow-xl mb-4"
                                                    style={{ animation: 'fadeInUp 0.3s ease-out' }}
                                                >
                                                    <Image
                                                        src={node.image}
                                                        alt={node.imageAlt}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 text-center">
                    <a
                        href="https://servicios.sidon.mx/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                        <CheckCircle2 size={24} />
                        <span className="text-lg font-bold">{t("mantiz.cta")}</span>
                    </a>
                </div>
            </div>

            {/* Custom Animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `
            }} />
        </section>
    );
};

export default MantizTimeline;
