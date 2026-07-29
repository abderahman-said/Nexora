'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import Magnet from './Magnet';
import Button from './Button';
import type { ThemeToggleProps } from './types';

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme();

    const isDark = theme === 'dark';

    return (
        <Magnet magnetStrength={8}>
            <Button
                type="button"
                variant="ghost"
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className={`group relative flex h-10 w-10 !p-2 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 shadow-sm transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-md dark:border-slate-700/80 dark:bg-slate-800/80 dark:hover:border-blue-500 max-md:h-9 max-md:w-9 ${className}`}
                suppressHydrationWarning
            >
                {/* Ambient glow effect */}
                <span
                    className="pointer-events-none absolute inset-0 rounded-full opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100 dark:bg-blue-500/20 bg-amber-500/20"
                    aria-hidden="true"
                />

                {/* Icons container with flip transition */}
                <div className="relative flex h-5 w-5 items-center justify-center">
                    {/* Sun Icon (Visible in Dark mode) */}
                    <Sun
                        className={`absolute h-5 w-5 text-amber-500 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                            isDark
                                ? 'rotate-0 scale-100 opacity-100'
                                : '-rotate-90 scale-0 opacity-0'
                        }`}
                    />

                    {/* Moon Icon (Visible in Light mode) */}
                    <Moon
                        className={`absolute h-5 w-5 text-blue-600 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] dark:text-blue-400 ${
                            !isDark
                                ? 'rotate-0 scale-100 opacity-100'
                                : 'rotate-90 scale-0 opacity-0'
                        }`}
                    />
                </div>
            </Button>
        </Magnet>
    );
}
