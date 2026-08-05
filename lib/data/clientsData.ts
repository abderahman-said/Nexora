import type { Testimonial } from '@/components/pages/home/ClientsSection/types';
import { useTranslations } from 'next-intl';

export const getClients = (t: ReturnType<typeof useTranslations>): Testimonial[] => [
    {
        id: "01",
        clientName: t('items.c1.name'),
        role: t('items.c1.role'),
        comment: t('items.c1.comment'),
        rating: 5,
        avatar: "/clients/abdo.png",
    }
];
