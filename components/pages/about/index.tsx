import React from 'react';
import dynamic from 'next/dynamic';
import AboutHero from './AboutHero';
import AboutStory from './AboutStory';

const ConsultationSection = dynamic(() => import('@/components/pages/home/ConsultationSection'));

export default function AboutPage() {
    return (
        <main className="w-full">
            <AboutHero />
            <AboutStory />
            <ConsultationSection />
        </main>
    );
}
