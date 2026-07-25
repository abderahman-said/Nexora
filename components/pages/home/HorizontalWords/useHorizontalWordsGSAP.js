import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useHorizontalWordsGSAP({ sectionRef, relativeRef, arrowSvgRef, arrowEndSvgRef, stickerWatchRef, stickerCursorRef, stickerPhoneRef, lettersRef }) {
    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = sectionRef.current;
            const textRef = relativeRef.current;
            const letters = lettersRef.current;

            const stickers = [stickerWatchRef.current, stickerCursorRef.current, stickerPhoneRef.current];
            const arrows = [
                ...arrowSvgRef.current.querySelectorAll('path'),
                ...arrowEndSvgRef.current.querySelectorAll('path'),
            ];

            const isMobile = window.innerWidth <= 768;
            const entranceDistance = isMobile ? window.innerHeight * 0.5 : window.innerHeight;
            const pinnedDistance = isMobile ? 1500 : 2500;

            const scrollTween = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: () => `+=${entranceDistance + pinnedDistance}`,
                    scrub: true,
                    invalidateOnRefresh: true,
                }
            });

            const startX = isMobile ? window.innerWidth * 0.3 : window.innerWidth;
            const midX = isMobile ? window.innerWidth * 0.2 : window.innerWidth * 0.5;

            scrollTween
                .fromTo(textRef, {
                    x: startX
                }, {
                    x: midX,
                    ease: "none",
                    duration: entranceDistance
                })
                .to(textRef, {
                    x: () => isMobile ?
                        -(textRef.scrollWidth * 0.6) :
                        -(textRef.scrollWidth - window.innerWidth * 0.5),
                    ease: "none",
                    duration: pinnedDistance
                });

            ScrollTrigger.create({
                trigger: container,
                start: "top top",
                end: () => `+=${pinnedDistance}`,
                pin: true,
                pinSpacing: true,
                invalidateOnRefresh: true
            });

            letters.forEach((letter) => {
                const bounceIntensity = isMobile ? 200 : 500;
                const rotationIntensity = isMobile ? 30 : 60;

                gsap.from(letter, {
                    yPercent: (Math.random() - 0.5) * bounceIntensity,
                    rotation: (Math.random() - 0.5) * rotationIntensity,
                    ease: "elastic.out(1.2, 1)",
                    scrollTrigger: {
                        trigger: letter,
                        containerAnimation: scrollTween,
                        start: 'left 120%',
                        end: 'left 75%',
                        scrub: true
                    }
                });
            });

            stickers.forEach((sticker) => {
                const bounceIntensity = isMobile ? 200 : 400;
                const rotationIntensity = isMobile ? 30 : 60;

                gsap.from(sticker, {
                    scale: 0,
                    yPercent: (Math.random() - 0.5) * bounceIntensity,
                    rotation: (Math.random() - 0.5) * rotationIntensity,
                    ease: "elastic.out(1.2, 1)",
                    scrollTrigger: {
                        trigger: sticker,
                        containerAnimation: scrollTween,
                        start: 'left 120%',
                        end: 'left 75%',
                        scrub: true
                    }
                });
            });

            arrows.forEach((arrowPath) => {
                if (arrowPath.getTotalLength) {
                    const pathLen = arrowPath.getTotalLength();
                    gsap.set(arrowPath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
                    gsap.to(arrowPath, {
                        strokeDashoffset: 0,
                        duration: 1,
                        scrollTrigger: {
                            trigger: arrowPath.parentElement,
                            containerAnimation: scrollTween,
                            start: 'left 90%',
                            end: 'left 50%',
                            scrub: true
                        }
                    });
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [sectionRef, relativeRef, arrowSvgRef, arrowEndSvgRef, stickerWatchRef, stickerCursorRef, stickerPhoneRef, lettersRef]);
}
