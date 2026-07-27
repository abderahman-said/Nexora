'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function SuccessState({ onReset }) {
    return (
        <div className="py-12 sm:py-16 text-center space-y-4 my-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Thank You! Message Sent Successfully.
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-md mx-auto">
                We have received your message. Our technical team will get back to you within 2 hours.
            </p>
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onReset}
                className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 dark:hover:bg-slate-700"
            >
                Send Another Message
            </Button>
        </div>
    );
}
