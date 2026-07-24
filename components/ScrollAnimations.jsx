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
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function ScrollAnimations() {
    useEffect(() => {
        /* ── wait for paint ─────────────────────────────────────────── */
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
    sections.forEach((sec, i) => {
        if (sec.querySelector('.sd-left')) return; // already injected

        const idx = String(i + 1).padStart(2, '0');
        const labels = ['Hero', 'Vision', 'Services', 'Portfolio', 'Process', 'Stack', 'Contact'];
        const label  = labels[i] || `0${i + 1}`;

        /* ── Left rail ── */
        const left = document.createElement('div');
        left.className = 'sd-left';
        left.innerHTML = `
            <div class="sd-ring sd-ring-left"></div>
            <div class="sd-tick-line"></div>
            <span class="sd-index">${idx}</span>
            <span class="sd-label">${label}</span>
        `;

        /* ── Right rail ── */
        const right = document.createElement('div');
        right.className = 'sd-right';
        right.innerHTML = `
            <div class="sd-shape sd-shape-${(i % 3)}"></div>
            <div class="sd-tick-line"></div>
            <span class="sd-label-r">${label.toUpperCase()}</span>
        `;

        sec.style.position = 'relative';
        sec.appendChild(left);
        sec.appendChild(right);
    });

    /* ── Inject global CSS for decorators ── */
    if (!document.getElementById('sd-styles')) {
        const style = document.createElement('style');
        style.id = 'sd-styles';
        style.textContent = `
            /* ── Rails ── */
            .sd-left, .sd-right {
                position: absolute;
                top: 0; bottom: 0;
                width: 56px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 16px;
                pointer-events: none;
                z-index: 20;
                overflow: hidden;
            }
            .sd-left  { left: 16px; }
            .sd-right { right: 16px; }

            @media (max-width: 1100px) {
                .sd-left, .sd-right { display: none; }
            }

            /* ── Rotating ring ── */
            .sd-ring {
                width: 36px; height: 36px;
                border-radius: 50%;
                border: 1px solid rgba(0,229,255,0.25);
                flex-shrink: 0;
                will-change: transform;
            }
            .sd-ring::after {
                content: '';
                display: block;
                width: 6px; height: 6px;
                background: #00e5ff;
                border-radius: 50%;
                margin: auto;
                margin-top: calc(50% - 3px);
            }

            /* ── Geometric shapes ── */
            .sd-shape {
                width: 28px; height: 28px;
                flex-shrink: 0;
                will-change: transform;
                opacity: 0.35;
            }
            .sd-shape-0 {
                border-radius: 50%;
                border: 1.5px solid #00e5ff;
            }
            .sd-shape-1 {
                border: 1.5px solid #6366f1;
                transform: rotate(45deg);
            }
            .sd-shape-2 {
                border-radius: 4px;
                border: 1.5px solid #2563eb;
            }

            /* ── Tick line ── */
            .sd-tick-line {
                width: 1px;
                height: 60px;
                background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent);
                flex-shrink: 0;
            }

            /* ── Text labels ── */
            .sd-index {
                font-family: 'Epilogue', sans-serif;
                font-size: 0.65rem;
                font-weight: 800;
                letter-spacing: 0.15em;
                color: rgba(0,229,255,0.5);
            }
            .sd-label, .sd-label-r {
                font-size: 0.6rem;
                font-weight: 600;
                letter-spacing: 0.2em;
                text-transform: uppercase;
                color: rgba(255,255,255,0.18);
                writing-mode: vertical-rl;
                text-orientation: mixed;
            }

            /* ── Global progress bar ── */
            #scroll-progress-bar {
                position: fixed;
                top: 0; left: 0;
                width: 0%;
                height: 2px;
                background: linear-gradient(90deg, #00e5ff, #2563eb, #6366f1);
                z-index: 9999;
                pointer-events: none;
                transform-origin: left;
                box-shadow: 0 0 12px rgba(0,229,255,0.6);
            }

            /* ── Floating orbs ── */
            .floating-orb {
                position: fixed;
                border-radius: 50%;
                pointer-events: none;
                will-change: transform;
                mix-blend-mode: screen;
                z-index: 0;
            }
            .orb-1 {
                width: 500px; height: 500px;
                background: radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%);
                left: -150px; top: 20vh;
            }
            .orb-2 {
                width: 400px; height: 400px;
                background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
                right: -100px; top: 50vh;
            }
            .orb-3 {
                width: 350px; height: 350px;
                background: radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%);
                left: 30vw; top: 80vh;
            }

            /* ── Floating glyphs ── */
            .floating-glyph {
                position: fixed;
                font-family: 'Epilogue', sans-serif;
                font-weight: 900;
                color: rgba(255,255,255,0.025);
                pointer-events: none;
                will-change: transform;
                z-index: 0;
                user-select: none;
                letter-spacing: -0.05em;
                line-height: 1;
            }
        `;
        document.head.appendChild(style);
    }
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. SECTION ANIMATIONS
   ═══════════════════════════════════════════════════════════════════════════ */
function animateSections() {
    const sections = document.querySelectorAll('.scroll-section');

    sections.forEach((sec, i) => {
        const left  = sec.querySelector('.sd-left');
        const right = sec.querySelector('.sd-right');
        const ring  = sec.querySelector('.sd-ring');
        const shape = sec.querySelector('.sd-shape');

        /* ── A. Clip-path section reveal ── */
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
                    scrub: 0.8,
                },
            }
        );

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
                scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 2 }
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
                scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
            });
        }

        /* ── D. Ring continuous rotation ── */
        if (ring) {
            gsap.to(ring, {
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
                    gsap.to(ring, { timeScale: speed, duration: 0.3 });
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
                    scrub: 1,
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
    document.body.appendChild(bar);

    gsap.to(bar, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
        },
    });
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. FLOATING BACKGROUND ORBS (parallax with scroll)
   ═══════════════════════════════════════════════════════════════════════════ */
function animateFloatingOrbs() {
    // Inject orbs once
    if (document.querySelector('.orb-1')) return;
    ['orb-1', 'orb-2', 'orb-3'].forEach(cls => {
        const orb = document.createElement('div');
        orb.className = `floating-orb ${cls}`;
        document.body.appendChild(orb);
    });

    // Slow CSS float animation
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        .orb-1 { animation: orb-float-a 14s ease-in-out infinite; }
        .orb-2 { animation: orb-float-b 18s ease-in-out infinite; }
        .orb-3 { animation: orb-float-a 22s ease-in-out infinite reverse; }

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

    // Parallax scroll
    gsap.to('.orb-1', {
        y: '-30vh',
        ease: 'none',
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 2 }
    });
    gsap.to('.orb-2', {
        y: '20vh',
        ease: 'none',
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 3 }
    });
    gsap.to('.orb-3', {
        y: '-15vh',
        ease: 'none',
        scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 1.5 }
    });
}

/* ═══════════════════════════════════════════════════════════════════════════
   5. FLOATING BIG GLYPHS in background (very large, barely visible)
   ═══════════════════════════════════════════════════════════════════════════ */
function animateSideGlyphs() {
    if (document.querySelector('.floating-glyph')) return;

    const glyphs = [
        { text: '{', size: '28vw', left: '-6vw',  top: '10vh'  },
        { text: '}', size: '28vw', right: '-6vw', top: '40vh'  },
        { text: '<', size: '22vw', left: '-4vw',  top: '65vh'  },
        { text: '>', size: '22vw', right: '-4vw', top: '80vh'  },
        { text: '/', size: '18vw', left:  '5vw',  top: '130vh' },
        { text: '✦', size: '16vw', right:  '3vw', top: '170vh' },
    ];

    glyphs.forEach(({ text, size, left, right, top }) => {
        const el = document.createElement('div');
        el.className = 'floating-glyph';
        el.textContent = text;
        el.style.fontSize = size;
        if (left)  el.style.left  = left;
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
