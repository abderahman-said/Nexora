import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export function FooterTopBar() {
  return (
    <div className="flex items-center justify-between border-b border-slate-800/80 px-10 py-6 max-md:px-6 max-md:py-4">
      {/* Left Logo */}
        <Image
          src="/assets/logo.png"
          alt="Nexora Solutions"
          width={240}
          height={80}
          className="h-auto max-h-[80px] w-auto object-contain"
        />

      {/* Center Subtitle */}
      <div className="text-center max-md:hidden">
        <span className="font-mono text-sm font-semibold tracking-wider text-slate-400 lowercase">
          front end & full stack engineering
        </span>
      </div>

      {/* Right WhatsApp Button */}
      <Link
        href="https://wa.me/201552323225"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Contact"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 transition-all duration-300 hover:scale-110 hover:bg-emerald-500 hover:text-white shadow-md shadow-emerald-500/10"
      >
        <MessageCircle className="h-5 w-5" />
      </Link>
    </div>
  );
}
