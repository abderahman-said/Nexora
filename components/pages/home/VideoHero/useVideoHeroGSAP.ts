import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { UseVideoHeroGSAPProps } from './types';

// ✅ Register once at module level
gsap.registerPlugin(ScrollTrigger);

export function useVideoHeroGSAP({ heroRef, headRef, subRef, statsRef, ctaRef, badgeRef, glowRef, imageRef }: UseVideoHeroGSAPProps) {
    useGSAP(() => {
        const head = headRef.current;
        if (!head) return;

        // Find all word spans manually
        const words = head.querySelectorAll('.split-word');

        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        // Left Image Entrance
        if (imageRef?.current) {
            tl.from(imageRef.current, { opacity: 0, x: -40, scale: 0.95, duration: 0.9 });
        }

        // Badge entrance
        if (badgeRef?.current) {
            tl.from(badgeRef.current, { opacity: 0, y: 20, scale: 0.9, duration: 0.6 }, '-=0.6');
        }

        // Headline words stagger up
        if (words.length > 0) {
            gsap.set(words, { y: 40, opacity: 0, display: 'inline-block' });
            tl.to(words, {
                y: 0, opacity: 1,
                duration: 0.8,
                stagger: 0.05,
                ease: 'power3.out',
            }, '-=0.4');
        }

        // Subtitle
        if (subRef?.current) {
            tl.from(subRef.current, { opacity: 0, y: 25, duration: 0.7 }, '-=0.5');
        }

        // CTA
        const ctaChildren = Array.from(ctaRef.current?.children || []);
        if (ctaChildren.length > 0) {
            tl.from(ctaChildren, {
                opacity: 0, y: 20, stagger: 0.1, duration: 0.6,
            }, '-=0.4');
        }

        // Stats
        const statsChildren = Array.from(statsRef.current?.children || []);
        if (statsChildren.length > 0) {
            tl.from(statsChildren, {
                opacity: 0, y: 20, stagger: 0.08, duration: 0.5,
            }, '-=0.3');
        }

        // Side decorators parallax — single shared ScrollTrigger for all elements
        if (heroRef.current && typeof window !== 'undefined' && window.innerWidth >= 768) {
            const sideEls = heroRef.current.querySelectorAll('.hero-side-el');
            if (sideEls.length > 0) {
                const elsArray = Array.from(sideEls);
                gsap.to(elsArray, {
                    y: (i) => (i % 2 === 0 ? -80 : 80),
                    rotation: (i) => (i % 2 === 0 ? -15 : 15),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 1,
                    },
                });
            }
        }

        // Glow circle follows mouse — center on cursor
        const hero = heroRef.current;
        const glow = glowRef.current;
        if (hero && glow && typeof window !== 'undefined' && window.innerWidth >= 768) {
            const HALF = 300; // half of 600px glow size
            gsap.set(glow, { x: -HALF, y: -HALF });

            const xTo = gsap.quickTo(glow, 'x', { duration: 0.5, ease: 'power2.out' });
            const yTo = gsap.quickTo(glow, 'y', { duration: 0.5, ease: 'power2.out' });

            const onMove = (e: MouseEvent) => {
                const r = hero.getBoundingClientRect();
                xTo(e.clientX - r.left - HALF);
                yTo(e.clientY - r.top  - HALF);
            };

            hero.addEventListener('mousemove', onMove, { passive: true });

            return () => {
                hero.removeEventListener('mousemove', onMove);
            };
        }
    }, { scope: heroRef, dependencies: [] });
}
