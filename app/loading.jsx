import Skeleton from "@/components/ui/Skeleton";

/**
 * 💡 Next.js App Router Loading Boundary
 * Provides instant Skeleton loading UI while page components hydrate/load.
 */
export default function Loading() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#f8fafc] dark:bg-[#060913] px-6 py-20">
      <div className="flex flex-col items-center gap-6 text-center max-w-xl">
        {/* Pulsing Brand Badge */}
        <div className="h-12 w-12 rounded-2xl bg-blue-600/20 dark:bg-blue-500/20 border border-blue-500/30 flex items-center justify-center animate-pulse">
          <div className="h-5 w-5 rounded-full bg-blue-600 dark:bg-blue-400" />
        </div>
        <Skeleton className="h-10 w-64 rounded-xl" />
        <Skeleton className="h-5 w-80 rounded-lg" />
        
        <div className="mt-8 flex gap-6 overflow-hidden w-full justify-center">
          <Skeleton.Card />
        </div>
      </div>
    </div>
  );
}
