import { useEffect, useCallback } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from './projectsData';

gsap.registerPlugin(ScrollTrigger);

export function useProjectsGSAP({ pinContainerRef, viewportRef, trackRef, progressRef, labelRef, contentRef, introRef, introLabelRef, introTextRef }) {
  const isDesktop = useCallback(() => window.innerWidth > 1024, []);
  const isMobile = useCallback(() => window.innerWidth <= 640, []);

  const getDistance = useCallback(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return 0;
    return track.scrollWidth - viewport.offsetWidth;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const container = pinContainerRef.current;
    const content = contentRef.current;
    const intro = introRef.current;
    const introLabel = introLabelRef.current;
    const introText = introTextRef.current;

    if (!container || !content) return;

    const ctx = gsap.context(() => {
      // ── Initial states ─────────────────────────────────────────────
      gsap.set(content, { opacity: 0, pointerEvents: "none" });
      gsap.set(intro, {
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: isMobile() ? "9%" : "35%",
        position: "absolute",
        width: "100%",
      });
      gsap.set(introLabel, { opacity: 0, y: 18, letterSpacing: "0.48em" });
      gsap.set(introText, { opacity: 0, y: 32, skewX: 4 });

      // ── Entrance animation ──────────────────────────────────────────
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
        }
      });
      entranceTl
        .to(introLabel, { opacity: 1, y: 0, letterSpacing: "0.28em", duration: 0.9, ease: "power3.out" })
        .to(introText, { opacity: 1, y: 0, skewX: 0, duration: 1.05, ease: "power4.out" }, "-=0.55");

      // ── Content stagger refs ────────────────────────────────────────
      const headingEl = content.querySelector(".proj-heading");
      const metaEl = content.querySelector(".proj-meta");
      const progressEl = content.querySelector(".scroll-progress-wrap");
      const viewportEl = content.querySelector(".proj-viewport");

      const getScrollLength = () => {
        const horizDist = isDesktop() ? getDistance() : window.innerHeight * 2;
        return horizDist + window.innerHeight * 1.5;
      };

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
        scale: 3,
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
      masterTl.fromTo([headingEl, metaEl, progressEl, viewportEl],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: "power3.out" },
        "-=0.1"
      );

      // 3. Horizontal scroll (desktop)
      if (isDesktop()) {
        masterTl.to(track, {
          x: () => -getDistance(),
          ease: "none",
          duration: 4, // Take up the rest of the scroll space
          onUpdate: function () {
            const hp = this.progress();
            if (progressRef.current) progressRef.current.style.width = `${hp * 100}%`;
            if (labelRef.current) {
              const idx = Math.min(projects.length - 1, Math.floor(hp * projects.length));
              labelRef.current.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
            }
          }
        }, "+=0.2"); // slight pause before scrolling starts
      }

      // ── Image parallax (desktop) ────────────────────────────────────
      if (isDesktop()) {
        gsap.utils.toArray(".card-img").forEach((img) => {
          gsap.fromTo(img, { scale: 1.15 }, {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: () => `+=${getScrollLength()}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });
      }
    }, container);

    return () => {
      ctx.revert();
    };
  }, [isDesktop, isMobile, getDistance, progressRef, labelRef]);
}
