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
            {/* Only the custom keyframes remain here — Tailwind has no utility
                for defining brand-new @keyframes without editing tailwind.config.js */}
             
            <div
                ref={heroRef}
                className="
                    relative min-h-screen flex flex-col items-center justify-center
                    text-center overflow-hidden bg-black
                    px-5 pt-[88px] pb-12
                    md:px-6 md:pt-24 md:pb-14
                "
            >
                {/* Image Background */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center bg-no-repeat opacity-[0.20] mix-blend-screen"
                />

                {/* Grid background */}
                <div
                    aria-hidden="true"
                    className="
                        absolute inset-0
                        [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
                        [background-size:80px_80px]
                        [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]
                    "
                />

             

                {/* ── RIGHT SIDE DECORATORS ── */}
                <div
                    aria-hidden="true"
                    className="hidden lg:flex absolute top-0 bottom-0 right-0 w-20 flex-col items-center justify-center gap-8 z-[5] pointer-events-none border-l border-white/5"
                >
                    <div className="hero-side-el flex items-center justify-center opacity-40 w-1.5 h-1.5 bg-transparent border border-white/40 rotate-45" />
                    <div className="hero-side-el flex items-center justify-center opacity-40 w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                    <div className="hero-side-el flex items-center justify-center opacity-40 text-[0.65rem] tracking-[0.3em] text-white">
                        2025
                    </div>
                    <div className="hero-side-el flex items-center justify-center opacity-40 w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                    <div className="hero-side-el flex items-center justify-center opacity-40 w-1.5 h-1.5 bg-white/40" />
                    <div className="hero-side-el flex items-center justify-center opacity-40 font-['Epilogue',sans-serif] text-[0.85rem] font-bold text-white">
                        WEB
                    </div>
                </div>

                {/* Particles */}
                <div aria-hidden="true" className="absolute inset-0 opacity-30">
                    <Particles
                        particleColors={['#00e5ff', '#2563eb', '#ffffff']}
                        particleCount={250}
                        speed={0.4}
                        particleBaseSize={300}
                        alphaParticles
                    />
                </div>

                {/* Mouse-follow glow */}
                <div
                    ref={glowRef}
                    aria-hidden="true"
                    className="
                        absolute w-[600px] h-[600px] rounded-full
                        -translate-x-1/2 -translate-y-1/2 pointer-events-none
                        [will-change:left,top]
                        bg-[radial-gradient(circle,rgba(0,229,255,0.12)_0%,rgba(37,99,235,0.08)_40%,transparent_70%)]
                    "
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                    {/* Badge */}
                    <div
                        ref={badgeRef}
                        className="
                            inline-flex items-center gap-2 px-[18px] py-2 mb-6
                            bg-white/[0.04] border border-white/[0.08] rounded-full
                            backdrop-blur-md text-xs font-semibold tracking-[0.12em]
                            uppercase text-white/70
                        "
                    >
                        <span
                            aria-hidden="true"
                            className="w-1.5 h-1.5 bg-[#00e5ff] rounded-full animate-[pulse-glow_2s_infinite]"
                        />
                        <span>Nexora Solutions — Premium Software Engineering</span>
                    </div>

                    {/* Headline */}
                    <h1
                        ref={headRef}
                        className="
                            font-['Epilogue',sans-serif] text-[clamp(2.25rem,5.5vw,5rem)]
                            font-black tracking-[-0.04em] leading-[1.05] text-white
                            max-w-[990px] mb-5 overflow-hidden
                        "
                    >
                        <span className="split-word">We</span>{' '}
                        <span className="split-word">architect</span>{' '}
                        <span className="split-word">scalable</span>{' '}
                        <span className="split-word">software</span>{' '}
                        <span className="split-word">that</span>{' '}
                        <span className="split-word inline-block bg-[linear-gradient(135deg,#00e5ff_0%,#2563eb_60%,#6366f1_100%)] bg-clip-text text-transparent">
                            powers
                        </span>{' '}
                        <span className="split-word inline-block bg-[linear-gradient(135deg,#00e5ff_0%,#2563eb_60%,#6366f1_100%)] bg-clip-text text-transparent">
                            your
                        </span>{' '}
                        <span className="split-word inline-block bg-[linear-gradient(135deg,#00e5ff_0%,#2563eb_60%,#6366f1_100%)] bg-clip-text text-transparent">
                            business.
                        </span>
                    </h1>

                    {/* Sub */}
                    <p
                        ref={subRef}
                        className="
                            text-[clamp(0.95rem,1.4vw,1.1rem)] text-white/50
                            max-w-[500px] leading-[1.65] mb-8 font-normal
                        "
                    >
                        Enterprise web apps. Native mobile products. Complex cloud architecture.
                        From system design to deployment — we engineer digital excellence.
                    </p>

                    {/* CTAs */}
                    <div ref={ctaRef} className="flex items-center justify-center gap-4 flex-wrap mb-11">
                        <Magnet padding={30} magnetStrength={25}>
                            <a
                                href="#portfolio"
                                className="
                                    group relative inline-flex items-center gap-2.5 overflow-hidden
                                    px-[30px] py-[15px] rounded-full bg-white text-black
                                    font-bold text-sm tracking-[-0.01em]
                                    transition-all duration-[250ms] ease-out
                                    hover:text-white hover:-translate-y-0.5
                                    hover:shadow-[0_12px_40px_rgba(0,229,255,0.25)]
                                    before:content-[''] before:absolute before:inset-0
                                    before:bg-[linear-gradient(135deg,#00e5ff,#2563eb)]
                                    before:opacity-0 before:transition-opacity before:duration-300
                                    hover:before:opacity-100
                                "
                            >
                                <span className="relative z-10">See Our Work</span>
                                <span aria-hidden="true" className="relative z-10">→</span>
                            </a>
                        </Magnet>
                        <Magnet padding={30} magnetStrength={25}>
                            <a
                                href="https://wa.me/201552323225"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    inline-flex items-center gap-2.5 px-[30px] py-[15px]
                                    rounded-full border border-white/10 bg-white/[0.04]
                                    backdrop-blur-md font-semibold text-sm text-white/80
                                    transition-all duration-[250ms] ease-out
                                    hover:bg-white/[0.08] hover:border-[rgba(0,229,255,0.25)]
                                    hover:text-white hover:-translate-y-0.5
                                "
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                WhatsApp Us
                            </a>
                        </Magnet>
                    </div>

                    {/* Stats */}
                    <div
                        ref={statsRef}
                        role="list"
                        className="
                            flex items-center gap-0 px-6 flex-wrap
                            bg-white/[0.03] border border-white/[0.06]
                            rounded-[20px] backdrop-blur-md overflow-hidden
                        "
                    >
                        {STATS.map(({ value, label }) => (
                            <div
                                key={label}
                                role="listitem"
                                className="
                                    relative text-center px-[18px] py-3
                                    md:px-7 md:py-4
                                    [&:not(:first-child)]:before:content-['']
                                    [&:not(:first-child)]:before:absolute
                                    [&:not(:first-child)]:before:left-0
                                    [&:not(:first-child)]:before:top-[20%]
                                    [&:not(:first-child)]:before:bottom-[20%]
                                    [&:not(:first-child)]:before:w-px
                                    [&:not(:first-child)]:before:bg-white/[0.06]
                                "
                            >
                                <span
                                    className="
                                        block font-['Epilogue',sans-serif] font-black tracking-[-0.04em]
                                        leading-none mb-1 text-[1.3rem] md:text-[1.6rem]
                                        bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent
                                    "
                                >
                                    {value}
                                </span>
                                <span className="text-[0.68rem] font-medium tracking-[0.08em] uppercase text-white/35">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll hint */}
                <div
                    aria-hidden="true"
                    className="
                        absolute bottom-6 left-1/2 -translate-x-1/2
                        flex flex-col items-center gap-2
                        text-white/25 text-[0.7rem] tracking-[0.15em] uppercase
                        [animation:fade-in-up_1s_ease_1.5s_both]
                    "
                >
                    <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent [animation:scroll-line_2s_ease_infinite]" />
                    <span>Scroll</span>
                </div>
            </div>
        </>
    );
}