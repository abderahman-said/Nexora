"use client";

import { useId, useRef, useSyncExternalStore } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
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
      <div className="w-full overflow-x-clip py-8 md:py-10 select-none">
        <Swiper
          key={dir}
          dir={dir}
          modules={[Autoplay, A11y, Pagination]}
          grabCursor={enableDrag}
          allowTouchMove={enableDrag}
          watchSlidesProgress
          centeredSlides
          loop={loop}
          speed={650}
          slidesPerView={1.5}
          spaceBetween={12}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 15 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
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
                }
              : false
          }
          onSwiper={(sw: SwiperType) => (swiperRef.current = sw)}
          className="!overflow-visible"
        >
          {items.map((item, index) => (
            <SwiperSlide key={item.id ?? index} className="!h-auto">
              {({ isActive }: { isActive: boolean }) => (
                <div
                  className="h-full origin-center transition-transform duration-500 ease-out"
                  style={{
                    transform: `scale(${isActive ? 1.08 : 0.9})`,
                    zIndex: isActive ? 10 : 1,
                  }}
                >
                  {renderItem(item, index, isActive)}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {showPagination && (
        <div
          id={paginationId}
          className="flex items-center justify-center gap-1 px-1 mt-3 sm:mt-4"
        />
      )}

      {showPagination && (
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
            border-color: rgb(100 116 139);
          }
          #${paginationId} .swiper-pagination-bullet-active {
            width: 26px;
            background-color: rgb(14 165 233);
            border-color: rgb(14 165 233);
          }

          .dark #${paginationId} .swiper-pagination-bullet {
            border-color: rgb(71 85 105);
          }
          .dark #${paginationId} .swiper-pagination-bullet:hover {
            border-color: rgb(100 116 139);
          }
          .dark #${paginationId} .swiper-pagination-bullet-active {
            background-color: rgb(56 189 248);
            border-color: rgb(56 189 248);
          }
        `}</style>
      )}
    </div>
  );
}