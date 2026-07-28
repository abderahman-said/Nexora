import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseCardGridGSAPProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  cardsRef: React.RefObject<(HTMLDivElement | null)[]>;
  waveRef: React.RefObject<SVGSVGElement | null>;
}

export function useCardGridGSAP({ sectionRef, cardsRef, waveRef }: UseCardGridGSAPProps) {
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            // Entrance stagger for cards
            const cards = cardsRef?.current?.filter(Boolean) || [];
            if (cards.length > 0) {
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 50, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 75%',
                        },
                    }
                );
            }

            // Connecting wave line draw-in
            if (waveRef?.current) {
                gsap.fromTo(
                    waveRef.current,
                    { opacity: 0, scaleX: 0, transformOrigin: 'left center' },
                    {
                        opacity: 0.6,
                        scaleX: 1,
                        duration: 1.2,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 70%',
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [sectionRef, cardsRef, waveRef]);
}
