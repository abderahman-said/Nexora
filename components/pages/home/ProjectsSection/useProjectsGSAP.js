import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useProjectsGSAP(sectionRef, gridRef, activeCategory) {
  useEffect(() => {
    const section = sectionRef?.current;
    const grid = gridRef?.current;
    if (!section || !grid) return;

    const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.proj-3d-card', grid);
      if (!cards.length) return;

      // Initial Entrance batch reveal
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, rotateX: 12, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Desktop 3D Scroll Parallax:
      // Scroll Down -> Cards lift UP in 3D (y: -40 to -80)
      // Scroll Up -> Cards sink BACK DOWN smoothly
      if (!isMobile) {
        cards.forEach((card, index) => {
          const isEven = index % 2 === 0;
          const liftAmount = isEven ? -40 : -80; // asymmetric column depth

          gsap.to(card, {
            y: liftAmount,
            rotateX: isEven ? -2 : 2,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, gridRef, activeCategory]);
}

