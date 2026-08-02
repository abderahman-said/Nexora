'use client';

import { useRef } from 'react';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import HeroCircularBadge from './HeroCircularBadge';
import { useVimeoHeroGSAP } from './useVimeoHeroGSAP';
import Container from '@/components/ui/Container';

export default function VimeoHero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useVimeoHeroGSAP({ heroRef, headRef, subRef, statsRef, ctaRef, badgeRef, glowRef, imageRef });

    return (
        <section
            id="hero"
            ref={heroRef}
            className="
                scroll-section relative min-h-[90vh]  md:min-h-[100vh] flex flex-col items-center justify-center
                overflow-hidden bg-[#f8fafc] dark:bg-[#060913] transition-colors duration-300
                px-4 pt-[96px] pb-14 md:pb-20
                md:px-8 md:pt-24
            "
        >
            <HeroBackground glowRef={glowRef} />

            <Container className="relative z-10">
                <HeroContent
                    headRef={headRef}
                    subRef={subRef}
                    ctaRef={ctaRef}
                    badgeRef={badgeRef}
                    imageRef={imageRef}
                />
            </Container>

            <HeroCircularBadge />
        </section>
    );
}
