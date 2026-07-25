'use client';

import { useRef } from 'react';
import { SERVICES } from './servicesData';
import { ServiceCard } from './ServiceCard';
import { useServiceCardsGSAP } from './useServiceCardsGSAP';

export default function ServiceCards() {
    const sectionRef = useRef(null);

    useServiceCardsGSAP(sectionRef);

    return (
        <section
            id="services"
            ref={sectionRef}
            className="relative w-full overflow-hidden border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1329]/90 px-[60px] py-[130px] transition-colors duration-300 max-[900px]:px-6 max-[900px]:py-20"
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
            <div className="services-header relative mx-auto mb-16 max-w-[1280px]">
                <div className="flex flex-wrap items-end justify-between gap-10 max-[900px]:flex-col max-[900px]:items-start">
                    <div>
                        {/* badge */}
                        <div className="services-badge mb-5 inline-flex items-center gap-2.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/60 px-4 py-1.5 shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shadow-[0_0_6px_#2563eb]" />
                            <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">
                                What We Do
                            </span>
                        </div>

                        {/* heading */}
                        <h2
                            className="services-heading text-[clamp(2.2rem,4.5vw,3.8rem)] font-black leading-[1.03] tracking-[-0.04em] text-slate-900 dark:text-white"
                            suppressHydrationWarning
                        >
                            Our Core{' '}
                            <span
                                className="bg-clip-text text-transparent"
                                style={{
                                    backgroundImage:
                                        'linear-gradient(135deg, #2563eb 0%, #0284c7 100%)',
                                }}
                            >
                                Capabilities
                            </span>
                        </h2>
                    </div>

                    {/* subtitle + mini stats */}
                    <div className="flex flex-col gap-6 max-[900px]:w-full">
                        <p
                            className="services-subtitle max-w-[340px] text-base leading-[1.75] text-slate-600 dark:text-slate-300 font-medium"
                            suppressHydrationWarning
                        >
                            End-to-end digital solutions engineered for scale, performance, and measurable growth.
                        </p>

                        <div className="flex gap-8">
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
                    </div>
                </div>

                {/* decorative divider */}
                <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
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