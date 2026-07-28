import { BrandLogo, SocialIconLink, ServiceCardData, AnimationConfig } from "@/types/data";

// Marquee brand logos
export const brands: BrandLogo[] = [
    { name: "oxxio", src: "/assets/Brand Logos SVG/oxxio_logo.svg" },
    { name: "hema", src: "/assets/Brand Logos SVG/hema_logo.svg" },
    { name: "kfc", src: "/assets/Brand Logos SVG/kfc_logo.svg" },
    { name: "swapfiets", src: "/assets/Brand Logos SVG/swapfiets_logo.svg" },
    { name: "anwb", src: "/assets/Brand Logos SVG/anwb_logo.svg" },
    { name: "netflix", src: "/assets/Brand Logos SVG/netflix_logo.svg" },
    { name: "ace-tate", src: "/assets/Brand Logos SVG/ace_tate_logo.svg" },
    { name: "getir", src: "/assets/Brand Logos SVG/getir_logo.svg" }
];

// Marquee background colors
export const colors: string[] = [
    "var(--color-green)",
    "var(--color-lightblue)",
    "var(--color-darkblue)",
    "var(--color-lightgreen)",
    "var(--color-orange)",
    "var(--color-maroon)",
    "var(--color-pink)"
];

// Footer social icon links
export const SOCIAL_ICONS: SocialIconLink[] = [
    {
        href: 'https://www.facebook.com/share/1LG3q28mVc/?mibextid=wwXIfr',
        label: 'Facebook',
        icon: 'Facebook'
    },
    {
        href: 'https://www.instagram.com/nexora.solutions.eg?igsh=OXp1eWRta3pveXhm&utm_source=qr',
        label: 'Instagram',
        icon: 'Instagram'
    },
    {
        href: 'https://www.linkedin.com/company/nexora-solutions-co/',
        label: 'LinkedIn',
        icon: 'Linkedin'
    }
];

// Service cards data
export const CARDS_DATA: ServiceCardData[] = [
    {
        color: 'green',
        sticker: 'smiley',
        title: 'Application Development',
        services: [
            'Mobile & Web Applications',
            'High-Performance Solutions',
            'Smart Management Dashboards',
            'Scalable Web APIs',
            'Enterprise-Grade Quality',
            'Extensible Architecture'
        ]
    },
    {
        color: 'darkblue',
        sticker: 'phone',
        title: 'UI/UX Design',
        services: [
            'Modern & Engaging Interfaces',
            'Unified Design Systems',
            'User Behavior & Research',
            'Interactive High-Fi Prototypes',
            'Intuitive User Journeys',
            'Customer Experience Optimization'
        ]
    },
    {
        color: 'orange',
        sticker: 'camera',
        title: 'Integrated Tech Solutions',
        services: [
            'Digital Transformation',
            'Smart Enterprise Platforms',
            'Custom Software Development',
            'Seamless System Integration',
            'Operational Efficiency',
            'Data Protection & Security'
        ]
    },
    {
        color: 'maroon',
        sticker: 'hand',
        title: 'Technical Consulting',
        services: [
            'Strategic Technology Roadmap',
            'Project Planning & Scoping',
            'System Modernization & Audit',
            'Software Architecture Advisory',
            'Technical Project Leadership',
            'Quality & Performance Assurance'
        ]
    },
    {
        color: 'pink',
        sticker: 'smiley',
        title: 'Enterprise Custom Software',
        services: [
            'Tailored Software Architecture',
            'Custom Workflow Systems',
            'Scalable Enterprise Platforms',
            'High Availability & Security',
            'End-to-End System Design',
            'Maintenance & Tech Support'
        ]
    }
];

// Animation Configurations
export const ANIMATION_CONFIG: AnimationConfig = {
    transitionScribble: {
        strokeWidthStart: "8%",
        strokeWidthMax: "31%",
        scale: 0.7,
        durationIn: 2.2,
        durationOut: 2.7
    }
};
