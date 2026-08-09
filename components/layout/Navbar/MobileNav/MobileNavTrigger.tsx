import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileNavTriggerProps {
  isOpen: boolean;
  toggleMenu: () => void;
  menuIconRef: React.RefObject<HTMLSpanElement | null>;
  closeIconRef: React.RefObject<HTMLSpanElement | null>;
}

export function MobileNavTrigger({ isOpen, toggleMenu, menuIconRef, closeIconRef }: MobileNavTriggerProps) {
  return (
    <button
      onClick={toggleMenu}
      aria-label={isOpen ? "Close Menu" : "Open Menu"}
      aria-expanded={isOpen}
      style={{ touchAction: 'manipulation' }}
      className="relative z-[1050] flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-white transition-[background-color,border-color,box-shadow] duration-200 active:scale-95 shadow-sm cursor-pointer overflow-hidden"
    >
      <span ref={menuIconRef} className="absolute inset-0 flex items-center justify-center">
        <Menu className="h-[18px] w-[18px]" strokeWidth={2.25} />
      </span>
      <span ref={closeIconRef} className="absolute inset-0 flex items-center justify-center opacity-0">
        <X className="h-[18px] w-[18px]" strokeWidth={2.25} />
      </span>
    </button>
  );
}
