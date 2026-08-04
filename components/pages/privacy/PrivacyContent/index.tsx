import React from 'react';
import Container from '@/components/ui/Container';

export default function PrivacyContent() {
    return (
        <section className="relative w-full py-16 md:py-24">
            <Container>
                <div className="max-w-4xl mx-auto space-y-8 text-slate-700 dark:text-slate-300">
                    <div className="prose prose-lg dark:prose-invert">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Introduction</h2>
                        <p className="mb-6">
                            At Nexora Solutions, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Information We Collect</h2>
                        <p className="mb-4">We collect the following types of information:</p>
                        <ul className="list-disc ps-6 mb-6 space-y-2">
                            <li>Personal information (name, email, phone number)</li>
                            <li>Business information (company name, job title)</li>
                            <li>Usage data (website visits, interactions)</li>
                            <li>Cookies and tracking technologies</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How We Use Your Information</h2>
                        <p className="mb-4">We use your information to:</p>
                        <ul className="list-disc ps-6 mb-6 space-y-2">
                            <li>Provide and improve our services</li>
                            <li>Communicate with you about our offerings</li>
                            <li>Analyze usage patterns</li>
                            <li>Ensure security and prevent fraud</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Data Security</h2>
                        <p className="mb-6">
                            We implement industry-standard security measures to protect your data, including encryption, secure servers, and access controls.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Your Rights</h2>
                        <p className="mb-4">You have the right to:</p>
                        <ul className="list-disc ps-6 mb-6 space-y-2">
                            <li>Access your personal data</li>
                            <li>Request deletion of your data</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Update your information</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Contact Us</h2>
                        <p className="mb-6">
                            If you have questions about this Privacy Policy, please contact us at privacy@nexora.solutions
                        </p>

                       
                    </div>
                </div>
            </Container>
        </section>
    );
}