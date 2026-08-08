"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const ProjectsSection = dynamic(
  () => import("@/components/pages/home/ProjectsSection"),
);
const ProcessSection = dynamic(
  () => import("@/components/pages/home/ProcessSection"),
);
const TeamSection = dynamic(
  () => import("@/components/pages/home/TeamSection"),
);
const ConsultationSection = dynamic(
  () => import("@/components/pages/home/ConsultationSection"),
);
const ClientsSection = dynamic(
  () => import("@/components/pages/home/ClientsSection"),
);

function SectionSkeleton({ height = "min-h-[500px]" }: { height?: string }) {
  return (
    <div className={`w-full ${height} flex flex-col items-center justify-center p-8`}>
      <div className="w-full max-w-6xl space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800/60 rounded-full mx-auto" />
        <div className="h-4 w-96 bg-slate-200/70 dark:bg-slate-800/40 rounded-full mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="h-64 bg-slate-200/50 dark:bg-slate-900/60 rounded-3xl" />
          <div className="h-64 bg-slate-200/50 dark:bg-slate-900/60 rounded-3xl" />
          <div className="h-64 bg-slate-200/50 dark:bg-slate-900/60 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

export default function LazySections() {
  return (
    <>
      <Suspense fallback={<SectionSkeleton height="min-h-[600px]" />}>
        <ProjectsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="min-h-[500px]" />}>
        <ProcessSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="min-h-[500px]" />}>
        <TeamSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="min-h-[400px]" />}>
        <ClientsSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton height="min-h-[400px]" />}>
        <ConsultationSection />
      </Suspense>
    </>
  );
}
