"use client";

import React, {
  useState,
  useRef,
  useEffect,
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

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

const EASE = {
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
  const linksContainerRef = useRef<HTMLUListElement>(null);
  const footerInfoRef = useRef<HTMLDivElement>(null);

  // Hamburger <-> X morph, overlay reveal, and staggered content animation.
  useEffect(() => {
    if (!topBarRef.current || !midBarRef.current || !botBarRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (isOpen) {
        document.body.style.overflow = "hidden";

        tl.to(
          topBarRef.current,
          { y: 6, rotate: 45, duration: 0.35, ease: EASE.out },
          0,
        )
          .to(
            midBarRef.current,
            { opacity: 0, scaleX: 0, duration: 0.2, ease: EASE.out },
            0,
          )
          .to(
            botBarRef.current,
            { y: -6, rotate: -45, duration: 0.35, ease: EASE.out },
            0,
          );

        if (menuOverlayRef.current) {
          tl.to(
            menuOverlayRef.current,
            {
              display: "flex",
              opacity: 1,
              clipPath: "circle(150% at 90% 0%)",
              duration: 0.55,
              ease: EASE.out,
            },
            0,
          );
        }

        if (linksContainerRef.current) {
          tl.fromTo(
            Array.from(linksContainerRef.current.children),
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: EASE.out },
            0.15,
          );
        }

        if (footerInfoRef.current) {
          tl.fromTo(
            footerInfoRef.current,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            0.35,
          );
        }
      } else {
        document.body.style.overflow = "";

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

        if (menuOverlayRef.current) {
          tl.to(
            menuOverlayRef.current,
            {
              opacity: 0,
              clipPath: "circle(0% at 90% 0%)",
              duration: 0.4,
              ease: EASE.in,
              onComplete: () => {
                gsap.set(menuOverlayRef.current, { display: "none" });
              },
            },
            0,
          );
        }
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  useCloseOnEscape(isOpen, () => setIsOpen(false));

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
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
            className="fixed inset-0 w-screen h-screen z-[99999] flex flex-col gap-[25px] bg-white/98 dark:bg-[#0a0a0e]/98 text-slate-900 dark:text-white backdrop-blur-3xl p-6 sm:p-10 pt-6 pb-8 overflow-y-auto transition-colors duration-300"
          >
            {/* Ambient background glow */}
            <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-blue-500/10 dark:bg-blue-600/20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-10 h-56 w-56 rounded-full bg-sky-500/5 dark:bg-sky-500/10 blur-3xl pointer-events-none" />

            {/* Top bar: logo + close */}
            <div className="flex items-center justify-between relative z-10 pb-6 border-b border-slate-200 dark:border-white/10">
              <Link href="/" onClick={closeMenu} className="inline-block">
                <Image
                  src="/assets/logo.png"
                  alt="Nexora Solutions"
                  width={120}
                  height={38}
                  className="h-16 w-auto object-contain dark:hidden"
                />
                <Image
                  src="/assets/logo_dark.PNG"
                  alt="Nexora Solutions Dark"
                  width={120}
                  height={38}
                  className="h-16 w-auto object-contain hidden dark:block"
                />
              </Link>
              <button
                onClick={closeMenu}
                aria-label="Close menu"
                className="p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Staggered nav links */}
            <div className=" py-5 relative z-10">
              <ul
                ref={linksContainerRef}
                className="space-y-3 list-none p-0 m-0"
              >
                {navLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={closeMenu}
                      className="group flex items-center justify-between text-2xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2 border-b border-slate-200 dark:border-white/5"
                    >
                      <div>{label}</div>
                      <ArrowUpRight className="h-6 w-6 text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom info + WhatsApp CTA */}
            <div ref={footerInfoRef} className="space-y-5 relative z-10">
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

              <div className="grid grid-cols-1 gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono pt-1">
                <Link
                  href={map.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <MapPin className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>{contact.shortAddress}</span>
                </Link>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <Link
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    {contact.phone}
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                  <Link
                    href={`mailto:${contact.email}`}
                    className="hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    {contact.email}
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
