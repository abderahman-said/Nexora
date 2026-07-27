'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, User, Mail, Phone, FileText, MapPin, Clock, MessageSquare, ArrowUpRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import FileInput from '@/components/ui/FileInput';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        attachment: null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1200);
    };

    return (
        <section
            id="contact-section"
            className="scroll-section relative w-full py-16 sm:py-24 bg-slate-100/90 dark:bg-[#090d16] border-b border-slate-200/90 dark:border-slate-800/80 site-grid-bg overflow-hidden transition-colors duration-300"
        >
            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
                    
                    {/* ── Left Column: Clean Inquiry Form ── */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                        
                        <div className="
                            relative rounded-3xl lg:rounded-[2.5rem] p-6 sm:p-10
                            bg-white/90 dark:bg-[#0c101d]/90
                            border border-slate-200/90 dark:border-slate-800/90
                            shadow-2xl shadow-slate-300/40 dark:shadow-none h-full flex flex-col justify-between
                        ">
                            {isSubmitted ? (
                                <div className="py-16 text-center space-y-4 my-auto">
                                    <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                                        Thank You! Message Sent Successfully.
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto">
                                        We have received your message. Our technical team will get back to you within 2 hours.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setIsSubmitted(false);
                                            setFormData({
                                                name: '',
                                                email: '',
                                                phone: '',
                                                subject: '',
                                                message: '',
                                                attachment: null,
                                            });
                                        }}
                                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    
                                    {/* Header */}
                                    <div className="space-y-2">
                                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800/80 text-blue-600 dark:text-sky-400 font-bold text-xs uppercase tracking-wider shadow-sm">
                                            <MessageSquare className="w-3.5 h-3.5" />
                                            <span>SEND US A MESSAGE</span>
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                            Get In Touch With Us
                                        </h2>
                                    </div>

                                    {/* Name & Email Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        {/* Name * */}
                                        <div className="space-y-1.5">
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                                Full Name <span className="text-blue-600 dark:text-sky-400">*</span>
                                            </label>
                                            <div className="relative">
                                                <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="e.g. John Doe"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="
                                                        w-full pl-11 pr-4 py-3 rounded-2xl text-xs sm:text-sm font-medium
                                                        bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white
                                                        border border-slate-200 dark:border-slate-800
                                                        focus:outline-none focus:border-blue-500 dark:focus:border-sky-400
                                                        transition-colors
                                                    "
                                                />
                                            </div>
                                        </div>

                                        {/* Email * */}
                                        <div className="space-y-1.5">
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                                Email Address <span className="text-blue-600 dark:text-sky-400">*</span>
                                            </label>
                                            <div className="relative">
                                                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="john@example.com"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="
                                                        w-full pl-11 pr-4 py-3 rounded-2xl text-xs sm:text-sm font-medium
                                                        bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white
                                                        border border-slate-200 dark:border-slate-800
                                                        focus:outline-none focus:border-blue-500 dark:focus:border-sky-400
                                                        transition-colors
                                                    "
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phone & Subject Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        {/* Phone */}
                                        <div className="space-y-1.5">
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                                <input
                                                    type="tel"
                                                    placeholder="+20 111 000 0000"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="
                                                        w-full pl-11 pr-4 py-3 rounded-2xl text-xs sm:text-sm font-medium
                                                        bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white
                                                        border border-slate-200 dark:border-slate-800
                                                        focus:outline-none focus:border-blue-500 dark:focus:border-sky-400
                                                        transition-colors
                                                    "
                                                />
                                            </div>
                                        </div>

                                        {/* Subject * */}
                                        <div className="space-y-1.5">
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                                Subject <span className="text-blue-600 dark:text-sky-400">*</span>
                                            </label>
                                            <div className="relative">
                                                <FileText className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Project Inquiry / General Question"
                                                    value={formData.subject}
                                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                    className="
                                                        w-full pl-11 pr-4 py-3 rounded-2xl text-xs sm:text-sm font-medium
                                                        bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white
                                                        border border-slate-200 dark:border-slate-800
                                                        focus:outline-none focus:border-blue-500 dark:focus:border-sky-400
                                                        transition-colors
                                                    "
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message * */}
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                            Message <span className="text-blue-600 dark:text-sky-400">*</span>
                                        </label>
                                        <textarea
                                            required
                                            rows={4}
                                            placeholder="Write your message here..."
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="
                                                w-full p-4 rounded-2xl text-xs sm:text-sm font-medium
                                                bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white
                                                border border-slate-200 dark:border-slate-800
                                                focus:outline-none focus:border-blue-500 dark:focus:border-sky-400
                                                transition-colors resize-none
                                            "
                                        />
                                    </div>

                                    {/* File Input */}
                                    <FileInput
                                        label="Attach File (Optional)"
                                        helperText="PDF, DOCX, PNG, JPG, or ZIP up to 10MB"
                                        value={formData.attachment}
                                        onChange={(file) => setFormData({ ...formData, attachment: file })}
                                    />

                                    {/* Submit Button */}
                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="
                                                w-full py-4 px-8 rounded-full
                                                bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 text-white
                                                font-extrabold text-xs sm:text-sm tracking-wider uppercase
                                                shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40
                                                hover:-translate-y-0.5 active:scale-95 transition-all duration-300
                                                flex items-center justify-center gap-3 disabled:opacity-50
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
                                        </button>
                                    </div>

                                </form>
                            )}
                        </div>

                    </div>

                    {/* ── Right Column: Interactive Map & Location Cards ── */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                        
                        {/* 1. Google Map Card Container */}
                        <div className="
                            relative rounded-3xl lg:rounded-[2.5rem] overflow-hidden border border-slate-200/90 dark:border-slate-800/90
                            shadow-xl bg-white dark:bg-[#0c101d] h-[340px] lg:h-[380px] shrink-0 group
                        ">
                            <iframe
                                title="Nexora Solutions Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.60389544837!2d31.188424268686128!3d30.059483818090715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate%2C%20Egypt!5e0!3m2!1sen!2seg!4v1700000000000!5m2!1sen!2seg"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full grayscale dark:contrast-125 dark:opacity-80 group-hover:grayscale-0 transition-all duration-500"
                            />
                            
                            {/* Overlay Badge */}
                            <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/90 dark:bg-[#060913]/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-lg flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Cairo Hub</h4>
                                        <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">Egypt Tech District</p>
                                    </div>
                                </div>
                                <a
                                    href="https://maps.google.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
                                >
                                    <ArrowUpRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                       

                    </div>

                </div>
            </Container>
        </section>
    );
}
