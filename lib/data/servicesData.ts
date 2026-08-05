import type { Service } from '@/components/pages/home/ServiceCards/types';
import { useTranslations } from 'next-intl';

export const SERVICE_SLUGS = [
    'business-analysis',
    'software-services',
    'web-development',
    'ui-ux-design',
] as const;

export const getServices = (t: ReturnType<typeof useTranslations>): Service[] => [
    {
        id: '01',
        slug: 'business-analysis',
        title: t('items.business_analysis.title'),
        badge: t('items.business_analysis.badge'),
        description: t('items.business_analysis.description'),
        features: [t('items.business_analysis.feature_1'), t('items.business_analysis.feature_2'), t('items.business_analysis.feature_3')],
        icon: 'BarChart3',
        accent: '#2563eb',
        link: '/services/business-analysis',
    },
    {
        id: '02',
        slug: 'software-services',
        title: t('items.software_services.title'),
        badge: t('items.software_services.badge'),
        description: t('items.software_services.description'),
        features: [t('items.software_services.feature_1'), t('items.software_services.feature_2'), t('items.software_services.feature_3')],
        icon: 'Cpu',
        accent: '#0284c7',
        link: '/services/software-services',
    },
    {
        id: '03',
        slug: 'web-development',
        title: t('items.web_development.title'),
        badge: t('items.web_development.badge'),
        description: t('items.web_development.description'),
        features: [t('items.web_development.feature_1'), t('items.web_development.feature_2'), t('items.web_development.feature_3')],
        icon: 'Globe',
        accent: '#6366f1',
        link: '/services/web-development',
    },
    {
        id: '04',
        slug: 'ui-ux-design',
        title: t('items.ui_ux_design.title'),
        badge: t('items.ui_ux_design.badge'),
        description: t('items.ui_ux_design.description'),
        features: [t('items.ui_ux_design.feature_1'), t('items.ui_ux_design.feature_2'), t('items.ui_ux_design.feature_3')],
        icon: 'Palette',
        accent: '#8b5cf6',
        link: '/services/ui-ux-design',
    },
];
