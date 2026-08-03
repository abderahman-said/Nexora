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
                    subtitle="We transform your ideas into powerful web, mobile, and software solutions that drive business growth. Every solution is built for performance, scalability, and long-term success."
                    align="center"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    {SERVICES.map((service) => (
                        <ServiceCard key={service.id} service={service} className={"!py-12"} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
