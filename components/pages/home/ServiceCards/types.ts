export interface ServiceCardProps {
    service: Service;
    className?: string;
}

export interface Service {
    id: string;
    slug: string;
    title: string;
    badge: string;
    description: string;
    features: string[];
    icon: string;
    accent: string;
    link: string;
}
