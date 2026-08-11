"use client";

import React, { useRef, useEffect, MouseEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { InteractiveCircleButtonProps } from "./types";

export function InteractiveCircleButton({ href, children }: InteractiveCircleButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);
  const isHoveredRef = useRef(false);

  // Pending animation references so we can cancel them
  const circleAnimRef = useRef<Animation | null>(null);
  const buttonAnimRef = useRef<Animation | null>(null);

  // Lerp state for magnetic effect - keep in ref to avoid mutation errors during render
  const lerpRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const rafRef = useRef<number | null>(null);

  const resetButton = () => {
    if (buttonRef.current) buttonRef.current.style.transform = "";
    if (circleRef.current) {
      circleRef.current.style.opacity = "0";
      circleRef.current.style.transform = "translate(-50%, -50%) scale(0)";
    }
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    isHoveredRef.current = false;
  };

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible" && isHoveredRef.current) resetButton();
    };
    const handleFocus = () => {
      if (isHoveredRef.current) resetButton();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", handleFocus);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", handleFocus);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    const btn = buttonRef.current;
    const circle = circleRef.current;
    if (!btn || !circle) return;
    isHoveredRef.current = true;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.opacity = "1";

    circleAnimRef.current?.cancel();
    circleAnimRef.current = circle.animate(
      [
        { transform: "translate(-50%, -50%) scale(0)" },
        { transform: "translate(-50%, -50%) scale(2.8)" },
      ],
      { duration: 450, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" },
    );
  };

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const lerp = lerpRef.current;
    
    lerp.tx = (e.clientX - rect.left - rect.width / 2) * 0.18;
    lerp.ty = (e.clientY - rect.top - rect.height / 2) * 0.18;

    if (rafRef.current !== null) return;
    const tick = () => {
      lerp.x += (lerp.tx - lerp.x) * 0.22;
      lerp.y += (lerp.ty - lerp.y) * 0.22;
      if (buttonRef.current) {
        buttonRef.current.style.transform = `translate(${lerp.x.toFixed(2)}px, ${lerp.y.toFixed(2)}px)`;
      }
      if (Math.abs(lerp.tx - lerp.x) > 0.1 || Math.abs(lerp.ty - lerp.y) > 0.1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const handleMouseLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    const btn = buttonRef.current;
    const circle = circleRef.current;
    if (!btn || !circle) return;
    isHoveredRef.current = false;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Cancel expand, animate collapse from cursor exit point
    circleAnimRef.current?.cancel();
    const currentScale = parseFloat(
      (circle.style.transform.match(/scale\(([^)]+)\)/) || ["", "0"])[1],
    ) || 0;

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    circleAnimRef.current = circle.animate(
      [
        { transform: `translate(-50%, -50%) scale(${currentScale})` },
        { transform: "translate(-50%, -50%) scale(0)" },
      ],
      { duration: 400, easing: "ease-in", fill: "forwards" },
    );
    circleAnimRef.current.onfinish = () => {
      if (circle) circle.style.opacity = "0";
    };

    // Spring-back magnetic offset
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    buttonAnimRef.current?.cancel();
    
    const lerp = lerpRef.current;
    const startX = lerp.x;
    const startY = lerp.y;
    
    buttonAnimRef.current = btn.animate(
      [
        { transform: `translate(${startX.toFixed(2)}px, ${startY.toFixed(2)}px)` },
        { transform: "translate(0px, 0px)" },
      ],
      { duration: 600, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)", fill: "forwards" },
    );
    buttonAnimRef.current.onfinish = () => {
      lerp.x = 0;
      lerp.y = 0;
      if (btn) btn.style.transform = "";
    };
  };

  return (
    <Link
      ref={buttonRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={typeof children === "string" ? children : "Contact Us"}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-36 w-36 flex-col items-center justify-center rounded-full border border-slate-300 dark:border-white/25 bg-white dark:bg-white/5 backdrop-blur-sm overflow-hidden text-slate-900 dark:text-white shadow-xl cursor-pointer group transition-[border-color,box-shadow] duration-300 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
    >
      <span
        ref={circleRef}
        style={{ opacity: 0, transform: "translate(-50%, -50%) scale(0)" }}
        className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 dark:from-blue-600 dark:via-indigo-600 dark:to-cyan-400 pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-[0_0_30px_rgba(59,130,246,0.3)] dark:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
        aria-hidden="true"
      />

      <span className="relative z-10 flex flex-col items-center gap-1.5 pointer-events-none select-none">
        <span className="text-base md:text-lg font-bold tracking-wide text-slate-800 dark:text-slate-100 group-hover:text-white transition-colors duration-300">
          {children}
        </span>
        <ArrowUpRight className="h-5 w-5 text-blue-600 rtl:scale-x-[-1] dark:text-blue-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-[color,transform] duration-300" />
      </span>
    </Link>
  );
}