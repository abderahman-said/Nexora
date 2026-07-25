// CrossedBanners.jsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TECH_ROW_1, TECH_ROW_2 } from './techData';
import { MarqueeRow } from './MarqueeRow';

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
            className="relative w-full overflow-hidden  pb-[140px] bg-slate-50/70 dark:bg-[#0b1329]/90 transition-colors duration-300"
        >
            {/* heading */}
            <div className="relative z-20 mb-20 px-6 text-center" ref={headRef} suppressHydrationWarning>
                <div className="mb-5 inline-flex items-center gap-2.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#0a1628] dark:text-slate-300 before:block before:h-px before:w-6 before:bg-[#0a1628] dark:before:bg-slate-300 before:content-['']">
                    Technology
                </div>
                <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] font-black tracking-[-0.04em] text-[#0a1628] dark:text-white">
                    Our Tech Stack
                </h2>
            </div>

            {/* crossed ribbon banners */}
            <div className="relative flex flex-col gap-4 py-6">
                {/* Light band — tilted one way */}
                <div className="relative -rotate-[2.5deg] scale-105">
                    <div className="w-[130vw] -ml-[15vw] border-y-2 border-[#0a1628]/10 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                        <MarqueeRow items={TECH_ROW_1} direction={1} theme="light" />
                    </div>
                </div>

                {/* Dark band — tilted the other way, overlapping */}
                <div className="relative -mt-6 rotate-[2.5deg] scale-105">
                    <div className="w-[130vw] -ml-[15vw] bg-[#0a1628] py-6  border-y-2 border-[#0a1628]/10 dark:border-slate-800 shadow-[0_12px_40px_rgba(10,22,40,0.35)]">
                        <MarqueeRow items={TECH_ROW_2} direction={-1} theme="dark" />
                    </div>
                </div>
            </div>
        </section>
    );
}