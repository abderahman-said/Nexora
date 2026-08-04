import React from "react";
import SharedHero from "@/components/ui/SharedHero";
import { useTranslations } from "next-intl";

export default function TermsHero() {
  const t = useTranslations("terms.hero");
  return (
    <SharedHero
      id="terms-hero"
      titlePrefix={t("prefix")}
      titleHighlight={t("highlight")}
      breadcrumbLabel={t("breadcrumb")}
      backgroundImage="/assets/about_banner.webp"
    />
  );
}
