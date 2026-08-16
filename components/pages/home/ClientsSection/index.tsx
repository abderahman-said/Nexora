"use client";

import React from "react";
import { MessageSquareQuote } from "lucide-react";
import GSAPSlider from "@/components/ui/GSAPSlider";
import { getClients } from "@/lib/data/clientsData";
import { ClientCard } from "./ClientCard";
import Container from "@/components/ui/Container";

import { useTranslations } from "next-intl";

export default function ClientsSection() {
  const t = useTranslations("homeClients");
  const TESTIMONIALS = getClients(t);
  return (
    <section
      id="testimonials"
      className="scroll-section relative w-full py-8 md:py-12 site-grid-bg overflow-hidden"
    >
      <Container className="relative z-10">
        {/* Section Header Content */}
        <div className="max-w-4xl mx-auto space-y-4 text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 text-blue-600 dark:text-blue-400 font-bold text-xs tracking-wider uppercase shadow-sm">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>{t("badge")}</span>
          </div>

          <h2 className="text-[25px] sm:text-[31px] lg:text-[43px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.5]!">
            {t("title_main")}{" "}
            {t("title_highlight") && (
              <span className="mt-1 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                {t("title_highlight")}
              </span>
            )}
          </h2>
        </div>

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
