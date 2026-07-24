"use client";

import gsap from "gsap";
import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(InertiaPlugin, ScrollTrigger);

export default function MotionCards() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const cardsRef = useRef(null);
    const blobRef = useRef(null);
    const labelsRef = useRef(null);

    const createCardHandlers = useCallback((card) => {
        let lastX = 0;
        let lastY = 0;
        let speedX = 0;
        let speedY = 0;

        const startRotation = gsap.getProperty(card, "rotation");
        const startX = gsap.getProperty(card, "x");
        const startY = gsap.getProperty(card, "y");

        const onMove = (e) => {
            speedX = e.clientX - lastX;
            speedY = e.clientY - lastY;
            lastX = e.clientX;
            lastY = e.clientY;
        };

        const onEnter = (e) => {
            speedX = 0;
            speedY = 0;
            lastX = e.clientX;
            lastY = e.clientY;
        };

        const onLeave = () => {
            gsap.to(card, {
                inertia: {
                    x: { velocity: speedX * 20, end: startX },
                    y: { velocity: speedY * 20, end: startY },
                    rotation: { velocity: speedX * 1.5, end: startRotation },
                },
            });
        };

        return { onMove, onEnter, onLeave };
    }, []);

    const createLabelHandlers = useCallback((label) => {
        let lastX = 0;
        let lastY = 0;
        let speedX = 0;
        let speedY = 0;

        const startRotation = gsap.getProperty(label, "rotation");
        const startX = gsap.getProperty(label, "x");
        const startY = gsap.getProperty(label, "y");

        const onMove = (e) => {
            speedX = e.clientX - lastX;
            speedY = e.clientY - lastY;
            lastX = e.clientX;
            lastY = e.clientY;
        };

        const onEnter = (e) => {
            speedX = 0;
            speedY = 0;
            lastX = e.clientX;
            lastY = e.clientY;
        };

        const onLeave = () => {
            gsap.to(label, {
                inertia: {
                    x: { velocity: speedX * 15, end: startX },
                    y: { velocity: speedY * 15, end: startY },
                    rotation: { velocity: speedX * 1.2, end: startRotation },
                },
            });
        };

        return { onMove, onEnter, onLeave };
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Inertia on cards
            const cards = document.querySelectorAll(".js-card");
            cards.forEach((card) => {
                const { onMove, onEnter, onLeave } = createCardHandlers(card);
                card.addEventListener("mousemove", onMove);
                card.addEventListener("mouseenter", onEnter);
                card.addEventListener("mouseleave", onLeave);
            });

            // Inertia on floating labels
            const labels = document.querySelectorAll(".js-floating-label");
            labels.forEach((label) => {
                const { onMove, onEnter, onLeave } = createLabelHandlers(label);
                label.addEventListener("mousemove", onMove);
                label.addEventListener("mouseenter", onEnter);
                label.addEventListener("mouseleave", onLeave);
            });

            // Enhanced Entry Animations with creative text effects
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });

            // Animate title with split text effect
            const title = sectionRef.current.querySelector(".js-title");
            if (title) {
                // Split title into words for staggered animation
                const titleText = title.innerText;
                title.innerHTML = titleText.split(' ').map(word => 
                    `<span class="title-word" style="display: inline-block; opacity: 0; transform: translateY(100px) rotateX(90deg);">${word}</span>`
                ).join(' ');
                
                const titleWords = title.querySelectorAll('.title-word');
                tl.to(titleWords, {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power3.out"
                }, 0);
            }

            // Animate subtitle with typewriter effect
            const subtitle = sectionRef.current.querySelector(".js-subtitle");
            if (subtitle) {
                gsap.set(subtitle, { opacity: 0 });
                tl.to(subtitle, {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out"
                }, 0.6);
            }

            const topStickerImg = sectionRef.current.querySelector(".js-sticker-top img");
            if (topStickerImg) {
                gsap.set(topStickerImg, { scale: 0, opacity: 0, rotation: -30 });
                tl.to(topStickerImg, { scale: 1, opacity: 1, rotation: 0, duration: 1.7, ease: "elastic.out(1, 0.4)" }, 0);
            }

            const underlinePath = sectionRef.current.querySelector(".js-underline-path");
            if (underlinePath) {
                const pathLen = underlinePath.getTotalLength();
                gsap.set(underlinePath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
                tl.to(underlinePath, { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" }, 0.2);
            }

            // Cards staggered entrance
            const cardsContainer = cardsRef.current;
            if (cardsContainer) {
                const cards = cardsContainer.querySelectorAll(".js-card");
                gsap.fromTo(cards,
                    {
                        opacity: 0,
                        scale: 0.3,
                        rotation: () => Math.random() * 30 - 15,
                        y: 100
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        rotation: 0,
                        y: 0,
                        duration: 1.2,
                        ease: "elastic.out(1, 0.8)",
                        stagger: {
                            amount: 0.6,
                            from: "random"
                        },
                        scrollTrigger: {
                            trigger: cardsContainer,
                            start: "top 80%",
                            end: "top 30%",
                            scrub: 1.2
                        }
                    }
                );
            }

            // Blob animation
            const blob = blobRef.current;
            if (blob) {
                gsap.fromTo(blob,
                    {
                        opacity: 0,
                        scale: 0.5,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: blob,
                            start: "top 60%",
                            end: "top 30%",
                            scrub: 1.5
                        }
                    }
                );

                // Add floating animation to blob
                gsap.to(blob, {
                    y: -20,
                    duration: 4,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }

            // Enhanced floating labels with text animations
            const labelsContainer = labelsRef.current;
            if (labelsContainer) {
                const floatingLabels = labelsContainer.querySelectorAll(".js-floating-label");
                
                // Split text in labels for character-by-character animation
                floatingLabels.forEach(label => {
                    const text = label.querySelector('.js-floating-text');
                    if (text) {
                        const textContent = text.innerText;
                        text.innerHTML = textContent.split('').map((char, index) => 
                            `<span class="char" style="display: inline-block; opacity: 0; transform: translateY(50px) rotateZ(${Math.random() * 20 - 10}deg);">${char === ' ' ? '&nbsp;' : char}</span>`
                        ).join('');
                    }
                });
                
                gsap.fromTo(floatingLabels,
                    {
                        opacity: 0,
                        x: () => Math.random() * 200 - 100,
                        y: () => Math.random() * 100 - 50,
                        rotation: () => Math.random() * 20 - 10
                    },
                    {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        rotation: 0,
                        duration: 1.5,
                        ease: "power3.out",
                        stagger: {
                            amount: 0.8,
                            from: "random"
                        },
                        scrollTrigger: {
                            trigger: labelsContainer,
                            start: "top 80%",
                            end: "top 30%",
                            scrub: 1.3
                        },
                        onComplete: () => {
                            // Animate characters after label appears
                            floatingLabels.forEach(label => {
                                const chars = label.querySelectorAll('.char');
                                gsap.to(chars, {
                                    opacity: 1,
                                    y: 0,
                                    rotateZ: 0,
                                    duration: 0.6,
                                    stagger: 0.03,
                                    ease: "back.out(1.7)"
                                });
                            });
                        }
                    }
                );
            }

            // Footer text animation
            const footerText = sectionRef.current.querySelector(".js-description");
            if (footerText) {
                gsap.fromTo(footerText,
                    {
                        opacity: 0,
                        y: 50,
                        skewX: 5
                    },
                    {
                        opacity: 1,
                        y: 0,
                        skewX: 0,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: footerText,
                            start: "top 80%",
                            end: "top 40%",
                            scrub: 1.1
                        }
                    }
                );
            }

        }, sectionRef, createCardHandlers, createLabelHandlers);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full px-[60px] pt-[120px] pb-[20px] text-center overflow-hidden z-[1]" id="motion-card-section">
            {/* ─── Part 1: Bold Heading Text with SVG Sticker Placeholders ─── */}
            <div className="relative max-w-[1200px] mx-auto mb-[60px]">
                <h2 className="js-title font-epilogue text-[7rem] font-[750] leading-[0.9] tracking-[-5px] text-brand-dark mb-0 cursor-[url('/assets/Cursor_SVG/cursor-text.svg')_12_12,auto] gradient-title">
                    building digital
                    <br />
                    experiences.
                </h2>
                <p className="js-subtitle font-times italic font-normal text-[7.5rem] leading-[1.15] tracking-[-2px] text-brand-dark relative inline-block top-[-30px]">
                    from concept to code.
                    {/* SVG sticker placeholder — top-right area */}
                    <span className="js-sticker-top absolute inline-block pointer-events-none top-[-15px] right-[-25px] w-[150px] h-[80px] -rotate-12">
                        <img
                            src="/assets/Footer-Sticker SVG/footer-sticker-hands.svg"
                            alt="Green heart hands sticker"
                            className=""
                        />
                    </span>
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 634 28" fill="none" className="block max-w-[720px] -mt-[45px] mx-auto text-brand-dark h-auto">
                    <path className="js-underline-path" d="M2 26C41.0237 23.1556 79.9927 19.9419 118.634 15.5521C169.106 9.98633 227.314 2.42393 275.206 2C280.46 2.57436 264.768 4.99488 262.462 5.55556C257.837 6.43078 252.529 7.47009 247.317 8.59146C239.594 10.3556 212.496 15.8393 226.932 19.8051C239.594 22.6359 263.663 21.9521 280.978 21.3504C314.817 19.9829 349.311 16.7419 383.204 14.7863C465.931 9.5077 549.191 10.547 632 14.1436" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {/* ─── Part 2: Cards with Colorful Bars & Blue Blob ─── */}
            <div className="relative w-full max-w-[1100px] h-[450px] mx-auto mt-[40px] mb-[20px]">
                {/* Blue SVG blob behind everything */}
                <div ref={blobRef} className="absolute top-[36%] left-[50%] -translate-x-[131.5%] -translate-y-[45%] w-[580px] h-[500px] z-0 pointer-events-none">
                    <img
                        src="/assets/MotionCard SVG/motion-card-blob.svg"
                        alt=""
                        className="w-full h-full"
                    />
                </div>


                {/* 4 Photo Cards */}
                <div ref={cardsRef} className="relative flex items-center justify-center w-full h-full z-[2]">
                    <div className="js-card relative w-[18vw] h-[12vw] rounded-md overflow-clip shadow-[0_8px_30px_rgba(0,0,0,0.15)] shrink-0 -rotate-[6deg] -mr-[2vw] z-[1]">
                        <div className="w-full h-full bg-[#d9d2cb] rounded-md overflow-hidden">
                            <img
                                src="/assets/1.png"
                                loading="lazy"
                                width={1000}
                                height={1000}
                                alt=""
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                    </div>

                    <div className="js-card relative w-[18vw] h-[12vw] rounded-md overflow-clip shadow-[0_8px_30px_rgba(0,0,0,0.15)] shrink-0 rotate-[6deg] -mr-[2vw] z-[2] -left-[2rem] -bottom-[3rem]">
                        <div className="w-full h-full bg-[#d9d2cb] rounded-md overflow-hidden">
                            <img
                                src="/assets/2.png"
                                loading="lazy"
                                width={1000}
                                height={1000}
                                alt=""
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                    </div>

                    <div className="js-card relative w-[18vw] h-[12vw] rounded-md overflow-clip shadow-[0_8px_30px_rgba(0,0,0,0.15)] shrink-0 -rotate-[6deg] -mr-[2vw] z-[3] -left-[3rem]">
                        <div className="w-full h-full bg-[#d9d2cb] rounded-md overflow-hidden">
                            <img
                                src="/assets/3.png"
                                loading="lazy"
                                width={1000}
                                height={1000}
                                alt=""
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                    </div>

                    <div className="js-card relative w-[18vw] h-[12vw] rounded-md overflow-clip shadow-[0_8px_30px_rgba(0,0,0,0.15)] shrink-0 rotate-[4deg] -mr-[2vw] z-[4] -left-[3.5rem] -bottom-[2rem]">
                        <div className="w-full h-full bg-[#d9d2cb] rounded-md overflow-hidden">
                            <img
                                src="/assets/4.png"
                                loading="lazy"
                                width={1000}
                                height={1000}
                                alt=""
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                    </div>
                </div>

                {/* Floating labels — positioned freely over the cards area */}
                <div ref={labelsRef} className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
                    <div className="js-floating-label absolute py-[0.1vw] px-[0.5vw] rounded-full rounded-bl-none z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-auto bg-[#efbbd8] top-[31%] left-[30%]">
                        <p className="js-floating-text pointer-events-none m-0 font-sans text-[1rem] font-[450] text-brand-dark">pixel perfect precision</p>
                    </div>
                    <div className="js-floating-label absolute py-[0.1vw] px-[0.5vw] rounded-full rounded-bl-none z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-auto bg-[#f4825c] top-[69%] left-[48%]">
                        <p className="js-floating-text pointer-events-none m-0 font-sans text-[1rem] font-[450] text-brand-dark">performance is a priority</p>
                    </div>
                    <div className="js-floating-label absolute py-[0.1vw] px-[0.5vw] rounded-full rounded-bl-none z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-auto bg-[#dcec9d] top-[46%] left-[89%]">
                        <p className="js-floating-text pointer-events-none m-0 font-sans text-[1rem] font-[450] text-brand-dark">user experience = everything</p>
                    </div>
                </div>
            </div>

            {/* ─── Part 3: Bottom Paragraph Text ─── */}
            <div className="max-w-[550px] mx-auto text-center">
                <p className="js-description font-sans text-[1.3rem] font-normal leading-[1.7] text-brand-dark tracking-[-0.2px] cursor-[url('/assets/Cursor_SVG/cursor-text.svg')_12_12,auto]">
                    I craft high-performance, responsive web applications that bring your ideas to life. With expertise in React, Next.js, and modern styling, I bridge the gap between stunning visual design and flawless engineering.
                </p>
            </div>
        </section>
    );
}
