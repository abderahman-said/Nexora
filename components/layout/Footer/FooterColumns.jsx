import React from 'react';
import Link from 'next/link';

export function FooterColumns() {
  return (
    <div className="grid grid-cols-3 gap-12 px-12 pt-12 pb-8 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:px-6 max-md:gap-8 max-md:pt-8">
      {/* ── COLUMN 1: Availability ── */}
      <div className="flex flex-col items-start">
        <span className="inline-flex items-center rounded-full bg-white px-3.5 py-1 text-xs font-bold lowercase tracking-tight text-slate-950 shadow-sm">
          availability
        </span>
        <h3 className="mt-5 font-['Epilogue',sans-serif] text-[clamp(1.6rem,2.4vw,2.2rem)] font-black leading-[1.1] tracking-tight text-white">
          open for opportunities
        </h3>
        <p className="mt-3 text-sm font-medium leading-relaxed text-slate-400 max-w-[280px]">
          Ready for new project engagements, SaaS platforms, and enterprise system architecture.
        </p>
      </div>

      {/* ── COLUMN 2: Location ── */}
      <div className="flex flex-col items-start">
        <span className="inline-flex items-center rounded-full bg-white px-3.5 py-1 text-xs font-bold lowercase tracking-tight text-slate-950 shadow-sm">
          location
        </span>
        <h3 className="mt-5 font-['Epilogue',sans-serif] text-[clamp(1.4rem,2vw,1.8rem)] font-black leading-snug tracking-tight text-white">
          Mansoura, Egypt
        </h3>
        <p className="mt-1 text-sm font-bold text-slate-300">
          Available for remote work
        </p>
        <Link
          href="https://maps.google.com/?q=Mansoura,Egypt"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block font-mono text-xs font-bold text-slate-300 underline decoration-slate-500 underline-offset-4 transition-colors duration-200 hover:text-blue-400 hover:decoration-blue-400"
        >
          Google Maps
        </Link>
      </div>

      {/* ── COLUMN 3: Contact ── */}
      <div className="flex flex-col items-start max-lg:col-span-2 max-md:col-span-1">
        <span className="inline-flex items-center rounded-full bg-white px-3.5 py-1 text-xs font-bold lowercase tracking-tight text-slate-950 shadow-sm">
          contact
        </span>

        {/* Email */}
        <Link
          href="mailto:abdorady6500@gmail.com"
          className="mt-5 font-['Epilogue',sans-serif] text-[clamp(1.2rem,1.8vw,1.65rem)] font-black tracking-tight text-white transition-colors duration-200 hover:text-blue-400"
        >
          abdorady6500@gmail.com
        </Link>

        {/* WhatsApp Link */}
        <Link
          href="https://wa.me/201552323225"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1.5 font-['Epilogue',sans-serif] text-[clamp(1.3rem,2vw,1.8rem)] font-black tracking-tight text-white transition-colors duration-200 hover:text-emerald-400"
        >
          send me a whatsapp*
        </Link>

        {/* Subtext */}
        <p className="mt-1 font-mono text-[11px] font-medium italic text-slate-400">
          *feel free to message me anytime!
        </p>

        {/* Social Icons Row */}
        <div className="mt-5 flex items-center gap-3">
          {/* LinkedIn */}
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/80 text-white border border-slate-700/80 transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:border-blue-500 shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z"/>
            </svg>
          </Link>

          {/* Email */}
          <Link
            href="mailto:abdorady6500@gmail.com"
            aria-label="Send Email"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/80 text-white border border-slate-700/80 transition-all duration-300 hover:scale-110 hover:bg-sky-600 hover:border-sky-500 shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </Link>

          {/* Phone / Call */}
          <Link
            href="tel:+201552323225"
            aria-label="Call Us"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/80 text-white border border-slate-700/80 transition-all duration-300 hover:scale-110 hover:bg-emerald-600 hover:border-emerald-500 shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
