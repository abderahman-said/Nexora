import ProjectsPage from '@/components/pages/projects';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}

export const metadata: Metadata = {
    title: 'Our Projects | Nexora Solutions',
    description: 'Explore our portfolio of successful projects that showcase our expertise in building innovative digital solutions for enterprise clients.',
};

export default async function Projects({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    return <ProjectsPage />;
}
