"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useMotionCardsGSAP } from "./useMotionCardsGSAP";
import { MotionPhotoCards } from "./MotionPhotoCards";
import { MotionFloatingLabels } from "./MotionFloatingLabels";

export default function MotionCards() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const cardsRef = useRef(null);
    const blobRef = useRef(null);
    const labelsRef = useRef(null);

    useMotionCardsGSAP({ sectionRef, cardsRef, blobRef, labelsRef });

    return (
        <section
            ref={sectionRef}
            className="relative w-full px-[60px] pt-[120px] pb-[20px] text-center overflow-hidden z-[1]" id="motion-card-section">
            {/* ─── Part 1: Bold Heading Text with SVG Sticker Placeholders ─── */}
            <div className="relative max-w-[1200px] mx-auto mb-[60px]">
                <h2 className="js-title font-epilogue text-[7rem] font-[750] leading-[0.9] tracking-[-5px] text-brand-dark mb-0 cursor-[url('/assets/Cursor_SVG/cursor-text.svg')_12_12,auto] gradient-title">
                    building digital
                    <br />
                    experiences.
                </h2>
                <p className="js-subtitle font-times italic font-normal text-[7.5rem] leading-[1.15] tracking-[-2px] text-brand-dark relative inline-block top-[-30px]">
                    from concept to code.
                    {/* SVG sticker placeholder — top-right area */}
                    <span className="js-sticker-top absolute inline-block pointer-events-none top-[-15px] right-[-25px] w-[150px] h-[80px] -rotate-12">
                        <Image
                            src="/assets/Footer-Sticker SVG/footer-sticker-hands.svg"
                            alt="Green heart hands sticker"
                            width={150}
                            height={80}
                            className="w-full h-auto"
                        />
                    </span>
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 634 28" fill="none" className="block max-w-[720px] -mt-[45px] mx-auto text-brand-dark h-auto">
                    <path className="js-underline-path" d="M2 26C41.0237 23.1556 79.9927 19.9419 118.634 15.5521C169.106 9.98633 227.314 2.42393 275.206 2C280.46 2.57436 264.768 4.99488 262.462 5.55556C257.837 6.43078 252.529 7.47009 247.317 8.59146C239.594 10.3556 212.496 15.8393 226.932 19.8051C239.594 22.6359 263.663 21.9521 280.978 21.3504C314.817 19.9829 349.311 16.7419 383.204 14.7863C465.931 9.5077 549.191 10.547 632 14.1436" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {/* ─── Part 2: Cards with Colorful Bars & Blue Blob ─── */}
            <div ref={containerRef} className="relative w-full max-w-[1100px] h-[450px] mx-auto mt-[40px] mb-[20px]">
                {/* Blue SVG blob behind everything */}
                <div ref={blobRef} className="absolute top-[36%] left-[50%] -translate-x-[131.5%] -translate-y-[45%] w-[580px] h-[500px] z-0 pointer-events-none">
                    <Image
                        src="/assets/MotionCard SVG/motion-card-blob.svg"
                        alt=""
                        width={580}
                        height={500}
                        className="w-full h-full"
                    />
                </div>

                {/* 4 Photo Cards */}
                <MotionPhotoCards cardsRef={cardsRef} />

                {/* Floating labels */}
                <MotionFloatingLabels labelsRef={labelsRef} />
            </div>

            {/* ─── Part 3: Bottom Paragraph Text ─── */}
            <div className="max-w-[550px] mx-auto text-center">
                <p className="js-description font-sans text-[1.3rem] font-normal leading-[1.7] text-brand-dark tracking-[-0.2px] cursor-[url('/assets/Cursor_SVG/cursor-text.svg')_12_12,auto]">
                    I craft high-performance, responsive web applications that bring your ideas to life. With expertise in React, Next.js, and modern styling, I bridge the gap between stunning visual design and flawless engineering.
                </p>
            </div>
        </section>
    );
}
