"use client";

import { useRef } from "react";
import { useFooterGSAP } from "./useFooterGSAP";
import { FooterTopBar } from "./FooterTopBar";
import { FooterColumns } from "./FooterColumns";
import { FooterGraphicText } from "./FooterGraphicText";

export default function Footer() {
    const footerRef = useRef(null);
    const infoRef = useRef(null);
    const bgWordRef = useRef(null);

    useFooterGSAP({ footerRef, infoRef, bgWordRef });

    return (
        <footer
            id="contact"
            ref={footerRef}
            className="nexora-footer rounded-t-[40px] md:rounded-t-[56px] main-footer relative w-full overflow-hidden border-t border-slate-700/60 dark:border-blue-500/35 bg-[#080d1a] dark:bg-[#02050c] text-white  transition-colors duration-300"
        >
            {/* Top Glowing Divider for clear visual separation */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-80 shadow-[0_0_15px_#3b82f6]" aria-hidden="true" />

            <div className="relative z-[3] mx-auto max-w-[1280px]">
                {/* 1. Top Bar */}
                <FooterTopBar />

                {/* 2. Main 3-Column Info Zone */}
                <div ref={infoRef}>
                    <FooterColumns />
                </div>

                {/* 3. Bottom Giant Banner & Interactive Stickers */}
                <FooterGraphicText bgWordRef={bgWordRef} />
            </div>
        </footer>
    );
}