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

  // ✅ FIX: lazy initializer بدل setState جوه الـ effect
  // بيتنفذ وقت الـ render نفسه (مش بعده) فمفيش render إضافي
  const [dir, setDir] = useState<"rtl" | "ltr">(() =>
    typeof document !== "undefined"
      ? ((document.documentElement.dir as "rtl" | "ltr") || "rtl")
      : "rtl",
  );

  useEffect(() => {
    // الـ effect دلوقتي بيعمل حاجة واحدة بس: يـ subscribe لتغييرات خارجية
    // (external system) — مفيش setState مباشر جوه جسم الـ effect
    const observer = new MutationObserver(() => {
      const newDir = (document.documentElement.dir as "rtl" | "ltr") || "rtl";
      // ده مقبول: بيتنفذ جوه callback استجابةً لتغيير خارجي حقيقي، مش تلقائيًا
      setDir(newDir);
      swiperRef.current?.changeLanguageDirection(newDir);
    });
    observer.observe(document.documentElement, { attributeFilter: ["dir"] });
    return () => observer.disconnect();
  }, []);

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

  const hasScale = activeScale !== 1 || inactiveScale !== 1;
  const hasOpacity = inactiveOpacity !== 1;
  const useCenteredSlides = isCenterMode || hasScale || hasOpacity;

  const effectiveVisible = isCenterMode ? 1 : visibleCount;

  const loopReady = totalItems >= effectiveVisible * 2;
  const useLoop = infinite && loopReady;

  // عدد الـ dots = عدد الصفحات الفعلية (total - visible + 1)
  // في loop mode نستخدم نفس الحساب لأن الـ user يتنقل بين items
  const dotsCount = Math.max(
    1,
    Math.ceil(totalItems / effectiveVisible),
  );
  const maxIndex = dotsCount - 1;

  const goToSlide = useCallback(
    (index: number) => {
      if (!swiperRef.current) return;
      // نحول من page index لـ slide index
      const slideIndex = index * (effectiveVisible || 1);
      const target = Math.min(slideIndex, totalItems - 1);
      if (useLoop) {
        swiperRef.current.slideToLoop(target);
      } else {
        swiperRef.current.slideTo(target);
      }
    },
    [maxIndex, useLoop, effectiveVisible, totalItems],
  );

  // syncActiveIndex: نحول الـ realIndex لرقم صفحة (0-based) داخل نطاق الـ dots
  const syncActiveIndex = useCallback(
    (sw: SwiperType) => {
      const ri = sw.realIndex;
      // نقسم على عدد الـ visible عشان نحول من slide index لـ page index
      const pageIndex = Math.min(
        Math.floor(ri / (effectiveVisible || 1)),
        maxIndex,
      );
      setActiveIndex(pageIndex);
    },
    [effectiveVisible, maxIndex],
  );

  // ✅ الـ early return دلوقتي بعد كل الـ hooks، مش قبلها
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
            modules={[Autoplay, A11y]}
            dir={dir}
            watchSlidesProgress={true}
            onSwiper={(sw) => {
              swiperRef.current = sw;
            }}
            onSlideChange={syncActiveIndex}
            onRealIndexChange={syncActiveIndex}
            onSlideChangeTransitionEnd={syncActiveIndex}
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
              const slideIsActive = index === activeIndex;

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