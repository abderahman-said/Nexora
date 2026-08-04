"use client";

import Link from "next/link";
import { ArrowRight  } from "lucide-react";
import Magnet from "@/components/ui/Magnet";
import type { HeroContentProps } from "./types";

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
      <div className="relative z-10  md:mt-[-80px]  mt-0   flex flex-col items-start text-left max-w-[800px]">
         

        {/* Main Headline */}
        <h1
          ref={headRef}
          className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white dark:text-white leading-[1.12] mb-4 sm:mb-5"
        >
          <span className="split-word">We </span>{" "}
          <span className="split-word">Build </span>{" "}
          <span className="split-word">Digital Products</span>{" "}
          <span className="split-word bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
           That Grow Your Business
          </span>
        </h1>

        {/* Paragraph Description */}
        <p
          ref={subRef}
          className="text-sm sm:text-lg text-white dark:text-slate-300 font-medium leading-relaxed max-w-xl mb-6 sm:mb-8"
        >
          We transform your ideas into powerful web, mobile, and software solutions that drive business growth. Every solution is built for performance, scalability, and long-term success.
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
  );
}
