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
  variant = "default",
}: InteractiveCardProps) {
  const locale = useLocale();
  const Wrapper: React.ElementType = "div";

  let formattedLink = buttonLink;
  if (buttonLink && buttonLink.startsWith("/")) {
    if (!buttonLink.startsWith(`/${locale}/`) && buttonLink !== `/${locale}`) {
      formattedLink = `/${locale}${buttonLink}`;
    }
  }

  const props = {};

  const isGhost = variant === "ghost";

  return (
    <Wrapper
      {...props}
      className={cn(
        "group relative flex flex-col justify-between rounded-3xl",
        "p-3 md:p-4",
        stepNumber && "!pt-16 mt-3",
        "transition-all duration-150 ease-out",
        isGhost 
          ? "bg-transparent border-transparent shadow-none"
          : cn(
              "bg-white dark:bg-[#0c101d]",
              "border border-slate-200/90 dark:border-slate-800/90",
              "shadow-xl shadow-slate-200/40 dark:shadow-none"
            ),
        className,
      )}
    >
      {/* Hover Inner Mesh Gradient Overlay */}
      {!isGhost && <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />}

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
        <div className="relative z-10 text-center space-y-3">
          <h3 className="text-base md:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-xs sm:text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* Read More Button */}
        {formattedLink && (
          <div className="mt-6 flex justify-center pb-2">
            <Link
              href={formattedLink}
              className="inline-flex whitespace-nowrap items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 text-xs sm:text-sm lg:text-base font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 transition-all hover:text-blue-700 dark:hover:text-blue-300 hover:-translate-y-0.5 group"
            >
              <span>{buttonText || "اقرأ المزيد"}</span>
            </Link>
          </div>
        )}
      </div>
    </Wrapper>
  );
}
