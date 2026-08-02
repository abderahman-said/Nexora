"use client";

import React, { useRef } from "react";
import { Layers } from "lucide-react";
import AboutVisual from "./AboutVisual";
import AboutVisionMission from "./AboutVisionMission";
import { useAboutGSAP } from "./useAboutGSAP";
import Container from "@/components/ui/Container";

const HorizontalWords = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useAboutGSAP({ sectionRef, visualRef, contentRef });

  return (
    <>
      <section
        ref={sectionRef}
        id="about"
        className="scroll-section relative w-full  pb-8 pt-8 md:pt-12 bg-[#f8fafc] dark:bg-[#090d16] site-grid-bg overflow-hidden"
      >
        {/* Background Ambient Glows */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-sky-500/10 dark:bg-sky-600/10 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* ── LEFT COLUMN: Structured Team Visual & Glass Chips ── */}
            <div className="lg:col-span-5 flex justify-center">
              <AboutVisual visualRef={visualRef} />
            </div>

            {/* ── RIGHT COLUMN: Content Header & Vision/Mission Cards ── */}
            <div
              ref={contentRef}
              className="lg:col-span-7 flex flex-col justify-center space-y-5"
            >
              {/* Section Badge / Status Tag */}
              <div>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-blue-600 dark:text-sky-400 font-bold text-xs tracking-wider uppercase shadow-sm">
                  <div className="w-5 h-5 rounded-md bg-blue-600 dark:bg-sky-500 flex items-center justify-center text-white">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <span>ABOUT NEXORA IT SOLUTIONS</span>
                </div>
              </div>

              {/* Main Section Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                We Are Increasing Business Success With{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
                  Technology
                </span>
              </h2>

              {/* Section Lead Description */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Synergistically incentivize effective imperatives through fully
                researched intellectual capital. Appropriately fashion
                client-based enterprise software solutions and scalable
                architectures.
              </p>

              {/* ── Vision & Mission (Replacing Tabs) ── */}
              <AboutVisionMission />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default HorizontalWords;
