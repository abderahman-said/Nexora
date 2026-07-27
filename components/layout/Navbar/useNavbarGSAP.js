import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useNavbarGSAP({
  navRef,
  navInnerRef,
  logoRef,
  linksRef,
  ctaRef,
}) {
  useEffect(() => {
    const nav = navRef.current;
    const navInner = navInnerRef.current;
    if (!nav || !navInner) return;

    const ctx = gsap.context(() => {
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
          "-=0.8",
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
          "-=0.8",
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
          "-=0.6",
        );
      }

      let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;

        // Toggle floating glassmorphism style past top hero area
        if (currentScrollY > 80) {
          nav.classList.add("is-floating");
        } else {
          nav.classList.remove("is-floating");
        }

        // Smooth Hide / Show logic:
        // 1. Always show when at or near top
        if (currentScrollY <= 80) {
          gsap.to(nav, {
            yPercent: 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
        // 2. Hide when scrolling DOWN past 80px
        else if (scrollDelta > 5) {
          gsap.to(nav, {
            yPercent: -130,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
        // 3. Show when scrolling UP
        else if (scrollDelta < -5) {
          gsap.to(nav, {
            yPercent: 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        }

        lastScrollY = Math.max(0, currentScrollY);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }, navRef);

    return () => ctx.revert();
  }, [navRef, navInnerRef, logoRef, linksRef, ctaRef]);
}
