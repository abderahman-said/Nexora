"use client";

import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { projectService } from "@/lib/services/projectService";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import GSAPSlider from "@/components/ui/GSAPSlider";
import { useProjectsGSAP } from "./useProjectsGSAP";

export default function ProjectsSection() {
  const allProjects = projectService.getAllProjects();
  const sectionRef = useRef<HTMLElement>(null);
  const sliderWrapperRef = useRef<HTMLDivElement>(null);

  useProjectsGSAP(sectionRef, sliderWrapperRef);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="scroll-section relative w-full py-8 md:py-10 transition-colors duration-300 overflow-hidden"
    >
      <Container>
        {/* Section Header */}
        <SectionHeader
          className="!mb-0"
          title={
            <span className="inline-flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75 shadow-[0_0_12px_#2563eb]" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-blue-500 shadow-[0_0_12px_#2563eb]" />
              </span>
              <span>
                Our{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                  Work
                </span>
              </span>
            </span>
          }
        />

        <div
          ref={sliderWrapperRef}
          className="w-full mt-[-10px] md:!mt-[-35px]"
        >
          <GSAPSlider
            items={allProjects}
            defaultVisibleCount={3}
            mobileVisibleCount={1}
            centerModeMobile={true}
            centerCardWidthPercent={76}
            showControls={false}
            controlsPosition="center"
            showDots={true}
            autoplay={false}
            pauseOnHover={false}
            enableDrag={true}
            infinite={true}
            activeScale={1}
            inactiveScale={0.9}
            inactiveOpacity={0.6}
            renderItem={(p) => <ProjectCard key={p.id} p={p} />}
          />
        </div>
      </Container>
    </section>
  );
}
