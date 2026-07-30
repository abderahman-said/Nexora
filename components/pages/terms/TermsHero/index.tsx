import React from 'react';
import SharedHero from '@/components/ui/SharedHero';

export default function TermsHero() {
    return (
        <SharedHero
            id="terms-hero"
            titlePrefix="Terms of"
            titleHighlight="Service"
            breadcrumbLabel="Terms of Service"
            backgroundImage="/assets/about_banner.png"
        />
    );
}
