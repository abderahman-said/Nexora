import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import SvgSymbols from '@/components/icons/SvgSymbols';
import Navbar from '@/components/layout/Navbar';
import VimeoHero from '@/components/pages/home/VimeoHero';
import HorizontalWords from '@/components/pages/home/HorizontalWords';
import ServiceCards from '@/components/pages/home/ServiceCards';
import Footer from '@/components/layout/Footer';
import ClientAnimations from '@/components/animations/ClientAnimations';

// ── Dynamic Imports (Lazy Loading for Heavy Below-The-Fold Sections) ──
const ProjectsSection = dynamic(() => import('@/components/pages/home/ProjectsSection'));
const GSAPCardGrid = dynamic(() => import('@/components/pages/home/GSAPCardGrid'));
const CrossedBanners = dynamic(() => import('@/components/pages/home/CrossedBanners'));
const ClientsSection = dynamic(() => import('@/components/pages/home/ClientsSection'));

export default function Home() {
    return (
        <>
            <SvgSymbols />
            <ClientAnimations />

            {/* ── Sticky Navbar ── */}
            <Navbar />

            <main>
                {/* ── Hero Section (No background grid) ── */}
                <section className="scroll-section relative">
                    <VimeoHero />
                </section>

                {/* ── About / Horizontal Words ── */}
                <section className="scroll-section relative ">
                    <HorizontalWords />
                </section>

                {/* ── Services Bento Grid ── */}
                <section className="scroll-section relative ">
                    <ServiceCards />
                </section>

                {/* ── Portfolio ── */}
                <section className="scroll-section relative ">
                    <Suspense fallback={<div className="min-h-[600px] flex items-center justify-center text-slate-400">Loading portfolio...</div>}>
                        <ProjectsSection />
                    </Suspense>
                </section>

                {/* ── Process ── */}
                <section className="scroll-section relative ">
                    <Suspense fallback={<div className="min-h-[500px] flex items-center justify-center text-slate-400">Loading workflow...</div>}>
                        <GSAPCardGrid />
                    </Suspense>
                </section>

                {/* ── Tech Stack Marquee ── */}
                <section className="scroll-section relative  bg-[#080d1a] dark:bg-[#040711]">
                    <Suspense fallback={<div className="min-h-[300px] flex items-center justify-center text-slate-400">Loading stack...</div>}>
                        <CrossedBanners />
                    </Suspense>
                </section>

                {/* ── Clients & Partnerships Section ── */}
                <section className="scroll-section relative  bg-transparent">
                    <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-slate-400">Loading clients...</div>}>
                        <ClientsSection />
                    </Suspense>
                </section>
            </main>

            {/* ── Footer / Contact CTA ── */}
            <Footer />
        </>
    );
}