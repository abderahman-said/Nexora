import React from "react";
import Link from 'next/link';
import Image from "next/image";
import { useLocale } from "next-intl";
import LanguageToggle from "@/components/ui/LanguageToggle";
import ThemeToggle from "@/components/ui/ThemeToggle";

import logoLight from "@/public/assets/logo.png";
import logoDark from "@/public/assets/logo_dark.png";

interface MobileNavHeaderProps {
  drawerHeaderRef: React.RefObject<HTMLDivElement | null>;
  closeMenu: () => void;
}

export function MobileNavHeader({
  drawerHeaderRef,
  closeMenu,
}: MobileNavHeaderProps) {
  const locale = useLocale();
  return (
    <div
      ref={drawerHeaderRef}
      className="flex items-center justify-between shrink-0 pb-2 sm:pb-4 border-b border-slate-100 dark:border-white/[0.07]"
    >
      <Link href={`/${locale}`} className="inline-block" onClick={closeMenu}>
        <Image
          src={logoLight}
          alt="Nexora Solutions"
          width={100}
          height={30}
          className="h-10 w-auto object-contain dark:hidden"
          priority
        />
        <Image
          src={logoDark}
          alt="Nexora Solutions Dark"
          width={100}
          height={30}
          className="h-10 w-auto object-contain hidden dark:block"
          priority
        />
      </Link>
      <div className="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  );
}
