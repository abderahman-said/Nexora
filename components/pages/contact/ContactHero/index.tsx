import React from "react";
import SharedHero from "@/components/ui/SharedHero";
import { useTranslations } from "next-intl";

export default function ContactHero() {
  const t = useTranslations("contact");
  return (
    <SharedHero
      id="contact-hero"
      titlePrefix={t("hero.prefix")}
      titleHighlight={t("hero.highlight")}
      breadcrumbLabel={t("hero.breadcrumb")}
      backgroundImage="/assets/about_banner.webp"
    />
  );
}
