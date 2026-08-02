import type { HeroBackgroundProps } from "./types";

export default function HeroBackground({ glowRef }: HeroBackgroundProps) {
  const currentYear = new Date().getFullYear();
  return (
    <>
      {/* Video Background Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-70 transition-opacity duration-500 scale-105"
        >
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>

        {/* Light Mode Contrast Wash & Tint */}
        <div className="absolute inset-0 bg-slate-900/5 dark:hidden mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/40 via-slate-100/20 to-indigo-100/30 dark:hidden pointer-events-none" />

        {/* Dark Mode Global Blue Tint */}
        <div className="hidden dark:block absolute inset-0 bg-blue-950/20 mix-blend-multiply pointer-events-none" />
      </div>

      {/* Bottom Gradient Fade */}
      <div
        className="
          absolute 
          left-[-1px] 
          right-[-1px] 
          bottom-[-1px] 
          h-[55%]
          pointer-events-none
          z-[2]
          bg-[linear-gradient(180deg,rgba(248,250,252,0)_0%,rgba(248,250,252,0.6)_50%,rgba(248,250,252,1)_85%,rgba(248,250,252,1)_100%)]
          dark:bg-[linear-gradient(180deg,rgba(9,13,22,0)_0%,rgba(9,13,22,0.7)_50%,rgba(9,13,22,1)_85%,rgba(9,13,22,1)_100%)]
        "
      />
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
