"use client";

import React from "react";
import GSAPSlider from "@/components/ui/GSAPSlider";
import { TEAM_MEMBERS } from "./teamData";
import { TeamCard } from "./TeamCard";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

export default function TeamSection() {
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
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75 shadow-[0_0_12px_#2563eb]" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-blue-500 shadow-[0_0_12px_#2563eb]" />
              </span>
              <span>
               Our{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                  Team
                </span>
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
