"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";

export function InteractiveCircleButton({ href, children }) {
    const buttonRef = useRef(null);
    const circleRef = useRef(null);

    const handleMouseEnter = (e) => {
        if (!buttonRef.current || !circleRef.current) return;
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

    const handleMouseMove = (e) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left - centerX;
        const mouseY = e.clientY - rect.top - centerY;

        // Gentle magnetic movement
        gsap.to(buttonRef.current, {
            x: mouseX * 0.18,
            y: mouseY * 0.18,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = (e) => {
        if (!buttonRef.current || !circleRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Shrink the expanding circle back to the exit point
        gsap.to(circleRef.current, {
            left: x,
            top: y,
            scale: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                gsap.set(circleRef.current, { opacity: 0 });
            },
        });

        // Reset button position with elastic spring
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
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative flex h-36 w-36 flex-col items-center justify-center rounded-full border border-white/25 bg-white/5 backdrop-blur-sm overflow-hidden text-white shadow-xl cursor-pointer group transition-all duration-300 hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
        >
            {/* The expanding circle ripple overlay originating from hover position */}
            <span
                ref={circleRef}
                className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                aria-hidden="true"
            />

            {/* Button content */}
            <span className="relative z-10 flex flex-col items-center gap-1.5 pointer-events-none select-none">
                <span className="text-base md:text-lg font-bold tracking-wide text-slate-100 group-hover:text-white transition-colors duration-300">
                    {children}
                </span>
                <ArrowUpRight className="h-5 w-5 text-blue-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </span>
        </Link>
    );
}

