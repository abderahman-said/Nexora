import React from "react";
import { useTranslations } from "next-intl";

export default function AboutVisionMission() {
  const t = useTranslations("homeAbout");

  return (
    <div className="w-full pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            {t("vision_title")}
          </h3>
          <p className="max-w-lg text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {t("vision_desc")}
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            {t("mission_title")}
          </h3>

          <p className="max-w-lg text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {t("mission_desc")}
          </p>
        </div>
      </div>
    </div>
  );
}
