import { BarChart3, Cpu, Globe, Palette, LucideIcon } from 'lucide-react';

export interface Service {
    id: string;
    title: string;
    badge: string;
    description: string;
    features: string[];
    icon: LucideIcon;
    accent: string;
    link: string;
}

export const SERVICES: Service[] = [
    {
        id: '01',
        title: 'Business Analysis',
        badge: 'STRATEGY',
        description: 'Continually engage customized data strategies and quality growth models tailored for enterprise scalability.',
        features: ['Market Intelligence', 'Data Modeling', 'ROI Optimization'],
        icon: BarChart3,
        accent: '#2563eb',
        link: '#contact',
    },
    {
        id: '02',
        title: 'Software Services',
        badge: 'ARCHITECTURE',
        description: 'End-to-end custom software architecture engineered for high performance, security, and seamless integration.',
        features: ['Custom Microservices', 'Enterprise Security', 'Cloud Automation'],
        icon: Cpu,
        accent: '#0284c7',
        link: '#contact',
    },
    {
        id: '03',
        title: 'Web Development',
        badge: 'FULL-STACK',
        description: 'High-speed, responsive web platforms built with Next.js, modern frameworks, and cloud-native backends.',
        features: ['Next.js & React', 'API Integration', 'High Performance'],
        icon: Globe,
        accent: '#6366f1',
        link: '#contact',
    },
    {
        id: '04',
        title: 'UI/UX Design',
        badge: 'EXPERIENCE',
        description: 'Modern user-centered design systems, intuitive interfaces, and engaging user experiences that convert.',
        features: ['Design Systems', 'Interactive Prototypes', 'User Journeys'],
        icon: Palette,
        accent: '#8b5cf6',
        link: '#contact',
    },
];
