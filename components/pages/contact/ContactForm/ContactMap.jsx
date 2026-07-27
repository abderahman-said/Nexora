'use client';

import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';

export default function ContactMap() {
    return (
        <div className="
            relative rounded-3xl lg:rounded-[2.5rem] overflow-hidden border border-slate-200/90 dark:border-slate-800/90
            shadow-xl bg-white dark:bg-[#0c101d] h-full min-h-[320px] sm:min-h-[360px] lg:min-h-[400px] w-full group
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
            
            {/* Location Overlay Badge */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-3.5 rounded-2xl bg-white/90 dark:bg-[#060913]/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600/10 text-blue-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                        <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Cairo Hub</h4>
                        <p className="text-[0.65rem] sm:text-[0.7rem] text-slate-500 dark:text-slate-400">Egypt Tech District</p>
                    </div>
                </div>
                <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 sm:p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
                    aria-label="Open in Google Maps"
                >
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </a>
            </div>
        </div>
    );
}
