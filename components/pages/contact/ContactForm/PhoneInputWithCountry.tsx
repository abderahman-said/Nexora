'use client';

import React, { useState, useRef, useEffect, useMemo, ChangeEvent } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';
import { COUNTRIES } from '@/lib/COUNTRIES';
import { CountryOption } from '@/types/country';
import Image from 'next/image';

interface CountryFlagIconProps {
    country: CountryOption;
    className?: string;
}

function CountryFlagIcon({ country, className = "w-5 h-3.5" }: CountryFlagIconProps) {
    const [hasError, setHasError] = useState(false);
    const isoCode = country?.iso?.toLowerCase();

    if (isoCode && !hasError) {
        return (
            <Image
                src={`https://flagcdn.com/w40/${isoCode}.png`}
                alt={country.name}
                onError={() => setHasError(true)}
                width={20}
                height={14}
                className={`${className} object-cover rounded-[2px] shrink-0 shadow-sm border border-slate-200/60 dark:border-slate-700/60`}
                loading="lazy"
            />
        );
    }

    return (
        <span className="text-base leading-none shrink-0 inline-block">
            {country?.flag || '🏳️'}
        </span>
    );
}

// Default to Egypt
const EGYPT_COUNTRY = COUNTRIES.find((c) => c.name === "Egypt" && c.code === "+20") || COUNTRIES[0];

export interface PhoneInputChangeEvent {
    target: {
        name: string;
        value: string;
        countryCode: string;
        rawNumber: string;
        phoneLength: number;
    };
}

export interface PhoneInputWithCountryProps {
    label?: string;
    required?: boolean;
    value?: string;
    error?: string;
    onChange?: (e: PhoneInputChangeEvent) => void;
    containerClassName?: string;
}

export default function PhoneInputWithCountry({
    label = 'Phone Number',
    required = false,
    value = '',
    error = '',
    onChange,
    containerClassName = '',
}: PhoneInputWithCountryProps) {
    const [selectedCountry, setSelectedCountry] = useState<CountryOption>(EGYPT_COUNTRY);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Extract subscriber phone number without country code
    const rawNumber = useMemo(() => {
        if (!value) return '';
        if (value.startsWith(selectedCountry.code)) {
            return value.slice(selectedCountry.code.length).trim();
        }
        return value;
    }, [value, selectedCountry.code]);

    // Close menu on outside click or Escape key
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setIsOpen(false);
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
            setTimeout(() => searchInputRef.current?.focus(), 50);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    // Filter countries list by search term
    const filteredCountries = useMemo(() => {
        if (!searchQuery.trim()) return COUNTRIES;
        const q = searchQuery.toLowerCase().trim();
        return COUNTRIES.filter(
            (c) =>
                c.name.toLowerCase().includes(q) ||
                c.code.includes(q)
        );
    }, [searchQuery]);

    const handleSelectCountry = (country: CountryOption) => {
        setSelectedCountry(country);
        setIsOpen(false);
        setSearchQuery('');

        // Trim existing raw number to new country's phone length
        const trimmedRaw = rawNumber.replace(/\s/g, '').slice(0, country.phoneLength);
        const updatedFullValue = trimmedRaw ? `${country.code} ${trimmedRaw}` : `${country.code} `;
        if (onChange) {
            onChange({
                target: {
                    name: 'phone',
                    value: updatedFullValue,
                    countryCode: country.code,
                    rawNumber: trimmedRaw,
                    phoneLength: country.phoneLength,
                },
            });
        }
        inputRef.current?.focus();
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Strip non-digits/spaces and enforce country phone length
        const digitsOnly = e.target.value.replace(/[^0-9]/g, '');
        const capped = digitsOnly.slice(0, selectedCountry.phoneLength);
        const fullValue = capped ? `${selectedCountry.code} ${capped}` : '';
        if (onChange) {
            onChange({
                target: {
                    name: 'phone',
                    value: fullValue,
                    countryCode: selectedCountry.code,
                    rawNumber: capped,
                    phoneLength: selectedCountry.phoneLength,
                },
            });
        }
    };

    return (
        <div className={`space-y-1.5 ${containerClassName}`} ref={dropdownRef}>
            {label && (
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {label} {required && <span className="text-blue-600 dark:text-sky-400">*</span>}
                </label>
            )}

            <div className="relative">
                <div
                    className={`
                        flex items-center w-full rounded-2xl
                        bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white
                        border ${error ? 'border-red-500 focus-within:border-red-500' : 'border-slate-200 dark:border-slate-800 focus-within:border-blue-500 dark:focus-within:border-sky-400'}
                        transition-colors relative
                    `}
                >
                    {/* Country Code Trigger Button / Action Menu Toggle */}
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
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
                            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                                isOpen ? 'rotate-180 text-blue-500 dark:text-sky-400' : ''
                            }`}
                        />
                    </button>

                    {/* Phone Number Text Input */}
                    <div className="relative flex-1 flex items-center">
                        <input
                            ref={inputRef}
                            type="tel"
                            inputMode="numeric"
                            placeholder={`${'X'.repeat(selectedCountry.phoneLength)}`}
                            maxLength={selectedCountry.phoneLength}
                            value={rawNumber}
                            onChange={handleInputChange}
                            className="
                                w-full py-3 px-4 bg-transparent
                                text-xs sm:text-sm font-medium font-mono
                                focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600
                                text-slate-900 dark:text-white rounded-r-2xl
                            "
                        />
                        {/* Digit counter badge */}
                        {rawNumber.length > 0 && (
                            <span
                                className={`absolute right-3 text-[10px] font-bold tabular-nums shrink-0 transition-colors ${
                                    rawNumber.length === selectedCountry.phoneLength
                                        ? 'text-emerald-500 dark:text-emerald-400'
                                        : 'text-slate-400 dark:text-slate-500'
                                }`}
                            >
                                {rawNumber.length}/{selectedCountry.phoneLength}
                            </span>
                        )}
                    </div>
                </div>

                {/* Country Selector Popup / Action Menu */}
                {isOpen && (
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
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="
                                    w-full py-2 pl-9 pr-3 text-xs font-medium
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
                                    const isSelected = country.code === selectedCountry.code && country.name === selectedCountry.name;
                                    return (
                                        <button
                                            key={`${country.name}-${country.code}-${idx}`}
                                            type="button"
                                            onClick={() => handleSelectCountry(country)}
                                            className={`
                                                w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm
                                                transition-colors cursor-pointer group text-left
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
                )}
            </div>

            {error && <p className="text-xs text-red-500 font-medium mt-1">{error}</p>}
        </div>
    );
}
