import React from 'react';
import dynamic from 'next/dynamic';
import AboutHero from './AboutHero';
import AboutStory from './AboutStory';
import AboutStats from './AboutStats';
import AboutValues from './AboutValues';

// Dynamic Imports for shared heavy sections
const TeamSection = dynamic(() => import('@/components/pages/home/TeamSection'));
const ConsultationSection = dynamic(() => import('@/components/pages/home/ConsultationSection'));

export default function AboutPage() {
    return (
        <main className="w-full">
            <AboutHero />
            <AboutStory />
            <AboutStats />
            <AboutValues />
            <TeamSection />
            <ConsultationSection />
        </main>
    );
}
