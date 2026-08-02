import React from "react";
import { Crown } from "lucide-react";
import Image from "next/image";
import type { TeamCardProps } from './types';

export function TeamCard({ member }: TeamCardProps) {
  const isFounder = member.role === "Founder & CEO";

  return (
    <div
      className={`
                group relative flex flex-col items-center text-center
                bg-white dark:bg-[#0c101d]
                border rounded-3xl p-5
                transition-all duration-500 ease-out
                overflow-hidden hover:-translate-y-2 hover:scale-[1.01]
                ${
                  isFounder
                    ? "border-amber-400/80 dark:border-amber-500/60 shadow-2xl shadow-amber-500/20 hover:border-amber-400 dark:hover:border-amber-400 hover:shadow-amber-500/30"
                    : "border-slate-200/90 dark:border-slate-800/90 shadow-xl shadow-slate-200/40 dark:shadow-none hover:border-blue-500/60 dark:hover:border-sky-400/60 hover:shadow-2xl hover:shadow-blue-500/20"
                }
            `}
    >
      {/* Top Hover Mesh Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

      {/* Image Container */}
      <div className="relative w-full rounded-2xl overflow-hidden aspect-[4/3] mb-5 bg-slate-100 dark:bg-slate-900 group/img">
        <Image
          src={member.image}
          alt={member.name}
          width={600}
          height={400}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 640px) 320px, (max-width: 1024px) 50vw, 360px"
          quality={80}
          className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Founder Crown Badge */}
        {isFounder && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-1.5 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-medium flex items-center gap-1 md:gap-1.5 shadow-lg shadow-amber-500/40 z-10 border border-white/20 backdrop-blur-sm">
            <Crown className="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span className="tracking-wide uppercase ">Founder</span>
          </div>
        )}
      </div>

      {/* Member Details */}
      <div className="relative z-10 space-y-1 pb-2">
        <h3
          className={`text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2 transition-colors duration-300 ${isFounder ? "group-hover:text-amber-500 dark:group-hover:text-amber-400" : "group-hover:text-blue-600 dark:group-hover:text-sky-400"}`}
        >
          {member.name}
        </h3>
        {/* <p
          className={`text-sm md:text-base text-slate-700/80 dark:text-slate-300/80 tracking-tight transition-colors duration-300 px-2 ${isFounder ? "group-hover:text-amber-600/80 dark:group-hover:text-amber-400/80" : "group-hover:text-blue-600/80 dark:group-hover:text-sky-400/80"}`}
        >
          {member.bio}
        </p> */}
        <p
          className={`text-xs font-semibold ${isFounder ? "text-amber-600 dark:text-amber-400" : "text-blue-600 dark:text-sky-400"}`}
        >
          {member.role}
        </p>
      </div>
    </div>
  );
}
