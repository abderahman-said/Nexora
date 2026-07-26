import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata = {
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

  openGraph: {
    title: 'Nexora Solutions | Premium Enterprise Software Agency',
    description:
      'We build digital solutions that drive business growth. Scalable web apps, mobile products, custom enterprise software, and cloud architecture.',
    url: 'https://nexora-solutions.co/',
    siteName: 'Nexora Solutions',
    images: [
      {
        url: '/assets/logo.jpg',
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
    images: ['/assets/logo.jpg'],
  },

  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nexora Solutions',
  url: 'https://nexora-solutions.co/',
  logo: 'https://nexora-solutions.co/assets/logo.jpg',
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
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
      <body className="bg-[#f8fafc] site-grid-bg text-slate-900 dark:bg-[#090d16] dark:text-slate-100 antialiased overflow-x-hidden transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}