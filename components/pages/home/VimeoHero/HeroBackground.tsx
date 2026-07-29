import Image from "next/image";
import type { HeroBackgroundProps } from './types';

export default function HeroBackground({ glowRef }: HeroBackgroundProps) {
    const currentYear = new Date().getFullYear();
  return (
    <>
      {/* Light Image Background (LCP Optimized) */}
      <Image
        src="/hero-bg-light.svg"
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
        className="object-cover object-center opacity-90 dark:opacity-0 pointer-events-none transition-opacity duration-500"
      />

      {/* Dark Image Background */}
      <Image
        src="/hero-bg-dark.svg"
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
        className="object-cover object-center opacity-0 dark:opacity-90 pointer-events-none transition-opacity duration-500"
      />

      {/* Subtle Central Contrast Radial Vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(248,250,252,0.45)_0%,rgba(248,250,252,0.1)_60%,transparent_100%)] dark:bg-[radial-gradient(circle_at_50%_35%,rgba(3,7,18,0.45)_0%,rgba(3,7,18,0.1)_60%,transparent_100%)] pointer-events-none transition-colors duration-300"
      />

      {/* <div
                aria-hidden="true"
                className="
                    absolute inset-0
                    [background-image:linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]
                    [background-size:80px_80px]
                    [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]
                    pointer-events-none
                "
            /> */}

      {/* RIGHT SIDE DECORATORS */}
      <div
        aria-hidden="true"
        className="hidden lg:flex absolute top-0 bottom-0 right-0 w-20 flex-col items-center justify-center gap-8 z-[5] pointer-events-none border-l border-slate-200/80 dark:border-slate-800/80"
      >
        <div className="hero-side-el flex items-center justify-center opacity-50 w-1.5 h-1.5 bg-transparent border border-slate-400 dark:border-slate-600 rotate-45" />
        <div className="hero-side-el flex items-center justify-center opacity-50 w-px h-20 bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
        <div className="hero-side-el flex items-center justify-center opacity-50 text-[0.65rem] tracking-[0.3em] font-semibold text-slate-600 dark:text-slate-400">
                    {currentYear}

        </div>
        <div className="hero-side-el flex items-center justify-center opacity-40 w-px h-20 bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
        <div className="hero-side-el flex items-center justify-center opacity-40 w-1.5 h-1.5 bg-slate-400 dark:bg-slate-600" />
      </div>
      {/* Mouse-follow glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="
                    absolute top-0 left-0 w-[600px] h-[600px] rounded-full
                    pointer-events-none
                    [will-change:transform]
                    bg-[radial-gradient(circle,rgba(37,99,235,0.12)_0%,rgba(2,132,199,0.06)_40%,transparent_70%)]
                "
      />
    </>
  );
}
