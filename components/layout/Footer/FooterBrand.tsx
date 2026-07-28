'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FooterSocials } from "./FooterSocials";

export function FooterBrand() {
    return (
        <div className="flex flex-col items-start space-y-4">
            <Link href="/" className="inline-block mb-1 group">
                <Image
                    src="/assets/logo.png"
                    alt="Nexora Solutions"
                    width={160}
                    height={60}
                    className="h-[70px] w-auto object-contain dark:hidden transition-transform duration-300 group-hover:scale-105"
                />
                <Image
                    src="/assets/logo_dark.PNG"
                    alt="Nexora Solutions Dark"
                    width={160}
                    height={60}
                    className="h-[70px] w-auto object-contain hidden dark:block transition-transform duration-300 group-hover:scale-105"
                />
            </Link>
            <p className="text-xs md:text-sm font-normal leading-relaxed text-slate-600 dark:text-slate-300 text-left max-w-[340px]">
                Nexora Solutions is a leading technology agency specializing in enterprise software development, SaaS architectures, and cloud solutions worldwide.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[11px] font-medium text-blue-600 dark:text-blue-300">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" />
                <span>Enterprise Certified Tech Partner</span>
            </div>

            <FooterSocials />
        </div>
    );
}
