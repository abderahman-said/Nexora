import type { Testimonial } from './types';

export const getClients = (t: any): Testimonial[] => [
    {
        id: "01",
        clientName: t('items.c1.name'),
        role: t('items.c1.role'),
        comment: t('items.c1.comment'),
        rating: 5,
        avatar: "/clients/abdo.png",
    }
];
