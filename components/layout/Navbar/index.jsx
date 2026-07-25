'use client';

import { useRef } from 'react';
import { useNavbarGSAP } from './useNavbarGSAP';
import { NavLogo, NavLinks, NavCTA } from './NavElements';

export default function Navbar() {
    const navRef = useRef(null);
    const navInnerRef = useRef(null);
    const logoRef = useRef(null);
    const linksRef = useRef(null);
    const ctaRef = useRef(null);

    useNavbarGSAP({ navRef, navInnerRef, logoRef, linksRef, ctaRef });

    return (
        <header
            ref={navRef}
            className="group fixed left-0 top-0 z-[1000] w-full px-12 py-6 pointer-events-none transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [&.is-floating]:py-4 max-md:px-5 max-md:py-4 max-md:[&.is-floating]:px-5 max-md:[&.is-floating]:py-3"
        >
            <div
                ref={navInnerRef}
                className="nexora-nav-inner mx-auto max-w-[1280px] pointer-events-auto flex items-center justify-between rounded-full border border-slate-200/60 bg-[rgba(255,255,255,0.75)] px-6 py-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-md dark:border-slate-800/80 dark:bg-[rgba(15,23,42,0.75)] group-[.is-floating]:border-slate-200/90 group-[.is-floating]:bg-[rgba(255,255,255,0.9)] dark:group-[.is-floating]:border-slate-800 dark:group-[.is-floating]:bg-[rgba(15,23,42,0.9)] group-[.is-floating]:px-7 group-[.is-floating]:shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:group-[.is-floating]:shadow-[0_10px_30px_rgba(0,0,0,0.4)] group-[.is-floating]:backdrop-blur-[24px] max-md:group-[.is-floating]:px-5 max-md:group-[.is-floating]:py-2.5"
            >
                <NavLogo logoRef={logoRef} />
                <NavLinks linksRef={linksRef} />
                <NavCTA ctaRef={ctaRef} />
            </div>
        </header>
    );
}