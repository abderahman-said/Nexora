"use client";

import React from "react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { getSteps } from "@/lib/data/ProcessCardData";
import { ProcessCard } from "@/components/pages/home/ProcessSection/ProcessCard";
import { useTranslations } from "next-intl";

export default function ServiceProcess() {
  const tProcess = useTranslations("homeProcess");
  const STEPS = getSteps(tProcess);
  const t = useTranslations("services_page.process");
  return (
    <section className="scroll-section relative w-full py-16 sm:py-24 bg-slate-50 dark:bg-[#0a0f1e] border-b border-slate-200/90 dark:border-slate-800/80 transition-colors duration-300">
      <Container className="relative z-10">
        <SectionHeader
          badge={t("badge")}
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
          {STEPS.map((step) => (
            <ProcessCard key={step.step} step={step} />
          ))}
        </div>
      </Container>
    </section>
  );
}
