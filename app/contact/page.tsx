import ContactPage from '@/components/pages/contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Nexora Solutions',
    description: 'Get in touch with Nexora Solutions for custom web engineering, enterprise software development, and technical consulting. Schedule a strategy call today.',
};

export default function Contact() {
    return <ContactPage />;
}
