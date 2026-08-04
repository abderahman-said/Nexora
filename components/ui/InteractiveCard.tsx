"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { InteractiveCardProps } from "./types";

export default function InteractiveCard({
  stepNumber,
  icon: Icon,
  title,
  description,
  features = [],
  buttonText,
  buttonLink,
  className = "",
}: InteractiveCardProps) {
  const Wrapper = (buttonLink ? Link : "div") as any;
  const props = buttonLink ? { href: buttonLink } : {};

  return (
    <Wrapper
      {...props}
      className={`
                group relative flex flex-col justify-between
                bg-white dark:bg-[#0c101d] h-full
                border border-slate-200/90 dark:border-slate-800/90
                rounded-3xl  md:p-8 p-3 ${stepNumber ? "!pt-16 mt-3" : ""}
                shadow-xl shadow-slate-200/40 dark:shadow-none
                hover:border-blue-500/60 dark:hover:border-sky-400/60
                hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/20
                hover:-translate-y-3
                transition-all duration-500 ease-out
                ${className}
            `}
    >
      {/* ── Hover Inner Mesh Gradient Overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

      {/* ── Overlapping Top Number Badge (If stepNumber provided) ── */}
      {stepNumber && (
        <div
          className="
                    absolute -top-7 start-1/2 -translate-x-1/2 rtl:translate-x-1/2
                    w-14 h-14 rounded-full
                    bg-gradient-to-br from-blue-600 via-sky-500 to-indigo-600 text-white
                    font-black text-lg flex items-center justify-center
                    border-4 border-slate-100 dark:border-[#060913]
                    shadow-xl shadow-blue-500/30
                     group-hover:shadow-blue-500/60
                    transition-all duration-300 z-20
                "
        >
          {stepNumber}
        </div>
      )}

      {Icon && (
        <div className="relative z-10 flex justify-center mb-2 md:mb-6">
          <div
            className="
                        relative w-12 h-12  md:w-16 md:h-16 rounded-2xl
                        bg-gradient-to-br from-blue-600 via-sky-500 to-indigo-600 text-white
                        flex items-center justify-center
                        shadow-xl shadow-blue-500/30
                        group-hover:shadow-2xl group-hover:shadow-blue-500/60   group-hover:rotate-3
                        transition-all duration-500 ease-out
                    "
          >
            {/* Continuous Radar Ring Effect */}
            <span className="absolute inset-0 rounded-2xl bg-blue-500/40 animate-ping opacity-60 pointer-events-none" />
            <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-sky-400 opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-500 pointer-events-none" />

            {/* Icon */}
            <Icon className="w-5 h-5 md:w-7 md:h-7 stroke-[2.2] relative z-10 transform transition-transform duration-500 ease-out group-hover:rotate-12" />
          </div>
        </div>
      )}

      {/* ── Content Body ── */}
      <div className="flex-1 flex flex-col justify-between">
        {/* ── Title & Description ── */}
        <div className="relative z-10 text-center space-y-2 md:mb-6 mb-3">
          <h3 className="text-base md:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight gsap-managed group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* ── Feature Bullets List ── */}
        {features.length > 0 && (
          <div
            className={`relative flex flex-wrap gap-2 justify-center z-10 ${buttonText ? "mb-4" : "mb-0"} pt-4 border-t border-slate-100 dark:border-slate-800/80`}
          >
            {features.map((feature, fIdx) => (
              <div
                key={fIdx}
                className="
                                    flex items-center w-fit gap-2 px-1.5 py-1 md:px-2 md:py-1.5 rounded-xl
                                    bg-slate-50 dark:bg-slate-900/80
                                    border border-slate-200/60 dark:border-slate-800/60
                                    group-hover:border-blue-500/30 dark:group-hover:border-sky-500/30
                                    transition-colors duration-300
                                "
              >
                <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                <span className="text-[10px] md:text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
