"use client";
import { useTranslations } from "next-intl";

export default function HeroContent() {
  const t = useTranslations("homeHero");

  return (
    <div className="relative z-10 md:mt-[-50px] mt-0 flex flex-col items-start text-start max-w-[950px]">
      {/* Main Headline */}
      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold tracking-tight text-white dark:text-white !leading-[1.5] mb-4 sm:mb-6">
        <span className="split-word">{t("title_we")}</span>{" "}
        <span className="split-word">{t("title_build")}</span>{" "}
        <span className="split-word">{t("title_digital_products")}</span>{" "}
        <span className="split-word bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
          {t("title_grow_business")}
        </span>
      </h1>

      {/* Paragraph Description */}
      <p className="text-sm sm:text-lg   text-white/90 dark:text-slate-200 font-medium !leading-[2] max-w-3xl mb-6 sm:mb-8">
        {t("description")}
      </p>
    </div>
  );
}