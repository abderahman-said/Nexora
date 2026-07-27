import React from 'react';
import ContactHero from './ContactHero';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

export default function ContactPage() {
    return (
        <main className="w-full">
            <ContactHero />
            <ContactInfo />
            <ContactForm />
        </main>
    );
}
