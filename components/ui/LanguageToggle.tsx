"use client";

import React from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { EarthIcon } from "lucide-react";
import type { LanguageToggleProps } from "./types";

export default function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const isArabic = locale === "ar";

  const toggleLanguage = () => {
    const newLocale = isArabic ? "en" : "ar";
    const pathWithoutLocale = pathname.replace(/^\/(ar|en)/, "");
    const search = typeof window !== "undefined" ? window.location.search : "";
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const newPath = `/${newLocale}${pathWithoutLocale}${search}${hash}`;

    router.push(newPath);
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}
      title={isArabic ? "Switch to English" : "التبديل إلى العربية"}
      className={`group relative flex h-9 md:h-10 px-3 items-center justify-center gap-1.5 rounded-full border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-bold shadow-sm hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 cursor-pointer ${className}`}
      suppressHydrationWarning
    >
      <EarthIcon className="h-4 w-4" />
      <span className="font-sans leading-none uppercase">
        {isArabic ? "EN" : "AR"}
      </span>
    </button>
  );
}

