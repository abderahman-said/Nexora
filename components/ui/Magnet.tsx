"use client";
import React, { useRef, useCallback, MouseEvent } from 'react';
import type { MagnetProps } from './types';

const Magnet: React.FC<MagnetProps> = ({
  children,
  disabled = false,
  magnetStrength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  wrapperClassName = '',
  innerClassName = '',
  ...props
}) => {
  const magnetRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (magnetRef.current) {
      rectRef.current = magnetRef.current.getBoundingClientRect();
      if (innerRef.current) {
        innerRef.current.style.transition = activeTransition;
        // Activate GPU compositing only during interaction
        innerRef.current.style.willChange = 'transform';
      }
    }
  }, [activeTransition]);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (disabled || !magnetRef.current) return;

    if (!rectRef.current) {
      rectRef.current = magnetRef.current.getBoundingClientRect();
    }

    const { left, top, width, height } = rectRef.current;
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const offsetX = (e.clientX - centerX) / magnetStrength;
    const offsetY = (e.clientY - centerY) / magnetStrength;

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(() => {
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      }
    });
  }, [disabled, magnetStrength]);

  const handleMouseLeave = useCallback(() => {
    rectRef.current = null;
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    if (innerRef.current) {
      innerRef.current.style.transition = inactiveTransition;
      innerRef.current.style.transform = 'translate3d(0px, 0px, 0)';
      // Release GPU layer after interaction ends
      innerRef.current.style.willChange = 'auto';
    }
  }, [inactiveTransition]);

  return (
    <div
      ref={magnetRef}
      className={`relative inline-block ${wrapperClassName}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div
        ref={innerRef}
        className={innerClassName}
        style={{
          transform: 'translate3d(0px, 0px, 0)',
          transition: inactiveTransition,
          willChange: 'auto',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;
