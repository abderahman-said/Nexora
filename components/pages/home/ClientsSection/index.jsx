'use client';

import { useRef, useState, useEffect } from 'react';
import { TESTIMONIALS } from './clientsData';
import { useClientsGSAP, useSliderMotion, useItemsPerView } from './useClientsGSAP';
import SectionHeader from '@/components/ui/SectionHeader';
import ClientCard from './ClientCard';
import ClientSliderControls from './ClientSliderControls';

export default function ClientsSection() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const pausedRef = useRef(false);
    const [index, setIndex] = useState(0);

    const count = TESTIMONIALS.length;
    const itemsPerView = useItemsPerView();
    const maxIndex = Math.max(0, count - itemsPerView);

    // Derived clamped index avoids unnecessary useEffect state updates
    const clampedIndex = Math.min(index, maxIndex);

    useClientsGSAP(sectionRef);
    useSliderMotion(trackRef, clampedIndex, itemsPerView, count);

    const goTo = (i) => setIndex(Math.min(Math.max(i, 0), maxIndex));

    useEffect(() => {
        if (maxIndex <= 0) return;
        const id = setInterval(() => {
            if (!pausedRef.current) {
                setIndex((i) => (i >= maxIndex ? 0 : i + 1));
            }
        }, 5000);
        return () => clearInterval(id);
    }, [maxIndex]);

    const pageCount = maxIndex + 1;
    const atStart = clampedIndex === 0;
    const atEnd = clampedIndex === maxIndex;

    return (
        <section
            id="clients"
            ref={sectionRef}
            className="relative w-full overflow-hidden px-6 py-[120px] max-[900px]:py-20 bg-slate-50/70 dark:bg-[#060913] border-t border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300"
            suppressHydrationWarning
        >
            <div
                className="pointer-events-none absolute right-[-120px] top-[-60px] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.08)_0%,transparent_70%)] blur-3xl"
                aria-hidden="true"
            />

            <div className="relative mx-auto max-w-[1280px]">
                <SectionHeader
                    tag="TrustLedger"
                    badge={`Verified Records (${count})`}
                    badgeColor="success"
                    title="Every Partnership,"
                    highlight="Logged & Verified."
                    subtitle="A running record of the teams we've shipped with — architecture, uptime, and outcomes, on file."
                    align="left"
                    animClass="clients-anim-item gsap-managed"
                />

                <div
                    className="ledger-slider relative gsap-managed"
                    onMouseEnter={() => (pausedRef.current = true)}
                    onMouseLeave={() => (pausedRef.current = false)}
                >
                    <div className="overflow-hidden">
                        <div ref={trackRef} className="flex will-change-transform">
                            {TESTIMONIALS.map((t) => (
                                <ClientCard
                                    key={t.id}
                                    testimonial={t}
                                    itemsPerView={itemsPerView}
                                />
                            ))}
                        </div>
                    </div>

                    <ClientSliderControls
                        goTo={goTo}
                        clampedIndex={clampedIndex}
                        pageCount={pageCount}
                        atStart={atStart}
                        atEnd={atEnd}
                    />
                </div>
            </div>
        </section>
    );
}