import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

export default function Logo({
  className = "inline-block group",
  imageClassName = "h-[40px] w-auto object-contain transition-transform duration-300 group-hover:scale-105",
  width = 100,
  height = 40,
  onClick,
}: LogoProps) {
  const locale = useLocale();
  return (
    <Link href={`/${locale}`} className={className} onClick={onClick}>
      <Image
        src="/assets/logo.png"
        alt="Nexora Solutions"
        width={width}
        height={height}
        className={`${imageClassName} dark:hidden`}
      />
      <Image
        src="/assets/logo_dark.PNG"
        alt="Nexora Solutions Dark"
        width={width}
        height={height}
        className={`${imageClassName} hidden dark:block`}
      />
    </Link>
  );
}
