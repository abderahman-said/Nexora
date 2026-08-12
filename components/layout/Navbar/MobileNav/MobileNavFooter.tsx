import React from "react";
import Link from 'next/link';
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  FacebookIcon,
  LinkedInIcon,
  WhatsappIcon,
} from "@/components/icons/SocialIcons";

interface MobileNavFooterProps {
  contact: {
    shortAddress: string;
    phone: string;
    email: string;
    whatsapp: string;
  };
  map: { linkUrl: string };
  social: { facebook: string; instagram: string; linkedin: string };
}

export function MobileNavFooter({
  contact,
  map,
  social,
}: MobileNavFooterProps) {
  return (
    <div className="mt-auto space-y-4 shrink-0 pb-6 sm:pb-0">
      <div className="grid grid-cols-1 gap-1.5 sm:gap-2 text-[10px] md:text-xs">
        <Link
          href={map.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] px-3 py-2 sm:py-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-800 dark:hover:text-white transition-[background-color,color] duration-200 border border-slate-100 dark:border-white/[0.06]"
        >
          <MapPin className="h-3.5 w-3.5 text-blue-500 shrink-0" />
          <span className="text-start leading-snug">
            {contact.shortAddress}
          </span>
        </Link>
        <Link
          href={`tel:${contact.phone.replace(/\s/g, "")}`}
          className="flex items-center gap-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] px-3 py-2 sm:py-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-800 dark:hover:text-white transition-[background-color,color] duration-200 border border-slate-100 dark:border-white/[0.06]"
        >
          <Phone className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span dir="ltr">{contact.phone}</span>
        </Link>
        <Link
          href={`mailto:${contact.email}`}
          className="flex items-center gap-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] px-3 py-2 sm:py-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-800 dark:hover:text-white transition-[background-color,color] duration-200 border border-slate-100 dark:border-white/[0.06]"
        >
          <Mail className="h-3.5 w-3.5 text-sky-500 shrink-0" />
          <span dir="ltr">{contact.email}</span>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-2.5 pt-2">
        <Link
          href={social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="p-2 rounded-lg bg-[#1877F2]/10 dark:bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] hover:bg-[#1877F2]/20 dark:hover:bg-[#1877F2]/25 hover:border-[#1877F2]/50 transition-[background-color,border-color] duration-200"
        >
          <FacebookIcon className="h-5 w-5" />
        </Link>
        <Link
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="p-2 rounded-lg bg-[#25D366]/10 dark:bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 dark:hover:bg-[#25D366]/25 hover:border-[#25D366]/50 transition-[background-color,border-color] duration-200"
        >
          <WhatsappIcon className="h-5 w-5" />
        </Link>
        <Link
          href={social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="p-2 rounded-lg bg-pink-500/10 dark:bg-pink-500/10 border border-pink-500/20 text-pink-500 hover:bg-pink-500/20 dark:hover:bg-pink-500/25 hover:border-pink-500/50 transition-[background-color,border-color] duration-200"
        >
          <Image
            src="/instegram.jpeg"
            alt="Instagram"
            width={20}
            height={20}
            className="h-[20px] w-[20px] object-contain rounded-md"
          />
        </Link>
        <Link
          href={social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="p-2 rounded-lg bg-[#1877F2]/10 dark:bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] hover:bg-[#1877F2]/20 dark:hover:bg-[#1877F2]/25 hover:border-[#1877F2]/50 transition-[background-color,border-color] duration-200"
        >
          <LinkedInIcon className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
