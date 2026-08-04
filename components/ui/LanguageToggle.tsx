'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Magnet from './Magnet';
import Button from './Button';
import { EarthIcon } from 'lucide-react';
import type { LanguageToggleProps } from './types';

const OVERLAY_ID = 'lang-switch-overlay';
const ROUTE_DELAY_MS = 400; // time before navigating, lets the overlay fade in first
const FADE_OUT_MS = 500; // time to fade the overlay out once the new locale is ready

const DOT_POSITIONS = [
    { top: '8%', left: '50%', delay: '0s' },
    { top: '50%', left: '92%', delay: '0.3s' },
    { top: '92%', left: '50%', delay: '0.6s' },
    { top: '50%', left: '8%', delay: '0.9s' },
] as const;

/** Builds the loader markup shown while the locale is switching. Pure Tailwind, no injected <style>. */
function buildOverlayMarkup(newLocale: string, logoSrc: string, isDark: boolean) {
    const dots = DOT_POSITIONS.map(
        ({ top, left, delay }) => `
      <span
        class="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500 to-sky-500 animate-ping motion-reduce:animate-none [animation-delay:${delay}]"
        style="top:${top};left:${left}"
      ></span>`
    ).join('');

    return `
      <div class="relative flex h-[168px] w-[168px] items-center justify-center">
        <div class="absolute inset-0 rounded-full animate-spin motion-reduce:animate-none [animation-duration:1.6s] bg-[conic-gradient(from_0deg,transparent_0%,#3b82f6_15%,#0ea5e9_35%,transparent_55%,transparent_100%)] [mask-image:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-3px))] [-webkit-mask-image:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-3px))]"></div>
        <div class="absolute inset-0 rounded-full border-[3px] ${isDark ? 'border-white/[0.06]' : 'border-black/[0.06]'}"></div>
        ${dots}
        <img
          src="${logoSrc}"
          alt="Nexora Solutions"
          class="relative z-10 w-[76px] animate-pulse motion-reduce:animate-none [animation-duration:2.2s] drop-shadow-[0_0_18px_rgba(59,130,246,0.35)]"
        />
      </div>
      <div class="mt-7 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] ${
          isDark ? 'text-slate-400' : 'text-slate-500'
      }">
        <span>${newLocale === 'ar' ? 'جاري التحويل' : 'Switching'}</span>
        <span class="h-1 w-1 rounded-full bg-current animate-bounce motion-reduce:animate-none [animation-delay:0s]"></span>
        <span class="h-1 w-1 rounded-full bg-current animate-bounce motion-reduce:animate-none [animation-delay:0.15s]"></span>
        <span class="h-1 w-1 rounded-full bg-current animate-bounce motion-reduce:animate-none [animation-delay:0.3s]"></span>
      </div>
    `;
}

export default function LanguageToggle({ className = '' }: LanguageToggleProps) {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const isSwitchingRef = React.useRef(false);

    const isArabic = locale === 'ar';

    // Once the new locale route has loaded, fade the overlay out and remove it.
    // The overlay lives outside the React tree (appended to <body>) so it survives
    // any remount of this component caused by the locale segment changing.
    React.useEffect(() => {
        const overlay = document.getElementById(OVERLAY_ID);
        if (!overlay) return;

        overlay.style.opacity = '0';
        const removeTimeout = setTimeout(() => {
            overlay.remove();
            isSwitchingRef.current = false;
        }, FADE_OUT_MS);

        return () => clearTimeout(removeTimeout);
    }, [locale]);

    const toggleLanguage = () => {
        // Guard against double-triggering while a switch is already in progress.
        if (isSwitchingRef.current || document.getElementById(OVERLAY_ID)) return;
        isSwitchingRef.current = true;

        const newLocale = isArabic ? 'en' : 'ar';
        const pathWithoutLocale = pathname.replace(/^\/(ar|en)/, '');
        const newPath = `/${newLocale}${pathWithoutLocale}`;

        const isDark = document.documentElement.classList.contains('dark');
        const logoSrc = isDark ? '/assets/logo_dark.PNG' : '/assets/logo.png';

        const overlay = document.createElement('div');
        overlay.id = OVERLAY_ID;
        overlay.setAttribute('dir', newLocale === 'ar' ? 'rtl' : 'ltr');
        overlay.setAttribute('role', 'status');
        overlay.setAttribute('aria-live', 'polite');
        overlay.className = `fixed inset-0 z-[999999] flex items-center justify-center pointer-events-none opacity-0 backdrop-blur-lg transition-opacity duration-500 ease-in-out ${
            isDark ? 'bg-[#090d16]/80' : 'bg-[#f8fafc]/80'
        }`;

        const loaderContainer = document.createElement('div');
        loaderContainer.className = 'flex flex-col items-center justify-center';
        loaderContainer.innerHTML = buildOverlayMarkup(newLocale, logoSrc, isDark);

        overlay.appendChild(loaderContainer);
        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
        });

        setTimeout(() => {
            router.push(newPath);
        }, ROUTE_DELAY_MS);
    };

    return (
        <Magnet magnetStrength={8}>
            <Button
                type="button"
                variant="ghost"
                onClick={toggleLanguage}
                aria-label={isArabic ? 'Switch to English' : 'التبديل إلى العربية'}
                title={isArabic ? 'Switch to English' : 'التبديل إلى العربية'}
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
                        <span className="font-sans leading-none uppercase pt-[2px]">AR</span>
                    )}
                </div>
            </Button>
        </Magnet>
    );
}