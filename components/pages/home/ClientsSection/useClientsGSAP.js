'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useClientsGSAP(sectionRef) {
    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from('.clients-anim-item', {
                opacity: 0,
                y: 28,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
            });

            gsap.from('.ledger-slider', {
                opacity: 0,
                y: 30,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: { trigger: '.ledger-slider', start: 'top 85%' },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [sectionRef]);
}

// Tracks how many cards fit per view, matching Tailwind's sm/lg breakpoints.
export function useItemsPerView() {
    const [itemsPerView, setItemsPerView] = useState(1);

    useEffect(() => {
        const mdQuery = window.matchMedia('(min-width: 640px)');
        const lgQuery = window.matchMedia('(min-width: 1024px)');

        const update = () => {
            if (lgQuery.matches) setItemsPerView(3);
            else if (mdQuery.matches) setItemsPerView(2);
            else setItemsPerView(1);
        };

        update();
        mdQuery.addEventListener('change', update);
        lgQuery.addEventListener('change', update);
        return () => {
            mdQuery.removeEventListener('change', update);
            lgQuery.removeEventListener('change', update);
        };
    }, []);

    return itemsPerView;
}

// Reusable slider motion hook using GSAP to transform track xPercent cleanly
export function useSliderMotion(trackRef, index, itemsPerView, totalCount) {
    useEffect(() => {
        if (!trackRef.current || !totalCount) return;

        // Calculates percentage offset relative to total track width
        const targetXPercent = -index * (100 / totalCount);

        gsap.to(trackRef.current, {
            xPercent: targetXPercent,
            duration: 0.6,
            ease: 'power3.out',
            overwrite: 'auto',
        });
    }, [trackRef, index, itemsPerView, totalCount]);
}