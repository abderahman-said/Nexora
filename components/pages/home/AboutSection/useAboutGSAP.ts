import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { UseAboutGSAPProps } from './types';

gsap.registerPlugin(ScrollTrigger);

export function useAboutGSAP({ sectionRef, visualRef, contentRef }: UseAboutGSAPProps) {
    useEffect(() => {
        const ctx = gsap.context(() => {
            const section = sectionRef.current;
            const visual = visualRef.current;
            const content = contentRef.current;

            if (!section || !visual || !content) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    once: true,
                }
            });

            // Entrance animation for Visual and Content
            tl.fromTo(
                visual,
                { opacity: 0, x: -50, scale: 0.95 },
                { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out' }
            ).fromTo(
                content,
                { opacity: 0, x: 50 },
                { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' },
                '-=0.7'
            );

        }, sectionRef);

        return () => ctx.revert();
    }, [sectionRef, visualRef, contentRef]);
}
