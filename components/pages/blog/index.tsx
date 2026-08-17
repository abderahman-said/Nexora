import React from 'react';
import BlogHero from './BlogHero';
import BlogList from './BlogList';

export default function BlogPage() {
    return (
        <main className="w-full">
            <BlogHero />
            <BlogList />
        </main>
    );
}
