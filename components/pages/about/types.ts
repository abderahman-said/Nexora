import { LucideIcon } from 'lucide-react';

export interface AboutStat {
    id: number;
    label: string;
    value: string;
    icon: LucideIcon;
    color: string;
}

export interface CoreValue {
    step: string;
    badge: string;
    icon: LucideIcon;
    title: string;
    description: string;
    features: string[];
}

export interface CompanyHighlight {
    title: string;
    desc: string;
}

export interface CompanyStory {
    subtitle: string;
    title: string;
    description: string;
    paragraphs: string[];
    highlights: CompanyHighlight[];
}
