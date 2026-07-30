import TermsPage from '@/components/pages/terms';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | Nexora Solutions',
    description: 'Read the terms and conditions for using Nexora Solutions services.',
};

export default function Terms() {
    return <TermsPage />;
}
