"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Magnet from "@/components/ui/Magnet";

const STATS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "5★", label: "Average Rating" },
  { value: "3y", label: "In Business" },
  { value: "100%", label: "Client Satisfaction" },
];

function StatCounter({ value }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  const numericTarget = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startTime = null;
    let animationFrameId = null;
    const duration = 1800; // 1.8 seconds count up

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeProgress * numericTarget));

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(step);
            } else {
              setCount(numericTarget);
            }
          };
          animationFrameId = requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [numericTarget]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function HeroContent({
  headRef,
  subRef,
  statsRef,
  ctaRef,
  badgeRef,
}) {
  return (
    <div className="relative z-10 flex flex-col items-center">
      {/* Badge */}
      <div
        ref={badgeRef}
        className="
                    inline-flex items-center gap-2 px-[18px] py-2 mb-6
                    bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 rounded-full
                    backdrop-blur-md text-xs font-bold tracking-[0.12em]
                    uppercase text-blue-700 dark:text-blue-300 shadow-sm
                "
      >
        <span
          aria-hidden="true"
          className="w-1.5 h-1.5 bg-[#2563eb] rounded-full animate-[pulse-glow_2s_infinite]"
        />
        <span>Nexora Solutions — Premium Software Engineering</span>
      </div>

      {/* Headline */}
      <h1
        ref={headRef}
        className="
                     text-[clamp(2.25rem,5.5vw,5rem)]
                    font-black tracking-[-0.04em] leading-[1.05] text-slate-900 dark:text-white
                    max-w-[1200px] mb-5 overflow-hidden
                "
      >
        <span className="split-word">We</span>{" "}
        <span className="split-word">architect</span>{" "}
        <span className="split-word">scalable</span>{" "}
        <span className="split-word">software</span>{" "}
        <span className="split-word">that</span>{" "}
        <span className="split-word inline-block bg-[linear-gradient(135deg,#2563eb_0%,#0284c7_60%,#4f46e5_100%)] bg-clip-text text-transparent">
          powers
        </span>{" "}
        <span className="split-word inline-block bg-[linear-gradient(135deg,#2563eb_0%,#0284c7_60%,#4f46e5_100%)] bg-clip-text text-transparent">
          your
        </span>{" "}
        <span className="split-word inline-block bg-[linear-gradient(135deg,#2563eb_0%,#0284c7_60%,#4f46e5_100%)] bg-clip-text text-transparent">
          business.
        </span>
      </h1>

      {/* Sub */}
      <p
        ref={subRef}
        className="
                    text-[clamp(0.95rem,1.4vw,1.1rem)] text-slate-700 dark:text-slate-300
                    max-w-[640px] leading-[1.65] mb-8 font-semibold drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]
                "
      >
        Enterprise web apps. Native mobile products. Complex cloud architecture.
        From system design to deployment — we engineer digital excellence.
      </p>

      {/* CTAs */}
      <div
        ref={ctaRef}
        className="flex items-center justify-center gap-4 flex-wrap mb-11"
      >
        <Magnet padding={30} magnetStrength={25}>
          <Link
            href="#portfolio"
            className="
                            group relative inline-flex items-center gap-2.5 overflow-hidden
                            px-[32px] py-[16px] rounded-full bg-gradient-to-r from-blue-600 to-sky-600 text-white
                            font-bold text-sm tracking-[-0.01em] shadow-lg shadow-blue-500/25
                            transition-all duration-[250ms] ease-out
                            hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5
                        "
          >
            <span className="relative z-10">See Our Work</span>
            <span
              aria-hidden="true"
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </Magnet>
        <Magnet padding={30} magnetStrength={25}>
          <Link
            href="https://wa.me/201552323225"
            target="_blank"
            rel="noopener noreferrer"
            className="
                            inline-flex items-center gap-2.5 px-[30px] py-[16px]
                            rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900
                            font-bold text-sm text-slate-700 dark:text-slate-200 shadow-md shadow-black/10
                            transition-all duration-[250ms] ease-out
                            hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-emerald-300
                            hover:text-emerald-700 dark:hover:text-emerald-400 hover:-translate-y-0.5
                        "
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>WhatsApp Us</span>
          </Link>
        </Magnet>
      </div>

      {/* Stats */}
      <div
        ref={statsRef}
        role="list"
        className="
                    flex items-center gap-0 px-6 flex-wrap
                    bg-white/95 dark:bg-slate-950/80 border border-slate-200/90 dark:border-slate-800/80 shadow-lg shadow-slate-200/60 dark:shadow-black/60
                    rounded-[28px] backdrop-blur-md overflow-hidden
                "
      >
        {STATS.map(({ value, label }) => (
          <div
            key={label}
            role="listitem"
            className="
                            relative text-center px-[18px] py-3.5
                            md:px-8 md:py-4.5
                            [&:not(:first-child)]:before:content-['']
                            [&:not(:first-child)]:before:absolute
                            [&:not(:first-child)]:before:left-0
                            [&:not(:first-child)]:before:top-[20%]
                            [&:not(:first-child)]:before:bottom-[20%]
                            [&:not(:first-child)]:before:w-px
                            [&:not(:first-child)]:before:bg-slate-200
                            dark:[&:not(:first-child)]:before:bg-slate-800
                        "
          >
            <span
              className="
                                block  font-black tracking-[-0.04em]
                                leading-none mb-1 text-[1.35rem] md:text-[1.7rem]
                                text-slate-900 dark:text-white
                            "
            >
              <StatCounter value={value} />
            </span>
            <span className="text-[0.68rem] font-bold tracking-[0.08em] uppercase text-slate-500 dark:text-slate-400">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
