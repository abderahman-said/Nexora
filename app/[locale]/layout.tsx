import { Inter, Cairo } from 'next/font/google';
import '../globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import SvgSymbols from '@/components/icons/SvgSymbols';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import { NextIntlClientProvider } from 'next-intl';
import { GlobalNavigationLoader } from '@/components/ui/GlobalNavigationLoader';
import { getMessages, setRequestLocale } from 'next-intl/server';
import type { Metadata, Viewport } from 'next';
import React from 'react';

const inter = Inter({
  subsets: ['latin'],
  variable: '--next-font-inter',
  display: 'swap',
  preload: true,
});

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--next-font-cairo',
  display: 'swap',
  preload: true,
});

export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL 
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://nexora-solutions.co');

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: isAr
        ? 'نيكسورا حلول البرمجيات | شركتك البرمجية المتكاملة'
        : 'Nexora Solutions | Premium Enterprise Software Agency',
      template: '%s | Nexora Solutions',
    },
    description: isAr
      ? 'نيكسورا سيرفيسز هي وكالة هندسة برمجية رائدة متخصصة في تطوير منصات الويب والموبايل والحلول السحابية وتصاميم UI/UX.'
      : 'Nexora Solutions is a premium software engineering agency specializing in scalable web platforms, mobile products, cloud architecture, and high-performance UI/UX design.',

    keywords: [
      'Software Agency',
      'Software Engineering',
      'Application Development',
      'Mobile Apps',
      'UI/UX Design Systems',
      'Technical Consulting',
      'Custom Enterprise Software',
      'Nexora Solutions',
    ],

    authors: [{ name: 'Nexora Solutions' }],
    creator: 'Nexora Solutions',
    publisher: 'Nexora Solutions',

    openGraph: {
      title: isAr
        ? 'نيكسورا للحلول البرمجية | تطوير مواقع وتطبيقات الموبايل'
        : 'Nexora Solutions | Premium Enterprise Software Agency',
      description: isAr
        ? 'نقوم بتبني وتطوير الحلول البرمجية الرقمية لنمو الأعمال.'
        : 'We build digital solutions that drive business growth. Scalable web apps, mobile products, custom enterprise software, and cloud architecture.',
      url: `${siteUrl}/${locale}`,
      siteName: 'Nexora Solutions',
      images: [
        {
          url: '/assets/logo.png',
          width: 1200,
          height: 630,
          alt: 'Nexora Solutions — Premium Software Agency',
        },
      ],
      locale: isAr ? 'ar_EG' : 'en_US',
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: 'Nexora Solutions | Premium Software Agency',
      description:
        'Code. Innovate. Elevate. Premium software engineering for modern enterprises.',
      images: ['/assets/logo.png'],
    },

    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon.png', type: 'image/png' },
      ],
      shortcut: '/favicon.png',
      apple: '/favicon.png',
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#090d16' },
  ],
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://nexora-solutions.co/#organization',
        name: 'Nexora Solutions',
        url: 'https://nexora-solutions.co/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://nexora-solutions.co/assets/logo.png',
        },
        description: 'Enterprise software engineering agency building scalable web & mobile solutions.',
        sameAs: [
          'https://www.linkedin.com',
          'https://github.com'
        ],
        knowsAbout: [
          'Software Development',
          'Web Architecture',
          'Mobile Application Development',
          'UI/UX Systems',
          'Cloud Computing'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://nexora-solutions.co/#website',
        url: `https://nexora-solutions.co/${locale}`,
        name: 'Nexora Solutions',
        publisher: {
          '@id': 'https://nexora-solutions.co/#organization'
        },
        inLanguage: locale === 'ar' ? 'ar-EG' : 'en-US'
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://nexora-solutions.co/#service',
        name: 'Nexora Solutions Software Engineering',
        url: `https://nexora-solutions.co/${locale}`,
        image: 'https://nexora-solutions.co/assets/hero.webp',
        priceRange: '$$$',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'EG'
        }
      }
    ]
  };

  return (
    <html lang={locale} dir={dir} className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdSchema).replace(/</g, '\\u003c'),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem('nexora-theme');
                  var theme = storedTheme || 'dark';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${cairo.variable} font-sans bg-[#f8fafc] site-grid-bg text-slate-900 dark:bg-[#090d16] dark:text-slate-100 antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <GlobalNavigationLoader />
            <SvgSymbols />
            <div className="flex min-h-[100dvh] flex-col overflow-x-clip">
              <Navbar />
              {children}
              <Footer />
            </div>
            <FloatingWhatsApp />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
