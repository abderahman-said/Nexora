import React from 'react';
import { Search, Check } from 'lucide-react';
import CountryFlagIcon from './CountryFlagIcon';
import { CountrySelectorDropdownProps } from './types';

export default function CountrySelectorDropdown({
    searchInputRef,
    searchQuery,
    onSearchChange,
    filteredCountries,
    selectedCountry,
    onSelectCountry,
}: CountrySelectorDropdownProps) {
    return (
        <div
            className="
                absolute top-full left-0 mt-2 w-72 sm:w-80 max-h-80 z-50
                bg-white dark:bg-[#0d1222]
                border border-slate-200/90 dark:border-slate-800
                rounded-2xl shadow-2xl shadow-slate-950/20 dark:shadow-black/60
                p-2.5 flex flex-col gap-2 backdrop-blur-xl
                animate-in fade-in zoom-in-95 duration-150
            "
        >
            {/* Search Bar Input */}
            <div className="relative shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search country or code..."
                    value={searchQuery}
                    onChange={onSearchChange}
                    className="
                        w-full py-2 ps-9 pe-3 text-xs font-medium
                        bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white
                        border border-slate-200 dark:border-slate-800 rounded-xl
                        focus:outline-none focus:border-blue-500 dark:focus:border-sky-400
                    "
                />
            </div>

            {/* Scrollable Country List Container */}
            <div
                className="
                    overflow-y-auto max-h-60 min-h-0 space-y-1 pr-1
                    scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700
                "
                style={{
                    maxHeight: '240px',
                    overflowY: 'auto',
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                {filteredCountries.length > 0 ? (
                    filteredCountries.map((country, idx) => {
                        const isSelected = country.iso === selectedCountry.iso;
                        return (
                            <button
                                key={`${country.name}-${country.code}-${idx}`}
                                type="button"
                                onClick={() => onSelectCountry(country)}
                                className={`
                                    w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm
                                    transition-colors cursor-pointer group  
                                    ${
                                        isSelected
                                            ? 'bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800/80 font-bold'
                                            : 'hover:bg-slate-100 dark:hover:bg-slate-800/60'
                                    }
                                `}
                            >
                                <div className="flex items-center gap-2.5 truncate">
                                    <CountryFlagIcon country={country} className="w-5 h-3.5" />
                                    <span className="text-slate-800 dark:text-slate-200 truncate font-semibold">
                                        {country.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <span className="font-mono font-bold text-blue-600 dark:text-sky-400 text-xs">
                                        {country.code}
                                    </span>
                                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />}
                                </div>
                            </button>
                        );
                    })
                ) : (
                    <div className="py-4 text-center text-xs text-slate-400">
                        No country found
                    </div>
                )}
            </div>
        </div>
    );
}