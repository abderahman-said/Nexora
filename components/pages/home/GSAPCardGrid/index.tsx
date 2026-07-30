"use client";

import React from "react";
import { STEPS } from "./gsapCardData";
import { ProcessCard } from "./ProcessCard";
import Container from "@/components/ui/Container";
import GSAPSlider from "@/components/ui/GSAPSlider";

export default function GSAPCardGrid() {
  return (
    <section
      id="process"
      className="scroll-section relative w-full py-8 md:py-12 site-grid-bg overflow-hidden"
    >
      <Container className="relative z-10">
        {/* ── Section Header ── */}
        <div className="relative text-center mb-10 md:mb-16">
          <h2 className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How To Work{" "}
            <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
              It!
            </span>
          </h2>
        </div>

        {/* ── Cards Slider ── */}
        <div className="relative mt-8">
<GSAPSlider
  items={STEPS}
  renderItem={(item) => item ? <ProcessCard step={item} /> : null}
  defaultVisibleCount={4}
  mobileVisibleCount={1.25}
  tabletVisibleCount={2}
  showControls={false}
  showDots={true}
  enableDrag={true}
/>
        </div>
      </Container>
    </section>
  );
}
