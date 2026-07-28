'use client';

import React from 'react';
import InteractiveCard from '@/components/ui/InteractiveCard';
import { Service } from './servicesData';

export interface ServiceCardProps {
    service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
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
