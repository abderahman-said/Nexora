import type { Service } from '@/components/pages/home/ServiceCards/types';
import { useTranslations } from 'next-intl';

export const SERVICE_SLUGS = [
    'web-development',
    'mobile-development',
    'software-services',
    'business-analysis',
    'ui-ux-design',
] as const;

export const getServices = (t: ReturnType<typeof useTranslations>): Service[] => [
    {
        id: '01',
        slug: 'web-development',
        title: t('items.web_development.title'),
        badge: t('items.web_development.badge'),
        description: t('items.web_development.description'),
        features: [
            t('items.web_development.feature_1'),
            t('items.web_development.feature_2'),
            t('items.web_development.feature_3'),
            t('items.web_development.feature_4'),
            t('items.web_development.feature_5'),
            t('items.web_development.feature_6'),
        ],
        icon: 'Globe',
        accent: '#2563eb',
        link: '/services/web-development',
    },
    {
        id: '02',
        slug: 'mobile-development',
        title: t('items.mobile_development.title'),
        badge: t('items.mobile_development.badge'),
        description: t('items.mobile_development.description'),
        features: [
            t('items.mobile_development.feature_1'),
            t('items.mobile_development.feature_2'),
            t('items.mobile_development.feature_3'),
            t('items.mobile_development.feature_4'),
            t('items.mobile_development.feature_5'),
            t('items.mobile_development.feature_6'),
        ],
        icon: 'Smartphone',
        accent: '#0284c7',
        link: '/services/mobile-development',
    },
    {
        id: '03',
        slug: 'software-services',
        title: t('items.software_services.title'),
        badge: t('items.software_services.badge'),
        description: t('items.software_services.description'),
        features: [
            t('items.software_services.feature_1'),
            t('items.software_services.feature_2'),
            t('items.software_services.feature_3'),
            t('items.software_services.feature_4'),
            t('items.software_services.feature_5'),
            t('items.software_services.feature_6'),
        ],
        icon: 'Cpu',
        accent: '#6366f1',
        link: '/services/software-services',
    },
];
