'use client';

import React from 'react';
import { Star } from 'lucide-react';

export default function ClientCard({ testimonial, itemsPerView }) {
    const { id, accent, rating, comment, clientName, role, company, metric } = testimonial;

    return (
        <div
            className="shrink-0 px-3"
            style={{ width: `${100 / itemsPerView}%` }}
        >
            <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-7 shadow-sm dark:shadow-none transition-all duration-300 hover:border-cyan-400/40">
                <div>
                    <div className="mb-5 flex items-center justify-between border-b border-dashed border-slate-200 dark:border-slate-700/80 pb-3">
                        <span className="font-mono text-[0.68rem] tracking-widest text-slate-400 dark:text-slate-500">
                            REC/{id}
                        </span>
                        <span
                            className="rounded border-2 border-double px-2 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-widest"
                            style={{ borderColor: accent, color: accent }}
                        >
                            {metric}
                        </span>
                    </div>

                    <div className="mb-4 flex gap-0.5 text-amber-400">
                        {[...Array(rating)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        ))}
                    </div>

                    <p className="mb-8 text-sm font-medium leading-[1.75] text-slate-700 dark:text-slate-300">
                        {comment}
                    </p>
                </div>

                <div className="flex items-center gap-3 border-t border-dashed border-slate-200 dark:border-slate-700/80 pt-5">
                    <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-[0.65rem] font-black text-white"
                        style={{ backgroundColor: accent }}
                    >
                        {clientName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{clientName}</h4>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            {role} — {company}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
