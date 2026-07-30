

import ProjectCard from "@/components/pages/home/ProjectsSection/ProjectCard";
import { projectService } from "@/lib/services/projectService";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";

export default function ProjectsSection() {
  const allProjects = projectService.getAllProjects();

  return (
    <section
      id="portfolio"
      className="scroll-section relative w-full py-8 md:py-10 transition-colors duration-300 overflow-hidden"
    >
      <Container>
        {/* Section Header */}
        <SectionHeader
          className="!mb-8 md:!mb-12"
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mt-8">
          {allProjects.map((project) => (
            <ProjectCard key={project.id} p={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
