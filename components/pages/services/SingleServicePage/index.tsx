'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import type { Service } from '@/components/pages/home/ServiceCards/types';
import { BarChart3, Cpu, Globe, Palette } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
    BarChart3,
    Cpu,
    Globe,
    Palette,
};

interface SingleServicePageProps {
    service: Service;
}

export default function SingleServicePage({ service }: SingleServicePageProps) {
    const locale = useLocale();
    const t = useTranslations('single_service_page');
    const IconComponent = ICON_MAP[service.icon] || BarChart3;
    return (
        <main className="w-full">
            {/* Hero Section */}
            <section className="scroll-section relative w-full pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-20 bg-slate-50/90 dark:bg-[#060913] text-slate-900 dark:text-white overflow-hidden transition-colors duration-300 border-b border-slate-200/90 dark:border-slate-800/80">
                <Container className="relative z-10">
                    <div className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 text-blue-600 dark:text-sky-400 font-bold text-xs tracking-wider uppercase shadow-sm">
                            {service.badge}
                        </div>
                        <div className="w-20 h-20 rounded-2xl bg-blue-500/10 dark:bg-blue-600/30 border border-blue-500/20 dark:border-blue-500/50 flex items-center justify-center text-blue-600 dark:text-sky-400 mb-4">
                            <IconComponent className="w-10 h-10" />
                        </div>
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                            {service.title}
                        </h1>
                        <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
                            {service.description}
                        </p>
                    </div>
                </Container>
            </section>

            {/* Features Section */}
            <section className="scroll-section relative w-full py-16 sm:py-20 bg-white dark:bg-[#060913] border-b border-slate-200/90 dark:border-slate-800/80 transition-colors duration-300">
                <Container className="relative z-10">
                    <SectionHeader
                        badge={t('key_features_badge')}
                        title={t('what_we_offer_title')}
                        subtitle={t('what_we_offer_subtitle', { serviceTitle: service.title })}
                        align="center"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                        {service.features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-2xl bg-transparent transition-colors"
                            >
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-600/30 border border-blue-500/20 dark:border-blue-500/50 flex items-center justify-center text-blue-600 dark:text-sky-400 mb-4">
                                    <span className="text-2xl font-bold">{index + 1}</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                    {feature}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                    {t('feature_description', { featureName: feature })}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="scroll-section relative w-full py-16 sm:py-20 bg-slate-50 dark:bg-[#0a0f1e] transition-colors duration-300">
                <Container className="relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                            {t('cta_title')}
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                            {t('cta_subtitle', { serviceTitle: service.title })}
                        </p>
                        <Link
                            href={`/${locale}/contact`}
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-white font-bold text-sm tracking-wider uppercase shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-95 transition-all duration-300"
                        >
                            {t('cta_button')}
                        </Link>
                    </div>
                </Container>
            </section>
        </main>
    );
}
