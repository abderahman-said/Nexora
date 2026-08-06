"use client";
import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Link from 'next/link';
import { useTranslations } from "next-intl";
import { useSiteData } from "@/hooks/useSiteData";

export function FooterContact() {
  const t = useTranslations();
  const { contact, map } = useSiteData();

  return (
    <div className="flex flex-col items-start space-y-4">
      <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white tracking-wide border-b border-blue-500/40 pb-1.5 flex items-center gap-2">
        {t("footer.contactUs")}
      </h3>
      <div className="space-y-3 text-xs md:text-sm text-slate-600 dark:text-slate-300">
        <Link
          href={map.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-2.5 hover:text-blue-400 transition-colors group"
        >
          <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5 group-hover:text-blue-400 transition-colors" />
          <div className="flex flex-col gap-0.5">
            <span>{contact.address}</span>
          </div>
        </Link>
        <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <Phone className="h-4 w-4 text-slate-400 shrink-0" />
          <Link href={`tel:${contact.phone.replace(/\s/g, "")}`} dir="ltr">
            {contact.phone}
          </Link>
        </div>
        <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <Mail className="h-4 w-4 text-slate-400 shrink-0" />
          <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
        </div>
      </div>

      <div className="pt-1 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
        <Clock className="h-3.5 w-3.5 text-slate-400" />
        <span>
          {t("footer.responseTime")} : {contact.responseTime}
        </span>
      </div>
    </div>
  );
}
