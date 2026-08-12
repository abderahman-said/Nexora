import React from "react";
import Image from "next/image";

export default function AboutVisual() {
  return (
    <div
      className="relative w-full max-w-[560px] mx-auto lg:mx-0"
    >
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 via-sky-500/15 to-indigo-600/20 rounded-3xl blur-2xl pointer-events-none" />

      <div className="relative z-10 w-full aspect-[4/3.2] sm:aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-2xl shadow-slate-900/10 dark:shadow-blue-950/40 group">
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
    </div>
  );
}
