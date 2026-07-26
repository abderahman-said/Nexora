'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TECH_ROW_1, TECH_ROW_2 } from './techData';
import { MarqueeRow } from './MarqueeRow';
import SectionHeader from '@/components/ui/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

export default function CrossedBanners() {
    const sectionRef = useRef(null);
    const headRef = useRef(null);

    useEffect(() => {
        gsap.from(headRef.current, {
            opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        });
    }, []);

    return (
        <section
            id="tech"
            ref={sectionRef}
            className="relative w-full overflow-hidden py-16 pb-[140px] bg-[#f8fafc] dark:bg-[#060913] border-t border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
        >
            {/* heading */}
            <div className="relative z-20 mb-12 px-6" ref={headRef} suppressHydrationWarning>
                <SectionHeader
                    tag="TechStack"
                    badge="What We Build & How"
                    badgeColor="info"
                    title="What We Build."
                    highlight="How We Build It."
                    align="center"
                />
            </div>

            {/* crossed ribbon banners */}
            <div className="relative flex flex-col gap-4 py-6">
                {/* Light band — tilted one way */}
                <div className="relative -rotate-[2.5deg] scale-105">
                    <div className="w-[130vw] -ml-[15vw] border-y-2 border-slate-900/90 dark:border-slate-700 bg-white dark:bg-slate-900 py-6 shadow-[0_10px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                        <MarqueeRow items={TECH_ROW_1} direction={1} theme="light" />
                    </div>
                </div>

                {/* Dark band — tilted the other way, overlapping */}
                <div className="relative -mt-6 rotate-[2.5deg] scale-105">
                    <div className="w-[130vw] -ml-[15vw] bg-slate-900 dark:bg-[#030712] py-6 border-y-2 border-slate-950 dark:border-slate-800 shadow-[0_16px_45px_rgba(0,0,0,0.25)]">
                        <MarqueeRow items={TECH_ROW_2} direction={-1} theme="dark" />
                    </div>
                </div>
            </div>
        </section>
    );
}