import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Magnet from '../../ui/Magnet';
import ThemeToggle from '../../ui/ThemeToggle';
import { NAV_LINKS } from './navData';

export function NavLogo({ logoRef }) {
    return (
        <div ref={logoRef}>
            <Magnet padding={10} magnetStrength={4}>
                <Link href="/" className="flex items-center no-underline" aria-label="Nexora Solutions Home">
                    <Image
                        src="/assets/logo.png"
                        alt="Nexora Solutions"
                        width={140}
                        height={42}
                        priority
                        style={{ width: 'auto', height: 'auto' }}
                        className="h-[42px] w-auto object-contain dark:brightness-110"
                    />
                </Link>
            </Magnet>
        </div>
    );
}

export function NavLinks({ linksRef }) {
    return (
        <ul ref={linksRef} className="m-0 flex list-none items-center gap-12 p-0 max-lg:gap-6 max-md:hidden" role="list">
            {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                    <Link
                        href={href}
                        className="relative py-2 text-[0.85rem] font-bold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300 no-underline transition-colors duration-300 ease-in-out before:absolute before:-bottom-0.5 before:left-1/2 before:h-1 before:w-1 before:rounded-full before:bg-[#2563eb] before:opacity-0 before:shadow-[0_0_8px_rgba(37,99,235,0.6)] before:[transform:translateX(-50%)_scale(0)_translateY(4px)] before:transition-all before:duration-300 before:ease-[cubic-bezier(0.16,1,0.3,1)] before:content-[''] hover:text-slate-900 dark:hover:text-white hover:before:opacity-100 hover:before:[transform:translateX(-50%)_scale(1)_translateY(0)]"
                    >
                        {label}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export function NavCTA({ ctaRef }) {
    return (
        <div ref={ctaRef} className="flex items-center gap-3">
            <ThemeToggle />
            <Magnet padding={20} magnetStrength={10}>
                <Link

                    href="https://wa.me/201552323225"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/cta inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 px-8 py-[14px] text-[0.85rem] font-extrabold uppercase tracking-[0.05em] text-white no-underline transition-[transform,shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25 shadow-md max-md:p-3"
                >
                    <span className="label max-md:hidden">Let's Talk</span>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:[transform:translate(2px,-2px)]"
                    >
                        <line x1="5" y1="19" x2="19" y2="5"></line>
                        <polyline points="10 5 19 5 19 14"></polyline>
                    </svg>
                </Link>
            </Magnet>
        </div>
    );
}

