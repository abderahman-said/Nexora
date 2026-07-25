import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useNavbarGSAP({ navRef, navInnerRef, logoRef, linksRef, ctaRef }) {
    useEffect(() => {
        const nav = navRef.current;
        const navInner = navInnerRef.current;
        if (!nav || !navInner) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.1 });
            
            tl.from(navInner, {
                y: -100,
                opacity: 0,
                duration: 1.2,
                ease: "expo.out"
            })
            .from(logoRef.current, {
                opacity: 0,
                x: -20,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8")
            .from(linksRef.current?.children || [], {
                opacity: 0,
                y: -15,
                duration: 0.8,
                stagger: 0.05,
                ease: "power3.out"
            }, "-=0.8")
            .from(ctaRef.current, {
                opacity: 0,
                scale: 0.9,
                duration: 0.8,
                ease: "back.out(1.5)"
            }, "-=0.6");

            let lastScrollY = window.scrollY;
            
            const handleScroll = () => {
                const currentScrollY = window.scrollY;
                const isScrollingDown = currentScrollY > lastScrollY;
                const isScrolledPastTop = currentScrollY > 60;

                if (isScrolledPastTop) {
                    nav.classList.add('is-floating');
                } else {
                    nav.classList.remove('is-floating');
                }

                if (isScrolledPastTop && isScrollingDown) {
                    gsap.to(nav, { yPercent: -120, duration: 0.5, ease: "power3.out", overwrite: "auto" });
                } else {
                    gsap.to(nav, { yPercent: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
                }

                lastScrollY = currentScrollY;
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
            return () => window.removeEventListener('scroll', handleScroll);
            
        }, navRef);

        return () => ctx.revert();
    }, [navRef, navInnerRef, logoRef, linksRef, ctaRef]);
}
