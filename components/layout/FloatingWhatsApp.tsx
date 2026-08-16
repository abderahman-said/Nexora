"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useSiteData } from "@/hooks/useSiteData";

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const { contact } = useSiteData();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-4 end-[-6px] sm:bottom-8 sm:end-[-10px] z-50 flex flex-col gap-2 sm:gap-3 transition-[transform,opacity] duration-500 ease-out transform ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-12 opacity-0 scale-50 pointer-events-none"
      }`}
    >
      <Link
        href={`tel:${contact.phone.replace(/\s/g, "")}`}
        className="group relative flex items-center justify-start ps-3.5 sm:ps-6 w-[50px] h-[40px] sm:w-[80px] sm:h-[52px] bg-transparent backdrop-blur-md border border-slate-300/50 dark:border-white/20 text-slate-800 dark:text-white rounded-s-full shadow-lg dark:shadow-2xl hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-150"
        aria-label="Call us"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 sm:w-[25px] sm:h-[25px]"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19.44 13c-.22 0-.45-.07-.67-.12a9.44 9.44 0 0 1-1.31-.39a2 2 0 0 0-2.48 1l-.22.45a12.18 12.18 0 0 1-2.66-2a12.18 12.18 0 0 1-2-2.66l.42-.28a2 2 0 0 0 1-2.48a10.33 10.33 0 0 1-.39-1.31c-.05-.22-.09-.45-.12-.68a3 3 0 0 0-3-2.49h-3a3 3 0 0 0-3 3.41a19 19 0 0 0 16.52 16.46h.38a3 3 0 0 0 2-.76a3 3 0 0 0 1-2.25v-3a3 3 0 0 0-2.47-2.9Zm.5 6a1 1 0 0 1-.34.75a1.05 1.05 0 0 1-.82.25A17 17 0 0 1 4.07 5.22a1.09 1.09 0 0 1 .25-.82a1 1 0 0 1 .75-.34h3a1 1 0 0 1 1 .79q.06.41.15.81a11.12 11.12 0 0 0 .46 1.55l-1.4.65a1 1 0 0 0-.49 1.33a14.49 14.49 0 0 0 7 7a1 1 0 0 0 .76 0a1 1 0 0 0 .57-.52l.62-1.4a13.69 13.69 0 0 0 1.58.46q.4.09.81.15a1 1 0 0 1 .79 1Z"
          />
        </svg>
      </Link>

      <Link
        href={contact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-start ps-3.5 sm:ps-6 w-[50px] h-[40px] sm:w-[80px] sm:h-[52px] bg-transparent backdrop-blur-md border border-slate-300/50 dark:border-white/20 text-slate-800 dark:text-white rounded-s-full shadow-lg dark:shadow-2xl hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-150"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 sm:w-[25px] sm:h-[25px]"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M24.504 7.504A11.875 11.875 0 0 0 16.05 4C9.465 4 4.1 9.36 4.1 15.945a11.882 11.882 0 0 0 1.594 5.973L4 28.109l6.336-1.664a11.958 11.958 0 0 0 5.71 1.457h.005c6.586 0 11.945-5.359 11.949-11.949c0-3.191-1.242-6.191-3.496-8.45zM16.05 25.883h-.004a9.93 9.93 0 0 1-5.055-1.383l-.363-.215l-3.762.985l1.004-3.665l-.234-.375a9.904 9.904 0 0 1-1.52-5.285c0-5.472 4.457-9.925 9.938-9.925a9.863 9.863 0 0 1 7.02 2.91a9.875 9.875 0 0 1 2.905 7.023c0 5.477-4.457 9.93-9.93 9.93zm5.445-7.438c-.297-.148-1.766-.87-2.039-.968c-.273-.102-.473-.149-.672.148c-.2.3-.77.973-.945 1.172c-.172.195-.348.223-.645.074c-.3-.148-1.261-.465-2.402-1.484c-.887-.79-1.488-1.77-1.66-2.067c-.176-.3-.02-.46.129-.61c.136-.132.3-.347.449-.523c.148-.171.2-.296.3-.496c.098-.199.048-.375-.027-.523c-.074-.148-.671-1.621-.921-2.219c-.243-.582-.489-.5-.672-.511c-.172-.008-.371-.008-.57-.008c-.2 0-.524.074-.798.375c-.273.297-1.043 1.02-1.043 2.488c0 1.469 1.07 2.89 1.22 3.09c.148.195 2.105 3.21 5.1 4.504a16.85 16.85 0 0 0 1.7.629c.715.226 1.367.195 1.883.12c.574-.085 1.765-.722 2.015-1.421c.247-.695.247-1.293.172-1.418c-.074-.125-.273-.2-.574-.352z"
          />
        </svg>
      </Link>
    </div>
  );
}