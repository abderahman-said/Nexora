'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Magnet from './Magnet';
import Button from './Button';
import { EarthIcon } from 'lucide-react';
import type { LanguageToggleProps } from './types';

export default function LanguageToggle({ className = '' }: LanguageToggleProps) {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const isArabic = locale === 'ar';

    const toggleLanguage = () => {
        const newLocale = isArabic ? 'en' : 'ar';
        
        // Remove current locale from pathname if present
        const pathWithoutLocale = pathname.replace(/^\/(ar|en)/, '');
        const newPath = `/${newLocale}${pathWithoutLocale}`;
        
        router.push(newPath);
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
                {/* Ambient glow effect */}
                <span
                    className="pointer-events-none absolute inset-0 rounded-full opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100 dark:bg-blue-500/20 bg-emerald-500/20"
                    aria-hidden="true"
                />

                {/* Text container */}
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
