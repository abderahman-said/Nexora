"use client";

import React from "react";
import Container from "@/components/ui/Container";
import type { NavbarAnimatedShellProps } from "./types";

export function NavbarAnimatedShell({ children }: NavbarAnimatedShellProps) {
  return (
    <header className="group fixed left-0 top-0 z-[1000] w-full pointer-events-none">
      <Container className="nexora-nav-inner pointer-events-auto flex items-center justify-end py-5 md:py-7">
        {children}
      </Container>
    </header>
  );
}
