import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ✅ Register once at module level
gsap.registerPlugin(ScrollTrigger);

export function useVimeoHeroGSAP({ heroRef, headRef, subRef, statsRef, ctaRef, badgeRef, glowRef, imageRef }) {
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

        // Scroll parallax — hero moves up slightly (Desktop only for 60fps mobile scrolling)
        if (heroRef.current && typeof window !== 'undefined' && window.innerWidth >= 768) {
            gsap.to(heroRef.current, {
                yPercent: 8,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            // Side decorators parallax at different speeds
            const sideEls = heroRef.current.querySelectorAll('.hero-side-el');
            sideEls.forEach((el, i) => {
                const speed = 0.3 + i * 0.15;
                const dir   = i % 2 === 0 ? -1 : 1;
                gsap.to(el, {
                    y: `${dir * 120}px`,
                    rotation: dir * 25,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: speed,
                    },
                });
            });
        }

        // Glow circle follows mouse — center on cursor
        const hero = heroRef.current;
        const glow = glowRef.current;
        if (hero && glow) {
            const HALF = 300; // half of 600px glow size
            gsap.set(glow, { x: -HALF, y: -HALF });

            const xTo = gsap.quickTo(glow, 'x', { duration: 0.5, ease: 'power2.out' });
            const yTo = gsap.quickTo(glow, 'y', { duration: 0.5, ease: 'power2.out' });

            const onMove = (e) => {
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
