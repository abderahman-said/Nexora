'use client';

import React from 'react';
import InteractiveCard from '@/components/ui/InteractiveCard';

export function ServiceCard({ service }) {
    return (
        <InteractiveCard
            serial={service.id}
            badge={service.badge}
            icon={service.icon}
            title={service.title}
            description={service.description}
            features={service.features}
            buttonText="READ MORE"
            buttonLink={service.link || '#contact'}
        />
    );
}
