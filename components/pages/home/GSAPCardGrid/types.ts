import { LucideIcon } from 'lucide-react';
import { RefObject } from 'react';

export interface Step {
    step: string;
    title: string;
    badge: string;
    description: string;
    features: string[];
    icon: LucideIcon;
    accent: string;
    link: string;
}

export interface ProcessCardProps {
  step: {
    step: string;
    badge: string;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    features: string[];
    accent: string;
    link: string;
  };
}

export interface UseCardGridGSAPProps {
  sectionRef: RefObject<HTMLDivElement | null>;
  cardsRef: RefObject<(HTMLDivElement | null)[]>;
  waveRef: RefObject<SVGSVGElement | null>;
}
