'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronsRight, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';

export default function ContactHero() {
    return (
        <section
            id="contact-hero"
            className="scroll-section relative w-full pt-36 pb-20 sm:pt-44 sm:pb-28 lg:pt-48 lg:pb-32 bg-[#060913] text-white overflow-hidden transition-colors duration-300 border-b border-slate-800/80"
        >
            {/* Background Banner Image & Dark Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <Image
                    src="/assets/about_banner.png"
                    alt="Contact Us Banner Background"
                    fill
                    priority
                    className="object-cover opacity-30 dark:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#060913]/90 via-[#060913]/70 to-[#060913]/90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-[#060913]/80" />
                
                {/* Ambient Radial Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full" />
            </div>

            {/* Decorative Angled Bottom Clip Accent */}
            <div
                aria-hidden="true"
                className="absolute -bottom-1 left-0 w-48 sm:w-80 h-16 sm:h-24 bg-white dark:bg-[#060913] [clip-path:polygon(0_100%,100%_100%,0_0)] pointer-events-none z-10 opacity-10 dark:opacity-20"
            />

            <Container className="relative z-10">
                <div className="flex flex-col items-center justify-center text-center space-y-4 sm:space-y-6">
                    
                    {/* Tag Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-sky-400 font-extrabold text-xs tracking-widest uppercase shadow-lg backdrop-blur-md">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>LET&apos;S CONNECT</span>
                    </div>

                    {/* Main Title: Contact Us */}
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
                        Contact <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Us</span>
                    </h1>

                    {/* Breadcrumbs: Home » Contact Us */}
                    <nav aria-label="Breadcrumb" className="pt-2">
                        <ol className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-300">
                            <li>
                                <Link href="/" className="hover:text-sky-400 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li className="flex items-center text-sky-400">
                                <ChevronsRight className="w-4 h-4 stroke-[2.5]" />
                            </li>
                            <li className="text-sky-400 font-bold">
                                Contact Us
                            </li>
                        </ol>
                    </nav>

                </div>
            </Container>
        </section>
    );
}
