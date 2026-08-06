"use client";
import React from "react";
import Link from 'next/link';
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { FooterSocials } from "./FooterSocials";
import logoLight from "@/public/assets/logo.png";
import logoDark from "@/public/assets/logo_dark.png";

export function FooterBrand() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="flex flex-col items-start space-y-4">
      <Link href={`/${locale}`} className="inline-block group">
        <Image
          src={logoLight}
          alt="Nexora Solutions"
          width={160}
          height={60}
          className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 dark:hidden"
          priority
        />
        <Image
          src={logoDark}
          alt="Nexora Solutions Dark"
          width={160}
          height={60}
          className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 hidden dark:block"
          priority
        />
      </Link>
      <p className="text-xs md:text-sm font-normal leading-relaxed text-slate-600 dark:text-slate-300  max-w-[340px] mt-5 ">
        {t("footer.brandDescription")}
      </p>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-medium text-blue-600 dark:text-blue-300">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" />
        <span>{t("footer.enterpriseCertified")}</span>
      </div>

      <FooterSocials />
    </div>
  );
}
