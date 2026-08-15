import { LucideIcon } from 'lucide-react';
import { RefObject } from 'react';

export interface Step {
    id?: string | number;
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
    step?: {
        step: number | string;
        badge?: string;
        icon?: React.ComponentType<{ className?: string }>;
        title: string;
        description: string;
        features?: string[];
    };
}

export interface UseCardGridGSAPProps {
  sectionRef: RefObject<HTMLDivElement>;
  cardsRef: RefObject<(HTMLDivElement | null)[]>;
  waveRef: RefObject<SVGSVGElement>;
}
