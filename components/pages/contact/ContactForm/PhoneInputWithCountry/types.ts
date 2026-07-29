import { CountryOption } from "@/types/country";
import { ChangeEvent, RefObject } from "react";

export interface PhoneNumberFieldProps {
    inputRef: RefObject<HTMLInputElement | null>;
    rawNumber: string;
    phoneLength: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface CountrySelectorDropdownProps {
    searchInputRef: RefObject<HTMLInputElement | null>;
    searchQuery: string;
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
    filteredCountries: CountryOption[];
    selectedCountry: CountryOption;
    onSelectCountry: (country: CountryOption) => void;
}
export interface CountryCodeButtonProps {
    selectedCountry: CountryOption;
    isOpen: boolean;
    onClick: () => void;
}