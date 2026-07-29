import ServicesPage from '@/components/pages/services';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Services | Nexora Solutions',
    description: 'Explore our comprehensive software engineering services including web development, mobile apps, cloud architecture, AI integration, and UI/UX design tailored for enterprise growth.',
};

export default function Services() {
    return <ServicesPage />;
}
