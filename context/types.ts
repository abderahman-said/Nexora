export type Language = 'en' | 'ar';

export interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
    mounted: boolean;
}

export type Theme = 'dark' | 'light';

export interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    isDark: boolean;
    mounted: boolean;
}
