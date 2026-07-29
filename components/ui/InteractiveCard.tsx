'use client';

import React from 'react';
import { ArrowRight, CheckCircle2  } from 'lucide-react';
import Link from 'next/link';
import type { InteractiveCardProps } from './types';

export default function InteractiveCard({
    stepNumber,
    serial,
    badge,
    icon: Icon,
    title,
    description,
    features = [],
    buttonText,
    buttonLink = '#contact',
    className = '',
}: InteractiveCardProps) {
    return (
        <div
            className={`
                group relative flex flex-col justify-between
                bg-white dark:bg-[#0c101d]
                border border-slate-200/90 dark:border-slate-800/90
                rounded-3xl p-6 ${stepNumber ? 'pt-12' : 'pt-10'}
                shadow-xl shadow-slate-200/40 dark:shadow-none
                hover:border-blue-500/60 dark:hover:border-sky-400/60
                hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/20
                hover:-translate-y-3 hover:scale-[1.02]
                transition-all duration-500 ease-out
                ${className}
            `}
        >
            {/* ── Hover Inner Mesh Gradient Overlay ── */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

            {/* ── Overlapping Top Number Badge (If stepNumber provided) ── */}
            {stepNumber && (
                <div className="
                    absolute -top-7 left-1/2 -translate-x-1/2
                    w-14 h-14 rounded-full
                    bg-gradient-to-br from-blue-600 via-sky-500 to-indigo-600 text-white
                    font-black text-lg flex items-center justify-center
                    border-4 border-slate-100 dark:border-[#060913]
                    shadow-xl shadow-blue-500/30
                    group-hover:scale-110 group-hover:shadow-blue-500/60
                    transition-all duration-300 z-20
                ">
                    {stepNumber}
                </div>
            )}

            {/* ── Top Header Row: Badge & Serial ID ── */}
            <div className="relative z-10 flex items-center justify-between mb-6">
                {badge && (
                    <span className="text-[0.65rem] font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 group-hover:animate-ping" />
                        {badge}
                    </span>
                )}

                {serial && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/60 text-blue-600 dark:text-sky-400 font-extrabold text-[0.7rem] font-mono tracking-widest uppercase shadow-sm">
                        <span>#{serial}</span>
                    </span>
                )}
            </div>

            {/* ── Center Animated Circular Icon Badge ── */}
            {Icon && (
                <div className="relative z-10 flex justify-center mb-6">
                    <div className="
                        relative w-16 h-16 rounded-2xl
                        bg-gradient-to-br from-blue-600 via-sky-500 to-indigo-600 text-white
                        flex items-center justify-center
                        shadow-xl shadow-blue-500/30
                        group-hover:shadow-2xl group-hover:shadow-blue-500/60 group-hover:scale-110 group-hover:rotate-3
                        transition-all duration-500 ease-out
                    ">
                        {/* Continuous Radar Ring Effect */}
                        <span className="absolute inset-0 rounded-2xl bg-blue-500/40 animate-ping opacity-60 pointer-events-none" />
                        <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-sky-400 opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-500 pointer-events-none" />

                        {/* Icon */}
                        <Icon className="w-7 h-7 stroke-[2.2] relative z-10 transform transition-transform duration-500 ease-out group-hover:rotate-12 group-hover:scale-110" />
                    </div>
                </div>
            )}

            {/* ── Content Body ── */}
            <div className="flex-1 flex flex-col justify-between">
                {/* ── Title & Description ── */}
                <div className="relative z-10 text-center space-y-2 mb-6">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                        {description}
                    </p>
                </div>

                {/* ── Feature Bullets List ── */}
                {features.length > 0 && (
                    <div className={`relative flex flex-wrap gap-2 justify-center z-10 ${buttonText ? "mb-4" : "mb-0"} pt-4 border-t border-slate-100 dark:border-slate-800/80`}>
                        {features.map((feature, fIdx) => (
                            <div
                                key={fIdx}
                                className="
                                    flex items-center w-fit gap-2 px-2 py-1.5 rounded-xl
                                    bg-slate-50 dark:bg-slate-900/80
                                    border border-slate-200/60 dark:border-slate-800/60
                                    group-hover:border-blue-500/30 dark:group-hover:border-sky-500/30
                                    transition-colors duration-300
                                "
                            >
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Bottom Read More Action Button (Optional) ── */}
            {buttonText && (
                <div className="relative z-10 pt-2">
                    <Link
                        href={buttonLink}
                        className="
                            w-full inline-flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl
                            bg-gradient-to-r from-blue-600 to-sky-600 text-white
                            font-bold text-xs tracking-wider uppercase
                            shadow-md shadow-blue-500/20
                            group-hover:shadow-xl group-hover:shadow-blue-500/40
                            group-hover:from-blue-500 group-hover:to-sky-500
                            hover:scale-[1.02] active:scale-95
                            transition-all duration-300 group/btn
                        "
                    >
                        <span>{buttonText}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-1.5" />
                    </Link>
                </div>
            )}
        </div>
    );
}
