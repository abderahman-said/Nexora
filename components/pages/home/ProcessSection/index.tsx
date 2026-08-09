"use client";

import React from "react";
 import { ProcessCard } from "./ProcessCard";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import GSAPSlider from "@/components/ui/GSAPSlider";

import { useTranslations } from "next-intl";
import { getSteps } from "@/lib/data/ProcessCardData";

export default function ProcessSection() {
  const t = useTranslations("homeProcess");
  const stepsData = getSteps(t);
  return (
    <section
      id="process"
      className="scroll-section relative w-full py-8 md:py-12 site-grid-bg overflow-hidden"
    >
      <Container className="relative z-10">
        {/* ── Section Header ── */}
        <SectionHeader
          className="mb-8 md:mb-10"
          title={
            <span className="inline-flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5 shrink-0">
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-blue-500 shadow-[0_0_12px_#2563eb]" />
              </span>
              <span>
                {t("title_main")}{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                  {t("title_highlight")}
                </span>
              </span>
            </span>
          }
        />

        {/* ── Cards Slider ── */}
        <div className="relative mt-8">
          <GSAPSlider
            items={stepsData}
            renderItem={(item) => (item ? <ProcessCard step={item} /> : null)}
            defaultVisibleCount={3}
            mobileVisibleCount={1}
            centerModeMobile={true}
            centerCardWidthPercent={76}
            showControls={false}
            controlsPosition="center"
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
