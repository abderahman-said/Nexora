import ServicesPage from '@/components/pages/services';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}

export const metadata: Metadata = {
    title: 'Our Services | Nexora Solutions',
    description: 'Explore our comprehensive software engineering services including web development, mobile apps, cloud architecture, AI integration, and UI/UX design tailored for enterprise growth.',
};

export default async function Services({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <ServicesPage />;
}
