import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Middleware handles locale routing, so we just pass through
  return children;
}
