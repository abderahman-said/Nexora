import React from "react";
import { useTranslations } from "next-intl";

export default function AboutVisionMission() {
  const t = useTranslations("about");

  const richTextOptions = {
    strong: (chunks: any) => <strong className="font-bold">{chunks}</strong>,
    bold: (chunks: any) => <strong className="font-bold">{chunks}</strong>,
  };

  return (
    <div className="w-full mt-8 space-y-8">
      {/* ── MISSION ── */}
      <div className="transition-all duration-300">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">
          {t("vision_mission.mission_title")}
        </h3>
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          <p>{t.rich("vision_mission.mission_desc1", richTextOptions)}</p>
          <p>{t.rich("vision_mission.mission_desc2", richTextOptions)}</p>
        </div>
      </div>

      {/* ── VISION ── */}
      <div className="transition-all duration-300">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-3">
          {t("vision_mission.vision_title")}
        </h3>
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
          <p>{t.rich("vision_mission.vision_desc1", richTextOptions)}</p>
          <p>{t.rich("vision_mission.vision_desc2", richTextOptions)}</p>
        </div>
      </div>
    </div>
  );
}
