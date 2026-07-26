import { Code2, Palette, Cpu, Target, Settings } from 'lucide-react';

export const SERVICES = [
    {
        id: '01',
        title: 'Application Development',
        description: 'High-performance mobile and web applications built with scalable architecture and enterprise-grade quality.',
        features: ['Web Applications', 'Mobile Apps (iOS & Android)', 'High Speed & Responsiveness', 'Scalable API Infrastructure'],
        icon: Code2,
        accent: '#0284c7',
        size: 'large',
    },
    {
        id: '02',
        title: 'UI/UX Design',
        description: 'Modern, user-centered designs focused on seamless usability, intuitive user journeys, and engaging interfaces.',
        features: ['Comprehensive Design Systems', 'Interactive Prototypes', 'User Behavior Research', 'Modern & Accessible UI'],
        icon: Palette,
        accent: '#6366f1',
        size: 'small',
    },
    {
        id: '03',
        title: 'Integrated Tech Solutions',
        description: 'Smart digital solutions that drive digital transformation and optimize business operations for sustainable growth.',
        features: ['Digital Transformation', 'Smart Business Systems', 'Seamless System Integrations', 'Data Security & Protection'],
        icon: Cpu,
        accent: '#10b981',
        size: 'small',
    },
    {
        id: '04',
        title: 'Technical Consulting',
        description: 'Expert guidance helping you select the right strategy, technical architecture, and roadmap for your product success.',
        features: ['System Architecture Scoping', 'Digital Strategy', 'System Audit & Optimization', 'Technical Project Advisory'],
        icon: Target,
        accent: '#f59e0b',
        size: 'small',
    },
    {
        id: '05',
        title: 'Enterprise Custom Software',
        description: 'End-to-end tailored software systems engineered to streamline complex business logic and scale effortlessly.',
        features: ['Tailored System Architecture', 'Custom Workflow Engines', 'High Availability & Security', 'Continuous Maintenance'],
        icon: Settings,
        accent: '#a855f7',
        size: 'small',
    },
];

