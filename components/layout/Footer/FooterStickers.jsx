import React from "react";

export function FooterStickers() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {/* 1. Code Brackets Badge <code /> (Left) */}
      <div className="pointer-events-auto absolute left-[4%] bottom-[28%] rotate-[-10deg] transition-transform duration-300 hover:scale-110 max-md:left-[2%] max-md:bottom-[45%]">
        <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-400 px-3.5 py-2.5 shadow-lg shadow-blue-500/30 border-2 border-white">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span className="font-mono text-xs font-black uppercase text-white tracking-wider">
            code
          </span>
        </div>
      </div>

      {/* 2. Terminal CLI Badge >_ (Left-Center) */}
      <div className="pointer-events-auto absolute left-[18%] bottom-[42%] rotate-[8deg] transition-transform duration-300 hover:scale-110 max-md:left-[24%] max-md:bottom-[55%]">
        <div className="flex h-13 items-center gap-2 rounded-2xl bg-slate-900 px-3.5 py-2.5 shadow-lg shadow-slate-900/40 border-2 border-cyan-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-sm font-black text-cyan-300 tracking-tight">
            &gt;_ dev
          </span>
        </div>
      </div>

      {/* 3. Cloud Server & Systems Badge (Center) */}
      <div className="pointer-events-auto absolute left-[42%] bottom-[48%] rotate-[-6deg] transition-transform duration-300 hover:scale-110 max-md:left-[45%] max-md:bottom-[60%]">
        <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 px-3.5 py-2.5 shadow-lg shadow-sky-500/30 border-2 border-white">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17.5 19H9a5 5 0 0 1-1.3-9.8 7 7 0 0 1 13.6-2.2A5 5 0 0 1 17.5 19z" />
          </svg>
          <span className="font-mono text-xs font-bold text-white tracking-wider">
            cloud
          </span>
        </div>
      </div>

      {/* 4. React / Tech Atom Badge (Center-Right) */}
      <div className="pointer-events-auto absolute left-[55%] bottom-[22%] rotate-[10deg] transition-transform duration-300 hover:scale-110 max-md:left-[62%] max-md:bottom-[35%]">
        <div className="flex h-13 items-center justify-center rounded-2xl bg-blue-950 px-3.5 py-2.5 shadow-lg shadow-blue-900/40 border-2 border-cyan-400">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="2.5" fill="#38BDF8" />
            <ellipse
              cx="12"
              cy="12"
              rx="9"
              ry="3.5"
              transform="rotate(30 12 12)"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="9"
              ry="3.5"
              transform="rotate(90 12 12)"
            />
            <ellipse
              cx="12"
              cy="12"
              rx="9"
              ry="3.5"
              transform="rotate(150 12 12)"
            />
          </svg>
        </div>
      </div>

      {/* 5. Fast Performance Bolt Badge (Right-Center) */}
      <div className="pointer-events-auto absolute right-[26%] bottom-[46%] rotate-[-12deg] transition-transform duration-300 hover:scale-110 max-md:right-[20%] max-md:bottom-[58%]">
        <div className="flex items-center gap-1.5 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 px-3.5 py-2 shadow-lg shadow-amber-500/30 border-2 border-white">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="#FFF"
            stroke="#FFF"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span className="font-mono text-xs font-black uppercase text-slate-950 tracking-tight">
            100% fast
          </span>
        </div>
      </div>

      {/* 6. AI & Tech Innovation Badge (Right) */}
      <div className="pointer-events-auto absolute right-[8%] bottom-[26%] rotate-[12deg] transition-transform duration-300 hover:scale-110 max-md:right-[4%] max-md:bottom-[40%]">
        <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 px-3.5 py-2.5 shadow-lg shadow-purple-600/30 border-2 border-white">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
          </svg>
          <span className="font-mono text-xs font-bold text-white tracking-wider">
            AI tech
          </span>
        </div>
      </div>
    </div>
  );
}
