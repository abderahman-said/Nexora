import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata = {
  title: {
    default: 'Nexora Solutions | Premium Digital Agency',
    template: '%s | Nexora Solutions',
  },
  description:
    'Nexora Solutions is a premium digital agency specializing in scalable web applications, native mobile apps, enterprise cloud solutions, and award-winning UI/UX design. Code. Innovate. Elevate.',
  
  keywords: [
    'Digital Agency',
    'Software Engineering',
    'Application Development',
    'Mobile Apps',
    'UI/UX Design',
    'Integrated Tech Solutions',
    'Technical Consulting',
    'Custom Software',
    'Nexora Solutions',
  ],

  authors: [{ name: 'Nexora Solutions' }],
  creator: 'Nexora Solutions',

  openGraph: {
    title: 'Nexora Solutions | Premium Digital Agency',
    description:
      'We build digital solutions that drive your business forward. Web apps, mobile products, custom software, and cloud architecture.',
    url: 'https://nexora-solutions.co/',
    siteName: 'Nexora Solutions',
    images: [
      {
        url: '/assets/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Nexora Solutions — Premium Digital Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Nexora Solutions | Premium Digital Agency',
    description:
      'Code. Innovate. Elevate. Premium digital solutions for modern businesses.',
    images: ['/assets/logo.jpg'],
  },

  icons: {
    icon: '/assets/logo.jpg',
    shortcut: '/assets/logo.jpg',
    apple: '/assets/logo.jpg',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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