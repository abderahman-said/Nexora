import React from 'react';
import SharedHero from '@/components/ui/SharedHero';

export default function PrivacyHero() {
    return (
        <SharedHero
            id="privacy-hero"
            titlePrefix="Privacy"
            titleHighlight="Policy"
            breadcrumbLabel="Privacy Policy"
            backgroundImage="/assets/about_banner.png"
        />
    );
}
