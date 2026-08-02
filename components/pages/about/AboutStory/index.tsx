import React from 'react';
import { Layers, CheckCircle2, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import { COMPANY_STORY } from '../aboutData';

export default function AboutStory() {
    return (
        <section
            id="about-story"
            className="scroll-section relative w-full py-16 sm:py-24 bg-slate-100/90 dark:bg-[#090d16] border-b border-slate-200/90 dark:border-slate-800/80 site-grid-bg overflow-hidden transition-colors duration-300"
        >
            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    <div className="lg:col-span-6 relative">
                        <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-white dark:bg-[#0c101d] p-3 sm:p-4">
                            <div className="relative h-[320px] sm:h-[420px] rounded-2xl overflow-hidden">
                                <Image
                                    src="/assets/about-team.png"
                                    alt="Nexora Engineering Team"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                    priority
                                />
                                <div className="absolute bottom-6 left-6 right-6 p-4 sm:p-6 rounded-2xl bg-white/90 dark:bg-[#060913]/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-xl flex items-center justify-between">
                                    <div>
                                        <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">Enterprise Standards</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">SOC2 & ISO Compliant Architectures</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-6 space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 text-blue-600 dark:text-sky-400 font-bold text-xs tracking-wider uppercase shadow-sm">
                            <Layers className="w-3.5 h-3.5" />
                            <span>{COMPANY_STORY.subtitle}</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.18]">
                            {COMPANY_STORY.title}
                        </h2>

                        <p className="text-slate-700 dark:text-slate-200 font-medium text-base sm:text-lg leading-relaxed">
                            {COMPANY_STORY.description}
                        </p>

                        <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                            {COMPANY_STORY.paragraphs.map((p, idx) => (
                                <p key={idx}>{p}</p>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                            {COMPANY_STORY.highlights.map((h, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-blue-600/10 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                    </div>
                                    <div>
                                        <strong className="text-slate-900 dark:text-white text-sm font-bold block">{h.title}</strong>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">{h.desc}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </Container>
        </section>
    );
}
