"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let cleanup: (() => void) | null = null;
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        injectSideDecorators();
        animateSections(reduceMotion);
        animateProgressBar();
      });
      cleanup = () => ctx.revert();
    }, 150);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad, { once: true });

    return () => {
      clearTimeout(timer);
      cleanup?.();
    };
  }, []);

  return null;
}

function injectSideDecorators() {
  const sections = document.querySelectorAll(".scroll-section");

  const railBase =
    "absolute top-0 bottom-0 flex w-14 flex-col items-center justify-center gap-4 pointer-events-none z-20 overflow-hidden max-[1360px]:hidden";
  const ringClasses =
    "sd-ring sd-ring-left w-9 h-9 rounded-full border border-blue-400/40 flex-shrink-0 will-change-transform after:content-[''] after:block after:mx-auto after:h-1.5 after:w-1.5 after:rounded-full after:bg-[#2563eb] after:[margin-top:calc(50%-3px)]";
  const tickClasses =
    "sd-tick-line w-px h-[60px] flex-shrink-0 bg-[linear-gradient(to_bottom,transparent,rgba(15,23,42,0.12),transparent)]";
  const indexClasses =
    "sd-index text-[0.65rem] font-extrabold tracking-[0.15em] text-blue-600/80";
  const labelClasses =
    "sd-label text-[0.6rem] font-bold uppercase tracking-[0.2em] text-slate-400 [writing-mode:vertical-rl] [text-orientation:mixed]";
  const labelRClasses =
    "sd-label-r text-[0.6rem] font-bold uppercase tracking-[0.2em] text-slate-400 [writing-mode:vertical-rl] [text-orientation:mixed]";
  const shapeBase = "flex-shrink-0 will-change-transform opacity-40 h-7 w-7";
  const shapeVariants = [
    "rounded-full border-[1.5px] border-[#0284c7]",
    "rotate-45 border-[1.5px] border-[#7c3aed]",
    "rounded border-[1.5px] border-[#2563eb]",
  ];

  sections.forEach((sec, i) => {
    if (sec.querySelector(".sd-left")) return;

    const idx = String(i + 1).padStart(2, "0");
    const labels = [
      "Welcome",
      "About",
      "Services",
      "Portfolio",
      "Process",
      "Team",
      "Clients",
      "Contact",
    ];
    const attrLabel = sec.getAttribute("data-section-label");
    const idLabel = sec.id ? (sec.id.charAt(0).toUpperCase() + sec.id.slice(1)) : null;
    const label = attrLabel || labels[i] || idLabel || `0${i + 1}`;
    const shapeIdx = i % 3;

    const left = document.createElement("div");
    left.className = `sd-left ${railBase} left-4`;
    left.innerHTML = `
            <div class="${ringClasses}"></div>
            <div class="${tickClasses}"></div>
            <span class="${indexClasses}">${idx}</span>
            <span class="${labelClasses}">${label}</span>
        `;

    const right = document.createElement("div");
    right.className = `sd-right ${railBase} right-4`;
    right.innerHTML = `
            <div class="sd-shape sd-shape-${shapeIdx} ${shapeBase} ${shapeVariants[shapeIdx]}"></div>
            <div class="${tickClasses}"></div>
            <span class="${labelRClasses}">${label.toUpperCase()}</span>
        `;

    (sec as HTMLElement).style.position = "relative";
    sec.appendChild(left);
    sec.appendChild(right);
  });
}

function animateSections(reduceMotion: boolean) {
  const isMobile =
    typeof window !== "undefined" &&
    (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
  const sections = document.querySelectorAll(".scroll-section");

  sections.forEach((sec) => {
    const left = sec.querySelector(".sd-left");
    const right = sec.querySelector(".sd-right");
    const ring = sec.querySelector(".sd-ring");
    const shape = sec.querySelector(".sd-shape");

    if (
      !sec.classList.contains("no-clip-reveal") &&
      !reduceMotion &&
      !isMobile
    ) {
      gsap.fromTo(
        sec,
        { clipPath: "inset(0 100% 0 0)", opacity: 0.6 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 92%",
            end: "top 30%",
            scrub: true,
          },
        },
      );
    }

    if (left) {
      gsap.fromTo(
        left,
        { opacity: 0, x: -40 },
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
      if (!reduceMotion && !isMobile) {
        gsap.to(left, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }

    if (right) {
      gsap.fromTo(
        right,
        { opacity: 0, x: 40 },
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
      if (!reduceMotion && !isMobile) {
        gsap.to(right, {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }

    if (ring && !reduceMotion) {
      const ringTween = gsap.to(ring, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
      });
      ScrollTrigger.create({
        trigger: sec,
        start: "top bottom",
        end: "bottom top",
        onUpdate(self) {
          const speed = 1 + Math.abs(self.getVelocity()) / 600;
          gsap.to(ringTween, {
            timeScale: speed,
            duration: 0.3,
            overwrite: "auto",
          });
        },
      });
    }

    if (shape && !reduceMotion) {
      gsap.to(shape, {
        rotation: -360,
        duration: 12,
        repeat: -1,
        ease: "none",
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

    const headings = sec.querySelectorAll(
      "h2:not(.gsap-managed), h3:not(.gsap-managed)",
    );
    headings.forEach((h) => {
      if (!h) return;
      gsap.from(h, {
        opacity: 0,
        y: reduceMotion ? 0 : 40,
        duration: 0.9,
        ease: "power3.out",
        clearProps: "opacity,transform,translate,rotate,scale",
        scrollTrigger: {
          trigger: h,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    });

    const paras = Array.from(sec.querySelectorAll("p:not(.sd-label)"));
    if (paras.length > 0) {
      gsap.from(paras, {
        opacity: 0,
        y: reduceMotion ? 0 : 24,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "opacity,transform,translate,rotate,scale",
        scrollTrigger: {
          trigger: paras[0],
          start: "top 90%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    }
  });

  const cards = gsap.utils
    .toArray(".bento-card, .process-step, .hw-feature, .about-feature")
    .filter(Boolean);
  if (cards.length > 0) {
    ScrollTrigger.batch(cards as Element[], {
      start: "top 88%",
      onEnter(batch) {
        if (!batch || !batch.length) return;
        gsap.from(batch, {
          opacity: 0,
          y: reduceMotion ? 0 : 60,
          scale: reduceMotion ? 1 : 0.95,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          overwrite: true,
          clearProps: "opacity,transform,translate,rotate,scale",
        });
      },
      onLeaveBack(batch) {
        if (!batch || !batch.length) return;
        gsap.to(batch, {
          opacity: 0,
          y: reduceMotion ? 0 : 60,
          scale: reduceMotion ? 1 : 0.95,
          duration: 0.4,
          overwrite: true,
        });
      },
    });
  }
}

function animateProgressBar() {
  if (document.getElementById("scroll-progress-bar")) return;
  const bar = document.createElement("div");
  bar.id = "scroll-progress-bar";
  bar.className =
    "fixed left-0 top-0 h-0.5 w-0 origin-left bg-[linear-gradient(90deg,#2563eb,#0284c7,#4f46e5)] pointer-events-none shadow-[0_0_8px_rgba(37,99,235,0.4)] z-[9999]";
  document.body.appendChild(bar);

  gsap.to(bar, {
    width: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });
}
