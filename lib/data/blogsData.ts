import { useTranslations } from 'next-intl';
interface BLOG_POSTS  {
     id: string;
     image: string;
     title: string;
     link: string;
}
export const getBlogs = (t: ReturnType<typeof useTranslations>, locale: string): BLOG_POSTS[] => [
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
 