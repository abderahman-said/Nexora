import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import { CONTACT_INFO } from '../contactData';

export default function ContactInfo() {
    return (
        <section
            id="contact-info"
            className="scroll-section relative w-full py-12 sm:py-16 bg-white dark:bg-[#060913] border-b border-slate-200/90 dark:border-slate-800/80 transition-colors duration-300"
        >
            <Container className="relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CONTACT_INFO.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.id}
                                className="
                                    group relative p-6 rounded-3xl
                                    bg-slate-50/80 dark:bg-[#0c101d]
                                    border border-slate-200/80 dark:border-slate-800/80
                                    hover:border-blue-500/50 dark:hover:border-sky-400/50
                                    hover:shadow-xl hover:shadow-blue-500/10
                                    transition-all duration-300 flex flex-col justify-between space-y-5
                                "
                            >
                                <div className="space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-600/10 dark:bg-sky-500/10 text-blue-600 dark:text-sky-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-6 h-6 stroke-[2]" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                                            {item.title}
                                        </span>
                                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                                            {item.value}
                                        </h3>
                                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                                            {item.subtext}
                                        </p>
                                    </div>
                                </div>

                                {item.action && (
                                    <a
                                        href={item.action}
                                        target={item.action.startsWith('http') ? '_blank' : '_self'}
                                        rel="noopener noreferrer"
                                        className="
                                            inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider
                                            text-blue-600 dark:text-sky-400 group-hover:text-blue-700 dark:group-hover:text-sky-300
                                            pt-3 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors
                                        "
                                    >
                                        <span>{item.actionText}</span>
                                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
