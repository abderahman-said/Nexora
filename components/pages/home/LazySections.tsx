'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ProjectsSection = dynamic(() => import('@/components/pages/home/ProjectsSection'), { ssr: false });
const GSAPCardGrid = dynamic(() => import('@/components/pages/home/GSAPCardGrid'), { ssr: false });
const TeamSection = dynamic(() => import('@/components/pages/home/TeamSection'), { ssr: false });
const ConsultationSection = dynamic(() => import('@/components/pages/home/ConsultationSection'), { ssr: false });
const ClientsSection = dynamic(() => import('@/components/pages/home/ClientsSection'), { ssr: false });

export default function LazySections() {
    return (
        <>
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
        </>
    );
}
