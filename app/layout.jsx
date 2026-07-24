import './globals.css';

export const metadata = {
  title: {
    default: 'Nexora Solutions | Premium Digital Agency',
    template: '%s | Nexora Solutions',
  },
  description:
    'Nexora Solutions is a premium digital agency specializing in scalable web applications, native mobile apps, enterprise cloud solutions, and award-winning UI/UX design. Code. Innovate. Elevate.',
  
  keywords: [
    'Digital Agency',
    'Software House',
    'Web Development',
    'Mobile Apps',
    'React.js',
    'Next.js',
    'UI/UX Design',
    'Cloud Solutions',
    'Custom Software',
    'Nexora Solutions',
    'Egypt',
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
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="bg-black text-white antialiased overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}