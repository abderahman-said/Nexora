import React from 'react';
import Container from "@/components/ui/Container";
import { BlogCard } from "@/components/pages/home/BlogSection/BlogCard";
import { useTranslations, useLocale } from 'next-intl';

export default function BlogList() {
    const t = useTranslations('homeBlog');
    const locale = useLocale();

    const BLOG_POSTS = [
        {
          id: "post1",
          image: "/blog/post1.jpg",
          title: t("items.post1.title"),
          link: `/${locale}/blog/post1`
        },
        {
          id: "post2",
          image: "/blog/post2.jpg",
          title: t("items.post2.title"),
          link: `/${locale}/blog/post2`
        },
        {
          id: "post3",
          image: "/blog/post3.jpg",
          title: t("items.post3.title"),
          link: `/${locale}/blog/post3`
        }
    ];

    return (
        <section
            id="blog-list"
            className="scroll-section relative w-full pt-16 sm:pt-20 pb-16 bg-slate-100/90 dark:bg-[#090d16] site-grid-bg overflow-hidden transition-colors duration-300"
        >
            <Container className="relative z-10">
                <h2 className="text-4xl font-bold mb-12 text-center text-slate-900 dark:text-white">
                    {t("title_main")}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
                    {BLOG_POSTS.map((post) => (
                        <BlogCard key={post.id} post={post} readMoreText={t("read_more")} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
