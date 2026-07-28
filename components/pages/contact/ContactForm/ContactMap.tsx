import React from 'react';
export default function ContactMap() {
    return (
        <div className="
            relative rounded-3xl lg:rounded-[2.5rem] overflow-hidden border border-slate-200/90 dark:border-slate-800/90
            shadow-xl bg-white dark:bg-[#0c101d] h-full min-h-[320px] sm:min-h-[360px] lg:min-h-[400px] w-full group
        ">
            <iframe
                title="Nexora Solutions Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.434972111121!2d31.3389006!3d30.053064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f00024ce5f9%3A0x6c35b3f36d15e86b!2sNexora%20Solutions!5e0!3m2!1sen!2seg!4v1785267390442!5m2!1sen!2seg"
                width="100%"    
                height="100%"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full border-0 h-full grayscale dark:contrast-125 dark:opacity-80 group-hover:grayscale-0 transition-all duration-500"
            />
        </div>
    );
}

