"use client";

import Link from "next/link";
import { ArrowRight  } from "lucide-react";
import Magnet from "@/components/ui/Magnet";
import type { HeroContentProps } from "./types";

// Authentic WhatsApp SVG Logo Icon
function WhatsappIcon({ className }: { className?: string }) {
  const finalClassName = className || "w-5 h-5";
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={finalClassName}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.71 1.454h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  );
}

export default function HeroContent({
  headRef,
  subRef,
  ctaRef,
  // badgeRef,
  // imageRef,
}: HeroContentProps) {
  return (
    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center py-2 lg:py-8">
      {/* ── RIGHT COLUMN: Content (Text & CTAs on Right Side) ── */}
      <div className="lg:col-span-6 order-1 lg:order-1 flex flex-col items-start text-left">
         

        {/* Main Headline */}
        <h1
          ref={headRef}
          className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-4 sm:mb-5"
        >
          <span className="split-word">Make</span>{" "}
          <span className="split-word">The</span>{" "}
          <span className="split-word">Easiest</span>{" "}
          <span className="split-word bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
            Solution For You
          </span>
        </h1>

        {/* Paragraph Description */}
        <p
          ref={subRef}
          className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl mb-6 sm:mb-8"
        >
          We transform your ideas into integrated digital solutions that make a
          real difference and support your business growth. Delivering smart,
          high-performance applications designed to innovate, evolve, and scale
          efficiently.
        </p>

        {/* Action Buttons (Primary CTA + WhatsApp Button with Equal Heights) */}
        <div
          ref={ctaRef}
          className="flex items-stretch sm:items-center gap-3 sm:gap-6 w-full"
        >
          {/* Primary Button */}
          <Magnet magnetStrength={25}>
            <Link
              href="/services"
              className="
                group relative inline-flex items-center justify-center gap-1 md:gap-3  overflow-hidden
                h-[50px] sm:h-[60px] px-4 md:px-8 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 text-white
                font-bold text-xs sm:text-sm tracking-wide shadow-xl shadow-blue-500/25
                transition-all duration-300 ease-out
                hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto
              "
            >
              <span className="relative z-10 uppercase">ABOUT US</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Magnet>

          {/* WhatsApp Button */}
          <Magnet magnetStrength={25}>
            <Link
              href="https://wa.me/201117180818"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group inline-flex items-center justify-center gap-1 md:gap-3.5 h-[50px] sm:h-[60px] px-2 md:px-6 rounded-full
                bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800
                hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-300
                shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto
              "
            >
              {/* Authentic WhatsApp Green Icon Circle */}
              <div className="relative flex items-center justify-center w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-emerald-500 text-white shadow-md shadow-emerald-500/30 group-hover:scale-105 transition-transform duration-300 shrink-0">
                <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping opacity-70 pointer-events-none" />
                <WhatsappIcon className="w-4 sm:w-5 h-4 sm:h-5 text-white fill-current" />
              </div>

              {/* Text side-by-side */}
              <div className="text-left pr-1">
                <span className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight">
                  WhatsApp Us
                </span>
                <span className="block text-[0.65rem] sm:text-[0.7rem] font-semibold text-slate-500 dark:text-slate-400">
                  Chat Instantly
                </span>
              </div>
            </Link>
          </Magnet>
        </div>
      </div>

      {/* ── LEFT COLUMN: hero.webp Showcase Image ── */}
      {/* <div
        ref={imageRef}
        className="lg:col-span-6 order-2 lg:order-2 relative w-full flex items-center justify-center mt-4 lg:mt-0"
      >
        <div
          aria-hidden="true"
          className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 via-sky-500/15 to-blue-400/20 rounded-[36px] blur-2xl opacity-75 dark:opacity-40 pointer-events-none transition-all duration-700"
        />

        <div className="relative w-full max-w-[580px] group">
          <div className="relative rounded-[28px] border border-slate-200/90 dark:border-slate-800/90 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-3 sm:p-5 shadow-2xl shadow-blue-500/10 dark:shadow-black/60 transition-all duration-500 hover:border-blue-500/40">
            <div className="relative w-full overflow-hidden rounded-[20px] bg-slate-50 dark:bg-slate-950/50 p-2 sm:p-4 flex items-center justify-center">
              <Image
                src="/assets/hero.webp"
                alt="Nexora Digital Solutions Team Collaboration"
                width={600}
                height={450}
                priority
                sizes="(max-width: 768px) 100vw, 580px"
                className="w-full h-auto object-contain transform transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </div>

            <div className="absolute top-6 -right-2 sm:-right-4 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800/90 shadow-xl shadow-black/10 backdrop-blur-xl animate-float-y">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white flex items-center justify-center font-bold text-base shadow-md shadow-blue-500/30">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[0.75rem] font-bold text-slate-900 dark:text-white leading-tight">
                  Smart Solutions
                </p>
                <p className="text-[0.65rem] text-slate-500 dark:text-slate-400 font-medium">
                  Integrated Tech Stack
                </p>
              </div>
            </div>

            <div className="absolute -bottom-2 -left-2 sm:-left-4 flex items-center gap-2.5 sm:gap-3.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-white/95 dark:bg-slate-950/95 border border-slate-200/90 dark:border-slate-800/90 shadow-2xl shadow-blue-500/10 dark:shadow-black/60 backdrop-blur-xl">
              <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-xs shadow-md shadow-blue-500/30 shrink-0">
                <ShieldCheck className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
              </div>
              <div>
                <p className="text-[0.68rem] sm:text-[0.73rem] font-bold text-slate-800 dark:text-slate-200 leading-none">
                  100% Client Satisfaction
                </p>
                <p className="text-[0.6rem] sm:text-[0.65rem] text-slate-400 mt-0.5">
                  High Performance Apps
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
