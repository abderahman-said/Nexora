import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';

/**
 * 💡 Compound Component Pattern: Card
 * Allows composing complex cards flexibly with sub-components:
 * <Card>
 *   <Card.Image />
 *   <Card.Body>
 *     <Card.Title />
 *     <Card.Category />
 *     <Card.Divider />
 *     <Card.Tags />
 *     <Card.Action />
 *   </Card.Body>
 * </Card>
 */

export default function Card({ children, className = '', ...props }) {
  return (
    <article
      className={`group relative grid h-[310px] w-[540px] md:w-[580px] grid-cols-2 flex-shrink-0 cursor-pointer overflow-hidden rounded-[24px] border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-sm transition-[border-color,transform,box-shadow] duration-[400ms] hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md even:mt-8 max-lg:w-full max-lg:h-auto max-lg:grid-cols-[220px_1fr] max-lg:even:mt-0 max-sm:grid-cols-1 ${className}`}
      suppressHydrationWarning
      {...props}
    >
      {children}
    </article>
  );
}

// ── Compound Sub-Components ──────────────────────────────────────────────────

Card.Image = function CardImage({ src, alt, href, id, category, accent, className = '' }) {
  return (
    <Link
      href={href || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative h-full w-full overflow-hidden max-sm:h-[220px] ${className}`}
      aria-label={`View ${alt}`}
    >
      {id && (
        <span className="absolute left-[14px] top-[14px] z-[2] rounded-full bg-slate-900/80 px-2.5 py-[5px] text-[11px] font-bold tracking-[0.14em] text-white backdrop-blur-[10px]">
          {id}
        </span>
      )}
      {category && (
        <span className="absolute bottom-[14px] left-[14px] z-[2] inline-flex items-center gap-1.5 rounded-full bg-slate-950/90 px-3 py-[5px] text-[10px] font-bold uppercase tracking-[0.1em] text-white shadow-md border border-white/15 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: accent || '#3b82f6' }} />
          {category}
        </span>
      )}
      <OptimizedImage
        className="card-img absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.07]"
        src={src}
        alt={alt || ''}
        width={360}
        height={280}
        sizes="(max-width: 640px) 320px, (max-width: 1024px) 250px, 320px"
        quality={75}
      />
    </Link>
  );
};

Card.Body = function CardBody({ children, className = '' }) {
  return (
    <div
      className={`flex h-full flex-col justify-between gap-3 px-6 py-6 max-sm:h-auto max-sm:px-5 max-sm:py-5 ${className}`}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
};

Card.Title = function CardTitle({ children, className = '' }) {
  return (
    <h3
      className={`m-0 mb-2 text-[clamp(20px,1.8vw,26px)] font-black leading-[1.15] tracking-[-0.03em] text-slate-900 dark:text-white ${className}`}
      suppressHydrationWarning
    >
      {children}
    </h3>
  );
};

Card.Category = function CardCategory({ children, className = '' }) {
  return (
    <p
      className={`mb-3 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400 ${className}`}
      suppressHydrationWarning
    >
      {children}
    </p>
  );
};

Card.Divider = function CardDivider({ className = '' }) {
  return <div className={`mb-3 h-px w-full bg-slate-100 dark:bg-slate-800 ${className}`} />;
};

Card.Tags = function CardTags({ tags = [], className = '' }) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.06em] text-slate-600 dark:text-slate-300 transition-[color,border-color,background] duration-[250ms] group-hover:border-slate-300 dark:group-hover:border-slate-600 group-hover:bg-slate-100 dark:group-hover:bg-slate-800 group-hover:text-slate-900 dark:group-hover:text-white"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

Card.Action = function CardAction({ href, accent, name, className = '' }) {
  return (
    <div className={`mt-auto flex items-center justify-between pt-1 ${className}`}>
      <div
        className="h-0.5 w-8 rounded-[1px] transition-[width] duration-300 ease-in-out group-hover:w-12"
        style={{ background: accent || '#2563eb' }}
      />
      <Link
        href={href || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-[36px] w-[36px] flex-shrink-0 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-[15px] text-slate-500 dark:text-slate-400 no-underline transition-[background,color,transform,border-color] duration-300 group-hover:rotate-45 group-hover:border-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white shadow-sm"
        aria-label={`Open ${name || 'link'}`}
      >
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
      </Link>
    </div>
  );
};
