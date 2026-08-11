"use client";

import { useEffect } from "react";

// Type declaration only — referenced by TransitionScribble.tsx
declare global {
  interface Window {
    __lenis?: { scrollTo: (target: number, opts?: object) => void };
  }
}


/**
 * Lightweight tab-visibility title switcher.
 * All GSAP / Lenis / ScrollTrigger references removed.
 */
export default function SmoothScroll() {
  useEffect(() => {
    let savedTitle = "";

    const handleVisibility = () => {
      if (document.hidden) {
        savedTitle = document.title;
        document.title = "Hey, over here!👋 - Nexora";
      } else if (savedTitle) {
        document.title = savedTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return null;
}
