'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import type { PhoneInputChangeEvent, FormData, FormErrors, ValidationRule } from './types';

export const INITIAL_FORM_DATA: FormData = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
};

export const VALIDATION_RULES: Record<keyof FormData, ValidationRule> = {
    name: { required: true, minLength: 3, label: 'Name' },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, label: 'Email Address' },
    phone: { required: false, minDigits: 6, label: 'Phone number' },
    subject: { required: true, minLength: 3, label: 'Subject' },
    message: { required: true, minLength: 10, label: 'Message' },
};

const SUBMIT_DELAY_MS = 1200;

export function validateForm(
    data: FormData,
    t: (key: string, values?: Record<string, string | number>) => string,
    tFields: (key: string) => string,
    phoneLength?: number
): FormErrors {
    const errors: FormErrors = {};

    for (const [field, rules] of Object.entries(VALIDATION_RULES) as [keyof FormData, ValidationRule][]) {
        const rawVal = data[field] || '';
        const subscriberDigits = field === 'phone' ? rawVal.replace(/^\+\d+\s*/, '').trim() : '';
        const value = field === 'phone' ? (subscriberDigits ? rawVal.trim() : '') : rawVal.trim();
        const getLabel = (f: string) => tFields(`${f}_label`);

        if (field === 'email' && rawVal !== rawVal.trim()) {
            errors[field] = t('email_spaces');
            continue;
        }

        if (!value) {
            if (rules.required) errors[field] = t('required', { field: getLabel(field) });
            continue;
        }

        if (field === 'phone' && phoneLength) {
            const subscriberOnlyDigits = subscriberDigits.replace(/\D/g, '');
            if (subscriberOnlyDigits.length !== phoneLength) {
                errors[field] = t('phone_length', { length: phoneLength });
            }
        } else if (rules.minLength && value.length < rules.minLength) {
            errors[field] = t('min_length', { field: getLabel(field), length: rules.minLength });
        } else if (rules.pattern && !rules.pattern.test(value)) {
            errors[field] = t('invalid_email');
        } else if (rules.minDigits && value.replace(/\D/g, '').length < rules.minDigits) {
            errors[field] = t('min_digits', { field: getLabel(field), length: rules.minDigits });
        }
    }

    return errors;
}

export function useContactForm(onSubmitSuccess?: (data: FormData) => void) {
    const t = useTranslations('contact.form.validation');
    const tFields = useTranslations('contact.form');
    
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    // Track selected country's expected phone length (default: Egypt = 10)
    const [currentPhoneLength, setCurrentPhoneLength] = useState<number>(10);

    const handleChange = useCallback((field: keyof FormData, value: string) => {
        setFormData((prev: FormData) => ({ ...prev, [field]: value }));
        setErrors((prev: FormErrors) => (prev[field] ? { ...prev, [field]: '' } : prev));
    }, []);

    const handlePhoneChange = useCallback(
        (e: PhoneInputChangeEvent) => {
            handleChange('phone', e.target.value);
            if (e.target.phoneLength) {
                setCurrentPhoneLength(e.target.phoneLength);
            }
        },
        [handleChange]
    );

    const resetForm = useCallback(() => {
        setIsSubmitted(false);
        setErrors({});
        setFormData(INITIAL_FORM_DATA);
    }, []);

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            const validationErrors = validateForm(formData, t, tFields, currentPhoneLength);
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }

            setErrors({});
            setIsSubmitting(true);

            setTimeout(() => {
                setIsSubmitting(false);
                setIsSubmitted(true);
                if (onSubmitSuccess) onSubmitSuccess(formData);
            }, SUBMIT_DELAY_MS);
        },
        [formData, currentPhoneLength, onSubmitSuccess, t, tFields]
    );

    return {
        formData,
        errors,
        isSubmitting,
        isSubmitted,
        handleChange,
        handlePhoneChange,
        resetForm,
        handleSubmit,
    };
}