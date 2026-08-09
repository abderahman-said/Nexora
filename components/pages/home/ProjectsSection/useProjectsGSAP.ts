import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useProjectsGSAP(
  sectionRef: RefObject<HTMLElement | null>,
  sliderWrapperRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    // Temporarily disabled
    return;
    const section = sectionRef?.current;
    if (!section) return;

    const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.proj-3d-card', section);
      if (!cards.length) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 20, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 95%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, sliderWrapperRef]);
}
