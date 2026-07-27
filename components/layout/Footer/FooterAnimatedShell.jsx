"use client";

import { ArrowUp } from "lucide-react";
import { useFooterGSAP } from "./useFooterGSAP";
import React, { useRef } from "react";

export function FooterAnimatedShell({ columns, sidePanel, bottomBar }) {
    const footerRef = useRef(null);
    const columnsRef = useRef(null);
    const sidePanelRef = useRef(null);
    const bgRef = useRef(null);

    useFooterGSAP({ footerRef, columnsRef, sidePanelRef, bgRef });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer
            id="contact"
            ref={footerRef}
            dir="ltr"
            className="relative w-full overflow-hidden bg-[#0e0e11] text-white font-sans border-t border-white/10"
        >
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent z-20 pointer-events-none" />
            <div
                ref={bgRef}
                className="absolute -inset-y-12 inset-x-0 bg-[url('/footer_bg_2.webp')] bg-cover bg-center opacity-10 pointer-events-none mix-blend-overlay will-change-transform"
                aria-hidden="true"
            />

            <div className="relative z-10 w-full flex flex-col lg:flex-row items-stretch min-h-[480px]">
                <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 lg:p-14 relative border-b lg:border-b-0 lg:border-r border-white/10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-5 z-20">
                        <button
                            onClick={scrollToTop}
                            aria-label="Scroll to top"
                            title="Back to Top"
                            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#0e0e11] text-slate-300 transition-all duration-300 hover:scale-110 hover:border-blue-400 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] cursor-pointer"
                        >
                            <ArrowUp className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </button>
                    </div>

                    <div ref={columnsRef} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pt-6">
                        {columns}
                    </div>

                    {bottomBar}
                </div>

                {React.isValidElement(sidePanel)
                    ? React.cloneElement(sidePanel, { sidePanelRef })
                    : sidePanel}
            </div>
        </footer>
    );
}