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
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      lenis.on("scroll", ScrollTrigger.update);

      tickerFn = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tickerFn);

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
