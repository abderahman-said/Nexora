"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

// ---- Constants -------------------------------------------------------

const INIT_DELAY_MS = 150;
const OBSERVER_THROTTLE_MS = 200;

const SECTION_LABELS = [
  "Welcome",
  "About",
  "Services",
  "Portfolio",
  "Process",
  "Team",
  "Clients",
  "Contact",
];

const RAIL_BASE_CLASSES =
  "absolute top-0 bottom-0 flex w-14 flex-col items-center justify-center gap-4 pointer-events-none z-20 overflow-hidden max-[1360px]:hidden";
const RING_CLASSES =
  "sd-ring sd-ring-left w-9 h-9 rounded-full border border-blue-400/40 flex-shrink-0 will-change-transform after:content-[''] after:block after:mx-auto after:h-1.5 after:w-1.5 after:rounded-full after:bg-[#2563eb] after:[margin-top:calc(50%-3px)]";
const TICK_CLASSES =
  "sd-tick-line w-px h-[60px] flex-shrink-0 bg-[linear-gradient(to_bottom,transparent,rgba(15,23,42,0.12),transparent)]";
const LABEL_CLASSES =
  "sd-label text-[0.6rem] font-bold uppercase tracking-[0.2em] text-slate-400 [writing-mode:vertical-rl] [text-orientation:mixed]";
const LABEL_R_CLASSES =
  "sd-label-r text-[0.6rem] font-bold uppercase tracking-[0.2em] text-slate-400 [writing-mode:vertical-rl] [text-orientation:mixed]";
const SHAPE_BASE_CLASSES =
  "flex-shrink-0 will-change-transform opacity-40 h-7 w-7";
const SHAPE_VARIANTS = [
  "rounded-full border-[1.5px] border-[#0284c7]",
  "rotate-45 border-[1.5px] border-[#7c3aed]",
  "rounded border-[1.5px] border-[#2563eb]",
];

const NON_ANIMATED_ANCESTOR_SELECTOR =
  ".bento-card, .process-step, .hw-feature, .about-feature, .animate-as-card";

// ---- Component ---------------------------------------------------------

export default function ScrollAnimations() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {});
    const injectedDecorators: Element[] = [];

    const initNewElements = () => {
      ctx.add(() => {
        injectedDecorators.push(...injectSideDecorators());
        animateSections(reduceMotion);
      });

      // Refresh after fonts load for accurate layout calculations.
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const timer = setTimeout(initNewElements, INIT_DELAY_MS);

    // Watch for lazily loaded dynamic sections (e.g. components using ssr: false).
    let debounceTimer: ReturnType<typeof setTimeout>;
    let lastRun = 0;

    const observer = new MutationObserver((mutations) => {
      const now = Date.now();
      if (now - lastRun < OBSERVER_THROTTLE_MS) return;

      const hasNewSections = mutations.some((m) =>
        Array.from(m.addedNodes).some(
          (node) =>
            node instanceof Element &&
            (node.matches(".scroll-section") ||
              node.querySelector(".scroll-section")),
        ),
      );

      if (hasNewSections) {
        lastRun = now;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(initNewElements, INIT_DELAY_MS);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // If the page already finished loading before mount, 'load' will never
    // fire again — refresh immediately in that case too.
    const onLoad = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(debounceTimer);
      observer.disconnect();
      window.removeEventListener("load", onLoad);
      ctx.revert();
      injectedDecorators.forEach((el) => el.remove());
    };
  }, []);

  return null;
}

// ---- DOM decoration -----------------------------------------------------

/** Injects the left/right decorative rails into each section. Returns the created elements so callers can clean them up later. */
function injectSideDecorators(): Element[] {
  const sections = document.querySelectorAll(".scroll-section");
  const created: Element[] = [];

  sections.forEach((sec, i) => {
    if (sec.querySelector(".sd-left")) return;

    const attrLabel = sec.getAttribute("data-section-label");
    const idLabel = sec.id
      ? sec.id.charAt(0).toUpperCase() + sec.id.slice(1)
      : null;
    const label = attrLabel || SECTION_LABELS[i] || idLabel || `0${i + 1}`;
    const shapeIdx = i % 3;

    const left = document.createElement("div");
    left.className = `sd-left ${RAIL_BASE_CLASSES} left-4`;
    left.innerHTML = `
      <div class="${RING_CLASSES}"></div>
      <div class="${TICK_CLASSES}"></div>
      <span class="${LABEL_CLASSES}">${label}</span>
    `;

    const right = document.createElement("div");
    right.className = `sd-right ${RAIL_BASE_CLASSES} right-4`;
    right.innerHTML = `
      <div class="sd-shape sd-shape-${shapeIdx} ${SHAPE_BASE_CLASSES} ${SHAPE_VARIANTS[shapeIdx]}"></div>
      <div class="${TICK_CLASSES}"></div>
      <span class="${LABEL_R_CLASSES}">${label.toUpperCase()}</span>
    `;

    (sec as HTMLElement).style.position = "relative";
    sec.appendChild(left);
    sec.appendChild(right);
    created.push(left, right);
  });

  return created;
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

function animateRail(
  rail: Element | null,
  sec: Element,
  direction: "left" | "right",
  reduceMotion: boolean,
  isMobile: boolean,
) {
  if (!rail) return;

  const fromX = direction === "left" ? -40 : 40;
  gsap.fromTo(
    rail,
    { opacity: 0, x: fromX },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sec,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    },
  );

  if (reduceMotion || isMobile) return;

  gsap.to(rail, {
    yPercent: direction === "left" ? -20 : -30,
    ease: "none",
    scrollTrigger: {
      trigger: sec,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

function animateRing(ring: Element | null, sec: Element) {
  if (!ring) return;

  const ringTween = gsap.to(ring, {
    rotation: 360,
    duration: 8,
    repeat: -1,
    ease: "none",
    paused: true,
  });

  ScrollTrigger.create({
    trigger: sec,
    start: "top bottom",
    end: "bottom top",
    onEnter: () => ringTween.play(),
    onLeave: () => ringTween.pause(),
    onEnterBack: () => ringTween.play(),
    onLeaveBack: () => ringTween.pause(),
    onUpdate(self) {
      const speed = 1 + Math.abs(self.getVelocity()) / 600;
      gsap.to(ringTween, { timeScale: speed, duration: 0.3, overwrite: "auto" });
    },
  });
}

function animateShape(shape: Element | null, sec: Element) {
  if (!shape) return;

  const shapeTween = gsap.to(shape, { rotation: -360, duration: 12, repeat: -1, ease: "none", paused: true });

  ScrollTrigger.create({
    trigger: sec,
    start: "top bottom",
    end: "bottom top",
    onEnter: () => shapeTween.play(),
    onLeave: () => shapeTween.pause(),
    onEnterBack: () => shapeTween.play(),
    onLeaveBack: () => shapeTween.pause(),
  });

  gsap.to(shape, {
    scale: 1.6,
    opacity: 0.6,
    ease: "none",
    scrollTrigger: {
      trigger: sec,
      start: "top bottom",
      end: "center center",
      scrub: true,
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
    animateRail(sec.querySelector(".sd-left"), sec, "left", reduceMotion, isMobile);
    animateRail(sec.querySelector(".sd-right"), sec, "right", reduceMotion, isMobile);

    if (!reduceMotion && !isMobile) {
      animateRing(sec.querySelector(".sd-ring"), sec);
      animateShape(sec.querySelector(".sd-shape"), sec);
    }

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