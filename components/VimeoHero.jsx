'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Particles from './Particles';
import GlitchText from './GlitchText';
import Magnet from './Magnet';
import CircularText from './CircularText';

gsap.registerPlugin(ScrollTrigger);

// ── Target values when fully scrolled ─────────────────────────────────────────
const MARGIN_MAX  = 30;   // px  — same as original design
const RADIUS_MAX  = 33;   // px  — same as original design
// How many pixels of scroll to reach the final values (short = snappy)
const SCROLL_DIST = 280;  // px

export default function VimeoHero() {
    const iframeRef   = useRef(null);
    const playerRef   = useRef(null);
    const bubbleRef   = useRef(null);
    const titleRef    = useRef(null);
    const controlsRef = useRef(null);
    const cvBtnRef    = useRef(null);

    const orb1Ref    = useRef(null);
    const orb2Ref    = useRef(null);
    const orb3Ref    = useRef(null);
    const badgeTLRef = useRef(null);
    const badgeTRRef = useRef(null);
    const badgeMLRef = useRef(null);

    const [isMuted,      setIsMuted]      = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const gsapSetters = useMemo(() => {
        const o1x = gsap.quickTo(orb1Ref.current, 'x', { duration: 1.8, ease: 'power2' });
        const o1y = gsap.quickTo(orb1Ref.current, 'y', { duration: 1.8, ease: 'power2' });
        const o2x = gsap.quickTo(orb2Ref.current, 'x', { duration: 2.4, ease: 'power2' });
        const o2y = gsap.quickTo(orb2Ref.current, 'y', { duration: 2.4, ease: 'power2' });
        const o3x = gsap.quickTo(orb3Ref.current, 'x', { duration: 1.4, ease: 'power2' });
        const o3y = gsap.quickTo(orb3Ref.current, 'y', { duration: 1.4, ease: 'power2' });

        const badges = [
            { el: badgeTLRef.current, strength: 28 },
            { el: badgeTRRef.current, strength: 22 },
            { el: badgeMLRef.current, strength: 25 },
        ].filter(b => b.el);

        const magneticSetters = badges.map(b => ({
            ...b,
            xTo: gsap.quickTo(b.el, 'x', { duration: 0.6, ease: 'power3' }),
            yTo: gsap.quickTo(b.el, 'y', { duration: 0.6, ease: 'power3' }),
        }));

        return { o1x, o1y, o2x, o2y, o3x, o3y, magneticSetters };
    }, []);

    const onMouseMove = useCallback((e) => {
        const hero = playerRef.current;
        if (!hero) return;

        const rect = hero.getBoundingClientRect();
        const nx = ((e.clientX - rect.left)  / rect.width  - 0.5) * 2;
        const ny = ((e.clientY - rect.top)   / rect.height - 0.5) * 2;

        const MAGNETIC_RADIUS = 160;
        const { o1x, o1y, o2x, o2y, o3x, o3y, magneticSetters } = gsapSetters;

        o1x(nx * 55); o1y(ny * 35);
        o2x(nx * -40); o2y(ny * -28);
        o3x(nx * 25); o3y(ny * 20);

        magneticSetters.forEach(({ el, strength, xTo, yTo }) => {
            const br   = el.getBoundingClientRect();
            const bx   = br.left + br.width  / 2;
            const by   = br.top  + br.height / 2;
            const dx   = e.clientX - bx;
            const dy   = e.clientY - by;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < MAGNETIC_RADIUS) {
                const pull = 1 - dist / MAGNETIC_RADIUS;
                xTo(dx * pull * strength / 28);
                yTo(dy * pull * strength / 28);
            } else {
                xTo(0); yTo(0);
            }
        });
    }, [gsapSetters]);

    const onMouseLeave = useCallback(() => {
        [orb1Ref, orb2Ref, orb3Ref].forEach(r => {
            if (r.current) gsap.to(r.current, { x: 0, y: 0, duration: 2, ease: 'elastic.out(1,0.3)' });
        });
        
        const badges = [
            { el: badgeTLRef.current, strength: 28 },
            { el: badgeTRRef.current, strength: 22 },
            { el: badgeMLRef.current, strength: 25 },
        ].filter(b => b.el);

        badges.forEach(({ el }) => {
            gsap.to(el, { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1,0.4)' });
        });
    }, []);

    /* ────────────────────────────────────────────────────
       ⓪ Enhanced text entrance animations
    ──────────────────────────────────────────────────── */
    useEffect(() => {
        const title = titleRef.current;
        const badges = [badgeTLRef.current, badgeTRRef.current, badgeMLRef.current].filter(Boolean);
        
        if (title) {
            // Split title into words for staggered animation
            const words = title.querySelectorAll('.word-item');
            gsap.set(words, { opacity: 0, y: 50, rotationX: 45 });
            
            gsap.to(words, {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.5
            });
        }
        
        // Animate badges with elastic entrance
        badges.forEach((badge, index) => {
            gsap.fromTo(badge,
                {
                    opacity: 0,
                    scale: 0,
                    rotation: Math.random() * 20 - 10
                },
                {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 0.8,
                    delay: 1.2 + index * 0.15,
                    ease: "back.out(1.7)"
                }
            );
        });
    }, []);

    /* ────────────────────────────────────────────────────
       ⓪ Scroll → margin + border-radius
          Drives CSS custom properties so the browser
          composites width/height/radius together with
          a single layout pass per frame.
    ──────────────────────────────────────────────────── */
    useEffect(() => {
        const hero = playerRef.current;
        if (!hero) return;

        // Proxy object GSAP can tween freely
        const proxy = { margin: 0, radius: 0 };

        const st = ScrollTrigger.create({
            trigger: document.body,   // fires from page top
            start: 'top top',
            end: `+=${SCROLL_DIST}`,
            scrub: 0.6,               // smooth lag — feel free to adjust 0.3–1.2
            onUpdate(self) {
                const p = self.progress;                    // 0 → 1
                // ease-out-quad so it feels snappy at first scroll then settles
                const eased = 1 - Math.pow(1 - p, 2);

                const m = eased * MARGIN_MAX;
                const r = eased * RADIUS_MAX;

                hero.style.setProperty('--hero-margin', `${m.toFixed(2)}px`);
                hero.style.setProperty('--hero-radius', `${r.toFixed(2)}px`);
            },
        });

        return () => st.kill();
    }, []);

    /* ────────────────────────────────────────────────────
       ① Mouse Parallax — orbs track cursor at diff depths
         ② Magnetic Badges — attract toward cursor
    ──────────────────────────────────────────────────── */
    useEffect(() => {
        const hero = playerRef.current;
        if (!hero) return;

        hero.addEventListener('mousemove', onMouseMove);
        hero.addEventListener('mouseleave', onMouseLeave);

        return () => {
            hero.removeEventListener('mousemove', onMouseMove);
            hero.removeEventListener('mouseleave', onMouseLeave);
        };
    }, [onMouseMove, onMouseLeave]);

    /* ────────────────────────────────────────────────────
       ③ Title letter-split hover
    ──────────────────────────────────────────────────── */
    useEffect(() => {
        const title = titleRef.current;
        if (!title) return;

        const wrapLetters = (node) => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                const frag = document.createDocumentFragment();
                [...node.textContent].forEach(ch => {
                    const s = document.createElement('span');
                    s.className   = 'hero-letter';
                    s.textContent = ch === ' ' ? '\u00A0' : ch;
                    frag.appendChild(s);
                });
                node.parentNode.replaceChild(frag, node);
            } else if (node.nodeType === Node.ELEMENT_NODE && !node.closest('img, svg')) {
                [...node.childNodes].forEach(wrapLetters);
            }
        };

        title.querySelectorAll('.vimeo-hero__word > span').forEach(wrapLetters);

        const onLetterEnter = (e) => {
            const letter = e.currentTarget;
            gsap.killTweensOf(letter);
            gsap.fromTo(letter,
                { y: 0, scaleY: 1, scaleX: 1 },
                { y: -10, scaleY: 1.15, scaleX: 0.9, duration: 0.35, ease: 'power2.out', yoyo: true, repeat: 1 }
            );
        };

        const letters = title.querySelectorAll('.hero-letter');
        letters.forEach(l => {
            l.style.display = 'inline-block';
            l.addEventListener('mouseenter', onLetterEnter);
        });

        return () => letters.forEach(l => l.removeEventListener('mouseenter', onLetterEnter));
    }, []);

    /* ────────────────────────────────────────────────────
       ④ Hover mute bubble
    ──────────────────────────────────────────────────── */
    useEffect(() => {
        const bubble   = bubbleRef.current;
        const hero     = playerRef.current;
        const title    = titleRef.current;
        const controls = controlsRef.current;
        if (!bubble || !hero) return;

        const xTo = gsap.quickTo(bubble, 'x', { duration: 0.5, ease: 'power3' });
        const yTo = gsap.quickTo(bubble, 'y', { duration: 0.5, ease: 'power3' });

        const onMove  = (e) => { xTo(e.clientX + 13); yTo(e.clientY - 43); };
        const onEnter = () => {
            gsap.killTweensOf(bubble, 'opacity,scale,rotation');
            gsap.to(bubble, { opacity: 1, scale: 1, rotation: 0, duration: 1.7, delay: 0.05, ease: 'elastic.out(1, 0.4)' });
        };
        const onLeave = () => {
            gsap.killTweensOf(bubble, 'opacity,scale,rotation');
            gsap.to(bubble, { opacity: 0, scale: 0, rotation: -30, duration: 0.3, ease: 'sine.inOut' });
        };
        const hideBubble = () => {
            gsap.killTweensOf(bubble, 'opacity,scale,rotation');
            gsap.to(bubble, { opacity: 0, scale: 0, rotation: -30, duration: 0.3, ease: 'sine.inOut' });
        };
        const showBubble = () => {
            gsap.killTweensOf(bubble, 'opacity,scale,rotation');
            gsap.to(bubble, { opacity: 1, scale: 1, rotation: 0, duration: 0.3, ease: 'sine.inOut' });
        };
        const onTitleEnter = () => {
            hideBubble();
            if (controls) gsap.to(controls, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
        };
        const onTitleLeave = () => {
            showBubble();
            if (controls) gsap.to(controls, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
        };

        window.addEventListener('mousemove', onMove);
        hero.addEventListener('mouseenter', onEnter);
        hero.addEventListener('mouseleave', onLeave);
        if (title)    { title.addEventListener('mouseenter',    onTitleEnter); title.addEventListener('mouseleave',    onTitleLeave); }
        if (controls) { controls.addEventListener('mouseenter', hideBubble);   controls.addEventListener('mouseleave', showBubble);   }

        return () => {
            window.removeEventListener('mousemove', onMove);
            hero.removeEventListener('mouseenter', onEnter);
            hero.removeEventListener('mouseleave', onLeave);
            if (title)    { title.removeEventListener('mouseenter',    onTitleEnter); title.removeEventListener('mouseleave',    onTitleLeave); }
            if (controls) { controls.removeEventListener('mouseenter', hideBubble);   controls.removeEventListener('mouseleave', showBubble);   }
        };
    }, []);

    /* ────────────────────────────────────────────────────
       ⑤ CV Button infinite glow pulse
    ──────────────────────────────────────────────────── */
    useEffect(() => {
        const cvBtn = cvBtnRef.current;
        if (!cvBtn) return;

        gsap.to(cvBtn, {
            boxShadow:   '0px 0px 16px 2px rgba(255,255,255,0.5), inset 0px 0px 4px 1px rgba(255,255,255,0.2)',
            borderColor: 'rgba(255,255,255,0.9)',
            background:  'rgba(255,255,255,0.15)',
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });

        return () => gsap.killTweensOf(cvBtn);
    }, []);

    const toggleMute = useCallback((e) => {
        if (e) e.stopPropagation();
        if (!iframeRef.current) return;
        iframeRef.current.muted = !isMuted;
        setIsMuted(m => !m);
    }, [isMuted]);

    const toggleFullscreen = useCallback((e) => {
        if (e) e.stopPropagation();
        if (!document.fullscreenElement) {
            playerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    }, []);

    return (
        <>
            {/* Hover mute bubble */}
            <div
                ref={bubbleRef}
                className={`fixed top-0 left-0 pointer-events-none z-[9998] opacity-0 scale-0 -rotate-[30deg] origin-left ${isMuted ? '[&_.mute-icon-unmute]:hidden' : '[&_.mute-icon-mute]:hidden'}`}
            >
                <div className="relative w-[150px] h-[150px] flex items-center justify-center">
                    <img src="/assets/VimeoHero SVG/mute-bubble-blob.svg" alt="" className="absolute inset-0 w-full h-full" />
                    <div className="mute-icon-mute relative z-[1] w-[56px] h-[56px] text-brand-dark flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                        <svg viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="8" y="4" width="38" height="46" rx="4" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="2.5" />
                            <rect x="14" y="11" width="12" height="12" rx="2" fill="currentColor" opacity="0.7" />
                            <rect x="28" y="13" width="13" height="3" rx="1.5" fill="currentColor" />
                            <rect x="28" y="18" width="9" height="2.5" rx="1.25" fill="currentColor" opacity="0.5" />
                            <line x1="14" y1="28" x2="40" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                            <rect x="14" y="32" width="26" height="2.5" rx="1.25" fill="currentColor" opacity="0.6" />
                            <rect x="14" y="37" width="20" height="2.5" rx="1.25" fill="currentColor" opacity="0.6" />
                            <rect x="14" y="42" width="23" height="2.5" rx="1.25" fill="currentColor" opacity="0.6" />
                        </svg>
                    </div>
                    <div className="mute-icon-unmute relative z-[1] w-[56px] h-[56px] text-brand-dark flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                        <svg viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="8" y="4" width="38" height="46" rx="4" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeWidth="2.5" opacity="0.3" />
                            <rect x="14" y="11" width="12" height="12" rx="2" fill="currentColor" opacity="0.3" />
                            <rect x="28" y="13" width="13" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
                            <rect x="28" y="18" width="9" height="2.5" rx="1.25" fill="currentColor" opacity="0.3" />
                            <rect x="14" y="32" width="26" height="2.5" rx="1.25" fill="currentColor" opacity="0.3" />
                            <rect x="14" y="37" width="20" height="2.5" rx="1.25" fill="currentColor" opacity="0.3" />
                            <rect x="14" y="42" width="23" height="2.5" rx="1.25" fill="currentColor" opacity="0.3" />
                            <line x1="9" y1="45" x2="45" y2="9" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* ── Main hero container ── */}
            <div
                className={`relative w-[calc(100%-var(--hero-margin)*2)] h-[calc(100vh-var(--hero-margin)*2)] m-[var(--hero-margin)_auto] rounded-[var(--hero-radius)] overflow-hidden bg-brand-navy bg-[radial-gradient(circle_at_50%_40%,_rgba(0,112,243,0.25),_transparent_70%)] shadow-[0_0_50px_rgba(0,112,243,0.15)] cursor-[url('/assets/Cursor_SVG/cursor-pointer.svg')_2_0,pointer] will-change-[border-radius,margin]`}
                ref={playerRef}
                onClick={toggleMute}
            >
                <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
                    <Particles
                        particleColors={["#00dfd8", "#0070f3", "#ffffff"]}
                        particleCount={700}
                        particleSpread={40}
                        speed={0.9}
                        particleBaseSize={500}
                        moveParticlesOnHover
                        disableRotation
                        alphaParticles={false}
                        pixelRatio="1"
                    />
                </div>

                {/* Floating badges */}
                <div className="absolute z-[3] flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-brand-blue/10 backdrop-blur-[12px] text-white/90 font-mono text-[11px] tracking-[0.1em] uppercase whitespace-nowrap pointer-events-none opacity-0 animate-[fade-in-up_0.8s_ease_forwards,float-y_6s_ease-in-out_infinite] [animation-delay:0.4s,1.2s] top-[18%] left-[5%]" ref={badgeTLRef}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-brand-cyan" />
                    Premium Agency
                </div>
                <div className="absolute z-[3] flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-brand-blue/10 backdrop-blur-[12px] text-white/90 font-mono text-[11px] tracking-[0.1em] uppercase whitespace-nowrap pointer-events-none opacity-0 animate-[fade-in-up_0.8s_ease_forwards,float-y_7s_ease-in-out_infinite] [animation-delay:0.7s,1.5s] top-[25%] right-[6%]" ref={badgeTRRef}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-white" />
                    Enterprise Solutions
                </div>
                <div className="absolute z-[3] flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-brand-blue/10 backdrop-blur-[12px] text-white/90 font-mono text-[11px] tracking-[0.1em] uppercase whitespace-nowrap pointer-events-none opacity-0 animate-[fade-in-up_0.8s_ease_forwards,float-y_8s_ease-in-out_infinite] [animation-delay:1s,1.8s] top-[50%] left-[4%] -translate-y-1/2" ref={badgeMLRef}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-brand-cyan" />
                    Web · Mobile · Cloud
                </div>

                {/* Circular Text */}
                <div className="absolute top-[37%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[1] max-md:top-[50%]">
                    <CircularText
                        text="NEXORA*SOLUTIONS*"
                        onHover="speedUp"
                        spinDuration={20}
                        className="custom-class text-brand-cyan"
                    />
                </div>

                {/* Headline */}
                <div className="absolute bottom-[72px] left-0 right-0 px-[44px] z-[3] pointer-events-none">
                    <h1 className="font-epilogue font-black text-[clamp(2.5rem,6.5vw,6.5rem)] leading-none tracking-[-3px] capitalize text-white flex flex-wrap items-center justify-center gap-x-[0.16em] select-none pointer-events-auto cursor-[url('/assets/Cursor_SVG/cursor-text.svg')_2_0,text]" ref={titleRef} onClick={(e) => e.stopPropagation()}>
                        <span className="word-item inline-block static">code. </span>
                        <span className="word-item is--relative inline-block relative text-brand-cyan">
                            <GlitchText speed={1} enableShadows={false} enableOnHover={false} className='custom-class text-brand-cyan'>
                                innovate.
                            </GlitchText>
                        </span>
                        <div style={{ flexBasis: '100%', height: 0 }} />
                        <span className="word-item is--relative inline-block relative">
                            <div className="absolute top-[10%] right-[-0.6em] -translate-y-1/2 w-[0.8em] h-[0.8em] pointer-events-none rotate-[10deg]">
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <img src="/assets/VimeoHero SVG/pink-star.svg" alt="" className="w-full h-full hue-rotate-180" />
                                </div>
                            </div>
                            <img src="/assets/VimeoHero SVG/oval-underline.svg" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[104%] text-brand-cyan overflow-visible pointer-events-none [stroke-dasharray:1400] [stroke-dashoffset:1400] animate-[draw-oval-underline_1.4s_cubic-bezier(0.4,0,0.2,1)_forwards_0.3s]" />
                            <span>elevate.</span>
                        </span>
                    </h1>
                </div>

                {/* Controls */}
                <div className="absolute bottom-[28px] left-[44px] z-[4] flex items-center gap-1.5" ref={controlsRef} onClick={(e) => e.stopPropagation()}>
                    <Magnet padding={50} disabled={false} magnetStrength={50}>
                        <a
                            ref={cvBtnRef}
                            href="#contact"
                            className="flex items-center justify-center h-[36px] rounded-lg border-[1.5px] border-white/30 bg-white/10 text-white cursor-[url('/assets/Cursor_SVG/cursor-pointer.svg')_2_0,pointer] backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/70 hover:scale-[1.08] w-auto px-4 gap-2 text-[13px] font-semibold tracking-wider uppercase no-underline"
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            Call Us
                        </a>
                    </Magnet>

                    <button className="flex items-center justify-center w-[36px] h-[36px] [&>svg]:w-4 [&>svg]:h-4 rounded-lg border-[1.5px] border-white/30 bg-white/10 text-white cursor-[url('/assets/Cursor_SVG/cursor-pointer.svg')_2_0,pointer] backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/70 hover:scale-[1.08]" onClick={toggleFullscreen} aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
                        {!isFullscreen ? (
                            <svg viewBox="0 0 20 20" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.5 3.95833C2.5 3.15292 3.15292 2.5 3.95833 2.5H6.875C7.22017 2.5 7.5 2.77983 7.5 3.125C7.5 3.47017 7.22017 3.75 6.875 3.75H3.95833C3.84327 3.75 3.75 3.84327 3.75 3.95833V6.875C3.75 7.22017 3.47017 7.5 3.125 7.5C2.77983 7.5 2.5 7.22017 2.5 6.875V3.95833ZM12.5 3.125C12.5 2.77983 12.7798 2.5 13.125 2.5H16.0417C16.8471 2.5 17.5 3.15292 17.5 3.95833V6.875C17.5 7.22017 17.2202 7.5 16.875 7.5C16.5298 7.5 16.25 7.22017 16.25 6.875V3.95833C16.25 3.84327 16.1567 3.75 16.0417 3.75H13.125C12.7798 3.75 12.5 3.47017 12.5 3.125ZM3.125 12.5C3.47017 12.5 3.75 12.7798 3.75 13.125V16.0417C3.75 16.1567 3.84327 16.25 3.95833 16.25H6.875C7.22017 16.25 7.5 16.5298 7.5 16.875C7.5 17.2202 7.22017 17.5 6.875 17.5H3.95833C3.15292 17.5 2.5 16.8471 2.5 16.0417V13.125C2.5 12.7798 2.77983 12.5 3.125 12.5ZM16.875 12.5C17.2202 12.5 17.5 12.7798 17.5 13.125V16.0417C17.5 16.8471 16.8471 17.5 16.0417 17.5H13.125C12.7798 17.5 12.5 17.2202 12.5 16.875C12.5 16.5298 12.7798 16.25 13.125 16.25H16.0417C16.1567 16.25 16.25 16.1567 16.25 16.0417V13.125C16.25 12.7798 16.5298 12.5 16.875 12.5Z" fill="currentColor" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 20 20" fill="none">
                                <path d="M6.04167 7.5C6.84708 7.5 7.5 6.84708 7.5 6.04167L7.5 3.125C7.5 2.77983 7.22017 2.5 6.875 2.5C6.52982 2.5 6.25 2.77983 6.25 3.125L6.25 6.04167C6.25 6.15673 6.15672 6.25 6.04167 6.25L3.125 6.25C2.77983 6.25 2.5 6.52983 2.5 6.875C2.5 7.22018 2.77983 7.5 3.125 7.5L6.04167 7.5Z" fill="currentColor" />
                                <path d="M16.875 7.5C17.2202 7.5 17.5 7.22017 17.5 6.875C17.5 6.52982 17.2202 6.25 16.875 6.25L13.9583 6.25C13.8433 6.25 13.75 6.15673 13.75 6.04167L13.75 3.125C13.75 2.77983 13.4702 2.5 13.125 2.5C12.7798 2.5 12.5 2.77983 12.5 3.125L12.5 6.04167C12.5 6.84708 13.1529 7.5 13.9583 7.5L16.875 7.5Z" fill="currentColor" />
                                <path d="M12.5 16.875C12.5 17.2202 12.7798 17.5 13.125 17.5C13.4702 17.5 13.75 17.2202 13.75 16.875L13.75 13.9583C13.75 13.8433 13.8433 13.75 13.9583 13.75L16.875 13.75C17.2202 13.75 17.5 13.4702 17.5 13.125C17.5 12.7798 17.2202 12.5 16.875 12.5L13.9583 12.5C13.1529 12.5 12.5 13.1529 12.5 13.9583L12.5 16.875Z" fill="currentColor" />
                                <path d="M6.25 16.875C6.25 17.2202 6.52982 17.5 6.875 17.5C7.22017 17.5 7.5 17.2202 7.5 16.875L7.5 13.9583C7.5 13.1529 6.84708 12.5 6.04167 12.5L3.125 12.5C2.77982 12.5 2.5 12.7798 2.5 13.125C2.5 13.4702 2.77982 13.75 3.125 13.75L6.04167 13.75C6.15672 13.75 6.25 13.8433 6.25 13.9583L6.25 16.875Z" fill="currentColor" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}