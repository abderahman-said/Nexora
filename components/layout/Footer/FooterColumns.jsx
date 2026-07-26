import React from "react";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";

export function FooterColumns() {
  return (
    <div className="grid grid-cols-3 gap-12 px-12 pt-12 pb-8 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:px-6 max-md:gap-8 max-md:pt-8">
      {/* ── COLUMN 1: Availability ── */}
      <div className="flex flex-col items-start">
        <span className="inline-flex items-center rounded-full bg-white px-3.5 py-1 text-xs font-bold lowercase tracking-tight text-slate-950 shadow-sm">
          availability
        </span>
        <h3 className="mt-5  text-[clamp(1.6rem,2.4vw,2.2rem)] font-black leading-[1.1] tracking-tight text-white">
          open for opportunities
        </h3>
        <p className="mt-3 text-sm font-medium leading-relaxed text-slate-400 max-w-[280px]">
          Ready for new project engagements, SaaS platforms, and enterprise
          system architecture.
        </p>
      </div>

      {/* ── COLUMN 2: Location ── */}
      <div className="flex flex-col items-start">
        <span className="inline-flex items-center rounded-full bg-white px-3.5 py-1 text-xs font-bold lowercase tracking-tight text-slate-950 shadow-sm">
          location
        </span>
        <h3 className="mt-5  text-[clamp(1.4rem,2vw,1.8rem)] font-black leading-snug tracking-tight text-white">
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
          href="mailto:info@nexora-solutions.co"
          className="mt-5  text-[clamp(1.2rem,1.8vw,1.65rem)] font-black tracking-tight text-white transition-colors duration-200 hover:text-blue-400"
        >
          info@nexora-solutions.co
        </Link>

        {/* WhatsApp Link */}
        <Link
          href="https://wa.me/201117180818"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1.5  text-[clamp(1.3rem,2vw,1.8rem)] font-black tracking-tight text-white transition-colors duration-200 hover:text-emerald-400"
        >
          +20 111 718 0818
        </Link>

        {/* Subtext */}
        <p className="mt-1 font-mono text-[11px] font-medium italic text-slate-400">
          *Feel free to message us anytime!
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
            <LinkedinIcon className="h-4.5 w-4.5" />
          </Link>

          {/* Email */}
          <Link
            href="mailto:info@nexora-solutions.co"
            aria-label="Send Email"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/80 text-white border border-slate-700/80 transition-all duration-300 hover:scale-110 hover:bg-sky-600 hover:border-sky-500 shadow-sm"
          >
            <Mail className="h-4.5 w-4.5" />
          </Link>

          {/* Phone / Call */}
          <Link
            href="tel:+201117180818"
            aria-label="Call Us"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/80 text-white border border-slate-700/80 transition-all duration-300 hover:scale-110 hover:bg-emerald-600 hover:border-emerald-500 shadow-sm"
          >
            <Phone className="h-4.5 w-4.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
