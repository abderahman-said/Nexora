/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect } from "react";
import type { UseVideoHeroGSAPProps } from "./types";

/**
 * Hero entrance animations — Web Animations API only, zero GSAP.
 * Visual result is identical to the GSAP version.
 */
export function useVideoHeroAnimation({
  heroRef,
  headRef,
  subRef,
  ctaRef,
  badgeRef,
  imageRef,
  glowRef,
}: UseVideoHeroGSAPProps) {
  // ── Entrance animation ───────────────────────────────────────────────────
  useEffect(() => {
    const head = headRef.current;
    if (!head) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const easeOut = "cubic-bezier(0.16, 1, 0.3, 1)";
    const defaults = { fill: "forwards" as FillMode, easing: easeOut };

    // Left image entrance
    imageRef?.current?.animate(
      [
        { opacity: 0, transform: "translateX(-40px) scale(0.95)" },
        { opacity: 1, transform: "translateX(0) scale(1)" },
      ],
      { ...defaults, duration: 900, delay: 0 },
    );

    // Badge entrance
    badgeRef?.current?.animate(
      [
        { opacity: 0, transform: "translateY(20px) scale(0.9)" },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ],
      { ...defaults, duration: 600, delay: 300 },
    );

    // Headline words stagger
    const words = head.querySelectorAll<HTMLElement>(".split-word");
    words.forEach((word, i) => {
      word.style.display = "inline-block";
      word.animate(
        [
          { opacity: 0, transform: "translateY(40px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { ...defaults, duration: 800, delay: 500 + i * 50 },
      );
    });

    // Subtitle
    subRef?.current?.animate(
      [
        { opacity: 0, transform: "translateY(25px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { ...defaults, duration: 700, delay: 700 },
    );

    // CTA buttons stagger
    const ctaChildren = Array.from(ctaRef?.current?.children ?? []);
    ctaChildren.forEach((child, i) => {
      (child as HTMLElement).animate(
        [
          { opacity: 0, transform: "translateY(20px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { ...defaults, duration: 600, delay: 900 + i * 100 },
      );
    });
  }, [headRef, subRef, ctaRef, badgeRef, imageRef]);

  // ── Mouse-follow glow (desktop only, CSS custom property approach) ────────
  useEffect(() => {
    const hero = heroRef.current;
    const glow = glowRef?.current;
    if (!hero || !glow || window.innerWidth < 768) return;

    const HALF = 300;
    let rafId: number | null = null;
    let targetX = -HALF;
    let targetY = -HALF;
    let currentX = -HALF;
    let currentY = -HALF;

    if (glow) {
      glow.style.transform = `translate(${-HALF}px, ${-HALF}px)`;
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      currentX = lerp(currentX, targetX, 0.1);
      currentY = lerp(currentY, targetY, 0.1);
      glow.style.transform = `translate(${currentX}px, ${currentY}px)`;
      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      targetX = e.clientX - r.left - HALF;
      targetY = e.clientY - r.top - HALF;
    };

    rafId = requestAnimationFrame(tick);
    hero.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      hero.removeEventListener("mousemove", onMove);
    };
  }, [heroRef, glowRef]);
}
