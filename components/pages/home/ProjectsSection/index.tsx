"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import ProjectCard from "./ProjectCard";
import { projectService } from "@/lib/services/projectService";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";
import ProjectsCoverflowSlider from "@/components/ui/GSAPSlider/ProjectsCoverflowSlider";

export default function ProjectsSection() {
  const locale = useLocale();
  const t = useTranslations("homeProjects");
  const allProjects = projectService.getAllProjects();

  return (
    <section
      id="portfolio"
      className="scroll-section relative w-full py-8 md:py-10 transition-colors duration-300 overflow-hidden"
    >
      <Container>
        {/* Section Header */}
        <SectionHeader
          align="between"
          className="!mb-6 md:!mb-8"
          title={
            <span className="inline-flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5 shrink-0">
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-blue-500 shadow-[0_0_12px_#2563eb]" />
              </span>
              <span>
                {t("title_our")}{" "}
                <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                  {t("title_work")}
                </span>
              </span>
            </span>
          }
          rightElement={
            <Link
              href={`/${locale}/projects`}
              aria-label={`${t("button_see_more")} ${t("title_work")}`}
              className="inline-flex whitespace-nowrap items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 px-4 md:px-6 py-2.5 md:py-3 text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wider text-white shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/35 group"
            >
              <span>{t("button_see_more")}</span>
              <ArrowRight className="w-4 h-4 rtl:scale-x-[-1] transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          }
        />

        <div className="w-full mt-[-10px] md:!mt-[-35px]">
          <ProjectsCoverflowSlider
            items={allProjects}
            showDots
            autoplay={false}
            pauseOnHover={false}
            enableDrag
            renderItem={(p, index) => (
              <ProjectCard key={p.id} p={p} priority={index < 4} />
            )}
          />
        </div>
      </Container>
    </section>
  );
}
