import React from 'react';
import Container from '@/components/ui/Container';
import { useTranslations } from 'next-intl';

export default function PrivacyContent() {
    const t = useTranslations('privacy');
    return (
        <section className="relative w-full py-16 md:py-24">
            <Container>
                <div className="max-w-4xl mx-auto space-y-8 text-slate-700 dark:text-slate-300">
                    <div className="prose prose-lg dark:prose-invert">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Introduction</h2>
                        <p className="mb-6">{t('introduction')}</p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('infoWeCollect')}</h2>
                        <p className="mb-4">{t('infoWeCollectDesc')}</p>
                        <ul className="list-disc ps-6 mb-6 space-y-2">
                            <li>{t('infoWeCollectList.1')}</li>
                            <li>{t('infoWeCollectList.2')}</li>
                            <li>{t('infoWeCollectList.3')}</li>
                            <li>{t('infoWeCollectList.4')}</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('howWeUse')}</h2>
                        <p className="mb-4">{t('howWeUseDesc')}</p>
                        <ul className="list-disc ps-6 mb-6 space-y-2">
                            <li>{t('howWeUseList.1')}</li>
                            <li>{t('howWeUseList.2')}</li>
                            <li>{t('howWeUseList.3')}</li>
                            <li>{t('howWeUseList.4')}</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('dataSecurity')}</h2>
                        <p className="mb-6">{t('dataSecurityDesc')}</p>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('yourRights')}</h2>
                        <p className="mb-4">{t('yourRightsDesc')}</p>
                        <ul className="list-disc ps-6 mb-6 space-y-2">
                            <li>{t('yourRightsList.1')}</li>
                            <li>{t('yourRightsList.2')}</li>
                            <li>{t('yourRightsList.3')}</li>
                            <li>{t('yourRightsList.4')}</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{t('contactUs')}</h2>
                        <p className="mb-6">{t('contactUsDesc')}</p>
                    </div>
                </div>
            </Container>
        </section>
    );
}