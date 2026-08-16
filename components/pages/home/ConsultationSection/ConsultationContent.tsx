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
          className="inline-flex whitespace-nowrap items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 px-4 md:px-6 py-2.5 md:py-3 text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wider text-white shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/35 group"
        >
          <span>{t('button_contact')}</span>
          <ArrowRight className="w-4 h-4 rtl:scale-x-[-1] transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
