'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useSyncExternalStore, ReactNode } from 'react';
import type { Theme, ThemeContextType } from './types';

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    setTheme: () => {},
    toggleTheme: () => {},
    isDark: true,
    mounted: false,
});

// Apply theme directly to DOM without React re-render
function applyThemeToDom(newTheme: Theme) {
    const root = document.documentElement;
    // Freeze all transitions across the page instantly
    root.classList.add('theme-switching');
    if (newTheme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
        root.style.colorScheme = 'dark';
    } else {
        root.classList.add('light');
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
    }
    // Unfreeze after the browser has painted the new theme
    requestAnimationFrame(() => {
        root.classList.remove('theme-switching');
    });
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('nexora-theme');
            if (storedTheme === 'light' || storedTheme === 'dark') {
                return storedTheme;
            }
            if (document.documentElement.classList.contains('light')) {
                return 'light';
            }
        }
        return 'dark';
    });
    const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

    useEffect(() => {
        const storedTheme = localStorage.getItem('nexora-theme') as Theme | null;
        if (storedTheme === 'light' || storedTheme === 'dark') {
            applyThemeToDom(storedTheme);
        }
    }, []);

    const setTheme = useCallback((newTheme: Theme) => {
        // 1. Apply DOM change instantly (zero React overhead)
        applyThemeToDom(newTheme);
        // 2. Persist to localStorage
        localStorage.setItem('nexora-theme', newTheme);
        // 3. Update React state (for components that read from context)
        setThemeState(newTheme);
    }, []);

    const toggleTheme = useCallback(() => {
        const root = document.documentElement;
        const currentTheme = root.classList.contains('dark') ? 'dark' : 'light';
        const nextTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
    }, [setTheme]);

    const isDark = theme === 'dark';

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark, mounted }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
