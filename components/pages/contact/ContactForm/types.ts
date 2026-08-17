import { CountryOption } from '@/types/country';

export interface FormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
}

export interface ValidationRule {
    required: boolean;
    minLength?: number;
    minDigits?: number;
    pattern?: RegExp;
    label: string;
}

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
    placeholder?: string;
    onChange?: (e: PhoneInputChangeEvent) => void;
    containerClassName?: string;
}

export interface CountryFlagIconProps {
    country: CountryOption;
    className?: string;
}

export interface SuccessStateProps {
    onReset: () => void;
}
