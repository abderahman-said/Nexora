import React from 'react';
import Container from '@/components/ui/Container';

export default function PageSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0b12] animate-pulse">
      {/* Hero Skeleton */}
      <section className="relative w-full pt-32 pb-16 sm:pt-40 lg:pt-44 lg:pb-20 bg-slate-50/90 dark:bg-[#060913] border-b border-slate-200/90 dark:border-slate-800/80 overflow-hidden">
        <Container className="relative z-10">
          <div className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6">
            {/* Title Skeleton */}
            <div className="h-10 sm:h-14 lg:h-16 w-3/4 max-w-[400px] bg-slate-200 dark:bg-slate-800/80 rounded-lg"></div>
            {/* Breadcrumb Skeleton */}
            <div className="h-5 w-48 bg-slate-200 dark:bg-slate-800/80 rounded-md"></div>
          </div>
        </Container>
      </section>

      {/* Content Skeleton */}
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="h-48 sm:h-64 bg-slate-100 dark:bg-slate-800/40 rounded-2xl w-full"></div>
              <div className="h-6 w-3/4 bg-slate-100 dark:bg-slate-800/40 rounded-md"></div>
              <div className="h-4 w-full bg-slate-100 dark:bg-slate-800/40 rounded-md"></div>
              <div className="h-4 w-5/6 bg-slate-100 dark:bg-slate-800/40 rounded-md"></div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
