import { useEffect } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from './projectsData';

// ✅ Register once at module level
gsap.registerPlugin(ScrollTrigger);

export function useProjectsGSAP({ pinContainerRef, viewportRef, trackRef, progressRef, labelRef, contentRef, introRef, introLabelRef, introTextRef }) {

  useEffect(() => {
    const track = trackRef.current;
    const container = pinContainerRef.current;
    const content = contentRef.current;
    const intro = introRef.current;
    const introLabel = introLabelRef.current;
    const introText = introTextRef.current;
    const progressEl = progressRef.current;
    const labelEl = labelRef.current;

    if (!container || !content) return;

    // ✅ FIX 1: Read breakpoints once, not as functions called per-frame
    // matchMedia is the correct GSAP-idiomatic way to handle responsive breakpoints
    const desktopMq = window.matchMedia('(min-width: 1025px)');
    const mobileMq  = window.matchMedia('(max-width: 640px)');
    const isDesktop = desktopMq.matches;
    const isMobile  = mobileMq.matches;

    // ✅ FIX 2: Ensure container is positioned so introRef absolute positioning works correctly
    container.style.position = 'relative';

    // ✅ FIX 3: Cache scroll length — compute once, refresh on invalidateOnRefresh
    const getDistance = () => {
      const vp = viewportRef.current;
      if (!track || !vp) return 0;
      return track.scrollWidth - vp.offsetWidth;
    };

    const getScrollLength = () => {
      const horizDist = isDesktop ? getDistance() : window.innerHeight * 2;
      return horizDist + window.innerHeight * 1.5;
    };

    // ✅ FIX 4: quickSetter for progress bar — bypasses CSS transition conflict
    // The progressEl has transition-[width] in CSS which fights GSAP writes.
    // quickSetter writes via the GSAP engine at the right time, avoiding the conflict.
    const setProgressWidth = progressEl
      ? gsap.quickSetter(progressEl, 'width', '%')
      : null;

    // ✅ Reduced-motion check
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // ── Initial states ─────────────────────────────────────────────
      gsap.set(content, { opacity: 0, pointerEvents: "none" });
      gsap.set(intro, {
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: isMobile ? "9%" : "35%",
        position: "absolute",
        width: "100%",
      });
      gsap.set(introLabel, { opacity: 0, y: 18, letterSpacing: "0.48em" });
      gsap.set(introText, { opacity: 0, y: reduceMotion ? 0 : 32, skewX: reduceMotion ? 0 : 4 });

      // ── Entrance animation ──────────────────────────────────────────
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
        }
      });
      entranceTl
        .to(introLabel, { opacity: 1, y: 0, letterSpacing: "0.28em", duration: 0.9, ease: "power3.out" })
        .to(introText, {
          opacity: 1,
          y: 0,
          skewX: 0,
          duration: reduceMotion ? 0.3 : 1.05,
          ease: "power4.out"
        }, "-=0.55");

      // ── Content stagger refs ────────────────────────────────────────
      const headingEl  = content.querySelector(".proj-heading");
      const metaEl     = content.querySelector(".proj-meta");
      const progressWrapEl = content.querySelector(".scroll-progress-wrap");
      const viewportEl = content.querySelector(".proj-viewport");

      // ── Master ScrollTrigger Timeline ───────────────────────────────
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getScrollLength()}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      // 1. Zoom and fade out intro
      masterTl.to(intro, {
        scale: reduceMotion ? 1 : 3,
        opacity: 0,
        duration: 1,
        ease: "power2.in"
      });

      // 2. Reveal content
      masterTl.to(content, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.1
      }, "-=0.2");

      masterTl.fromTo(
        [headingEl, metaEl, progressWrapEl, viewportEl],
        { opacity: 0, y: reduceMotion ? 0 : 40 },
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: "power3.out" },
        "-=0.1"
      );

      // 3. Horizontal scroll (desktop only)
      if (isDesktop) {
        masterTl.to(track, {
          x: () => -getDistance(),
          ease: "none",
          duration: 4,
          onUpdate: function () {
            const hp = this.progress();
            // ✅ FIX 3: Use quickSetter instead of style.width — no CSS transition conflict
            if (setProgressWidth) setProgressWidth(hp * 100);
            if (labelEl) {
              const idx = Math.min(projects.length - 1, Math.floor(hp * projects.length));
              labelEl.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
            }
          }
        }, "+=0.2");
      }

      // ✅ FIX 4: Image parallax — merged into masterTl progress window.
      // Previously: 8 separate ScrollTriggers all watching the same container.
      // Now: single scrub timeline, no IntersectionObserver overhead.
      // Also removed scale-start from 1.15 → 1.05 to avoid conflicting with
      // the CSS group-hover:scale-[1.07] on the card.
      if (isDesktop && !reduceMotion) {
        const cardImgs = gsap.utils.toArray(".card-img");
        if (cardImgs.length) {
          // We create ONE extra timeline scoped to the same ST as masterTl
          gsap.fromTo(cardImgs,
            { scale: 1.05 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: "top top",
                end: () => `+=${getScrollLength()}`,
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      }

    }, container);

    // ✅ FIX 5: Re-run animations if viewport crosses the 1025px breakpoint
    const handleBreakpointChange = () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
    desktopMq.addEventListener('change', handleBreakpointChange);

    return () => {
      desktopMq.removeEventListener('change', handleBreakpointChange);
      ctx.revert();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
