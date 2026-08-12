"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { getNavLinks } from "@/lib/data/navData";
import { useTranslations, useLocale } from "next-intl";
import { useSiteData } from "@/hooks/useSiteData";

// Extracted Presentational Components
import { MobileNavTrigger } from "./MobileNavTrigger";
import { MobileNavHeader } from "./MobileNavHeader";
import { MobileNavLinks } from "./MobileNavLinks";
import { MobileNavFooter } from "./MobileNavFooter";

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function MobileNav() {
  const t = useTranslations();
  const locale = useLocale();
  const { contact, map, social } = useSiteData();
  const navLinks = getNavLinks(t, locale);

  const [isOpen, setIsOpen] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <MobileNavTrigger isOpen={isOpen} toggleMenu={toggleMenu} />

      {mounted &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              onClick={closeMenu}
              className={`fixed inset-0 z-[990] bg-black/40 transition-opacity duration-100 ease-out ${
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
              aria-hidden="true"
            />

            {/* Drawer */}
            <div
              className={`fixed top-0 z-[99999] h-[100dvh] w-[75vw] max-w-[360px] start-0 flex flex-col overscroll-none
                bg-white dark:bg-[#0b0b12]
                border-e border-slate-200/70 dark:border-white/10
                overflow-hidden transition-transform duration-100 ease-out ${
                  isOpen
                    ? "translate-x-0 pointer-events-auto"
                    : "-translate-x-full rtl:translate-x-full pointer-events-none"
                }`}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600" />

              {/* Subtle static glow background */}
              <div
                className="pointer-events-none absolute inset-0 opacity-50"
                style={{
                  background:
                    "radial-gradient(ellipse 260px 200px at top right, rgba(59,130,246,0.07) 0%, transparent 70%), " +
                    "radial-gradient(ellipse 200px 160px at bottom left, rgba(14,165,233,0.04) 0%, transparent 70%)",
                }}
              />

              <div className="flex flex-col flex-1 px-5 sm:px-8 pt-4 pb-8 gap-4 md:gap-8 relative z-10 overflow-y-auto overflow-x-hidden overscroll-contain">
                <MobileNavHeader closeMenu={closeMenu} />

                <MobileNavLinks
                  navLinks={navLinks}
                  closeMenu={closeMenu}
                />

                <MobileNavFooter
                  contact={contact}
                  map={map}
                  social={social}
                />
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}

