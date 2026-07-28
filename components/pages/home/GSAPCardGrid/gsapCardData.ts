import { ClipboardList, MonitorCheck, Settings2, TrendingUp } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

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

export const STEPS: Step[] = [
    {
        step: '01',
        title: 'Select a project',
        badge: 'DISCOVERY',
        description: 'Continua scale empowered metrics with cost effective innovation and strategic alignment.',
        features: ['Requirements Scoping', 'Target User Profiling', 'ROI Strategy'],
        icon: ClipboardList,
        accent: '#2563eb',
        link: '#contact',
    },
    {
        step: '02',
        title: 'Project analysis',
        badge: 'ANALYSIS',
        description: 'Comprehensive data modeling and system architecture analysis for optimal performance.',
        features: ['Architecture Blueprint', 'Data Flow Design', 'Security Audit'],
        icon: MonitorCheck,
        accent: '#0284c7',
        link: '#contact',
    },
    {
        step: '03',
        title: 'Plan Execute',
        badge: 'EXECUTION',
        description: 'Sprint execution, agile development, and clean code implementation with rigorous testing.',
        features: ['Sprint Development', 'Automated Testing', 'Code Quality Check'],
        icon: Settings2,
        accent: '#6366f1',
        link: '#contact',
    },
    {
        step: '04',
        title: 'Deliver result',
        badge: 'DELIVERY',
        description: 'Seamless cloud deployment, high availability release, and measurable business growth.',
        features: ['Zero-Downtime Launch', 'Performance Audits', '24/7 Monitoring'],
        icon: TrendingUp,
        accent: '#8b5cf6',
        link: '#contact',
    },
];
