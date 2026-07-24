'use client';

import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import VimeoHero from '@/components/VimeoHero';
import { lazy, Suspense } from 'react';

const SmoothScroll      = lazy(() => import('@/components/SmoothScroll'));
const CursorBubble      = lazy(() => import('@/components/CursorBubble'));
const ScrollAnimations  = lazy(() => import('@/components/ScrollAnimations'));
const HorizontalWords   = lazy(() => import('@/components/HorizontalWords'));
const ServiceCards      = lazy(() => import('@/components/ServiceCards'));
const ProjectsSection   = lazy(() => import('@/components/ProjectsSection'));
const GSAPCardGrid      = lazy(() => import('@/components/GSAPCardGrid'));
const CrossedBanners    = lazy(() => import('@/components/CrossedBanners'));
const Footer            = lazy(() => import('@/components/Footer'));
const TransitionScribble= lazy(() => import('@/components/TransitionScribble'));

export default function Home() {
    return (
        <>
            <SvgSymbols />
            <Suspense fallback={null}><SmoothScroll /></Suspense>
            <Suspense fallback={null}><CursorBubble /></Suspense>
            <Suspense fallback={null}><ScrollAnimations /></Suspense>

            {/* ── Sticky Navbar ── */}
            <Navbar />

            <main>
                <section className="scroll-section" style={{ position: 'relative' }}>
                    <VimeoHero />
                </section>

                {/* ── About / Horizontal Words ── */}
                <section className="scroll-section" style={{ position: 'relative' }}>
                    <Suspense fallback={<div style={{ height: '100vh' }} />}>
                        <HorizontalWords />
                    </Suspense>
                </section>

                {/* ── Services Bento Grid ── */}
                <section className="scroll-section" style={{ position: 'relative' }}>
                    <Suspense fallback={<div style={{ height: '60vh' }} />}>
                        <ServiceCards />
                    </Suspense>
                </section>

                {/* ── Portfolio ── */}
                <section className="scroll-section" style={{ position: 'relative' }}>
                    <Suspense fallback={<div style={{ height: '100vh' }} />}>
                        <ProjectsSection />
                    </Suspense>
                </section>

                {/* ── Process ── */}
                <section className="scroll-section" style={{ position: 'relative' }}>
                    <Suspense fallback={<div style={{ height: '60vh' }} />}>
                        <GSAPCardGrid />
                    </Suspense>
                </section>

                {/* ── Tech Stack Marquee ── */}
                <section className="scroll-section" style={{ position: 'relative' }}>
                    <Suspense fallback={<div style={{ height: '30vh' }} />}>
                        <CrossedBanners />
                    </Suspense>
                </section>
            </main>

            {/* ── Footer / Contact CTA ── */}
            <Suspense fallback={<div style={{ height: '100vh' }} />}>
                <Footer />
            </Suspense>

            <Suspense fallback={null}><TransitionScribble /></Suspense>
        </>
    );
}
