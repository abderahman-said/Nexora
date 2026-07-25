import React from 'react';
import Link from 'next/link';

export function FooterLinks() {
    return (
        <>
            {/* Services */}
            <div>
                <div className="mb-[22px] text-[0.72rem] font-bold uppercase tracking-[0.14em] text-slate-900">
                    Services
                </div>
                <ul className="flex list-none flex-col gap-[13px]" role="list">
                    {[
                        "Web Development",
                        "Mobile Apps",
                        "UI/UX Design",
                        "Cloud & DevOps",
                        "Custom Software",
                    ].map((s) => (
                        <li key={s}>
                            <Link
                                href="#services"
                                className="flex items-center gap-1.5 text-[0.9rem] font-medium text-slate-600 transition-colors duration-200 hover:text-slate-900"
                            >
                                {s}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Company */}
            <div>
                <div className="mb-[22px] text-[0.72rem] font-bold uppercase tracking-[0.14em] text-slate-900">
                    Company
                </div>
                <ul className="flex list-none flex-col gap-[13px]" role="list">
                    {[
                        { label: "About Us", href: "#about" },
                        { label: "Portfolio", href: "#portfolio" },
                        { label: "Process", href: "#process" },
                        { label: "Contact", href: "#contact" },
                    ].map(({ label, href }) => (
                        <li key={label}>
                            <Link
                                href={href}
                                className="flex items-center gap-1.5 text-[0.9rem] font-medium text-slate-600 transition-colors duration-200 hover:text-slate-900"
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Contact info */}
            <div>
                <div className="mb-[22px] text-[0.72rem] font-bold uppercase tracking-[0.14em] text-slate-900">
                    Contact
                </div>
                <ul className="flex list-none flex-col gap-[13px]" role="list">
                    <li>
                        <Link
                            href="mailto:abdorady6500@gmail.com"
                            className="flex items-center gap-1.5 text-[0.9rem] font-medium text-slate-600 transition-colors duration-200 hover:text-slate-900"
                        >
                            abdorady6500@gmail.com
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="https://wa.me/201552323225"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-[0.9rem] font-medium text-slate-600 transition-colors duration-200 hover:text-slate-900"
                        >
                            +20 155 232 3225
                        </Link>
                    </li>
                    <li className="flex cursor-default items-center gap-1.5 text-[0.9rem] font-medium text-slate-600">
                        Mansoura, Egypt
                    </li>
                    <li className="flex cursor-default items-center gap-1.5 text-[0.9rem] font-bold text-[#2563eb]">
                        Available Worldwide ✦
                    </li>
                </ul>
            </div>
        </>
    );
}
