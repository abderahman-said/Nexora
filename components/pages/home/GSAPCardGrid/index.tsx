"use client";

import React, { useRef } from "react";
import { STEPS } from "./gsapCardData";
import { ProcessCard } from "./ProcessCard";
import { useCardGridGSAP } from "./useCardGridGSAP";
import Container from "@/components/ui/Container";

export default function GSAPCardGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const waveRef = useRef<SVGSVGElement>(null);

  useCardGridGSAP({ sectionRef, cardsRef, waveRef });

  return (
    <section
      id="process"
      ref={sectionRef}
      className="scroll-section relative w-full py-8 md:py-12 site-grid-bg overflow-hidden"
    >
      <Container className="relative z-10">
        {/* ── Section Header ── */}
        <div className="relative text-center mb-10 md:mb-16">
          <h2 className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How To Work{" "}
            <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
              It!
            </span>
          </h2>
        </div>

        {/* ── Cards Grid with Connecting Bezier Wave ── */}
        <div className="relative mt-8">
          {/* Connecting Bezier Wave Line (Desktop) */}
          <svg
            ref={waveRef}
            className="absolute top-1/2 left-0 right-0 w-full -translate-y-1/2 pointer-events-none z-0 max-lg:hidden opacity-60"
            viewBox="0 0 1200 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 150 60 Q 300 110, 450 60 T 750 60 T 1050 60"
              stroke="url(#processWaveGrad)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />
            <defs>
              <linearGradient
                id="processWaveGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch relative z-10">
            {STEPS.map((s, index) => (
              <div
                key={s.step}
                ref={(el) => { if (el) cardsRef.current[index] = el; }}
                className="h-full flex flex-col"
              >
                <ProcessCard step={s} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
