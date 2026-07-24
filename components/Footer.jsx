"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { SOCIAL_ICONS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const headRef = useRef(null);
  const ctaRef = useRef(null);
  const infoRef = useRef(null);
  const bgWordRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let split;
      if (headRef.current) {
        split = new SplitType(headRef.current, { types: "chars,words" });
        gsap.set(split.chars, { y: "110%", opacity: 0 });
        gsap.to(split.chars, {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          stagger: 0.025,
          ease: "power4.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 80%" },
        });
      }

      if (ctaRef.current) {
        gsap.from(ctaRef.current.children || [], {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 70%" },
        });
      }

      if (infoRef.current) {
        gsap.from(infoRef.current.children || [], {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 65%" },
        });
      }

      // The giant "NEXORA" watermark fades in softly once the footer
      // enters view — the glow/dim pulse itself runs on a pure CSS
      // animation (see .footer-bg-word span), so it keeps breathing
      // even if ScrollTrigger never re-fires.
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (bgWordRef.current && !reduceMotion) {
        gsap.fromTo(
          bgWordRef.current,
          { autoAlpha: 0, scale: 0.94 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: { trigger: footerRef.current, start: "top 85%" },
          }
        );
      }

      return () => {
        if (split) split.revert();
      };
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
                .nexora-footer {
                    position: relative;
                    width: 100%;
                    background: #020617; /* Very dark blue/black for premium feel */
                    border-top: 1px solid rgba(255,255,255,0.05);
                    overflow: hidden;
                }
                .footer-ambient-bg {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                    pointer-events: none;
                }
                .footer-ambient-bg::before,
                .footer-ambient-bg::after {
                    content: '';
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(140px);
                    opacity: 0.15;
                    animation: float-orbs 10s ease-in-out infinite alternate;
                }
                .footer-ambient-bg::before {
                    width: 700px; height: 700px;
                    background: #00e5ff;
                    top: -200px; left: -200px;
                }
                .footer-ambient-bg::after {
                    width: 900px; height: 900px;
                    background: #4f46e5;
                    bottom: -400px; right: -200px;
                    animation-delay: -5s;
                }
                @keyframes float-orbs {
                    0% { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(60px, -60px) scale(1.1); }
                }

                /* ── Giant glowing "NEXORA" watermark ───────────────────
                   Pure background layer: position: absolute + negative
                   z-index means it takes up ZERO layout space (it can't
                   push the footer's height the way an in-flow element
                   would). It's clipped by .nexora-footer's overflow:
                   hidden and sits behind every real content layer via
                   z-index: -1, so it can visually peek out at the
                   bottom without ever crossing or pushing the columns,
                   icons or copyright line. Thin glowing stroke,
                   breathing light/dim pulse, kept subtle. */
                .footer-bg-word {
                    position: absolute;
                    left: 0;
                    bottom: 2.5vw;
                    width: 100%;
                    z-index: -1;
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    pointer-events: none;
                }
                .footer-bg-word span {
                    font-family: 'Epilogue', sans-serif;
                    font-weight: 900;
                    font-size: clamp(5rem, 18vw, 15rem);
                    line-height: 1;
                    letter-spacing: -0.02em;
                    white-space: nowrap;
                    color: transparent;
                    -webkit-text-stroke: 1.25px rgba(0, 229, 255, 0.12);
                    user-select: none;
                    will-change: filter, opacity, -webkit-text-stroke-color;
                    animation: nexora-glow-pulse 4.5s ease-in-out infinite;
                }
                @keyframes nexora-glow-pulse {
                    0%, 100% {
                        opacity: 0.25;
                        -webkit-text-stroke-color: rgba(0, 229, 255, 0.1);
                        filter:
                            drop-shadow(0 0 6px rgba(0, 229, 255, 0.1))
                            drop-shadow(0 0 24px rgba(79, 70, 229, 0.06));
                    }
                    50% {
                        opacity: 0.55;
                        -webkit-text-stroke-color: rgba(0, 229, 255, 0.28);
                        filter:
                            drop-shadow(0 0 18px rgba(0, 229, 255, 0.3))
                            drop-shadow(0 0 60px rgba(79, 70, 229, 0.22));
                    }
                }
                @media (prefers-reduced-motion: reduce) {
                    .footer-bg-word span {
                        animation: none;
                        opacity: 0.22;
                        -webkit-text-stroke-color: rgba(0, 229, 255, 0.14);
                    }
                }
                @media (max-width: 768px) {
                    .footer-bg-word { bottom: -6vw; }
                    .footer-bg-word span { font-size: clamp(3rem, 22vw, 7rem); }
                }

                .footer-grid-overlay {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
                    background-size: 80px 80px;
                    mask-image: radial-gradient(ellipse at 50% 0%, black 10%, transparent 80%);
                    z-index: 2;
                    pointer-events: none;
                }
                .footer-content-wrapper {
                    position: relative;
                    z-index: 3;
                }
                .footer-cta-zone {
                    padding: 140px 60px 80px;
                    text-align: center;
                    position: relative;
                }
                .footer-label {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.7rem;
                    font-weight: 600;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: #00e5ff;
                    margin-bottom: 32px;
                }
                .footer-label::before {
                    content: '';
                    display: block;
                    width: 24px; height: 1px;
                    background: #00e5ff;
                }
                .footer-cta-heading {
                    font-family: 'Epilogue', sans-serif;
                    font-size: clamp(2.5rem, 6vw, 5.5rem);
                    font-weight: 900;
                    letter-spacing: -0.04em;
                    line-height: 1.0;
                    color: #fff;
                    max-width: 700px;
                    margin: 0 auto 48px;
                    overflow: hidden;
                }
                .footer-cta-heading .gradient-word {
                    background: linear-gradient(135deg, #00e5ff, #2563eb, #6366f1);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    display: inline-block;
                }
                .footer-cta-actions {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 16px;
                    flex-wrap: wrap;
                    margin-bottom: 80px;
                }
                .footer-btn-primary {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 18px 36px;
                    border-radius: 100px;
                    background: #fff;
                    color: #000;
                    font-weight: 700;
                    font-size: 0.9375rem;
                    letter-spacing: -0.01em;
                    transition: all 0.25s ease;
                    position: relative;
                    overflow: hidden;
                }
                .footer-btn-primary::before {
                    content: '';
                    position: absolute; inset: 0;
                    background: linear-gradient(135deg, #00e5ff, #2563eb);
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                .footer-btn-primary:hover::before { opacity: 1; }
                .footer-btn-primary:hover { color: #fff; transform: translateY(-2px); box-shadow: 0 16px 40px rgba(0,229,255,0.2); }
                .footer-btn-primary span { position: relative; z-index: 1; }
                .footer-btn-secondary {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 18px 36px;
                    border-radius: 100px;
                    border: 1px solid rgba(255,255,255,0.1);
                    background: rgba(255,255,255,0.04);
                    backdrop-filter: blur(12px);
                    color: rgba(255,255,255,0.7);
                    font-weight: 600;
                    font-size: 0.9375rem;
                    transition: all 0.25s ease;
                }
                .footer-btn-secondary:hover {
                    background: rgba(255,255,255,0.08);
                    border-color: rgba(255,255,255,0.2);
                    color: #fff;
                    transform: translateY(-2px);
                }
                .footer-divider {
                    height: 1px;
                    background: rgba(255,255,255,0.06);
                    margin: 0 60px;
                }
                .footer-info-zone {
                    padding: 56px 60px 148px;
                    display: grid;
                    grid-template-columns: 1.3fr 1fr 1fr 1.1fr;
                    gap: 40px;
                    align-items: start;
                }
                .footer-brand {}
                .footer-brand-logo {
                    font-family: 'Epilogue', sans-serif;
                    font-weight: 900;
                    font-size: 1.5rem;
                    letter-spacing: -0.04em;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 18px;
                }
                .footer-brand-logo-mark {
                    width: 32px; height: 32px;
                    background: linear-gradient(135deg, #00e5ff, #2563eb);
                    border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                }
                .footer-brand-desc {
                    font-size: 0.85rem;
                    color: rgba(255,255,255,0.4);
                    line-height: 1.7;
                    max-width: 240px;
                }
                .footer-col-title {
                    font-family: 'Epilogue', sans-serif;
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                    color: rgba(255, 255, 255, 0.85);
                    margin-bottom: 22px;
                }
                .footer-col-links {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 13px;
                }
                .footer-col-link {
                    font-size: 0.9rem;
                    color: rgba(255,255,255,0.5);
                    transition: color 0.2s;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .footer-col-link:hover { color: #fff; }
                .footer-socials {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                }
                .footer-social-btn {
                    width: 40px; height: 40px;
                    border-radius: 10px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    display: flex; align-items: center; justify-content: center;
                    color: rgba(255,255,255,0.5);
                    transition: all 0.25s;
                }
                .footer-social-btn:hover {
                    background: rgba(255,255,255,0.1);
                    border-color: rgba(255,255,255,0.2);
                    color: #fff;
                    transform: translateY(-2px);
                }
                .footer-bottom {
                    position: relative;
                    z-index: 1;
                    padding: 24px 60px;
                    border-top: 1px solid rgba(255,255,255,0.05);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px;
                    flex-wrap: wrap;
                    background: linear-gradient(180deg, rgba(2,6,23,0) 0%, rgba(2,6,23,0.55) 40%, #020617 75%);
                }
                .footer-copy {
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.3);
                }
                .footer-copy a {
                    color: rgba(255,255,255,0.45);
                    transition: color 0.2s;
                }
                .footer-copy a:hover { color: #00e5ff; }
                .footer-contact-links {
                    display: flex;
                    gap: 24px;
                }
                .footer-contact-link {
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.4);
                    transition: color 0.2s;
                }
                .footer-contact-link:hover { color: #fff; }
                @media (max-width: 1024px) {
                    .footer-info-zone { grid-template-columns: 1fr 1fr; }
                }
                @media (max-width: 768px) {
                    .footer-cta-zone { padding: 80px 24px 60px; }
                    .footer-info-zone { grid-template-columns: 1fr; padding: 40px 24px; }
                    .footer-divider { margin: 0 24px; }
                    .footer-bottom { padding: 20px 24px; flex-direction: column; align-items: flex-start; }
                }
            `}</style>

      <footer
        id="contact"
        ref={footerRef}
        className="nexora-footer main-footer"
      >
        <div className="footer-content-wrapper">
          <div className="footer-bg-word" ref={bgWordRef} aria-hidden="true">
            <span>NEXORA</span>
          </div>

          {/* Info Zone */}
          <div ref={infoRef} className="footer-info-zone">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-brand-logo">
                <img
                  src="/assets/logo.png"
                  alt="Nexora Solutions"
                  style={{
                    height: "50px",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
              <p className="footer-brand-desc">
                Premium Software Engineering. Building robust digital infrastructure
                and scalable applications.
              </p>

              {/* Socials moved under brand for better visual balance */}
              <div className="footer-socials" style={{ marginTop: "24px" }}>
                {(SOCIAL_ICONS || []).map(({ href, label, svg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-btn"
                    aria-label={label}
                    dangerouslySetInnerHTML={{ __html: svg }}
                  />
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <div className="footer-col-title">Services</div>
              <ul className="footer-col-links" role="list">
                {[
                  "Web Development",
                  "Mobile Apps",
                  "UI/UX Design",
                  "Cloud & DevOps",
                  "Custom Software",
                ].map((s) => (
                  <li key={s}>
                    <a href="#services" className="footer-col-link">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-col-links" role="list">
                {[
                  { label: "About Us", href: "#about" },
                  { label: "Portfolio", href: "#portfolio" },
                  { label: "Process", href: "#process" },
                  { label: "Contact", href: "#contact" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="footer-col-link">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <div className="footer-col-title">Contact</div>
              <ul className="footer-col-links" role="list">
                <li>
                  <a
                    href="mailto:abdorady6500@gmail.com"
                    className="footer-col-link"
                  >
                    abdorady6500@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/201552323225"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-col-link"
                  >
                    +20 155 232 3225
                  </a>
                </li>
                <li className="footer-col-link" style={{ cursor: "default" }}>
                  Mansoura, Egypt
                </li>
                <li
                  className="footer-col-link"
                  style={{ cursor: "default", color: "rgba(0,229,255,0.6)" }}
                >
                  Available Worldwide ✦
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-divider" />

          {/* Bottom bar */}
          <div className="footer-bottom">
            <p className="footer-copy">
              © {new Date().getFullYear()} Nexora Solutions. Built with{" "}
              <a href="#" aria-label="Built with Next.js and GSAP">
                Next.js &amp; GSAP
              </a>
              .
            </p>
            <div className="footer-contact-links">
              <a
                href="mailto:abdorady6500@gmail.com"
                className="footer-contact-link"
              >
                abdorady6500@gmail.com
              </a>
              <a
                href="https://www.google.com/maps/place/Mansoura,+Egypt"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-link"
              >
                Mansoura, Egypt
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}