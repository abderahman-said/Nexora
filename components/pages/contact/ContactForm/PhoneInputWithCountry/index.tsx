'use client';

import React, { useState, useRef, useEffect, useMemo, ChangeEvent } from 'react';
import { COUNTRIES } from '@/lib/COUNTRIES';
import { CountryOption } from '@/types/country';
import type { PhoneInputWithCountryProps } from '../types';
import { useLocale } from 'next-intl';

import CountrySelectorDropdown from './CountrySelectorDropdown';
import CountryCodeButton from './CountryCodeButton';
import PhoneNumberField from './PhoneNumberField';

// Default to Egypt
const EGYPT_COUNTRY = COUNTRIES.find((c) => c.name === 'Egypt' && c.code === '+20') || COUNTRIES[0];

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
    const locale = useLocale();
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

    // Translate countries based on locale
    const translatedCountries = useMemo(() => {
        try {
            const regionNames = new Intl.DisplayNames([locale], { type: 'region' });
            return COUNTRIES.map(country => ({
                ...country,
                name: regionNames.of(country.iso.toUpperCase()) || country.name
            }));
        } catch {
            return COUNTRIES;
        }
    }, [locale]);

    // Filter countries list by search term
    const filteredCountries = useMemo(() => {
        if (!searchQuery.trim()) return translatedCountries;
        const q = searchQuery.toLowerCase().trim();
        return translatedCountries.filter((c) => c.name.toLowerCase().includes(q) || c.code.includes(q));
    }, [searchQuery, translatedCountries]);

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

            <div className="relative" >
                <div
                    className={`
                        flex items-center w-full rounded-2xl overflow-hidden
                        bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white
                        border ${error ? 'border-red-500 focus-within:border-red-500' : 'border-slate-200 dark:border-slate-800 focus-within:border-blue-500 dark:focus-within:border-sky-400'}
                        transition-colors relative 
                    `}
                >
                    <CountryCodeButton
                        selectedCountry={selectedCountry}
                        isOpen={isOpen}
                        onClick={() => setIsOpen(!isOpen)}
                    />

                    <PhoneNumberField
                        inputRef={inputRef}
                        rawNumber={rawNumber}
                        phoneLength={selectedCountry.phoneLength}
                        onChange={handleInputChange}
                    />
                </div>

                {isOpen && (
                    <CountrySelectorDropdown
                        searchInputRef={searchInputRef}
                        searchQuery={searchQuery}
                        onSearchChange={(e) => setSearchQuery(e.target.value)}
                        filteredCountries={filteredCountries}
                        selectedCountry={selectedCountry}
                        onSelectCountry={handleSelectCountry}
                    />
                )}
            </div>

            {error && <p className="text-xs text-red-500 font-medium mt-1">{error}</p>}
        </div>
    );
}