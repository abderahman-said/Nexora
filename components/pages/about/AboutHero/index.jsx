import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronsRight, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';

export default function AboutHero() {
    return (
        <section
            id="about-hero"
            className="scroll-section relative w-full pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28 bg-slate-50/90 dark:bg-[#060913] text-slate-900 dark:text-white overflow-hidden transition-colors duration-300 border-b border-slate-200/90 dark:border-slate-800/80 site-grid-bg"
        >
            {/* Background Banner Image & Theme Overlays */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <Image
                    src="/assets/about_banner.png"
                    alt="About Us Banner Background"
                    fill
                    priority
                    className="object-cover opacity-10 dark:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-50/95 via-white/90 to-slate-50/95 dark:from-[#060913]/90 dark:via-[#060913]/70 dark:to-[#060913]/90" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-100/90 via-transparent to-slate-50/80 dark:from-[#060913] dark:via-transparent dark:to-[#060913]/80" />
                
                {/* Ambient Radial Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 dark:bg-blue-600/20 blur-[120px] rounded-full" />
            </div>

            {/* Decorative Angled Bottom Clip Accent */}
            <div
                aria-hidden="true"
                className="absolute -bottom-1 left-0 w-48 sm:w-80 h-16 sm:h-24 bg-white dark:bg-[#060913] [clip-path:polygon(0_100%,100%_100%,0_0)] pointer-events-none z-10 opacity-10 dark:opacity-20"
            />

            <Container className="relative z-10">
                <div className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6">
                    
                    {/* Tag Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/10 border border-blue-300/50 dark:border-blue-500/30 text-blue-600 dark:text-sky-400 font-extrabold text-xs tracking-widest uppercase shadow-sm backdrop-blur-md">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>NEXORA SOLUTIONS</span>
                    </div>

                    {/* Main Title: About Us */}
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                        About <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 dark:from-blue-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">Us</span>
                    </h1>

                    {/* Breadcrumbs: Home » About Us */}
                    <nav aria-label="Breadcrumb" className="pt-2">
                        <ol className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300">
                            <li>
                                <Link href="/" className="hover:text-blue-600 dark:hover:text-sky-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li className="flex items-center text-blue-600 dark:text-sky-400">
                                <ChevronsRight className="w-4 h-4 stroke-[2.5]" />
                            </li>
                            <li className="text-blue-600 dark:text-sky-400 font-bold">
                                About Us
                            </li>
                        </ol>
                    </nav>

                </div>
            </Container>
        </section>
    );
}
