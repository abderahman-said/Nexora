"use client";

import React from "react";
import { Layers, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import GSAPSlider from "@/components/ui/GSAPSlider";
import { getServices } from "@/lib/data/servicesData";
import { ServiceCard } from "./ServiceCard";
import Container from "@/components/ui/Container";
import BackgroundLines from "./BackgroundLines";

export default function ServiceCards() {
  const locale = useLocale();
  const t = useTranslations("homeServices");
  const servicesData = getServices(t);

  return (
    <section
      id="services"
      className="scroll-section relative w-full py-8 md:py-12 site-grid-bg overflow-hidden"
    >
      <Container className="relative z-10">
        {/* Banner Container */}
        <div
          className="
                    relative rounded-3xl sm:rounded-[2.5rem]
                    bg-slate-900 dark:bg-slate-950
                    border border-slate-200/80 dark:border-slate-800/90 shadow-2xl
                    p-6 sm:p-12 lg:p-16  !pb-44 md:!pb-[240px]
                    overflow-hidden
                "
        >
          <BackgroundLines />
          {/* Background Radial Glow */}
          <div className="absolute -top-24 -end-24 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.25)_0%,transparent_70%)] pointer-events-none" />

          {/* Header Content Row */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            {/* Left Title & Tag */}
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 text-blue-600 dark:text-blue-400 font-bold text-xs tracking-wider uppercase shadow-sm">
                <Layers className="w-3.5 h-3.5" />
                <span>{t("badge")}</span>
              </div>

              <h2 className="text-[25px] sm:text-[31px] lg:text-[43px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.5]!">
                {t("title_main")}{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                  {t("title_highlight")}
                </span>
              </h2>
            </div>

            {/* Right Action Button */}
            <div className="shrink-0">
              <Link
                href={`/${locale}/services`}
                className="
                                    inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full
                                    bg-gradient-to-r from-blue-600 to-sky-600 text-white
                                    font-bold text-xs tracking-wider uppercase
                                    shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40
                                    hover:-translate-y-0.5 transition-all duration-300 group
                                "
              >
                <span>{t("button_view_all")}</span>
                <ArrowRight className="w-4 h-4   transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Overlapping Reusable GSAP Cards Slider Row */}
        <div className="relative z-20 -mt-[171px] md:-mt-[210px] px-2 sm:px-4">
          <GSAPSlider
            items={servicesData}
            renderItem={(item) => (
              <ServiceCard service={item} className=" h-[338px] md:h-[409px]" />
            )}
            defaultVisibleCount={3}
            mobileVisibleCount={1}
            centerModeMobile={true}
            centerCardWidthPercent={76}
            showDots={true}
            autoplay={false}
            pauseOnHover={false}
            enableDrag={true}
            infinite={true}
          />
        </div>
      </Container>
    </section>
  );
}
