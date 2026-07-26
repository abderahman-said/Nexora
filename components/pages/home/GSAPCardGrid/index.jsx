'use client';

import { useRef } from 'react';
import { STEPS } from './gsapCardData';
import { useCardGridGSAP } from './useCardGridGSAP';
import ProcessPanel from './ProcessPanel';
import SectionHeader from '@/components/ui/SectionHeader';

export default function GSAPCardGrid() {
    const sectionRef = useRef(null);
    const pinRef = useRef(null);
    const stepRefs = useRef([]);
    const dotRefs = useRef([]);
    const fillRef = useRef(null);
    const readoutRef = useRef(null);

    const { activeIndex, jumpToStep } = useCardGridGSAP({
        STEPS, sectionRef, pinRef, stepRefs, fillRef
    });

    const active = STEPS[activeIndex];
    const totalSteps = STEPS.length;

    return (
        <section ref={sectionRef} className="proc-section relative bg-white dark:bg-[#060913] border-b border-slate-200/90 dark:border-slate-800/80 transition-colors duration-300" suppressHydrationWarning>
            <div
                ref={pinRef}
                className="proc-pin relative max-w-[1280px] mx-auto min-h-screen flex flex-col overflow-hidden [font-feature-settings:'tnum'_1]"
                style={{ '--accent': STEPS[0].accent }}
                suppressHydrationWarning
            >
                

                {/* Technical corner accents */}
                <div className="absolute top-6 left-6 w-5 h-5 z-10 pointer-events-none opacity-40 max-lg:hidden border-t border-l border-slate-900/30 dark:border-slate-100/30" aria-hidden="true" />
                <div className="absolute top-6 right-6 w-5 h-5 z-10 pointer-events-none opacity-40 max-lg:hidden border-t border-r border-slate-900/30 dark:border-slate-100/30" aria-hidden="true" />
                <div className="absolute bottom-6 left-6 w-5 h-5 z-10 pointer-events-none opacity-40 max-lg:hidden border-b border-l border-slate-900/30 dark:border-slate-100/30" aria-hidden="true" />
                <div className="absolute bottom-6 right-6 w-5 h-5 z-10 pointer-events-none opacity-40 max-lg:hidden border-b border-r border-slate-900/30 dark:border-slate-100/30" aria-hidden="true" />

                {/* Header */}
                <div className="proc-header relative z-10 px-5 md:px-16 pt-10 md:pt-14">
                    <SectionHeader
                        tag="Workflow"
                        badge="How We Work"
                        badgeColor="info"
                        title="Engineered For"
                        highlight="Scale & Speed"
                        align="between"
                        className="!mb-4"
                        rightElement={
                            <div ref={readoutRef} className="text-[0.78rem] font-semibold tracking-[0.04em] text-slate-900/50 dark:text-slate-400 pb-1" aria-live="polite">
                                SEQ <b className="text-slate-900 dark:text-white font-bold">{String(activeIndex + 1).padStart(2, '0')}</b> / {String(totalSteps).padStart(2, '0')} — {active.title.toUpperCase()}
                            </div>
                        }
                    />
                </div>

                {/* Progress bar and step tabs */}
                <div className="relative z-10 px-5 md:px-16 mt-5">
                    <div className="relative w-full h-0.5 bg-black/10 dark:bg-white/10">
                        <div ref={fillRef} className="h-full bg-[var(--accent)] origin-left shadow-[0_0_10px_var(--accent)] transition-[background,box-shadow] duration-500" suppressHydrationWarning />
                    </div>
                    <div className="flex mt-4 gap-2.5 max-sm:gap-1.5" role="tablist" aria-label="Process steps">
                        {STEPS.map((s, i) => {
                            const state = i === activeIndex ? 'active' : i < activeIndex ? 'done' : 'upcoming';
                            return (
                                <button
                                    key={s.step}
                                    ref={(el) => (dotRefs.current[i] = el)}
                                    type="button"
                                    role="tab"
                                    aria-selected={i === activeIndex}
                                    aria-label={`${s.step} ${s.title}`}
                                    className={`cursor-pointer flex-1 flex items-center justify-center sm:justify-start gap-2.5 p-2.5 sm:p-3 sm:px-4 rounded-md border text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2 ${state === 'active'
                                            ? 'border-[var(--accent)] bg-white dark:bg-slate-800 shadow-[0_4px_14px_rgba(0,0,0,0.06)] -translate-y-0.5'
                                            : 'border-black/10 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 hover:border-black/20 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800'
                                        }`}
                                    onClick={() => jumpToStep(i)}
                                >
                                    <span className={`shrink-0 w-6.5 h-6.5 flex items-center justify-center text-[0.68rem] font-bold border rounded transition-colors duration-300 ${state === 'active'
                                            ? 'border-[var(--accent)] bg-[var(--accent)] text-white'
                                            : state === 'done'
                                                ? 'border-black/20 dark:border-slate-700 text-slate-900/70 dark:text-slate-300'
                                                : 'border-black/12 dark:border-slate-800 text-slate-900/50 dark:text-slate-400'
                                        }`}>
                                        {s.step}
                                    </span>
                                    <span className="flex flex-col gap-0.5 min-w-0 max-sm:hidden">
                                        <span className={`text-[0.82rem] font-semibold text-slate-900/60 dark:text-slate-400 truncate transition-colors duration-300 ${state === 'active' ? 'text-slate-900 dark:text-white font-bold' : state === 'done' ? 'text-slate-900/75 dark:text-slate-200' : ''
                                            }`}>
                                            {s.title}
                                        </span>
                                        <span className={`text-[0.62rem] font-semibold tracking-[0.08em] uppercase text-slate-900/35 dark:text-slate-500 ${state === 'active' ? 'text-[var(--accent)]' : ''
                                            }`}>
                                            {state === 'active' ? 'In view' : state === 'done' ? 'Complete' : 'Up next'}
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Section Body - 3D card stack */}
                <div className="relative z-10 flex-1 flex items-center px-5 md:px-16 py-8 md:py-14">
                    <div className="relative grid w-full [perspective:1800px]" suppressHydrationWarning>
                        {STEPS.map((s, i) => (
                            <ProcessPanel
                                key={s.step}
                                s={s}
                                panelRef={(el) => (stepRefs.current[i] = el)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}