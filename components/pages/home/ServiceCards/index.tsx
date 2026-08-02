"use client";

import React from "react";
import { Layers, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import GSAPSlider from "@/components/ui/GSAPSlider";
import { SERVICES } from "./servicesData";
import { ServiceCard } from "./ServiceCard";
import Container from "@/components/ui/Container";

export default function ServiceCards() {
  const locale = useLocale();
  return (
    <section
      id="services"
      className="scroll-section relative w-full py-8 md:py-12 site-grid-bg overflow-hidden"
    >
      <Container className="relative z-10">
        {/* Banner Container */}
        <div
          className="
                    relative rounded-3xl sm:rounded-[2.5rem]
                    bg-slate-900 dark:bg-slate-950
                    border border-slate-200/80 dark:border-slate-800/90 shadow-2xl
                    p-6 sm:p-12 lg:p-16  !pb-44 md:!pb-[240px]
                    overflow-hidden
                "
        >
          {/* Background Texture Image */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[url('/service_bg.webp')] bg-cover bg-center bg-no-repeat pointer-events-none [filter:invert(100%)_sepia(3%)_saturate(0%)_hue-rotate(121deg)_brightness(104%)_contrast(100%)] dark:[filter:none]"
          />

          {/* Ambient Tech Wave Background Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40 dark:opacity-40"
            viewBox="0 0 1200 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-100 200 C 300 50, 700 350, 1300 150"
              stroke="url(#serviceWave1)"
              strokeWidth="2"
            />
            <path
              d="M-100 280 C 400 100, 800 380, 1300 220"
              stroke="url(#serviceWave2)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            <defs>
              <linearGradient
                id="serviceWave1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient
                id="serviceWave2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#818cf8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Background Radial Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />

          {/* Header Content Row */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            {/* Left Title & Tag */}
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 text-blue-600 dark:text-blue-400 font-bold text-xs tracking-wider uppercase shadow-sm">
                <Layers className="w-3.5 h-3.5" />
                <span>LATEST SERVICES</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                We Provide Exclusive Service For{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                  Your Business
                </span>
              </h2>
            </div>

            {/* Right Action Button */}
            <div className="shrink-0">
              <Link
                href={`/${locale}/contact`}
                className="
                                    inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full
                                    bg-gradient-to-r from-blue-600 to-sky-600 text-white
                                    font-bold text-xs tracking-wider uppercase
                                    shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40
                                    hover:-translate-y-0.5 transition-all duration-300 group
                                "
              >
                <span>VIEW ALL SERVICES</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Overlapping Reusable GSAP Cards Slider Row */}
        <div className="relative z-20 -mt-[171px] md:-mt-[210px] px-2 sm:px-4">
          <GSAPSlider
            items={SERVICES}
            ItemComponent={ServiceCard}
            defaultVisibleCount={3}
            mobileVisibleCount={1}
            centerModeMobile={true}
            centerCardWidthPercent={76}
            showControls={false}
            controlsPosition="center"
            showDots={true}
            autoplay={false}
            pauseOnHover={false}
            enableDrag={true}
            infinite={true}
            
          />
        </div>
      </Container>
    </section>
  );
}
