'use client';

import React from 'react';
import InteractiveCard from '@/components/ui/InteractiveCard';

export function ProcessCard({ step }) {
    return (
        <InteractiveCard
            stepNumber={step.step}
            badge={step.badge}
            icon={step.icon}
            title={step.title}
            description={step.description}
            features={step.features}
            buttonText="EXPLORE STAGE"
            buttonLink={step.link || '#contact'}
            className="h-full"
        />
    );
}
