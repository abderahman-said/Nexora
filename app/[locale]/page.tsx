import VideoHero from '@/components/pages/home/VideoHero';
import AboutSection from '@/components/pages/home/AboutSection';
import ServiceCards from '@/components/pages/home/ServiceCards';
import ProjectsSection from "@/components/pages/home/ProjectsSection";
import ProcessSection from "@/components/pages/home/ProcessSection";
import TeamSection from "@/components/pages/home/TeamSection";
import ConsultationSection from "@/components/pages/home/ConsultationSection";
import ClientsSection from "@/components/pages/home/ClientsSection";

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
            <ProjectsSection />
            <ProcessSection />
            <TeamSection />
            <ClientsSection />
            <ConsultationSection />
        </main>
    );
}
