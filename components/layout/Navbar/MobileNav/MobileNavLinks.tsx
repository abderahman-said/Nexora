import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface MobileNavLinksProps {
  navLinks: { label: string; href: string }[];
  closeMenu: () => void;
}

export function MobileNavLinks({ navLinks, closeMenu }: MobileNavLinksProps) {
  const pathname = usePathname();

  const handleLinkClick = (href: string) => {
    // Close the menu first — this is the state update that kicks off the
    // drawer's transform transition, so let it start before we dispatch
    // anything else in the same tick.
    closeMenu();
    if (href !== pathname && !href.startsWith('#')) {
      window.dispatchEvent(new Event('start-nav-loader'));
    }
  };

  return (
    <nav className="flex flex-col justify-center" aria-label="Main navigation">
      <ul className="list-none p-0 m-0">
        {navLinks.map(({ label, href }) => (
          <li key={href} className="relative">
            <Link
              href={href}
              prefetch={true}
              onClick={() => handleLinkClick(href)}
              style={{ touchAction: 'manipulation' }}
              className="group flex items-center justify-between gap-4 py-2 border-b border-slate-100 dark:border-white/[0.06]"
            >
              <span className="text-[20px] sm:text-2xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {label}
              </span>
              <ArrowRight className="h-5 w-5 rtl:scale-x-[-1] text-blue-500/80 dark:text-sky-400/80 group-hover:text-blue-600 dark:group-hover:text-blue-400 shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}