"use client";

import { useId, useRef, useSyncExternalStore  } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { ProjectsCoverflowSliderProps } from "@/types/project";

const subscribeDir = (cb: () => void) => {
  const observer = new MutationObserver(cb);
  observer.observe(document.documentElement, { attributeFilter: ["dir"] });
  return () => observer.disconnect();
};
const getDir = () => (document.documentElement.dir as "rtl" | "ltr") || "rtl";
const getDirSSR = () => "rtl" as const;



export default function ProjectsCoverflowSlider({
  items,
  renderItem,
  autoplay = false,
  autoplayInterval = 4500,
  showDots = true,
  pauseOnHover = true,
  enableDrag = true,
  className = "",
}: ProjectsCoverflowSliderProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const paginationId = `projects-coverflow-${useId().replace(/:/g, "")}`;
  const dir = useSyncExternalStore(subscribeDir, getDir, getDirSSR);

  if (!items.length) return null;

  const showPagination = showDots && items.length > 1;
  const loop = items.length > 3;

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => pauseOnHover && autoplay && swiperRef.current?.autoplay.pause()}
      onMouseLeave={() => pauseOnHover && autoplay && swiperRef.current?.autoplay.resume()}
    >
      <div className="w-full overflow-x-hidden py-8 md:py-10 select-none">
        <Swiper
          dir={dir}
          modules={[EffectCoverflow, Autoplay, A11y, Pagination]}
          effect="coverflow"
          grabCursor={enableDrag}
          allowTouchMove={enableDrag}
          watchSlidesProgress
          centeredSlides
          loop={loop}
          speed={650}
          slidesPerView={1.3}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 120,
            modifier: 1.6,
            slideShadows: false,
          }}
          autoplay={
            autoplay
              ? { delay: autoplayInterval, disableOnInteraction: false, pauseOnMouseEnter: pauseOnHover }
              : false
          }
          pagination={
            showPagination
              ? {
                  el: `[id="${paginationId}"]`,
                  clickable: true,
                  bulletActiveClass:
                    "swiper-pagination-bullet-active !w-7 !h-[12px] !bg-sky-500 dark:!bg-sky-400 shadow-sm shadow-sky-400/50",
                  renderBullet: (_i, cls) =>
                    `<span class="${cls} !opacity-100 !w-[12px] !h-[12px] !rounded-full !bg-transparent border !border-slate-400 dark:!border-slate-500  transition-all duration-500 cursor-pointer inline-block"></span>`,
                }
              : false
          }
          onSwiper={(sw) => (swiperRef.current = sw)}
          className="!overflow-visible"
        >
          {items.map((item, index) => (
            <SwiperSlide key={item.id ?? index} className="!h-auto">
              {({ isActive }) => (
                <div
                  className="h-full transition-opacity duration-500 ease-out"
                  style={{ opacity: isActive ? 1 : 0.6 }}
                >
                  {renderItem(item, index, isActive)}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {showPagination && (
        <div id={paginationId} className="flex items-center justify-center gap-1 px-1 mt-3 sm:mt-4" />
      )}
    </div>
  );
}