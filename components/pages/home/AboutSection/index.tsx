"use client";

import React from "react";
import Link from "next/link";
import { Layers, ArrowRight } from "lucide-react";
// import AboutVisionMission from "./AboutVisionMission";
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
        {/* Background Ambient Glows */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <div className="absolute top-1/4 start-0 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(37,99,235,0.15)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-1/4 end-0 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.12)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(2,132,199,0.15)_0%,transparent_70%)] pointer-events-none" />
        </div>

        <Container className="relative z-10">
          <div className="pt-8 flex flex-col space-y-6">
            {/* Header Content Row with space-between button */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
             
                <h2 className="max-w-4xl text-3xl  md:text-[45px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.6]!">
                  {t('title_main')}{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
                    {t('title_highlight')}
                  </span>
                </h2>
              {/* Action Button (Space-Between aligned) */}
              <div className="shrink-0">
                <Link
                  href={`/${locale}/about`}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <span>{t('button_story')}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Section Lead Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal leading-[2]! md:max-w-[75%] ">
              {t('description')}
            </p>

            {/* ── Vision & Mission (Replacing Tabs) ── */}
            {/* <AboutVisionMission /> */}
          </div>
        </Container>
      </section>
    </>
  );
};

export default HorizontalWords;
