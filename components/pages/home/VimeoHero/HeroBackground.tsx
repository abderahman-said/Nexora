"use client";

import { useState } from "react";
import type { HeroBackgroundProps } from "./types";

export default function HeroBackground({ glowRef }: HeroBackgroundProps) {
  const currentYear = new Date().getFullYear();
  const [isVideoReady, setIsVideoReady] = useState(false);

  return (
    <>
      {/* Preload the actual video bytes early (as="video" isn't supported by
          Safari, but it's free elsewhere and doesn't hurt). fetchPriority
          on the <video> tag below covers the rest. */}
      <link rel="preload" as="video" href="/assets/hero.webm" type="video/webm" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <style
          dangerouslySetInnerHTML={{
            __html: `
          video::-webkit-media-controls-start-playback-button { display: none !important; }
          video::-webkit-media-controls { display: none !important; }
        `,
          }}
        />

     
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url(/assets/hero_poster.webp)" }}
        />

        <video
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
          preload="auto"
          poster="/assets/hero_poster.webp"
          onCanPlay={() => setIsVideoReady(true)}
          className={`w-full h-full object-cover scale-105 pointer-events-none transition-opacity duration-700 ${
            isVideoReady ? "opacity-80" : "opacity-0"
          }`}
        >
          {/* webm first — much smaller, browsers that support it will use it
              and never even request the mp4 */}
          <source src="/assets/hero.webm" type="video/webm" />
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-slate-900/5 dark:hidden mix-blend-overlay pointer-events-none" />
        <div className="hidden dark:block absolute inset-0 bg-blue-950/20 mix-blend-multiply pointer-events-none" />
      </div>

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