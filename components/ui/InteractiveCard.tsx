"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import type { InteractiveCardProps } from "./types";
import { cn } from "@/lib/utils";

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
  const locale = useLocale();
  const Wrapper: React.ElementType = buttonLink ? Link : "div";

  let formattedLink = buttonLink;
  if (buttonLink && buttonLink.startsWith("/")) {
    if (!buttonLink.startsWith(`/${locale}/`) && buttonLink !== `/${locale}`) {
      formattedLink = `/${locale}${buttonLink}`;
    }
  }

  const props = buttonLink ? { href: formattedLink } : {};

  return (
    <Wrapper
      {...props}
      className={cn(
        "animate-as-card group relative flex flex-col justify-betwee",
        "bg-white dark:bg-[#0c101d]",
        "border border-slate-200/90 dark:border-slate-800/90 rounded-3xl",
        "p-3 md:p-8",
        stepNumber && "!pt-16 mt-3",
        "shadow-xl shadow-slate-200/40 dark:shadow-none",
        "hover:border-blue-500/60 dark:hover:border-sky-400/60",
        "hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/20",
        "md:hover:-translate-y-1 transition-all duration-150 ease-out",
        className,
      )}
    >
      {/* Hover Inner Mesh Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

      {/* Overlapping Top Number Badge */}
      {stepNumber && (
        <div
          className={cn(
            "absolute -top-7 left-1/2 -translate-x-1/2 z-20",
            "w-14 h-14 flex items-center justify-center rounded-full",
            "bg-gradient-to-br from-blue-600 via-sky-500 to-indigo-600 text-white",
            "font-black text-lg",
            "border-4 border-slate-100 dark:border-[#060913]",
            "shadow-xl shadow-blue-500/30 group-hover:shadow-blue-500/60",
            "transition-all duration-300",
          )}
        >
          {stepNumber}
        </div>
      )}

      {Icon && (
        <div className="relative z-10 flex justify-center mb-2 md:mb-6">
          <div
            className={cn(
              "relative flex items-center justify-center rounded-2xl",
              "w-12 h-12 md:w-16 md:h-16",
              "bg-gradient-to-br from-blue-600 via-sky-500 to-indigo-600 text-white",
              "shadow-xl shadow-blue-500/30 group-hover:shadow-2xl group-hover:shadow-blue-500/60",
              "group-hover:rotate-3 transition-[transform,box-shadow] duration-300 ease-out",
            )}
          >
            {/* Radar Ring */}
            <span className="absolute inset-0 rounded-2xl bg-blue-500/40 opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />
            <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-sky-400 opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-500 pointer-events-none" />

            {/* Icon */}
            <Icon className="w-5 h-5 md:w-7 md:h-7 stroke-[2.2] relative z-10 transform transition-transform duration-300 ease-out group-hover:rotate-12" />
          </div>
        </div>
      )}

      {/* Content Body */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Title & Description */}
        <div className="relative z-10 text-center space-y-2 mb-3 md:mb-6">
          <h3 className="text-base md:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* Feature Bullets List */}
        {features.length > 0 && (
          <div
            className={cn(
              "relative z-10 flex flex-wrap gap-2 justify-center",
              "pt-4 border-t border-slate-100 dark:border-slate-800/80",
              buttonText ? "mb-4" : "mb-0",
            )}
          >
            {features.map((feature, fIdx) => (
              <div
                key={fIdx}
                className={cn(
                  "flex items-center w-fit gap-1 md:gap-2 px-1   py-1 md:px-2 md:py-1.5 rounded-xl",
                  "bg-slate-50 dark:bg-slate-900/80",
                  "border border-slate-200/60 dark:border-slate-800/60",
                  "group-hover:border-blue-500/30 dark:group-hover:border-sky-500/30",
                  "transition-colors duration-300",
                )}
              >
                <CheckCircle2 className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
                <span className="text-[9px] md:text-xs font-semibold text-slate-700 dark:text-slate-300">
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
