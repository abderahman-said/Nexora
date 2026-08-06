import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronsRight } from "lucide-react";
import Container from "@/components/ui/Container";
import type { SharedHeroProps } from "./types";
import { useTranslations } from "next-intl";

export default function SharedHero({
  id,
  titlePrefix,
  titleHighlight,
  breadcrumbLabel,
  backgroundImage = "/assets/about_banner.webp",
}: SharedHeroProps) {
  const t = useTranslations('nav');

  return (
    <section
      id={id}
      className="scroll-section relative w-full pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-20 bg-slate-50/90 dark:bg-[#060913] text-slate-900 dark:text-white overflow-hidden transition-colors duration-300 border-b border-slate-200/90 dark:border-slate-800/80 site-grid-bg"
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src={backgroundImage}
          alt={`${breadcrumbLabel} Banner Background`}
          fill
          priority
          className="object-cover opacity-40 "
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/95 via-white/90 to-slate-50/95 dark:from-[#060913]/90 dark:via-[#060913]/70 dark:to-[#060913]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-100/90 via-transparent to-slate-50/80 dark:from-[#060913] dark:via-transparent dark:to-[#060913]/80" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 dark:bg-blue-600/20 blur-[120px] rounded-full" />
      </div>

      <div
        aria-hidden="true"
        className="absolute -bottom-1 left-0 w-48 sm:w-80 h-16 sm:h-24 bg-white dark:bg-[#060913] [clip-path:polygon(0_100%,100%_100%,0_0)] pointer-events-none z-10 opacity-10 dark:opacity-20"
      />

      <Container className="relative z-10">
        <div className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {titlePrefix}{" "}
            <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
              {titleHighlight}
            </span>
          </h1>

          <nav aria-label="Breadcrumb" className="pt-2">
            <ol className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
                >
                  {t('home')}
                </Link>
              </li>
              <li className="flex items-center text-blue-600 dark:text-sky-400">
                <ChevronsRight className="w-4 h-4 stroke-[2.5]  rtl:scale-x-[-1]" />
              </li>
              <li className="text-blue-600 dark:text-sky-400 font-bold">
                {breadcrumbLabel}
              </li>
            </ol>
          </nav>
        </div>
      </Container>
    </section>
  );
}
