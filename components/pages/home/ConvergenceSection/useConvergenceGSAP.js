import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function useConvergenceGSAP({
    triggerRef,
    wrapperRef,
    manRef,
    robotRef,
    finalTextRef,
    canvasRef,
    flashRef,
    gradientOverlayRef
}) {
    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=500%",
                    scrub: true,
                    pin: true,
                    invalidateOnRefresh: true,
                    snap: {
                        snapTo: "labels",
                        duration: { min: 0.2, max: 0.8 },
                        delay: 0.1,
                        ease: "power1.inOut",
                    },
                },
            });

            // --- INITIAL STATES ---
            gsap.set(wrapperRef.current, { backgroundColor: "#ffffff" });
            gsap.set(canvasRef.current, { opacity: 0 });
            gsap.set(gradientOverlayRef.current, { opacity: 0 });
            gsap.set(manRef.current, { y: "-180%", rotation: 0, opacity: 0 });
            gsap.set(robotRef.current, { y: "180%", rotation: 0, opacity: 0 });

            // Handle Initial Text States
            const allTexts = gsap.utils.toArray('.convergence-text');
            if (allTexts && allTexts.length > 0) {
                gsap.set(allTexts, { color: "#0A2463", opacity: 0, scale: 0.5, filter: "blur(10px)" });
                gsap.set(allTexts[0], {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    color: "#0A2463",
                    z: 0,
                });
            }

            // --- PHASE 0: THE TRANSITION (White to Space) ---
            tl.addLabel("start");

            const transitionDuration = 0.8;

            tl.to(
                wrapperRef.current,
                {
                    backgroundColor: "#020617",
                    duration: transitionDuration,
                    ease: "power2.inOut",
                },
                0,
            );

            if (allTexts && allTexts[0]) {
                tl.to(
                    allTexts[0],
                    {
                        color: "#ffffff",
                        scale: 1.5,
                        duration: transitionDuration,
                        ease: "power2.inOut",
                    },
                    0,
                );
                tl.to(
                    allTexts[0],
                    {
                        scale: 6,
                        opacity: 0,
                        filter: "blur(20px)",
                        duration: 0.5,
                        ease: "power1.in",
                    },
                    transitionDuration,
                );
            }

            tl.to(
                [canvasRef.current, gradientOverlayRef.current],
                {
                    opacity: 0.8,
                    duration: transitionDuration,
                    ease: "power2.inOut",
                },
                0.2,
            );

            tl.addLabel("phase1");

            // --- PHASE 1: Text Tunnel & Approach ---
            const texts = allTexts || [];
            const phaseOneStart = 1.0;

            texts.forEach((text, i) => {
                if (i === 0) return;

                const stepDuration = 1.8;
                const startTime = phaseOneStart + (i - 1) * stepDuration;

                gsap.set(text, { color: "#ffffff" });

                tl.fromTo(
                    text,
                    { scale: 0.2, opacity: 0, filter: "blur(10px)", z: -1000 },
                    {
                        scale: 1,
                        opacity: 1,
                        filter: "blur(0px)",
                        z: 0,
                        duration: 0.8,
                        ease: "power2.out",
                    },
                    startTime,
                )
                    .addLabel(`text_${i}`)
                    .to(text, { scale: 1.2, duration: 0.4 }, startTime + 0.8)
                    .to(
                        text,
                        {
                            scale: 6,
                            opacity: 0,
                            filter: "blur(20px)",
                            duration: 0.8,
                            ease: "power1.in",
                        },
                        startTime + 1.2,
                    );

                tl.to(
                    manRef.current,
                    {
                        y: `${-180 + (i + 1) * (165 / texts.length)}%`,
                        rotation: i % 2 === 0 ? 3 : -3,
                        duration: stepDuration,
                        ease: "power1.inOut",
                    },
                    startTime,
                );

                tl.to(
                    robotRef.current,
                    {
                        y: `${180 - (i + 1) * (165 / texts.length)}%`,
                        rotation: i % 2 === 0 ? -3 : 3,
                        duration: stepDuration,
                        ease: "power1.inOut",
                    },
                    startTime,
                );

                if (i === 1) {
                    tl.to([manRef.current, robotRef.current], { opacity: 1, duration: 1.0, ease: "power2.out" }, startTime);
                }
            });

            const contactTime = phaseOneStart + (texts.length - 1) * 1.8;
            tl.addLabel("contact_approach");

            const getManX1 = () => window.innerWidth >= 1280 ? "4%" : "18%";
            const getRobotX1 = () => window.innerWidth >= 1280 ? "-10%" : "-22%";

            tl.to(manRef.current, { y: "-15%", x: getManX1, rotation: 0, duration: 1.5, ease: "power2.out" }, contactTime);
            tl.to(robotRef.current, { y: "15%", x: getRobotX1, rotation: 0, duration: 1.5, ease: "power2.out" }, contactTime);

            tl.fromTo(
                finalTextRef.current,
                { scale: 0.5, opacity: 0, filter: "blur(10px)" },
                {
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1.2,
                    ease: "back.out(1.2)",
                },
                contactTime + 0.3,
            );

            tl.addLabel("final_text");

            tl.to(
                finalTextRef.current,
                {
                    scale: 1.2,
                    opacity: 0,
                    filter: "blur(20px)",
                    duration: 0.8,
                    ease: "power2.in",
                },
                contactTime + 2.0,
            );

            const touchTime = contactTime + 2.5;
            const flashTime = touchTime + 0.8;

            const getManX2 = () => window.innerWidth >= 1280 ? "4%" : "12%";
            const getRobotX2 = () => window.innerWidth >= 1280 ? "-10%" : "-15%";

            tl.to(manRef.current, { y: "20%", x: getManX2, rotation: 0, duration: 1.2, ease: "power1.inOut" }, touchTime);
            tl.to(robotRef.current, { y: "-22%", x: getRobotX2, rotation: 0, duration: 1.2, ease: "power1.inOut" }, touchTime);

            tl.to(
                flashRef.current,
                {
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.in",
                },
                flashTime,
            );

            tl.to(
                wrapperRef.current,
                {
                    backgroundColor: "#ffffff",
                    duration: 0.1,
                },
                flashTime + 0.5,
            );
            tl.to(
                [canvasRef.current, gradientOverlayRef.current],
                {
                    opacity: 0,
                    duration: 0.5,
                },
                flashTime + 0.5,
            );
            tl.set([manRef.current, robotRef.current], { opacity: 0 }, flashTime + 0.8);

            tl.addLabel("end");
        },
        { scope: triggerRef },
    );
}
