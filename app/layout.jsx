import './globals.css';

export const metadata = {
  title: {
    default: 'TechNova | Premium Software Development Agency',
    template: '%s | TechNova',
  },
  description:
    'TechNova is a leading software development company specializing in scalable web applications, native mobile apps, and enterprise cloud solutions.',
  
  keywords: [
    'Software Company',
    'Web Development',
    'Mobile Apps',
    'React.js',
    'Next.js',
    'UI/UX Design',
    'Enterprise Solutions',
  ],

  authors: [{ name: 'TechNova Team' }],
  creator: 'TechNova',

  openGraph: {
    title: 'TechNova | Premium Software Development',
    description:
      'Partner with TechNova to build high-performance web and mobile applications that scale your business.',
    url: 'https://technova.example.com/',
    siteName: 'TechNova',
    images: [
      {
        url: 'https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/68381362603d6402ee03c00e_favicon.png', // Update with corporate logo later
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'TechNova | Premium Software Development',
    description:
      'We build premium digital solutions that empower businesses.',
    images: ['https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/68381362603d6402ee03c00e_favicon.png'],
  },

  icons: {
    icon: 'https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/68381362603d6402ee03c00e_favicon.png',
    shortcut: 'https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/68381362603d6402ee03c00e_favicon.png',
    apple: 'https://cdn.prod.website-files.com/683703490bc01e1b8c052e06/68381362603d6402ee03c00e_favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-background text-foreground antialiased selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}