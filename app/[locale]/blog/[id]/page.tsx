import React from 'react';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import BlogDetailsPage from '@/components/pages/blog-details/index';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, id: string }> }) {
    const locale = (await params).locale;
    const t = await getTranslations({ locale, namespace: 'homeBlog' });
    return {
        title: t(`items.${(await params).id}.title`) || 'Blog Details'
    };
}

export default async function BlogDetails({ params }: { params: Promise<{ locale: string, id: string }> }) {
    const id = (await params).id;
    const validIds = ['post1', 'post2', 'post3'];
    
    if (!validIds.includes(id)) {
        notFound();
    }

    return <BlogDetailsPage id={id} />;
}
