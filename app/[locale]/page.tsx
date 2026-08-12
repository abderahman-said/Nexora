import VideoHero from '@/components/pages/home/VideoHero';
import AboutSection from '@/components/pages/home/AboutSection';
import ServiceCards from '@/components/pages/home/ServiceCards';
import LazySections from '@/components/pages/home/LazySections';
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    return (
        <main>
            <VideoHero />
            <AboutSection />
            <ServiceCards />
            <LazySections />
        </main>
    );
}
