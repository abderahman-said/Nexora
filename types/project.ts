import { ReactNode } from "react";

export interface Project {
  id: string;
  name: string;
  accent: string;
  image: string;
  link: string;
  category: string;
}
export interface ProjectsCoverflowSliderProps {
  items: Project[];
  renderItem: (item: Project, index: number, isActive: boolean) => ReactNode;
  autoplay?: boolean;
  autoplayInterval?: number;
  showDots?: boolean;
  pauseOnHover?: boolean;
  enableDrag?: boolean;
  className?: string;
}