import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useFooterGSAP({ footerRef, infoRef, bgWordRef }) {
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (infoRef.current) {
                gsap.from(infoRef.current.children || [], {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "power3.out",
                    scrollTrigger: { trigger: footerRef.current, start: "top 65%" },
                });
            }

            const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;
            
            if (bgWordRef.current && !reduceMotion) {
                gsap.fromTo(
                    bgWordRef.current,
                    { autoAlpha: 0, scale: 0.94 },
                    {
                        autoAlpha: 1,
                        scale: 1,
                        duration: 1.4,
                        ease: "power2.out",
                        scrollTrigger: { trigger: footerRef.current, start: "top 85%" },
                    }
                );
            }
        }, footerRef);

        return () => ctx.revert();
    }, [footerRef, infoRef, bgWordRef]);
}
