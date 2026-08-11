/* eslint-disable react-hooks/immutability */
"use client";

import { useEffect } from "react";
import type { UseVideoHeroGSAPProps } from "./types";

/**
 * Hero entrance animations — Web Animations API only, zero GSAP.
 * Visual result is identical to the GSAP version.
 */
export function useVideoHeroAnimation(_props: UseVideoHeroGSAPProps) {
  const { heroRef, glowRef } = _props;
  // ── Entrance animation removed per user request ──────────────────────────

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
