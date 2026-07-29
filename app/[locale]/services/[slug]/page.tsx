import { notFound } from 'next/navigation';
import SingleServicePage from '@/components/pages/services/SingleServicePage';
import { SERVICES } from '@/components/pages/home/ServiceCards/servicesData';
import type { Metadata } from 'next';

export async function generateStaticParams() {
    return SERVICES.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const service = SERVICES.find((s) => s.slug === slug);
    
    if (!service) {
        return {
            title: 'Service Not Found | Nexora Solutions',
        };
    }

    return {
        title: `${service.title} | Nexora Solutions`,
        description: service.description,
    };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = SERVICES.find((s) => s.slug === slug);

    if (!service) {
        notFound();
    }

    return <SingleServicePage service={service} />;
}
