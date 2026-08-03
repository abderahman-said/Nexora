import React from 'react';
import Image from 'next/image';
import { Award, ShieldCheck, Sparkles } from 'lucide-react';
import type { AboutVisualProps } from './types';

export default function AboutVisual({ visualRef }: AboutVisualProps) {
    return (
        <div ref={visualRef} className="relative w-full max-w-[560px] mx-auto lg:mx-0">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-sky-500/15 to-indigo-600/20 rounded-3xl blur-2xl pointer-events-none" />

            {/* Main Visual Container */}
            <div className="relative z-10 w-full aspect-[4/3.2] sm:aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-2xl shadow-slate-900/10 dark:shadow-blue-950/40 group">
                {/* Team Image */}
                <Image
                    src="/about-team.webp"
                    alt="Nexora Engineering Team"
                    fill
                    className="object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 380px, (max-width: 1024px) 50vw, 560px"
                />

                {/* Subtle Image Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent" />

                {/* Floating Glassmorphic Stat Chip Top-Right */}
                <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-20 flex items-center gap-2 sm:gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border border-white/50 dark:border-slate-700/60 shadow-xl">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-600/10 dark:bg-sky-400/10 flex items-center justify-center text-blue-600 dark:text-sky-400 shrink-0">
                        <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                        <div className="text-[0.7rem] sm:text-xs font-extrabold text-slate-900 dark:text-white">10+ Years</div>
                        <div className="text-[0.6rem] sm:text-[0.65rem] text-slate-500 dark:text-slate-400 font-medium">Industry Excellence</div>
                    </div>
                </div>

                {/* Floating Glassmorphic Stat Chip Bottom-Left */}
                <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 z-20 flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl bg-slate-900/90 dark:bg-slate-950/90 text-white backdrop-blur-md border border-slate-800 shadow-2xl">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 flex items-center justify-center text-white shadow-md shrink-0">
                        <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                        <div className="text-xs sm:text-sm font-black text-white tracking-tight">99.8% Uptime</div>
                        <div className="text-[0.6rem] sm:text-[0.65rem] text-slate-400 font-medium flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-sky-400" />
                            Enterprise SLA Guaranteed
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
