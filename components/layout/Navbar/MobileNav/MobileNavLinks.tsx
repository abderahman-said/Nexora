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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's not the same path (or a hash link on the same path), trigger loader
    if (href !== pathname && !href.startsWith('#')) {
      window.dispatchEvent(new Event('start-nav-loader'));
    }
    closeMenu();
  };

  return (
    <nav className="flex flex-col justify-center" aria-label="Main navigation">
      <ul className="list-none p-0 m-0">
        {navLinks.map(({ label, href }) => (
          <li key={href} className="relative">
            <Link
              href={href}
              prefetch={true}
              onClick={(e) => handleLinkClick(e, href)}
              style={{ touchAction: 'manipulation' }}
              className="group flex items-center justify-between gap-4 py-2 border-b border-slate-100 dark:border-white/[0.06]"
            >
              <span className="text-[20px] sm:text-2xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">
                {label}
              </span>
              <ArrowRight className="h-5 w-5 rtl:scale-x-[-1] text-blue-500/80 dark:text-sky-400/80 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150 shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
