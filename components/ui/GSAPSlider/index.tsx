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
// بنقرأ من document.documentElement.dir ونعمل subscribe لأي تغيير عليه
// عن طريق MutationObserver، من غير أي setState جوه effect.
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
// بنعمل subscribe لـ resize مع rAF throttling زي الأصل، لكن من غير setState
// مباشر جوه الـ effect؛ القيمة الخام (width) بس هي اللي بتتخزن عن طريق
// useSyncExternalStore، والباقي (visibleCount, isCenterMode) بيتحسب في
// الـ render نفسه كقيم مشتقة (derived) — أرخص وأنضف من state إضافية.
function subscribeWidth(callback: () => void) {
  let raf: number;
  const handler = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(callback);
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
  // افتراض ديسكتوب وقت الـ SSR؛ هيتصحح فورًا على الكلاينت بعد أول قراءة حقيقية
  return 1280;
}

export default function GSAPSlider<T extends { id?: string | number }>(
  props: GSAPSliderProps<T> & {
    activeScale?: number;
    inactiveScale?: number;
    inactiveOpacity?: number;
  },
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
    activeScale = 1,
    inactiveScale = 1,
    inactiveOpacity = 1,
  } = props;

  const swiperRef = useRef<SwiperType | null>(null);
  const [realActiveIndex, setRealActiveIndex] = useState(0);

  const rawId = useId();
  const paginationId = `gsap-pagination-${rawId.replace(/:/g, "")}`;

  // ✅ من غير useEffect ولا setState — القيمة بتتحدث تلقائيًا لما الـ
  // external source يتغيّر، والـ React بيتكفل بإعادة الـ render بنفسه.
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

  // ✅ ده استخدام سليم للـ effect: بنزامن نظام خارجي (Swiper instance) مع
  // آخر قيمة من React state — مش العكس. مطابق تمامًا للنمط اللي React
  // بينصح بيه في رسالة الخطأ نفسها.
  useEffect(() => {
    swiperRef.current?.changeLanguageDirection(dir);
  }, [dir]);

  const totalItems = items.length;

  const hasScale = activeScale !== 1 || inactiveScale !== 1;
  const hasOpacity = inactiveOpacity !== 1;
  const useCenteredSlides = isCenterMode || hasScale || hasOpacity;

  const effectiveVisible = isCenterMode ? 1 : visibleCount;

  // حماية: مش بنفعّل الـ loop غير لو في عناصر كافية لتجنب كسر عرض الكاردات
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
      onMouseEnter={() => {
        if (pauseOnHover && autoplay) swiperRef.current?.autoplay.pause();
      }}
      onMouseLeave={() => {
        if (pauseOnHover && autoplay) swiperRef.current?.autoplay.resume();
      }}
    >
      <div className="w-full overflow-x-hidden">
        <div className="w-full pt-8 pb-3 md:pb-6 px-2 md:px-3 py-4 select-none">
          <Swiper
            key={`${effectiveVisible}-${useLoop}`}
            modules={[Autoplay, A11y, Pagination]}
            dir={dir}
            watchSlidesProgress={true}
            onSwiper={(sw) => {
              swiperRef.current = sw;
              syncActiveIndex(sw);
            }}
            onSlideChange={syncActiveIndex}
            onRealIndexChange={syncActiveIndex}
            onSlideChangeTransitionEnd={syncActiveIndex}
            slidesPerView={isCenterMode ? "auto" : visibleCount}
            spaceBetween={spaceBetween}
            centeredSlides={useCenteredSlides}
            // loop={useLoop}
            loop={true}
            // loopAdditionalSlides={
            //   useLoop ? Math.max(effectiveVisible * 2, 4) : undefined
            // }
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
                    bulletActiveClass:
                      "swiper-pagination-bullet-active !w-7 !bg-sky-500 dark:!bg-sky-400 shadow-sm shadow-sky-400/50",
                    renderBullet: (_index, bulletClassName) =>
                      `<span class="${bulletClassName} !opacity-100 !rounded-full bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 transition-all duration-500 cursor-pointer inline-block"></span>`,
                  }
                : false
            }
            style={{
              overflow: "visible",
              ...({
                "--swiper-pagination-bullet-width": "10px",
                "--swiper-pagination-bullet-height": "10px",
                "--swiper-pagination-bullet-horizontal-gap": "4px",
              } as React.CSSProperties),
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

              const slideScale = hasScale
                ? slideIsActive
                  ? activeScale
                  : inactiveScale
                : 1;

              const slideOpacity = hasOpacity
                ? slideIsActive
                  ? 1
                  : inactiveOpacity
                : 1;

              return (
                <SwiperSlide
                  key={(item as { id?: string | number }).id ?? index}
                  style={
                    isCenterMode
                      ? { width: `${centerCardWidthPercent}%` }
                      : undefined
                  }
                >
                  <div
                    className={`h-full flex flex-col origin-center transition-all duration-500 ease-in-out ${hasScale ? "px-0.5 md:px-1" : ""}`}
                    style={{
                      transform: `scale(${slideScale})`,
                      opacity: slideOpacity,
                      zIndex: slideIsActive ? 10 : 1,
                    }}
                  >
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
    </div>
  );
}
