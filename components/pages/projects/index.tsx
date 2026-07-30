import React from 'react';
import ProjectsHero from './ProjectsHero';
import ProjectsSection from './ProjectsSection';
import ConsultationSection from '@/components/pages/home/ConsultationSection';

export default function ProjectsPage() {
    return (
        <main className="w-full">
            <ProjectsHero />
            <ProjectsSection />
            <ConsultationSection />
        </main>
    );
}
