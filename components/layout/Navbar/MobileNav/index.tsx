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
import { ArrowRight, Phone, Mail, MapPin, Menu, X } from "lucide-react";
import { getNavLinks } from "../navData";
import { useTranslations, useLocale } from "next-intl";
import { useSiteData } from "@/hooks/useSiteData";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageToggle from "@/components/ui/LanguageToggle";
import { FacebookIcon, LinkedInIcon, WhatsappIcon } from "@/components/icons/SocialIcons";

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
  // Kept OFF while the drawer is translating, ON only once it's settled,
  // so the expensive backdrop-blur never competes with the slide animation.
  const [drawerReady, setDrawerReady] = useState(false);
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
          // Fires when playing forward (opening). Scroll lock happens
          // before tl.play() is called, so this stays purely visual.
          gsap.set([backdropRef.current, drawerRef.current], {
            display: "block",
            willChange: "transform, opacity",
          });
          gsap.set(drawerRef.current, { display: "flex" });
        },
        onComplete: () => {
          setDrawerReady(true);
          gsap.set([backdropRef.current, drawerRef.current], {
            willChange: "auto",
          });
        },
        onReverseComplete: () => {
          gsap.set([backdropRef.current, drawerRef.current], {
            display: "none",
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
          duration: 0.5,
          onReverseStart: () => setDrawerReady(false),
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
  }, [mounted]); // re-run once mounted becomes true and refs are populated

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

  // Safety: always release the scroll lock on unmount
  useEffect(() => unlockBodyScroll, []);

  useCloseOnEscape(isOpen, () => setIsOpen(false));
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* ── Menu / Close button ── */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
        aria-expanded={isOpen}
        className="relative z-[1050] flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm cursor-pointer overflow-hidden"
      >
        <span
          ref={menuIconRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Menu className="h-[18px] w-[18px]" strokeWidth={2.25} />
        </span>
        <span
          ref={closeIconRef}
          className="absolute inset-0 flex items-center justify-center opacity-0"
        >
          <X className="h-[18px] w-[18px]" strokeWidth={2.25} />
        </span>
      </button>

      {/* ── Portal: Backdrop + Drawer ── */}
      {mounted &&
        createPortal(
          <>
            {/* Backdrop — subtle dim, no blur on the whole screen, closes on click */}
            <div
              ref={backdropRef}
              onClick={closeMenu}
              style={{ display: "none" }}
              className="fixed inset-0 z-[990] bg-black/20 backdrop-blur-sm "
              aria-hidden="true"
            />

            {/* Drawer — half-screen panel, always slides in from the left.
                Background is solid while translating (drawerReady = false)
                and switches to the glassy blurred version only once the
                slide-in animation has fully completed. */}
            <div
              ref={drawerRef}
              style={{ display: "none" }}
              className={`fixed top-0 z-[99999] h-[100vh] w-[70vw] max-w-[400px] start-0 flex flex-col overscroll-none
                ${
                  drawerReady
                    ? "bg-white/70 dark:bg-[#09090f]/60 backdrop-blur-2xl backdrop-saturate-150"
                    : "bg-white/95 dark:bg-[#0b0b12]/95"
                }
                border-e border-slate-200/70 dark:border-white/10
                shadow-2xl shadow-black/30 overflow-hidden transition-colors duration-150`}
            >
              {/* Top accent line */}
              <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600" />

              {/* Ambient glow blobs — only rendered once the drawer has settled */}
              {drawerReady && (
                <>
                  <div className="absolute top-[-60px] end-[-60px] h-56 w-56 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-3xl pointer-events-none animate-in fade-in duration-300" />
                  <div className="absolute bottom-[-40px] start-[-40px] h-48 w-48 rounded-full bg-sky-400/5 dark:bg-sky-500/10 blur-3xl pointer-events-none animate-in fade-in duration-300" />
                </>
              )}

              {/* Inner content wrapper */}
              <div className="flex flex-col flex-1 px-5 sm:px-8 pt-3 sm:pt-5 pb-8 gap-4 md:gap-10 relative z-10 overflow-y-auto overflow-x-hidden overscroll-contain">
                {/* ── Header: Logo + Controls ── */}
                <div
                  ref={drawerHeaderRef}
                  className="flex items-center justify-between shrink-0 pb-2 sm:pb-4 border-b border-slate-100 dark:border-white/[0.07]"
                >
                  <Link href="/" onClick={closeMenu} className="inline-block">
                    <Image
                      src="/assets/logo.png"
                      alt="Nexora Solutions"
                      width={100}
                      height={30}
                      loading="lazy"
                      className="h-10 w-auto object-contain dark:hidden"
                    />
                    <Image
                      src="/assets/logo_dark.PNG"
                      alt="Nexora Solutions Dark"
                      width={100}
                      height={30}
                      loading="lazy"
                      className="h-10 w-auto object-contain hidden dark:block"
                    />
                  </Link>
                  <div className="flex items-center gap-2">
                    <LanguageToggle />
                    <ThemeToggle />
                  </div>
                </div>

                {/* ── Nav Links ── */}
                <nav
                  className="flex flex-col justify-center"
                  aria-label="Main navigation"
                >
                  <ul ref={linksContainerRef} className="list-none p-0 m-0">
                    {navLinks.map(({ label, href }, i) => (
                      <li key={href} className="relative overflow-hidden">
                        <Link
                          href={href}
                          onClick={closeMenu}
                          className="group flex items-center justify-between gap-4 py-1.5 sm:py-2.5"
                        >
                          <span className="text-[20px] sm:text-2xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {label}
                          </span>
                          <ArrowRight className="h-5 w-5 text-blue-500/80 dark:text-sky-400/80 group-hover:text-blue-600 dark:group-hover:text-blue-400 rtl:-scale-x-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all duration-300 shrink-0" />
                        </Link>
                        {/* Animated underline divider */}
                        <span
                          ref={(el) => setDividerRef(el, i)}
                          className="block h-px w-full bg-gradient-to-r from-blue-600/50 via-slate-300 dark:from-blue-600/30 dark:via-white/10 to-transparent origin-left"
                        />
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* ── Footer ── */}
                <div className="mt-auto space-y-4 shrink-0 pb-6 sm:pb-0">
                  {/* Contact info */}
                  <div
                    ref={footerInfoRef}
                    className="grid grid-cols-1 gap-1.5 sm:gap-2 font-mono text-[10px] md:text-xs"
                  >
                    <Link
                      href={map.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] px-3 py-2 sm:py-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-800 dark:hover:text-white transition-all border border-slate-100 dark:border-white/[0.06]"
                    >
                      <MapPin className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                      <span className="text-start leading-snug">
                        {contact.shortAddress}
                      </span>
                    </Link>
                    <Link
                      href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] px-3 py-2 sm:py-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-800 dark:hover:text-white transition-all border border-slate-100 dark:border-white/[0.06]"
                    >
                      <Phone className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span dir="ltr">{contact.phone}</span>
                    </Link>
                    <Link
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] px-3 py-2 sm:py-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:text-slate-800 dark:hover:text-white transition-all border border-slate-100 dark:border-white/[0.06]"
                    >
                      <Mail className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                      <span dir="ltr">{contact.email}</span>
                    </Link>
                  </div>

                  {/* Social Icons */}
                  <div className="flex items-center justify-center gap-2.5 pt-2">
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
                      href={contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="p-2 rounded-lg bg-[#25D366]/10 dark:bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 dark:hover:bg-[#25D366]/25 hover:border-[#25D366]/50 hover:scale-110 transition-all duration-300"
                    >
                      <WhatsappIcon className="h-5 w-5" />
                    </Link>
                    <Link
                      href={social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="p-2 rounded-lg bg-pink-500/10 dark:bg-pink-500/10 border border-pink-500/20 text-pink-500 hover:bg-pink-500/20 dark:hover:bg-pink-500/25 hover:border-pink-500/50 hover:scale-110 transition-all duration-300"
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
                </div>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
