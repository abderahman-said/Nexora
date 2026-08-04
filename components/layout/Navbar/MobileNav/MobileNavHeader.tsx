import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LanguageToggle from "@/components/ui/LanguageToggle";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface MobileNavHeaderProps {
  drawerHeaderRef: React.RefObject<HTMLDivElement | null>;
  closeMenu: () => void;
}

export function MobileNavHeader({ drawerHeaderRef, closeMenu }: MobileNavHeaderProps) {
  return (
    <div
      ref={drawerHeaderRef}
      className="flex items-center justify-between shrink-0 pb-2 sm:pb-4 border-b border-slate-100 dark:border-white/[0.07]"
    >
      <Link href="/" onClick={closeMenu} className="inline-block">
        <Image
          src="/assets/logo.png"
          alt="Nexora Solutions"
          width={100}
          height={30}
          loading="lazy"
          className="h-10 w-auto object-contain dark:hidden"
        />
        <Image
          src="/assets/logo_dark.PNG"
          alt="Nexora Solutions Dark"
          width={100}
          height={30}
          loading="lazy"
          className="h-10 w-auto object-contain hidden dark:block"
        />
      </Link>
      <div className="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  );
}
