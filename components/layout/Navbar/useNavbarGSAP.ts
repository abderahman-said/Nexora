"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { UseNavbarGSAPProps } from './types';

// Removed Lenis interface

gsap.registerPlugin(ScrollTrigger);

export function useNavbarGSAP({
  navRef,
  navInnerRef,
  logoRef,
  linksRef,
  ctaRef,
}: UseNavbarGSAPProps) {
  useEffect(() => {
    const nav = navRef.current;
    const navInner = navInnerRef.current;
    if (!nav || !navInner) return;

    // Reset navbar state on mount — clean state, no clearProps to avoid race conditions
    gsap.set(nav, { y: 0 });
    nav.classList.remove("is-floating");

    // Set navInner to visible at y:0 immediately
    gsap.set(navInner, { y: 0 });

    const ctx = gsap.context(() => {
      // 1. TEMPORARILY DISABLED - Entrance animation on initial load
      // const tl = gsap.timeline({ delay: 0.1 });
      // tl.from(navInner, { y: -20, duration: 0.8, ease: "power2.out" });
      // if (logoRef?.current) {
      //   tl.from(logoRef.current, { opacity: 0, x: -20, duration: 0.6, ease: "power3.out" }, "-=0.4");
      // }
      // if (linksRef?.current?.children?.length) {
      //   tl.from(linksRef.current.children, { opacity: 0, y: -10, duration: 0.5, stagger: 0.05, ease: "power3.out" }, "-=0.4");
      // }
      // if (ctaRef?.current) {
      //   tl.from(ctaRef.current, { opacity: 0, scale: 0.9, duration: 0.5, ease: "back.out(1.5)" }, "-=0.3");
      // }

      // 2. Smart Scroll Handling — مصدر واحد بس للـ scroll، بيتحدد مرة واحدة بعد ما يتأكد Lenis جاهز ولا لأ
      let lastScrollY = 0;
      let isHidden = false;
      // let usingLenis = false;
      let removeScrollListener: (() => void) | null = null;

      const getScrollY = () => {
        return window.scrollY;
      };

      const handleScroll = () => {
        const currentScrollY = Math.max(0, getScrollY());
        const diff = currentScrollY - lastScrollY;

        if (Math.abs(diff) < 3) {
          lastScrollY = currentScrollY;
          return;
        }

        if (currentScrollY <= 100) {
          nav.classList.remove("is-floating");
          // Always force show when near top — prevents stuck-hidden state
          if (isHidden || gsap.getProperty(nav, "y") !== 0) {
            gsap.killTweensOf(nav);
            gsap.to(nav, { y: 0, duration: 0.3, ease: "power2.out", overwrite: true });
            isHidden = false;
          }
        } else {
          nav.classList.add("is-floating");
          if (diff > 0 && !isHidden) {
            gsap.killTweensOf(nav);
            gsap.to(nav, { y: -140, duration: 0.35, ease: "power2.out", overwrite: true });
            isHidden = true;
          } else if (diff < 0 && isHidden) {
            gsap.killTweensOf(nav);
            gsap.to(nav, { y: 0, duration: 0.3, ease: "power2.out", overwrite: true });
            isHidden = false;
          }
        }

        lastScrollY = currentScrollY;
      };

      const attachScrollListener = () => {
        // نظّف أي listener قديم الأول
        removeScrollListener?.();

        // نزامن lastScrollY مع المصدر الفعلي قبل ما نبدأ نستمع، عشان منحسبش diff وهمي
        lastScrollY = Math.max(0, window.scrollY);

        window.addEventListener("scroll", handleScroll, { passive: true });
        removeScrollListener = () => window.removeEventListener("scroll", handleScroll);
      };

      // Sync initial scroll state — handles browser scroll restoration on fresh tab load
      const syncInitialScrollState = () => {
        const currentScrollY = Math.max(0, window.scrollY);
        lastScrollY = currentScrollY;
        if (currentScrollY > 100) {
          nav.classList.add("is-floating");
        } else {
          nav.classList.remove("is-floating");
          gsap.set(nav, { y: 0 });
          isHidden = false;
        }
      };

      // Run after a short delay to let browser complete scroll restoration
      const initTimer = setTimeout(syncInitialScrollState, 50);

      // في الأول، خد اللي متاح (غالبًا native، لأن Lenis لسه بيتعمله init)
      attachScrollListener();

      return () => {
        clearTimeout(initTimer);
        removeScrollListener?.();
      };
    }, navRef);

    return () => {
      ctx.revert();
    };
  }, [navRef, navInnerRef, logoRef, linksRef, ctaRef]);
}