import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileNavTriggerProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export function MobileNavTrigger({ isOpen, toggleMenu }: MobileNavTriggerProps) {
  return (
    <button
      onClick={toggleMenu}
      aria-label={isOpen ? "Close Menu" : "Open Menu"}
      aria-expanded={isOpen}
      style={{ touchAction: 'manipulation' }}
      className="relative z-[1050] flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-white transition-colors duration-150 shadow-sm cursor-pointer select-none overflow-hidden"
    >
      {isOpen ? (
        <X className="h-[18px] w-[18px] text-slate-800 dark:text-white" strokeWidth={2.25} />
      ) : (
        <Menu className="h-[18px] w-[18px] text-slate-800 dark:text-white" strokeWidth={2.25} />
      )}
    </button>
  );
}
