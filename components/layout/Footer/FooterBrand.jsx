import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SOCIAL_ICONS } from "@/lib/data";

export function FooterBrand() {
    return (
        <div>
            <div className="mb-[18px] flex items-center gap-2.5 text-2xl font-black tracking-[-0.04em] text-slate-900">
                <Image
                    src="/assets/logo.png"
                    alt="Nexora Solutions"
                    width={160}
                    height={50}
                    style={{ width: 'auto', height: 'auto' }}
                    className="h-[50px] w-auto object-contain"
                />
            </div>
            <p className="max-w-[240px] text-[0.85rem] font-medium leading-[1.7] text-slate-600">
                Premium Software Engineering. Building robust digital infrastructure
                and scalable applications.
            </p>

            {/* Socials moved under brand for better visual balance */}
            <div className="mt-6 flex flex-wrap gap-3">
                {(SOCIAL_ICONS || []).map(({ href, label, svg }) => (
                    <Link
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-[250ms] hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                        aria-label={label}
                        dangerouslySetInnerHTML={{ __html: svg }}
                    />
                ))}
            </div>
        </div>
    );
}
