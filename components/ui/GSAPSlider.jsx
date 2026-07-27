'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

/**
 * Reusable GSAP Cards Slider Component (Design Pattern)
 * 
 * @param {Array} items - List of objects to render
 * @param {Function} renderItem - Function (item, index) returning card component
 * @param {boolean} autoplay - Enable auto sliding (default: false)
 * @param {number} autoplayInterval - Delay between auto slides in ms (default: 4500)
 * @param {number} defaultVisibleCount - Cards visible per view on desktop (default: 3)
 * @param {boolean} showControls - Display Prev/Next arrow buttons (default: true)
 * @param {string} controlsPosition - Arrow buttons position: 'center' | 'sides' (default: 'center')
 * @param {boolean} showDots - Display dot pagination indicators (default: true)
 * @param {string} className - Optional container styling
 */
export default function GSAPSlider({
    items = [],
    renderItem,
    ItemComponent,
    autoplay = false,
    autoplayInterval = 4500,
    defaultVisibleCount = 3,
    showControls = true,
    controlsPosition = 'center',
    showDots = true,
    className = '',
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [visibleCards, setVisibleCards] = useState(defaultVisibleCount);
    const trackRef = useRef(null);
    const autoplayTimerRef = useRef(null);

    const touchStartXRef = useRef(0);
    const touchEndXRef = useRef(0);

    const totalItems = items.length;

    // Handle responsive visible card count (Desktop: 3, Tablet: 2, Mobile: 1)
    useEffect(() => {
        const updateVisibleCards = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setVisibleCards(1);
            } else if (width < 1024) {
                setVisibleCards(2);
            } else {
                setVisibleCards(defaultVisibleCount);
            }
        };

        updateVisibleCards();
        window.addEventListener('resize', updateVisibleCards);
        return () => window.removeEventListener('resize', updateVisibleCards);
    }, [defaultVisibleCount]);

    // Calculate maximum slide index
    const maxIndex = Math.max(0, totalItems - visibleCards);

    // Slide transition animation using GSAP
    const animateToSlide = useCallback((targetIndex) => {
        if (!trackRef.current || totalItems === 0) return;

        // Calculate translation percentage based on single item width
        const movePercent = -(targetIndex * (100 / totalItems));

        gsap.to(trackRef.current, {
            xPercent: movePercent,
            duration: 0.6,
            ease: 'power3.out',
            overwrite: 'auto',
        });
    }, [totalItems]);

    // Handle next slide
    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => {
            const next = prev >= maxIndex ? 0 : prev + 1;
            animateToSlide(next);
            return next;
        });
    }, [maxIndex, animateToSlide]);

    // Handle previous slide
    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => {
            const next = prev <= 0 ? maxIndex : prev - 1;
            animateToSlide(next);
            return next;
        });
    }, [maxIndex, animateToSlide]);

    // Jump to specific slide
    const goToSlide = (index) => {
        const target = Math.min(index, maxIndex);
        setCurrentIndex(target);
        animateToSlide(target);
    };

    // Touch Swipe Event Handlers for Mobile
    const handleTouchStart = (e) => {
        touchStartXRef.current = e.touches[0].clientX;
        touchEndXRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const diff = touchStartXRef.current - touchEndXRef.current;
        const minSwipeDistance = 40; // minimum px to trigger swipe
        if (diff > minSwipeDistance) {
            nextSlide();
        } else if (diff < -minSwipeDistance) {
            prevSlide();
        }
    };

    // Autoplay Timer logic (disabled by default)
    useEffect(() => {
        if (!autoplay || isPaused || totalItems <= visibleCards) return;

        autoplayTimerRef.current = setInterval(() => {
            nextSlide();
        }, autoplayInterval);

        return () => {
            if (autoplayTimerRef.current) {
                clearInterval(autoplayTimerRef.current);
            }
        };
    }, [autoplay, isPaused, totalItems, visibleCards, autoplayInterval, nextSlide]);

    if (!items || totalItems === 0) return null;

    // Track total width formula: (totalItems / visibleCards) * 100%
    const trackWidthPercent = (totalItems / visibleCards) * 100;

    return (
        <div
            className={`relative w-full ${className}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* ── Side Arrow Buttons (if controlsPosition === 'sides') ── */}
            {showControls && controlsPosition === 'sides' && (
                <>
                    <Button
                        type="button"
                        onClick={prevSlide}
                        aria-label="Previous Slide"
                        variant="primary"
                        className="
                            absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 z-30
                            w-10 h-10 sm:w-12 sm:h-12 !p-0 rounded-full flex items-center justify-center
                            shadow-lg shadow-blue-500/30 hover:scale-110 active:scale-95 transition-all duration-300
                        "
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                    </Button>

                    <Button
                        type="button"
                        onClick={nextSlide}
                        aria-label="Next Slide"
                        variant="primary"
                        className="
                            absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 z-30
                            w-10 h-10 sm:w-12 sm:h-12 !p-0 rounded-full flex items-center justify-center
                            shadow-lg shadow-blue-500/30 hover:scale-110 active:scale-95 transition-all duration-300
                        "
                    >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                    </Button>
                </>
            )}

            {/* ── Slider Track Container with Touch Swipe Support ── */}
            <div
                className="w-full overflow-hidden pt-12 sm:pt-16 pb-6 sm:pb-8 px-1 touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    ref={trackRef}
                    className="flex transition-transform will-change-transform"
                    style={{
                        width: `${trackWidthPercent}%`,
                    }}
                >
                    {items.map((item, index) => (
                        <div
                            key={item.id || index}
                            className="px-2 sm:px-3 shrink-0 flex flex-col"
                            style={{
                                width: `${100 / totalItems}%`,
                            }}
                        >
                            {ItemComponent ? (
                                <ItemComponent service={item} member={item} client={item} item={item} index={index} />
                            ) : renderItem ? (
                                renderItem(item, index)
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Centered Controls or Dots ── */}
            {(showControls && controlsPosition === 'center') || showDots ? (
                <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-8">

                    {/* Previous Button (<) */}
                    {showControls && controlsPosition === 'center' && (
                        <Button
                            type="button"
                            onClick={prevSlide}
                            aria-label="Previous Slide"
                            variant="outline"
                            className="
                                w-10 h-10 sm:w-12 sm:h-12 !p-0 rounded-full flex items-center justify-center
                                bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300
                                border border-slate-200/90 dark:border-slate-800
                                shadow-md hover:shadow-lg hover:border-sky-500 dark:hover:border-sky-400
                                hover:text-sky-500 dark:hover:text-sky-400
                                hover:scale-105 active:scale-95 transition-all duration-300
                            "
                        >
                            <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
                        </Button>
                    )}

                    {/* Centered Pagination Dots (• • — •) */}
                    {showDots && (
                        <div className="flex items-center gap-2 px-2">
                            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
                                <button
                                    key={dotIdx}
                                    type="button"
                                    onClick={() => goToSlide(dotIdx)}
                                    aria-label={`Go to slide ${dotIdx + 1}`}
                                    className={`
                                        h-2.5 rounded-full transition-all duration-500 cursor-pointer
                                        ${currentIndex === dotIdx
                                            ? 'w-7 bg-sky-400 dark:bg-sky-400 shadow-sm shadow-sky-400/50'
                                            : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                                        }
                                    `}
                                />
                            ))}
                        </div>
                    )}

                    {/* Next Button (>) */}
                    {showControls && controlsPosition === 'center' && (
                        <Button
                            type="button"
                            onClick={nextSlide}
                            aria-label="Next Slide"
                            variant="outline"
                            className="
                                w-10 h-10 sm:w-12 sm:h-12 !p-0 rounded-full flex items-center justify-center
                                bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300
                                border border-slate-200/90 dark:border-slate-800
                                shadow-md hover:shadow-lg hover:border-sky-500 dark:hover:border-sky-400
                                hover:text-sky-500 dark:hover:text-sky-400
                                hover:scale-105 active:scale-95 transition-all duration-300
                            "
                        >
                            <ChevronRight className="w-5 h-5 stroke-[2.2]" />
                        </Button>
                    )}
                </div>
            ) : null}
        </div>
    );
}
