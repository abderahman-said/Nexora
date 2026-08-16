"use client";

import { useEffect } from "react";
import type { UseNavbarScrollProps } from "./types";

export function useNavbarScroll({ navRef }: UseNavbarScrollProps) {
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let lastScrollY = window.scrollY;
    let isHidden = false;
    let rafId: number | null = null;

    const applyScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);
      const diff = currentScrollY - lastScrollY;

      // Ignore minor jitter scrolls (less than 5px)
      if (Math.abs(diff) < 5) {
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY <= 50) {
        if (isHidden) {
          nav.style.transform = "translateY(0px)";
          isHidden = false;
        }
      } else {
        if (diff > 0 && !isHidden) {
          // Hide when scrolling down
          nav.style.transform = "translateY(-100%)";
          isHidden = true;
        } else if (diff < 0 && isHidden) {
          // Show when scrolling up
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

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navRef]);
}
