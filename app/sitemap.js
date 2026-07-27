export default function sitemap() {
  const baseUrl = 'https://nexora-solutions.co';
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
