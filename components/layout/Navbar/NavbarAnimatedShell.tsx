"use client";

import React, { useRef } from "react";
import { useNavbarScroll } from "./useNavbarScroll";
import Container from "@/components/ui/Container";
import type { NavbarAnimatedShellProps } from "./types";

export function NavbarAnimatedShell({ children }: NavbarAnimatedShellProps) {
  const navRef = useRef<HTMLElement>(null);

  useNavbarScroll({ navRef });

  return (
    <header
      ref={navRef}
      className="group fixed left-0 top-0 z-[1000] w-full pointer-events-none transition-transform duration-300 ease-out will-change-transform"
    >
      <Container className="nexora-nav-inner pointer-events-auto flex items-center justify-end py-5 md:py-7">
        {children}
      </Container>
    </header>
  );
}
