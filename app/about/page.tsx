import AboutPage from '@/components/pages/about';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | Nexora Solutions',
    description: 'Discover the story, engineering standards, core values, and executive team at Nexora Solutions. Empowering enterprise growth through scalable digital engineering.',
};

export default function About() {
    return <AboutPage />;
}
