import React from 'react';
import { Target, Rocket, ArrowRight, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function AboutVisionMission() {
    const locale = useLocale();
    const t = useTranslations("homeAbout");
    return (
        <div className="w-full mt-6 space-y-4">
            {/* ── Vision & Mission Stacked/Grid Cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* ── CARD 1: OUR VISION ── */}
                <div className="
                    group relative p-5 sm:p-6 rounded-2xl
                    bg-white dark:bg-slate-900/90
                    border border-slate-200/90 dark:border-slate-800
                    border-s-4 border-s-blue-600 dark:border-s-blue-500
                    shadow-lg shadow-slate-200/50 dark:shadow-none
                    transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 dark:hover:shadow-none
                ">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-sky-400 group-hover:scale-105 transition-transform duration-300">
                            <Target className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-[0.65rem] font-bold tracking-widest text-blue-600 dark:text-sky-400 uppercase">
                                {t('vision_tag')}
                            </div>
                            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                                {t('vision_title')}
                            </h3>
                        </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-3">
                        {t('vision_desc')}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[0.7rem] font-semibold text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-3 h-3 text-blue-600 dark:text-sky-400" />
                            {t('vision_feature_1')}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[0.7rem] font-semibold text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="w-3 h-3 text-blue-600 dark:text-sky-400" />
                            {t('vision_feature_2')}
                        </span>
                    </div>
                </div>

                {/* ── CARD 2: OUR MISSION ── */}
                <div className="
                    group relative p-5 sm:p-6 rounded-2xl
                    bg-white dark:bg-slate-900/90
                    border border-slate-200/90 dark:border-slate-800
                    border-s-4 border-s-sky-500 dark:border-s-sky-400
                    shadow-lg shadow-slate-200/50 dark:shadow-none
                    transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 dark:hover:shadow-none
                ">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/80 border border-sky-200/80 dark:border-sky-800/60 flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:scale-105 transition-transform duration-300">
                            <Rocket className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-[0.65rem] font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase">
                                {t('mission_tag')}
                            </div>
                            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                                {t('mission_title')}
                            </h3>
                        </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-3">
                        {t('mission_desc')}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[0.7rem] font-semibold text-slate-700 dark:text-slate-300">
                            <ShieldCheck className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                            {t('mission_feature_1')}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[0.7rem] font-semibold text-slate-700 dark:text-slate-300">
                            <Cpu className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                            {t('mission_feature_2')}
                        </span>
                    </div>
                </div>

            </div>

            {/* ── Action & Stats Row ── */}
            <div className="pt-3 flex flex-wrap items-center justify-between gap-4">
                <Link
                    href={`/${locale}/about`}
                    className="
                        inline-flex items-center gap-2 px-6 py-3 rounded-full
                        bg-gradient-to-r from-blue-600 to-sky-600 text-white
                        font-bold text-xs tracking-wider uppercase
                        shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/35
                        hover:-translate-y-0.5 transition-all duration-300 group
                    "
                >
                    <span>{t('button_story')}</span>
                    <ArrowRight className="w-4 h-4   transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>

                <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span className="text-slate-900 dark:text-white font-extrabold text-sm">{t('stats_number')}</span>
                    <span>{t('stats_text')}</span>
                </div>
            </div>
        </div>
    );
}
