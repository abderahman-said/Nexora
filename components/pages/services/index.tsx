'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import ServiceHero from './ServiceHero';
import ServiceDetails from './ServiceDetails';
import ServiceProcess from './ServiceProcess';

const ConsultationSection = dynamic(() => import('@/components/pages/home/ConsultationSection'));

export default function ServicesPage() {
    return (
        <main className="w-full">
            <ServiceHero />
            <ServiceDetails />
            <ServiceProcess />
            <ConsultationSection />
        </main>
    );
}
