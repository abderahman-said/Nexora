"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let tickerFn: ((time: number) => void) | null = null;
    let handleVisibility: (() => void) | null = null;

    const timer = setTimeout(() => {
      // Disable Lenis on mobile/touch devices for native 120fps touch scrolling & zero CPU overhead
      if (
        window.innerWidth < 768 ||
        window.matchMedia("(pointer: coarse)").matches
      ) {
        return;
      }

      lenis = new Lenis({
        duration: 0.75,        // snappier feel — was 0.9 which felt laggy
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        wheelMultiplier: 0.9,  // slightly reduced to prevent over-scroll feel
        touchMultiplier: 1.5,
      });

      lenis.on("scroll", ScrollTrigger.update);

      tickerFn = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      window.__lenis = lenis;

      let savedTitle = "";
      handleVisibility = () => {
        if (document.hidden) {
          savedTitle = document.title;
          document.title = "Hey, over here!👋 - Nexora";
        } else if (savedTitle) {
          document.title = savedTitle;
        }
      };
      document.addEventListener("visibilitychange", handleVisibility);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (tickerFn) gsap.ticker.remove(tickerFn);
      if (lenis) lenis.destroy();
      if (handleVisibility)
        document.removeEventListener("visibilitychange", handleVisibility);
      delete window.__lenis;
    };
  }, []);

  return null;
}
