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

function LoaderContent() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isDark } = useTheme();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    window.addEventListener("start-nav-loader", handleStart);
    return () => window.removeEventListener("start-nav-loader", handleStart);
  }, []);

  useEffect(() => {
    if (isLoading) {
      // Small delay to ensure the page renders before we hide the loader
      const t = setTimeout(() => setIsLoading(false), 200);
      return () => clearTimeout(t);
    }
  }, [pathname, searchParams, isLoading]);

  const logoSrc = isDark ? logoDark : logoLight;

  return (
    <div
      className={`fixed inset-0 z-[999999] flex items-center justify-center pointer-events-none transition-all duration-300 ${
        isDark ? "bg-[#090d16]/80" : "bg-[#f8fafc]/80"
      } ${isLoading ? "opacity-100 backdrop-blur-lg visible" : "opacity-0 backdrop-blur-none invisible"}`}
    >
      {isLoading && (
        <div className="flex flex-col items-center justify-center">
          <div className="relative flex h-[168px] w-[168px] items-center justify-center">
            <div className="absolute inset-0 rounded-full animate-spin motion-reduce:animate-none [animation-duration:1.6s] bg-[conic-gradient(from_0deg,transparent_0%,#3b82f6_15%,#0ea5e9_35%,transparent_55%,transparent_100%)] [mask-image:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-3px))] [-webkit-mask-image:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-3px))]"></div>
            <div
              className={`absolute inset-0 rounded-full border-[3px] ${
                isDark ? "border-white/[0.06]" : "border-black/[0.06]"
              }`}
            ></div>
            {DOT_POSITIONS.map(({ top, left, delay }, i) => (
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
  const mounted = React.useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

  if (!mounted) return null;

  return (
    <React.Suspense fallback={null}>
      <LoaderContent />
    </React.Suspense>
  );
}
