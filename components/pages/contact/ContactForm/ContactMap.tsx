'use client';
import React from 'react';
import { useSiteData } from '@/hooks/useSiteData';

export default function ContactMap() {
    const { map } = useSiteData();
    return (
        <div className="
            relative rounded-3xl lg:rounded-[2.5rem] overflow-hidden border border-slate-200/90 dark:border-slate-800/90
            shadow-xl bg-white dark:bg-[#0c101d] h-full min-h-[320px] sm:min-h-[360px] lg:min-h-[400px] w-full group
        ">
            <iframe
                title="Nexora Solutions Location"
                src={map.embedUrl}
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full border-0 h-full transition-all duration-500"
            />
        </div>
    );
}

