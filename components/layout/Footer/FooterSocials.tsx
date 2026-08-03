"use client";
import React, { SVGProps } from "react";
import Link from "next/link";
import { useSiteData } from "@/hooks/useSiteData";
import Image from "next/image";

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12z" />
    </svg>
  );
}

export function FooterSocials() {
  const { social } = useSiteData();

  return (
    <div className="flex items-center gap-2.5 pt-2">
      <Link
        href={social.facebook}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="p-2 rounded-lg bg-[#1877F2]/10 dark:bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] hover:bg-[#1877F2]/20 dark:hover:bg-[#1877F2]/25 hover:border-[#1877F2]/50 hover:scale-110 transition-all duration-300"
      >
        <FacebookIcon className="h-5 w-5" />
      </Link>
      <Link
        href={social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="p-2 rounded-lg bg-[#1877F2]/10 dark:bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] hover:bg-[#1877F2]/20 dark:hover:bg-[#1877F2]/25 hover:border-[#1877F2]/50 hover:scale-110 transition-all duration-300"
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
        className="p-2 rounded-lg bg-[#1877F2]/10 dark:bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] hover:bg-[#1877F2]/20 dark:hover:bg-[#1877F2]/25 hover:border-[#1877F2]/50 hover:scale-110 transition-all duration-300"
      >
        <LinkedInIcon className="h-5 w-5" />
      </Link>
    </div>
  );
}
