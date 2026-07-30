import React from 'react';
import SharedHero from '@/components/ui/SharedHero';

export default function ProjectsHero() {
    return (
        <SharedHero
            id="projects-hero"
            titlePrefix="Our"
            titleHighlight="Projects"
            breadcrumbLabel="Projects"
            backgroundImage="/assets/about_banner.png"
        />
    );
}
