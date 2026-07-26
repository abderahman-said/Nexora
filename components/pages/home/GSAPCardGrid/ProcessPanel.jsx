import React from 'react';

export default function ProcessPanel({ s, panelRef }) {
    return (
        <div
            ref={panelRef}
            className="proc-panel relative [grid-area:1/1] grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-7 lg:gap-[72px] items-center p-6 md:p-14 rounded-xl border border-black/10 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] [backface-visibility:hidden] [transform-style:preserve-3d] will-change-transform before:content-[''] before:absolute before:-top-px before:left-8 before:right-8 before:h-[3px] before:rounded-t-sm before:bg-[var(--panel-accent,var(--accent))] before:shadow-[0_2px_10px_var(--panel-accent,var(--accent))]"
            style={{ '--panel-accent': s.accent }}
            suppressHydrationWarning
        >
            <div>
                <div className="w-16 h-16 relative flex items-center justify-center text-[1.6rem] text-[var(--panel-accent,var(--accent))] mb-7 before:content-[''] before:absolute before:inset-0 before:border before:border-dashed before:border-[var(--panel-accent,var(--accent))] before:rounded-lg before:opacity-60">
                    {React.createElement(s.icon, { className: "w-7 h-7" })}
                </div>
                <div className="text-[0.72rem] font-bold tracking-[0.1em] text-[var(--panel-accent,var(--accent))] mb-4">
                    §{s.step}
                </div>
                <h2 className="text-[clamp(2.1rem,3.6vw,3.4rem)] font-black tracking-[-0.03em] leading-[1.02] text-slate-900 dark:text-white mb-2" suppressHydrationWarning>
                    {s.title}
                </h2>
                <div className="text-[0.85rem] font-semibold text-slate-500 dark:text-slate-400 tracking-[0.03em]">
                    {s.subtitle}
                </div>
            </div>

            <div className="flex flex-col gap-6.5">
                <p className="text-[clamp(1rem,1.25vw,1.1rem)] text-slate-600 dark:text-slate-300 font-[450] leading-[1.8] max-w-[56ch]" suppressHydrationWarning>
                    {s.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {s.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3.5 py-1.5 rounded-md border border-black/10 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-[0.74rem] font-semibold text-slate-700 dark:text-slate-300 tracking-[0.01em] before:content-['→_'] before:text-[var(--panel-accent,var(--accent))]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="inline-flex items-baseline gap-4 p-4 py-3.5 w-fit border-l-[3px] border-[var(--panel-accent,var(--accent))] rounded-r-md bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-[1.6rem] font-extrabold text-[var(--panel-accent,var(--accent))]">
                        {s.metric.value}
                    </span>
                    <span className="text-[0.78rem] font-semibold text-slate-500 dark:text-slate-400 max-w-[140px] leading-tight">
                        {s.metric.label}
                    </span>
                </div>
            </div>
        </div>
    );
}

