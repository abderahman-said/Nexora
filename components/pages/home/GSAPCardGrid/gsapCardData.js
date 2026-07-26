import { Search, PenTool, Code2, Rocket } from 'lucide-react';

export const STEPS = [
    {
        step: '01',
        title: 'Discover',
        subtitle: 'Research & Strategy',
        description: 'We deep-dive into your business goals, target users, and technical landscape. Every constraint is mapped and every opportunity identified before software architecture begins.',
        tags: ['User Research', 'Competitive Analysis', 'Technical Scoping', 'Roadmap Planning'],
        accent: '#0d9488',
        icon: Search,
        metric: { value: '100%', label: 'Alignment before kickoff' },
    },
    {
        step: '02',
        title: 'Design',
        subtitle: 'UI/UX & Prototyping',
        description: 'Interfaces built on a bulletproof design system. Wireframes to high-fidelity interactive prototypes, validated with user feedback before development begins.',
        tags: ['Design Systems', 'Interactive Prototypes', 'Accessibility Standards', 'Brand Alignment'],
        accent: '#7c3aed',
        icon: PenTool,
        metric: { value: '3×', label: 'Faster delivery with design tokens' },
    },
    {
        step: '03',
        title: 'Develop',
        subtitle: 'Agile Engineering',
        description: 'Production-grade code delivered in agile sprints. Every pull request is reviewed, tested, and benchmarked for optimal performance and maintainability.',
        tags: ['Clean Code Standards', 'Automated Testing', 'Scalable Backend APIs', 'Performance Audits'],
        accent: '#2563eb',
        icon: Code2,
        metric: { value: '99%', label: 'Test coverage target' },
    },
    {
        step: '04',
        title: 'Deploy',
        subtitle: 'Launch & Scale',
        description: 'Zero-downtime production releases on secure cloud infrastructure with real-time monitoring. We stay with you after launch, iterating and scaling as your business grows.',
        tags: ['Cloud Infrastructure', 'Zero-Downtime Deploy', 'Monitoring & Alerts', 'Post-Launch Support'],
        accent: '#d97706',
        icon: Rocket,
        metric: { value: '24/7', label: 'Monitoring & ongoing support' },
    },
];

