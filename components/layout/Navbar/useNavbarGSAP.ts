import { useEffect, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface UseNavbarGSAPProps {
  navRef: RefObject<HTMLElement | null>;
  navInnerRef: RefObject<HTMLElement | null>;
  logoRef?: RefObject<HTMLElement | null>;
  linksRef?: RefObject<HTMLElement | null>;
  ctaRef?: RefObject<HTMLElement | null>;
}

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

    // Reset navbar state on mount
    gsap.set(nav, { y: 0, clearProps: "y" });
    nav.classList.remove("is-floating");

    const ctx = gsap.context(() => {
      // 1. Entrance animation on initial load
      const tl = gsap.timeline({ delay: 0.1 });

      tl.from(navInner, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
      });

      if (logoRef?.current) {
        tl.from(
          logoRef.current,
          {
            opacity: 0,
            x: -20,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        );
      }

      if (linksRef?.current?.children?.length) {
        tl.from(
          linksRef.current.children,
          {
            opacity: 0,
            y: -15,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.8"
        );
      }

      if (ctaRef?.current) {
        tl.from(
          ctaRef.current,
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: "back.out(1.5)",
          },
          "-=0.6"
        );
      }

      // 2. Smart Scroll Handling
      let lastScrollY =
        typeof window !== "undefined"
          ? Math.max(0, (window as any).__lenis ? (window as any).__lenis.scroll : window.scrollY)
          : 0;
      let isHidden = false;

      const handleScroll = () => {
        const currentScrollY = Math.max(
          0,
          typeof window !== "undefined"
            ? (window as any).__lenis
              ? (window as any).__lenis.scroll
              : window.scrollY
            : 0
        );

        const diff = currentScrollY - lastScrollY;

        // Prevent tiny jitter from triggering hide/show
        if (Math.abs(diff) < 3) return;

        if (currentScrollY <= 60) {
          nav.classList.remove("is-floating");
          if (isHidden) {
            gsap.to(nav, {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto",
            });
            isHidden = false;
          }
        } else {
          nav.classList.add("is-floating");

          if (diff > 0 && !isHidden) {
            gsap.to(nav, {
              y: -140,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
            isHidden = true;
          } else if (diff < 0 && isHidden) {
            gsap.to(nav, {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto",
            });
            isHidden = false;
          }
        }

        lastScrollY = currentScrollY;
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      if (typeof window !== "undefined" && (window as any).__lenis) {
          (window as any).__lenis.on('scroll', handleScroll);
      }

      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (typeof window !== "undefined" && (window as any).__lenis) {
            (window as any).__lenis.off('scroll', handleScroll);
        }
      };
    }, navRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [navRef, navInnerRef, logoRef, linksRef, ctaRef]);
}
