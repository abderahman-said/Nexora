import React from 'react';
import { FooterStickers } from './FooterStickers';

export function FooterGraphicText({ bgWordRef }) {
  return (
    <div className="relative mt-8 min-h-[220px] w-full overflow-hidden pt-6 pb-2 max-md:min-h-[160px]">
      {/* Floating stickers overlay */}
      <FooterStickers />

      {/* Giant Graphic Typography */}
      <div
        ref={bgWordRef}
        className="relative z-0 flex w-full items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="
            font-['Outfit',sans-serif] text-[clamp(6rem,22vw,19rem)] font-black leading-[0.75]
            tracking-[-0.05em] text-white opacity-95
            drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]
            lowercase italic
          "
          style={{
            fontFamily: "'Caveat', 'Playfair Display', cursive, sans-serif",
          }}
        >
          nexora
        </span>
      </div>

      {/* Bottom Credits Badge */}
      <div className="absolute right-8 bottom-4 z-20">
        <span className="inline-flex items-center rounded-full bg-slate-900/90 border border-slate-700/80 px-3.5 py-1 text-[11px] font-bold lowercase tracking-wider text-slate-300 backdrop-blur-md shadow-md">
          credits
        </span>
      </div>
    </div>
  );
}
