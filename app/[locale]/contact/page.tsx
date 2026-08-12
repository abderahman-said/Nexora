import ContactPage from '@/components/pages/contact';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}

export const metadata: Metadata = {
    title: 'Contact Us | Nexora Solutions',
    description: 'Get in touch with Nexora Solutions for custom web engineering, enterprise software development, and technical consulting. Schedule a strategy call today.',
};

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <ContactPage />;
}
