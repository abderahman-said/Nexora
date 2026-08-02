"use client";

import React from "react";

interface GSAPSliderControlsProps {
  showDots: boolean;
  maxIndex: number;
  activeIndex: number;
  goToSlideWithReset: (index: number) => void;
}

export function GSAPSliderControls({
  showDots,
  maxIndex,
  activeIndex,
  goToSlideWithReset,
}: GSAPSliderControlsProps) {
  const showPaginationDots = showDots && maxIndex > 0;

  if (!showPaginationDots) return null;

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4">
      {showPaginationDots && (
        <div className="flex items-center gap-1 px-1">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => goToSlideWithReset(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className="group relative p-1 flex items-center justify-center cursor-pointer"
            >
              <span
                className={`h-2.5 rounded-full transition-all duration-500 ${activeIndex === dotIdx
                    ? "w-7 bg-sky-500 dark:bg-sky-400 shadow-sm shadow-sky-400/50"
                    : "w-2.5 bg-slate-300 dark:bg-slate-700 group-hover:bg-slate-400"
                  }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
