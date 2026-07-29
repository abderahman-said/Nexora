export interface Service {
    id: string;
    title: string;
    badge: string;
    description: string;
    features: string[];
    icon: any;
    accent: string;
    link: string;
}

export interface ServiceHeroProps {
    className?: string;
}

export interface ServiceDetailsProps {
    className?: string;
}

export interface ServiceProcessProps {
    className?: string;
}
