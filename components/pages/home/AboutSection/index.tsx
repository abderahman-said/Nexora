"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AboutVisual from "./AboutVisual";
import Container from "@/components/ui/Container";
import { useLocale, useTranslations } from "next-intl";

const HorizontalWords = () => {
  const locale = useLocale();
  const t = useTranslations("homeAbout");

  return (
    <>
      <section
        id="about"
        className="scroll-section relative w-full pb-8 bg-transparent dark:bg-[#090d16] site-grid-bg overflow-hidden"
      >
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* ── LEFT COLUMN: Structured Team Visual & Glass Chips ── */}
            <div className="lg:col-span-5 flex justify-center">
              <AboutVisual />
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
              <h2 className="text-[25px] sm:text-[31px] lg:text-[43px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.5]!">
                {t("title_main")}{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
                  {t("title_highlight")}
                </span>
              </h2>
              <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal leading-[1.9]!">
                {t("description")}
              </p>
              <Link
                href={`/${locale}/about`}
                className="mt-3 w-fit inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <span>{t("button_story")}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default HorizontalWords;
