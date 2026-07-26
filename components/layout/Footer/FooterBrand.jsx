import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { SOCIAL_ICONS } from "@/lib/data";

const ICON_MAP = {
    Linkedin: LinkedinIcon,
    Mail,
    Phone,
};

export function FooterBrand() {
    return (
        <div>
            <div className="mb-[18px] flex items-center gap-2.5 text-2xl font-black tracking-[-0.04em] text-slate-900 dark:text-white">
                <Image
                    src="/assets/logo.png"
                    alt="Nexora Solutions"
                    width={160}
                    height={50}
                    style={{ width: 'auto', height: 'auto' }}
                    className="h-[50px] w-auto object-contain"
                />
            </div>
            <p className="max-w-[240px] text-[0.85rem] font-medium leading-[1.7] text-slate-600 dark:text-slate-300">
                Premium Software Engineering. Building robust digital infrastructure
                and scalable applications.
            </p>

            {/* Socials moved under brand for better visual balance */}
            <div className="mt-6 flex flex-wrap gap-3">
                {(SOCIAL_ICONS || []).map(({ href, label, icon }) => {
                    const IconComponent = ICON_MAP[icon] || Mail;
                    return (
                        <Link
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-[250ms] hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                            aria-label={label}
                        >
                            <IconComponent className="h-5 w-5" />
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

