import React from "react";
import Image from "next/image";
import logoLight from "@/public/assets/logo.png";
import logoDark from "@/public/assets/logo_dark.png";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#f8fafc] dark:bg-[#090d16]">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative flex h-[160px] w-[160px] items-center justify-center">
          {/* Subtle Glow */}
          <div className="absolute w-32 h-32 rounded-full bg-blue-500/20 blur-2xl animate-pulse" />
          
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full animate-spin [animation-duration:1.4s] border-[3px] border-transparent border-t-blue-500 border-r-sky-400" />
          
          {/* Track Ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-slate-200 dark:border-white/10" />
          
          {/* Logo Light */}
          <Image
            src={logoLight}
            alt="Nexora Solutions"
            width={100}
            height={40}
            className="relative z-10 w-[84px] h-auto object-contain animate-pulse [animation-duration:1.8s] drop-shadow-[0_0_20px_rgba(59,130,246,0.35)] dark:hidden"
            priority
          />
          
          {/* Logo Dark */}
          <Image
            src={logoDark}
            alt="Nexora Solutions Dark"
            width={100}
            height={40}
            className="relative z-10 w-[84px] h-auto object-contain animate-pulse [animation-duration:1.8s] drop-shadow-[0_0_20px_rgba(59,130,246,0.35)] hidden dark:block"
            priority
          />
        </div>
        
        {/* Brand Label */}
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
          <span>Nexora</span>
        </div>
      </div>
    </div>
  );
}
