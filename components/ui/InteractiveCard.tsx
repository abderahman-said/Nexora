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

  const formattedLink =
    buttonLink && buttonLink.startsWith("/") && !buttonLink.startsWith(`/${locale}/`) && buttonLink !== `/${locale}`
      ? `/${locale}${buttonLink}`
      : buttonLink;

  const wrapperProps = buttonLink ? { href: formattedLink } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "animate-as-card group relative flex h-full flex-col justify-between",
        "bg-white dark:bg-[#0c101d]",
        "rounded-3xl border border-slate-200/90 dark:border-slate-800/90",
        "p-3 md:p-8",
        stepNumber && "!pt-16 mt-3",
        "shadow-xl shadow-slate-200/40 dark:shadow-none",
        "hover:border-blue-500/60 dark:hover:border-sky-400/60",
        "hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/20",
        "transition-[border-color,box-shadow] duration-300 ease-out",
        className,
      )}
    >
      {/* Hover inner mesh gradient overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-blue-500/5 via-sky-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Overlapping top number badge */}
      {stepNumber && (
        <div
          className={cn(
            "absolute -top-7 left-1/2 z-20 -translate-x-1/2",
            "flex h-14 w-14 items-center justify-center rounded-full",
            "bg-gradient-to-br from-blue-600 via-sky-500 to-indigo-600 text-white",
            "text-lg font-black",
            "border-4 border-slate-100 dark:border-[#060913]",
            "shadow-xl shadow-blue-500/30 group-hover:shadow-blue-500/60",
            "transition-shadow duration-300",
          )}
        >
          {stepNumber}
        </div>
      )}

      {Icon && (
        <div className="relative z-10 mb-2 flex justify-center md:mb-6">
          <div
            className={cn(
              "relative flex items-center justify-center rounded-2xl",
              "h-12 w-12 md:h-16 md:w-16",
              "bg-gradient-to-br from-blue-600 via-sky-500 to-indigo-600 text-white",
              "shadow-xl shadow-blue-500/30 group-hover:shadow-2xl group-hover:shadow-blue-500/60",
              "transition-shadow duration-300 ease-out",
            )}
          >
            {/* Radar ring */}
            <span className="pointer-events-none absolute inset-0 rounded-2xl bg-blue-500/40 opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
            <span className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-sky-400 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-50" />

            <Icon className="relative z-10 h-5 w-5 stroke-[2.2] md:h-7 md:w-7" />
          </div>
        </div>
      )}

      {/* Content body */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="relative z-10 mb-3 space-y-2 text-center md:mb-6">
          <h3 className="text-base font-extrabold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-sky-400 md:text-xl">
            {title}
          </h3>
          <p className="text-xs font-normal leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm">
            {description}
          </p>
        </div>

        {features.length > 0 && (
          <div
            className={cn(
              "relative z-10 flex flex-wrap justify-center gap-2",
              "border-t border-slate-100 pt-4 dark:border-slate-800/80",
              buttonText ? "mb-4" : "mb-0",
            )}
          >
            {features.map((feature, fIdx) => (
              <div
                key={fIdx}
                className={cn(
                  "flex w-fit items-center gap-2 rounded-xl px-1.5 py-1 md:px-2 md:py-1.5",
                  "bg-slate-50 dark:bg-slate-900/80",
                  "border border-slate-200/60 dark:border-slate-800/60",
                  "group-hover:border-blue-500/30 dark:group-hover:border-sky-500/30",
                  "transition-colors duration-300",
                )}
              >
                <CheckCircle2 className="h-3 w-3 shrink-0 text-blue-600 dark:text-sky-400 md:h-3.5 md:w-3.5" />
                <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 md:text-xs">
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