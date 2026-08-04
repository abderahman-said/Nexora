import React from 'react';
import Logo from "@/components/ui/Logo";
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
      <Logo 
        className="inline-block" 
        imageClassName="h-10 w-auto object-contain" 
        width={100} 
        height={30} 
        onClick={closeMenu} 
      />
      <div className="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  );
}
