'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import Button from './Button';
import type { ThemeToggleProps } from './types';

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme();

    const isDark = theme === 'dark';

    return (
        <Button
            type="button"
            variant="ghost"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`group relative flex h-8 w-8 md:h-10 md:w-10 !p-2 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 shadow-sm hover:border-blue-400 hover:shadow-md dark:border-slate-700/80 dark:bg-slate-800/80 dark:hover:border-blue-500 max-md:h-9 max-md:w-9 ${className}`}
            suppressHydrationWarning
        >
            {/* Icons container */}
            <div className="relative flex h-5 w-5 items-center justify-center">
                {/* Sun Icon (Visible in Dark mode) */}
                <Sun
                    className={`absolute h-5 w-5 text-amber-500 transition-[opacity,transform] duration-150 ${
                        isDark
                            ? 'rotate-0 scale-100 opacity-100'
                            : '-rotate-90 scale-0 opacity-0'
                    }`}
                />

                {/* Moon Icon (Visible in Light mode) */}
                <Moon
                    className={`absolute h-5 w-5 text-blue-600 transition-[opacity,transform] duration-150 dark:text-blue-400 ${
                        !isDark
                            ? 'rotate-0 scale-100 opacity-100'
                            : 'rotate-90 scale-0 opacity-0'
                    }`}
                />
            </div>
        </Button>
    );
}

