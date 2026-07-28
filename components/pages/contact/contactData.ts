import { Mail, Phone, MapPin, Clock, LucideIcon } from 'lucide-react';

export interface ContactInfoItem {
    id: number;
    title: string;
    value: string;
    subtext: string;
    icon: LucideIcon;
    action: string;
    actionText: string;
}

import { useSiteData } from '@/hooks/useSiteData';

export function useContactInfo() {
    const siteData = useSiteData();

    const CONTACT_INFO: ContactInfoItem[] = [
        {
            id: 1,
            title: 'Direct Email',
            value: siteData.contact.email,
            subtext: 'Our team responds within 2 hours',
            icon: Mail,
            action: `mailto:${siteData.contact.email}`,
            actionText: 'Send Email',
        },
        {
            id: 2,
            title: 'Call / WhatsApp',
            value: siteData.contact.phone,
            subtext: siteData.contact.workingHours,
            icon: Phone,
            action: siteData.contact.whatsapp,
            actionText: 'WhatsApp Us',
        },
        {
            id: 3,
            title: 'Headquarters',
            value: siteData.contact.shortAddress,
            subtext: 'Tech Innovation District',
            icon: MapPin,
            action: siteData.map.linkUrl,
            actionText: 'View Location',
        },
        {
            id: 4,
            title: 'Global SLA Support',
            value: '24/7 Monitoring',
            subtext: 'Dedicated enterprise hotline',
            icon: Clock,
            action: '#consultation',
            actionText: 'Enterprise SLA',
        },
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
