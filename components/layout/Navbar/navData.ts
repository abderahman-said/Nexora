export interface NavLink {
    label: string;
    href: string;
}

export const NAV_LINKS: NavLink[] = [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/#services' },
    { label: 'Our Work', href: '/#portfolio' },
    { label: 'Process', href: '/#process' },
    { label: 'Contact', href: '/contact' },
];
