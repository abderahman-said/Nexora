import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import SvgSymbols from '@/components/icons/SvgSymbols';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ClientAnimations from '@/components/animations/ClientAnimations';

const epilogue = localFont({
  src: '../public/fonts/Epilogue-VariableFont_wght.ttf',
  variable: '--font-epilogue',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://nexora-solutions.co'),
  title: {
    default: 'Nexora Solutions | Premium Enterprise Software Agency',
    template: '%s | Nexora Solutions',
  },
  description:
    'Nexora Solutions is a premium software engineering agency specializing in scalable web platforms, mobile products, cloud architecture, and high-performance UI/UX design. Code. Innovate. Elevate.',

  keywords: [
    'Software Agency',
    'Software Engineering',
    'Application Development',
    'Mobile Apps',
    'UI/UX Design Systems',
    'Integrated Tech Solutions',
    'Technical Consulting',
    'Custom Enterprise Software',
    'Nexora Solutions',
  ],

  authors: [{ name: 'Nexora Solutions' }],
  creator: 'Nexora Solutions',
  publisher: 'Nexora Solutions',

  alternates: {
    canonical: 'https://nexora-solutions.co',
  },

  openGraph: {
    title: 'Nexora Solutions | Premium Enterprise Software Agency',
    description:
      'We build digital solutions that drive business growth. Scalable web apps, mobile products, custom enterprise software, and cloud architecture.',
    url: 'https://nexora-solutions.co/',
    siteName: 'Nexora Solutions',
    images: [
      {
        url: '/assets/logo.png',
        width: 1200,
        height: 630,
        alt: 'Nexora Solutions — Premium Software Agency',
      },
    ],
    locale: 'en_US',
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#090d16' },
  ],
};

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
      url: 'https://nexora-solutions.co/',
      name: 'Nexora Solutions',
      publisher: {
        '@id': 'https://nexora-solutions.co/#organization'
      },
      inLanguage: 'en-US'
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://nexora-solutions.co/#service',
      name: 'Nexora Solutions Software Engineering',
      url: 'https://nexora-solutions.co/',
      image: 'https://nexora-solutions.co/assets/hero.webp',
      priceRange: '$$$',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'EG'
      }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/assets/hero.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
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
                  var stored = localStorage.getItem('nexora-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = stored || (prefersDark ? 'dark' : 'light');
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
      <body className={`${epilogue.variable} font-sans bg-[#f8fafc] site-grid-bg text-slate-900 dark:bg-[#090d16] dark:text-slate-100 antialiased overflow-x-hidden transition-colors duration-300`} suppressHydrationWarning>
        <ThemeProvider>
          <SvgSymbols />
          <ClientAnimations />
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}