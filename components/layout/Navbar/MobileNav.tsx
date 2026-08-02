"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import {
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  X,
} from "lucide-react";
import { getNavLinks } from "./navData";
import { useTranslations, useLocale } from 'next-intl';
import Button from "@/components/ui/Button";
import { useSiteData } from "@/hooks/useSiteData";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageToggle from "@/components/ui/LanguageToggle";

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

const EASE = {
  reveal: "expo.out",
  hide: "power3.in",
  out: "power3.out",
  inOut: "power2.inOut",
  in: "power3.in",
} as const;

/** Closes the menu when Escape is pressed while it's open. */
function useCloseOnEscape(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
}

export function MobileNav() {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const { contact, map } = useSiteData();
  const locale = useLocale();
  const navLinks = getNavLinks(t, locale);

  const topBarRef = useRef<HTMLSpanElement>(null);
  const midBarRef = useRef<HTMLSpanElement>(null);
  const botBarRef = useRef<HTMLSpanElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const headerRowRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLUListElement>(null);
  const dividerRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const footerCtaRef = useRef<HTMLDivElement>(null);
  const footerInfoRef = useRef<HTMLDivElement>(null);
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);
  const ambientTweenRef = useRef<gsap.core.Timeline | null>(null);

  // Stable ref-setter for divider spans — avoids a fresh inline closure
  // identity on every render (was forcing React to null-then-set refs).
  const setDividerRef = useCallback((el: HTMLSpanElement | null, i: number) => {
    dividerRefs.current[i] = el;
  }, []);

  // Hamburger <-> X morph, overlay reveal, and staggered content animation.
  useEffect(() => {
    if (!topBarRef.current || !midBarRef.current || !botBarRef.current) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      const dividers = dividerRefs.current.filter(Boolean);

      if (isOpen) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        document.body.style.overflow = "hidden";

        // Hamburger -> X morph
        tl.to(
          topBarRef.current,
          { y: 6, rotate: 45, duration: 0.4, ease: EASE.out },
          0,
        )
          .to(
            midBarRef.current,
            { opacity: 0, scaleX: 0, duration: 0.25, ease: EASE.out },
            0,
          )
          .to(
            botBarRef.current,
            { y: -6, rotate: -45, duration: 0.4, ease: EASE.out },
            0,
          );

        // Full-bleed reveal — slower, more deliberate
        if (menuOverlayRef.current) {
          tl.to(
            menuOverlayRef.current,
            {
              display: "flex",
              opacity: 1,
              clipPath: "circle(150% at 90% 0%)",
              duration: 0.75,
              ease: EASE.reveal,
            },
            0,
          );
        }

        // Header row (logo + controls) drops in first
        if (headerRowRef.current) {
          tl.fromTo(
            headerRowRef.current,
            { opacity: 0, y: -16 },
            { opacity: 1, y: 0, duration: 0.5, ease: EASE.out },
            0.15,
          );
        }

        // Eyebrow (MENU label / count / status)
        if (eyebrowRef.current) {
          tl.fromTo(
            eyebrowRef.current,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.45, ease: EASE.out },
            0.3,
          );
        }

        // Nav links — wider stagger, slight "flip up" for weight
        if (linksContainerRef.current) {
          tl.fromTo(
            Array.from(linksContainerRef.current.children),
            { opacity: 0, y: 55, rotateX: -12 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.7,
              stagger: 0.11,
              ease: EASE.out,
              transformOrigin: "0% 100%",
            },
            0.42,
          );
        }

        // Underline dividers draw in right after each link lands
        if (dividers.length) {
          tl.fromTo(
            dividers,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.55,
              stagger: 0.11,
              ease: EASE.inOut,
              transformOrigin: "0% 50%",
            },
            0.62,
          );
        }

        // Footer CTA
        if (footerCtaRef.current) {
          tl.fromTo(
            footerCtaRef.current,
            { opacity: 0, y: 30, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: EASE.out },
            1.05,
          );
        }

        // Footer contact cards
        if (footerInfoRef.current) {
          tl.fromTo(
            Array.from(footerInfoRef.current.children),
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: EASE.out,
            },
            1.18,
          );
        }

        // Ambient background glow — slow continuous drift while open.
        // Skipped entirely when the user prefers reduced motion, and
        // uses will-change so the compositor doesn't repaint the
        // blurred layer from scratch on every tick.
        if (blobARef.current && blobBRef.current && !prefersReducedMotion) {
          gsap.set([blobARef.current, blobBRef.current], {
            willChange: "transform",
          });

          const ambient = gsap.timeline({ repeat: -1, yoyo: true });
          ambient
            .to(
              blobARef.current,
              { x: 20, y: -15, scale: 1.1, duration: 6, ease: "sine.inOut" },
              0,
            )
            .to(
              blobBRef.current,
              { x: -15, y: 10, scale: 1.08, duration: 7, ease: "sine.inOut" },
              0,
            );
          ambientTweenRef.current = ambient;
        }
      } else {
        document.body.style.paddingRight = "";
        document.body.style.overflow = "";

        ambientTweenRef.current?.kill();
        ambientTweenRef.current = null;
        if (blobARef.current && blobBRef.current) {
          gsap.set([blobARef.current, blobBRef.current], {
            willChange: "auto",
          });
        }

        tl.to(
          topBarRef.current,
          { y: 0, rotate: 0, duration: 0.3, ease: EASE.inOut },
          0,
        )
          .to(
            midBarRef.current,
            { opacity: 1, scaleX: 1, duration: 0.3, ease: EASE.inOut },
            0,
          )
          .to(
            botBarRef.current,
            { y: 0, rotate: 0, duration: 0.3, ease: EASE.inOut },
            0,
          );

        // Content exits quickly before the overlay collapses
        if (linksContainerRef.current) {
          tl.to(
            Array.from(linksContainerRef.current.children),
            { opacity: 0, y: -16, duration: 0.25, stagger: 0.03, ease: EASE.in },
            0,
          );
        }
        if (footerCtaRef.current || footerInfoRef.current) {
          tl.to(
            [footerCtaRef.current, footerInfoRef.current].filter(Boolean),
            { opacity: 0, y: 16, duration: 0.22, ease: EASE.in },
            0,
          );
        }

        if (menuOverlayRef.current) {
          tl.to(
            menuOverlayRef.current,
            {
              opacity: 0,
              clipPath: "circle(0% at 90% 0%)",
              duration: 0.45,
              ease: EASE.hide,
              onComplete: () => {
                gsap.set(menuOverlayRef.current, { display: "none" });
              },
            },
            0.05,
          );
        }
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  useCloseOnEscape(isOpen, () => setIsOpen(false));

  const closeMenu = () => setIsOpen(false);

  return (
    <div>
      {/* Theme-aware toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
        className="relative z-[1050] flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
      >
        <div className="flex flex-col justify-between h-[14px] w-[18px]">
          <span
            ref={topBarRef}
            className="h-[2px] w-full rounded-full bg-slate-800 dark:bg-white transition-colors block transform-gpu origin-center"
          />
          <span
            ref={midBarRef}
            className="h-[2px] w-full rounded-full bg-blue-600 dark:bg-blue-400 transition-colors block transform-gpu origin-center"
          />
          <span
            ref={botBarRef}
            className="h-[2px] w-full rounded-full bg-slate-800 dark:bg-white transition-colors block transform-gpu origin-center"
          />
        </div>
      </button>

      {/* Portal to body for a true fullscreen overlay */}
      {mounted &&
        createPortal(
          <div
            ref={menuOverlayRef}
            style={{ clipPath: "circle(0% at 90% 0%)", display: "none" }}
            className="fixed inset-0 w-screen h-screen z-[99999] flex flex-col bg-white/98 dark:bg-[#0a0a0e]/98 text-slate-900 dark:text-white backdrop-blur-3xl overflow-y-auto transition-colors duration-300"
          >
            {/* Ambient background glow — lighter blur radius keeps the
                compositor cost down while the drift animation runs */}
            <div
              ref={blobARef}
              className="absolute top-1/4 end-[-10%] h-80 w-80 rounded-full bg-blue-500/10 dark:bg-blue-600/20 blur-2xl pointer-events-none"
            />
            <div
              ref={blobBRef}
              className="absolute bottom-0 start-[-5%] h-64 w-64 rounded-full bg-sky-500/5 dark:bg-sky-500/10 blur-2xl pointer-events-none"
            />

            <div className="w-full max-w-3xl mx-auto flex flex-col min-h-full px-5 sm:px-10 pt-5 pb-8 gap-6 relative z-10">

              {/* Top bar: logo + controls */}
              <div
                ref={headerRowRef}
                className="flex items-center justify-between shrink-0"
              >
                <Link href="/" onClick={closeMenu} className="inline-block">
                  <Image
                    src="/assets/logo.png"
                    alt="Nexora Solutions"
                    width={110}
                    height={34}
                    loading="lazy"
                    className="h-8 w-auto object-contain dark:hidden"
                  />
                  <Image
                    src="/assets/logo_dark.PNG"
                    alt="Nexora Solutions Dark"
                    width={110}
                    height={34}
                    loading="lazy"
                    className="h-8 w-auto object-contain hidden dark:block"
                  />
                </Link>
                <div className="flex items-center gap-2.5">
                  <LanguageToggle />
                  <ThemeToggle />
                  <button
                    onClick={closeMenu}
                    aria-label="Close menu"
                    className="p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Eyebrow: fills the dead space, sets an editorial tone */}
              <div
                ref={eyebrowRef}
                className="flex items-center justify-between border-y border-slate-200 dark:border-white/10 py-3 shrink-0"
              >
                <span className="font-mono text-[11px] tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  MENU · {String(navLinks.length).padStart(2, "0")}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-slate-500 dark:text-slate-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Available now
                </span>
              </div>

              {/* Nav links */}
              <div className="flex-1 flex flex-col justify-center py-2">
                <ul
                  ref={linksContainerRef}
                  className="list-none p-0 m-0"
                  style={{ perspective: "800px" }}
                >
                  {navLinks.map(({ label, href }, i) => (
                    <li key={href} className="relative">
                      <Link
                        href={href}
                        onClick={closeMenu}
                        className="group flex items-center gap-4 py-4 md:py-5"
                      >
                        <span className="flex-1 flex items-center justify-between">
                          <span className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {label}
                          </span>
                          <ArrowUpRight className="h-5 w-5 md:h-7 md:w-7 text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
                        </span>
                      </Link>
                      <span
                        ref={(el) => setDividerRef(el, i)}
                        className="block h-px w-full bg-gradient-to-r from-blue-600/40 via-slate-300 dark:via-white/10 to-transparent origin-left"
                      />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom: WhatsApp CTA + contact cards */}
              <div className="space-y-4 shrink-0 mt-auto">
                <div ref={footerCtaRef}>
                  <Button
                    as={Link}
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    variant="gradient"
                    size="md"
                    className="w-full font-bold text-sm tracking-wide text-white shadow-lg shadow-blue-600/30"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Let&apos;s Talk on WhatsApp</span>
                  </Button>
                </div>

                <div
                  ref={footerInfoRef}
                  className="grid grid-cols-1 gap-2 font-mono text-xs"
                >
                  <Link
                    href={map.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl bg-slate-100/70 dark:bg-white/5 px-3.5 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600/10 dark:bg-blue-400/10">
                      <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </span>
                    <span className="text-start">{contact.shortAddress}</span>
                  </Link>

                  <Link
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 rounded-xl bg-slate-100/70 dark:bg-white/5 px-3.5 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600/10 dark:bg-emerald-400/10">
                      <Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </span>
                    <span className="text-start" dir="ltr">{contact.phone}</span>
                  </Link>

                  <Link
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 rounded-xl bg-slate-100/70 dark:bg-white/5 px-3.5 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-600/10 dark:bg-sky-400/10">
                      <Mail className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                    </span>
                    <span className="text-start" dir="ltr">{contact.email}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}