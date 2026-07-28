"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  ElementType,
  ReactNode,
} from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

const DRAG_THRESHOLD = 40;
const SNAP_DURATION = 0.9;

export interface GSAPSliderProps<T = any> {
  items?: T[];
  renderItem?: (item: T, index: number) => ReactNode;
  ItemComponent?: ElementType;
  autoplay?: boolean;
  autoplayInterval?: number;
  defaultVisibleCount?: number;
  showControls?: boolean;
  controlsPosition?: "center" | "sides";
  showDots?: boolean;
  pauseOnHover?: boolean;
  enableDrag?: boolean; // ✅ جديد
  className?: string;
}

export default function GSAPSlider<T extends { id?: string | number }>({
  items = [],
  renderItem,
  ItemComponent,
  autoplay = false,
  autoplayInterval = 4500,
  defaultVisibleCount = 3,
  showControls = true,
  controlsPosition = "center",
  showDots = true,
  pauseOnHover = true,
  enableDrag = true, // ✅ جديد
  className = "",
}: GSAPSliderProps<T>) {
  const totalItems = items.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [visibleCards, setVisibleCards] = useState(defaultVisibleCount);

  const trackRef = useRef<HTMLDivElement>(null);
  const xPercentSetterRef = useRef<Function | null>(null);
  const currentIndexRef = useRef(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragCurrentXRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Responsive visible-card count
  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      let count = defaultVisibleCount;
      if (width < 640) count = 1;
      else if (width < 1024) count = 2;

      setVisibleCards(count);
      setCurrentIndex((prev) => {
        const max = Math.max(0, totalItems - count);
        if (prev > max) {
          if (trackRef.current && totalItems > 0) {
            gsap.to(trackRef.current, {
              xPercent: -(max * (100 / totalItems)),
              duration: SNAP_DURATION,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
          return max;
        }
        return prev;
      });
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, [defaultVisibleCount, totalItems]);

  useEffect(() => {
    if (trackRef.current) {
      xPercentSetterRef.current = gsap.quickSetter(
        trackRef.current,
        "xPercent",
      );
    }
  }, []);

  const maxIndex = Math.max(0, totalItems - visibleCards);
  const trackWidthPercent = (totalItems / visibleCards) * 100;

  const indexToXPercent = useCallback(
    (index: number) => -(index * (100 / totalItems)),
    [totalItems],
  );
  const animateToSlide = useCallback(
    (targetIndex: number) => {
      if (!trackRef.current || totalItems === 0) return;
      gsap.to(trackRef.current, {
        xPercent: indexToXPercent(targetIndex),
        duration: SNAP_DURATION,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    },
    [totalItems, indexToXPercent],
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev >= maxIndex ? 0 : prev + 1;
      animateToSlide(next);
      return next;
    });
  }, [maxIndex, animateToSlide]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev <= 0 ? maxIndex : prev - 1;
      animateToSlide(next);
      return next;
    });
  }, [maxIndex, animateToSlide]);

  // Clean up GSAP tweens and RAF on unmount
  useEffect(() => {
    const trackEl = trackRef.current;
    return () => {
      if (trackEl) gsap.killTweensOf(trackEl);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Drag handling (mouse + touch)
  const handleDragStart = (clientX: number) => {
    if (trackRef.current) gsap.killTweensOf(trackRef.current);
    isDraggingRef.current = true;
    dragStartXRef.current = clientX;
    dragCurrentXRef.current = clientX;
    setIsDragging(true);
  };

  const applyDragPosition = useCallback(() => {
    rafIdRef.current = null;
    if (
      !isDraggingRef.current ||
      !trackRef.current ||
      !xPercentSetterRef.current
    )
      return;

    const containerWidth = trackRef.current.parentElement?.offsetWidth || 1;
    const trackOwnWidth = containerWidth * (totalItems / visibleCards);
    const diffPercent =
      ((dragCurrentXRef.current - dragStartXRef.current) / trackOwnWidth) * 100;
    const basePercent = indexToXPercent(currentIndexRef.current);

    xPercentSetterRef.current(basePercent + diffPercent);
  }, [totalItems, visibleCards, indexToXPercent]);

  const handleDragMove = useCallback(
    (clientX: number) => {
      if (!isDraggingRef.current) return;
      dragCurrentXRef.current = clientX;
      if (rafIdRef.current == null) {
        rafIdRef.current = requestAnimationFrame(applyDragPosition);
      }
    },
    [applyDragPosition],
  );

  const handleDragEnd = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    if (rafIdRef.current != null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    const diff = dragStartXRef.current - dragCurrentXRef.current;
    if (diff > DRAG_THRESHOLD && currentIndexRef.current < maxIndex) {
      nextSlide();
    } else if (diff < -DRAG_THRESHOLD && currentIndexRef.current > 0) {
      prevSlide();
    } else {
      animateToSlide(currentIndexRef.current);
    }
  }, [maxIndex, nextSlide, prevSlide, animateToSlide]);

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => handleDragMove(e.clientX);
    const onMouseUp = () => handleDragEnd();
    const onTouchMove = (e: TouchEvent) => handleDragMove(e.touches[0].clientX);
    const onTouchEnd = () => handleDragEnd();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  const handleClickCapture = (e: React.MouseEvent) => {
    const dragDistance = Math.abs(
      dragStartXRef.current - dragCurrentXRef.current,
    );
    if (dragDistance > 10) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    if (!autoplay || isPaused || totalItems <= visibleCards) return;

    const timer = setInterval(nextSlide, autoplayInterval);
    autoplayTimerRef.current = timer;
    return () => {
      clearInterval(timer);
    };
  }, [
    autoplay,
    isPaused,
    totalItems,
    visibleCards,
    autoplayInterval,
    nextSlide,
    currentIndex,
  ]);
  // Reset autoplay timer on manual navigation so progress bar syncs
  const goToSlideWithReset = useCallback(
    (index: number) => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
      const target = Math.min(index, maxIndex);
      setCurrentIndex(target);
      animateToSlide(target);
    },
    [maxIndex, animateToSlide],
  );

  if (totalItems === 0) return null;

  const showSideControls = showControls && controlsPosition === "sides";
  const showCenterControls = showControls && controlsPosition === "center";

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {showSideControls && (
        <>
          <NavButton direction="prev" onClick={prevSlide} position="side" />
          <NavButton direction="next" onClick={nextSlide} position="side" />
        </>
      )}

      <div
        className={`w-full overflow-hidden pt-8 pb-12 px-2 sm:px-3 touch-pan-y select-none ${
          enableDrag ? (isDragging ? "cursor-grabbing" : "cursor-grab") : ""
        }`}
        onMouseDown={(e) =>
          enableDrag && e.button === 0 && handleDragStart(e.clientX)
        }
        onTouchStart={(e) =>
          enableDrag && handleDragStart(e.touches[0].clientX)
        }
        onClickCapture={handleClickCapture}
      >
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ width: `${trackWidthPercent}%` }}
        >
          {items.map((item, index) => (
            <div
              key={item.id ?? index}
              className="px-2 sm:px-3.5 shrink-0 flex flex-col"
              style={{ width: `${100 / totalItems}%` }}
            >
              {ItemComponent ? (
                <ItemComponent
                  service={item}
                  member={item}
                  client={item}
                  item={item}
                  index={index}
                />
              ) : (
                (renderItem?.(item, index) ?? null)
              )}
            </div>
          ))}
        </div>
      </div>

      {(showCenterControls || showDots) && (
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4">
          {showCenterControls && (
            <NavButton direction="prev" onClick={prevSlide} position="center" />
          )}

          {showDots && (
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
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      currentIndex === dotIdx
                        ? "w-7 bg-sky-500 dark:bg-sky-400 shadow-sm shadow-sky-400/50"
                        : "w-2.5 bg-slate-300 dark:bg-slate-700 group-hover:bg-slate-400"
                    }`}
                  />
                </button>
              ))}
            </div>
          )}

          {showCenterControls && (
            <NavButton direction="next" onClick={nextSlide} position="center" />
          )}
        </div>
      )}
    </div>
  );
}

interface NavButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  position: "side" | "center";
}

function NavButton({ direction, onClick, position }: NavButtonProps) {
  const isPrev = direction === "prev";
  const Icon = isPrev ? ChevronLeft : ChevronRight;
  const label = isPrev ? "Previous Slide" : "Next Slide";

  const sideClasses = isPrev ? "left-0 sm:-left-6" : "right-0 sm:-right-6";

  const className =
    position === "side"
      ? `absolute ${sideClasses} top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 !p-0 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-110 active:scale-95 transition-all duration-300 max-sm:hidden`
      : `w-10 h-10 sm:w-11 sm:h-11 !p-0 rounded-full flex items-center justify-center bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-lg hover:border-sky-500 dark:hover:border-sky-400 hover:text-sky-500 dark:hover:text-sky-400 hover:scale-105 active:scale-95 transition-all duration-300`;

  return (
    <Button
      type="button"
      onClick={onClick}
      aria-label={label}
      variant={position === "side" ? "primary" : "outline"}
      className={className}
    >
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
    </Button>
  );
}
