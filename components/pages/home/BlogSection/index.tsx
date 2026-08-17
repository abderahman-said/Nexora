"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import { BlogCard } from "./BlogCard";
import GSAPSlider from "@/components/ui/GSAPSlider";
import { getBlogs } from "@/lib/data/blogsData";

export default function BlogSection() {
  const locale = useLocale();
  const t = useTranslations("homeBlog");

  const BLOG_POSTS = getBlogs(t, locale);


  return (
    <section
      id="blog"
      className="scroll-section relative w-full py-12 md:py-16 site-grid-bg overflow-hidden"
    >
      <Container className="relative z-10">
        {/* Section Header */}
        <SectionHeader
          align="between"
          className="!mb-8 md:!mb-12"
          title={
            <span className="inline-flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5 shrink-0">
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-blue-500 shadow-[0_0_12px_#2563eb]" />
              </span>
              <span>
                {t("title_main")}{" "}
                {t("title_highlight") && (
                  <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-500 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
                    {t("title_highlight")}
                  </span>
                )}
              </span>
            </span>
          }
          rightElement={
            <Link
              href={`/${locale}/blog`}
              aria-label={`${t("button_view_all")} ${t("title_main")}`}
              className="inline-flex whitespace-nowrap items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 px-4 md:px-6 py-2.5 md:py-3 text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wider text-white shadow-md shadow-blue-500/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/35 group"
            >
              <span>{t("button_view_all")}</span>
              <ArrowRight className="w-4 h-4 rtl:scale-x-[-1] transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </Link>
          }
        />
        <div className="relative z-20 px-2">
          <GSAPSlider
            items={BLOG_POSTS}
            renderItem={(item) => <BlogCard key={item.id} post={item} readMoreText={t("read_more")} />}
            defaultVisibleCount={3}
            mobileVisibleCount={1}
            centerModeMobile={true}
            centerCardWidthPercent={76}
            showDots={true}
            autoplay={false}
            pauseOnHover={false}
            enableDrag={true}
            infinite={true}
          />
        </div>
        {/* Blog Cards Grid */}

      </Container>
    </section>
  );
}
