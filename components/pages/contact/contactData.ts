import { Mail, Phone, MapPin } from 'lucide-react';
import type { ContactInfoItem } from './types';
import { useSiteData } from '@/hooks/useSiteData';
import { useTranslations } from 'next-intl';

export function useContactInfo() {
    const siteData = useSiteData();
    const t = useTranslations('contact');

    const CONTACT_INFO: ContactInfoItem[] = [
        {
            id: 1,
            title: t('info.email_title'),
            value: siteData.contact.email,
            subtext: t('info.email_sub'),
            icon: Mail,
            action: `mailto:${siteData.contact.email}`,
            actionText: t('info.email_action'),
        },
        {
            id: 2,
            title: t('info.phone_title'),
            value: siteData.contact.phone,
            subtext: siteData.contact.workingHours,
            icon: Phone,
            action: siteData.contact.whatsapp,
            actionText: t('info.phone_action'),
        },
        {
            id: 3,
            title: t('info.address_title'),
            value: siteData.contact.shortAddress,
            subtext: t('info.address_sub'),
            icon: MapPin,
            action: siteData.map.linkUrl,
            actionText: t('info.address_action'),
        },
        // {
        //     id: 4,
        //     title: 'Global SLA Support',
        //     value: '24/7 Monitoring',
        //     subtext: 'Dedicated enterprise hotline',
        //     icon: Clock,
        //     action: '#consultation',
        //     actionText: 'Enterprise SLA',
        // },
    ];

    return CONTACT_INFO;
}

export const SERVICE_CATEGORIES: string[] = [
    'Custom Web & Enterprise App Development',
    'Mobile App Development (iOS / Android)',
    'Cloud Architecture & DevOps Infrastructure',
    'AI Integration & Automation Solutions',
    'UI/UX Luxury Product Redesign',
    'Technical Advisory & Code Audit',
];

export const BUDGET_RANGES: string[] = [
    '$5k - $10k',
    '$10k - $25k',
    '$25k - $50k',
    '$50k+',
];
