import type { NavLink } from '@/components/layout/Navbar/types';

export const getNavLinks = (t: (key: string) => string, locale: string): NavLink[] => [
    { label: t('nav.about'), href: `/${locale}/about` },
    { label: t('nav.services'), href: `/${locale}/services` },
    { label: t('nav.ourWork'), href: `/${locale}/projects` },
    { label: t('nav.blog'), href: `/${locale}/blog` },
    { label: t('nav.contact'), href: `/${locale}/contact` },
];
