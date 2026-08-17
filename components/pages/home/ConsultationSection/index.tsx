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
      <Container className="relative z-10">
        {/* ── Main consultation Card Container ── */}
        <div
          className="animate-as-card
                    relative rounded-3xl lg:rounded-[2.5rem]
                    overflow-hidden
                "
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <ConsultationVisual />
            <ConsultationContent />
          </div>
        </div>
      </Container>
    </section>
  );
}
