import { Shield, Target, Zap, HeartHandshake, Globe, Rocket, Award, Users } from 'lucide-react';
import type { AboutStat, CoreValue, CompanyStory } from './types';

export const getAboutStats = (t: any): AboutStat[] => [
    { id: 1, label: t('stats.projects_completed'), value: '150+', icon: Rocket, color: 'from-blue-600 to-sky-500' },
    { id: 2, label: t('stats.global_clients'), value: '45+', icon: Globe, color: 'from-sky-500 to-indigo-600' },
    { id: 3, label: t('stats.senior_engineers'), value: '25+', icon: Users, color: 'from-indigo-600 to-blue-600' },
    { id: 4, label: t('stats.industry_awards'), value: '12+', icon: Award, color: 'from-blue-500 to-cyan-400' },
];

export const getCoreValues = (t: any): CoreValue[] => [
    {
        step: '01',
        badge: t('values.val1.badge'),
        icon: Shield,
        title: t('values.val1.title'),
        description: t('values.val1.description'),
        features: [t('values.val1.f1'), t('values.val1.f2'), t('values.val1.f3')],
    },
    {
        step: '02',
        badge: t('values.val2.badge'),
        icon: Zap,
        title: t('values.val2.title'),
        description: t('values.val2.description'),
        features: [t('values.val2.f1'), t('values.val2.f2'), t('values.val2.f3')],
    },
    {
        step: '03',
        badge: t('values.val3.badge'),
        icon: Target,
        title: t('values.val3.title'),
        description: t('values.val3.description'),
        features: [t('values.val3.f1'), t('values.val3.f2'), t('values.val3.f3')],
    },
    {
        step: '04',
        badge: t('values.val4.badge'),
        icon: HeartHandshake,
        title: t('values.val4.title'),
        description: t('values.val4.description'),
        features: [t('values.val4.f1'), t('values.val4.f2'), t('values.val4.f3')],
    },
];

export const getCompanyStory = (t: any): CompanyStory => ({
    subtitle: t('story.subtitle'),
    title: t('story.title'),
    description: t('story.description'),
    paragraphs: [
        t('story.p1'),
        t('story.p2'),
    ],
    highlights: [
        { title: t('story.highlight1_title'), desc: t('story.highlight1_desc') },
        { title: t('story.highlight2_title'), desc: t('story.highlight2_desc') },
        { title: t('story.highlight3_title'), desc: t('story.highlight3_desc') },
    ]
});
