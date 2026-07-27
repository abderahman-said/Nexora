'use client';

import React from 'react';
import { MessageSquareQuote } from 'lucide-react';
import GSAPSlider from '@/components/ui/GSAPSlider';
import { TESTIMONIALS } from './clientsData';
import { ClientCard } from './ClientCard';
import Container from '@/components/ui/Container';

export default function ClientsSection() {
    return (
        <section
            id="testimonials"
            className="scroll-section relative w-full py-14 sm:py-24 lg:py-32 bg-slate-100/90 dark:bg-[#060913] border-b border-slate-200/90 dark:border-slate-800/80 site-grid-bg overflow-hidden"
        >
            <Container className="relative z-10">

                {/* ── Dark Banner Container with testi_bg_3.webp ── */}
                <div className="
                    relative rounded-3xl sm:rounded-[2.5rem] 
                    border border-slate-800/90 shadow-2xl
                    p-6 sm:p-12 lg:p-16 pb-36 lg:pb-52
                    overflow-hidden text-center
                ">
                    {/* Background Image: testi_bg_3.webp */}
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[url('/assets/testi_bg_3.webp')] bg-cover bg-center bg-no-repeat    pointer-events-none"
                    />

                    {/* Section Header Content */}
                    <div className="relative z-10 max-w-3xl mx-auto space-y-4">
                        {/* Status Tag Pill */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/80 text-blue-400 font-bold text-xs tracking-wider uppercase shadow-inner">
                            <MessageSquareQuote className="w-3.5 h-3.5" />
                            <span>CUSTOMER FEEDBACK</span>
                        </div>

                        {/* Main Title */}
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                            What Happy Clients Says{' '}
                            <span className="block mt-1 bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                                About Us?
                            </span>
                        </h2>
                    </div>
                </div>

                {/* ── Overlapping GSAP Cards Slider Row ── */}
                <div className="relative z-20 -mt-40 sm:-mt-44 lg:-mt-48 px-2 sm:px-4">
                    <GSAPSlider
                        items={TESTIMONIALS}
                        ItemComponent={ClientCard}
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