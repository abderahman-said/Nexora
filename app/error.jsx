'use client';

import React, { useEffect } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({ error, reset }) {
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
                <button
                    onClick={() => reset()}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
                >
                    <RefreshCw className="w-4 h-4" />
                    <span>Try Again</span>
                </button>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                    <span>Back to Home</span>
                </Link>
            </div>
        </div>
    );
}
