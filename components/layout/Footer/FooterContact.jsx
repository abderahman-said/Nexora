import React from "react";
import { MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function FooterContact() {
    return (
        <div className="flex flex-col items-start space-y-4">
            <h3 className="text-base md:text-lg font-bold text-white tracking-wide border-b border-blue-500/40 pb-1.5 flex items-center gap-2">
                <span>Contact Us</span>
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            </h3>
            <div className="space-y-3 text-xs md:text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Cairo Nasr City / Mansoura, Egypt</span>
                </div>
                <div className="flex items-center gap-2.5 font-mono text-slate-200 hover:text-blue-400 transition-colors">
                    <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                    <Link href="tel:+201117180818">+20 111 718 0818</Link>
                </div>
                <div className="flex items-center gap-2.5 font-mono text-slate-200 hover:text-blue-400 transition-colors">
                    <Mail className="h-4 w-4 text-sky-400 shrink-0" />
                    <Link href="mailto:info@nexora-solutions.co">info@nexora-solutions.co</Link>
                </div>
            </div>

            {/* Rapid response tag */}
            <div className="pt-1 flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                <span>Response Time: &lt; 15 mins</span>
            </div>
        </div>
    );
}
