import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

interface MobileNavLinksProps {
  linksContainerRef: React.RefObject<HTMLUListElement | null>;
  setDividerRef: (el: HTMLSpanElement | null, i: number) => void;
  navLinks: { label: string; href: string }[];
  closeMenu: () => void;
}

export function MobileNavLinks({ linksContainerRef, setDividerRef, navLinks, closeMenu }: MobileNavLinksProps) {
  const router = useRouter();

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      // Close menu and navigate in a single low-priority transition.
      // No setTimeout — the GSAP timeline runs on the compositor (GPU)
      // so it won't block the JS navigation call.
      React.startTransition(() => {
        closeMenu();
        router.push(href);
      });
    },
    [router, closeMenu]
  );

  return (
    <nav className="flex flex-col justify-center" aria-label="Main navigation">
      <ul ref={linksContainerRef} className="list-none p-0 m-0">
        {navLinks.map(({ label, href }, i) => (
          <li key={href} className="relative overflow-hidden">
            <Link
              href={href}
              prefetch={true}
              onClick={(e) => handleNavClick(e, href)}
              style={{ touchAction: 'manipulation' }}
              className="group flex items-center justify-between gap-4 py-1.5 sm:py-2.5"
            >
              <span className="text-[20px] sm:text-2xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">
                {label}
              </span>
              <ArrowRight className="h-5 w-5 rtl:scale-x-[-1] text-blue-500/80 dark:text-sky-400/80 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-[color,transform] duration-200 shrink-0" />
            </Link>
            <span
              ref={(el) => setDividerRef(el, i)}
              className="block h-px w-full bg-gradient-to-r from-blue-600/50 via-slate-300 dark:from-blue-600/30 dark:via-white/10 to-transparent origin-left"
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
