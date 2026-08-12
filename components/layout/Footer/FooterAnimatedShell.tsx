"use client";

import React, { ReactElement } from "react";
import type { FooterAnimatedShellProps } from './types';

export function FooterAnimatedShell({
  columns,
  sidePanel,
  bottomBar,
}: FooterAnimatedShellProps) {
  return (
    <footer
      id="contact"
      className="relative w-full overflow-hidden bg-white dark:bg-[#060913] text-slate-900 dark:text-white font-sans border-t border-slate-200 dark:border-slate-800/80"
    >
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent z-20 pointer-events-none" />
      <div
        className="absolute -inset-y-12 inset-x-0 bg-[url('/footer_bg_2.webp')] bg-cover bg-center opacity-10 pointer-events-none mix-blend-overlay"
        aria-hidden="true"
      />
      <div className="relative z-10 w-full flex flex-col-reverse lg:flex-row items-stretch min-h-[480px]">
        <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pt-6">
            {columns}
          </div>

          {bottomBar}
        </div>

        {React.isValidElement(sidePanel)
          ? React.cloneElement(sidePanel as ReactElement<Record<string, unknown>>)
          : sidePanel}
      </div>
    </footer>
  );
}
