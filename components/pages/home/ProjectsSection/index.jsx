"use client";

import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "./projectsData";
import { useProjectsGSAP } from "./useProjectsGSAP";

export default function ProjectsSection() {
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
      className="pin-container flex min-h-screen w-full flex-col justify-center bg-[#f8fafc] dark:bg-[#090d16] transition-colors duration-300"
      ref={pinContainerRef}
      suppressHydrationWarning
    >

      {/* ── Intro overlay ── */}
      <div
        className="flex origin-center flex-col items-center justify-center gap-4 px-6 pointer-events-none [will-change:transform,opacity] text-center"
        ref={introRef}
        suppressHydrationWarning
      >
        <span
          className="text-[clamp(16px,2vw,24px)] font-bold uppercase tracking-[0.28em] text-[#2563eb]"
          ref={introLabelRef}
          suppressHydrationWarning
        >
          Our Work
        </span>
        <h2
          className="m-0 text-center text-[clamp(40px,6.5vw,110px)] font-black leading-none tracking-[-0.04em] text-slate-900 dark:text-white [will-change:opacity,transform]"
          ref={introTextRef}
          suppressHydrationWarning
        >
          Selected{' '}
          <em className="italic font-normal text-transparent [-webkit-text-stroke:1.5px_rgba(15,23,42,0.3)] dark:[-webkit-text-stroke:1.5px_rgba(255,255,255,0.3)]">
            Works
          </em>
        </h2>
      </div>

      {/* ── Main content ── */}
      <div className="[will-change:opacity]" ref={contentRef} suppressHydrationWarning>

        <div
          className="proj-heading-wrap flex flex-wrap items-end justify-between gap-8 px-[72px] pb-6 pt-12 max-lg:px-8 max-lg:pb-7 max-sm:flex-col max-sm:items-start max-sm:px-5 max-sm:pb-5 max-sm:pt-10"
          suppressHydrationWarning
        >
          <h2
            className="proj-heading m-0 text-[clamp(36px,5.5vw,80px)] font-black leading-[0.95] tracking-[-0.04em] text-slate-900 dark:text-white [will-change:opacity,transform]"
            suppressHydrationWarning
          >
            Selected{' '}
            <em className="font-normal italic text-transparent [-webkit-text-stroke:1.5px_rgba(15,23,42,0.3)] dark:[-webkit-text-stroke:1.5px_rgba(255,255,255,0.3)]">
              Works
            </em>
          </h2>
          <div className="proj-meta flex flex-col items-end gap-1.5 pb-1.5 [will-change:opacity,transform] max-sm:items-start">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {String(projects.length).padStart(2, "0")} Projects
            </span>
            <span className="flex items-center gap-2 text-[11px] font-medium tracking-[0.08em] text-slate-400 dark:text-slate-500 before:inline-block before:h-px before:w-7 before:bg-slate-300 dark:before:bg-slate-700 before:content-[''] max-lg:hidden">
              Scroll to explore
            </span>
          </div>
        </div>

        <div className="scroll-progress-wrap flex items-center gap-4 px-[72px] pb-7 [will-change:opacity,transform] max-lg:px-8 max-lg:pb-6 max-sm:px-5 max-sm:pb-5">
          <div className="h-px flex-1 overflow-hidden rounded-[2px] bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full w-0 bg-[linear-gradient(90deg,#2563eb,#0284c7)] transition-[width] duration-[80ms] ease-linear"
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