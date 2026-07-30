import PrivacyPage from '@/components/pages/privacy';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Nexora Solutions',
    description: 'Learn how Nexora Solutions collects, uses, and protects your personal information.',
};

export default function Privacy() {
    return <PrivacyPage />;
}
