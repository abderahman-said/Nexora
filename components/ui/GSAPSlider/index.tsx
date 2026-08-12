"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { GSAPSliderProps } from "../types";
import { GSAPSliderControls } from "./GSAPSliderControls";

import "swiper/css";

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
    ItemComponent,
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(defaultVisibleCount);
  const [isCenterMode, setIsCenterMode] = useState(false);

  // Track RTL/LTR direction changes at runtime (e.g. language toggle)
  const [dir, setDir] = useState<"rtl" | "ltr">(() =>
    typeof document !== "undefined" && document.documentElement.dir === "rtl"
      ? "rtl"
      : "ltr",
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    const target = document.documentElement;
    const observer = new MutationObserver(() => {
      setDir(target.dir === "rtl" ? "rtl" : "ltr");
    });
    observer.observe(target, { attributes: true, attributeFilter: ["dir"] });
    return () => observer.disconnect();
  }, []);

  // Responsive breakpoint detection
  useEffect(() => {
    let raf: number;
    const update = () => {
      const w = window.innerWidth;
      const isMobile = w < 640;
      const isTablet = w < 1024;

      setVisibleCount(
        isMobile
          ? mobileVisibleCount
          : isTablet
            ? (tabletVisibleCount ?? defaultVisibleCount)
            : defaultVisibleCount,
      );
      setIsCenterMode(centerModeMobile && isMobile);
    };

    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [
    defaultVisibleCount,
    mobileVisibleCount,
    tabletVisibleCount,
    centerModeMobile,
  ]);

  const totalItems = items.length;

  // Whether this slider uses scale/opacity effects on the active slide
  const hasScale = activeScale !== 1 || inactiveScale !== 1;
  const hasOpacity = inactiveOpacity !== 1;

  // centeredSlides = true only when:
  // 1. Mobile center-peek mode (centerModeMobile), OR
  // 2. Scale/opacity effects are used — so the "hero" card is always centred
  const useCenteredSlides = isCenterMode || hasScale || hasOpacity;

  // If infinite={true}, we always use real loop and every item can be the active/leftmost slide
  const useLoop = infinite;

  // Dots/pagination counts
  // - loop or centeredSlides mode: every item can be active → dotsCount = totalItems
  // - normal non-loop paged mode: one dot per "page" → dotsCount = totalItems - visibleCount + 1
  const effectiveVisible = isCenterMode ? 1 : visibleCount;
  const maxIndex =
    useLoop || useCenteredSlides
      ? Math.max(0, totalItems - 1)
      : Math.max(0, Math.floor(totalItems - effectiveVisible));
  const dotsCount = maxIndex + 1;

  const goToSlide = useCallback(
    (index: number) => {
      if (!swiperRef.current) return;
      const target = Math.min(index, maxIndex);
      // slideToLoop handles cloned-slide offsets; only relevant when real loop is on
      if (useLoop) {
        swiperRef.current.slideToLoop(target);
      } else {
        swiperRef.current.slideTo(target);
      }
    },
    [maxIndex, useLoop],
  );

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
      {/* overflow-x-hidden clips off-screen slides; vertical overflow kept open for scale */}
      <div className="w-full overflow-x-hidden">
        <div className="w-full pt-8 pb-3 md:pb-6 px-2 md:px-3 py-4 select-none">
          <Swiper
            // Remount on direction change so Swiper re-initialises RTL/LTR layout
            key={dir}
            modules={[Autoplay, A11y]}
            onSwiper={(sw) => {
              swiperRef.current = sw;
            }}
            onSlideChange={(sw) => {
              // realIndex stays stable across loop's internally cloned slides,
              // and works fine in non-loop mode too.
              setActiveIndex(useLoop ? sw.realIndex : sw.activeIndex);
            }}
            slidesPerView={isCenterMode ? "auto" : visibleCount}
            spaceBetween={spaceBetween}
            centeredSlides={useCenteredSlides}
            loop={useLoop}
            loopAdditionalSlides={useLoop ? totalItems : undefined}
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
            dir={dir}
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
              const isActive = index === activeIndex;

              return (
                <SwiperSlide
                  key={(item as { id?: string | number }).id ?? index}
                  style={
                    isCenterMode
                      ? { width: `${centerCardWidthPercent}%` }
                      : undefined
                  }
                >
                  {({ isActive: swiperActive }) => {
                    // In real loop mode use Swiper's own isActive (accounts for clones)
                    // In paged/rewind mode use our index comparison
                    const slideIsActive = useLoop ? swiperActive : isActive;

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
                      <div
                        className={`h-full flex flex-col origin-center transition-all duration-500 ease-in-out ${hasScale ? "px-0.5 md:px-1" : ""}`}
                        style={{
                          transform: `scale(${slideScale})`,
                          opacity: slideOpacity,
                          zIndex: slideIsActive ? 10 : 1,
                        }}
                      >
                        {ItemComponent ? (
                          <ItemComponent
                            service={item}
                            member={item}
                            client={item}
                            item={item}
                            index={index}
                            isActive={slideIsActive}
                          />
                        ) : (
                          (renderItem?.(item, index, slideIsActive) ?? null)
                        )}
                      </div>
                    );
                  }}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      <GSAPSliderControls
        showDots={showDots}
        maxIndex={maxIndex}
        dotsCount={dotsCount}
        activeIndex={activeIndex}
        goToSlideWithReset={goToSlide}
      />
    </div>
  );
}
