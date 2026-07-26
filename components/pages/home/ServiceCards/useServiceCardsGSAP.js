import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function useServiceCardsGSAP(sectionRef) {
    useEffect(() => {
        const ctx = gsap.context((self) => {
            /* ─────────────────────────────────────────
               0. Shared ScrollTrigger start
            ───────────────────────────────────────── */
            const triggerBase = {
                trigger: sectionRef.current,
                start: 'top 80%',
            };

            /* ─────────────────────────────────────────
               1. Badge label ("What We Do") slide-in
            ───────────────────────────────────────── */
            const badgeEl = self.selector('.services-badge');
            if (badgeEl.length > 0) {
                gsap.from(badgeEl, {
                    opacity: 0,
                    x: -20,
                    duration: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: { ...triggerBase },
                });
            }

            /* ─────────────────────────────────────────
               2. Heading — SplitText word stagger
               Falls back gracefully if SplitText isn't available
            ───────────────────────────────────────── */
            const headingEl = self.selector('.services-heading')[0];
            if (headingEl) {
                try {
                    const split = new SplitText(headingEl, { type: 'words,chars' });
                    gsap.from(split.chars, {
                        opacity: 0,
                        y: 40,
                        rotateX: -60,
                        transformOrigin: '50% 50% -20px',
                        stagger: 0.02,
                        duration: 0.7,
                        ease: 'back.out(1.5)',
                        scrollTrigger: { ...triggerBase, start: 'top 78%' },
                        onComplete: () => split.revert(),
                    });
                } catch {
                    // SplitText unavailable (Club GSAP not loaded) — plain fallback
                    gsap.from(headingEl, {
                        opacity: 0,
                        y: 40,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: { ...triggerBase, start: 'top 78%' },
                    });
                }
            }

            /* ─────────────────────────────────────────
               3. Subtitle paragraph
            ───────────────────────────────────────── */
            const subtitleEl = self.selector('.services-subtitle');
            if (subtitleEl.length > 0) {
                gsap.from(subtitleEl, {
                    opacity: 0,
                    y: 20,
                    duration: 0.7,
                    ease: 'power2.out',
                    scrollTrigger: { ...triggerBase, start: 'top 75%' },
                });
            }

            /* ─────────────────────────────────────────
               4. Cards — stagger reveal with clip-path
            ───────────────────────────────────────── */
            const cards = self.selector('[data-service-card]');
            if (cards.length > 0) {
                gsap.fromTo(
                    cards,
                    {
                        opacity: 0,
                        y: 60,
                        scale: 0.94,
                        clipPath: 'inset(10% 5% 10% 5% round 28px)',
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        clipPath: 'inset(0% 0% 0% 0% round 28px)',
                        duration: 0.75,
                        stagger: {
                            amount: 0.45,
                            from: 'start',
                            ease: 'power1.inOut',
                        },
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 70%',
                        },
                    }
                );
            }

            /* ─────────────────────────────────────────
               5. Top accent line on each card — grows on entry (GPU scaleX)
            ───────────────────────────────────────── */
            const lines = self.selector('.service-card-line');
            if (lines.length > 0) {
                gsap.fromTo(lines, 
                    { scaleX: 0, transformOrigin: 'left' },
                    {
                        scaleX: 1,
                        duration: 0.9,
                        stagger: 0.12,
                        ease: 'expo.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 68%',
                        },
                    }
                );
            }

            /* ─────────────────────────────────────────
               6. Icon subtle float loop (per card)
            ───────────────────────────────────────── */
            const icons = self.selector('.service-icon');
            icons.forEach((icon, i) => {
                gsap.to(icon, {
                    y: -5,
                    duration: 2 + i * 0.3,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                    delay: i * 0.15,
                });
            });

            /* ─────────────────────────────────────────
               7. Feature list items stagger in — per card
            ───────────────────────────────────────── */
            cards.forEach((card) => {
                const features = card.querySelectorAll('.service-feature');
                gsap.from(features, {
                    opacity: 0,
                    x: -12,
                    duration: 0.4,
                    stagger: 0.07,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                    },
                });
            });

            /* ─────────────────────────────────────────
               8. Magnetic mouse-glow tracking (Optimized)
            ───────────────────────────────────────── */
            cards.forEach((card) => {
                let rect = null;
                const onEnter = () => {
                    rect = card.getBoundingClientRect();
                    gsap.to(card, {
                        scale: 1.015,
                        duration: 0.4,
                        ease: 'power2.out',
                    });
                };
                const onMove = (e) => {
                    if (!rect) rect = card.getBoundingClientRect();
                    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
                    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
                };
                const onLeave = () => {
                    rect = null;
                    gsap.to(card, {
                        scale: 1,
                        duration: 0.5,
                        ease: 'power3.out',
                    });
                };

                card.addEventListener('mousemove', onMove, { passive: true });
                card.addEventListener('mouseenter', onEnter, { passive: true });
                card.addEventListener('mouseleave', onLeave, { passive: true });

                self.add(() => {
                    return () => {
                        card.removeEventListener('mousemove', onMove);
                        card.removeEventListener('mouseenter', onEnter);
                        card.removeEventListener('mouseleave', onLeave);
                    };
                });
            });

            /* ─────────────────────────────────────────
               9. Ambient glow parallax on scroll
            ───────────────────────────────────────── */
            gsap.to(self.selector('.services-ambient'), {
                y: -60,
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [sectionRef]);
}
