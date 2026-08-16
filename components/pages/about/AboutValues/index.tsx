'use client';

import React from 'react';
import { Award } from 'lucide-react';
import Container from '@/components/ui/Container';
import InteractiveCard from '@/components/ui/InteractiveCard';
import { getCoreValues } from '@/lib/data/aboutData';
import { useTranslations } from 'next-intl';

export default function AboutValues() {
    const t = useTranslations('about');
    const CORE_VALUES = getCoreValues(t);
    return (
        <section
            id="about-values"
            className="scroll-section relative w-full py-16 sm:py-24 bg-slate-100/90 dark:bg-[#090d16] border-b border-slate-200/90 dark:border-slate-800/80 site-grid-bg overflow-hidden transition-colors duration-300"
        >
            <Container className="relative z-10">
                <div className="  mb-14 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 text-blue-600 dark:text-sky-400 font-bold text-xs uppercase tracking-wider shadow-sm">
                        <Award className="w-3.5 h-3.5" />
                        <span>{t('values.badge')}</span>
                    </div>

                    <h2 className="text-[25px] sm:text-[31px] lg:text-[43px] font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {t('values.title_main')}{' '}
                        <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
                            {t('values.title_highlight')}
                        </span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
                    {CORE_VALUES.map((val) => (
                        <div key={val.step} className="h-full flex flex-col">
                            <InteractiveCard
                                stepNumber={val.step}
                                badge={val.badge}
                                icon={val.icon}
                                title={val.title}
                                description={val.description}
                                features={val.features}
                                buttonText={t('values.btn_explore')}
                                buttonLink="#consultation"
                                className="h-full"
                            />
                        </div>
                    ))}
                </div>

            </Container>
        </section>
    );
}
