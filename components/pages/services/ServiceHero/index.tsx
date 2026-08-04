import SharedHero from "@/components/ui/SharedHero";
import { useTranslations } from "next-intl";

export default function ServiceHero() {
  const t = useTranslations("services_page.hero");
  return (
    <SharedHero
      id="services-hero"
      titlePrefix={t("prefix")}
      titleHighlight={t("highlight")}
      breadcrumbLabel={t("breadcrumb")}
      backgroundImage="/assets/about_banner.webp"
    />
  );
}
