"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ChevronRight } from "lucide-react";

export function FooterNav() {
    const navItems = [
        { label: "About Us", href: "#about" },
        { label: "Our Services", href: "#services" },
        { label: "Case Studies", href: "#projects" },
        { label: "Our Partners", href: "#clients" },
        { label: "Get in Touch", href: "#contact" },
    ];

    return (
        <div className="flex flex-col items-start space-y-4">
            <h3 className="text-base md:text-lg font-bold text-white tracking-wide border-b border-blue-500/40 pb-1.5 flex items-center gap-2">
                <span>Navigation</span>
                <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            </h3>
            <ul className="space-y-2.5 text-xs md:text-sm text-slate-300">
                {navItems.map((item) => (
                    <li key={item.label}>
                        <Link 
                            href={item.href} 
                            className="group flex items-center gap-1.5 hover:text-blue-400 transition-colors duration-200"
                        >
                            <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-200" />
                            <span>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
