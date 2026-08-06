import React from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { FileQuestion } from 'lucide-react';

export default function NotFoundPage() {
  const t = useTranslations('notFound');
  const locale = useLocale();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-white dark:bg-[#060913]">
      <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800/50 text-slate-500 flex items-center justify-center mb-6 shadow-sm">
        <FileQuestion className="w-10 h-10" />
      </div>
      
      <h1 className="text-6xl font-bold text-slate-900 dark:text-slate-100 mb-4 tracking-tight">
        404
      </h1>
      
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-3">
        {t('title')}
      </h2>
      
      <p className="text-slate-600 dark:text-slate-400 max-w-[500px] mb-8 text-lg">
        {t('description')}
      </p>

      <Button as={Link} href={`/${locale}`} variant="primary" size="lg" className="rounded-full px-8 font-medium">
        {t('button')}
      </Button>
    </div>
  );
}
