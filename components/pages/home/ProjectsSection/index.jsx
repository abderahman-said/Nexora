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
  const introRef = useRef(null);
  const introLabelRef = useRef(null);
  const introTextRef = useRef(null);

  useProjectsGSAP({
    pinContainerRef, viewportRef, trackRef, progressRef,
    labelRef, contentRef, introRef, introLabelRef, introTextRef
  });

  return (
    <div
      id="portfolio"
      className="pin-container relative flex min-h-screen w-full flex-col justify-center bg-[#f8fafc] dark:bg-[#060913] transition-colors duration-300 border-t border-slate-200/80 dark:border-slate-800/80"
      ref={pinContainerRef}
      suppressHydrationWarning
    >

      {/* ── Intro overlay ── */}
      <div
        className="flex origin-center flex-col items-center justify-center gap-4 px-6 pointer-events-none [will-change:transform,opacity] text-center"
        ref={introRef}
        suppressHydrationWarning
      >
        <div ref={introLabelRef} suppressHydrationWarning>
          <SectionHeader
            tag="Portfolio"
            badge="Featured Case Studies"
            badgeColor="success"
            title="Selected"
            highlight="Works"
            align="center"
            titleRef={introTextRef}
            animClass="gsap-managed"
            className="!mb-0"
          />
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="[will-change:opacity]" ref={contentRef} suppressHydrationWarning>

        <div
          className="proj-heading-wrap px-[72px] pb-6 pt-12 max-lg:px-8 max-lg:pb-7 max-sm:px-5 max-sm:pb-5 max-sm:pt-10"
          suppressHydrationWarning
        >
          <SectionHeader
            tag="Portfolio"
            badge="Featured Case Studies"
            badgeColor="success"
            title="Selected"
            highlight="Works"
            align="between"
            animClass="gsap-managed proj-heading"
            rightElement={
              <div className="proj-meta flex flex-col items-end gap-1.5 pb-1.5 max-sm:items-start">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  {String(projects.length).padStart(2, "0")} Projects
                </span>
                <span className="flex items-center gap-2 text-[11px] font-medium tracking-[0.08em] text-slate-400 dark:text-slate-500 before:inline-block before:h-px before:w-7 before:bg-slate-300 dark:before:bg-slate-700 before:content-[''] max-lg:hidden">
                  Scroll to explore
                </span>
              </div>
            }
          />
        </div>

        <div className="scroll-progress-wrap flex items-center gap-4 px-[72px] pb-7 [will-change:opacity,transform] max-lg:px-8 max-lg:pb-6 max-sm:px-5 max-sm:pb-5">
          <div className="h-px flex-1 overflow-hidden rounded-[2px] bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full w-0 bg-[linear-gradient(90deg,#2563eb,#0284c7)] ease-linear"
              ref={progressRef}
            />
          </div>
          <span className="min-w-[48px] text-right text-[11px] font-bold tracking-[0.12em] text-slate-500 dark:text-slate-400" ref={labelRef}>
            01 / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <div
          className="proj-viewport overflow-hidden px-[72px] pb-[72px] [will-change:opacity,transform] max-lg:overflow-visible max-lg:px-5 max-lg:pb-16 max-sm:px-5 max-sm:pb-12"
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

    </div>
  );
}