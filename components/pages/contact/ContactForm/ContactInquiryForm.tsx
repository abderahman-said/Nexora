'use client';

import React from 'react';
import { Send, User, Mail, FileText, MessageSquare } from 'lucide-react';
import FormInput from '@/components/ui/FormInput';
import Button from '@/components/ui/Button';
import { useContactForm } from './useContactForm';
import PhoneInputWithCountry from './PhoneInputWithCountry';
import SuccessState from './SuccessState';

export default function ContactInquiryForm() {
    const {
        formData,
        errors,
        isSubmitting,
        isSubmitted,
        handleChange,
        handlePhoneChange,
        resetForm,
        handleSubmit,
    } = useContactForm();

    return (
        <div
            className="
                relative rounded-3xl lg:rounded-[2.5rem] p-6 sm:p-10
                bg-white/90 dark:bg-[#0c101d]/90
                border border-slate-200/90 dark:border-slate-800/90
                shadow-2xl shadow-slate-300/40 dark:shadow-none h-full flex flex-col justify-between
            "
        >
            {isSubmitted ? (
                <SuccessState onReset={resetForm} />
            ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5 sm:space-y-6">
                    {/* Header */}
                    <div className="space-y-5">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 text-blue-600 dark:text-sky-400 font-bold text-xs uppercase tracking-wider shadow-sm">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>SEND US A MESSAGE</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Get In Touch With Us
                        </h2>
                    </div>

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <FormInput
                            label="Full Name"
                            required
                            icon={User}
                            type="text"
                            placeholder="e.g. John Doe"
                            value={formData.name}
                            error={errors.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
                        />
                        <FormInput
                            label="Email Address"
                            required
                            icon={Mail}
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            error={errors.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
                        />
                    </div>

                    {/* Phone & Subject Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <PhoneInputWithCountry
                            label="Phone Number"
                            value={formData.phone}
                            error={errors.phone}
                            onChange={handlePhoneChange}
                        />
                        <FormInput
                            label="Subject"
                            required
                            icon={FileText}
                            type="text"
                            placeholder="Project Inquiry / General Question"
                            value={formData.subject}
                            error={errors.subject}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('subject', e.target.value)}
                        />
                    </div>

                    {/* Message Textarea */}
                    <FormInput
                        label="Message"
                        required
                        isTextarea
                        rows={4}
                        placeholder="Write your message here..."
                        value={formData.message}
                        error={errors.message}
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange('message', e.target.value)}
                    />

                    {/* Submit Button */}
                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant="gradient"
                            size="lg"
                            className="
                                w-full py-3.5 sm:py-4 px-8 rounded-full
                                font-extrabold text-xs sm:text-sm tracking-wider uppercase
                                shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40
                                hover:-translate-y-0.5 active:scale-95 transition-all duration-300
                                flex items-center justify-center gap-3
                            "
                        >
                            {isSubmitting ? (
                                <span>Sending Message...</span>
                            ) : (
                                <>
                                    <span>SEND MESSAGE</span>
                                    <Send className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
