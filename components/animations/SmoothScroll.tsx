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
    let handleVisibility: (() => void) | null = null;

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

    return () => {
      if (handleVisibility)
        document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return null;
}
