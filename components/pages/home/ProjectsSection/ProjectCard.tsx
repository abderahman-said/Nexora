"use client";

import { useRef, useEffect, useCallback, MouseEvent } from "react";
import Link from 'next/link';
import OptimizedImage from "@/components/ui/OptimizedImage";
import type { ProjectCardProps } from "./types";
import { useTranslations } from "next-intl";

const MAX_TILT_DEG = 4;
const LIFT_Y = -12;
const DESKTOP_QUERY = "(min-width: 768px)";

export default function ProjectCard({ p }: ProjectCardProps) {
  const t = useTranslations("homeProjects.categories");
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const isDesktopRef = useRef(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const desktopMql = window.matchMedia(DESKTOP_QUERY);
    const motionMql = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncDesktop = () => (isDesktopRef.current = desktopMql.matches);
    const syncMotion = () => (reducedMotionRef.current = motionMql.matches);

    syncDesktop();
    syncMotion();
    desktopMql.addEventListener("change", syncDesktop);
    motionMql.addEventListener("change", syncMotion);

    return () => {
      desktopMql.removeEventListener("change", syncDesktop);
      motionMql.removeEventListener("change", syncMotion);
    };
  }, []);

  const canAnimate = () => isDesktopRef.current && !reducedMotionRef.current;

  const handleMouseEnter = useCallback(() => {
    if (!canAnimate() || !cardRef.current) return;
    rectRef.current = cardRef.current.getBoundingClientRect();
    
    // Equivalent to power3.out
    cardRef.current.style.transition = "transform 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)";
    cardRef.current.style.transform = `perspective(800px) translateY(${LIFT_Y}px) rotateX(0deg) rotateY(0deg)`;
    
    if (glareRef.current) {
      glareRef.current.style.transition = "opacity 0.3s ease-out";
      glareRef.current.style.opacity = "1";
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!canAnimate() || !rectRef.current || !cardRef.current) return;
    const rect = rectRef.current;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const rotateY = ((px - rect.width / 2) / (rect.width / 2)) * MAX_TILT_DEG;
    const rotateX = ((py - rect.height / 2) / (rect.height / 2)) * -MAX_TILT_DEG;

    // Equivalent to power2.out
    cardRef.current.style.transition = "transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    cardRef.current.style.transform = `perspective(800px) translateY(${LIFT_Y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    if (glareRef.current) {
      glareRef.current.style.setProperty("--glare-x", `${(px / rect.width) * 100}%`);
      glareRef.current.style.setProperty("--glare-y", `${(py / rect.height) * 100}%`);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!canAnimate() || !cardRef.current) return;
    
    cardRef.current.style.transition = "transform 0.4s cubic-bezier(0.215, 0.61, 0.355, 1)";
    cardRef.current.style.transform = `perspective(800px) translateY(0px) rotateX(0deg) rotateY(0deg)`;
    
    if (glareRef.current) {
      glareRef.current.style.transition = "opacity 0.3s ease-out";
      glareRef.current.style.opacity = "0";
    }
    rectRef.current = null;
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="animate-as-card proj-3d-card group/3d relative h-full w-full cursor-pointer py-2 sm:py-3 md:py-4 will-change-transform hover:z-50"
      style={{ transformStyle: "preserve-3d", transformOrigin: "50% 50%", transform: "perspective(800px)" }}
    >
      <Link
        href={p.link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        suppressHydrationWarning
        className="group relative block h-[410px] sm:h-[480px] md:h-[540px] lg:h-[600px] flex-shrink-0 overflow-hidden rounded-[20px] sm:rounded-[24px] md:rounded-[26px] border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg dark:shadow-black/30 transition-[border-color,box-shadow,background-color,transform] duration-500 ease-out max-lg:w-full lg:even:mt-6 group-hover/3d:border-blue-500/70 dark:group-hover/3d:border-blue-400/70 group-hover/3d:shadow-[0_32px_65px_-15px_rgba(37,99,235,0.32)] dark:group-hover/3d:shadow-[0_32px_65px_-15px_rgba(0,0,0,0.85)]"
      >
        {/* Full-bleed project image */}
        <div className="absolute inset-0 z-0 block h-full w-full overflow-hidden">
          <OptimizedImage
            className="card-img absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.09]"
            src={p.image}
            alt={p.name || ""}
            width={600}
            height={450}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
            quality={80}
          />

          {/* Gradient overlay */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[180px] sm:h-[200px] md:h-[230px] z-[2] bg-gradient-to-t from-white via-white/75 via-45% to-transparent dark:from-slate-950 dark:via-slate-950/85 dark:via-45% dark:to-transparent"
          />
        </div>

        {/* Content overlaid at the bottom */}
        <div className="relative z-[3] flex h-full flex-col justify-end gap-2 sm:gap-3 px-5 py-3 sm:px-6  md:px-7 md:py-4 pointer-events-none">
          <h3 className="m-0 mb-1.5 sm:mb-2 text-[clamp(19px,4vw,28px)] font-black leading-[1.18] tracking-[-0.03em] text-slate-900 dark:text-white transition-colors duration-300 group-hover/3d:text-blue-600 dark:group-hover/3d:text-blue-300">
            {p.name}
          </h3>
          <p className="mb-2 sm:mb-3 text-[0.68rem] sm:text-[0.75rem] font-bold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300">
            {t(p.category.replace(/ /g, "_").replace(/-/g, "_").toLowerCase())}
          </p>
        </div>

        {/* Cursor-tracking glare */}
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[4] rounded-[20px] sm:rounded-[24px] md:rounded-[26px] opacity-0 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.25), transparent 60%)",
            mixBlendMode: "overlay",
          }}
        />
      </Link>
    </div>
  );
}
