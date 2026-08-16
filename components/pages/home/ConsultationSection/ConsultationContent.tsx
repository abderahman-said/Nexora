"use client";

import React from "react";
import Link from 'next/link';
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function ConsultationContent() {
  const t = useTranslations("homeConsultation");
  const locale = useLocale();
  return (
    <div className="lg:col-span-8 relative z-10 flex flex-col justify-center space-y-5 sm:space-y-6">
      {/* Main Section Title */}
      <h2
        suppressHydrationWarning
        className="text-[25px] sm:text-[31px] lg:text-[43px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.5]!"
      >
        {t('title_main')}{" "}
        <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
          {t('title_highlight')}
        </span>
      </h2>

      {/* Description Paragraph */}
      <p
        suppressHydrationWarning
        className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal"
      >
        {t('description')}
      </p>

      {/* Action Button Row */}
      <div className="pt-2">
        <Link
          href={`/${locale}/contact`}
          className="
            inline-flex items-center justify-center gap-3 px-4 md:px-8 py-2.5 md:py-4 rounded-xl
            bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-white
            font-bold text-xs sm:text-sm tracking-wider uppercase
            shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50
            hover:scale-[1.02] active:scale-95 transition-all duration-300 group
          "
        >
          <span>{t('button_contact')}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
