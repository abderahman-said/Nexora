"use client";

import React, {
  useState,
  useRef,
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

/** Closes the menu when Escape is pressed while it's open. */
function useCloseOnEscape(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);
}

function lockBodyScroll() {
  document.body.style.overflow = "hidden";
}

function unlockBodyScroll() {
  document.body.style.overflow = "";
}

// Cancel all pending Web Animations on an element (safe no-op if none)
function cancelAnims(el: HTMLElement | null) {
  if (!el) return;
  el.getAnimations().forEach((a) => a.cancel());
}

export function MobileNav() {
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === "ar";
  const { contact, map, social } = useSiteData();
  const navLinks = getNavLinks(t, locale);

  const [isOpen, setIsOpen] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Menu button icon refs
  const menuIconRef = useRef<HTMLSpanElement>(null);
  const closeIconRef = useRef<HTMLSpanElement>(null);

  // Drawer elements
  const backdropRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerHeaderRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLUListElement>(null);
  const footerInfoRef = useRef<HTMLDivElement>(null);

  // Pending close-then-navigate callback
  const pendingNavRef = useRef<(() => void) | null>(null);

  // ─── OPEN ───────────────────────────────────────────────────────────────────
  const runOpenAnimation = useCallback(() => {
    const backdrop = backdropRef.current;
    const drawer = drawerRef.current;
    if (!backdrop || !drawer) return;

    // Cancel any leftover animations from a previous open/close cycle
    cancelAnims(backdrop);
    cancelAnims(drawer);

    // Make visible
    backdrop.style.display = "block";
    drawer.style.display = "flex";
    // Promote drawer to its own GPU layer for the slide animation
    drawer.style.willChange = "transform";

    // Force reflow so display:flex is flushed before the animation starts
    void drawer.offsetWidth;

    // Backdrop fade-in
    backdrop.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 250,
      easing: "ease-out",
      fill: "forwards",
    });

    // Drawer slide-in — GPU transform only, no layout changes
    const slideFrom = isRtl ? "100%" : "-100%";
    const drawerAnim = drawer.animate(
      [
        { transform: `translateX(${slideFrom})` },
        { transform: "translateX(0)" },
      ],
      {
        duration: 320,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        fill: "forwards",
      },
    );

    drawerAnim.onfinish = () => {
      // Release will-change after animation — avoids permanent GPU memory cost
      if (drawer) drawer.style.willChange = "auto";
    };

    // Icon crossfade: Menu → X
    cancelAnims(menuIconRef.current);
    cancelAnims(closeIconRef.current);
    menuIconRef.current?.animate(
      [
        { opacity: 1, transform: "rotate(0deg) scale(1)" },
        { opacity: 0, transform: "rotate(90deg) scale(0.6)" },
      ],
      { duration: 180, easing: "ease-out", fill: "forwards" },
    );
    closeIconRef.current?.animate(
      [
        { opacity: 0, transform: "rotate(-90deg) scale(0.6)" },
        { opacity: 1, transform: "rotate(0deg) scale(1)" },
      ],
      { duration: 220, delay: 50, easing: "ease-out", fill: "forwards" },
    );

  }, [isRtl]);

  // ─── CLOSE ──────────────────────────────────────────────────────────────────
  const runCloseAnimation = useCallback(
    (onDone?: () => void) => {
      const backdrop = backdropRef.current;
      const drawer = drawerRef.current;
      if (!backdrop || !drawer) {
        onDone?.();
        return;
      }

      // Cancel lingering open animations immediately
      cancelAnims(backdrop);
      cancelAnims(drawer);

      // Promote for GPU slide-out
      drawer.style.willChange = "transform";

      // Very fast close (~80ms) so navigation feels instant
      const closeDuration = 80;

      backdrop.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: closeDuration,
        easing: "ease-in",
        fill: "forwards",
      });

      const slideTo = isRtl ? "100%" : "-100%";
      const drawerAnim = drawer.animate(
        [
          { transform: "translateX(0)" },
          { transform: `translateX(${slideTo})` },
        ],
        { duration: closeDuration, easing: "ease-in", fill: "forwards" },
      );

      // Icon crossfade: X → Menu
      cancelAnims(closeIconRef.current);
      cancelAnims(menuIconRef.current);
      closeIconRef.current?.animate(
        [
          { opacity: 1, transform: "rotate(0deg) scale(1)" },
          { opacity: 0, transform: "rotate(90deg) scale(0.6)" },
        ],
        { duration: closeDuration, easing: "ease-in", fill: "forwards" },
      );
      menuIconRef.current?.animate(
        [
          { opacity: 0, transform: "rotate(-90deg) scale(0.6)" },
          { opacity: 1, transform: "rotate(0deg) scale(1)" },
        ],
        { duration: closeDuration, easing: "ease-in", fill: "forwards" },
      );


      drawerAnim.onfinish = () => {
        backdrop.style.display = "none";
        drawer.style.display = "none";
        drawer.style.willChange = "auto";
        unlockBodyScroll();
        // Fire any pending navigation AFTER the drawer is fully hidden
        onDone?.();
      };
    },
    [isRtl],
  );

  useEffect(() => {
    if (!mounted) return;
    if (isOpen) {
      lockBodyScroll();
      runOpenAnimation();
    } else {
      // Check if there's a pending navigation waiting for close to finish
      const nav = pendingNavRef.current;
      pendingNavRef.current = null;
      runCloseAnimation(nav ?? undefined);
    }
  }, [isOpen, mounted, runOpenAnimation, runCloseAnimation]);

  useEffect(() => unlockBodyScroll, []);

  useCloseOnEscape(isOpen, () => setIsOpen(false));

  /**
   * Called by MobileNavLinks when a link is tapped.
   * Closes the drawer first, then runs the callback once the animation
   * completes — avoids the JS navigation + close animation racing each other.
   */
  const closeMenuThenRun = useCallback(
    (cb: () => void) => {
      pendingNavRef.current = cb;
      setIsOpen(false);
    },
    [],
  );

  const closeMenu = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <MobileNavTrigger
        isOpen={isOpen}
        toggleMenu={() => setIsOpen((prev) => !prev)}
        menuIconRef={menuIconRef}
        closeIconRef={closeIconRef}
      />

      {mounted &&
        createPortal(
          <>
            <div
              ref={backdropRef}
              onClick={closeMenu}
              style={{ display: "none", contain: "layout style" }}
              className="fixed inset-0 z-[990] bg-black/30"
              aria-hidden="true"
            />

            <div
              ref={drawerRef}
              style={{ display: "none", contain: "layout style paint" }}
              className="fixed top-0 z-[99999] h-[100dvh] w-[70vw] max-w-[400px] start-0 flex flex-col overscroll-none
                bg-white dark:bg-[#0b0b12]
                border-e border-slate-200/70 dark:border-white/10
                overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600" />

              {/* Subtle static glow — no blur filter, just a soft radial gradient */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 260px 200px at top right, rgba(59,130,246,0.07) 0%, transparent 70%), " +
                    "radial-gradient(ellipse 200px 160px at bottom left, rgba(14,165,233,0.04) 0%, transparent 70%)",
                }}
              />

              <div className="flex flex-col flex-1 px-5 sm:px-8 pt-3 sm:pt-5 pb-8 gap-4 md:gap-10 relative z-10 overflow-y-auto overflow-x-hidden overscroll-contain">
                <MobileNavHeader drawerHeaderRef={drawerHeaderRef} closeMenu={closeMenu} />

                <MobileNavLinks
                  linksContainerRef={linksContainerRef}
                  navLinks={navLinks}
                  closeMenuThenRun={closeMenuThenRun}
                />

                <MobileNavFooter
                  footerInfoRef={footerInfoRef}
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
