"use client";

import React, { useRef  } from "react";
import { useNavbarGSAP } from "./useNavbarGSAP";
import Container from "@/components/ui/Container";
import type { NavbarAnimatedShellProps } from './types';

export function NavbarAnimatedShell({ children }: NavbarAnimatedShellProps) {
  const navRef = useRef<HTMLElement>(null);
  const navInnerRef = useRef<HTMLDivElement>(null);

  useNavbarGSAP({ navRef, navInnerRef });

  return (
    <header
      ref={navRef}
      className="group fixed left-0 top-0 z-[1000] w-full px-12 py-6 pointer-events-none transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [&.is-floating]:py-4 max-md:px-4 max-md:py-4 max-md:[&.is-floating]:px-4 max-md:[&.is-floating]:py-3"
    >
      <Container
        ref={navInnerRef}
        className="nexora-nav-inner pointer-events-auto flex items-center justify-end px-6 py-3 transition-colors duration-500 max-md:px-4 max-md:py-1.5"
      >
        {children}
      </Container>
    </header>
  );
}
