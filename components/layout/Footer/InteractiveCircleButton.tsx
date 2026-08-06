"use client";

import React, { useRef, useEffect, MouseEvent } from "react";
import Link from 'next/link';
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import type { InteractiveCircleButtonProps } from './types';

export function InteractiveCircleButton({ href, children }: InteractiveCircleButtonProps) {
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const circleRef = useRef<HTMLSpanElement>(null);
    const isHoveredRef = useRef(false);

    const resetButton = () => {
        if (!buttonRef.current || !circleRef.current) return;
        gsap.killTweensOf(buttonRef.current);
        gsap.killTweensOf(circleRef.current);
        gsap.set(buttonRef.current, { x: 0, y: 0 });
        gsap.set(circleRef.current, { scale: 0, opacity: 0 });
        isHoveredRef.current = false;
    };

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible" && isHoveredRef.current) {
                resetButton();
            }
        };
        const handleWindowFocus = () => {
            if (isHoveredRef.current) {
                resetButton();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("focus", handleWindowFocus);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("focus", handleWindowFocus);
        };
    }, []);

    const handleMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!buttonRef.current || !circleRef.current) return;
        isHoveredRef.current = true;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.set(circleRef.current, {
            left: x,
            top: y,
            scale: 0,
            opacity: 1,
        });

        gsap.to(circleRef.current, {
            scale: 2.8,
            duration: 0.45,
            ease: "power2.out",
        });
    };

    const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left - centerX;
        const mouseY = e.clientY - rect.top - centerY;

        gsap.to(buttonRef.current, {
            x: mouseX * 0.18,
            y: mouseY * 0.18,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!buttonRef.current || !circleRef.current) return;
        isHoveredRef.current = false;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(circleRef.current, {
            left: x,
            top: y,
            scale: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                if (circleRef.current) {
                    gsap.set(circleRef.current, { opacity: 0 });
                }
            },
        });

        gsap.to(buttonRef.current, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)",
        });
    };

    return (
        <Link
            ref={buttonRef}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={typeof children === 'string' ? children : 'Contact Us'}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative flex h-36 w-36 flex-col items-center justify-center rounded-full border border-slate-300 dark:border-white/25 bg-white dark:bg-white/5 backdrop-blur-sm overflow-hidden text-slate-900 dark:text-white shadow-xl cursor-pointer group transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
        >
            <span
                ref={circleRef}
                className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 dark:from-blue-600 dark:via-indigo-600 dark:to-cyan-400 pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 shadow-[0_0_30px_rgba(59,130,246,0.3)] dark:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                aria-hidden="true"
            />

            <span className="relative z-10 flex flex-col items-center gap-1.5 pointer-events-none select-none">
                <span className="text-base md:text-lg font-bold tracking-wide text-slate-800 dark:text-slate-100 group-hover:text-white transition-colors duration-300">
                    {children}
                </span>
                <ArrowUpRight className="h-5 w-5 text-blue-600 rtl:scale-x-[-1]  dark:text-blue-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </span>
        </Link>
    );
}