"use client";

import { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { projectService } from "@/lib/services/projectService";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import { useProjectsGSAP } from "./useProjectsGSAP";

export default function ProjectsSection() {
  const allProjects = projectService.getAllProjects();
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const categories = [
    "All",
    "Mobile E-Commerce",
    "SaaS Platform",
    "Multi-Role Platform",
    "Hotel Booking",
  ];

  const filteredProjects = activeCategory === "All"
    ? allProjects
    : allProjects.filter((p) => p.category === activeCategory);

  // Hook handles 3D entrance stagger + 3D Scroll Float & Sink Parallax
  useProjectsGSAP(sectionRef, gridRef, activeCategory);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="scroll-section relative w-full py-16 sm:py-24 bg-white dark:bg-[#060913] transition-colors duration-300 border-b border-slate-200/90 dark:border-slate-800/80"
    >
      <Container>
        {/* Section Header */}
        <SectionHeader
          tag="Portfolio"
          badge="Featured Case Studies"
          badgeColor="info"
          title="Selected"
          highlight="Works"
          align="between"
          rightElement={
            <div className="flex flex-col items-end gap-1.5 pb-1.5 max-sm:items-start">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700 dark:text-slate-300">
                {String(filteredProjects.length).padStart(2, "0")} / {String(allProjects.length).padStart(2, "0")} Projects
              </span>
            </div>
          }
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                  : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Interactive Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 [perspective:1000px]"
        >
          {filteredProjects.map((p) => (
            <ProjectCard key={p.id} p={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}