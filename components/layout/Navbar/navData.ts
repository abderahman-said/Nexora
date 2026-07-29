import type { NavLink } from './types';

export const getNavLinks = (t: (key: string) => string, locale: string): NavLink[] => [
    { label: t('nav.about'), href: `/${locale}/about` },
    { label: t('nav.services'), href: `/${locale}/services` },
    { label: t('nav.ourWork'), href: `/${locale}/#portfolio` },
    // { label: t('nav.process'), href: `/${locale}/#process` },
    { label: t('nav.contact'), href: `/${locale}/contact` },
];
