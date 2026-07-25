import { useEffect, useMemo, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useCardGridGSAP({ STEPS, sectionRef, pinRef, stepRefs, fillRef }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const totalSteps = STEPS.length;
    const stepFraction = useMemo(() => 1 / totalSteps, [totalSteps]);

    useEffect(() => {
        const section = sectionRef.current;
        const pin = pinRef.current;
        if (!section || !pin) return;

        const steps = stepRefs.current.filter(Boolean);
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduceMotion) {
            gsap.set(steps, { rotationY: 0, position: 'relative' });
            return;
        }

        const ctx = gsap.context(() => {
            gsap.set(steps, { rotationY: 90, transformOrigin: 'center center' });
            gsap.set(steps[0], { rotationY: 0 });
            gsap.set(fillRef.current, { scaleX: 0, transformOrigin: 'left' });

            const getEnd = () => `+=${window.innerHeight * (totalSteps + 0.5)}`;

            const st = ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: getEnd,
                pin,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate(self) {
                    const idx = Math.min(totalSteps - 1, Math.floor(self.progress * totalSteps));
                    setActiveIndex((prev) => (prev === idx ? prev : idx));
                },
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: getEnd,
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            });

            steps.forEach((stepEl, i) => {
                const isLast = i === totalSteps - 1;
                const label = i === 0 ? 0 : `step-${i}`;

                tl.to(pin, { '--accent': STEPS[i].accent, duration: 0.4, ease: 'power2.out' }, label);
                tl.to(fillRef.current, { scaleX: (i + 1) / totalSteps, duration: 0.5, ease: 'power2.inOut' }, label);

                if (!isLast) {
                    tl.addLabel(`step-${i + 1}`, i === 0 ? '+=0.3' : `step-${i}+=0.3`);

                    tl.to(stepEl, {
                        rotationY: -90,
                        duration: 0.15,
                        ease: 'power2.in',
                    }, `step-${i + 1}`);

                    tl.fromTo(
                        steps[i + 1],
                        { rotationY: 90 },
                        { rotationY: 0, duration: 0.15, ease: 'power2.out' },
                        `step-${i + 1}+=0.15`
                    );
                }
            });

            gsap.from(pin.querySelector('.proc-header'), {
                opacity: 0,
                y: 32,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none reverse' },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [totalSteps, STEPS, sectionRef, pinRef, stepRefs, fillRef]);

    const jumpToStep = (index) => {
        const st = ScrollTrigger.getAll().find((t) => t.trigger === sectionRef.current && t.vars.pin);
        if (!st) return;
        const target = st.start + (st.end - st.start) * (index * stepFraction + stepFraction / 2);
        window.scrollTo({ top: target, behavior: 'smooth' });
    };

    return { activeIndex, jumpToStep };
}
