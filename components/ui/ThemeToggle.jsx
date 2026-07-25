'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import Magnet from './Magnet';

export default function ThemeToggle({ className = '' }) {
    const { theme, toggleTheme, mounted } = useTheme();

    const isDark = theme === 'dark';

    return (
        <Magnet padding={15} magnetStrength={8}>
            <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className={`group relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 p-2 shadow-sm transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:shadow-md dark:border-slate-700/80 dark:bg-slate-800/80 dark:hover:border-blue-500 max-md:h-9 max-md:w-9 ${className}`}
                suppressHydrationWarning
            >
                {/* Ambient glow effect */}
                <span
                    className="pointer-events-none absolute inset-0 rounded-full opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100 dark:bg-blue-500/20 bg-amber-500/20"
                    aria-hidden="true"
                />

                {/* Icons container with flip transition */}
                <div className="relative flex h-5 w-5 items-center justify-center">
                    {/* Sun Icon (shown in dark mode to switch to light mode, or indicates light mode state) */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`absolute h-5 w-5 text-amber-500 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                            mounted && isDark
                                ? 'rotate-0 scale-100 opacity-100'
                                : '-rotate-90 scale-0 opacity-0'
                        }`}
                    >
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2" />
                        <path d="M12 20v2" />
                        <path d="m4.93 4.93 1.41 1.41" />
                        <path d="m17.66 17.66 1.41 1.41" />
                        <path d="M2 12h2" />
                        <path d="M20 12h2" />
                        <path d="m6.34 17.66-1.41 1.41" />
                        <path d="m19.07 4.93-1.41 1.41" />
                    </svg>

                    {/* Moon Icon (shown in light mode to switch to dark mode) */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`absolute h-5 w-5 text-blue-600 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] dark:text-blue-400 ${
                            mounted && !isDark
                                ? 'rotate-0 scale-100 opacity-100'
                                : 'rotate-90 scale-0 opacity-0'
                        }`}
                    >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                    </svg>
                </div>
            </button>
        </Magnet>
    );
}
