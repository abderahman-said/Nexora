"use client";

import React, { useRef, ReactNode } from "react";
import { useNavbarGSAP } from "./useNavbarGSAP";
import Container from "@/components/ui/Container";

export interface NavbarAnimatedShellProps {
  children: ReactNode;
}

export function NavbarAnimatedShell({ children }: NavbarAnimatedShellProps) {
  const navRef = useRef<HTMLElement>(null);
  const navInnerRef = useRef<HTMLDivElement>(null);

  useNavbarGSAP({ navRef, navInnerRef });

  return (
    <header
      ref={navRef}
      className="group fixed left-0 top-0 z-[1000] w-full px-12 py-6 pointer-events-none transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [&.is-floating]:py-4 max-md:px-5 max-md:py-4 max-md:[&.is-floating]:px-5 max-md:[&.is-floating]:py-3"
    >
      <Container
        ref={navInnerRef}
        className="nexora-nav-inner pointer-events-auto flex items-center justify-between rounded-full border border-slate-200/50 bg-white/70 dark:border-slate-800/50 dark:bg-slate-900/70 px-6 py-3 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-[.is-floating]:border-slate-200/90 group-[.is-floating]:bg-white/90 dark:group-[.is-floating]:border-slate-800 dark:group-[.is-floating]:bg-[#0f172a]/90 group-[.is-floating]:px-7 group-[.is-floating]:shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:group-[.is-floating]:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-[.is-floating]:backdrop-blur-xl max-md:group-[.is-floating]:px-5 max-md:group-[.is-floating]:py-2.5"
      >
        {children}
      </Container>
    </header>
  );
}
