'use client';

import { useRef } from 'react';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import { useVimeoHeroGSAP } from './useVimeoHeroGSAP';

export default function VimeoHero() {
    const heroRef = useRef(null);
    const headRef = useRef(null);
    const subRef = useRef(null);
    const statsRef = useRef(null);
    const ctaRef = useRef(null);
    const badgeRef = useRef(null);
    const glowRef = useRef(null);

    useVimeoHeroGSAP({ heroRef, headRef, subRef, statsRef, ctaRef, badgeRef, glowRef });

    return (
        <div
            ref={heroRef}
            className="
                relative min-h-screen flex flex-col items-center justify-center
                text-center overflow-hidden bg-[#f8fafc] dark:bg-[#030712] transition-colors duration-300
                px-5 pt-[88px] pb-12
                md:px-6 md:pt-24 md:pb-14
            "
        >
            <HeroBackground glowRef={glowRef} />

            <HeroContent
                headRef={headRef}
                subRef={subRef}
                statsRef={statsRef}
                ctaRef={ctaRef}
                badgeRef={badgeRef}
            />

            {/* Scroll hint */}
            <div
                aria-hidden="true"
                className="
                    absolute bottom-6 left-1/2 -translate-x-1/2
                    flex flex-col items-center gap-2
                    text-slate-400 text-[0.7rem] tracking-[0.15em] uppercase font-semibold
                    [animation:fade-in-up_1s_ease_1.5s_both]
                "
            >
                <div className="w-px h-10 bg-gradient-to-b from-slate-400/40 to-transparent [animation:scroll-line_2s_ease_infinite]" />
                <span>Scroll</span>
            </div>
        </div>
    );
}