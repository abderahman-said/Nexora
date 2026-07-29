'use client';

import React from 'react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import { SERVICES } from '@/components/pages/home/ServiceCards/servicesData';
import { ServiceCard } from '@/components/pages/home/ServiceCards/ServiceCard';

export default function ServiceDetails() {
    return (
        <section className="scroll-section relative w-full py-16 sm:py-24 bg-white dark:bg-[#060913] border-b border-slate-200/90 dark:border-slate-800/80 transition-colors duration-300">
            <Container className="relative z-10">
                <SectionHeader
                    badge="WHAT WE DO"
                    title="Comprehensive Digital Solutions"
                    subtitle="We transform your ideas into integrated digital solutions that make a real difference and support your business growth."
                    align="center"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                    {SERVICES.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
