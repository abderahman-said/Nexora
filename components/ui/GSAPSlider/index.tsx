"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useId,
  useMemo,
  useSyncExternalStore,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { GSAPSliderProps } from "../types";

import "swiper/css";

// ── External store #1: اتجاه الصفحة (rtl/ltr) ─────────────────────────────
function subscribeDir(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributeFilter: ["dir"] });
  return () => observer.disconnect();
}
function getDirSnapshot(): "rtl" | "ltr" {
  return (document.documentElement.dir as "rtl" | "ltr") || "rtl";
}
function getDirServerSnapshot(): "rtl" | "ltr" {
  return "rtl";
}

// ── External store #2: عرض الشاشة (لحساب visibleCount / isCenterMode) ────
function subscribeWidth(callback: () => void) {
  let raf: number;
  let lastWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const handler = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      if (typeof window !== "undefined" && window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        callback();
      }
    });
  };
  window.addEventListener("resize", handler);
  return () => {
    window.removeEventListener("resize", handler);
    cancelAnimationFrame(raf);
  };
}
function getWidthSnapshot(): number {
  return window.innerWidth;
}
function getWidthServerSnapshot(): number {
  return 1280;
}

export default function GSAPSlider<T extends { id?: string | number }>(
  props: GSAPSliderProps<T>,
) {
  const {
    items,
    renderItem,
    autoplay = false,
    autoplayInterval = 4500,
    defaultVisibleCount = 3,
    mobileVisibleCount = 1,
    tabletVisibleCount = 2,
    showDots = true,
    pauseOnHover = true,
    enableDrag = true,
    className = "",
    centerModeMobile = false,
    centerCardWidthPercent = 76,
    infinite = false,
  } = props;

  const swiperRef = useRef<SwiperType | null>(null);
  const [realActiveIndex, setRealActiveIndex] = useState(0);

  const dir = useSyncExternalStore(
    subscribeDir,
    getDirSnapshot,
    getDirServerSnapshot,
  );

  const width = useSyncExternalStore(
    subscribeWidth,
    getWidthSnapshot,
    getWidthServerSnapshot,
  );

  const isMobile = width < 640;
  const isTablet = width < 1024;

  const visibleCount = isMobile
    ? mobileVisibleCount
    : isTablet
      ? (tabletVisibleCount ?? defaultVisibleCount)
      : defaultVisibleCount;

  const isCenterMode = centerModeMobile && isMobile;

  useEffect(() => {
    swiperRef.current?.changeLanguageDirection(dir);
  }, [dir]);

  const totalItems = items.length;

  // ── Duplicate items when totalItems < 6 so Swiper loop mode has enough slides to peek on both sides ──
  const displayItems = useMemo(() => {
    if (infinite && totalItems > 1 && totalItems < 6) {
      return [...items, ...items, ...items];
    }
    return items;
  }, [items, infinite, totalItems]);

  const useCenteredSlides = isCenterMode;
  const effectiveVisible = isCenterMode ? 1 : visibleCount;
  const useLoop = infinite && totalItems > 1;
  const showPaginationContainer = showDots && totalItems > effectiveVisible;

  const syncActiveIndex = useCallback((sw: SwiperType) => {
    if (totalItems > 0) {
      setRealActiveIndex(sw.realIndex % totalItems);
    }
  }, [totalItems]);

  if (totalItems === 0) return null;

  const spaceBetween = isCenterMode ? 12 : 14;

  return (
    <div className={`relative w-full ${className}`}>
      <div className="w-full overflow-x-clip">
        <div className="w-full pt-8 pb-8 md:pb-12 px-2 md:px-3 select-none">
          <Swiper
            key={`${effectiveVisible}-${useLoop}-${dir}-${displayItems.length}`}
            modules={[Autoplay, A11y]}
            dir={dir}
            onSwiper={(sw: SwiperType) => {
              swiperRef.current = sw;
              syncActiveIndex(sw);
            }}
            onSlideChange={syncActiveIndex}
            onRealIndexChange={syncActiveIndex}
            onSlideChangeTransitionEnd={syncActiveIndex}
            slidesPerView={isCenterMode ? "auto" : visibleCount}
            spaceBetween={spaceBetween}
            centeredSlides={useCenteredSlides}
            loop={useLoop}
            allowTouchMove={enableDrag}
            grabCursor={enableDrag}
            speed={600}
            autoplay={
              autoplay
                ? {
                    delay: autoplayInterval,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: pauseOnHover,
                  }
                : false
            }
            style={{
              overflow: "visible",
              ...(isCenterMode
                ? ({
                    "--swiper-center-offset": `${(100 - centerCardWidthPercent) / 2}%`,
                  } as React.CSSProperties)
                : {}),
            }}
            className="w-full !overflow-visible"
            wrapperClass="items-stretch"
          >
            {displayItems.map((item, index) => {
              const realIndex = index % totalItems;
              const slideIsActive = realIndex === realActiveIndex;

              return (
                <SwiperSlide
                  key={`${(item as { id?: string | number }).id ?? realIndex}-${index}`}
                  style={
                    isCenterMode
                      ? { width: `${centerCardWidthPercent}%` }
                      : undefined
                  }
                >
                  <div className="h-full flex flex-col">
                    {renderItem?.(item, realIndex, slideIsActive) ?? null}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {showPaginationContainer && (
        <div className="flex items-center justify-center gap-1.5 px-1 mt-1">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.slideToLoop(idx);
                }
              }}
              className={`h-3 rounded-full transition-all duration-350 ${
                idx === realActiveIndex
                  ? "w-7 bg-sky-500 dark:bg-sky-400"
                  : "w-3 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}