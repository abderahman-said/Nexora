'use client';

import { useRef } from 'react';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import HeroCircularBadge from './HeroCircularBadge';
import { useVimeoHeroGSAP } from './useVimeoHeroGSAP';
import Container from '@/components/ui/Container';

export default function VimeoHero() {
    const heroRef = useRef(null);
    const headRef = useRef(null);
    const subRef = useRef(null);
    const statsRef = useRef(null);
    const ctaRef = useRef(null);
    const badgeRef = useRef(null);
    const glowRef = useRef(null);
    const imageRef = useRef(null);

    useVimeoHeroGSAP({ heroRef, headRef, subRef, statsRef, ctaRef, badgeRef, glowRef, imageRef });

    return (
        <section
            id="hero"
            ref={heroRef}
            className="
                scroll-section relative min-h-[92vh] flex flex-col items-center justify-center
                overflow-hidden bg-[#f8fafc] dark:bg-[#060913] transition-colors duration-300
                px-4 pt-[96px] pb-14
                md:px-8 md:pt-24 md:pb-16
            "
        >
            <HeroBackground glowRef={glowRef} />

            <Container className="relative z-10">
                <HeroContent
                    headRef={headRef}
                    subRef={subRef}
                    statsRef={statsRef}
                    ctaRef={ctaRef}
                    badgeRef={badgeRef}
                    imageRef={imageRef}
                />
            </Container>

            <HeroCircularBadge />

            {/* Scroll hint */}
            <div
                aria-hidden="true"
                className="
                    absolute bottom-4 left-1/2 -translate-x-1/2
                    hidden sm:flex flex-col items-center gap-1.5
                    text-slate-400 text-[0.68rem] tracking-[0.18em] uppercase font-semibold
                    [animation:fade-in-up_1s_ease_1.5s_both]
                "
            >
                <div className="w-px h-7 bg-gradient-to-b from-slate-400/40 to-transparent [animation:scroll-line_2s_ease_infinite]" />
                <span>Scroll</span>
            </div>
        </section>
    );
}

