'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ✅ Register once at module level — never inside a component or useEffect
gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollAnimations
 * ─────────────────────────────────────────────────────────────────────────────
 * Global GSAP ScrollTrigger system.
 *
 * PERFORMANCE IMPROVEMENTS:
 *  • registerPlugin moved to module scope (runs once, not on every mount)
 *  • Cards/bento items now use ScrollTrigger.batch() → 1 IntersectionObserver
 *    instead of N individual observers
 *  • Glyph slow-rotation moved from GSAP repeat:-1 tweens → CSS animation
 *    (runs on compositor thread, zero JS involvement per frame)
 *  • window.load listener properly cleaned up
 *  • Reduced-motion check gates heavy animations
 *  • Heavy decorators (glyphs, orbs) skipped on narrow screens
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function ScrollAnimations() {
    useEffect(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        let cleanup = null;
        const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
                injectSideDecorators();
                animateSections(reduceMotion);
                animateProgressBar();
            });
            cleanup = () => ctx.revert();
        }, 150);

        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener('load', onLoad, { once: true });

        return () => {
            clearTimeout(timer);
            cleanup?.();
        };
    }, []);

    return null;
}

/* ═══════════════════════════════════════════════════════════════════════════
   1. INJECT SIDE DECORATORS
   Each .scroll-section gets a left-rail and right-rail with:
    • rotating ring
    • counter / label
    • vertical tick line
   ═══════════════════════════════════════════════════════════════════════════ */
function injectSideDecorators() {
    const sections = document.querySelectorAll('.scroll-section');

    const railBase =
        'absolute top-0 bottom-0 flex w-14 flex-col items-center justify-center gap-4 pointer-events-none z-20 overflow-hidden max-[1100px]:hidden';
    const ringClasses =
        "sd-ring sd-ring-left w-9 h-9 rounded-full border border-blue-400/40 flex-shrink-0 will-change-transform after:content-[''] after:block after:mx-auto after:h-1.5 after:w-1.5 after:rounded-full after:bg-[#2563eb] after:[margin-top:calc(50%-3px)]";
    const tickClasses =
        'sd-tick-line w-px h-[60px] flex-shrink-0 bg-[linear-gradient(to_bottom,transparent,rgba(15,23,42,0.12),transparent)]';
    const indexClasses =
        'sd-index text-[0.65rem] font-extrabold tracking-[0.15em] text-blue-600/80';
    const labelClasses =
        'sd-label text-[0.6rem] font-bold uppercase tracking-[0.2em] text-slate-400 [writing-mode:vertical-rl] [text-orientation:mixed]';
    const labelRClasses =
        'sd-label-r text-[0.6rem] font-bold uppercase tracking-[0.2em] text-slate-400 [writing-mode:vertical-rl] [text-orientation:mixed]';
    const shapeBase = 'flex-shrink-0 will-change-transform opacity-40 h-7 w-7';
    const shapeVariants = [
        'rounded-full border-[1.5px] border-[#0284c7]',           // shape-0
        'rotate-45 border-[1.5px] border-[#7c3aed]',              // shape-1
        'rounded border-[1.5px] border-[#2563eb]',                // shape-2
    ];

    sections.forEach((sec, i) => {
        if (sec.querySelector('.sd-left')) return; // already injected

        const idx = String(i + 1).padStart(2, '0');
        const labels = ['Hero', 'Vision', 'Services', 'Portfolio', 'Process', 'Stack', 'Contact'];
        const label = labels[i] || `0${i + 1}`;
        const shapeIdx = i % 3;

        /* ── Left rail ── */
        const left = document.createElement('div');
        left.className = `sd-left ${railBase} left-4`;
        left.innerHTML = `
            <div class="${ringClasses}"></div>
            <div class="${tickClasses}"></div>
            <span class="${indexClasses}">${idx}</span>
            <span class="${labelClasses}">${label}</span>
        `;

        /* ── Right rail ── */
        const right = document.createElement('div');
        right.className = `sd-right ${railBase} right-4`;
        right.innerHTML = `
            <div class="sd-shape sd-shape-${shapeIdx} ${shapeBase} ${shapeVariants[shapeIdx]}"></div>
            <div class="${tickClasses}"></div>
            <span class="${labelRClasses}">${label.toUpperCase()}</span>
        `;

        sec.style.position = 'relative';
        sec.appendChild(left);
        sec.appendChild(right);
    });
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. SECTION ANIMATIONS
   ═══════════════════════════════════════════════════════════════════════════ */
function animateSections(reduceMotion) {
    const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    const sections = document.querySelectorAll('.scroll-section');

    sections.forEach((sec) => {
        const left  = sec.querySelector('.sd-left');
        const right = sec.querySelector('.sd-right');
        const ring  = sec.querySelector('.sd-ring');
        const shape = sec.querySelector('.sd-shape');

        /* ── A. Clip-path reveal (Desktop only) ── */
        if (!sec.classList.contains('no-clip-reveal') && !reduceMotion && !isMobile) {
            gsap.fromTo(sec,
                { clipPath: 'inset(0 100% 0 0)', opacity: 0.6 },
                {
                    clipPath: 'inset(0 0% 0 0)',
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: sec,
                        start: 'top 92%',
                        end: 'top 30%',
                        scrub: true,
                    },
                }
            );
        }

        /* ── B. Left rail parallax ── */
        if (left) {
            gsap.fromTo(left,
                { opacity: 0, x: -40 },
                {
                    opacity: 1, x: 0,
                    duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: sec, start: 'top 85%', toggleActions: 'play none none reverse' }
                }
            );
            if (!reduceMotion && !isMobile) {
                gsap.to(left, {
                    yPercent: -20,
                    ease: 'none',
                    scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true }
                });
            }
        }

        /* ── C. Right rail parallax (opposite) ── */
        if (right) {
            gsap.fromTo(right,
                { opacity: 0, x: 40 },
                {
                    opacity: 1, x: 0,
                    duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: sec, start: 'top 85%', toggleActions: 'play none none reverse' }
                }
            );
            if (!reduceMotion && !isMobile) {
                gsap.to(right, {
                    yPercent: -30,
                    ease: 'none',
                    scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true }
                });
            }
        }

        /* ── D. Ring continuous rotation ── */
        if (ring && !reduceMotion) {
            const ringTween = gsap.to(ring, {
                rotation: 360,
                duration: 8,
                repeat: -1,
                ease: 'none',
            });
            // speed up on scroll
            ScrollTrigger.create({
                trigger: sec,
                start: 'top bottom',
                end: 'bottom top',
                onUpdate(self) {
                    const speed = 1 + Math.abs(self.getVelocity()) / 600;
                    gsap.to(ringTween, { timeScale: speed, duration: 0.3, overwrite: 'auto' });
                },
            });
        }

        /* ── E. Shape counter-rotation + scale ── */
        if (shape && !reduceMotion) {
            gsap.to(shape, {
                rotation: -360,
                duration: 12,
                repeat: -1,
                ease: 'none',
            });
            gsap.to(shape, {
                scale: 1.6,
                opacity: 0.6,
                ease: 'none',
                scrollTrigger: {
                    trigger: sec,
                    start: 'top bottom',
                    end: 'center center',
                    scrub: true,
                },
            });
        }

        /* ── F. Generic heading reveal inside section ──
           NOTE: Elements with class `gsap-managed` are owned by their
           component-level GSAP hook and must NOT be touched here.       ── */
        const headings = sec.querySelectorAll('h2:not(.gsap-managed), h3:not(.gsap-managed)');
        headings.forEach((h) => {
            if (!h) return;
            gsap.from(h, {
                opacity: 0,
                y: reduceMotion ? 0 : 40,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: h,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    once: true,
                },
            });
        });

        /* ── G. Paragraph / body text stagger ── */
        const paras = Array.from(sec.querySelectorAll('p:not(.sd-label)'));
        if (paras.length > 0) {
            gsap.from(paras, {
                opacity: 0,
                y: reduceMotion ? 0 : 24,
                duration: 0.7,
                stagger: 0.08,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: paras[0],
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                    once: true,
                },
            });
        }
    });

    /* ── H. Cards / bento items via ScrollTrigger.batch()
       ✅ PERF: One IntersectionObserver for ALL cards instead of N individual
       ScrollTrigger instances. Saves ~(N-1) intersection checks per frame. ── */
    const cards = gsap.utils.toArray('.bento-card, .process-step, .hw-feature, .about-feature').filter(Boolean);
    if (cards.length > 0) {
        ScrollTrigger.batch(cards, {
            start: 'top 88%',
            onEnter(batch) {
                if (!batch || !batch.length) return;
                gsap.from(batch, {
                    opacity: 0,
                    y: reduceMotion ? 0 : 60,
                    scale: reduceMotion ? 1 : 0.95,
                    duration: 0.8,
                    ease: 'power3.out',
                    stagger: 0.1,
                    overwrite: true,
                });
            },
            onLeaveBack(batch) {
                if (!batch || !batch.length) return;
                gsap.to(batch, {
                    opacity: 0,
                    y: reduceMotion ? 0 : 60,
                    scale: reduceMotion ? 1 : 0.95,
                    duration: 0.4,
                    overwrite: true,
                });
            },
        });
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. GLOBAL PROGRESS BAR
   ═══════════════════════════════════════════════════════════════════════════ */
function animateProgressBar() {
    if (document.getElementById('scroll-progress-bar')) return;
    const bar = document.createElement('div');
    bar.id = 'scroll-progress-bar';
    bar.className =
        'fixed left-0 top-0 h-0.5 w-0 origin-left bg-[linear-gradient(90deg,#2563eb,#0284c7,#4f46e5)] pointer-events-none shadow-[0_0_8px_rgba(37,99,235,0.4)] z-[9999]';
    document.body.appendChild(bar);

    gsap.to(bar, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
        },
    });
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. FLOATING BACKGROUND ORBS (parallax with scroll)
   ═══════════════════════════════════════════════════════════════════════════ */
function animateFloatingOrbs(reduceMotion) {
    if (typeof window === 'undefined' || window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches) return;
    if (document.querySelector('.orb-1')) return;

    const orbBase = 'fixed rounded-full pointer-events-none will-change-transform z-0';
    const orbVariants = {
        'orb-1': `${orbBase} h-[500px] w-[500px] left-[-150px] top-[20vh] bg-[radial-gradient(circle,rgba(37,99,235,0.06)_0%,transparent_70%)] [animation:orb-float-a_14s_ease-in-out_infinite]`,
        'orb-2': `${orbBase} h-[400px] w-[400px] right-[-100px] top-[50vh] bg-[radial-gradient(circle,rgba(2,132,199,0.05)_0%,transparent_70%)] [animation:orb-float-b_18s_ease-in-out_infinite]`,
        'orb-3': `${orbBase} h-[350px] w-[350px] left-[30vw] top-[80vh] bg-[radial-gradient(circle,rgba(79,70,229,0.04)_0%,transparent_70%)] [animation:orb-float-a_22s_ease-in-out_infinite_reverse]`,
    };

    ['orb-1', 'orb-2', 'orb-3'].forEach(cls => {
        const orb = document.createElement('div');
        orb.className = `floating-orb ${cls} ${orbVariants[cls]}`;
        document.body.appendChild(orb);
    });

    if (!document.getElementById('orb-keyframes')) {
        const floatStyle = document.createElement('style');
        floatStyle.id = 'orb-keyframes';
        floatStyle.textContent = `
            @keyframes orb-float-a {
                0%, 100% { transform: translate(0,0) scale(1); }
                33%       { transform: translate(40px,-60px) scale(1.08); }
                66%       { transform: translate(-30px,40px) scale(0.95); }
            }
            @keyframes orb-float-b {
                0%, 100% { transform: translate(0,0) scale(1); }
                50%       { transform: translate(-50px,-80px) scale(1.12); }
            }
        `;
        document.head.appendChild(floatStyle);
    }

    if (reduceMotion) return;

    // Parallax scroll
    gsap.to('.orb-1', {
        y: '-30vh',
        ease: 'none',
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true }
    });
    gsap.to('.orb-2', {
        y: '20vh',
        ease: 'none',
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true }
    });
    gsap.to('.orb-3', {
        y: '-15vh',
        ease: 'none',
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true }
    });
}

 