import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import VimeoHero from '@/components/pages/home/VimeoHero';
import HorizontalWords from '@/components/pages/home/HorizontalWords';
import ServiceCards from '@/components/pages/home/ServiceCards';

// ── Dynamic Imports (Lazy Loading for Heavy Below-The-Fold Sections) ──
const ProjectsSection = dynamic(() => import('@/components/pages/home/ProjectsSection'));
const GSAPCardGrid = dynamic(() => import('@/components/pages/home/GSAPCardGrid'));
const TeamSection = dynamic(() => import('@/components/pages/home/TeamSection'));
const ConsultationSection = dynamic(() => import('@/components/pages/home/ConsultationSection'));
const ClientsSection = dynamic(() => import('@/components/pages/home/ClientsSection'));

export default function Home() {
    return (
        <main>
            <VimeoHero />
            <HorizontalWords />
            <ServiceCards />

            <Suspense fallback={<div className="min-h-[600px] flex items-center justify-center text-slate-400">Loading portfolio...</div>}>
                <ProjectsSection />
            </Suspense>

            <Suspense fallback={<div className="min-h-[500px] flex items-center justify-center text-slate-400">Loading workflow...</div>}>
                <GSAPCardGrid />
            </Suspense>

            <Suspense fallback={<div className="min-h-[500px] flex items-center justify-center text-slate-400">Loading team...</div>}>
                <TeamSection />
            </Suspense>

            <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-slate-400">Loading clients...</div>}>
                <ClientsSection />
            </Suspense>
            <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-slate-400">Loading consultation...</div>}>
                <ConsultationSection />
            </Suspense>
        </main>
    );
}
