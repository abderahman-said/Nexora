'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
    mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    setLanguage: () => {},
    toggleLanguage: () => {},
    mounted: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');
    const [mounted, setMounted] = useState<boolean>(false);

    const applyLanguage = (newLang: Language) => {
        const root = document.documentElement;
        if (newLang === 'ar') {
            root.setAttribute('lang', 'ar');
            root.setAttribute('dir', 'rtl');
        } else {
            root.setAttribute('lang', 'en');
            root.setAttribute('dir', 'ltr');
        }
    };

    useEffect(() => {
        const storedLanguage = localStorage.getItem('nexora-language') as Language | null;
        const initialLanguage = storedLanguage === 'ar' ? 'ar' : 'en';
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLanguageState(initialLanguage);
        applyLanguage(initialLanguage);
        setMounted(true);
    }, []);

    const setLanguage = (newLang: Language) => {
        setLanguageState(newLang);
        localStorage.setItem('nexora-language', newLang);
        applyLanguage(newLang);
    };

    const toggleLanguage = () => {
        const nextLang = language === 'en' ? 'ar' : 'en';
        setLanguage(nextLang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, mounted }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
