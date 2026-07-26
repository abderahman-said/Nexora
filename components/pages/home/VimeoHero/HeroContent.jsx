"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import Magnet from "@/components/ui/Magnet";
import SectionHeader from "@/components/ui/SectionHeader";

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
      <SectionHeader
        as="h1"
        size="hero"
        tag="Nexora.init()"
        badge="Code. Innovate. Elevate."
        badgeColor="info"
        title="Towards A Better Digital"
        highlight="Future For Your Business."
        subtitle="We transform your ideas into integrated digital solutions that make a real difference and support your business growth. Delivering smart, high-performance applications designed to innovate, evolve, and scale efficiently."
        align="center"
        titleRef={headRef}
        className="!mb-6"
      />

      {/* CTAs */}
      <div
        ref={ctaRef}
        className="flex items-center justify-center gap-4 flex-wrap mb-11"
      >
        <Magnet padding={30} magnetStrength={25}>
          <Link
            href="#services"
            className="
                            group relative inline-flex items-center gap-2.5 overflow-hidden
                            px-[32px] py-[16px] rounded-full bg-gradient-to-r from-blue-600 to-sky-600 text-white
                            font-bold text-sm tracking-[-0.01em] shadow-lg shadow-blue-500/25
                            transition-all duration-[250ms] ease-out
                            hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5
                        "
          >
            <span className="relative z-10">Explore Our Services</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Magnet>
        <Magnet padding={30} magnetStrength={25}>
          <Link
            href="https://wa.me/201117180818"
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
            <MessageCircle className="h-4.5 w-4.5 text-emerald-500" />
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
