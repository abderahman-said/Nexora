"use client";

import React, { useState, useEffect } from "react";
import { InteractiveCircleButton } from "./InteractiveCircleButton";

export function FooterSidePanel({ sidePanelRef }) {
    const [currentTime, setCurrentTime] = useState("");

    // Live clock update for operating hours display
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}:${seconds}`);
        };
        updateClock();
        const timer = setInterval(updateClock, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div 
            ref={sidePanelRef}
            className="w-full lg:w-[350px] xl:w-[390px] bg-[#141418] p-8 lg:p-10 flex flex-col justify-between items-center text-center shrink-0 border-t lg:border-t-0 border-white/10 relative overflow-hidden"
        >
            {/* Ambient Glow Pill in Sidebar */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Panel Title & Subtitle */}
            <div className="space-y-2 mt-2 relative z-10">
                <h3 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                    Have a project?
                </h3>
                <p className="text-xs text-slate-400 max-w-[240px] mx-auto">
                    Let's discuss how we can engineer your vision.
                </p>
            </div>

            {/* Cursor-Origin Radial Expansion Circle Button */}
            <div className="my-6 flex items-center justify-center relative z-10">
                <InteractiveCircleButton href="https://wa.me/201117180818">
                    Contact us
                </InteractiveCircleButton>
            </div>

            {/* Operating Hours & Clock */}
            <div className="space-y-1.5 text-xs text-slate-300 relative z-10">
                <p className="font-mono font-semibold text-slate-200 text-sm tracking-wider flex items-center justify-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>09:00 AM - 10:30 PM {currentTime ? `(${currentTime})` : ''}</span>
                </p>
                <p className="text-slate-400 text-xs">Saturday - Thursday (Cairo, Egypt)</p>
            </div>

        </div>
    );
}
