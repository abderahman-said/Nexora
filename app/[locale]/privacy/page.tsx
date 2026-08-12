import PrivacyPage from '@/components/pages/privacy';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}

export const metadata: Metadata = {
    title: 'Privacy Policy | Nexora Solutions',
    description: 'Learn how Nexora Solutions collects, uses, and protects your personal information.',
};

export default async function Privacy({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <PrivacyPage />;
}
