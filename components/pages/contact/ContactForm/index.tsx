'use client';

import React from 'react';
import Container from '@/components/ui/Container';
import ContactInquiryForm from './ContactInquiryForm';
import ContactMap from './ContactMap';

export default function ContactForm() {
    return (
        <section
            id="contact-section"
            className="scroll-section relative w-full py-12 sm:py-20 lg:py-24 bg-slate-100/90 dark:bg-[#090d16] border-b border-slate-200/90 dark:border-slate-800/80 site-grid-bg overflow-hidden transition-colors duration-300"
        >
            <Container className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                    
                    {/* Left Column: Clean Inquiry Form */}
                    <div className="lg:col-span-7 flex flex-col h-full">
                        <ContactInquiryForm />
                    </div>

                    {/* Right Column: Interactive Map */}
                    <div className="lg:col-span-5 flex flex-col h-full">
                        <ContactMap />
                    </div>

                </div>
            </Container>
        </section>
    );
}
