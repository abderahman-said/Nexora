"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
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

/** Locks body scroll — deferred 1 RAF to avoid layout reflow in the same frame as GSAP play() */
function lockBodyScroll() {
  requestAnimationFrame(() => {
    document.body.style.overflow = "hidden";
  });
}

function unlockBodyScroll() {
  document.body.style.overflow = "";
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

  // Menu button icon refs (Menu <-> X crossfade)
  const menuIconRef = useRef<HTMLSpanElement>(null);
  const closeIconRef = useRef<HTMLSpanElement>(null);

  // Drawer elements
  const backdropRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerHeaderRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLUListElement>(null);
  const footerInfoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Single persistent, reversible timeline: built once, paused + reversed,
  // then toggled via play()/reverse().
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // ── Build the timeline once the refs exist ──
  useEffect(() => {
    if (
      !menuIconRef.current ||
      !closeIconRef.current ||
      !backdropRef.current ||
      !drawerRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        reversed: true,
        defaults: { ease: "power2.out", force3D: true },
        onStart: () => {
          if (backdropRef.current) {
            backdropRef.current.style.display = "block";
          }
          if (drawerRef.current) {
            drawerRef.current.style.display = "flex";
          }
        },
        onComplete: () => {
          // Add blur AFTER open animation ends — avoids backdrop-filter during sliding
          drawerRef.current?.classList.add("drawer-blur-active");
          glowRef.current?.classList.remove("opacity-0");
        },
        onReverseComplete: () => {
          if (backdropRef.current) backdropRef.current.style.display = "none";
          if (drawerRef.current) drawerRef.current.style.display = "none";
          drawerRef.current?.classList.remove("drawer-blur-active");
          glowRef.current?.classList.add("opacity-0");
          unlockBodyScroll();
        },
      });

      // ── Phase 0: GPU-only (transform + opacity) — runs simultaneously ──

      // Icon crossfade
      tl.to(menuIconRef.current, { rotate: 90, opacity: 0, scale: 0.6, duration: 0.2 }, 0)
        .fromTo(closeIconRef.current,
          { rotate: -90, opacity: 0, scale: 0.6 },
          { rotate: 0, opacity: 1, scale: 1, duration: 0.25 },
          0.06,
        );

      // Backdrop fade
      tl.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);

      // Drawer slide — only transform, no shadow during animation (removed shadow-2xl)
      tl.fromTo(
        drawerRef.current,
        { xPercent: isRtl ? 100 : -100 },
        { xPercent: 0, duration: 0.38, ease: "power3.out" },
        0,
      );

      // ── Phase 1: Content appears as ONE fade — much fewer per-frame calcs ──
      // Collect all inner content elements into one array, animate as a group
      const contentEls = [
        drawerHeaderRef.current,
        linksContainerRef.current,
        footerInfoRef.current,
      ].filter(Boolean);

      if (contentEls.length) {
        tl.fromTo(
          contentEls,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.28, stagger: 0.06 },
          0.22,
        );
      }

      tlRef.current = tl;
    });


    return () => {
      ctx.revert();
      tlRef.current = null;
    };
  }, [mounted, isRtl]); 

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (isOpen) {
      lockBodyScroll();
      tl.timeScale(1).play();
    } else {
      // 6× faster → near-instant close, non-blocking
      tl.timeScale(6).reverse();
    }
  }, [isOpen]);

  useEffect(() => unlockBodyScroll, []);

  useCloseOnEscape(isOpen, () => setIsOpen(false));
  const closeMenu = () => setIsOpen(false);

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
            {/* Drawer CSS — rendered once at portal root, not inside the animated drawer */}
            <style>{`
              .drawer-blur-inactive {
                backdrop-filter: none;
                -webkit-backdrop-filter: none;
              }
              .drawer-blur-active {
                background-color: rgb(255 255 255 / 0.75) !important;
                backdrop-filter: blur(16px) saturate(150%) !important;
                -webkit-backdrop-filter: blur(16px) saturate(150%) !important;
              }
              .dark .drawer-blur-active {
                background-color: rgb(9 9 15 / 0.7) !important;
              }
            `}</style>

            <div
              ref={backdropRef}
              onClick={closeMenu}
              style={{ display: "none", contain: "layout style" }}
              className="fixed inset-0 z-[990] bg-black/20"
              aria-hidden="true"
            />

            <div
              ref={drawerRef}
              style={{ display: "none" }}
              className="fixed top-0 z-[99999] h-[100vh] w-[70vw] max-w-[400px] start-0 flex flex-col overscroll-none
                bg-white/95 dark:bg-[#0b0b12]/95
                drawer-blur-inactive
                border-e border-slate-200/70 dark:border-white/10
                overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600" />

              {/* Glow orbs — opacity toggled via classList, no CSS transition to avoid compositor conflict */}
              <div ref={glowRef} className="opacity-0 pointer-events-none">
                <div className="absolute top-[-60px] end-[-60px] h-56 w-56 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-xl" />
                <div className="absolute bottom-[-40px] start-[-40px] h-48 w-48 rounded-full bg-sky-400/5 dark:bg-sky-500/10 blur-xl" />
              </div>

              <div className="flex flex-col flex-1 px-5 sm:px-8 pt-3 sm:pt-5 pb-8 gap-4 md:gap-10 relative z-10 overflow-y-auto overflow-x-hidden overscroll-contain">
                <MobileNavHeader drawerHeaderRef={drawerHeaderRef} closeMenu={closeMenu} />
                
                <MobileNavLinks 
                  linksContainerRef={linksContainerRef} 
                  navLinks={navLinks} 
                  closeMenu={closeMenu} 
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
