'use client';

import React from 'react';
import InteractiveCard from '@/components/ui/InteractiveCard';
import type { ServiceCardProps } from './types';
import { BarChart3, Cpu, Globe, Palette, Smartphone } from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
    BarChart3,
    Cpu,
    Globe,
    Palette,
    Smartphone,
};

export function ServiceCard({ service , className }: ServiceCardProps) {
    const IconComponent = ICON_MAP[service.icon] || BarChart3;
    
    return (
        <InteractiveCard
            serial={service.id}
            icon={IconComponent}
            title={service.title}
            description={service.description}
            features={service.features}
            buttonLink={service.link}
            className={className}
            variant="ghost"
        />
    );
}
