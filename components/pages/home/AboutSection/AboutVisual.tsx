import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutVisual() {
  const t = useTranslations("homeAbout");

  return (
    <div className="relative  z-10 w-full aspect-[4/3.2] sm:aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-2xl shadow-slate-900/10 dark:shadow-blue-950/40 group">
 
        {/* Team Image */}
        <Image
          src="/about-team.webp"
          alt="Nexora Engineering Team"
          fill
          className="object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 640px) 380px, (max-width: 1024px) 50vw, 560px"
        />
     
    </div>
  );
}
