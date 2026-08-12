"use client";

import { useEffect } from "react";
import type { UseNavbarScrollProps } from "./types";

/**
 * Navbar hide/show on scroll — pure CSS transitions, no GSAP.
 * Uses `transform: translateY` via inline style so the transition
 * declared on the <header> element handles the easing.
 */
export function useNavbarScroll({
  navRef,
}: UseNavbarScrollProps) {
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Ensure the element starts fully visible
    nav.style.transform = "translateY(0px)";
    nav.classList.remove("is-floating");

    let lastScrollY = 0;
    let isHidden = false;
    let rafId: number | null = null;

    const applyScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);
      const diff = currentScrollY - lastScrollY;

      if (Math.abs(diff) < 3) {
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY <= 100) {
        nav.classList.remove("is-floating");
        if (isHidden) {
          nav.style.transform = "translateY(0px)";
          isHidden = false;
        }
      } else {
        nav.classList.add("is-floating");
        if (diff > 0 && !isHidden) {
          nav.style.transform = "translateY(-140px)";
          isHidden = true;
        } else if (diff < 0 && isHidden) {
          nav.style.transform = "translateY(0px)";
          isHidden = false;
        }
      }

      lastScrollY = currentScrollY;
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        applyScroll();
      });
    };

    // Sync initial state after browser scroll restoration
    const initTimer = setTimeout(() => {
      const currentScrollY = Math.max(0, window.scrollY);
      lastScrollY = currentScrollY;
      if (currentScrollY > 100) {
        nav.classList.add("is-floating");
      } else {
        nav.classList.remove("is-floating");
        nav.style.transform = "translateY(0px)";
        isHidden = false;
      }
    }, 50);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(initTimer);
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navRef]);
}
