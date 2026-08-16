'use client';

import React from 'react';
import Image from 'next/image';
import { Headphones } from 'lucide-react';
import { useSiteData } from '@/hooks/useSiteData';
import { useTranslations } from 'next-intl';

export default function ConsultationVisual() {
    const { contact } = useSiteData();
    const t = useTranslations("homeConsultation");
    return (
        <div className="lg:col-span-4 relative group max-w-sm lg:max-w-none mx-auto w-full">
            {/* Outer Glow frame on hover */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600 opacity-20 group-hover:opacity-60 blur-lg transition-opacity duration-500 pointer-events-none" />

            {/* Image Container */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-[1/1] border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-xl">
                <Image
                    src="/assets/contact_consultation.webp"
                    alt="Expert Business & Tech Solutions Consultant"
                    width={700}
                    height={840}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Dark Gradient Overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                <div className="
                    absolute bottom-4 start-4 end-4 z-10 p-3.5 rounded-xl
                    bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-700/80
                    flex items-center justify-between gap-3 shadow-xl
                ">
                    <div className="flex items-center gap-2.5">
                        <span className="relative flex h-3 w-3">
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                        </span>
                        <div>
                            <p suppressHydrationWarning className="text-xs font-extrabold text-slate-900 dark:text-white leading-none">{t('visual_live')}</p>
                            <p suppressHydrationWarning className="text-[0.65rem] text-slate-500 dark:text-slate-300 mt-0.5">{t('visual_hours')} {contact.workingHours}</p>
                        </div>
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 dark:bg-blue-600/30 border border-blue-500/20 dark:border-blue-500/50 flex items-center justify-center text-blue-600 dark:text-sky-400 shrink-0">
                        <Headphones className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </div>
    );
}
