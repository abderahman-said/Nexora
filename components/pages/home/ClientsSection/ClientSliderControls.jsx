'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ClientSliderControls({ goTo, clampedIndex, pageCount, atStart, atEnd }) {
    return (
        <div className="mt-8 flex items-center justify-center gap-6">
            <button
                type="button"
                onClick={() => goTo(clampedIndex - 1)}
                disabled={atStart}
                aria-label="Previous"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 transition hover:border-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:shadow-[0_0_0_4px_rgba(34,211,238,0.08)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-slate-300 dark:disabled:hover:border-slate-700 disabled:hover:text-slate-700 dark:disabled:hover:text-slate-300 disabled:hover:shadow-none"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-2">
                {Array.from({ length: pageCount }).map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={`Go to page ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                            i === clampedIndex ? 'w-6 bg-cyan-500 dark:bg-cyan-400' : 'w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500'
                        }`}
                    />
                ))}
            </div>

            <button
                type="button"
                onClick={() => goTo(clampedIndex + 1)}
                disabled={atEnd}
                aria-label="Next"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 transition hover:border-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-400 hover:shadow-[0_0_0_4px_rgba(34,211,238,0.08)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-slate-300 dark:disabled:hover:border-slate-700 disabled:hover:text-slate-700 dark:disabled:hover:text-slate-300 disabled:hover:shadow-none"
            >
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    );
}
