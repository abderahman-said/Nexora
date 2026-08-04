
import React from 'react';
import { ChevronDown } from 'lucide-react';
import CountryFlagIcon from './CountryFlagIcon';
import { CountryCodeButtonProps } from './types';

export default function CountryCodeButton({ selectedCountry, isOpen, onClick }: CountryCodeButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-expanded={isOpen}
            aria-label="Select Country Code"
            className="
                flex items-center gap-2 px-3.5 py-3
                border-r border-slate-200 dark:border-slate-800
                hover:bg-slate-200/50 dark:hover:bg-slate-800/60
                rounded-l-2xl transition-colors shrink-0
                text-slate-900 dark:text-white font-semibold text-xs sm:text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500/30
            "
        >
            <CountryFlagIcon country={selectedCountry} className="w-5 h-3.5" />
            <span className="font-mono font-bold text-xs sm:text-sm">{selectedCountry.code}</span>
            <ChevronDown
                className={`w-3.5  rtl:scale-x-[-1] h-3.5 text-slate-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-500 dark:text-sky-400' : ''
                }`}
            />
        </button>
    );
}