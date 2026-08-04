import React from "react";
import Link from "next/link";
import {
  PhoneCall,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
  Clock,
} from "lucide-react";

import { useTranslations } from "next-intl";

export default function ConsultationContent() {
  const t = useTranslations("homeConsultation");
  return (
    <div className="lg:col-span-7 relative z-10 flex flex-col justify-center space-y-5 sm:space-y-6">
      {/* Header Tag Badge */}
      <div>
        <div
          className="
                    inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                    bg-blue-50 dark:bg-blue-950/80
                    border border-blue-200/80 dark:border-blue-800/80
                    text-blue-600 dark:text-sky-400
                    font-bold text-xs tracking-wider uppercase shadow-sm
                "
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{t('badge')}</span>
        </div>
      </div>

      {/* Main Section Title */}
      <h2
        suppressHydrationWarning
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.18]"
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

      {/* 3 Key Benefit Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
          <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            {t('feature_1')}
          </span>
        </div>

        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            {t('feature_2')}
          </span>
        </div>

        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80">
          <Clock className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            {t('feature_3')}
          </span>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-3">
        <Link
          href="/contact"
          className="
                        inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-xl
                        bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 text-white
                        font-bold text-xs sm:text-sm tracking-wider uppercase
                        shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50
                        hover:scale-[1.02] active:scale-95 transition-all duration-300 group
                    "
        >
          <span>{t('button_contact')}</span>
          <ArrowRight className="w-4 h-4  rtl:scale-x-[-1] transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
        </Link>

        <Link
          href="https://wa.me/201117180818"
          target="_blank"
          rel="noopener noreferrer"
          className="
                        inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-xl
                        bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200
                        border border-slate-300 dark:border-slate-700
                        hover:border-sky-500 dark:hover:border-sky-400
                        hover:text-blue-600 dark:hover:text-sky-400
                        font-bold text-xs sm:text-sm tracking-wider uppercase
                        shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95
                        transition-all duration-300
                    "
        >
          <PhoneCall className="w-4 h-4 text-emerald-500" />
          <span>{t('button_whatsapp')}</span>
        </Link>
      </div>
    </div>
  );
}
