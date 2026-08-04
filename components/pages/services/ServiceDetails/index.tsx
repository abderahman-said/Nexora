'use client';

import React from 'react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import { getServices } from '@/components/pages/home/ServiceCards/servicesData';
import { ServiceCard } from '@/components/pages/home/ServiceCards/ServiceCard';
import { useTranslations } from 'next-intl';

export default function ServiceDetails() {
    const tServices = useTranslations('homeServices');
    const SERVICES = getServices(tServices);
    const t = useTranslations('services_page.details');
    return (
        <section className="scroll-section relative w-full py-16 sm:py-24 bg-white dark:bg-[#060913] border-b border-slate-200/90 dark:border-slate-800/80 transition-colors duration-300">
            <Container className="relative z-10">
                <SectionHeader
                    badge={t('badge')}
                    title={t('title')}
                    subtitle={t('subtitle')}
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
