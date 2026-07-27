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

      const THRESHOLD = 15; // 15px threshold to prevent flickering during small scroll movements
      const PIN_THRESHOLD = 40; // below this scrollY, nav stays absolute (in-flow) at page top
      let lastScrollY =
        typeof window !== "undefined"
          ? Math.max(0, window.__lenis ? window.__lenis.scroll : window.scrollY)
          : 0;
      let accumulatedDown = 0;
      let accumulatedUp = 0;
      let isHidden = false;
      let isPinned = false; // true = position:fixed, false = position:absolute

      // Set position directly via inline style — bypasses any CSS specificity issues
      const setPinned = (pinned) => {
        if (pinned === isPinned) return;
        isPinned = pinned;
        nav.style.position = pinned ? "fixed" : "absolute";
      };

      // Initial position: absolute by default, matches whatever markup/CSS provides.
      nav.style.position = "absolute";

      // Sync initial state in case the page loads already scrolled down
      if (lastScrollY > PIN_THRESHOLD) {
        setPinned(true);
      }

      const checkScroll = () => {
        const currentScrollY = Math.max(
          0,
          typeof window !== "undefined"
            ? window.__lenis
              ? window.__lenis.scroll
              : window.scrollY
            : 0
        );
        const delta = currentScrollY - lastScrollY;

        // Apply subtle backdrop blur & shadow floating class ONLY after page is scrolled (> 40px)
        if (currentScrollY > 40) {
          nav.classList.add("is-floating");
        } else {
          nav.classList.remove("is-floating");
        }

        // Always show near top (<= PIN_THRESHOLD) and revert to absolute/in-flow
        if (currentScrollY <= PIN_THRESHOLD) {
          if (isHidden) {
            gsap.to(nav, {
              yPercent: 0,
              duration: 0.35,
              ease: "power2.out",
              overwrite: "auto",
            });
            isHidden = false;
          }
          setPinned(false);
          accumulatedDown = 0;
          accumulatedUp = 0;
        } else {
          if (delta > 0.5) {
            // Scrolling DOWN: accumulate movement and hide once threshold is reached
            accumulatedDown += delta;
            accumulatedUp = 0;

            if (accumulatedDown >= THRESHOLD && !isHidden && currentScrollY > 60) {
              gsap.to(nav, {
                yPercent: -130,
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto",
              });
              isHidden = true;
            }
          } else if (delta < -0.5) {
            // Scrolling UP: accumulate movement and reveal immediately, pinned to viewport
            accumulatedUp += Math.abs(delta);
            accumulatedDown = 0;

            if (accumulatedUp >= 10 && isHidden) {
              setPinned(true);
              gsap.to(nav, {
                yPercent: 0,
                duration: 0.35,
                ease: "power2.out",
                overwrite: "auto",
              });
              isHidden = false;
            }
          }
        }

        lastScrollY = currentScrollY;
      };

      // High-performance GSAP Ticker loop (runs on requestAnimationFrame for native & Lenis smooth scroll)
      gsap.ticker.add(checkScroll);

      return () => {
        gsap.ticker.remove(checkScroll);
      };
    }, navRef);

    return () => ctx.revert();
  }, [navRef, navInnerRef, logoRef, linksRef, ctaRef]);
}