'use client';

import React from 'react';
import InteractiveCard from '@/components/ui/InteractiveCard';

interface ProcessCardProps {
  step: {
    step: string;
    badge: string;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    features: string[];
    accent: string;
    link: string;
  };
}

export function ProcessCard({ step }: ProcessCardProps) {
    return (
        <InteractiveCard
            stepNumber={step.step}
            badge={step.badge}
            icon={step.icon}
            title={step.title}
            description={step.description}
            features={step.features}
            className="h-full"
        />
    );
}
