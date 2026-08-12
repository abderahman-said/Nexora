

import ProjectCard from "@/components/pages/home/ProjectsSection/ProjectCard";
import { projectService } from "@/lib/services/projectService";
import Container from "@/components/ui/Container";

export default function ProjectsSection() {
  const allProjects = projectService.getAllProjects();

  return (
    <section
      id="portfolio"
      className="scroll-section relative w-full py-8 md:py-10 transition-colors duration-300 overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mt-8">
          {allProjects.map((project, index) => (
            <ProjectCard key={project.id} p={project} priority={index < 6} />
          ))}
        </div>
      </Container>
    </section>
  );
}
