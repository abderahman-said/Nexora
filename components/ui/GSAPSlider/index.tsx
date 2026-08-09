"use client";

import React from "react";
import type { GSAPSliderProps } from '../types';
import { GSAPSliderControls } from './GSAPSliderControls';
import { GSAPSliderTrack } from './GSAPSliderTrack';
import { useGSAPSlider } from "./useGSAPSlider";

export default function GSAPSlider<T extends { id?: string | number }>(props: GSAPSliderProps<T> & {
  activeScale?: number;
  inactiveScale?: number;
  inactiveOpacity?: number;
}) {
  const {
    showDots = true,
    pauseOnHover = true,
    enableDrag = true,
    className = "",
  } = props;

  const sliderState = useGSAPSlider(props);
  const {
    totalItems, maxIndex, dotsCount, rootRef, setIsHoverPaused,
    dragContainerRef, handlePointerDown,
    handlePointerMove, handlePointerUp, handleClickCapture,
    activeIndex, goToSlideWithReset
  } = sliderState;

  if (totalItems === 0) return null;

  return (
    <div
      ref={rootRef}
      className={`relative w-full ${className}`}
      onMouseEnter={() => pauseOnHover && setIsHoverPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsHoverPaused(false)}
    >
      <div
        ref={dragContainerRef}
        className={`w-full overflow-hidden pt-8 md:pb-3 md:pb-6 px-2 md:px-3 select-none ${enableDrag ? "cursor-grab" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onDragStart={(e) => e.preventDefault()}
        onClickCapture={handleClickCapture}
        style={{ touchAction: "pan-y" }}
      >
        <GSAPSliderTrack {...props} {...sliderState} />
      </div>

      <GSAPSliderControls
        showDots={showDots}
        maxIndex={maxIndex}
        dotsCount={dotsCount}
        activeIndex={activeIndex}
        goToSlideWithReset={goToSlideWithReset}
      />
    </div>
  );
}