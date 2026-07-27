'use client';

import { useState, useCallback } from 'react';

export const INITIAL_FORM_DATA = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
};

export const VALIDATION_RULES = {
    name: { required: true, minLength: 3, label: 'Full Name' },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, label: 'Email Address' },
    phone: { required: false, minDigits: 6, label: 'Phone number' },
    subject: { required: true, minLength: 3, label: 'Subject' },
    message: { required: true, minLength: 10, label: 'Message' },
};

const SUBMIT_DELAY_MS = 1200;

export function validateForm(data) {
    const errors = {};

    for (const [field, rules] of Object.entries(VALIDATION_RULES)) {
        const value = data[field].trim();

        if (!value) {
            if (rules.required) errors[field] = `${rules.label} is required`;
            continue;
        }

        if (rules.minLength && value.length < rules.minLength) {
            errors[field] = `${rules.label} must be at least ${rules.minLength} characters`;
        } else if (rules.pattern && !rules.pattern.test(value)) {
            errors[field] = 'Please enter a valid email address';
        } else if (rules.minDigits && value.replace(/\D/g, '').length < rules.minDigits) {
            errors[field] = `${rules.label} must be at least ${rules.minDigits} digits`;
        }
    }

    return errors;
}

export function useContactForm(onSubmitSuccess) {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = useCallback((field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => (prev[field] ? { ...prev, [field]: '' } : prev));
    }, []);

    const handlePhoneChange = useCallback(
        (e) => handleChange('phone', e.target.value.replace(/[^0-9+]/g, '')),
        [handleChange]
    );

    const resetForm = useCallback(() => {
        setIsSubmitted(false);
        setErrors({});
        setFormData(INITIAL_FORM_DATA);
    }, []);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();

            const validationErrors = validateForm(formData);
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }

            setErrors({});
            setIsSubmitting(true);

            // Simulate API submission
            setTimeout(() => {
                setIsSubmitting(false);
                setIsSubmitted(true);
                if (onSubmitSuccess) onSubmitSuccess(formData);
            }, SUBMIT_DELAY_MS);
        },
        [formData, onSubmitSuccess]
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
