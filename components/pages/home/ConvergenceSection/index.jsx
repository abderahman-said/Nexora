"use client";

import React, { useRef, useLayoutEffect } from "react";
import { phrases } from "./convergenceData";
import { useStarfieldCanvas } from "./useStarfieldCanvas";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ConvergenceSection = () => {
    const triggerRef    = useRef(null);
    const wrapperRef    = useRef(null);
    const finalTextRef  = useRef(null);
    const canvasRef     = useRef(null);
    const flashRef      = useRef(null);
    const gradientRef   = useRef(null);
    const textRefs      = useRef([]);

    useStarfieldCanvas(canvasRef);

    useLayoutEffect(() => {
        const trigger    = triggerRef.current;
        const wrapper    = wrapperRef.current;
        const finalText  = finalTextRef.current;
        const canvas     = canvasRef.current;
        const flash      = flashRef.current;
        const gradient   = gradientRef.current;
        const allTexts   = textRefs.current.filter(Boolean);

        if (!trigger || !wrapper || !finalText || !flash || allTexts.length === 0) return;

        const ctx = gsap.context(() => {
            // --- INITIAL STATES ---
            gsap.set(wrapper,  { backgroundColor: "#ffffff" });
            gsap.set(canvas,   { opacity: 0 });
            gsap.set(gradient, { opacity: 0 });
            gsap.set(flash,    { opacity: 0 });

            gsap.set(allTexts, { opacity: 0, scale: 0.5, filter: "blur(10px)", color: "#0A2463" });
            gsap.set(allTexts[0], { opacity: 1, scale: 1, filter: "blur(0px)" });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger,
                    start: "top top",
                    end: "+=500%",
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // PHASE 0: White → Space
            tl.addLabel("start");
            tl.to(wrapper, { backgroundColor: "#020617", duration: 0.8, ease: "power2.inOut" }, 0);
            tl.to(allTexts[0], { color: "#ffffff", scale: 1.5, duration: 0.8, ease: "power2.inOut" }, 0);
            tl.to(allTexts[0], { scale: 6, opacity: 0, filter: "blur(20px)", duration: 0.5, ease: "power1.in" }, 0.8);
            tl.to([canvas, gradient], { opacity: 0.8, duration: 0.8, ease: "power2.inOut" }, 0.2);
            tl.addLabel("phase1");

            // PHASE 1: Text Tunnel
            const stepDuration = 1.8;
            allTexts.forEach((text, i) => {
                if (i === 0) return;
                const startTime = 1.0 + (i - 1) * stepDuration;
                gsap.set(text, { color: "#ffffff" });

                tl.fromTo(text,
                    { scale: 0.2, opacity: 0, filter: "blur(10px)" },
                    { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
                    startTime
                );
                tl.to(text, { scale: 1.2, duration: 0.4 }, startTime + 0.8);
                tl.to(text, { scale: 6, opacity: 0, filter: "blur(20px)", duration: 0.8, ease: "power1.in" }, startTime + 1.2);
            });

            // PHASE 2: Final text reveal
            const contactTime = 1.0 + (allTexts.length - 1) * stepDuration;
            tl.addLabel("contact_approach");

            tl.fromTo(finalText,
                { scale: 0.5, opacity: 0, filter: "blur(10px)" },
                { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "back.out(1.2)" },
                contactTime + 0.3
            );
            tl.addLabel("final_text");
            tl.to(finalText, { scale: 1.2, opacity: 0, filter: "blur(20px)", duration: 0.8, ease: "power2.in" }, contactTime + 2.0);

            // PHASE 3: Flash out
            const flashTime = contactTime + 3.0;
            tl.to(flash, { opacity: 1, duration: 0.8, ease: "power2.in" }, flashTime);
            tl.to(wrapper, { backgroundColor: "#ffffff", duration: 0.1 }, flashTime + 0.5);
            tl.to([canvas, gradient], { opacity: 0, duration: 0.5 }, flashTime + 0.5);
            tl.addLabel("end");
        }, trigger);

        return () => ctx.revert();
    }, []);

    const setTextRef = (el, i) => {
        textRefs.current[i] = el;
    };

    return (
        <div ref={triggerRef} className="relative w-full h-screen overflow-hidden" suppressHydrationWarning>
            {/* Background wrapper */}
            <div ref={wrapperRef} className="absolute inset-0 z-0" suppressHydrationWarning>
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0 }} suppressHydrationWarning />
                <div ref={gradientRef} className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-blue-900/20 pointer-events-none mix-blend-screen" style={{ opacity: 0 }} suppressHydrationWarning />
            </div>

            {/* Animated phrases */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                {phrases.map((phrase, i) => (
                    <h2
                        key={i}
                        ref={el => setTextRef(el, i)}
                        className="absolute text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black text-center whitespace-nowrap drop-shadow-[0_0_20px_rgba(56,189,248,0.8)]"
                        style={{ opacity: i === 0 ? 1 : 0 }}
                        suppressHydrationWarning
                    >
                        {phrase}
                    </h2>
                ))}
            </div>

            {/* Final reveal text */}
            <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none" suppressHydrationWarning>
                <h1
                    ref={finalTextRef}
                    className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-transparent pb-5 bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white drop-shadow-[0_0_40px_rgba(37,99,235,1)]"
                    style={{ opacity: 0 }}
                    suppressHydrationWarning
                >
                    صافح طموحك
                </h1>
            </div>

            {/* Flash overlay */}
            <div
                ref={flashRef}
                className="absolute inset-0 bg-white z-50 pointer-events-none"
                style={{ opacity: 0 }}
                suppressHydrationWarning
            />
        </div>
    );
};

export default ConvergenceSection;