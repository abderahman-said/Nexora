"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { InteractiveCircleButtonProps } from "./types";

export function InteractiveCircleButton({ href, children }: InteractiveCircleButtonProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={typeof children === "string" ? children : "Contact Us"}
      className="group relative flex h-36 w-36 flex-col items-center justify-center rounded-full border border-slate-300 dark:border-white/25 bg-white dark:bg-white/5 backdrop-blur-sm overflow-hidden text-slate-900 dark:text-white shadow-xl cursor-pointer transition-all duration-200 hover:scale-105 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
    >
      {/* Background Gradient Circle on Hover */}
      <span
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        aria-hidden="true"
      />

      <span className="relative z-10 flex flex-col items-center gap-1.5 pointer-events-none select-none">
        <span className="text-base md:text-lg font-bold tracking-wide text-slate-800 dark:text-slate-100 group-hover:text-white transition-colors duration-200">
          {children}
        </span>
        <ArrowUpRight className="h-5 w-5 text-blue-600 rtl:scale-x-[-1] dark:text-blue-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-[color,transform] duration-200" />
      </span>
    </Link>
  );
}