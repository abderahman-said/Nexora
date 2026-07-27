import { useEffect } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from './projectsData';

// ✅ Register once at module level
gsap.registerPlugin(ScrollTrigger);

export function useProjectsGSAP({ pinContainerRef, viewportRef, trackRef, progressRef, labelRef, contentRef }) {

  useEffect(() => {
    const track = trackRef.current;
    const container = pinContainerRef.current;
    const viewport = viewportRef.current;
    const content = contentRef.current;
    const progressEl = progressRef.current;
    const labelEl = labelRef.current;

    if (!container || !content || !track || !viewport) return;

    const desktopMq = window.matchMedia('(min-width: 1025px)');
    const isDesktop = desktopMq.matches;

    container.style.position = 'relative';

    const setProgressWidth = progressEl
      ? gsap.quickSetter(progressEl, 'width', '%')
      : null;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // ── Initial state: Content is immediately visible ─────────────────────────────
      gsap.set(content, { opacity: 1, pointerEvents: "auto" });

      // ── Mobile / Tablet: No horizontal pin, normal vertical grid scroll ─────────────
      if (!isDesktop) return;

      const getDistance = () => {
        if (!track || !viewport) return 0;
        // vp.clientWidth is width inside padding (72px left + 72px right)
        // track.scrollWidth - vp.clientWidth ensures Card 10 ends exactly 72px from right edge
        return Math.max(0, track.scrollWidth - viewport.clientWidth);
      };

      const getScrollLength = () => {
        return getDistance() + window.innerHeight * 0.5;
      };

      // ── Master ScrollTrigger Timeline for Horizontal Scroll (Desktop) ─────────────
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${getScrollLength()}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      masterTl.to(track, {
        x: () => -getDistance(),
        ease: "none",
        duration: 4,
        onUpdate: function () {
          const hp = this.progress();
          if (setProgressWidth) setProgressWidth(hp * 100);
          if (labelEl) {
            const idx = Math.min(projects.length - 1, Math.floor(hp * projects.length));
            labelEl.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
          }
        }
      });

      // Parallax effect on card images
      if (!reduceMotion) {
        const cardImgs = gsap.utils.toArray(".card-img");
        if (cardImgs.length) {
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

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const handleBreakpointChange = () => {
      ScrollTrigger.refresh();
    };
    desktopMq.addEventListener('change', handleBreakpointChange);

    return () => {
      clearTimeout(timer);
      desktopMq.removeEventListener('change', handleBreakpointChange);
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

