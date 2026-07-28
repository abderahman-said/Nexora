import { projects } from "@/components/pages/home/ProjectsSection/projectsData";
import { Project } from "@/types/project";

/**
 * 💡 Repository / Service Pattern: projectService
 * Decouples data access from React components.
 */
export const projectService = {
  /**
   * Get all portfolio projects
   */
  getAllProjects(): Project[] {
    return projects;
  },

  /**
   * Get total project count
   */
  getProjectCount(): number {
    return projects.length;
  },

  /**
   * Find project by ID
   */
  getProjectById(id: string): Project | undefined {
    return projects.find((p) => p.id === id);
  },

  /**
   * Filter projects by category
   */
  getProjectsByCategory(category?: string): Project[] {
    if (!category) return projects;
    return projects.filter((p) =>
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }
};
