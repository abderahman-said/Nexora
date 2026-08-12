"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
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
  // Content (links/footer) is only ever rendered after the first open, so
  // React doesn't build it upfront on every page while it's hidden.
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Ref to the backdrop element, so the touchmove listener is scoped to it
  // instead of the whole document (this was the main source of iOS jank).
  const backdropRef = useRef<HTMLDivElement | null>(null);

  // Lock body scroll and prevent background touch scroll on iOS
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      const preventTouch = (e: TouchEvent) => {
        e.preventDefault();
      };

      // Attached ONLY to the backdrop element, not document.
      // A document-wide { passive: false } touchmove listener forces Safari
      // to synchronously check every touch move in the whole page before it
      // can scroll, which is what caused the perceived "freeze".
      const backdropEl = backdropRef.current;
      backdropEl?.addEventListener("touchmove", preventTouch, {
        passive: false,
      });

      return () => {
        document.body.style.overflow = "";
        backdropEl?.removeEventListener("touchmove", preventTouch);
      };
    } else {
      document.body.style.overflow = "";
    }
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

  // toggleMenu is the only place isOpen ever flips to true, so we mark
  // hasOpenedOnce directly here (an event handler) instead of watching
  // isOpen in an effect. Setting it to true again on close is harmless —
  // React bails out since the value doesn't actually change.
  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
    setHasOpenedOnce(true);
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
            {/* Backdrop — no transition of its own; it just tracks the
                drawer's animation state so only ONE element is actually
                animating (the drawer's transform) at any given moment. */}
            <div
              ref={backdropRef}
              onClick={closeMenu}
              data-mobile-backdrop="true"
              style={{ touchAction: "none" }}
              className={`fixed inset-0 z-[990] bg-black/40 ${
                isOpen
                  ? "opacity-100 pointer-events-auto visible"
                  : "opacity-0 pointer-events-none invisible"
              }`}
              aria-hidden="true"
            />

            {/* Drawer */}
            <div
              className={`fixed top-0 z-[99999] h-[100dvh] w-[75vw] max-w-[360px] start-0 flex flex-col overscroll-none
                bg-white dark:bg-[#0b0b12]
                border-e border-slate-200/70 dark:border-white/10
                overflow-hidden transition-transform duration-150 ease-out will-change-transform ${
                  isOpen
                    ? "translate-x-0 pointer-events-auto"
                    : "-translate-x-full rtl:translate-x-full pointer-events-none"
                }`}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600" />

              {/* Menu content is only mounted after the first open, so it
                  never has to be built while the drawer is off-screen. */}
              {hasOpenedOnce && (
                <div
                  className="flex flex-col flex-1 px-5 sm:px-8 pt-4 pb-8 gap-4 md:gap-8 relative z-10 overflow-y-auto overflow-x-hidden overscroll-contain [-webkit-overflow-scrolling:touch]"
                  style={{ touchAction: "pan-y" }}
                >
                  <MobileNavHeader closeMenu={closeMenu} />

                  <MobileNavLinks navLinks={navLinks} closeMenu={closeMenu} />

                  <MobileNavFooter contact={contact} map={map} social={social} />
                </div>
              )}
            </div>
          </>,
          document.body,
        )}
    </>
  );
}