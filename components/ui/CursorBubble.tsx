'use client';

import React, { useEffect } from 'react';
import { gsap } from 'gsap';

export default function CursorBubble() {
    useEffect(() => {
        if (typeof window === 'undefined' || window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches) {
            return;
        }

        const cursorBubble = document.querySelector('.js-cursor-bubble') as HTMLElement | null;
        if (!cursorBubble) return;

        const xTo = gsap.quickTo(cursorBubble, 'x', { duration: 0.5, ease: 'power3' });
        const yTo = gsap.quickTo(cursorBubble, 'y', { duration: 0.5, ease: 'power3' });

        let isHoveringClickable = false;
        gsap.set(cursorBubble, { rotation: -30 });

        const targetSelector = '.js-job-heading, .js-footer-map-link span, .js-email, .js-whatsapp, .js-single-social, .js-logo-truus, .js-nav-work-btn';

        const onPointerMove = (e: PointerEvent) => {
            xTo(e.clientX + 13);
            yTo(e.clientY - 43);

            const target = e.target as HTMLElement | null;
            const found = target?.closest(targetSelector) as HTMLElement | null;

            if (found && !isHoveringClickable) {
                isHoveringClickable = true;
                if (found.matches('.js-logo-truus')) cursorBubble.textContent = 'to home';
                else cursorBubble.textContent = 'click';
                gsap.killTweensOf(cursorBubble, 'opacity,scale,rotation');
                gsap.to(cursorBubble, { opacity: 1, scale: 1, rotation: 0, duration: 1.7, delay: 0.1, ease: 'elastic.out(1, 0.4)' });
            } else if (!found && isHoveringClickable) {
                isHoveringClickable = false;
                gsap.killTweensOf(cursorBubble, 'opacity,scale,rotation');
                gsap.to(cursorBubble, { opacity: 1, scale: 0, rotation: -30, duration: 0.3, ease: 'sine.inOut' });
            }
        };

        const onMouseLeave = () => {
            if (isHoveringClickable) {
                isHoveringClickable = false;
                gsap.killTweensOf(cursorBubble, 'opacity,scale,rotation');
                gsap.to(cursorBubble, { opacity: 1, scale: 0, rotation: -30, duration: 0.3, ease: 'sine.inOut' });
            }
        };

        window.addEventListener('pointermove', onPointerMove, { passive: true });
        document.addEventListener('mouseleave', onMouseLeave, { passive: true });

        return () => {
            window.removeEventListener('pointermove', onPointerMove);
            document.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    return <div className="js-cursor-bubble fixed top-0 left-0 pointer-events-none bg-[#efbbd8] text-brand-black pt-[5px] pe-[7px] pb-[3px] ps-[7px] rounded-[50px] rounded-br-none text-[18px] font-epilogue opacity-0 scale-0 origin-left z-[10000] whitespace-nowrap transition-none will-change-transform">click</div>;
}
