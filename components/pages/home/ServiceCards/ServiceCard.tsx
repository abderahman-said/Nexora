'use client';

import React from 'react';
import InteractiveCard from '@/components/ui/InteractiveCard';
import type { ServiceCardProps } from './types';
import { BarChart3, Cpu, Globe, Palette } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
    BarChart3,
    Cpu,
    Globe,
    Palette,
};

export function ServiceCard({ service }: ServiceCardProps) {
    const IconComponent = ICON_MAP[service.icon] || BarChart3;
    
    return (
        <InteractiveCard
            serial={service.id}
            icon={IconComponent}
            title={service.title}
            description={service.description}
            features={service.features}
            buttonText="READ MORE"
            buttonLink={service.link || '#contact'}
        />
    );
}
