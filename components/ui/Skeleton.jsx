/**
 * 💡 Skeleton Fallback Pattern
 * Provides animated placeholder shapes during data loading / hydration.
 * Usage:
 * <Skeleton className="h-6 w-32 rounded-md" />
 * <Skeleton.Card />
 * <Skeleton.Text lines={3} />
 */

export default function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800 ${className}`}
      {...props}
    />
  );
}

Skeleton.Card = function SkeletonCard({ className = '' }) {
  return (
    <div className={`grid h-[310px] w-[540px] md:w-[580px] grid-cols-2 rounded-[24px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 ${className}`}>
      <Skeleton className="h-full w-full rounded-2xl" />
      <div className="flex flex-col justify-between pl-6 py-2">
        <div>
          <Skeleton className="h-8 w-3/4 mb-3" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-px w-full mb-4" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-1 w-10" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </div>
    </div>
  );
};

Skeleton.Text = function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`}
        />
      ))}
    </div>
  );
};
