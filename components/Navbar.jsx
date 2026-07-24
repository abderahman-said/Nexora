'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnet from './Magnet';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const navRef = useRef(null);
    const navInnerRef = useRef(null);
    const logoRef = useRef(null);
    const linksRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        const nav = navRef.current;
        const navInner = navInnerRef.current;
        if (!nav || !navInner) return;

        const ctx = gsap.context(() => {
            // 1. Initial Entrance Animation (Senior Level Polish)
            const tl = gsap.timeline({ delay: 0.1 });
            
            tl.from(navInner, {
                y: -100,
                opacity: 0,
                duration: 1.2,
                ease: "expo.out"
            })
            .from(logoRef.current, {
                opacity: 0,
                x: -20,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8")
            .from(linksRef.current?.children || [], {
                opacity: 0,
                y: -15,
                duration: 0.8,
                stagger: 0.05,
                ease: "power3.out"
            }, "-=0.8")
            .from(ctaRef.current, {
                opacity: 0,
                scale: 0.9,
                duration: 0.8,
                ease: "back.out(1.5)"
            }, "-=0.6");

            // 2. Smart Scroll Reveal & Morph (Floating Navbar behavior)
            let lastScrollY = window.scrollY;
            
            const handleScroll = () => {
                const currentScrollY = window.scrollY;
                const isScrollingDown = currentScrollY > lastScrollY;
                const isScrolledPastTop = currentScrollY > 60;

                // Handle the Morphing (Glassmorphism & Floating effect)
                if (isScrolledPastTop) {
                    nav.classList.add('is-floating');
                } else {
                    nav.classList.remove('is-floating');
                }

                // Handle Hide/Show on Scroll Direction
                if (isScrolledPastTop && isScrollingDown) {
                    gsap.to(nav, { yPercent: -120, duration: 0.5, ease: "power3.out", overwrite: "auto" });
                } else {
                    gsap.to(nav, { yPercent: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
                }

                lastScrollY = currentScrollY;
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
            return () => window.removeEventListener('scroll', handleScroll);
            
        }, navRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <style>{`
                .nexora-nav-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 1000;
                    padding: 24px 48px;
                    transition: padding 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                    pointer-events: none; /* Let clicks pass through empty space */
                }
                
                .nexora-nav-inner {
                    pointer-events: auto; /* Re-enable clicks on the actual navbar */
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: transparent;
                    padding: 12px 24px;
                    border-radius: 100px;
                    border: 1px solid transparent;
                    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }

                /* The Floating / Glassmorphism State */
                .is-floating .nexora-nav-inner {
                    background: rgba(2, 6, 23, 0.7);
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                    padding: 12px 28px;
                }
                .is-floating {
                    padding: 16px 48px;
                }

                .nav-logo {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                }
                
                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 48px;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                .nav-link {
                    font-family: 'Epilogue', sans-serif;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: rgba(255, 255, 255, 0.65);
                    text-decoration: none;
                    position: relative;
                    padding: 8px 0;
                    transition: color 0.3s ease;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }

                /* Premium hover indicator: A small glowing dot instead of a boring underline */
                .nav-link::before {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 50%;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: #00e5ff;
                    box-shadow: 0 0 8px rgba(0,229,255,0.8);
                    transform: translateX(-50%) scale(0) translateY(4px);
                    opacity: 0;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .nav-link:hover {
                    color: #fff;
                }

                .nav-link:hover::before {
                    transform: translateX(-50%) scale(1) translateY(0);
                    opacity: 1;
                }

                .nav-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 14px 32px;
                    border-radius: 100px;
                    background: #fff;
                    color: #050505;
                    font-family: 'Epilogue', sans-serif;
                    font-weight: 800;
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    text-decoration: none;
                    letter-spacing: 0.05em;
                    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s, color 0.3s;
                    will-change: transform;
                }
                
                .nav-cta svg {
                    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .nav-cta:hover {
                    transform: translateY(-2px);
                    background: #00e5ff;
                    color: #000;
                }
                
                .nav-cta:hover svg {
                    transform: translate(2px, -2px);
                }

                @media (max-width: 1024px) {
                    .nav-links { gap: 24px; }
                }

                @media (max-width: 768px) {
                    .nexora-nav-container { padding: 16px 20px; }
                    .is-floating { padding: 12px 20px; }
                    .is-floating .nexora-nav-inner { padding: 10px 20px; }
                    .nav-links { display: none; }
                    .nav-cta span.label { display: none; }
                    .nav-cta { padding: 12px; }
                    .nav-cta svg { margin: 0; }
                }
            `}</style>

            <header ref={navRef} className="nexora-nav-container">
                <div ref={navInnerRef} className="nexora-nav-inner">
                    
                    {/* Logo wrapped in Magnet for a premium feel */}
                    <div ref={logoRef}>
                        <Magnet padding={10} magnetStrength={4}>
                            <a href="/" className="nav-logo" aria-label="Nexora Solutions Home">
                                <img src="/assets/logo.png" alt="Nexora Solutions" style={{ height: '42px', width: 'auto', objectFit: 'contain' }} />
                            </a>
                        </Magnet>
                    </div>

                    {/* Links */}
                    <ul ref={linksRef} className="nav-links" role="list">
                        {NAV_LINKS.map(({ label, href }) => (
                            <li key={href}>
                                <a href={href} className="nav-link">{label}</a>
                            </li>
                        ))}
                    </ul>

                    {/* CTA */}
                    <div ref={ctaRef}>
                        <Magnet padding={20} magnetStrength={10}>
                            <a href="https://wa.me/201552323225" target="_blank" rel="noopener noreferrer" className="nav-cta">
                                <span className="label">Let's Talk</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="19" x2="19" y2="5"></line>
                                    <polyline points="10 5 19 5 19 14"></polyline>
                                </svg>
                            </a>
                        </Magnet>
                    </div>

                </div>
            </header>
        </>
    );
}
