import type { MetadataRoute } from 'next';
import { SERVICE_SLUGS } from '@/lib/data/servicesData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nexora-solutions.co';
  const locales = ['en', 'ar'];
  const staticRoutes = ['', '/about', '/services', '/projects', '/contact', '/privacy', '/terms'];

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  locales.forEach((locale) => {
    staticRoutes.forEach((route) => {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      });
    });

    SERVICE_SLUGS.forEach((slug) => {
      entries.push({
        url: `${baseUrl}/${locale}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return entries;
}
