"use client";

import { useState } from "react";
import Link from 'next/link';
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { ProjectCardProps } from "./types";
import { useTranslations } from "next-intl";

export default function ProjectCard({ p, priority = false }: ProjectCardProps) {
  const t = useTranslations("homeProjects.categories");
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="group relative h-full w-full cursor-pointer py-2 sm:py-3 md:py-4">
      <Link
        href={p.link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        suppressHydrationWarning
        className="group/card relative block h-[380px] sm:h-[430px] md:h-[540px] lg:h-[600px] flex-shrink-0 overflow-hidden rounded-[20px] sm:rounded-[24px] md:rounded-[26px] border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg dark:shadow-black/30 transition-all duration-300 ease-out max-lg:w-full md:hover:-translate-y-2 hover:border-blue-500/70 dark:hover:border-blue-400/70 hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.25)] dark:hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]"
      >
        {/* Full-bleed project image */}
        <div className="absolute inset-0 z-0 block h-full w-full overflow-hidden bg-slate-200/90 dark:bg-slate-800/90">
          <OptimizedImage
            className={`card-img absolute inset-0 h-full w-full object-cover object-top transition-all duration-500 ease-out group-hover/card:scale-105 ${
              isLoaded || priority ? 'opacity-100' : 'opacity-0'
            }`}
            src={p.image}
            alt={p.name || ""}
            width={600}
            height={450}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
            quality={80}
          />

          {/* Gradient overlay */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[180px] sm:h-[200px] md:h-[230px] z-[2] bg-gradient-to-t from-white via-white/75 via-45% to-transparent dark:from-slate-950 dark:via-slate-950/85 dark:via-45% dark:to-transparent"
          />
        </div>

        {/* Content overlaid at the bottom */}
        <div className="relative z-[3] flex h-full flex-col justify-end gap-2 sm:gap-3 px-5 py-3 sm:px-6 md:px-7 md:py-4 pointer-events-none">
          <h3 className="m-0 mb-1.5 sm:mb-2 text-[clamp(19px,4vw,28px)] font-black leading-[1.18] tracking-[-0.03em] text-slate-900 dark:text-white transition-colors duration-200 group-hover/card:text-blue-600 dark:group-hover/card:text-blue-300">
            {p.name}
          </h3>
          <p className="mb-2 sm:mb-3 text-[0.68rem] sm:text-[0.75rem] font-bold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300">
            {t(p.category.replace(/ /g, "_").replace(/-/g, "_").toLowerCase())}
          </p>
        </div>
      </Link>
    </div>
  );
}

