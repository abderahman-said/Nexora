import { notFound } from 'next/navigation';
import SingleServicePage from '@/components/pages/services/SingleServicePage';
import { getServices, SERVICE_SLUGS } from '@/lib/data/servicesData';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateStaticParams() {
    return SERVICE_SLUGS.map((slug) => ({
        slug: slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }): Promise<Metadata> {
    const { slug, locale } = await params;
    const t = await getTranslations({ locale, namespace: 'homeServices' });
    const services = getServices(t);
    const service = services.find((s) => s.slug === slug);
    
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

export default async function ServicePage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
    const { slug, locale } = await params;
    const t = await getTranslations({ locale, namespace: 'homeServices' });
    const services = getServices(t);
    const service = services.find((s) => s.slug === slug);

    if (!service) {
        notFound();
    }

    return <SingleServicePage service={service} />;
}
