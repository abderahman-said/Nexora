import TermsPage from '@/components/pages/terms';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}

export const metadata: Metadata = {
    title: 'Terms of Service | Nexora Solutions',
    description: 'Read the terms and conditions for using Nexora Solutions services.',
};

export default async function Terms({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <TermsPage />;
}
