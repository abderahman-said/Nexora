'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HorizontalWords = () => {
    const sectionRef = useRef(null);
    const relativeRef = useRef(null);
    const arrowSvgRef = useRef(null);
    const arrowEndSvgRef = useRef(null);
    const stickerWatchRef = useRef(null);
    const stickerCursorRef = useRef(null);
    const stickerPhoneRef = useRef(null);
    const lettersRef = useRef([]);
    lettersRef.current = [];

    const addLetterRef = (el) => {
        if (el && !lettersRef.current.includes(el)) {
            lettersRef.current.push(el);
        }
    };

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
                    scrub: 1,
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
                        start: 'left 90%',
                        end: 'left 50%',
                        scrub: 0.5
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
                        start: 'left 90%',
                        end: 'left 50%',
                        scrub: 0.5
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
                            scrub: 0.5
                        }
                    });
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const text = "Elevating digital experiences with Nexora";

    return (
        <section
            ref={sectionRef}
            className="content-section relative w-full h-screen max-[768px]:min-h-[600px] bg-[var(--bg-color)] overflow-hidden"
        >
            <div
                ref={relativeRef}
                className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap flex items-center
                px-[25vw] max-[1024px]:px-[15vw] max-[768px]:px-[10vw] max-[480px]:px-[5vw]"
            >
                <div className="w-full relative">
                    <svg
                        ref={arrowSvgRef}
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        viewBox="0 0 386 127"
                        fill="none"
                        className="absolute bottom-full left-1/2 text-brand-cyan
                        w-[23.75em] max-[1024px]:w-[18em] max-[768px]:w-[12em] max-[480px]:w-[10em]
                        [transform:translate(-160%,-35%)] max-[768px]:[transform:translate(-140%,-30%)]"
                    >
                        <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>

                    <img
                        ref={stickerWatchRef}
                        src="/assets/HorizontalWords SVG/horizontal-words-sticker-thumps-up.svg"
                        className="absolute top-1/2 z-10
                        w-[6em] max-[1024px]:w-[5em] max-[768px]:w-[4em] max-[480px]:w-[3.5em]
                        left-[17.5%] max-[768px]:left-[20%]
                        [transform:translate(-50%,-110%)] max-[768px]:[transform:translate(-50%,-90%)]"
                        alt="thumbs up sticker"
                    />
                    <img
                        ref={stickerCursorRef}
                        src="/assets/HorizontalWords SVG/horizontal-words-sticker-cursor.svg"
                        className="absolute top-1/2 left-1/2 z-10
                        w-[7.5em] max-[1024px]:w-[5em] max-[768px]:w-[4em] max-[480px]:w-[3.5em]
                        [transform:translate(-50%,10%)] max-[768px]:[transform:translate(-50%,15%)]"
                        alt="cursor sticker"
                    />
                    <img
                        ref={stickerPhoneRef}
                        src="/assets/HorizontalWords SVG/horizontal-words-sticker-phone.svg"
                        className="absolute top-1/2 z-10
                        w-[8em] max-[1024px]:w-[5em] max-[768px]:w-[4.5em] max-[480px]:w-[3.5em]
                        left-[79%] max-[768px]:left-[85%]
                        [transform:translate(-50%,-100%)] max-[768px]:[transform:translate(-50%,-80%)]"
                        alt="phone sticker"
                    />

                    <svg
                        ref={arrowEndSvgRef}
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        viewBox="0 0 140 127"
                        fill="none"
                        className="absolute top-1/2 left-full text-brand-blue
                        w-[8.4375em] max-[1024px]:w-[6em] max-[768px]:w-[4em] max-[480px]:w-[3.5em]
                        [transform:translate(50%)]"
                    >
                        <path d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.437 125.078L99.6875 107.891" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.438 125.078L137.969 110.234" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>

                    <h2
                        className="display relative z-[2] whitespace-nowrap lowercase m-0 leading-none
                        text-[9vw] max-[1024px]:text-[8vw] max-[768px]:text-[6vw] max-[480px]:text-[5.5vw]
                        font-[1000] max-[768px]:font-[800]"
                        aria-label={text}
                    >
                        {text.split("").map((char, i) =>
                            char === " " ? (
                                <React.Fragment key={i}> </React.Fragment>
                            ) : (
                                <div
                                    key={i}
                                    ref={addLetterRef}
                                    className="relative inline-block"
                                    aria-hidden="true"
                                >
                                    {char}
                                </div>
                            )
                        )}
                    </h2>
                </div>
            </div>

            <div
                className="absolute left-1/2 top-1/2 z-20 w-max text-center flex flex-col items-center
                [transform:translate(-50%,9em)] max-[768px]:[transform:translate(-50%,6em)]"
            >
                <div
                    className="m-0
                    max-w-[40em] max-[1024px]:max-w-[35em] max-[768px]:max-w-[90vw]
                    text-[1.3rem] max-[1024px]:text-[1.1rem] max-[768px]:text-[0.9rem] max-[480px]:text-[0.85rem]
                    leading-[1.4] max-[768px]:leading-[1.3]
                    font-[450]
                    max-[768px]:px-[20px] max-[480px]:px-[15px]"
                >
                    We are passionate digital architects dedicated to pushing the boundaries<br />
                    of web design. By blending creative aesthetics with clean, efficient code,<br />
                    we build scalable solutions that leave a lasting impression.
                </div>
            </div>
        </section>
    );
};

export default HorizontalWords;