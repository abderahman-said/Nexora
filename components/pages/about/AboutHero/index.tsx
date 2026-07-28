import React from 'react';
import SharedHero from '@/components/ui/SharedHero';

export default function AboutHero() {
    return (
        <SharedHero
            id="about-hero"
            titlePrefix="About"
            titleHighlight="Us"
            breadcrumbLabel="About Us"
            backgroundImage="/assets/about_banner.png"
        />
    );
}
