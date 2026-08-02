"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { gsap } from "gsap";

export const SNAP_DURATION = 0.6;
export const SNAP_EASE = "sine.inOut";
export const RELEASE_EASE = "power1.out";
export const DRAG_THRESHOLD = 40;

const isRTL = () => typeof document !== "undefined" && document.documentElement.dir === "rtl";

export function computeXPercent(
  index: number,
  totalItems: number,
  centerActive: boolean,
  centerCardWidthPercent: number,
): number {
  if (totalItems === 0) return 0;
  const perItem = 100 / totalItems;

  if (!centerActive) {
    const rtlMultiplier = isRTL() ? 1 : -1;
    return rtlMultiplier * (index * perItem);
  }

  const C = centerCardWidthPercent;
  if (isRTL()) {
    return perItem * (index + 0.5 + 50 / C) - 100;
  }
  return perItem * (50 / C - 0.5 - index);
}

interface UseGSAPSliderProps<T> {
  items: T[];
  autoplay?: boolean;
  autoplayInterval?: number;
  defaultVisibleCount?: number;
  mobileVisibleCount?: number;
  tabletVisibleCount?: number;
  centerModeMobile?: boolean;
  centerCardWidthPercent?: number;
  infinite?: boolean;
  enableDrag?: boolean;
  activeScale?: number;
  inactiveScale?: number;
}

export function useGSAPSlider<T>({
  items,
  autoplay = false,
  autoplayInterval = 4500,
  defaultVisibleCount = 3,
  mobileVisibleCount = 1,
  tabletVisibleCount = 2,
  centerModeMobile = false,
  centerCardWidthPercent = 76,
  infinite = false,
  enableDrag = true,
  activeScale = 1,
  inactiveScale = 1,
}: UseGSAPSliderProps<T>) {
  const totalItems = items.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [isOffscreen, setIsOffscreen] = useState(false);
  const isPaused = isHoverPaused || isTabHidden || isOffscreen;
  const [isDragging, setIsDragging] = useState(false);

  const [visibleCards, setVisibleCards] = useState<number>(defaultVisibleCount);
  const [isCenterActive, setIsCenterActive] = useState<boolean>(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const xPercentSetterRef = useRef<Function | null>(null);
  const currentIndexRef = useRef(0);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isCenterActiveRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragCurrentXRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const isRTLRef = useRef(false);
  const containerWidthRef = useRef(1);
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const hasMountedScaleRef = useRef(false);

  useEffect(() => {
    isCenterActiveRef.current = isCenterActive;
  }, [isCenterActive]);

  useEffect(() => {
    isRTLRef.current = isRTL();
  }, []);

  useEffect(() => {
    let raf: number;
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      let count = defaultVisibleCount;
      const isMobile = width < 640;

      if (isMobile) count = mobileVisibleCount;
      else if (width < 1024) count = tabletVisibleCount;

      const centerActive = centerModeMobile && isMobile;

      setVisibleCards(count);
      setIsCenterActive(centerActive);
    };

    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateVisibleCards);
    };

    updateVisibleCards();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [defaultVisibleCount, mobileVisibleCount, tabletVisibleCount, centerModeMobile]);

  useEffect(() => {
    if (trackRef.current) {
      xPercentSetterRef.current = gsap.quickSetter(trackRef.current, "xPercent");
    }
  }, []);

  const effectiveVisibleCards = isCenterActive ? 1 : visibleCards;
  const cloneCount = infinite && totalItems > effectiveVisibleCards
    ? Math.min(Math.ceil(effectiveVisibleCards), totalItems)
    : 0;
  const infiniteEnabled = cloneCount > 0;

  const renderItems = useMemo(() => {
    if (!infiniteEnabled) return items;
    const head = items.slice(totalItems - cloneCount);
    const tail = items.slice(0, cloneCount);
    return isRTL()
      ? [...tail, ...items, ...head]
      : [...head, ...items, ...tail];
  }, [items, cloneCount, infiniteEnabled, totalItems]);

  const trackItemsCount = renderItems.length;
  const maxIndex = infiniteEnabled
    ? Math.max(0, totalItems - 1)
    : Math.max(0, Math.floor(totalItems - effectiveVisibleCards));

  const activeIndex = Math.min(currentIndex, maxIndex);

  useEffect(() => {
    currentIndexRef.current = activeIndex;
  }, [activeIndex]);

  const trackWidthPercent = isCenterActive
    ? trackItemsCount * centerCardWidthPercent
    : (trackItemsCount / visibleCards) * 100;

  const highlightMiddleOffset = isCenterActive
    ? 0
    : Math.floor((effectiveVisibleCards - 1) / 2);
  const highlightIndex = activeIndex + highlightMiddleOffset;

  const indexToXPercent = useCallback(
    (index: number) => computeXPercent(index + cloneCount, trackItemsCount, isCenterActiveRef.current, centerCardWidthPercent),
    [trackItemsCount, cloneCount, centerCardWidthPercent]
  );

  const positionToXPercent = useCallback(
    (position: number) => computeXPercent(position, trackItemsCount, isCenterActiveRef.current, centerCardWidthPercent),
    [trackItemsCount, centerCardWidthPercent]
  );

  const animateToSlide = useCallback(
    (targetIndex: number, ease: string = SNAP_EASE) => {
      if (!trackRef.current || totalItems === 0) return;
      gsap.to(trackRef.current, {
        xPercent: indexToXPercent(targetIndex),
        duration: SNAP_DURATION,
        ease,
        overwrite: "auto",
      });
    },
    [totalItems, indexToXPercent]
  );

  const animateToPosition = useCallback(
    (position: number, onComplete?: () => void, ease: string = SNAP_EASE) => {
      if (!trackRef.current) return;
      gsap.to(trackRef.current, {
        xPercent: positionToXPercent(position),
        duration: SNAP_DURATION,
        ease,
        overwrite: "auto",
        onComplete,
      });
    },
    [positionToXPercent]
  );

  const jumpToPosition = useCallback(
    (position: number) => {
      if (!trackRef.current) return;
      gsap.set(trackRef.current, { xPercent: positionToXPercent(position) });
    },
    [positionToXPercent]
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const atEnd = prev >= maxIndex;
      const next = atEnd ? 0 : prev + 1;

      if (infiniteEnabled && atEnd) {
        animateToPosition(cloneCount + totalItems, () => {
          jumpToPosition(cloneCount);
        });
      } else {
        animateToSlide(next);
      }
      return next;
    });
  }, [maxIndex, infiniteEnabled, cloneCount, totalItems, animateToPosition, jumpToPosition, animateToSlide]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const atStart = prev <= 0;
      const next = atStart ? maxIndex : prev - 1;

      if (infiniteEnabled && atStart) {
        animateToPosition(cloneCount - 1, () => {
          jumpToPosition(cloneCount + maxIndex);
        });
      } else {
        animateToSlide(next);
      }
      return next;
    });
  }, [maxIndex, infiniteEnabled, cloneCount, animateToPosition, jumpToPosition, animateToSlide]);

  useEffect(() => {
    if (isDraggingRef.current || totalItems === 0) return;
    jumpToPosition(cloneCount + currentIndexRef.current);
  }, [cloneCount, isCenterActive, trackItemsCount, jumpToPosition, totalItems]);

  useEffect(() => {
    const isFirstRun = !hasMountedScaleRef.current;
    hasMountedScaleRef.current = true;

    cardRefs.current.forEach((el, index) => {
      if (!el) return;
      const realIndex = index - cloneCount;
      const isActive = realIndex === highlightIndex;
      const targetScale = isActive ? activeScale : inactiveScale;
      const targetOpacity = 1;

      if (isFirstRun) {
        gsap.set(el, { scale: targetScale, opacity: targetOpacity, zIndex: isActive ? 10 : 1 });
      } else {
        gsap.to(el, {
          scale: targetScale,
          opacity: targetOpacity,
          zIndex: isActive ? 10 : 1,
          duration: SNAP_DURATION,
          ease: SNAP_EASE,
          overwrite: "auto",
        });
      }
    });
  }, [highlightIndex, cloneCount, trackItemsCount, activeScale, inactiveScale]);

  useEffect(() => {
    const trackEl = trackRef.current;
    return () => {
      if (trackEl) gsap.killTweensOf(trackEl);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!enableDrag || (e.pointerType === "mouse" && e.button !== 0)) return;
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    if (trackRef.current) gsap.killTweensOf(trackRef.current);
    containerWidthRef.current = trackRef.current?.parentElement?.offsetWidth || 1;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragCurrentXRef.current = e.clientX;
    setIsDragging(true);
  };

  const applyDragPosition = useCallback(() => {
    rafIdRef.current = null;
    if (!isDraggingRef.current || !trackRef.current || !xPercentSetterRef.current) return;

    const containerWidth = containerWidthRef.current;
    const currentTrackWidthPercent = isCenterActiveRef.current
      ? trackItemsCount * centerCardWidthPercent
      : (trackItemsCount / visibleCards) * 100;
    const trackOwnWidth = containerWidth * (currentTrackWidthPercent / 100);
    const rtlMultiplier = isRTLRef.current ? -1 : 1;
    const diffPercent = rtlMultiplier * ((dragCurrentXRef.current - dragStartXRef.current) / trackOwnWidth) * 100;
    const basePercent = indexToXPercent(currentIndexRef.current);

    xPercentSetterRef.current(basePercent + diffPercent);
  }, [trackItemsCount, visibleCards, centerCardWidthPercent, indexToXPercent]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    dragCurrentXRef.current = e.clientX;
    if (rafIdRef.current == null) {
      rafIdRef.current = requestAnimationFrame(applyDragPosition);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    if (rafIdRef.current != null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    const diff = dragStartXRef.current - dragCurrentXRef.current;
    const rtlMultiplier = isRTLRef.current ? -1 : 1;
    const adjustedDiff = rtlMultiplier * diff;

    if (adjustedDiff > DRAG_THRESHOLD && (infiniteEnabled || currentIndexRef.current < maxIndex)) {
      setCurrentIndex((prev) => {
        const atEnd = prev >= maxIndex;
        const next = atEnd ? 0 : prev + 1;
        if (infiniteEnabled && atEnd) {
          animateToPosition(cloneCount + totalItems, () => jumpToPosition(cloneCount), RELEASE_EASE);
        } else {
          animateToSlide(next, RELEASE_EASE);
        }
        return next;
      });
    } else if (adjustedDiff < -DRAG_THRESHOLD && (infiniteEnabled || currentIndexRef.current > 0)) {
      setCurrentIndex((prev) => {
        const atStart = prev <= 0;
        const next = atStart ? maxIndex : prev - 1;
        if (infiniteEnabled && atStart) {
          animateToPosition(cloneCount - 1, () => jumpToPosition(cloneCount + maxIndex), RELEASE_EASE);
        } else {
          animateToSlide(next, RELEASE_EASE);
        }
        return next;
      });
    } else {
      animateToSlide(currentIndexRef.current, RELEASE_EASE);
    }
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    const dragDistance = Math.abs(dragStartXRef.current - dragCurrentXRef.current);
    if (dragDistance > 10) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    const onVisibility = () => setIsTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsOffscreen(!entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [autoplay]);

  useEffect(() => {
    if (!autoplay || isPaused || totalItems <= effectiveVisibleCards) return;

    const timer = setInterval(nextSlide, autoplayInterval);
    autoplayTimerRef.current = timer;
    return () => clearInterval(timer);
  }, [autoplay, isPaused, totalItems, effectiveVisibleCards, autoplayInterval, nextSlide]);

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
    [maxIndex, animateToSlide]
  );

  return {
    rootRef,
    trackRef,
    cardRefs,
    isDragging,
    setIsHoverPaused,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleClickCapture,
    renderItems,
    trackWidthPercent,
    trackItemsCount,
    highlightIndex,
    cloneCount,
    infiniteEnabled,
    maxIndex,
    activeIndex,
    goToSlideWithReset,
    prevSlide,
    nextSlide,
    totalItems,
  };
}
