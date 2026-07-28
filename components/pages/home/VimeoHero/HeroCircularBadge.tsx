"use client";

/*
  HeroCircularBadge — Temporarily disabled as requested.
  To restore the circular floating badge in the bottom-right corner,
  uncomment the component return block below.
*/

export default function HeroCircularBadge() {
  return null;

  /*
  return (
    <div
      className="
        hidden md:flex absolute bottom-10 right-10 xl:right-16 z-30
        items-center justify-center pointer-events-auto select-none
      "
    >
      <a
        href="https://wa.me/201117180818"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="
          group relative flex items-center justify-center p-2 rounded-full
          bg-white/95 dark:bg-slate-950/90 border border-slate-200/90 dark:border-slate-800/90
          backdrop-blur-xl shadow-xl shadow-emerald-500/10 dark:shadow-emerald-500/20
          transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer
        "
      >
        <div className="w-[140px] h-[140px] flex items-center justify-center animate-[spin_18s_linear_infinite] group-hover:[animation-duration:6s]">
          <svg viewBox="0 0 160 160" className="w-full h-full">
            <path
              id="circleTextPath"
              d="M 80,80 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
              fill="none"
            />
            <text className="text-[14.5px] font-black uppercase tracking-[0.2em] fill-slate-900 dark:fill-white transition-colors duration-300">
              <textPath href="#circleTextPath" startOffset="0%">
                ANGULAR • NEXT • REACT • NODE • CLOUD •
              </textPath>
            </text>
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-13 h-13 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/40 group-hover:scale-110 transition-transform duration-300">
            <MessageCircle className="w-6 h-6 fill-current text-white" />
          </div>
        </div>
      </a>
    </div>
  );
  */
}
