import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import Magnet from "../../ui/Magnet";
import ThemeToggle from "../../ui/ThemeToggle";
// import LanguageToggle from "../../ui/LanguageToggle";
import { getNavLinks } from "./navData";
import { MobileNav } from "./MobileNav";
import type { NavLogoProps, NavLinksProps, NavCTAProps } from "./types";

export function NavLogo({ logoRef }: NavLogoProps) {
  return (
    <div ref={logoRef} className="flex items-center h-full">
      <Magnet
        magnetStrength={4}
        wrapperClassName="flex items-center justify-center"
        innerClassName="flex items-center justify-center"
      >
        <Link
          href="/"
          className="flex items-center no-underline justify-center"
          aria-label="Nexora Solutions Home"
        >
          <Image
            src="/assets/logo.png"
            alt="Nexora Solutions"
            width={140}
            height={42}
            priority
            className="h-8 md:h-12 w-auto object-contain dark:hidden transition-all duration-300"
          />
          <Image
            src="/assets/logo_dark.PNG"
            alt="Nexora Solutions Dark"
            width={140}
            height={42}
            priority
            className="h-8 md:h-12 w-auto object-contain hidden dark:block transition-all duration-300"
          />
        </Link>
      </Magnet>
    </div>
  );
}

export function NavLinks({ linksRef }: NavLinksProps) {
  const t = useTranslations();
  const locale = useLocale();
  const navLinks = getNavLinks(t, locale);

  return (
    <ul
      ref={linksRef}
      className="m-0 flex list-none items-center gap-12 p-0 max-lg:gap-6 max-md:hidden"
      role="list"
    >
      {navLinks.map(({ label, href }) => (
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

export function NavCTA({ ctaRef }: NavCTAProps) {
  return (
    <div ref={ctaRef} className="flex items-center gap-2.5 sm:gap-3">
      {/* <LanguageToggle /> */}
      <ThemeToggle />
      <MobileNav />
    </div>
  );
}
