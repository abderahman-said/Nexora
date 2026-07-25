'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1.5,
        });

        // ✅ Modern Lenis v1 + GSAP integration (no scrollerProxy needed)
        // Lenis drives scroll → notifies ScrollTrigger on each frame
        lenis.on('scroll', ScrollTrigger.update);

        // GSAP ticker drives Lenis for frame-perfect sync
        const tickerFn = (time) => lenis.raf(time * 1000);
        gsap.ticker.add(tickerFn);
        // ✅ PERF: Use recommended lagSmoothing values instead of (0).
        // lagSmoothing(0) disables all compensation — if a heavy frame hits,
        // GSAP will try to catch up aggressively causing a jank spike.
        // (500, 33) = allow up to 500ms lag cap with a 33ms threshold (~30fps).
        gsap.ticker.lagSmoothing(500, 33);

        // Store lenis on window so other components can access it
        window.__lenis = lenis;

        // Dynamic Tab Title Change
        const originalTitle = document.title;
        const handleVisibility = () => {
            document.title = document.hidden ? "Hey, over here!👋 - Nexora" : originalTitle;
        };
        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            gsap.ticker.remove(tickerFn);
            lenis.destroy();
            document.removeEventListener('visibilitychange', handleVisibility);
            delete window.__lenis;
        };
    }, []);

    return null;
}
