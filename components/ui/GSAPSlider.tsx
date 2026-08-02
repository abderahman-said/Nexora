"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import type { GSAPSliderProps, NavButtonProps } from './types';

const DRAG_THRESHOLD = 40;
const SNAP_DURATION = 0.6; // ✅ كان 0.9 — أسرع = إحساس أخف وأسلس
const SNAP_EASE = "sine.inOut"; // ✅ كان power2.inOut — منحنى جيبي ناعم بدون تسارع/تباطؤ حاد
const RELEASE_EASE = "power1.out"; // ✅ يُستخدم بعد إفلات الـ drag عشان يكمل بنفس الـ momentum

// ✅ بدل ما نستخدم CSS transition منفصل عن GSAP (اللي كان بيسبب تضارب بين
// محركين مختلفين للحركة ويعمل "تهنيج" وقت الدراج)، دلوقتي الـ scale/opacity
// بيتحركوا جوه GSAP بنفس الـ ticker بتاع حركة الترانك، فكله متزامن في نفس
// حلقة الـ requestAnimationFrame الواحدة.

// ✅ SSR-safe: document مش موجود وقت الـ server render
const isRTL = () =>
  typeof document !== "undefined" && document.documentElement.dir === "rtl";

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
  enableDrag = true,
  mobileVisibleCount = 1,
  tabletVisibleCount = 2,
  className = "",
  centerModeMobile = false,
  centerCardWidthPercent = 76,
  infinite = false,
  // ✅ جديد: تحكم في حجم/شفافية الكارت النشط مقابل الكروت الجانبية
  activeScale = 1,
  inactiveScale = 1,
  // inactiveOpacity = 0.72,
}: GSAPSliderProps<T> & {
  activeScale?: number;
  inactiveScale?: number;
  inactiveOpacity?: number;
}) {
  const totalItems = items.length;

  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ مصادر pause منفصلة بدل state واحد "ملتصق" على true
  const [isHoverPaused, setIsHoverPaused] = useState(false);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [isOffscreen, setIsOffscreen] = useState(false);
  const isPaused = isHoverPaused || isTabHidden || isOffscreen;

  const [isDragging, setIsDragging] = useState(false);

  // ✅ Lazy init: نحسب القيمة الصح من أول رندر بدل ما نستنى الـ useEffect
  // ده بيمنع "الفلاش" اللي بيحصل لما الكومبوننت يبدأ بـ defaultVisibleCount
  // وبعدين يقفز فجأة للقيمة الصح بتاعة الموبايل بعد أول paint
  const getInitialVisibleCards = () => {
    if (typeof window === "undefined") return defaultVisibleCount;
    const width = window.innerWidth;
    if (width < 640) return mobileVisibleCount;
    if (width < 1024) return tabletVisibleCount;
    return defaultVisibleCount;
  };

  const getInitialCenterActive = () => {
    if (typeof window === "undefined") return false;
    return centerModeMobile && window.innerWidth < 640;
  };

  const [visibleCards, setVisibleCards] = useState<number>(getInitialVisibleCards);
  const [isCenterActive, setIsCenterActive] = useState<boolean>(getInitialCenterActive);

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
  const rootRef = useRef<HTMLDivElement>(null); // ✅ wrapper خارجي مستقر لل Observer

  // ✅ refs لكل كارت عشان نحرك الـ scale/opacity بتاعه عن طريق GSAP مباشرة
  // بدل CSS transition، فيبقى كله (موضع الترانك + سكيل الكروت) شغال جوه
  // نفس ticker وميحصلش تضارب/تهنيج وقت الدراج
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
      xPercentSetterRef.current = gsap.quickSetter(
        trackRef.current,
        "xPercent",
      );
    }
  }, []);

  const effectiveVisibleCards = isCenterActive ? 1 : visibleCards;

  // ✅ cloneCount لازم يكون عدد صحيح دايمًا حتى لو visibleCards كسري (زي 1.25)
  // لأنه بيتستخدم في items.slice() وأي كسر هيتقص لتحت ويسبب نقص كلونز
  // وده اللي بيسبب القفزة/الإزاحة وقت اللوب اللانهائي
  const cloneCount =
    infinite && totalItems > effectiveVisibleCards
      ? Math.min(Math.ceil(effectiveVisibleCards), totalItems)
      : 0;
  const infiniteEnabled = cloneCount > 0;

  const renderItems = useMemo(() => {
    if (!infiniteEnabled) return items;
    const head = items.slice(totalItems - cloneCount);
    const tail = items.slice(0, cloneCount);
    // ✅ في RTL الاتجاه البصري بيتقلب، فترتيب الهيد/تيل لازم يتقلب معاه
    // عشان الكارد الفعّال يفضل متطابق مع الـ index الحقيقي
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

  // ✅ في وضع center mode، currentIndex أصلاً هو الكارت اللي بيتحط في نص الشاشة
  // (بحساب computeXPercent)، فمفيش إزاحة مطلوبة.
  // لكن في الوضع العادي (لما بيبان أكتر من كارت مرة واحدة، زي 3 في الديسكتوب)،
  // currentIndex بيمثل أول كارت في الصف الظاهر مش النص، فلو استخدمناه direct
  // هيكبّر الكارت الشمال بدل الكارت النص فعلًا. عشان كده بنضيف offset
  // بيوديك لمنتصف مجموعة الكروت الظاهرة فعليًا.
  const highlightMiddleOffset = isCenterActive
    ? 0
    : Math.floor((effectiveVisibleCards - 1) / 2);
  const highlightIndex = activeIndex + highlightMiddleOffset;

  const indexToXPercent = useCallback(
    (index: number) =>
      computeXPercent(
        index + cloneCount,
        trackItemsCount,
        isCenterActiveRef.current,
        centerCardWidthPercent,
      ),
    [trackItemsCount, cloneCount, centerCardWidthPercent],
  );

  const positionToXPercent = useCallback(
    (position: number) =>
      computeXPercent(
        position,
        trackItemsCount,
        isCenterActiveRef.current,
        centerCardWidthPercent,
      ),
    [trackItemsCount, centerCardWidthPercent],
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
    [totalItems, indexToXPercent],
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
    [positionToXPercent],
  );

  const jumpToPosition = useCallback(
    (position: number) => {
      if (!trackRef.current) return;
      gsap.set(trackRef.current, { xPercent: positionToXPercent(position) });
    },
    [positionToXPercent],
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

  // ✅ تحريك الـ scale/opacity بتاعة كل كارت عن طريق GSAP (مش CSS transition)
  // عشان يبقى متزامن 100% مع حركة الترانك ومفيش تهنيج وقت الدراج.
  // أول مرة (mount) بيتحط الوضع الصح فورًا من غير أنيميشن عشان مفيش "فلاش".
  useEffect(() => {
    const isFirstRun = !hasMountedScaleRef.current;
    hasMountedScaleRef.current = true;

    cardRefs.current.forEach((el, index) => {
      if (!el) return;
      const realIndex = index - cloneCount;
      const isActive = realIndex === highlightIndex;
      const targetScale = isActive ? activeScale : inactiveScale;
      const targetOpacity = 1; // ✅ الشفافية موحّدة 1 لكل الكروت (الفرق بقى بس في الحجم)

      if (isFirstRun) {
        gsap.set(el, {
          scale: targetScale,
          opacity: targetOpacity,
          zIndex: isActive ? 10 : 1,
        });
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
  }, [
    highlightIndex,
    cloneCount,
    trackItemsCount,
    activeScale,
    inactiveScale,
  ]);

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
    if (
      !isDraggingRef.current ||
      !trackRef.current ||
      !xPercentSetterRef.current
    )
      return;

    const containerWidth = containerWidthRef.current;
    const currentTrackWidthPercent = isCenterActiveRef.current
      ? trackItemsCount * centerCardWidthPercent
      : (trackItemsCount / visibleCards) * 100;
    const trackOwnWidth = containerWidth * (currentTrackWidthPercent / 100);
    const rtlMultiplier = isRTLRef.current ? -1 : 1;
    const diffPercent =
      rtlMultiplier * ((dragCurrentXRef.current - dragStartXRef.current) / trackOwnWidth) * 100;
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

    // ✅ بعد الإفلات مباشرة، استخدم power1.out بدل sine.inOut
    // عشان الحركة تكمل بنفس زخم إصبع المستخدم من غير "وقفة" محسوسة في البداية
    if (adjustedDiff > DRAG_THRESHOLD && (infiniteEnabled || currentIndexRef.current < maxIndex)) {
      setCurrentIndex((prev) => {
        const atEnd = prev >= maxIndex;
        const next = atEnd ? 0 : prev + 1;
        if (infiniteEnabled && atEnd) {
          animateToPosition(cloneCount + totalItems, () => {
            jumpToPosition(cloneCount);
          }, RELEASE_EASE);
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
          animateToPosition(cloneCount - 1, () => {
            jumpToPosition(cloneCount + maxIndex);
          }, RELEASE_EASE);
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
    const dragDistance = Math.abs(
      dragStartXRef.current - dragCurrentXRef.current,
    );
    if (dragDistance > 10) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // ✅ pause لما التاب يبقى مخفي — وترجع تشتغل لما يرجع ظاهر
  useEffect(() => {
    const onVisibility = () => setIsTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // ✅ pause لما السلايدر يخرج بره الشاشة — وترجع تشتغل لما يظهر تاني
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
    return () => {
      clearInterval(timer);
    };
  }, [
    autoplay,
    isPaused,
    totalItems,
    effectiveVisibleCards,
    autoplayInterval,
    nextSlide,
  ]);

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

  const showSideControls = showControls && controlsPosition === "sides" && maxIndex > 0;
  const showCenterControls = showControls && controlsPosition === "center" && maxIndex > 0;
  const showPaginationDots = showDots && maxIndex > 0;

  return (
    <div
      ref={rootRef}
      className={`relative w-full ${className}`}
      onMouseEnter={() => pauseOnHover && setIsHoverPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsHoverPaused(false)}
    >
      {showSideControls && (
        <>
          <NavButton direction="prev" onClick={prevSlide} position="side" />
          <NavButton direction="next" onClick={nextSlide} position="side" />
        </>
      )}

      <div
        className={`w-full overflow-hidden pt-8 md:pb-3 md:pb-6 px-2 md:px-3 select-none ${enableDrag ? (isDragging ? "cursor-grabbing" : "cursor-grab") : ""
          }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDragStart={(e) => e.preventDefault()}
        onClickCapture={handleClickCapture}
        style={{ touchAction: "pan-y" }}
      >
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ width: `${trackWidthPercent}%` }}
        >
          {renderItems.map((item, index) => {
            const realIndex = index - cloneCount;
            // ✅ الكارت النشط بيتحسب دايمًا (مش بس في centerModeMobile)
            // عشان تأثير التكبير/التصغير يشتغل في كل الأوضاع.
            // وبيتقارن بـ highlightIndex (الكارت اللي فعليًا في نص الصف الظاهر)
            // مش activeIndex الخام، عشان الكارت المكبّر يبان في المنتصف صح.
            const isActive = realIndex === highlightIndex;

            return (
              <div
                key={`slide-${index}`}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="px-2 sm:px-3.5 shrink-0 flex flex-col origin-center"
                style={{
                  width: `${100 / trackItemsCount}%`,
                }}
                aria-hidden={infiniteEnabled && (index < cloneCount || index >= cloneCount + totalItems)}
                suppressHydrationWarning
              >
                {ItemComponent ? (
                  <ItemComponent
                    service={item}
                    member={item}
                    client={item}
                    item={item}
                    index={index}
                    isActive={isActive}
                  />
                ) : (
                  renderItem?.(item, index, isActive) ?? null
                )}
              </div>
            );
          })}
        </div>
      </div>

      {(showCenterControls || showPaginationDots) && (
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-3 sm:mt-4">
          {/* {showCenterControls && (
            <NavButton direction="prev" onClick={prevSlide} position="center" />
          )} */}

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

          {/* {showCenterControls && (
            <NavButton direction="next" onClick={nextSlide} position="center" />
          )} */}
        </div>
      )}
    </div>
  );
}

function computeXPercent(
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

function NavButton({ direction, onClick, position }: NavButtonProps) {
  const isPrev = direction === "prev";
  const Icon = isPrev ? ChevronLeft : ChevronRight;
  const label = isPrev ? "Previous Slide" : "Next Slide";

  const sideClasses = isPrev ? "left-0 sm:-left-8" : "right-0 sm:-right-8";

  const className =
    position === "side"
      ? `absolute ${sideClasses} top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 !p-0 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-110 active:scale-95 transition-all duration-300 max-sm:hidden`
      : `w-10 h-10 sm:w-11 sm:h-11 !p-0 rounded-full flex items-center justify-center bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-lg hover:border-sky-500 dark:hover:border-sky-400 hover:scale-105 active:scale-95 transition-all duration-300`;

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