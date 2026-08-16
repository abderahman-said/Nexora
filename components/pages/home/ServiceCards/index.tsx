"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import GSAPSlider from "@/components/ui/GSAPSlider";
import { getServices } from "@/lib/data/servicesData";
import { ServiceCard } from "./ServiceCard";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ServiceCards() {
  const locale = useLocale();
  const t = useTranslations("homeServices");
  const servicesData = getServices(t);

  return (
    <section
      id="services"
      className="scroll-section relative w-full py-4 md:py-6 site-grid-bg overflow-hidden"
    >
      <Container className="relative z-10">
        {/* Section Header */}
        <SectionHeader
          align="between"
          className="!mb-0"
          title={
            <span className="inline-flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5 shrink-0">
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-blue-500 shadow-[0_0_12px_#2563eb]" />
              </span>
              <span>
                {t("title_main")}{" "}
                {t("title_highlight") && (
                  <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                    {t("title_highlight")}
                  </span>
                )}
              </span>
            </span>
          }
          rightElement={
            <Link
              href={`/${locale}/services`}
              className="inline-flex whitespace-nowrap items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 px-4 md:px-6 py-2.5 md:py-3 text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wider text-white shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/35 group"
            >
              <span>{t("button_view_all")}</span>
              <ArrowRight className="w-4 h-4 rtl:scale-x-[-1] transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          }
        />

        {/* Overlapping Reusable GSAP Cards Slider Row */}
        <div className="relative z-20  ">
          <GSAPSlider
            items={servicesData}
            renderItem={(item) => (
              <ServiceCard
                service={item}
                className=" min-h-[251px] md:min-h-[281px]"
              />
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
