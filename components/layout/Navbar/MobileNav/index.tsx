"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { getNavLinks } from "../navData";
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

/** Locks body scroll. */
function lockBodyScroll() {
  document.body.style.overflow = "hidden";
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
  const footerCtaRef = useRef<HTMLDivElement>(null);
  const footerInfoRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dividerRefs = useRef<Array<HTMLSpanElement | null>>([]);

  // Single persistent, reversible timeline: built once, paused + reversed,
  // then toggled via play()/reverse().
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const setDividerRef = useCallback((el: HTMLSpanElement | null, i: number) => {
    dividerRefs.current[i] = el;
  }, []);

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
      const dividers = dividerRefs.current.filter(Boolean);

      const tl = gsap.timeline({
        paused: true,
        reversed: true,
        defaults: { ease: "power2.inOut", force3D: true },
        onStart: () => {
          gsap.set([backdropRef.current, drawerRef.current], {
            display: "block",
            willChange: "transform, opacity",
          });
          gsap.set(drawerRef.current, { display: "flex" });
          tl.timeScale(1); // Normal speed on open
        },
        onComplete: () => {
          // Add blur AFTER animation ends — zero React re-render
          drawerRef.current?.classList.add("drawer-blur-active");
          glowRef.current?.classList.remove("opacity-0");
          gsap.set([backdropRef.current, drawerRef.current], {
            willChange: "auto",
          });
        },
        onReverseStart: () => {
          tl.timeScale(1.8); // Close 1.8× faster → snappy
          // Remove blur before animation starts — GPU free for slide
          drawerRef.current?.classList.remove("drawer-blur-active");
          glowRef.current?.classList.add("opacity-0");
          gsap.set([backdropRef.current, drawerRef.current], {
            willChange: "transform, opacity",
          });
        },
        onReverseComplete: () => {
          gsap.set([backdropRef.current, drawerRef.current], {
            display: "none",
            willChange: "auto",
          });
          unlockBodyScroll();
        },
      });

      // Menu icon <-> Close icon crossfade
      tl.to(
        menuIconRef.current,
        { rotate: 90, opacity: 0, scale: 0.6, duration: 0.22 },
        0,
      ).fromTo(
        closeIconRef.current,
        { rotate: -90, opacity: 0, scale: 0.6 },
        { rotate: 0, opacity: 1, scale: 1, duration: 0.3 },
        0.08,
      );

      // Backdrop fade
      tl.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35 },
        0,
      );

      // Drawer slide
      tl.fromTo(
        drawerRef.current,
        { xPercent: isRtl ? 100 : -100 },
        {
          xPercent: 0,
          duration: 0.42,
          ease: "power3.inOut",
        },
        0,
      );

      // Header row drops in
      if (drawerHeaderRef.current) {
        tl.fromTo(
          drawerHeaderRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.3 },
          0.2,
        );
      }

      // Nav links stagger up
      if (linksContainerRef.current) {
        tl.fromTo(
          Array.from(linksContainerRef.current.children),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.05 },
          0.24,
        );
      }

      // Dividers draw in
      if (dividers.length) {
        tl.fromTo(
          dividers,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.3,
            stagger: 0.05,
            transformOrigin: "0% 50%",
          },
          0.3,
        );
      }

      // Footer CTA
      if (footerCtaRef.current) {
        tl.fromTo(
          footerCtaRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.3 },
          0.36,
        );
      }

      // Footer info cards
      if (footerInfoRef.current) {
        tl.fromTo(
          Array.from(footerInfoRef.current.children),
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.28, stagger: 0.04 },
          0.4,
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
      tl.play();
    } else {
      tl.reverse();
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
            <div
              ref={backdropRef}
              onClick={closeMenu}
              style={{ display: "none" }}
              className="fixed inset-0 z-[990] bg-black/20 backdrop-blur-sm"
              aria-hidden="true"
            />

            <div
              ref={drawerRef}
              style={{ display: "none" }}
              className="fixed top-0 z-[99999] h-[100vh] w-[70vw] max-w-[400px] start-0 flex flex-col overscroll-none
                bg-white/95 dark:bg-[#0b0b12]/95
                drawer-blur-inactive
                border-e border-slate-200/70 dark:border-white/10
                shadow-2xl shadow-black/30 overflow-hidden"
            >
              <style>{`
                .drawer-blur-active {
                  background-color: rgb(255 255 255 / 0.7) !important;
                  backdrop-filter: blur(40px) saturate(150%) !important;
                  -webkit-backdrop-filter: blur(40px) saturate(150%) !important;
                }
                .dark .drawer-blur-active {
                  background-color: rgb(9 9 15 / 0.6) !important;
                }
              `}</style>

              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600" />

              {/* Glow orbs — always mounted, shown/hidden via opacity only (no unmount re-render) */}
              <div ref={glowRef} className="opacity-0 transition-opacity duration-300 pointer-events-none">
                <div className="absolute top-[-60px] end-[-60px] h-56 w-56 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-3xl" />
                <div className="absolute bottom-[-40px] start-[-40px] h-48 w-48 rounded-full bg-sky-400/5 dark:bg-sky-500/10 blur-3xl" />
              </div>

              <div className="flex flex-col flex-1 px-5 sm:px-8 pt-3 sm:pt-5 pb-8 gap-4 md:gap-10 relative z-10 overflow-y-auto overflow-x-hidden overscroll-contain">
                <MobileNavHeader drawerHeaderRef={drawerHeaderRef} closeMenu={closeMenu} />
                
                <MobileNavLinks 
                  linksContainerRef={linksContainerRef} 
                  setDividerRef={setDividerRef} 
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
