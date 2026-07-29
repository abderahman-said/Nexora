import { Shield, Target, Zap, HeartHandshake, Globe, Rocket, Award, Users } from 'lucide-react';
import type { AboutStat, CoreValue, CompanyStory } from './types';

export const ABOUT_STATS: AboutStat[] = [
    { id: 1, label: 'Projects Completed', value: '150+', icon: Rocket, color: 'from-blue-600 to-sky-500' },
    { id: 2, label: 'Global Clients', value: '45+', icon: Globe, color: 'from-sky-500 to-indigo-600' },
    { id: 3, label: 'Senior Engineers', value: '25+', icon: Users, color: 'from-indigo-600 to-blue-600' },
    { id: 4, label: 'Industry Awards', value: '12+', icon: Award, color: 'from-blue-500 to-cyan-400' },
];

export const CORE_VALUES: CoreValue[] = [
    {
        step: '01',
        badge: 'Excellence',
        icon: Shield,
        title: 'Uncompromised Quality',
        description: 'We adhere to enterprise-grade engineering standards, clean architecture, and rigorous automated testing across every line of code.',
        features: ['Clean Code Standard', 'Zero-Downtime CI/CD', 'Security First'],
    },
    {
        step: '02',
        badge: 'Innovation',
        icon: Zap,
        title: 'Cutting-Edge Technology',
        description: 'Leveraging next-gen web frameworks, cloud-native infrastructure, and modern UI performance optimization for high-scale platforms.',
        features: ['Next.js 15 & React 19', 'Cloud Architecture', 'Real-time AI Integration'],
    },
    {
        step: '03',
        badge: 'Transparency',
        icon: Target,
        title: 'Client-Centric Alignment',
        description: 'We believe in agile collaboration, transparent roadmap tracking, and complete alignment with your long-term business strategy.',
        features: ['Weekly Demos', 'Agile Roadmaps', 'Direct Communication'],
    },
    {
        step: '04',
        badge: 'Reliability',
        icon: HeartHandshake,
        title: 'Long-Term Partnership',
        description: 'Our relationship does not end at launch. We provide 24/7 proactive monitoring, scalable updates, and ongoing technical advisory.',
        features: ['24/7 SLA Support', 'Continuous Optimization', 'Scalability Audits'],
    },
];

export const COMPANY_STORY: CompanyStory = {
    subtitle: 'OUR JOURNEY',
    title: 'Architecting Digital Transformation Since 2021',
    description: 'Nexora Solutions was founded by a team of passionate software architects and engineers driven by a single mission: to bridge the gap between complex enterprise challenges and modern, high-performance software products.',
    paragraphs: [
        'From day one, we set out to build digital products that combine aesthetic beauty with rock-solid technical reliability. We empower fast-growing tech companies and established enterprises to scale seamlessly.',
        'Today, our multi-disciplinary team spans full-stack engineering, cloud DevOps, AI integration, and luxury UX design—serving visionary clients across North America, Europe, and the MENA region.',
    ],
    highlights: [
        { title: 'Enterprise Standard', desc: 'Compliant with ISO & modern cybersecurity benchmarks.' },
        { title: '99.9% Uptime Guarantee', desc: 'Robust cloud infrastructure designed for high availability.' },
        { title: 'Agile Delivery', desc: 'Rapid sprint cycles with predictable milestones.' },
    ]
};
