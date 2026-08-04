import React from 'react';
import Container from '@/components/ui/Container';
import { useTranslations } from 'next-intl';

export default function TermsContent() {
    const t = useTranslations('terms');
    return (
        <section className="relative w-full py-16 md:py-24">
            <Container>
                <div className="max-w-4xl mx-auto space-y-8 text-slate-700 dark:text-slate-300">
                    <div className="prose prose-lg dark:prose-invert">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Introduction</h2>
                        <p className="mb-6">{t('introduction')}</p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('services')}</h2>
                        <p className="mb-6">{t('servicesDesc')}</p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('userResponsibilities')}</h2>
                        <p className="mb-4">{t('userResponsibilitiesDesc')}</p>
                        <ul className="list-disc ps-6 mb-6 space-y-2">
                            <li>{t('userResponsibilitiesList.1')}</li>
                            <li>{t('userResponsibilitiesList.2')}</li>
                            <li>{t('userResponsibilitiesList.3')}</li>
                            <li>{t('userResponsibilitiesList.4')}</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('paymentTerms')}</h2>
                        <p className="mb-6">{t('paymentTermsDesc')}</p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('intellectualProperty')}</h2>
                        <p className="mb-6">{t('intellectualPropertyDesc')}</p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('liability')}</h2>
                        <p className="mb-6">{t('liabilityDesc')}</p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('termination')}</h2>
                        <p className="mb-6">{t('terminationDesc')}</p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('governingLaw')}</h2>
                        <p className="mb-6">{t('governingLawDesc')}</p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('contactUs')}</h2>
                        <p className="mb-6">{t('contactUsDesc')}</p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
