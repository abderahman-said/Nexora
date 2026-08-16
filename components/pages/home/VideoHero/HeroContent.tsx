"use client";
import { useTranslations } from "next-intl";

export default function HeroContent() {
  const t = useTranslations("homeHero");

  return (
    <div className="relative z-10 md:mt-[-50px] mt-0 flex flex-col items-start text-start max-w-[800px]">
      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white dark:text-white !leading-[1.6] mb-4 sm:mb-5">
        <span className="split-word">{t("title_we")}</span>{" "}
        <span className="split-word">{t("title_build")}</span>{" "}
        <span className="split-word">{t("title_digital_products")}</span>{" "}
        <span className="split-word bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent">
          {t("title_grow_business")}
        </span>
      </h1>

      {/* Paragraph Description */}
      <p className="text-sm sm:text-lg text-white dark:text-slate-300 font-medium leading-relaxed max-w-xl mb-6 sm:mb-8">
        {t("description")}
      </p>
    </div>
  );
}