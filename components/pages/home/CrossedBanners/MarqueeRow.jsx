// MarqueeRow.jsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function MarqueeRow({ items, direction = 1, theme = 'light' }) {
    const trackRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        gsap.set(track, { xPercent: direction < 0 ? -50 : 0 });

        const tween = gsap.to(track, {
            xPercent: direction < 0 ? 0 : -50,
            ease: 'none',
            duration: 26,
            repeat: -1,
        });

        return () => tween.kill();
    }, [direction]);

    const doubled = [...items, ...items, ...items];
    const isDark = theme === 'dark';

    return (
        <div className="w-full overflow-hidden">
            <div ref={trackRef} className="flex w-max items-center will-change-transform">
                {doubled.map((item, i) => (
                    <div key={i} className="flex flex-shrink-0 items-center">
                        <span
                            className={[
                                'whitespace-nowrap px-6 text-xl font-black uppercase tracking-tight md:text-3xl',
                                isDark ? 'text-white' : 'text-[#0a1628] dark:text-white',
                            ].join(' ')}
                        >
                            {item.name}
                        </span>
                        <span
                            className="flex-shrink-0 text-lg md:text-2xl"
                            style={{ color: item.color }}
                            aria-hidden="true"
                        >
                            ✦
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}