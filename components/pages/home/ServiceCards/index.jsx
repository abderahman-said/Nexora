'use client';

import { useRef } from 'react';
import { SERVICES } from './servicesData';
import { ServiceCard } from './ServiceCard';
import { useServiceCardsGSAP } from './useServiceCardsGSAP';
import SectionHeader from '@/components/ui/SectionHeader';

export default function ServiceCards() {
    const sectionRef = useRef(null);

    useServiceCardsGSAP(sectionRef);

    return (
        <section
            id="services"
            ref={sectionRef}
            className="relative w-full overflow-hidden border-b border-slate-200/90 dark:border-slate-800/80 bg-white dark:bg-[#060913] px-[60px] py-[120px] transition-colors duration-300 max-[900px]:px-6 max-[900px]:py-20"
            suppressHydrationWarning
        >
            {/* ── Ambient blobs ── */}
            <div
                className="services-ambient pointer-events-none absolute -left-[160px] -top-[80px] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.06)_0%,transparent_70%)] blur-3xl"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -bottom-[120px] right-[5%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(2,132,199,0.05)_0%,transparent_70%)] blur-3xl"
                aria-hidden="true"
            />

            {/* ── Header ── */}
            <div className="services-header relative mx-auto mb-12 max-w-[1280px]">
                <SectionHeader
                    tag="Services"
                    badge="What We Do"
                    badgeColor="info"
                    title="Our Core"
                    highlight="Capabilities"
                    subtitle="End-to-end digital solutions engineered for scale, performance, and measurable growth."
                    align="between"
                    rightElement={
                        <div className="flex gap-8 pt-2">
                            {[
                                { value: '50+', label: 'Projects' },
                                { value: '5★', label: 'Rated' },
                                { value: '3yr', label: 'Experience' },
                            ].map(({ value, label }) => (
                                <div key={label} className="flex flex-col">
                                    <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                                        {value}
                                    </span>
                                    <span className="text-[0.7rem] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    }
                />
                <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
            </div>

            {/* ── Cards grid ── */}
            <div className="relative mx-auto grid max-w-[1280px] grid-cols-3 gap-4 max-[1100px]:grid-cols-2 max-[900px]:grid-cols-1">
                {SERVICES.map((service, i) => (
                    <ServiceCard key={service.id} service={service} index={i} />
                ))}
            </div>
        </section>
    );
}