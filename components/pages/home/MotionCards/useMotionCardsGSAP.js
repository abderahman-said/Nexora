import { useEffect, useCallback } from "react";
import gsap from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(InertiaPlugin, ScrollTrigger);

export function useMotionCardsGSAP({ sectionRef, cardsRef, blobRef, labelsRef }) {
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
                            scrub: true
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
                            scrub: true
                        }
                    }
                );

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
                            scrub: true
                        },
                        onComplete: () => {
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
                            scrub: true
                        }
                    }
                );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, [sectionRef, cardsRef, blobRef, labelsRef, createCardHandlers, createLabelHandlers]);
}
