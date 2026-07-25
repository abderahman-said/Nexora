import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useVimeoHeroGSAP({ heroRef, headRef, subRef, statsRef, ctaRef, badgeRef, glowRef }) {
    useEffect(() => {
        const head = headRef.current;
        if (!head) return;

        // Find all word spans manually
        const words = head.querySelectorAll('.split-word');

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            // Badge entrance
            tl.from(badgeRef.current, { opacity: 0, y: 20, scale: 0.9, duration: 0.7 });

            // Headline words stagger up
            gsap.set(words, { y: 40, opacity: 0, display: 'inline-block' });
            tl.to(words, {
                y: 0, opacity: 1,
                duration: 0.8,
                stagger: 0.04,
                ease: 'power3.out',
            }, '-=0.2');

            // Subtitle
            tl.from(subRef.current, { opacity: 0, y: 30, duration: 0.8 }, '-=0.5');

            // CTA
            tl.from(ctaRef.current?.children || [], {
                opacity: 0, y: 20, stagger: 0.1, duration: 0.6,
            }, '-=0.5');

            // Stats
            tl.from(statsRef.current?.children || [], {
                opacity: 0, y: 20, stagger: 0.08, duration: 0.5,
            }, '-=0.4');

            // Scroll parallax — hero moves up slightly
            gsap.to(heroRef.current, {
                yPercent: 10,
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

            // Animated glow follows mouse using GPU-accelerated transforms
            const hero = heroRef.current;
            const glow = glowRef.current;
            if (hero && glow) {
                gsap.set(glow, { xPercent: -50, yPercent: -50 });
                const xTo = gsap.quickTo(glow, 'x', { duration: 0.8, ease: 'power2.out' });
                const yTo = gsap.quickTo(glow, 'y', { duration: 0.8, ease: 'power2.out' });

                let rect = hero.getBoundingClientRect();
                const updateRect = () => { rect = hero.getBoundingClientRect(); };
                window.addEventListener('resize', updateRect, { passive: true });

                const onMove = (e) => {
                    xTo(e.clientX - rect.left);
                    yTo(e.clientY - rect.top);
                };

                hero.addEventListener('mousemove', onMove, { passive: true });
                return () => {
                    hero.removeEventListener('mousemove', onMove);
                    window.removeEventListener('resize', updateRect);
                };
            }
        }, heroRef);

        return () => {
            ctx.revert();
        };
    }, []);
}
