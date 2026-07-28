"use client";

import { useRef, useEffect, useCallback, MouseEvent } from "react";
import Link from "next/link";
import gsap from "gsap";
import OptimizedImage from "@/components/ui/OptimizedImage";

const MAX_TILT_DEG = 4;
const LIFT_Y = -12;
const HOVER_SCALE = 1.08;
const DESKTOP_QUERY = "(min-width: 768px)";

export interface Project {
  id: string;
  name: string;
  category?: string;
  image: string;
  skills?: string[];
  link?: string;
  accent?: string;
}

export interface ProjectCardProps {
  p: Project;
}

export default function ProjectCard({ p }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const isDesktopRef = useRef(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    gsap.set(card, { transformPerspective: 800, transformOrigin: "50% 50%" });

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
      if (card) gsap.killTweensOf(card);
      if (glare) gsap.killTweensOf(glare);
    };
  }, []);

  const canAnimate = () => isDesktopRef.current && !reducedMotionRef.current;

  const handleMouseEnter = useCallback(() => {
    if (!canAnimate() || !cardRef.current) return;
    rectRef.current = cardRef.current.getBoundingClientRect();
    gsap.to(cardRef.current, {
      y: LIFT_Y,
      scale: HOVER_SCALE,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });
    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power1.out",
        overwrite: "auto",
      });
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!canAnimate() || !rectRef.current || !cardRef.current) return;
    const rect = rectRef.current;
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const rotateY = ((px - rect.width / 2) / (rect.width / 2)) * MAX_TILT_DEG;
    const rotateX = ((py - rect.height / 2) / (rect.height / 2)) * -MAX_TILT_DEG;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (glareRef.current) {
      glareRef.current.style.setProperty("--glare-x", `${(px / rect.width) * 100}%`);
      glareRef.current.style.setProperty("--glare-y", `${(py / rect.height) * 100}%`);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!canAnimate() || !cardRef.current) return;
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });
    if (glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power1.out",
        overwrite: "auto",
      });
    }
    rectRef.current = null;
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="proj-3d-card group/3d relative h-full w-full cursor-pointer py-2 sm:py-3 md:py-4 will-change-transform hover:z-50"
      style={{ transformStyle: "preserve-3d" }}
    >
      <article
        suppressHydrationWarning
        className="group relative h-[410px] sm:h-[480px] md:h-[540px] lg:h-[600px] flex-shrink-0 overflow-hidden rounded-[20px] sm:rounded-[24px] md:rounded-[26px] border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg dark:shadow-black/30 transition-[border-color,box-shadow,background-color,transform] duration-500 ease-out max-lg:w-full lg:even:mt-6 group-hover/3d:border-blue-500/70 dark:group-hover/3d:border-blue-400/70 group-hover/3d:shadow-[0_32px_65px_-15px_rgba(37,99,235,0.32)] dark:group-hover/3d:shadow-[0_32px_65px_-15px_rgba(0,0,0,0.85)]"
      >
        {/* Full-bleed project image */}
        <Link
          href={p.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-0 block h-full w-full overflow-hidden"
          aria-label={`View ${p.name}`}
        >
          {p.id && (
            <span className="absolute left-3.5 top-3.5 sm:left-4 sm:top-4 z-[3] rounded-full bg-white/95 dark:bg-slate-950/90 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-bold tracking-[0.14em] text-slate-900 dark:text-white backdrop-blur-md border border-slate-200/90 dark:border-white/15 shadow-sm">
              {p.id}
            </span>
          )}
          {p.category && (
            <span className="absolute right-3.5 top-3.5 sm:right-4 sm:top-4 z-[3] inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white/95 dark:bg-slate-950/90 px-2.5 py-0.5 sm:px-3.5 sm:py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.1em] text-slate-900 dark:text-white shadow-sm border border-slate-200/90 dark:border-white/15 backdrop-blur-md">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full shrink-0 animate-pulse" style={{ backgroundColor: p.accent || "#3b82f6" }} />
              {p.category}
            </span>
          )}

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
        </Link>

        {/* Content overlaid at the bottom */}
        <div className="relative z-[3] flex h-full flex-col justify-end gap-2 sm:gap-3 px-5 py-5 sm:px-6 sm:py-6 md:px-7 md:py-7">
          <div suppressHydrationWarning>
            <h3 className="m-0 mb-1.5 sm:mb-2 text-[clamp(19px,4vw,28px)] font-black leading-[1.18] tracking-[-0.03em] text-slate-900 dark:text-white transition-colors duration-300 group-hover/3d:text-blue-600 dark:group-hover/3d:text-blue-300">
              {p.name}
            </h3>
            <p className="mb-2 sm:mb-3 text-[0.68rem] sm:text-[0.75rem] font-bold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300">
              {p.category}
            </p>
            <div className="mb-2.5 sm:mb-3.5 h-px w-full bg-slate-200 dark:bg-white/20" />
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {(p.skills || []).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 dark:border-white/20 bg-slate-100/90 dark:bg-white/10 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-semibold tracking-[0.06em] text-slate-700 dark:text-slate-200 backdrop-blur-md transition-all duration-300 group-hover:border-slate-300 dark:group-hover:border-white/40 group-hover:bg-slate-200 dark:group-hover:bg-white/20 group-hover:text-slate-900 dark:group-hover:text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
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
      </article>
    </div>
  );
}
