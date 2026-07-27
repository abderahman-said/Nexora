'use client';

import React from 'react';
import Container from '@/components/ui/Container';
import { ABOUT_STATS } from '../aboutData';

export default function AboutStats() {
    return (
        <section
            id="about-stats"
            className="scroll-section relative w-full py-12 sm:py-16 bg-white dark:bg-[#060913] border-b border-slate-200/90 dark:border-slate-800/80 transition-colors duration-300"
        >
            <Container className="relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {ABOUT_STATS.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.id}
                                className="
                                    group relative p-6 rounded-3xl
                                    bg-slate-50/80 dark:bg-[#0c101d]
                                    border border-slate-200/80 dark:border-slate-800/80
                                    hover:border-blue-500/50 dark:hover:border-sky-400/50
                                    hover:shadow-xl hover:shadow-blue-500/10
                                    transition-all duration-300 flex flex-col items-center text-center space-y-3
                                "
                            >
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-6 h-6 stroke-[2.2]" />
                                </div>
                                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                    {stat.value}
                                </span>
                                <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    {stat.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
