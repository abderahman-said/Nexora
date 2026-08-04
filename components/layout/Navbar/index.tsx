import React from "react";
import { NavbarAnimatedShell } from "./NavbarAnimatedShell";
import { MobileNav } from "./MobileNav";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  return (
    <NavbarAnimatedShell>
      <div className="flex items-center justify-between w-full">
        <Logo className="flex items-center justify-center group" />
        <MobileNav />
      </div>
    </NavbarAnimatedShell>
  );
}
