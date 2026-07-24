'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Particles from './Particles';
import Magnet from './Magnet';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
    { value: '50+', label: 'Projects Delivered' },
    { value: '5★', label: 'Average Rating' },
    { value: '3y', label: 'In Business' },
    { value: '100%', label: 'Client Satisfaction' },
];

export default function VimeoHero() {
    const heroRef  = useRef(null);
    const headRef  = useRef(null);
    const subRef   = useRef(null);
    const statsRef = useRef(null);
    const ctaRef   = useRef(null);
    const badgeRef = useRef(null);
    const glowRef  = useRef(null);

    useEffect(() => {
        const head = headRef.current;
        if (!head) return;

        // Find all word spans manually instead of using SplitType
        const words = head.querySelectorAll('.split-word');

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

            // Badge entrance
            tl.from(badgeRef.current, { opacity: 0, y: 20, scale: 0.9, duration: 0.7 });

            // Headline words stagger up
            gsap.set(words, { y: 40, opacity: 0, display: 'inline-block' });
            tl.to(words, {
                y: 0, opacity: 1,
                duration: 0.8,
                stagger: 0.04,
                ease: 'power3.out',
            }, '-=0.2');

            // Subtitle
            tl.from(subRef.current, { opacity: 0, y: 30, duration: 0.8 }, '-=0.5');

            // CTA
            tl.from(ctaRef.current?.children || [], {
                opacity: 0, y: 20, stagger: 0.1, duration: 0.6,
            }, '-=0.5');

            // Stats
            tl.from(statsRef.current?.children || [], {
                opacity: 0, y: 20, stagger: 0.08, duration: 0.5,
            }, '-=0.4');

            // Scroll parallax — hero moves up slightly (subtle parallax)
            gsap.to(heroRef.current, {
                yPercent: 10,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });

            // Side decorators parallax at different speeds
            const sideEls = heroRef.current.querySelectorAll('.hero-side-el');
            sideEls.forEach((el, i) => {
                const speed = 0.3 + i * 0.15;
                const dir   = i % 2 === 0 ? -1 : 1;
                gsap.to(el, {
                    y: `${dir * 120}px`,
                    rotation: dir * 25,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: speed,
                    },
                });
            });

            // Animated glow follows mouse
            const hero = heroRef.current;
            const glow = glowRef.current;
            const onMove = (e) => {
                const rect = hero.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                gsap.to(glow, {
                    left: x, top: y,
                    duration: 1.2, ease: 'power2.out',
                });
            };
            hero.addEventListener('mousemove', onMove);
            return () => hero.removeEventListener('mousemove', onMove);
        }, heroRef);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <>
            <style>{`
                .nexora-hero {
                    position: relative;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 96px 24px 56px;
                    overflow: hidden;
                    background: #000;
                }
                .hero-glow-cursor {
                    position: absolute;
                    width: 600px; height: 600px;
                    background: radial-gradient(circle, rgba(0,229,255,0.12) 0%, rgba(37,99,235,0.08) 40%, transparent 70%);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    will-change: left, top;
                    transition: none;
                }
                .hero-image-bg {
                    position: absolute;
                    inset: 0;
                    background-image: url('/hero-bg.png');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    opacity: 0.15;
                    mix-blend-mode: screen;
                }
                .hero-grid-bg {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
                    background-size: 80px 80px;
                    mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
                }
                .hero-particles {
                    position: absolute;
                    inset: 0;
                    opacity: 0.3;
                }
                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 18px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 100px;
                    backdrop-filter: blur(12px);
                    font-size: 0.75rem;
                    font-weight: 600;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.7);
                    margin-bottom: 24px;
                }
                .hero-badge-dot {
                    width: 6px; height: 6px;
                    background: #00e5ff;
                    border-radius: 50%;
                    animation: pulse-glow 2s infinite;
                }
                .hero-headline {
                    font-family: 'Epilogue', sans-serif;
                    font-size: clamp(2.25rem, 5.5vw, 5rem);
                    font-weight: 900;
                    letter-spacing: -0.04em;
                    line-height: 1.05;
                    color: #fff;
                    max-width: 990px;
                    margin-bottom: 20px;
                    overflow: hidden;
                }
                .hero-headline .gradient-word {
                    background: linear-gradient(135deg, #00e5ff 0%, #2563eb 60%, #6366f1 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    display: inline-block;
                }
                .hero-sub {
                    font-size: clamp(0.95rem, 1.4vw, 1.1rem);
                    color: rgba(255,255,255,0.5);
                    max-width: 500px;
                    line-height: 1.65;
                    margin-bottom: 32px;
                    font-weight: 400;
                }
                .hero-cta-group {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 16px;
                    flex-wrap: wrap;
                    margin-bottom: 44px;
                }
                .hero-cta-primary {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 15px 30px;
                    background: #fff;
                    color: #000;
                    border-radius: 100px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    letter-spacing: -0.01em;
                    transition: all 0.25s ease;
                    position: relative;
                    overflow: hidden;
                }
                .hero-cta-primary::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, #00e5ff, #2563eb);
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                .hero-cta-primary:hover::before { opacity: 1; }
                .hero-cta-primary:hover { color: #fff; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,229,255,0.25); }
                .hero-cta-primary span { position: relative; z-index: 1; }
                .hero-cta-secondary {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 15px 30px;
                    border-radius: 100px;
                    border: 1px solid rgba(255,255,255,0.1);
                    background: rgba(255,255,255,0.04);
                    backdrop-filter: blur(12px);
                    font-weight: 600;
                    font-size: 0.9rem;
                    color: rgba(255,255,255,0.8);
                    transition: all 0.25s ease;
                }
                .hero-cta-secondary:hover {
                    background: rgba(255,255,255,0.08);
                    border-color: rgba(0,229,255,0.25);
                    color: #fff;
                    transform: translateY(-2px);
                }
                .hero-stats {
                    display: flex;
                    align-items: center;
                    gap: 0;
                    padding: 0 24px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 20px;
                    backdrop-filter: blur(12px);
                    overflow: hidden;
                }
                .hero-stat {
                    padding: 16px 28px;
                    text-align: center;
                    position: relative;
                }
                .hero-stat + .hero-stat::before {
                    content: '';
                    position: absolute;
                    left: 0; top: 20%; bottom: 20%;
                    width: 1px;
                    background: rgba(255,255,255,0.06);
                }
                .hero-stat-value {
                    font-family: 'Epilogue', sans-serif;
                    font-size: 1.6rem;
                    font-weight: 900;
                    letter-spacing: -0.04em;
                    background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    display: block;
                    line-height: 1;
                    margin-bottom: 4px;
                }
                .hero-stat-label {
                    font-size: 0.68rem;
                    font-weight: 500;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.35);
                }
                .hero-scroll-hint {
                    position: absolute;
                    bottom: 24px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    color: rgba(255,255,255,0.25);
                    font-size: 0.7rem;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    animation: fade-in-up 1s ease 1.5s both;
                }
                .scroll-line {
                    width: 1px; height: 40px;
                    background: linear-gradient(to bottom, rgba(255,255,255,0.3), transparent);
                    animation: scroll-line 2s ease infinite;
                }
                @keyframes scroll-line {
                    0%   { transform: scaleY(0); transform-origin: top; }
                    50%  { transform: scaleY(1); transform-origin: top; }
                    50.1%{ transform: scaleY(1); transform-origin: bottom; }
                    100% { transform: scaleY(0); transform-origin: bottom; }
                }
                .hero-side {
                    position: absolute;
                    top: 0; bottom: 0;
                    width: 80px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 32px;
                    z-index: 5;
                    pointer-events: none;
                }
                .hero-side-left { left: 0; border-right: 1px solid rgba(255,255,255,0.05); }
                .hero-side-right { right: 0; border-left: 1px solid rgba(255,255,255,0.05); }
                
                .hero-side-el {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0.4;
                }
                .hse-line {
                    width: 1px;
                    height: 80px;
                    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent);
                }
                .hse-label {
                    writing-mode: vertical-rl;
                    transform: rotate(180deg);
                    font-size: 0.65rem;
                    letter-spacing: 0.3em;
                    color: #fff;
                }
                .hse-label-r { transform: none; }
                .hse-num {
                    font-family: 'Epilogue', sans-serif;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: #fff;
                }
                .hse-ring {
                    width: 8px; height: 8px;
                    border-radius: 50%;
                    border: 1px solid rgba(255,255,255,0.4);
                }
                .hse-square {
                    width: 6px; height: 6px;
                    background: rgba(255,255,255,0.4);
                }
                .hse-diamond {
                    width: 6px; height: 6px;
                    background: transparent;
                    border: 1px solid rgba(255,255,255,0.4);
                    transform: rotate(45deg);
                }
                @media (max-width: 1024px) {
                    .hero-side { display: none; }
                }
                @media (max-width: 768px) {
                    .nexora-hero { padding: 88px 20px 48px; }
                    .hero-stats { flex-wrap: wrap; gap: 0; }
                    .hero-stat { padding: 12px 18px; }
                    .hero-stat-value { font-size: 1.3rem; }
                }
            `}</style>

            <div ref={heroRef} className="nexora-hero">
                {/* Image Background */}
                <div className="hero-image-bg" aria-hidden="true" />
                
                {/* Grid background */}
                <div className="hero-grid-bg" aria-hidden="true" />

                {/* ── LEFT SIDE DECORATORS ── */}
                <div className="hero-side hero-side-left" aria-hidden="true">
                    <div className="hero-side-el hse-ring hse-ring-1" />
                    <div className="hero-side-el hse-line" />
                    <div className="hero-side-el hse-label">NEXORA</div>
                    <div className="hero-side-el hse-line" />
                    <div className="hero-side-el hse-ring hse-ring-2" />
                    <div className="hero-side-el hse-num">01</div>
                </div>

                {/* ── RIGHT SIDE DECORATORS ── */}
                <div className="hero-side hero-side-right" aria-hidden="true">
                    <div className="hero-side-el hse-diamond" />
                    <div className="hero-side-el hse-line" />
                    <div className="hero-side-el hse-label hse-label-r">2025</div>
                    <div className="hero-side-el hse-line" />
                    <div className="hero-side-el hse-square" />
                    <div className="hero-side-el hse-num">WEB</div>
                </div>

                {/* Particles */}
                <div className="hero-particles" aria-hidden="true">
                    <Particles
                        particleColors={['#00e5ff', '#2563eb', '#ffffff']}
                        particleCount={250}
                        speed={0.4}
                        particleBaseSize={300}
                        alphaParticles
                    />
                </div>

                {/* Mouse-follow glow */}
                <div ref={glowRef} className="hero-glow-cursor" aria-hidden="true" />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Badge */}
                    <div ref={badgeRef} className="hero-badge">
                        <span className="hero-badge-dot" aria-hidden="true" />
                        <span>Nexora Solutions — Premium Software Engineering</span>
                    </div>

                    {/* Headline */}
                    <h1 ref={headRef} className="hero-headline">
                        <span className="split-word">We</span>{' '}
                        <span className="split-word">architect</span>{' '}
                        <span className="split-word">scalable</span>{' '}
                        <span className="split-word">software</span>{' '}
                        <span className="split-word">that</span>{' '}
                        <span className="split-word gradient-word">powers</span>{' '}
                        <span className="split-word gradient-word">your</span>{' '}
                        <span className="split-word gradient-word">business.</span>
                    </h1>

                    {/* Sub */}
                    <p ref={subRef} className="hero-sub">
                        Enterprise web apps. Native mobile products. Complex cloud architecture.
                        From system design to deployment — we engineer digital excellence.
                    </p>

                    {/* CTAs */}
                    <div ref={ctaRef} className="hero-cta-group">
                        <Magnet padding={30} magnetStrength={25}>
                            <a href="#portfolio" className="hero-cta-primary">
                                <span>See Our Work</span>
                                <span aria-hidden="true">→</span>
                            </a>
                        </Magnet>
                        <Magnet padding={30} magnetStrength={25}>
                            <a href="https://wa.me/201552323225" target="_blank" rel="noopener noreferrer" className="hero-cta-secondary">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                WhatsApp Us
                            </a>
                        </Magnet>
                    </div>

                    {/* Stats */}
                    <div ref={statsRef} className="hero-stats" role="list">
                        {STATS.map(({ value, label }) => (
                            <div key={label} className="hero-stat" role="listitem">
                                <span className="hero-stat-value">{value}</span>
                                <span className="hero-stat-label">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll hint */}
                <div className="hero-scroll-hint" aria-hidden="true">
                    <div className="scroll-line" />
                    <span>Scroll</span>
                </div>
            </div>
        </>
    );
}