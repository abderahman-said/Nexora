import React from "react";
import SharedHero from "@/components/ui/SharedHero";
import { useTranslations } from "next-intl";

export default function PrivacyHero() {
  const t = useTranslations("privacy.hero");
  return (
    <SharedHero
      id="privacy-hero"
      titlePrefix={t("prefix")}
      titleHighlight={t("highlight")}
      breadcrumbLabel={t("breadcrumb")}
      backgroundImage="/assets/about_banner.webp"
    />
  );
}
