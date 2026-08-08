"use client";

import React from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import Magnet from "./Magnet";
import Button from "./Button";
import { EarthIcon } from "lucide-react";
import type { LanguageToggleProps } from "./types";

const OVERLAY_ID = "lang-switch-overlay";
const SHOW_DELAY_MS = 150;
const FADE_MS = 150;

const DOT_POSITIONS = [
  { top: "8%", left: "50%", delay: "0s" },
  { top: "50%", left: "92%", delay: "0.3s" },
  { top: "92%", left: "50%", delay: "0.6s" },
  { top: "50%", left: "8%", delay: "0.9s" },
] as const;

function buildOverlayMarkup(
  newLocale: string,
  logoSrc: string,
  isDark: boolean,
) {
  const dots = DOT_POSITIONS.map(
    ({ top, left, delay }) => `
      <span
        class="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500 to-sky-500 animate-ping motion-reduce:animate-none [animation-delay:${delay}]"
        style="top:${top};left:${left}"
      ></span>`,
  ).join("");

  return `
      <div class="relative flex h-[168px] w-[168px] items-center justify-center">
        <div class="absolute inset-0 rounded-full animate-spin motion-reduce:animate-none [animation-duration:1.6s] bg-[conic-gradient(from_0deg,transparent_0%,#3b82f6_15%,#0ea5e9_35%,transparent_55%,transparent_100%)] [mask-image:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-3px))] [-webkit-mask-image:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-3px))]"></div>
        <div class="absolute inset-0 rounded-full border-[3px] ${isDark ? "border-white/[0.06]" : "border-black/[0.06]"}"></div>
        ${dots}
        <img
          src="${logoSrc}"
          alt="Nexora Solutions"
          class="relative z-10 w-[76px] animate-pulse motion-reduce:animate-none [animation-duration:2.2s] drop-shadow-[0_0_18px_rgba(59,130,246,0.35)]"
        />
      </div>
      <div class="mt-7 flex items-center gap-2 text-[11px] font-semibold uppercase ${newLocale === "ar" ? "tracking-normal" : "tracking-[0.2em]"} ${
        isDark ? "text-slate-400" : "text-slate-500"
      }">
        <span>${newLocale === "ar" ? "جاري التحويل" : "Switching"}</span>
        <span class="h-1 w-1 rounded-full bg-current animate-bounce motion-reduce:animate-none [animation-delay:0s]"></span>
        <span class="h-1 w-1 rounded-full bg-current animate-bounce motion-reduce:animate-none [animation-delay:0.15s]"></span>
        <span class="h-1 w-1 rounded-full bg-current animate-bounce motion-reduce:animate-none [animation-delay:0.3s]"></span>
      </div>
    `;
}

export default function LanguageToggle({
  className = "",
}: LanguageToggleProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const isSwitchingRef = React.useRef(false);
  const showTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const isArabic = locale === "ar";

  // Hide overlay (if present) as soon as the locale actually changes,
  // using transitionend instead of a fixed setTimeout so it's exact.
  React.useEffect(() => {
    // If the nav finished before the overlay was even shown, cancel the pending show.
    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }

    const overlay = document.getElementById(OVERLAY_ID);
    if (!overlay) {
      isSwitchingRef.current = false;
      return;
    }

    const remove = () => {
      if (document.body.contains(overlay)) {
        overlay.remove();
      }
      isSwitchingRef.current = false;
    };

    // If the overlay never got its opacity to 1 (nav was instant), just remove it.
    if (overlay.style.opacity !== "1") {
      remove();
      return;
    }

    overlay.style.transition = `opacity ${FADE_MS}ms ease-in-out`;
    overlay.addEventListener("transitionend", remove, { once: true });
    // Fallback in case transitionend never fires (tab backgrounded, etc.)
    const fallback = setTimeout(remove, FADE_MS + 100);
    overlay.style.opacity = "0";

    return () => {
      overlay.removeEventListener("transitionend", remove);
      clearTimeout(fallback);
    };
  }, [locale]);

  // Failsafe: if the component unmounts for any reason, clean up the DOM!
  React.useEffect(() => {
    return () => {
      const overlay = document.getElementById(OVERLAY_ID);
      if (overlay && document.body.contains(overlay)) {
        overlay.remove();
      }
      isSwitchingRef.current = false;
    };
  }, []);

  const toggleLanguage = () => {
    if (isSwitchingRef.current || document.getElementById(OVERLAY_ID)) return;
    isSwitchingRef.current = true;

    const newLocale = isArabic ? "en" : "ar";
    const pathWithoutLocale = pathname.replace(/^\/(ar|en)/, "");
    const search = typeof window !== "undefined" ? window.location.search : "";
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const newPath = `/${newLocale}${pathWithoutLocale}${search}${hash}`;

    const isDark = document.documentElement.classList.contains("dark");
    const logoSrc = isDark ? "/assets/logo_dark.png" : "/assets/logo.png";

    const overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    overlay.setAttribute("dir", newLocale === "ar" ? "rtl" : "ltr");
    overlay.setAttribute("role", "status");
    overlay.setAttribute("aria-live", "polite");
    overlay.className = `fixed inset-0 z-[999999] flex items-center justify-center pointer-events-none opacity-0 backdrop-blur-lg ${
      isDark ? "bg-[#090d16]/80" : "bg-[#f8fafc]/80"
    }`;
    overlay.style.transition = `opacity ${FADE_MS}ms ease-in-out`;

    const loaderContainer = document.createElement("div");
    loaderContainer.className = "flex flex-col items-center justify-center";
    loaderContainer.innerHTML = buildOverlayMarkup(newLocale, logoSrc, isDark);
    overlay.appendChild(loaderContainer);

    // Only actually attach + fade in the overlay if the navigation is taking
    // noticeably long. Fast navigations never show a loader at all.
    showTimerRef.current = setTimeout(() => {
      document.body.appendChild(overlay);
      requestAnimationFrame(() => {
        overlay.style.opacity = "1";
      });

      // Failsafe: max duration of 5 seconds, after which it forcefully removes the overlay
      // in case navigation got completely stuck or failed on a slow mobile connection.
      setTimeout(() => {
        const el = document.getElementById(OVERLAY_ID);
        if (el && document.body.contains(el)) {
          el.style.opacity = "0";
          setTimeout(() => el.remove(), FADE_MS);
          isSwitchingRef.current = false;
        }
      }, 5000);
    }, SHOW_DELAY_MS);

    // Kick off navigation immediately.
    React.startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <Magnet magnetStrength={8}>
      <Button
        type="button"
        variant="ghost"
        onClick={toggleLanguage}
        aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}
        title={isArabic ? "Switch to English" : "التبديل إلى العربية"}
        className={`group relative flex h-10 w-auto px-3 !py-0 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 shadow-sm transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-md dark:border-slate-700/80 dark:bg-slate-800/80 dark:hover:border-blue-500 max-md:h-9 max-md:px-2.5 ${className}`}
        suppressHydrationWarning
      >
        <span
          className="pointer-events-none absolute inset-0 rounded-full bg-emerald-500/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100 dark:bg-blue-500/20"
          aria-hidden="true"
        />
        <div className="relative flex h-full w-full items-center justify-center gap-1.5 text-[0.8rem] font-bold text-slate-700 dark:text-slate-300">
          <EarthIcon className="h-4 w-4" />
          {isArabic ? (
            <span className="font-sans leading-none">EN</span>
          ) : (
            <span className="font-sans leading-none uppercase pt-[2px]">
              AR
            </span>
          )}
        </div>
      </Button>
    </Magnet>
  );
}
