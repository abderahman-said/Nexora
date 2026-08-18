import React from 'react';
import Container from '@/components/ui/Container';
import { useTranslations, useLocale } from 'next-intl';

export default function BlogDetailsPage({ id }: { id: string }) {
    const t = useTranslations('homeBlog');
    const locale = useLocale();
    const title = t(`items.${id}.title`);

    return (
        <main className="w-full min-h-screen pt-32 pb-16 bg-slate-50 dark:bg-[#090d16]">
            <Container>
                <article className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden">
                    <div className="w-full h-[400px] relative bg-slate-200 dark:bg-slate-800">
                        {/* Placeholder for the image */}
                        <img 
                            src={`/blog/${id}.jpg`} 
                            alt={title} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    <div className="p-8 md:p-12">
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                            {title}
                        </h1>
                        
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                                {locale === 'ar' ? 'محتوى المقال سيتم إضافته قريباً...' : 'Article content will be added soon...'}
                            </p>
                        </div>
                    </div>
                </article>
            </Container>
        </main>
    );
}
