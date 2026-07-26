import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useHorizontalWordsGSAP({
    sectionRef, relativeRef, arrowSvgRef, arrowEndSvgRef,
    stickerWatchRef, stickerCursorRef, stickerPhoneRef, lettersRef
}) {
    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = sectionRef.current;
            const textRef   = relativeRef.current;
            const letters   = lettersRef.current;

            if (!container || !textRef || !letters.length) return;

            const stickers = [
                stickerWatchRef.current,
                stickerCursorRef.current,
                stickerPhoneRef.current,
            ].filter(Boolean);

            const arrows = [
                ...(arrowSvgRef.current?.querySelectorAll('path') ?? []),
                ...(arrowEndSvgRef.current?.querySelectorAll('path') ?? []),
            ];

            const isMobile = window.matchMedia('(max-width: 768px)').matches;

            /* ─────────────────────────────────────────────────────────────
               KEY FIX: use a SINGLE ScrollTrigger that does BOTH the pin
               AND drives the containerAnimation. When pin + scrub live on
               the same ST, containerAnimation on child elements works
               correctly because they all share the same progress context.
            ───────────────────────────────────────────────────────────── */
            const pinnedDistance = isMobile ? 1600 : 2600;
            const entranceRatio  = isMobile ? 0.2 : 0.2; // fraction of total

            // Smooth entrance from just outside right edge to center position
            const startX = isMobile
                ? window.innerWidth * 0.6
                : window.innerWidth * 0.85;

            // How far the text slides during the pinned horizontal scroll phase
            const endX = () =>
                isMobile
                    ? -(textRef.scrollWidth * 0.55)
                    : -(textRef.scrollWidth - window.innerWidth * 0.45);

            /* ── Master horizontal scroll timeline ── */
            const masterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: `+=${pinnedDistance}`,
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.8,             // smooth cinematic scroll feel
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
            });

            // Phase 1 — slide in smoothly from right
            masterTl.fromTo(
                textRef,
                { x: startX },
                { x: isMobile ? window.innerWidth * 0.1 : window.innerWidth * 0.25,
                  ease: 'power1.out',
                  duration: entranceRatio }
            );

            // Phase 2 — horizontal sweep to the left
            masterTl.to(
                textRef,
                { x: endX, ease: 'none', duration: 1 - entranceRatio }
            );

            /* ── Letter assembly animation ── */
            const bounceY  = isMobile ? 120 : 220;
            const bounceR  = isMobile ? 20  : 40;

            letters.forEach((letter) => {
                const yFrom = (Math.random() - 0.5) * bounceY;
                const rFrom = (Math.random() - 0.5) * bounceR;

                gsap.fromTo(
                    letter,
                    {
                        y: yFrom,
                        rotation: rFrom,
                        opacity: 0,
                        scale: 0.7,
                    },
                    {
                        y: 0,
                        rotation: 0,
                        opacity: 1,
                        scale: 1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: letter,
                            containerAnimation: masterTl,
                            start: 'left 105%',
                            end: 'left 65%',
                            scrub: true,
                        }
                    }
                );
            });

            /* ── Sticker pop-in (scale + yPercent bounce) ── */
            stickers.forEach((sticker) => {
                const yFrom = (Math.random() - 0.5) * (isMobile ? 140 : 250);
                const rFrom = (Math.random() - 0.5) * (isMobile ? 20 : 40);

                gsap.fromTo(
                    sticker,
                    { scale: 0, y: yFrom, rotation: rFrom, opacity: 0 },
                    {
                        scale: 1, y: 0, rotation: 0, opacity: 1,
                        ease: 'back.out(1.5)',
                        scrollTrigger: {
                            trigger: sticker,
                            containerAnimation: masterTl,
                            start: 'left 105%',
                            end: 'left 60%',
                            scrub: true,
                        }
                    }
                );
            });

            /* ── SVG arrow path drawing (strokeDashoffset reveal) ── */
            arrows.forEach((arrowPath) => {
                if (!arrowPath.getTotalLength) return;
                const pathLen = arrowPath.getTotalLength();
                gsap.set(arrowPath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });

                gsap.to(arrowPath, {
                    strokeDashoffset: 0,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: arrowPath.closest('svg'),
                        containerAnimation: masterTl,
                        start: 'left 95%',
                        end: 'left 40%',
                        scrub: true,
                    }
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
