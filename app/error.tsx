'use client';

import React, { useEffect } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import type { ErrorProps } from './types';

export default function GlobalError({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error('App Error Boundary caught:', error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-white dark:bg-[#060913]">
            <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center mb-6 shadow-sm">
                <AlertTriangle className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                Something went wrong!
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mb-8">
                An unexpected error occurred while loading this page. Please try refreshing or returning to the homepage.
            </p>

            <div className="flex items-center gap-4">
                <Button
                    onClick={() => reset()}
                    variant="primary"
                    size="md"
                    className="rounded-full font-bold text-xs uppercase tracking-wider gap-2 shadow-md"
                >
                    <RefreshCw className="w-4 h-4" />
                    <span>Try Again</span>
                </Button>
                <Button
                    as={Link}
                    href="/"
                    variant="ghost"
                    size="md"
                    className="rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                    <span>Back to Home</span>
                </Button>
            </div>
        </div>
    );
}
