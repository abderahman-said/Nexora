import React from "react";
import SharedHero from "@/components/ui/SharedHero";
import { useTranslations } from "next-intl";

export default function ProjectsHero() {
  const t = useTranslations("projects_page.hero");
  return (
    <SharedHero
      id="projects-hero"
      titlePrefix={t("prefix")}
      titleHighlight={t("highlight")}
      breadcrumbLabel={t("breadcrumb")}
      backgroundImage="/assets/about_banner.webp"
    />
  );
}
