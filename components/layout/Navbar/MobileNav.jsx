"use client";

import React, { useState, useRef, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowUpRight, Phone, Mail, MapPin, MessageCircle, X } from "lucide-react";
import { NAV_LINKS } from "./navData";

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const mounted = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

    const topBarRef = useRef(null);
    const midBarRef = useRef(null);
    const botBarRef = useRef(null);
    const menuOverlayRef = useRef(null);
    const linksContainerRef = useRef(null);
    const footerInfoRef = useRef(null);

    // Toggle GSAP menu bar & overlay animations
    useEffect(() => {
        if (!topBarRef.current || !midBarRef.current || !botBarRef.current) return;

        const ctx = gsap.context(() => {
            if (isOpen) {
                // 1. Morph Hamburger lines to X
                gsap.to(topBarRef.current, {
                    y: 6,
                    rotate: 45,
                    duration: 0.35,
                    ease: "power2.out"
                });
                gsap.to(midBarRef.current, {
                    opacity: 0,
                    scaleX: 0,
                    duration: 0.2,
                    ease: "power2.out"
                });
                gsap.to(botBarRef.current, {
                    y: -6,
                    rotate: -45,
                    duration: 0.35,
                    ease: "power2.out"
                });

                // 2. Reveal Fullscreen Overlay
                if (menuOverlayRef.current) {
                    gsap.to(menuOverlayRef.current, {
                        display: "flex",
                        opacity: 1,
                        clipPath: "circle(150% at 90% 0%)",
                        duration: 0.55,
                        ease: "power3.out"
                    });
                }

                // 3. Staggered Link Animation
                if (linksContainerRef.current) {
                    const links = Array.from(linksContainerRef.current.children);
                    gsap.fromTo(
                        links,
                        { opacity: 0, y: 35 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.45,
                            stagger: 0.08,
                            delay: 0.15,
                            ease: "power3.out"
                        }
                    );
                }

                // 4. Reveal Bottom Info
                if (footerInfoRef.current) {
                    gsap.fromTo(
                        footerInfoRef.current,
                        { opacity: 0, y: 25 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            delay: 0.35,
                            ease: "power2.out"
                        }
                    );
                }

                document.body.style.overflow = "hidden";
            } else {
                // Reset Hamburger lines
                gsap.to(topBarRef.current, {
                    y: 0,
                    rotate: 0,
                    duration: 0.3,
                    ease: "power2.inOut"
                });
                gsap.to(midBarRef.current, {
                    opacity: 1,
                    scaleX: 1,
                    duration: 0.3,
                    ease: "power2.inOut"
                });
                gsap.to(botBarRef.current, {
                    y: 0,
                    rotate: 0,
                    duration: 0.3,
                    ease: "power2.inOut"
                });

                // Hide Overlay
                if (menuOverlayRef.current) {
                    gsap.to(menuOverlayRef.current, {
                        opacity: 0,
                        clipPath: "circle(0% at 90% 0%)",
                        duration: 0.4,
                        ease: "power3.in",
                        onComplete: () => {
                            if (menuOverlayRef.current) {
                                gsap.set(menuOverlayRef.current, { display: "none" });
                            }
                        }
                    });
                }

                document.body.style.overflow = "";
            }
        });

        return () => ctx.revert();
    }, [isOpen]);

    // Close on ESC
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <div className="md:hidden">
            {/* Elegant Theme-Aware Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close Menu" : "Open Menu"}
                className="relative z-[1050] flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
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

            {/* Portal to Body ensures TRUE Viewport Fullscreen (100vw x 100vh) */}
            {mounted && createPortal(
                <div
                    ref={menuOverlayRef}
                    style={{ clipPath: "circle(0% at 90% 0%)", display: "none" }}
                    className="fixed inset-0 w-screen h-screen z-[99999] flex flex-col justify-between bg-[#0a0a0e]/98 text-white backdrop-blur-3xl p-6 sm:p-10 pt-6 pb-8 overflow-y-auto"
                >
                    {/* Ambient Radial Background Glow */}
                    <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-10 left-10 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

                    {/* Top Bar with Logo & Close Button */}
                    <div className="flex items-center justify-between relative z-10 pb-6 border-b border-white/10">
                        <Link href="/" onClick={handleLinkClick} className="inline-block">
                            <Image
                                src="/assets/logo.png"
                                alt="Nexora Solutions"
                                width={120}
                                height={38}
                                className="h-9 w-auto object-contain brightness-120"
                            />
                        </Link>
                        <button
                            onClick={() => setIsOpen(false)}
                            aria-label="Close menu"
                            className="p-2 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Staggered Navigation Links */}
                    <div className="my-auto py-8 relative z-10 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-400 uppercase tracking-widest">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
                            <span>Navigation Menu</span>
                        </div>
                        
                        <ul ref={linksContainerRef} className="space-y-5 list-none p-0 m-0">
                            {NAV_LINKS.map(({ label, href }, index) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        onClick={handleLinkClick}
                                        className="group flex items-center justify-between text-3xl font-extrabold tracking-tight text-slate-100 hover:text-blue-400 transition-colors py-2 border-b border-white/5"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-mono text-slate-500 group-hover:text-blue-400 transition-colors">
                                                0{index + 1}
                                            </span>
                                            <span>{label}</span>
                                        </div>
                                        <ArrowUpRight className="h-6 w-6 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Mobile Drawer Bottom Info & WhatsApp CTA */}
                    <div ref={footerInfoRef} className="pt-6 border-t border-white/10 space-y-5 relative z-10">
                        {/* Action Button */}
                        <Link
                            href="https://wa.me/201117180818"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleLinkClick}
                            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 font-bold text-sm tracking-wide text-white shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            <MessageCircle className="h-4 w-4" />
                            <span>Let's Talk on WhatsApp</span>
                        </Link>

                        {/* Direct Contact Info */}
                        <div className="grid grid-cols-1 gap-2 text-xs text-slate-400 font-mono pt-1">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                                <span>Cairo & Mansoura, Egypt</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                                <Link href="tel:+201117180818" className="hover:text-white transition-colors">+20 111 718 0818</Link>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                                <Link href="mailto:info@nexora-solutions.co" className="hover:text-white transition-colors">info@nexora-solutions.co</Link>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
