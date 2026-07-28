import React, { RefObject } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Magnet from '../../ui/Magnet';
import ThemeToggle from '../../ui/ThemeToggle';
import { NAV_LINKS } from './navData';
import { MobileNav } from './MobileNav';

export interface NavLogoProps {
    logoRef?: RefObject<HTMLDivElement | null>;
}

export function NavLogo({ logoRef }: NavLogoProps) {
    return (
        <div ref={logoRef}>
            <Magnet magnetStrength={4}>
                <Link href="/" className="flex items-center no-underline" aria-label="Nexora Solutions Home">
                    <Image
                        src="/assets/logo.png"
                        alt="Nexora Solutions"
                        width={140}
                        height={42}
                        priority
                        className="h-auto max-h-[44px] md:max-h-[55px] w-auto object-contain dark:hidden transition-all duration-300"
                    />
                    <Image
                        src="/assets/logo_dark.PNG"
                        alt="Nexora Solutions Dark"
                        width={140}
                        height={42}
                        priority
                        className="h-auto max-h-[44px] md:max-h-[55px] w-auto object-contain hidden dark:block transition-all duration-300"
                    />
                </Link>
            </Magnet>
        </div>
    );
}

export interface NavLinksProps {
    linksRef?: RefObject<HTMLUListElement | null>;
}

export function NavLinks({ linksRef }: NavLinksProps) {
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

export interface NavCTAProps {
    ctaRef?: RefObject<HTMLDivElement | null>;
}

export function NavCTA({ ctaRef }: NavCTAProps) {
    return (
        <div ref={ctaRef} className="flex items-center gap-2.5 sm:gap-3">
            <ThemeToggle />
            <Magnet magnetStrength={10}>
                <Link
                    href="https://wa.me/201117180818"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact us on WhatsApp"
                    className="group/cta inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 px-6 sm:px-8 py-2.5 sm:py-[14px] text-[0.8rem] sm:text-[0.85rem] font-extrabold uppercase tracking-[0.05em] text-white no-underline transition-[transform,shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25 shadow-md max-md:p-2.5"
                >
                    <span className="label max-md:hidden">Let's Talk</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:[transform:translate(2px,-2px)]" />
                </Link>
            </Magnet>
            <MobileNav />
        </div>
    );
}
