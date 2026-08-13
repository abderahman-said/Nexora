"use client";

import {
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

  // Lock body scroll cleanly without changing body position.
  // Using position:fixed forces Safari to rebuild the layout tree and reflow
  // the entire page, which causes main-thread freezes when clicking links
  // as Next.js navigates. Using overflow:hidden on both html and body avoids
  // reflows completely.
  useEffect(() => {
    if (!isOpen) return;

    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    const prevHtmlOverflow = htmlEl.style.overflow;
    const prevBodyOverflow = bodyEl.style.overflow;

    htmlEl.style.overflow = "hidden";
    bodyEl.style.overflow = "hidden";

    // Prevent touch-scroll on the backdrop element only
    const preventTouch = (e: TouchEvent) => e.preventDefault();
    const backdropEl = backdropRef.current;
    backdropEl?.addEventListener("touchmove", preventTouch, { passive: false });

    return () => {
      backdropEl?.removeEventListener("touchmove", preventTouch);
      htmlEl.style.overflow = prevHtmlOverflow;
      bodyEl.style.overflow = prevBodyOverflow;
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

  // Mount the drawer's content (header/links/footer) one frame AFTER the
  // open transform has started, instead of in the same commit as isOpen.
  // Building that subtree (images, several Links, toggles) is real work —
  // doing it in the same tick the transition starts steals the transition's
  // first frame(s) on slower devices, which is what showed up as a freeze
  // the moment the menu was opened.
  useEffect(() => {
    if (!isOpen || hasOpenedOnce) return;
    const raf = requestAnimationFrame(() => setHasOpenedOnce(true));
    return () => cancelAnimationFrame(raf);
  }, [isOpen, hasOpenedOnce]);

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
            {/* NOTE: will-change-transform and overflow-hidden must NOT be on
                the same element on iOS Safari — mixing them forces a new
                stacking context that breaks GPU compositing and causes the
                freeze. The outer shell owns the transform; the inner shell
                clips the content. */}
            <div
              className={`fixed top-0 z-[99999] h-[100dvh] w-[75vw] max-w-[360px] start-0 will-change-transform transition-transform duration-150 ease-out ${
                isOpen
                  ? "translate-x-0 pointer-events-auto"
                  : "-translate-x-full rtl:translate-x-full pointer-events-none"
              }`}
            >
            {/* Inner shell: clips content, separate from the transform layer */}
            <div className="relative flex flex-col h-full overscroll-none overflow-hidden bg-white dark:bg-[#0b0b12] border-e border-slate-200/70 dark:border-white/10">
              {/* Top accent bar */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600" />

              {/* Menu content is only mounted after the first open, so it
                  never has to be built while the drawer is off-screen. */}
              {hasOpenedOnce && (
                <div
                  className="flex flex-col flex-1 px-5 sm:px-8 pt-4 pb-8 gap-4 md:gap-8 relative z-10 overflow-y-auto overflow-x-hidden overscroll-contain"
                  style={{ touchAction: "pan-y", WebkitOverflowScrolling: "auto" }}
                >
                  <MobileNavHeader closeMenu={closeMenu} />

                  <MobileNavLinks navLinks={navLinks} closeMenu={closeMenu} />

                  <MobileNavFooter contact={contact} map={map} social={social} />
                </div>
              )}
            </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}