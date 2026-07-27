"use client";

import React from "react";
import Container from "@/components/ui/Container";
import ConsultationVisual from "./ConsultationVisual";
import ConsultationContent from "./ConsultationContent";

export default function ConsultationSection() {
  return (
    <section
      id="consultation"
      className="scroll-section relative w-full py-8 md:py-12 site-grid-bg overflow-hidden"
    >
      <Container className="relative z-10">
        {/* ── Main consultation Card Container ── */}
        <div
          className="
                    relative rounded-3xl lg:rounded-[2.5rem]
                    bg-white/90 dark:bg-[#0c101d]/90
                    border border-slate-200/90 dark:border-slate-800/90
                    shadow-2xl shadow-slate-200/50 dark:shadow-none
                    overflow-hidden
                "
        >
          {/* Ambient Glow Effects */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 dark:bg-sky-500/10 blur-3xl rounded-full pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 dark:bg-blue-500/10 blur-3xl rounded-full pointer-events-none"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-5 sm:p-10 lg:p-14">
            <ConsultationVisual />
            <ConsultationContent />
          </div>
        </div>
      </Container>
    </section>
  );
}
