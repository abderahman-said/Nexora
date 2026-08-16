"use client";

import React from "react";
import GSAPSlider from "@/components/ui/GSAPSlider";
import { getClients } from "@/lib/data/clientsData";
import { ClientCard } from "./ClientCard";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { useTranslations } from "next-intl";

export default function ClientsSection() {
  const t = useTranslations("homeClients");
  const TESTIMONIALS = getClients(t);
  return (
    <section
      id="testimonials"
      className="scroll-section relative w-full pt-4 md:pt-6 site-grid-bg overflow-hidden"
    >
      <Container className="relative z-10">
        {/* Section Header */}
        <SectionHeader
          align="between"
          className="!mb-6 md:!mb-8"
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
        />

        {/* GSAP Cards Slider Row */}
        <div className="relative z-20 px-2">
          <GSAPSlider
            items={TESTIMONIALS}
            renderItem={(item) => <ClientCard client={item} />}
            autoplay={false}
            defaultVisibleCount={3}
            showDots={true}
          />
        </div>
      </Container>
    </section>
  );
}
