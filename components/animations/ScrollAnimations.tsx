"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

// ---- Constants -------------------------------------------------------

const INIT_DELAY_MS = 150;

const NON_ANIMATED_ANCESTOR_SELECTOR =
  ".bento-card, .process-step, .hw-feature, .about-feature, .animate-as-card";

// ---- Component ---------------------------------------------------------

export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {});

    const initNewElements = () => {
      ctx.add(() => {
        animateSections(reduceMotion);
      });

      // Refresh after fonts load for accurate layout calculations.
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => {
          setTimeout(() => ScrollTrigger.refresh(), 100);
        });
      } else {
        setTimeout(() => ScrollTrigger.refresh(), 150);
      }
    };

    const timer = setTimeout(initNewElements, INIT_DELAY_MS);

    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}

// ---- Animation helpers ----------------------------------------------------

/**
 * Reveals a set of elements on scroll. Elements already in the viewport are
 * animated immediately from a small offset (no opacity flash); off-screen
 * elements are hidden first and revealed via ScrollTrigger.
 */
function revealOnScroll(
  elements: Element[],
  {
    reduceMotion,
    yOffset = 24,
    visibleYOffset = yOffset,
    duration = 0.7,
    stagger = 0,
    start = "top 85%",
    trigger,
    clearProps = "opacity,transform,translate,rotate,scale",
  }: {
    reduceMotion: boolean;
    yOffset?: number;
    visibleYOffset?: number;
    duration?: number;
    stagger?: number;
    start?: string;
    trigger?: Element | Element[];
    clearProps?: string;
  },
) {
  if (elements.length === 0) return;

  const visible: Element[] = [];
  const hidden: Element[] = [];
  elements.forEach((el) =>
    (el.getBoundingClientRect().top < window.innerHeight ? visible : hidden).push(el),
  );

  if (visible.length > 0) {
    gsap.fromTo(
      visible,
      { y: reduceMotion ? 0 : visibleYOffset },
      {
        y: 0,
        duration,
        stagger,
        ease: "power2.out",
        clearProps: "transform,translate,rotate,scale",
      },
    );
  }

  if (hidden.length > 0) {
    gsap.set(hidden, { opacity: 0, y: reduceMotion ? 0 : yOffset });
    gsap.to(hidden, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: "power2.out",
      clearProps,
      scrollTrigger: {
        trigger: trigger ?? hidden[0],
        start,
        toggleActions: "play none none none",
        once: true,
      },
    });
  }
}

function animateSectionEntrance(sec: Element, reduceMotion: boolean, isMobile: boolean) {
  if (sec.classList.contains("no-clip-reveal") || reduceMotion || isMobile) return;

  const isVisible = sec.getBoundingClientRect().top < window.innerHeight;
  if (isVisible) {
    gsap.fromTo(
      sec,
      { y: 15 },
      { y: 0, duration: 0.8, ease: "power3.out", clearProps: "transform" },
    );
    return;
  }

  gsap.set(sec, { opacity: 0, y: 15 });
  gsap.to(sec, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power3.out",
    clearProps: "opacity,transform",
    scrollTrigger: {
      trigger: sec,
      start: "top 92%",
      toggleActions: "play none none none",
      once: true,
    },
  });
}

function getAnimatableChildren(sec: Element, selector: string) {
  return Array.from(sec.querySelectorAll(selector)).filter(
    (el) => !el.closest(NON_ANIMATED_ANCESTOR_SELECTOR),
  );
}

function animateSections(reduceMotion: boolean) {
  const isMobile =
    window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;

  const sections = document.querySelectorAll(".scroll-section:not(.gsap-initialized)");

  sections.forEach((sec) => {
    sec.classList.add("gsap-initialized");

    animateSectionEntrance(sec, reduceMotion, isMobile);

    // Headings each get their own scroll trigger (not batched together),
    // matching the original behavior.
    const headings = getAnimatableChildren(sec, "h2:not(.gsap-managed), h3:not(.gsap-managed)");
    headings.forEach((h) =>
      revealOnScroll([h], {
        reduceMotion,
        yOffset: 40,
        visibleYOffset: 20,
        duration: 0.9,
        start: isMobile ? "top 100%" : "top 90%",
      }),
    );

    if (!isMobile) {
      const paragraphs = getAnimatableChildren(sec, "p:not(.sd-label)");
      revealOnScroll(paragraphs, {
        reduceMotion,
        yOffset: 24,
        visibleYOffset: 16,
        duration: 0.7,
        stagger: 0.08,
      });
    }
  });

  animateCards(isMobile, reduceMotion);
}

function animateCards(isMobile: boolean, reduceMotion: boolean) {
  const cards = gsap.utils
    .toArray<Element>(
      ".bento-card:not(.gsap-card-init), .process-step:not(.gsap-card-init), .hw-feature:not(.gsap-card-init), .about-feature:not(.gsap-card-init), .animate-as-card:not(.gsap-card-init)",
    )
    .filter(Boolean);

  if (cards.length === 0) return;

  const visible: Element[] = [];
  const hidden: Element[] = [];

  cards.forEach((card) => {
    card.classList.add("gsap-card-init");
    if (card.getBoundingClientRect().top < window.innerHeight) {
      visible.push(card);
    } else {
      gsap.set(card, { opacity: 0, y: isMobile ? 30 : 60, scale: 0.95 });
      hidden.push(card);
    }
  });

  if (visible.length > 0) {
    gsap.fromTo(
      visible,
      { y: reduceMotion ? 0 : isMobile ? 15 : 20, scale: reduceMotion ? 1 : 0.98 },
      {
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: isMobile ? 0 : 0.08,
        clearProps: "transform,translate,rotate,scale",
      },
    );
  }

  if (hidden.length > 0) {
    ScrollTrigger.batch(hidden, {
      start: isMobile ? "top 95%" : "top 88%",
      once: true,
      onEnter(batch) {
        if (!batch?.length) return;
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: isMobile ? 0 : 0.1,
          overwrite: true,
          clearProps: "opacity,transform,translate,rotate,scale",
        });
      },
    });
  }
}