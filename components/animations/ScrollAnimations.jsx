'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollAnimations
 * ─────────────────────────────────────────────────────────────────────────────
 * Global GSAP ScrollTrigger system.
 * Injects floating side-decorators onto every `.scroll-section` and
 * wires up a full suite of advanced scroll animations:
 *
 *  • Side glyphs / numerals that parallax at different speeds (L + R)
 *  • Rotating geometric shapes (circles / squares / triangles)
 *  • Clip-path reveal on section entry
 *  • Stagger-up for headings and body text
 *  • Magnetic parallax cards
 *  • Horizontal marquee speed modulation based on scroll velocity
 *  • Progress indicator line drawn from top to bottom
 *
 * NOTE ON STYLING: every element this file injects is styled with Tailwind
 * utility classes passed straight into `className`. The original semantic
 * names (sd-left, sd-ring, orb-1, floating-glyph, etc.) are kept alongside
 * the Tailwind classes purely as query hooks — other functions below still
 * find these elements with `querySelector('.sd-ring')` and so on, so the
 * identifying class has to stay even though it no longer carries any CSS
 * itself. The only raw CSS left is the two `@keyframes` for the floating
 * orbs, since Tailwind has no utility-only way to define a custom
 * multi-stage keyframe animation without editing tailwind.config.js.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function ScrollAnimations() {
    useEffect(() => {
        const init = () => {
            const ctx = gsap.context(() => {
                injectSideDecorators();
                animateSections();
                animateProgressBar();
                animateFloatingOrbs();
                animateSideGlyphs();
            });
            return () => ctx.revert();
        };

        const raf = requestAnimationFrame(init);

        // refresh after full page load (images etc.) to fix any layout drift
        window.addEventListener('load', () => ScrollTrigger.refresh());

        return () => cancelAnimationFrame(raf);
    }, []);
    return null;   // purely behavioural – no DOM output of its own
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
        'sd-ring sd-ring-left w-9 h-9 rounded-full border border-blue-400/40 flex-shrink-0 will-change-transform after:content-[\'\'] after:block after:mx-auto after:h-1.5 after:w-1.5 after:rounded-full after:bg-[#2563eb] after:[margin-top:calc(50%-3px)]';
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
function animateSections() {
    const sections = document.querySelectorAll('.scroll-section');

    sections.forEach((sec, i) => {
        const left = sec.querySelector('.sd-left');
        const right = sec.querySelector('.sd-right');
        const ring = sec.querySelector('.sd-ring');
        const shape = sec.querySelector('.sd-shape');
        if (!sec.classList.contains('no-clip-reveal')) {
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
        // (clip-path reveal is handled above with no-clip-reveal guard)

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
            // slow upward drift while scrolling
            gsap.to(left, {
                yPercent: -20,
                ease: 'none',
                scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true }
            });
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
            gsap.to(right, {
                yPercent: -30,
                ease: 'none',
                scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true }
            });
        }

        /* ── D. Ring continuous rotation ── */
        if (ring) {
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
        if (shape) {
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

        /* ── F. Generic heading reveal inside section ── */
        const headings = sec.querySelectorAll('h2, h3');
        headings.forEach((h) => {
            gsap.from(h, {
                opacity: 0,
                y: 40,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: h,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                },
            });
        });

        /* ── G. Paragraph / body text stagger ── */
        const paras = sec.querySelectorAll('p:not(.sd-label)');
        if (paras.length) {
            gsap.from(paras, {
                opacity: 0,
                y: 24,
                duration: 0.7,
                stagger: 0.08,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: paras[0],
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                },
            });
        }
    });

    /* ── H. Cards / bento items ── */
    const cards = document.querySelectorAll('.bento-card, .process-step, .hw-feature, .about-feature');
    cards.forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 60,
            scale: 0.95,
            duration: 0.8,
            ease: 'power3.out',
            delay: (i % 4) * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
            },
        });
    });
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
function animateFloatingOrbs() {
    // Inject orbs once
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

/* ═══════════════════════════════════════════════════════════════════════════
   5. FLOATING BIG GLYPHS in background (very large, barely visible)
   ═══════════════════════════════════════════════════════════════════════════ */
function animateSideGlyphs() {
    if (document.querySelector('.floating-glyph')) return;

    const glyphs = [
        { text: '{', size: '28vw', left: '-6vw', top: '10vh' },
        { text: '}', size: '28vw', right: '-6vw', top: '40vh' },
        { text: '<', size: '22vw', left: '-4vw', top: '65vh' },
        { text: '>', size: '22vw', right: '-4vw', top: '80vh' },
        { text: '/', size: '18vw', left: '5vw', top: '130vh' },
        { text: '✦', size: '16vw', right: '3vw', top: '170vh' },
    ];

    glyphs.forEach(({ text, size, left, right, top }) => {
        const el = document.createElement('div');
        el.className =
            'floating-glyph fixed font-black leading-none tracking-[-0.05em] text-[rgba(15,23,42,0.035)] pointer-events-none select-none will-change-transform z-0';
        el.textContent = text;
        // These four are per-glyph and computed from the data above, so they
        // stay inline rather than becoming static Tailwind classes.
        el.style.fontSize = size;
        if (left) el.style.left = left;
        if (right) el.style.right = right;
        el.style.top = top;
        document.body.appendChild(el);

        // Parallax scroll: each glyph at a slightly different speed
        const speed = 0.4 + Math.random() * 0.5;
        gsap.to(el, {
            y: `-${Math.round(30 + Math.random() * 40)}vh`,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: speed,
            },
        });

        // Slow rotation
        gsap.to(el, {
            rotation: (Math.random() > 0.5 ? 1 : -1) * (10 + Math.random() * 20),
            duration: 6 + Math.random() * 6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });
    });
}