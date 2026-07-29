import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { UseFooterGSAPProps } from './types';

gsap.registerPlugin(ScrollTrigger);

export function useFooterGSAP({ footerRef, columnsRef, sidePanelRef, bgRef }: UseFooterGSAPProps) {
  useEffect(() => {
    if (!footerRef.current) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // 1. Staggered reveal for footer columns
      if (columnsRef.current) {
        const columnItems = Array.from(columnsRef.current.children);
        gsap.fromTo(
          columnItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      // 2. Entrance animation for the side CTA panel
      if (sidePanelRef.current) {
        gsap.fromTo(
          sidePanelRef.current,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      // 3. Subtle GPU-accelerated background parallax
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, [footerRef, columnsRef, sidePanelRef, bgRef]);
}
