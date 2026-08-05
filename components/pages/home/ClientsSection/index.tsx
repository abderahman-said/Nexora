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
        {/* Banner Container */}
        <div
          className="
                    relative rounded-3xl sm:rounded-[2.5rem] 
                    bg-slate-900 dark:bg-slate-950
                    border border-slate-200/80 dark:border-slate-800/90 shadow-2xl
                    p-6 sm:p-12 lg:p-16 !pb-42 !md:pb-62
                    overflow-hidden text-start md:text-center
                "
        >
          {/* Background Image */}
          <div
            aria-hidden="true"
            className="absolute rounded-3xl inset-0 bg-[url('/assets/testi_bg_3.webp')] bg-cover bg-center bg-no-repeat pointer-events-none [filter:invert(100%)_sepia(3%)_saturate(0%)_hue-rotate(121deg)_brightness(104%)_contrast(100%)] dark:[filter:none]"
          />

          {/* Section Header Content */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <div className="me-auto md:mx-auto inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 text-blue-600 dark:text-blue-400 font-bold text-xs tracking-wider uppercase shadow-sm">
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>{t('badge')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] ">
             {t('title_main')}{" "}
              <span className="block mt-1 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
               {t('title_highlight')}
              </span>
            </h2>
          </div>
        </div>

        {/* Overlapping GSAP Cards Slider Row */}
        <div className="relative z-20 -mt-32 lg:-mt-44 px-2">
          <GSAPSlider
            items={TESTIMONIALS}
            ItemComponent={ClientCard}
            autoplay={false}
            defaultVisibleCount={3}
            showControls={false}
            controlsPosition="sides"
            showDots={true}
          />
        </div>
      </Container>
    </section>
  );
}
