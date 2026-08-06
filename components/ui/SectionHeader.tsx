import React from "react";
import type {
  CornerFrameProps,
  StatusStyle,
  SectionHeaderProps,
} from "./types";

function CornerFrame({ children, extraClass = "" }: CornerFrameProps) {
  return (
    <div className={`relative ${extraClass}`}>
      <span className="pointer-events-none absolute top-0 start-0 h-6 w-6 border-t-2 border-s-2 border-violet-300/40 dark:border-violet-700/40" />
      <span className="pointer-events-none absolute bottom-0 end-0 h-6 w-6 border-b-2 border-e-2 border-cyan-300/40 dark:border-cyan-700/40" />
      {children}
    </div>
  );
}

const STATUS_STYLES: Record<string, StatusStyle> = {
  info: {
    dot: "bg-blue-500 shadow-[0_0_10px_#2563eb]",
    text: "text-blue-700 dark:text-sky-400",
    tagBorder: "border-blue-300/60 dark:border-blue-700/60",
    highlight:
      "text-blue-700 dark:text-sky-400 bg-blue-500/10 dark:bg-blue-400/15 shadow-[0_0_18px_-4px_rgba(37,99,235,0.5)]",
  },
  success: {
    dot: "bg-emerald-400 shadow-[0_0_10px_#34d399]",
    text: "text-emerald-700 dark:text-emerald-400",
    tagBorder: "border-emerald-300/60 dark:border-emerald-700/60",
    highlight:
      "text-emerald-700 dark:text-emerald-400 bg-emerald-400/10 dark:bg-emerald-400/15 shadow-[0_0_18px_-4px_rgba(52,211,153,0.5)]",
  },
  warning: {
    dot: "bg-amber-400 shadow-[0_0_10px_#f59e0b]",
    text: "text-amber-700 dark:text-amber-400",
    tagBorder: "border-amber-300/60 dark:border-amber-700/60",
    highlight:
      "text-amber-700 dark:text-amber-400 bg-amber-400/10 dark:bg-amber-400/15 shadow-[0_0_18px_-4px_rgba(245,158,11,0.5)]",
  },
  error: {
    dot: "bg-rose-400 shadow-[0_0_10px_#fb7185]",
    text: "text-rose-700 dark:text-rose-400",
    tagBorder: "border-rose-300/60 dark:border-rose-700/60",
    highlight:
      "text-rose-700 dark:text-rose-400 bg-rose-400/10 dark:bg-rose-400/15 shadow-[0_0_18px_-4px_rgba(251,113,133,0.5)]",
  },
};

STATUS_STYLES.blue = STATUS_STYLES.info;
STATUS_STYLES.cyan = STATUS_STYLES.info;
STATUS_STYLES.indigo = STATUS_STYLES.success;
STATUS_STYLES.amber = STATUS_STYLES.warning;

export default function SectionHeader({
  badge,
  badgeColor = "info",
  title,
  highlight,
  subtitle,
  align = "left",
  as: HeadingTag = "h2",
  size = "default",
  titleRef,
  rightElement,
  className = "",
  animClass = "",
}: SectionHeaderProps) {
  const s = STATUS_STYLES[badgeColor] || STATUS_STYLES.info;

  // Title rendering
  const renderTitle = () => {
    if (highlight && typeof title === "string") {
      return (
        <>
          {title}{" "}
          <span className={`relative font-semibold ${s.text}`}>
            {highlight}
          </span>
        </>
      );
    }
    return title;
  };

  // Code-tag badge — signature element
  const CodeTagBadge = badge ? (
    <div className={`mb-5 inline-flex items-center gap-3 ${animClass}`}>
      <span className="relative flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full ${s.dot} opacity-60`}
        />
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${s.dot}`}
        />
      </span>
      <span className={`text-[0.78rem] font-bold ${s.text}`}>{badge}</span>
    </div>
  ) : null;

  const titleSizeClasses =
    size === "hero"
      ? "text-[clamp(2.25rem,5.5vw,4.8rem)] max-w-[1100px] leading-[1.08]"
      : "text-[clamp(2.1rem,4.5vw,3.8rem)] leading-[1.6]!";

  if (align === "center") {
    return (
      <CornerFrame
        extraClass={`mb-6 md:mb-8 flex flex-col items-start px-8 py-6 text-start  ${className}`}
      >
        {CodeTagBadge}
        {title && (
          <HeadingTag
            ref={titleRef}
            className={`${titleSizeClasses} font-extrabold text-slate-900 dark:text-white ${animClass}`}
          >
            {renderTitle()}
          </HeadingTag>
        )}
        {subtitle && (
          <p
            className={`mt-4 max-w-[640px] text-base font-medium leading-[1.75] text-slate-600 dark:text-slate-300 ${animClass}`}
          >
            {subtitle}
          </p>
        )}
        {rightElement && <div className="mt-6">{rightElement}</div>}
      </CornerFrame>
    );
  }

  if (align === "between") {
    return (
      <CornerFrame
        extraClass={`mb-6 md:mb-8 flex items-end justify-between gap-8 px-8 py-6   max-[900px]:items-start ${className}`}
      >
        <div className="max-w-[720px]">
          {CodeTagBadge}
          {title && (
            <HeadingTag
              ref={titleRef}
              className={`${titleSizeClasses} font-extrabold text-slate-900 dark:text-white ${animClass}`}
            >
              {renderTitle()}
            </HeadingTag>
          )}
        </div>
        {(subtitle || rightElement) && (
          <div className={`flex gap-4   ${animClass}`}>
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
    <CornerFrame
      extraClass={`mb-6 md:mb-8 flex flex-col items-start px-8 py-6 ${className}`}
    >
      {CodeTagBadge}
      {title && (
        <HeadingTag
          ref={titleRef}
          className={`${titleSizeClasses} font-extrabold text-slate-900 dark:text-white ${animClass}`}
        >
          {renderTitle()}
        </HeadingTag>
      )}
      {subtitle && (
        <p
          className={`mt-4 max-w-[580px] text-base font-medium leading-[1.75] text-slate-600 dark:text-slate-300 ${animClass}`}
        >
          {subtitle}
        </p>
      )}
      {rightElement && <div className="mt-6">{rightElement}</div>}
    </CornerFrame>
  );
}
