"use client";

import React from "react";
import Link from "next/link";

export function FooterBottomBar() {
    return (
        <div className="pt-10 mt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <p>© All Rights Reserved {new Date().getFullYear()} Nexora Solutions</p>
            <div className="flex items-center gap-4 text-[11px]">
                <Link href="#privacy" className="hover:text-slate-200 transition-colors">Privacy Policy</Link>
                <span>•</span>
                <Link href="#terms" className="hover:text-slate-200 transition-colors">Terms of Service</Link>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">Code. Innovate. Elevate.</p>
        </div>
    );
}
