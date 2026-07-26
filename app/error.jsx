'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';
import { RefreshCw, AlertTriangle } from 'lucide-react';

/**
 * 💡 Error Boundary Pattern: app/error.jsx
 * Catches uncaught runtime errors in Next.js App Router tree gracefully,
 * preventing total app crash and providing a stylish recovery mechanism.
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an analytics/logging service if needed
    console.error('Unhandled runtime error in Nexora App:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#f8fafc] dark:bg-[#060913] px-6 text-center transition-colors duration-300">
      <div className="flex flex-col items-center gap-5 max-w-md p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-2xl">
        <div className="h-16 w-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
          Something went wrong
        </h2>

        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          An unexpected error occurred. You can attempt to recover by clicking the retry button below.
        </p>

        <div className="mt-4 flex gap-3">
          <Button
            onClick={() => reset()}
            variant="gradient"
            size="md"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
