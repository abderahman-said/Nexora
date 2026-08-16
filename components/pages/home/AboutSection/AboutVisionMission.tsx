import React from "react";
import { Target, Rocket, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutVisionMission() {
  const t = useTranslations("homeAbout");

  return (
    <div className="w-full mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* ── CARD 1: OUR VISION ── */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1425] border border-slate-200 dark:border-slate-800/80 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[0.65rem] font-bold text-sky-500 uppercase tracking-wider block">
                  {t("vision_tag")}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {t("vision_title")}
                </h3>
              </div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-sky-400">
                <Target className="w-4 h-4" />
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {t("vision_desc")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 text-[0.7rem] font-semibold text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-3 h-3 text-sky-500" />
              {t("vision_feature_1")}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 text-[0.7rem] font-semibold text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-3 h-3 text-sky-500" />
              {t("vision_feature_2")}
            </span>
          </div>
        </div>

        {/* ── CARD 2: OUR MISSION ── */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1425] border border-slate-200 dark:border-slate-800/80 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[0.65rem] font-bold text-sky-500 uppercase tracking-wider block">
                  {t("mission_tag")}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {t("mission_title")}
                </h3>
              </div>
              <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800/60 flex items-center justify-center text-sky-600 dark:text-sky-400">
                <Rocket className="w-4 h-4" />
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {t("mission_desc")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 text-[0.7rem] font-semibold text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-3 h-3 text-sky-500" />
              {t("mission_feature_1")}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 text-[0.7rem] font-semibold text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-3 h-3 text-sky-500" />
              {t("mission_feature_2")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
