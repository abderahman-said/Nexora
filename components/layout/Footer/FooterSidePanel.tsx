"use client";

import React from "react";
import { InteractiveCircleButton } from "./InteractiveCircleButton";
import { useSiteData } from "@/hooks/useSiteData";
import type { FooterSidePanelProps } from './types';
import { useTranslations } from 'next-intl';

export function FooterSidePanel({ sidePanelRef }: FooterSidePanelProps) {
    const { contact } = useSiteData();
    const t = useTranslations('footer');
    return (
        <div
            ref={sidePanelRef}
            className="w-full lg:w-[350px] xl:w-[390px] bg-slate-100 dark:bg-[#0c1120] p-8 lg:p-10 flex flex-col justify-between items-center text-center shrink-0 border-t lg:border-t-0 border-slate-200 dark:border-slate-800/80 relative overflow-hidden"
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-2 mt-2 relative z-10">
                <h3 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {t('haveProject')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[240px] mx-auto pt-2">
                    {t('discussProject')}
                </p>
            </div>

            <div className="my-6 flex items-center justify-center relative z-10">
                <InteractiveCircleButton href={contact.whatsapp}>
                    {t('contactBtn')}
                </InteractiveCircleButton>
            </div>
            <p className="font-mono font-semibold text-slate-800 dark:text-slate-200 text-sm tracking-wider flex items-center justify-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                <span>{contact.workingHours}</span>
            </p>
        </div>
    );
}
