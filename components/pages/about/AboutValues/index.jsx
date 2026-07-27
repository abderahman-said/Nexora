'use client';

import React from 'react';
import { Award } from 'lucide-react';
import Container from '@/components/ui/Container';
import InteractiveCard from '@/components/ui/InteractiveCard';
import { CORE_VALUES } from '../aboutData';

export default function AboutValues() {
    return (
        <section
            id="about-values"
            className="scroll-section relative w-full py-16 sm:py-24 bg-slate-100/90 dark:bg-[#090d16] border-b border-slate-200/90 dark:border-slate-800/80 site-grid-bg overflow-hidden transition-colors duration-300"
        >
            <Container className="relative z-10">
                
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 text-blue-600 dark:text-sky-400 font-bold text-xs uppercase tracking-wider shadow-sm">
                        <Award className="w-3.5 h-3.5" />
                        <span>OUR CORE VALUES</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Principles That Drive Our{' '}
                        <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
                            Engineering Standard
                        </span>
                    </h2>
                </div>

                {/* 4 Cards Grid */}
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
                                buttonText="EXPLORE STANDARD"
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
