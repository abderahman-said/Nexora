import React from 'react';

/**
 * SectionHeader — "Code Block" identity
 *
 * Design concept: this is a software company, so the section header borrows
 * its visual language from the product itself — source code. The badge reads
 * like a JSX opening tag (`<Feature>`), framed by a thin IDE-style corner
 * bracket, with a pulsing status dot standing in for "process: running".
 * The highlighted word in the title now reads like a live autocomplete
 * suggestion inside a code editor: a soft tinted chip in the same status
 * color as the badge/dot, topped with a blinking text cursor — so badge,
 * dot, and highlight all share one coherent "log level" color per section
 * instead of a fixed, disconnected brand gradient.
 *
 * RTL-safe by construction: uses logical CSS properties (start/end,
 * border-s/border-e) so the layout mirrors correctly for Arabic without any
 * manual flipping.
 *
 * @param {Object} props
 * @param {string} [props.badge] - Arabic badge label (e.g. "ما نقدمه")
 * @param {string} [props.tag] - Latin code-tag word shown inside <> (e.g. "Features"). Defaults to "Section".
 * @param {string} [props.badgeColor] - Status theme: 'info' | 'success' | 'warning' | 'error'
 * @param {React.ReactNode} [props.title] - Main title string or JSX
 * @param {string} [props.highlight] - Highlighted word/phrase
 * @param {string} [props.subtitle] - Paragraph description text below header
 * @param {'left' | 'center' | 'between'} [props.align='left'] - Layout arrangement
 * @param {'h1' | 'h2'} [props.as='h2'] - Heading element tag
 * @param {'hero' | 'default'} [props.size='default'] - Size variant for main hero vs section header
 * @param {React.Ref} [props.titleRef] - Ref passed to heading element for GSAP targeting
 * @param {React.ReactNode} [props.rightElement] - Optional right-side component
 * @param {string} [props.className] - Additional container wrapper classes
 * @param {string} [props.animClass] - Class name for GSAP animation selectors
 */
// IDE-style corner bracket frame
function CornerFrame({ children, extraClass = '' }) {
    return (
        <div className={`relative ${extraClass}`}>
            <span className="pointer-events-none absolute top-0 start-0 h-6 w-6 border-t-2 border-s-2 border-violet-300/40 dark:border-violet-700/40" />
            <span className="pointer-events-none absolute bottom-0 end-0 h-6 w-6 border-b-2 border-e-2 border-cyan-300/40 dark:border-cyan-700/40" />
            {children}
        </div>
    );
}

// Semantic "log level" palette — reads like terminal/build-log status colors.
const STATUS_STYLES = {
    info: {
        dot: 'bg-blue-500 shadow-[0_0_10px_#2563eb]',
        text: 'text-blue-700 dark:text-sky-400',
        tagBorder: 'border-blue-300/60 dark:border-blue-700/60',
        highlight: 'text-blue-700 dark:text-sky-400 bg-blue-500/10 dark:bg-blue-400/15 shadow-[0_0_18px_-4px_rgba(37,99,235,0.5)]',
    },
    success: {
        dot: 'bg-emerald-400 shadow-[0_0_10px_#34d399]',
        text: 'text-emerald-700 dark:text-emerald-400',
        tagBorder: 'border-emerald-300/60 dark:border-emerald-700/60',
        highlight: 'text-emerald-700 dark:text-emerald-400 bg-emerald-400/10 dark:bg-emerald-400/15 shadow-[0_0_18px_-4px_rgba(52,211,153,0.5)]',
    },
    warning: {
        dot: 'bg-amber-400 shadow-[0_0_10px_#f59e0b]',
        text: 'text-amber-700 dark:text-amber-400',
        tagBorder: 'border-amber-300/60 dark:border-amber-700/60',
        highlight: 'text-amber-700 dark:text-amber-400 bg-amber-400/10 dark:bg-amber-400/15 shadow-[0_0_18px_-4px_rgba(245,158,11,0.5)]',
    },
    error: {
        dot: 'bg-rose-400 shadow-[0_0_10px_#fb7185]',
        text: 'text-rose-700 dark:text-rose-400',
        tagBorder: 'border-rose-300/60 dark:border-rose-700/60',
        highlight: 'text-rose-700 dark:text-rose-400 bg-rose-400/10 dark:bg-rose-400/15 shadow-[0_0_18px_-4px_rgba(251,113,133,0.5)]',
    },
};

STATUS_STYLES.blue = STATUS_STYLES.info;
STATUS_STYLES.cyan = STATUS_STYLES.info;
STATUS_STYLES.indigo = STATUS_STYLES.success;
STATUS_STYLES.amber = STATUS_STYLES.warning;

export default function SectionHeader({
    badge,
    tag = 'Section',
    badgeColor = 'info',
    title,
    highlight,
    subtitle,
    align = 'left',
    as: HeadingTag = 'h2',
    size = 'default',
    titleRef,
    rightElement,
    className = '',
    animClass = '',
}) {
    const s = STATUS_STYLES[badgeColor] || STATUS_STYLES.info;


    // Title rendering
    const renderTitle = () => {
        if (highlight && typeof title === 'string') {
            return (
                <>
                    {title}{' '}
                    <span className={`relative font-mono font-semibold ${s.text}`}>
                        {highlight}
                        <svg
                            className="absolute -bottom-3 left-[50%] transform translate-x-[-50%] w-[90%] h-4"
                            viewBox="0 0 120 6"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M0,3 Q2,0.5 4,3 T8,3 T12,3 T16,3 T20,3 T24,3 T28,3 T32,3 T36,3 T40,3 T44,3 T48,3 T52,3 T56,3 T60,3 T64,3 T68,3 T72,3 T76,3 T80,3 T84,3 T88,3 T92,3 T96,3 T100,3 T104,3 T108,3 T112,3 T116,3 T120,3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>
                </>
            );
        }
        return title;
    };

    // Code-tag badge — signature element
    const CodeTagBadge = badge ? (
        <div className={`mb-5 inline-flex items-center gap-3 ${animClass}`}>
            <span className={`inline-flex items-center gap-1.5 rounded-md border ${s.tagBorder} bg-slate-50/80 dark:bg-slate-900/60 px-2.5 py-1 font-mono text-[0.72rem] tracking-tight text-slate-700 dark:text-slate-200`}>
                <span className="text-slate-400 dark:text-slate-600">&lt;</span>
                {tag}
                <span className="text-slate-400 dark:text-slate-600">/&gt;</span>
            </span>
            <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${s.dot} opacity-60`} />
                <span className={`relative inline-flex h-2 w-2 rounded-full ${s.dot}`} />
            </span>
            <span className={`text-[0.78rem] font-bold ${s.text}`}>{badge}</span>
        </div>
    ) : null;


    const titleSizeClasses = size === 'hero'
        ? 'text-[clamp(2.25rem,5.5vw,4.8rem)] max-w-[1100px] leading-[1.08]'
        : 'text-[clamp(2.1rem,4.5vw,3.8rem)] leading-[1.15]';

    if (align === 'center') {
        return (
            <CornerFrame extraClass={`mb-14 flex flex-col items-center px-8 py-6 text-center ${className}`}>
                {CodeTagBadge}
                {title && (
                    <HeadingTag ref={titleRef} className={`${titleSizeClasses} font-extrabold text-slate-900 dark:text-white ${animClass}`}>
                        {renderTitle()}
                    </HeadingTag>
                )}
                {subtitle && (
                    <p className={`mt-4 max-w-[640px] text-base font-medium leading-[1.75] text-slate-600 dark:text-slate-300 ${animClass}`}>
                        {subtitle}
                    </p>
                )}
                {rightElement && <div className="mt-6">{rightElement}</div>}
            </CornerFrame>
        );
    }

    if (align === 'between') {
        return (
            <CornerFrame extraClass={`mb-14 flex flex-wrap items-end justify-between gap-8 px-8 py-6 max-[900px]:flex-col max-[900px]:items-start ${className}`}>
                <div className="max-w-[720px]">
                    {CodeTagBadge}
                    {title && (
                        <HeadingTag ref={titleRef} className={`${titleSizeClasses} font-extrabold text-slate-900 dark:text-white ${animClass}`}>
                            {renderTitle()}
                        </HeadingTag>
                    )}
                </div>
                {(subtitle || rightElement) && (
                    <div className={`flex max-w-[420px] flex-col gap-4 max-[900px]:w-full ${animClass}`}>
                        {subtitle && (
                            <p className="text-base font-medium leading-[1.75] text-slate-600 dark:text-slate-300">
                                {subtitle}
                            </p>
                        )}
                        {rightElement}
                    </div>
                )}
            </CornerFrame>
        );
    }

    // Default: 'left'
    return (
        <CornerFrame extraClass={`mb-14 flex flex-col items-start px-8 py-6 ${className}`}>
            {CodeTagBadge}
            {title && (
                <HeadingTag ref={titleRef} className={`${titleSizeClasses} font-extrabold text-slate-900 dark:text-white ${animClass}`}>
                    {renderTitle()}
                </HeadingTag>
            )}
            {subtitle && (
                <p className={`mt-4 max-w-[580px] text-base font-medium leading-[1.75] text-slate-600 dark:text-slate-300 ${animClass}`}>
                    {subtitle}
                </p>
            )}
            {rightElement && <div className="mt-6">{rightElement}</div>}
        </CornerFrame>
    );
}