"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useId,
  useSyncExternalStore,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { GSAPSliderProps } from "../types";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

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

  const rawId = useId();
  const paginationId = `gsap-pagination-${rawId.replace(/:/g, "")}`;

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

  const useCenteredSlides = isCenterMode;

  const effectiveVisible = isCenterMode ? 1 : visibleCount;

  const useLoop = infinite && totalItems > effectiveVisible * 2;

  const showPaginationContainer = showDots && totalItems > effectiveVisible;

  const syncActiveIndex = useCallback((sw: SwiperType) => {
    setRealActiveIndex(sw.realIndex);
  }, []);

  if (totalItems === 0) return null;

  const spaceBetween = isCenterMode ? 12 : 14;

  return (
    <div
      className={`relative w-full ${className}`}
      /*
      onMouseEnter={() => {
        if (pauseOnHover && autoplay) swiperRef.current?.autoplay.pause();
      }}
      onMouseLeave={() => {
        if (pauseOnHover && autoplay) swiperRef.current?.autoplay.resume();
      }}
      */
    >
      <div className="w-full overflow-x-clip">
        <div className="w-full pt-12 pb-10 md:pb-12 px-2 md:px-3 select-none">
          <Swiper
            key={`${effectiveVisible}-${useLoop}`}
            modules={[Autoplay, A11y, Pagination]}
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
            loop={true}
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
            pagination={
              showPaginationContainer
                ? {
                    el: `[id="${paginationId}"]`,
                    clickable: true,
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
            {items.map((item, index) => {
              const slideIsActive = index === realActiveIndex;

              return (
                <SwiperSlide
                  key={(item as { id?: string | number }).id ?? index}
                  style={
                    isCenterMode
                      ? { width: `${centerCardWidthPercent}%` }
                      : undefined
                  }
                >
                  <div className="h-full flex flex-col">
                    {renderItem?.(item, index, slideIsActive) ?? null}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {showPaginationContainer && (
        <div
          id={paginationId}
          className="flex items-center justify-center gap-1 px-1 mt-3 sm:mt-4"
        />
      )}

      {showPaginationContainer && (
        <style jsx global>{`
          #${paginationId} .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            border-radius: 9999px;
            margin: 0 2px !important;
            background-color: transparent;
            border: 1.5px solid rgb(148 163 184);
            opacity: 1;
            cursor: pointer;
            transition: width 0.35s ease, background-color 0.35s ease,
              border-color 0.35s ease;
          }
          #${paginationId} .swiper-pagination-bullet:hover {
            border-color: rgb(100 116 139); /* slate-500 */
          }
          #${paginationId} .swiper-pagination-bullet-active {
            width: 26px;
            background-color: rgb(14 165 233); /* sky-500 */
            border-color: rgb(14 165 233);
          }

          .dark #${paginationId} .swiper-pagination-bullet {
            border-color: rgb(71 85 105); /* slate-600 */
          }
          .dark #${paginationId} .swiper-pagination-bullet:hover {
            border-color: rgb(100 116 139); /* slate-500 */
          }
          .dark #${paginationId} .swiper-pagination-bullet-active {
            background-color: rgb(56 189 248); /* sky-400 */
            border-color: rgb(56 189 248);
          }
        `}</style>
      )}
    </div>
  );
}