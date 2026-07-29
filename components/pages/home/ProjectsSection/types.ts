export interface Project {
  id: string;
  name: string;
  category?: string;
  image: string;
  skills?: string[];
  link?: string;
  accent?: string;
}

export interface ProjectCardProps {
  p: Project;
}
