"use client";
import React, { useState, useRef, useCallback, MouseEvent } from 'react';
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
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const magnetRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (magnetRef.current) {
      rectRef.current = magnetRef.current.getBoundingClientRect();
    }
  }, []);

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

    setIsActive(true);
    setPosition({ x: offsetX, y: offsetY });
  }, [disabled, magnetStrength]);

  const handleMouseLeave = useCallback(() => {
    rectRef.current = null;
    setIsActive(false);
    setPosition({ x: 0, y: 0 });
  }, []);

  const transitionStyle = isActive ? activeTransition : inactiveTransition;

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
        className={`will-change-transform ${innerClassName}`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: transitionStyle
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;
