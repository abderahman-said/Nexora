'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
    theme: 'light',
    setTheme: () => {},
    toggleTheme: () => {},
    isDark: false,
});

export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedTheme = localStorage.getItem('nexora-theme');
        if (storedTheme) {
            setThemeState(storedTheme);
            applyTheme(storedTheme);
        } else {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initialTheme = systemPrefersDark ? 'dark' : 'light';
            setThemeState(initialTheme);
            applyTheme(initialTheme);
        }
    }, []);

    const applyTheme = (newTheme) => {
        const root = document.documentElement;
        if (newTheme === 'dark') {
            root.classList.add('dark');
            root.classList.remove('light');
            root.style.colorScheme = 'dark';
        } else {
            root.classList.add('light');
            root.classList.remove('dark');
            root.style.colorScheme = 'light';
        }
    };

    const setTheme = (newTheme) => {
        setThemeState(newTheme);
        localStorage.setItem('nexora-theme', newTheme);
        applyTheme(newTheme);
    };

    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
    };

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
