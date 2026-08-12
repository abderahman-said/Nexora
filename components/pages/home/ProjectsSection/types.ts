export interface Project {
  id: string;
  name: string;
  image: string;
  link?: string;
  accent?: string;
  category: string;
}

export interface ProjectCardProps {
  p: Project;
  priority?: boolean;
}
