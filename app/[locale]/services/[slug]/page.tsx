import { notFound } from 'next/navigation';
import SingleServicePage from '@/components/pages/services/SingleServicePage';
import { getServices, SERVICE_SLUGS } from '@/lib/data/servicesData';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateStaticParams() {
  const locales = ['ar', 'en'];
  return locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }): Promise<Metadata> {
    const { slug, locale } = await params;
    setRequestLocale(locale);
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
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'homeServices' });
    const services = getServices(t);
    const service = services.find((s) => s.slug === slug);

    if (!service) {
        notFound();
    }

    return <SingleServicePage service={service} />;
}
