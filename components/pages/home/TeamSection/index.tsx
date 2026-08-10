"use client";

import React from "react";
import GSAPSlider from "@/components/ui/GSAPSlider";
import { TEAM_MEMBERS } from "./teamData";
import { TeamCard } from "./TeamCard";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

import { useTranslations } from "next-intl";

export default function TeamSection() {
  const t = useTranslations("homeTeam");
  return (
    <section
      id="team"
      className="scroll-section relative w-full py-8 md:py-12 site-grid-bg overflow-hidden"
    >
      <Container className="relative z-10">
        {/* Section Header */}
        <SectionHeader
          className="mb-4 md:mb-6"
          title={
            <span className="inline-flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5 shrink-0">
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-blue-500 shadow-[0_0_12px_#2563eb]" />
              </span>
              <span>
                {t("title_our")} 
              </span>
            </span>
          }
        />

        {/* GSAP Cards Slider Row */}
        <div className="relative z-20 w-full">
          <GSAPSlider
            items={TEAM_MEMBERS}
            ItemComponent={TeamCard}
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
