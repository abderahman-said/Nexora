import React from 'react';
import { NavbarAnimatedShell } from "./NavbarAnimatedShell";
import { MobileNav } from "./MobileNav";

export default function Navbar() {
  return (
    <NavbarAnimatedShell>
      <div className="flex items-center justify-end w-full">
        <MobileNav />
      </div>
    </NavbarAnimatedShell>
  );
}
