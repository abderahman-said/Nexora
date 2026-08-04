import React from "react";
import { NavbarAnimatedShell } from "./NavbarAnimatedShell";
import { MobileNav } from "./MobileNav";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <NavbarAnimatedShell>
      <div className="flex items-center justify-between w-full">
        <Link href="/" className="flex items-center justify-center group">
          <Image
            src="/assets/logo.png"
            alt="Nexora Solutions"
            width={100}
            height={40}
            className="h-[40px] w-auto object-contain dark:hidden transition-transform duration-300 group-hover:scale-105"
          />
          <Image
            src="/assets/logo_dark.PNG"
            alt="Nexora Solutions Dark"
            width={100}
            height={40}
            className="h-[40px] w-auto object-contain hidden dark:block transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <MobileNav />
      </div>
    </NavbarAnimatedShell>
  );
}
