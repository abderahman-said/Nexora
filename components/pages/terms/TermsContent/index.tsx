import React from 'react';
import Container from '@/components/ui/Container';

export default function TermsContent() {
    return (
        <section className="relative w-full py-16 md:py-24">
            <Container>
                <div className="max-w-4xl mx-auto space-y-8 text-slate-700 dark:text-slate-300">
                    <div className="prose prose-lg dark:prose-invert">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Introduction</h2>
                        <p className="mb-6">
                            Welcome to Nexora Solutions. By using our services, you agree to these Terms of Service. Please read them carefully.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Services</h2>
                        <p className="mb-6">
                            Nexora Solutions provides software development, consulting, and technology services. We reserve the right to modify or discontinue services at any time.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">User Responsibilities</h2>
                        <p className="mb-4">Users agree to:</p>
                        <ul className="list-disc ps-6 mb-6 space-y-2">
                            <li>Provide accurate information</li>
                            <li>Use services for lawful purposes only</li>
                            <li>Respect intellectual property rights</li>
                            <li>Not interfere with service operations</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Payment Terms</h2>
                        <p className="mb-6">
                            Payment terms are specified in individual project agreements. Late payments may incur additional fees. All payments are non-refundable unless otherwise stated.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Intellectual Property</h2>
                        <p className="mb-6">
                            All content, code, and materials provided by Nexora Solutions remain our intellectual property unless explicitly transferred in writing. Clients receive usage rights as specified in their agreements.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Limitation of Liability</h2>
                        <p className="mb-6">
                            Nexora Solutions is not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our liability is limited to the amount paid for the specific service.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Termination</h2>
                        <p className="mb-6">
                            Either party may terminate the agreement with written notice. Upon termination, all outstanding payments become due immediately.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Governing Law</h2>
                        <p className="mb-6">
                            These terms are governed by the laws of Egypt. Any disputes will be resolved in Egyptian courts.
                        </p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Contact Us</h2>
                        <p className="mb-6">
                            For questions about these Terms of Service, please contact us at legal@nexora.solutions
                        </p>

                       
                    </div>
                </div>
            </Container>
        </section>
    );
}
