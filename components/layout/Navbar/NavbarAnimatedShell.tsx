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
      className="group fixed left-0 top-0 z-[1000] w-full pointer-events-none transition-[padding] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] "
    >
      <Container
        ref={navInnerRef}
        className="nexora-nav-inner pointer-events-auto flex items-center justify-end  transition-colors duration-500  py-5  md:py-7"
      >
        {children}
      </Container>
    </header>
  );
}
