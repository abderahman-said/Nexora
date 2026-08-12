import React from "react";
import Link from 'next/link';
import Image from "next/image";
import { useLocale } from "next-intl";
import { NavbarAnimatedShell } from "./NavbarAnimatedShell";
import { MobileNav } from "./MobileNav";

import logoLight from "@/public/assets/logo.png";
import logoDark from "@/public/assets/logo_dark.png";

export default function Navbar() {
  const locale = useLocale();
  return (
    <NavbarAnimatedShell>
      <div className="flex items-center justify-between w-full">
        <Link href={`/${locale}`} className="flex items-center justify-center group">
          <Image
            src={logoLight}
            alt="Nexora Solutions"
            width={100}
            height={40}
            className="h-[40px] w-auto object-contain shrink-0 dark:hidden"
          />
          <Image
            src={logoDark}
            alt="Nexora Solutions Dark"
            width={100}
            height={40}
            className="h-[40px] w-auto object-contain shrink-0 hidden dark:block"
            priority
          />
        </Link>
        <MobileNav />
      </div>
    </NavbarAnimatedShell>
  );
}
