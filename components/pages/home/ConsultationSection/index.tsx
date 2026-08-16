"use client";

import React from "react";
import Container from "@/components/ui/Container";
import ConsultationVisual from "./ConsultationVisual";
import ConsultationContent from "./ConsultationContent";

export default function ConsultationSection() {
  return (
    <section
      id="consultation"
      suppressHydrationWarning
      className="scroll-section relative w-full py-10 md:py-20 site-grid-bg overflow-hidden"
    >
      <Container className="relative z-10 px-4 sm:px-6 lg:px-8">
        {/* ── Main consultation Card Container ── */}
        <div
          className="animate-as-card
                    relative rounded-3xl lg:rounded-[2.5rem]
                    bg-white/95 dark:bg-[#0c101d]/95
                    border border-slate-200/90 dark:border-slate-800/90
                    shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/50
                    overflow-hidden
                "
        >
          {/* Ambient Glow Effects */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(37,99,235,0.15)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(14,165,233,0.15)_0%,transparent_70%)] rounded-full pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(circle,rgba(79,70,229,0.15)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(37,99,235,0.15)_0%,transparent_70%)] rounded-full pointer-events-none"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-14">
            <ConsultationVisual />
            <ConsultationContent />
          </div>
        </div>
      </Container>
    </section>
  );
}
