import { Mail, Phone, MapPin, Clock, MessageSquare, Send, Globe, Shield } from 'lucide-react';

export const CONTACT_INFO = [
    {
        id: 1,
        title: 'Direct Email',
        value: 'info@nexora-solutions.co',
        subtext: 'Our team responds within 2 hours',
        icon: Mail,
        action: 'mailto:info@nexora-solutions.co',
        actionText: 'Send Email',
    },
    {
        id: 2,
        title: 'Call / WhatsApp',
        value: '+20 111 718 0818',
        subtext: 'Mon - Fri, 9:00 AM - 6:00 PM EST',
        icon: Phone,
        action: 'https://wa.me/201117180818',
        actionText: 'WhatsApp Us',
    },
    {
        id: 3,
        title: 'Headquarters',
        value: 'Cairo Digital Hub, Egypt',
        subtext: 'Tech Innovation District',
        icon: MapPin,
        action: '#map',
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

export const SERVICE_CATEGORIES = [
    'Custom Web & Enterprise App Development',
    'Mobile App Development (iOS / Android)',
    'Cloud Architecture & DevOps Infrastructure',
    'AI Integration & Automation Solutions',
    'UI/UX Luxury Product Redesign',
    'Technical Advisory & Code Audit',
];

export const BUDGET_RANGES = [
    '$5k - $10k',
    '$10k - $25k',
    '$25k - $50k',
    '$50k+',
];
