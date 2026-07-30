"use client";

import React from "react";
import GSAPSlider from "@/components/ui/GSAPSlider";
import { TEAM_MEMBERS } from "./teamData";
import { TeamCard } from "./TeamCard";
import Container from "@/components/ui/Container";

export default function TeamSection() {
  return (
    <section
      id="team"
      className="scroll-section relative w-full py-8 md:py-12 site-grid-bg overflow-hidden"
    >
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="relative text-center mb-4 md:mb-6">
          <h2 className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            See Our Skilled Expert{" "}
            <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
              Team
            </span>
          </h2>
        </div>

        {/* GSAP Cards Slider Row */}
        <div className="relative z-20 w-full">
          <GSAPSlider
            items={TEAM_MEMBERS}
            defaultVisibleCount={3}
            mobileVisibleCount={1}
            centerModeMobile={true}
            centerCardWidthPercent={76}
            showControls={false}
            controlsPosition="center"
            showDots={true}
            autoplay={false}
            enableDrag={true}
            infinite={true}
            ItemComponent={TeamCard}
          />
        </div>
      </Container>
    </section>
  );
}
