import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';

export default function ProjectCard({ p }) {
  return (
    <article
      className="group relative grid w-[560px] md:w-[600px] grid-cols-2 flex-shrink-0 cursor-pointer overflow-hidden rounded-[24px] border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm transition-[border-color,transform,box-shadow] duration-[400ms] hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md even:mt-10 max-lg:w-full max-lg:grid-cols-[220px_1fr] max-lg:even:mt-0 max-sm:grid-cols-1"
      suppressHydrationWarning
    >
      {/* LEFT — Image */}
      <Link
        href={p.link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative min-h-[260px] overflow-hidden max-sm:min-h-[200px]"
        aria-label={`View ${p.name}`}
      >
        <span className="absolute left-[14px] top-[14px] z-[2] rounded-full bg-slate-900/80 px-2.5 py-[5px] text-[11px] font-bold tracking-[0.14em] text-white backdrop-blur-[10px]">
          {p.id}
        </span>
        <span
          className="absolute bottom-[14px] left-[14px] z-[2] rounded-full px-3 py-[5px] text-[10px] font-bold uppercase tracking-[0.1em] text-white shadow-sm"
          style={{ background: p.accent }}
        >
          {p.category}
        </span>
        <OptimizedImage
          className="card-img block h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.07]"
          src={p.image}
          alt={p.name}
          width={360}
          height={280}
          sizes="(max-width: 768px) 100vw, 35vw"
          quality={85}
        />
      </Link>

      {/* RIGHT — Body */}
      <div
        className="flex min-h-[260px] flex-col justify-between gap-4 px-7 py-8 max-sm:min-h-0 max-sm:px-5 max-sm:py-6"
        suppressHydrationWarning
      >
        <div suppressHydrationWarning>
          <h3 className="m-0 mb-2.5 text-[clamp(20px,2vw,28px)] font-black leading-[1.1] tracking-[-0.03em] text-slate-900 dark:text-white" suppressHydrationWarning>
            {p.name}
          </h3>
          <p className="mb-[18px] text-[0.75rem] font-bold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400" suppressHydrationWarning>
            {p.category}
          </p>
          <div className="mb-4 h-px w-full bg-slate-100 dark:bg-slate-800" />
          <div className="flex flex-wrap gap-1.5">
            {p.skills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3 py-1 text-[11px] font-semibold tracking-[0.06em] text-slate-600 dark:text-slate-300 transition-[color,border-color,background] duration-[250ms] group-hover:border-slate-300 dark:group-hover:border-slate-600 group-hover:bg-slate-100 dark:group-hover:bg-slate-800 group-hover:text-slate-900 dark:group-hover:text-white"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div
            className="h-0.5 w-8 rounded-[1px] transition-[width] duration-300 ease-in-out group-hover:w-12"
            style={{ background: p.accent }}
          />
          <Link
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-[15px] text-slate-500 dark:text-slate-400 no-underline transition-[background,color,transform,border-color] duration-300 group-hover:rotate-45 group-hover:border-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white shadow-sm"
            aria-label={`Open ${p.name}`}
          >
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </div>
      </div>
    </article>
  );
}
