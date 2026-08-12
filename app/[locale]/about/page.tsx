import AboutPage from '@/components/pages/about';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}

export const metadata: Metadata = {
    title: 'About Us | Nexora Solutions',
    description: 'Discover the story, engineering standards, core values, and executive team at Nexora Solutions. Empowering enterprise growth through scalable digital engineering.',
};

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <AboutPage />;
}
