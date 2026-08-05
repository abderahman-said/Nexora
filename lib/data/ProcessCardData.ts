import { ClipboardList, MonitorCheck, Settings2, TrendingUp } from 'lucide-react';
import type { Step } from '@/components/pages/home/ProcessSection/types';
import { useTranslations } from 'next-intl';

export const getSteps = (t: ReturnType<typeof useTranslations>): Step[] => [
    {
        step: '01',
        title: t('steps.step1.title'),
        badge: t('steps.step1.badge'),
        description: t('steps.step1.description'),
        features: [t('steps.step1.feature_1'), t('steps.step1.feature_2'), t('steps.step1.feature_3')],
        icon: ClipboardList,
        accent: '#2563eb',
        link: '#contact',
    },
    {
        step: '02',
        title: t('steps.step2.title'),
        badge: t('steps.step2.badge'),
        description: t('steps.step2.description'),
        features: [t('steps.step2.feature_1'), t('steps.step2.feature_2'), t('steps.step2.feature_3')],
        icon: MonitorCheck,
        accent: '#0284c7',
        link: '#contact',
    },
    {
        step: '03',
        title: t('steps.step3.title'),
        badge: t('steps.step3.badge'),
        description: t('steps.step3.description'),
        features: [t('steps.step3.feature_1'), t('steps.step3.feature_2'), t('steps.step3.feature_3')],
        icon: Settings2,
        accent: '#6366f1',
        link: '#contact',
    },
    {
        step: '04',
        title: t('steps.step4.title'),
        badge: t('steps.step4.badge'),
        description: t('steps.step4.description'),
        features: [t('steps.step4.feature_1'), t('steps.step4.feature_2'), t('steps.step4.feature_3')],
        icon: TrendingUp,
        accent: '#8b5cf6',
        link: '#contact',
    },
];
