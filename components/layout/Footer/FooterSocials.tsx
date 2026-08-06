"use client";
import React  from "react";
import Link from 'next/link';
import { useSiteData } from "@/hooks/useSiteData";
import Image from "next/image";
import { FacebookIcon, LinkedInIcon } from "@/components/icons/SocialIcons";
 

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
