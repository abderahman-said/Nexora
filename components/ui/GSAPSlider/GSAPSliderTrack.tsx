"use client";

import React, { RefObject, MutableRefObject } from "react";
import type { GSAPSliderProps } from "../types";

interface GSAPSliderTrackProps<T> extends GSAPSliderProps<T> {
  renderItems: T[];
  trackRef: RefObject<HTMLDivElement | null>;
  cardRefs: MutableRefObject<Array<HTMLDivElement | null>>;
  trackWidthPercent: number;
  trackItemsCount: number;
  highlightIndex: number;
  cloneCount: number;
  infiniteEnabled: boolean;
  totalItems: number;
  activeScale?: number;
  inactiveScale?: number;
}

export function GSAPSliderTrack<T>({
  renderItems,
  renderItem,
  ItemComponent,
  trackRef,
  cardRefs,
  trackWidthPercent,
  trackItemsCount,
  highlightIndex,
  cloneCount,
  infiniteEnabled,
  totalItems,
  activeScale = 1,
  inactiveScale = 1,
}: GSAPSliderTrackProps<T>) {
  return (
    <div
      ref={trackRef}
      className="flex will-change-transform"
      style={{ width: `${trackWidthPercent}%` }}
    >
      {renderItems.map((item, index) => {
        const realIndex = index - cloneCount;
        const isActive = realIndex === highlightIndex;

        return (
          <div
            key={`slide-${index}`}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={`shrink-0 flex flex-col origin-center ${(activeScale !== 1 || inactiveScale !== 1) ? "px-0.5 md:px-1" : "px-2 sm:px-3.5"}`}
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
  );
}
