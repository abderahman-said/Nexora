"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

import logoLight from "@/public/assets/logo.png";
import logoDark from "@/public/assets/logo_dark.png";

const DOT_POSITIONS = [
  { top: "8%", left: "50%", delay: "0s" },
  { top: "50%", left: "92%", delay: "0.3s" },
  { top: "92%", left: "50%", delay: "0.6s" },
  { top: "50%", left: "8%", delay: "0.9s" },
] as const;

// How long the loader must stay visible before we bother rendering the
// heavier dot-ping animations. Fast navigations never reach this, so the
// heaviest part of the loader simply never renders for most clicks.
const DOTS_APPEAR_AFTER_MS = 300;

function LoaderContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [showDots, setShowDots] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isDark } = useTheme();

  const targetPathnameRef = React.useRef<string | null>(null);

  useEffect(() => {
    const handleStart = () => {
      targetPathnameRef.current = pathname;
      setIsLoading(true);
    };

    const handleGlobalClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore external links, mailto/tel, hash links, target="_blank", or download links
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      // Check if it's an internal route that actually changes the pathname
      try {
        const url = new URL(anchor.href, window.location.origin);
        if (
          url.origin === window.location.origin &&
          url.pathname !== window.location.pathname
        ) {
          handleStart();
        }
      } catch {}
    };

    window.addEventListener("start-nav-loader", handleStart);
    document.addEventListener("click", handleGlobalClick, { capture: true });

    return () => {
      window.removeEventListener("start-nav-loader", handleStart);
      document.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, [pathname]);

  useEffect(() => {
    if (isLoading) {
      // Hide loader ONLY when pathname actually changes away from the initial route
      if (
        targetPathnameRef.current !== null &&
        pathname !== targetPathnameRef.current
      ) {
        const t = setTimeout(() => {
          setIsLoading(false);
          targetPathnameRef.current = null;
        }, 150);
        return () => clearTimeout(t);
      } else {
        // Safety timeout (3.5s) if navigation is cancelled or stays on same route
        const safety = setTimeout(() => {
          setIsLoading(false);
          targetPathnameRef.current = null;
        }, 3500);
        return () => clearTimeout(safety);
      }
    }
  }, [pathname, searchParams, isLoading]);

  // Only mount the ping dots once the loader has been visible for a bit.
  useEffect(() => {
    if (!isLoading) return;
    const t = setTimeout(() => setShowDots(true), DOTS_APPEAR_AFTER_MS);
    // Reset in the cleanup, not synchronously in the effect body, so the
    // reset only fires when isLoading actually flips back to false (or on
    // unmount) instead of running as a direct top-level setState call.
    return () => {
      clearTimeout(t);
      setShowDots(false);
    };
  }, [isLoading]);

  const logoSrc = isDark ? logoDark : logoLight;

  return (
    <div
      className={`fixed inset-0 z-[999999] flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
        isDark ? "bg-[#090d16]/95" : "bg-[#f8fafc]/95"
      } ${isLoading ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      {isLoading && (
        <div className="flex flex-col items-center justify-center">
          <div className="relative flex h-[168px] w-[168px] items-center justify-center">
            {/*
              Spinner rebuilt without mask-image / -webkit-mask-image.
              On iOS Safari, a masked element that is also being rotated via
              animate-spin gets re-rasterized on the CPU every frame instead
              of being handed to the GPU compositor like a plain transform.
              A border-based conic spinner gives a very similar look while
              staying fully GPU-composited.
            */}
            <div
              className="absolute inset-0 rounded-full animate-spin motion-reduce:animate-none [animation-duration:1.6s]
                border-[3px] border-transparent border-t-blue-500 border-r-sky-500"
            ></div>
            <div
              className={`absolute inset-0 rounded-full border-[3px] ${
                isDark ? "border-white/[0.06]" : "border-black/[0.06]"
              }`}
            ></div>
            {showDots &&
              DOT_POSITIONS.map(({ top, left, delay }, i) => (
                <span
                  key={i}
                  className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500 to-sky-500 animate-ping motion-reduce:animate-none"
                  style={{ top, left, animationDelay: delay }}
                ></span>
              ))}
            <Image
              src={logoSrc}
              alt="Loading"
              className="relative z-10 w-[76px] animate-pulse motion-reduce:animate-none [animation-duration:2.2s] drop-shadow-[0_0_18px_rgba(59,130,246,0.35)]"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function GlobalNavigationLoader() {
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!mounted) return null;

  return (
    <React.Suspense fallback={null}>
      <LoaderContent />
    </React.Suspense>
  );
}