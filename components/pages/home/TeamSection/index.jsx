'use client';

import React from 'react';
import { Users } from 'lucide-react';
import GSAPSlider from '@/components/ui/GSAPSlider';
import { TEAM_MEMBERS } from './teamData';
import { TeamCard } from './TeamCard';
import Container from '@/components/ui/Container';

export default function TeamSection() {
    return (
        <section
            id="team"
            className="scroll-section relative w-full py-14 sm:py-24 lg:py-32 bg-white dark:bg-[#060913] border-b border-slate-200/90 dark:border-slate-800/80 site-grid-bg overflow-hidden"
        >
            <Container className="relative z-10 ">
                
                {/* ── Section Header ── */}
                <div className="relative text-center mb-12 sm:mb-20">
                    {/* Tag Badge */}
                    <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 text-blue-600 dark:text-sky-400 font-bold text-xs uppercase tracking-wider mb-4 shadow-sm">
                        <Users className="w-3.5 h-3.5" />
                        <span>GREAT TEAM</span>
                    </div>

                    {/* Main Title */}
                    <h2 className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        See Our Skilled Expert{' '}
                        <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
                            Team
                        </span>
                    </h2>
                </div>

                {/* ── GSAP Cards Slider Row ── */}
                <div className="relative z-20 w-full px-2 sm:px-4">
                    <GSAPSlider
                        items={TEAM_MEMBERS}
                        ItemComponent={TeamCard}
                        autoplay={false}
                        defaultVisibleCount={3}
                        showControls={true}
                        controlsPosition="sides"
                        showDots={true}
                    />
                </div>

            </Container>
        </section>
    );
}
