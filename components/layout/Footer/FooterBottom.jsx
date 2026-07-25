import React from 'react';
import Link from 'next/link';

export function FooterBottom() {
    return (
        <div className="relative z-[1] flex flex-wrap items-center justify-between gap-5 border-t border-slate-200/80 bg-[#f1f5f9] px-[60px] py-6 max-md:flex-col max-md:items-start max-md:px-6 max-md:py-5">
            <p className="text-[0.8rem] font-medium text-slate-500 [&_a]:text-slate-700 [&_a]:transition-colors [&_a]:duration-200 [&_a:hover]:text-[#2563eb]">
                © {new Date().getFullYear()} Nexora Solutions.
            </p>
            <div className="flex gap-6">
                <Link
                    href="mailto:nexora@gmail.com"
                    className="text-[0.8rem] font-medium text-slate-500 transition-colors duration-200 hover:text-slate-900"
                >
                    nexora@gmail.com
                </Link>
                <Link
                    href="https://www.google.com/maps/place/Mansoura,+Egypt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.8rem] font-medium text-slate-500 transition-colors duration-200 hover:text-slate-900"
                >
                    Cairo, Egypt
                </Link>
            </div>
        </div>
    );
}
