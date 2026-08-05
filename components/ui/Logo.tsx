import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import { LogoProps } from "./types";

import logoLight from "@/public/assets/logo.png";
import logoDark from "@/public/assets/logo_dark.png";

export default function Logo({
  className = "inline-block group",
  imageClassName = "h-[40px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 shrink-0",
  width,
  height,
  onClick,
}: LogoProps) {
  const locale = useLocale();
  return (
    <Link href={`/${locale}`} className={className} onClick={onClick}>
      <Image
        src={logoLight}
        alt="Nexora Solutions"
        width={width || 100}
        height={height || 40}
        className={`${imageClassName} dark:hidden`}
        priority
      />
      <Image
        src={logoDark}
        alt="Nexora Solutions Dark"
        width={width || 100}
        height={height || 40}
        className={`${imageClassName} hidden dark:block`}
        priority
      />
    </Link>
  );
}
