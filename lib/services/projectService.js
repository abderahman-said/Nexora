import { projects } from "@/components/pages/home/ProjectsSection/projectsData";

/**
 * 💡 Repository / Service Pattern: projectService
 * Decouples data access from React components.
 * If you connect a Database or Headless CMS (Sanity, Strapi, Contentful) in the future,
 * update this service file only without changing component logic.
 */
export const projectService = {
  /**
   * Get all portfolio projects
   */
  getAllProjects() {
    return projects;
  },

  /**
   * Get total project count
   */
  getProjectCount() {
    return projects.length;
  },

  /**
   * Find project by ID
   */
  getProjectById(id) {
    return projects.find((p) => p.id === id);
  },

  /**
   * Filter projects by category
   */
  getProjectsByCategory(category) {
    if (!category) return projects;
    return projects.filter((p) =>
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }
};
