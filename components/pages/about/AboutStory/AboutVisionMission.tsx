import React from "react";
import { Target, Rocket, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";
import { COMPANY_STORY } from "../aboutData";

export default function AboutVisionMission() {
  return (
    <div className="w-full mt-6 space-y-4">
      {/* ── Vision & Mission Stacked/Grid Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* ── CARD 1: OUR VISION ── */}
        <div
          className="
                    group relative p-5 sm:p-6 rounded-2xl
                    bg-white dark:bg-slate-900/90
                    border border-slate-200/90 dark:border-slate-800
                    border-l-4 border-l-blue-600 dark:border-l-blue-500
                    shadow-lg shadow-slate-200/50 dark:shadow-none
                    transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5
                "
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-sky-400 group-hover:scale-105 transition-transform duration-300">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[0.65rem] font-bold tracking-widest text-blue-600 dark:text-sky-400 uppercase">
                FORWARD FOCUS
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Our Vision
              </h3>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-3">
            To engineer transformative, resilient digital ecosystems that
            empower global enterprises to pioneer AI & cloud innovation.
          </p>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[0.7rem] font-semibold text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-3 h-3 text-blue-600 dark:text-sky-400" />
              Future-Proof Systems
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[0.7rem] font-semibold text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-3 h-3 text-blue-600 dark:text-sky-400" />
              AI Integration
            </span>
          </div>
        </div>

        {/* ── CARD 2: OUR MISSION ── */}
        <div
          className="
                    group relative p-5 sm:p-6 rounded-2xl
                    bg-white dark:bg-slate-900/90
                    border border-slate-200/90 dark:border-slate-800
                    border-l-4 border-l-sky-500 dark:border-l-sky-400
                    shadow-lg shadow-slate-200/50 dark:shadow-none
                    transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5
                "
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/80 border border-sky-200/80 dark:border-sky-800/60 flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:scale-105 transition-transform duration-300">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[0.65rem] font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase">
                OUR PURPOSE
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Our Mission
              </h3>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-3">
            To deliver high-performance software engineering, combining clean
            code with scalable systems to drive measurable growth.
          </p>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[0.7rem] font-semibold text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-3 h-3 text-sky-600 dark:text-sky-400" />
              Enterprise Security
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[0.7rem] font-semibold text-slate-700 dark:text-slate-300">
              <Cpu className="w-3 h-3 text-sky-600 dark:text-sky-400" />
              Agile Architecture
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
        {COMPANY_STORY.highlights.map((h, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-blue-600/10 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <strong className="text-slate-900 dark:text-white text-sm font-bold block">
                {h.title}
              </strong>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {h.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
