"use client";

import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { projectService } from "@/lib/services/projectService";
import { useProjectsGSAP } from "./useProjectsGSAP";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ProjectsSection() {
  const projects = projectService.getAllProjects();
  const pinContainerRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const labelRef = useRef(null);
  const contentRef = useRef(null);

  useProjectsGSAP({
    pinContainerRef, viewportRef, trackRef, progressRef,
    labelRef, contentRef
  });

  return (
    <section
      id="portfolio"
      className="scroll-section no-clip-reveal pin-container relative flex min-h-screen w-full flex-col justify-center bg-white dark:bg-[#080c18] transition-colors duration-300 border-b border-slate-200/90 dark:border-slate-800/80 py-12"
      ref={pinContainerRef}
      suppressHydrationWarning
    >

      {/* ── Main content (Immediately Visible) ── */}
      <div className="w-full opacity-100" ref={contentRef} suppressHydrationWarning>

        {/* ── Header Row ── */}
        <div
          className="proj-heading-wrap px-[72px] pb-6 pt-6 max-lg:px-8 max-lg:pb-7 max-sm:px-5 max-sm:pb-5 max-sm:pt-6"
          suppressHydrationWarning
        >
          <SectionHeader
            tag="Portfolio"
            badge="Featured Case Studies"
            badgeColor="success"
            title="Selected"
            highlight="Works"
            align="between"
            animClass="proj-heading"
            rightElement={
              <div className="proj-meta flex flex-col items-end gap-1.5 pb-1.5 max-sm:items-start">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700 dark:text-slate-300">
                  {String(projects.length).padStart(2, "0")} Projects
                </span>
                <span className="flex items-center gap-2 text-[11px] font-medium tracking-[0.08em] text-slate-600 dark:text-slate-400 before:inline-block before:h-px before:w-7 before:bg-slate-400 dark:before:bg-slate-600 before:content-[''] max-lg:hidden">
                  Scroll to explore
                </span>
              </div>
            }
          />
        </div>

        {/* ── Scroll Progress Bar ── */}
        <div className="scroll-progress-wrap flex items-center gap-4 px-[72px] pb-7 max-lg:px-8 max-lg:pb-6 max-sm:px-5 max-sm:pb-5">
          <div className="h-px flex-1 overflow-hidden rounded-[2px] bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full w-0 bg-[linear-gradient(90deg,#2563eb,#0284c7)] ease-linear"
              ref={progressRef}
            />
          </div>
          <span className="min-w-[48px] text-right text-[11px] font-bold tracking-[0.12em] text-slate-700 dark:text-slate-300" ref={labelRef}>
            01 / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        {/* ── Projects Horizontal Viewport ── */}
        <div
          className="proj-viewport overflow-hidden px-[72px] pb-[48px] max-lg:overflow-visible max-lg:px-5 max-lg:pb-16 max-sm:px-5 max-sm:pb-12"
          ref={viewportRef}
          suppressHydrationWarning
        >
          <div
            className="flex w-max items-start gap-5 will-change-transform max-lg:grid max-lg:w-full max-lg:grid-cols-1 max-lg:gap-4 max-lg:![transform:none]"
            ref={trackRef}
            suppressHydrationWarning
          >
            {projects.map((p) => (
              <ProjectCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}