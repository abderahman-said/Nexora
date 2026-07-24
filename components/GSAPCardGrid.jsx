'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Content ───────────────────────────────────────────────────────────────
// This is a real ordered sequence (a build process), so step numbers and a
// progress readout are earned here rather than decorative.
const STEPS = [
    {
        step: '01',
        title: 'Discover',
        subtitle: 'Research & strategy',
        description: 'We deep-dive into your business goals, target users, and technical landscape. Every constraint is mapped and every opportunity identified before a single line of code is written.',
        tags: ['User research', 'Competitive analysis', 'Technical scoping', 'Roadmap planning'],
        accent: '#5eead4',
        icon: '◎',
        metric: { value: '100%', label: 'Alignment before kickoff' },
    },
    {
        step: '02',
        title: 'Design',
        subtitle: 'UI/UX & prototyping',
        description: 'Interfaces built on a bulletproof design system. Wireframes to high-fidelity prototypes, validated with real user feedback before development begins.',
        tags: ['Design systems', 'Interactive prototypes', 'Accessibility (WCAG)', 'Brand alignment'],
        accent: '#a78bfa',
        icon: '◆',
        metric: { value: '3×', label: 'Faster dev with design tokens' },
    },
    {
        step: '03',
        title: 'Develop',
        subtitle: 'Agile engineering',
        description: 'Production-grade code in two-week sprints. Every pull request is reviewed, tested, and benchmarked. CI/CD pipelines keep the main branch always deployable.',
        tags: ['Next.js / React', 'TypeScript', 'CI/CD pipelines', 'Performance audits'],
        accent: '#60a5fa',
        icon: '◉',
        metric: { value: '99%', label: 'Test coverage target' },
    },
    {
        step: '04',
        title: 'Deploy',
        subtitle: 'Launch & scale',
        description: 'Zero-downtime production releases on cloud infrastructure with real-time monitoring. We stay with you after launch, iterating and scaling as your business grows.',
        tags: ['Cloud infra (AWS/GCP)', 'Zero-downtime deploy', 'Monitoring & alerts', 'Post-launch support'],
        accent: '#fbbf24',
        icon: '◈',
        metric: { value: '24/7', label: 'Monitoring & on-call support' },
    },
];

export default function GSAPCardGrid() {
    const sectionRef = useRef(null);   // outer trigger element (defines scroll length)
    const pinRef = useRef(null);       // element that gets pinned
    const panelsRef = useRef(null);    // stacked-panel container
    const stepRefs = useRef([]);       // individual step panels
    const dotRefs = useRef([]);        // nav dot buttons
    const fillRef = useRef(null);      // progress bar fill
    const readoutRef = useRef(null);   // "SEQ · 01/04 · DISCOVER" readout

    const [activeIndex, setActiveIndex] = useState(0);
    const totalSteps = STEPS.length;

    // Precompute so the click-to-jump handler and the ScrollTrigger setup agree
    // on exactly the same math.
    const stepFraction = useMemo(() => 1 / totalSteps, [totalSteps]);

    useEffect(() => {
        const section = sectionRef.current;
        const pin = pinRef.current;
        if (!section || !pin) return;

        const steps = stepRefs.current.filter(Boolean);
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Respect reduced-motion: skip the scroll-jacked pin entirely and just
        // let every step render in normal flow, stacked and always visible.
        if (reduceMotion) {
            gsap.set(steps, { rotationY: 0, position: 'relative' });
            return;
        }

        const ctx = gsap.context(() => {
            // Card-flip instead of a wipe: each panel rotates on its own Y axis
            // like turning a physical spec sheet. Because the outgoing card
            // fully finishes its rotation before the incoming one starts,
            // there's never a moment where both panels render at once —
            // no cross-blending, no "merging into each other".
            gsap.set(steps, { rotationY: 90, transformOrigin: 'center center' });
            gsap.set(steps[0], { rotationY: 0 });
            gsap.set(fillRef.current, { scaleX: 0, transformOrigin: 'left' });

            // `end` is a function so GSAP recalculates it on resize/refresh
            // instead of freezing in the viewport height at mount time.
            const getEnd = () => `+=${window.innerHeight * (totalSteps + 0.5)}`;

            const st = ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: getEnd,
                pin,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate(self) {
                    const idx = Math.min(totalSteps - 1, Math.floor(self.progress * totalSteps));
                    setActiveIndex((prev) => (prev === idx ? prev : idx));
                },
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: getEnd,
                    scrub: 1.1,
                    invalidateOnRefresh: true,
                },
            });

            steps.forEach((stepEl, i) => {
                const isLast = i === totalSteps - 1;
                const label = i === 0 ? 0 : `step-${i}`;

                tl.to(pin, { '--accent': STEPS[i].accent, duration: 0.4, ease: 'power2.out' }, label);
                tl.to(fillRef.current, { scaleX: (i + 1) / totalSteps, duration: 0.5, ease: 'power2.inOut' }, label);

                if (!isLast) {
                    tl.addLabel(`step-${i + 1}`, i === 0 ? '+=0.3' : `step-${i}+=0.3`);

                    // Outgoing panel: rotate away to edge-on (fully finishes first).
                    tl.to(stepEl, {
                        rotationY: -90,
                        duration: 0.15,
                        ease: 'power2.in',
                    }, `step-${i + 1}`);

                    // Incoming panel: starts only once the outgoing card has
                    // finished rotating away — strictly sequential, no overlap.
                    tl.fromTo(
                        steps[i + 1],
                        { rotationY: 90 },
                        { rotationY: 0, duration: 0.15, ease: 'power2.out' },
                        `step-${i + 1}+=0.15`
                    );
                }
            });

            gsap.from(pin.querySelector('.proc-header'), {
                opacity: 0,
                y: 32,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: { trigger: section, start: 'top 85%', toggleActions: 'play none none reverse' },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [totalSteps]);

    // Jump to a given step by scrolling to the matching point inside the
    // pinned scroll range. Scoped to this instance's own ScrollTrigger only.
    const jumpToStep = (index) => {
        const st = ScrollTrigger.getAll().find((t) => t.trigger === sectionRef.current && t.vars.pin);
        if (!st) return;
        const target = st.start + (st.end - st.start) * (index * stepFraction + stepFraction / 2);
        window.scrollTo({ top: target, behavior: 'smooth' });
    };

    const active = STEPS[activeIndex];

    return (
        <>
            <style>{`
                .proc-section {
                    position: relative;
                    background: #0a0e14;
                    border-top: 1px solid rgba(148, 178, 214, 0.08);
                }

                .proc-pin {
                    --accent: ${STEPS[0].accent};
                    position: relative;
                    width: 100%;
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    font-feature-settings: 'tnum' 1;
                }

                /* Blueprint grid + corner registration marks: the signature motif,
                   reused at section scale and again on each icon frame. */
                .proc-grid-bg {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(148, 178, 214, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(148, 178, 214, 0.05) 1px, transparent 1px);
                    background-size: 56px 56px;
                    mask-image: radial-gradient(ellipse at 30% 50%, black 15%, transparent 72%);
                    pointer-events: none;
                    z-index: 0;
                }
                .proc-corner {
                    position: absolute;
                    width: 22px;
                    height: 22px;
                    z-index: 1;
                    pointer-events: none;
                    opacity: 0.35;
                }
                .proc-corner::before, .proc-corner::after {
                    content: '';
                    position: absolute;
                    background: rgba(148, 178, 214, 0.5);
                }
                .proc-corner::before { width: 100%; height: 1px; top: 0; left: 0; }
                .proc-corner::after { width: 1px; height: 100%; top: 0; left: 0; }
                .proc-corner--tl { top: 24px; left: 24px; }
                .proc-corner--tr { top: 24px; right: 24px; transform: scaleX(-1); }
                .proc-corner--bl { bottom: 24px; left: 24px; transform: scaleY(-1); }
                .proc-corner--br { bottom: 24px; right: 24px; transform: scale(-1, -1); }

                .proc-header {
                    position: relative;
                    z-index: 2;
                    padding: 56px 64px 0;
                    display: flex;
                    align-items: baseline;
                    justify-content: space-between;
                    gap: 24px;
                    flex-wrap: wrap;
                }
                .proc-eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.72rem;
                    font-weight: 600;
                    letter-spacing: 0.16em;
                    text-transform: uppercase;
                    color: var(--accent);
                    transition: color 0.5s ease;
                }
                .proc-eyebrow::before {
                    content: '';
                    display: block;
                    width: 20px;
                    height: 1px;
                    background: currentColor;
                }
                .proc-readout {
                    font-size: 0.78rem;
                    font-weight: 500;
                    letter-spacing: 0.04em;
                    color: rgba(238, 242, 247, 0.4);
                }
                .proc-readout b {
                    color: rgba(238, 242, 247, 0.85);
                    font-weight: 600;
                }

                .proc-progress-wrap {
                    position: relative;
                    z-index: 2;
                    padding: 0 64px;
                    margin-top: 22px;
                }
                .proc-progress-track {
                    position: relative;
                    width: 100%;
                    height: 2px;
                    background: rgba(148, 178, 214, 0.1);
                }
                .proc-progress-fill {
                    height: 100%;
                    background: var(--accent);
                    transform-origin: left;
                    box-shadow: 0 0 10px var(--accent);
                    transition: background 0.5s ease, box-shadow 0.5s ease;
                }
                .proc-ticks {
                    display: flex;
                    margin-top: 16px;
                    gap: 10px;
                }
                .proc-tick {
                    all: unset;
                    box-sizing: border-box;
                    cursor: pointer;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px 16px;
                    border-radius: 3px;
                    border: 1px solid rgba(148, 178, 214, 0.14);
                    background: rgba(148, 178, 214, 0.025);
                    transition: border-color 0.3s ease, background 0.3s ease, transform 0.2s ease;
                }
                .proc-tick:hover { border-color: rgba(148, 178, 214, 0.32); background: rgba(148, 178, 214, 0.05); }
                .proc-tick:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
                .proc-tick--done {
                    border-color: rgba(148, 178, 214, 0.22);
                }
                .proc-tick--active {
                    border-color: var(--accent);
                    background: rgba(148, 178, 214, 0.06);
                    background: color-mix(in srgb, var(--accent) 10%, rgba(148, 178, 214, 0.05));
                    transform: translateY(-1px);
                }
                .proc-tick-num {
                    flex-shrink: 0;
                    width: 26px;
                    height: 26px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.68rem;
                    font-weight: 600;
                    border: 1px solid rgba(148, 178, 214, 0.25);
                    border-radius: 2px;
                    color: rgba(238, 242, 247, 0.4);
                    transition: border-color 0.3s ease, color 0.3s ease, background 0.3s ease;
                }
                .proc-tick--done .proc-tick-num {
                    border-color: rgba(148, 178, 214, 0.35);
                    color: rgba(238, 242, 247, 0.6);
                }
                .proc-tick--active .proc-tick-num {
                    border-color: var(--accent);
                    background: var(--accent);
                    color: #0a0e14;
                }
                .proc-tick-label {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    min-width: 0;
                }
                .proc-tick-title {
                    font-size: 0.82rem;
                    font-weight: 600;
                    color: rgba(238, 242, 247, 0.45);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    transition: color 0.3s ease;
                }
                .proc-tick-status {
                    font-size: 0.62rem;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: rgba(238, 242, 247, 0.22);
                }
                .proc-tick--active .proc-tick-title { color: #eef2f7; }
                .proc-tick--active .proc-tick-status { color: var(--accent); }
                .proc-tick--done .proc-tick-title { color: rgba(238, 242, 247, 0.62); }

                .proc-body {
                    position: relative;
                    z-index: 2;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    padding: 44px 64px 72px;
                }
                .proc-panels {
                    position: relative;
                    display: grid;
                    width: 100%;
                    perspective: 1800px;
                }
                .proc-panel {
                    position: relative;
                    grid-area: 1 / 1;
                    display: grid;
                    grid-template-columns: 280px 1fr;
                    gap: 72px;
                    align-items: center;
                    padding: 56px 64px;
                    border-radius: 4px;
                    border: 1px solid rgba(148, 178, 214, 0.14);
                    background: linear-gradient(180deg, rgba(148, 178, 214, 0.045), rgba(148, 178, 214, 0.015));
                    box-shadow: 0 40px 80px -44px rgba(0, 0, 0, 0.6);
                    backface-visibility: hidden;
                    transform: rotateY(90deg);
                    will-change: transform;
                }
                .proc-panel::before {
                    content: '';
                    position: absolute;
                    top: -1px;
                    left: 32px;
                    right: 32px;
                    height: 2px;
                    background: var(--panel-accent, var(--accent));
                    box-shadow: 0 0 12px var(--panel-accent, var(--accent));
                }
                .proc-panel:first-child { transform: rotateY(0deg); }

                .proc-frame {
                    width: 64px;
                    height: 64px;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.6rem;
                    color: var(--panel-accent, var(--accent));
                    margin-bottom: 28px;
                }
                .proc-frame::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border: 1px dashed var(--panel-accent, var(--accent));
                    opacity: 0.6;
                }
                .proc-step-tag {
                    font-size: 0.72rem;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    color: var(--panel-accent, var(--accent));
                    margin-bottom: 18px;
                }
                .proc-title {
                    font-size: clamp(2.2rem, 3.6vw, 3.4rem);
                    font-weight: 800;
                    letter-spacing: -0.03em;
                    line-height: 1.02;
                    color: #eef2f7;
                    margin-bottom: 8px;
                }
                .proc-subtitle {
                    font-size: 0.85rem;
                    font-weight: 500;
                    color: rgba(238, 242, 247, 0.32);
                    letter-spacing: 0.03em;
                }

                .proc-right { display: flex; flex-direction: column; gap: 26px; }
                .proc-desc {
                    font-size: clamp(1rem, 1.25vw, 1.1rem);
                    color: rgba(238, 242, 247, 0.6);
                    line-height: 1.8;
                    max-width: 56ch;
                }
                .proc-tags { display: flex; flex-wrap: wrap; gap: 8px; }
                .proc-tag {
                    padding: 6px 12px;
                    border-radius: 4px;
                    border: 1px solid rgba(148, 178, 214, 0.14);
                    background: rgba(148, 178, 214, 0.04);
                    font-size: 0.74rem;
                    color: rgba(238, 242, 247, 0.55);
                    letter-spacing: 0.01em;
                }
                .proc-tag::before { content: '→ '; color: var(--panel-accent, var(--accent)); }

                .proc-metric {
                    display: inline-flex;
                    align-items: baseline;
                    gap: 16px;
                    padding: 16px 20px;
                    width: fit-content;
                    border-left: 2px solid var(--panel-accent, var(--accent));
                    background: rgba(148, 178, 214, 0.03);
                }
                .proc-metric-value {
                    font-size: 1.6rem;
                    font-weight: 700;
                    color: var(--panel-accent, var(--accent));
                }
                .proc-metric-label {
                    font-size: 0.78rem;
                    color: rgba(238, 242, 247, 0.35);
                    max-width: 140px;
                    line-height: 1.4;
                }

                @media (prefers-reduced-motion: reduce) {
                    .proc-panel { position: relative; transform: none; }
                    .proc-panels { display: flex; flex-direction: column; gap: 64px; perspective: none; }
                }

                @media (max-width: 1024px) {
                    .proc-header, .proc-progress-wrap { padding-left: 32px; padding-right: 32px; }
                    .proc-body { padding: 40px 32px 56px; }
                    .proc-panel { grid-template-columns: 1fr; gap: 28px; padding: 40px 32px; }
                    .proc-corner { display: none; }
                }
                @media (max-width: 640px) {
                    .proc-header, .proc-progress-wrap { padding-left: 20px; padding-right: 20px; }
                    .proc-body { padding: 32px 20px 48px; }
                    .proc-panel { padding: 32px 22px; }
                    .proc-title { font-size: 2.1rem; }
                    .proc-ticks { gap: 6px; }
                    .proc-tick { padding: 10px; justify-content: center; }
                    .proc-tick-label { display: none; }
                }
            `}</style>

            <section ref={sectionRef} className="proc-section" suppressHydrationWarning>
                <div ref={pinRef} className="proc-pin" suppressHydrationWarning>
                    <div className="proc-grid-bg" aria-hidden="true" />
                    <div className="proc-corner proc-corner--tl" aria-hidden="true" />
                    <div className="proc-corner proc-corner--tr" aria-hidden="true" />
                    <div className="proc-corner proc-corner--bl" aria-hidden="true" />
                    <div className="proc-corner proc-corner--br" aria-hidden="true" />

                    <div className="proc-header">
                        <div className="proc-eyebrow">How we work</div>
                        <div ref={readoutRef} className="proc-readout" aria-live="polite">
                            SEQ <b>{String(activeIndex + 1).padStart(2, '0')}</b> / {String(totalSteps).padStart(2, '0')} — {active.title.toUpperCase()}
                        </div>
                    </div>

                    <div className="proc-progress-wrap">
                        <div className="proc-progress-track">
                            <div ref={fillRef} className="proc-progress-fill" suppressHydrationWarning />
                        </div>
                        <div className="proc-ticks" role="tablist" aria-label="Process steps">
                            {STEPS.map((s, i) => {
                                const state = i === activeIndex ? 'active' : i < activeIndex ? 'done' : 'upcoming';
                                return (
                                    <button
                                        key={s.step}
                                        ref={(el) => (dotRefs.current[i] = el)}
                                        type="button"
                                        role="tab"
                                        aria-selected={i === activeIndex}
                                        aria-label={`${s.step} ${s.title}`}
                                        className={`proc-tick${state !== 'upcoming' ? ` proc-tick--${state}` : ''}`}
                                        onClick={() => jumpToStep(i)}
                                    >
                                        <span className="proc-tick-num">{s.step}</span>
                                        <span className="proc-tick-label">
                                            <span className="proc-tick-title">{s.title}</span>
                                            <span className="proc-tick-status">
                                                {state === 'active' ? 'In view' : state === 'done' ? 'Complete' : 'Up next'}
                                            </span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="proc-body">
                        <div ref={panelsRef} className="proc-panels" suppressHydrationWarning>
                            {STEPS.map((s, i) => (
                                <div
                                    key={s.step}
                                    ref={(el) => (stepRefs.current[i] = el)}
                                    className="proc-panel"
                                    style={{ '--panel-accent': s.accent }}
                                    suppressHydrationWarning
                                >
                                    <div>
                                        <div className="proc-frame">{s.icon}</div>
                                        <div className="proc-step-tag">§{s.step}</div>
                                        <h2 className="proc-title" suppressHydrationWarning>{s.title}</h2>
                                        <div className="proc-subtitle">{s.subtitle}</div>
                                    </div>

                                    <div className="proc-right">
                                        <p className="proc-desc" suppressHydrationWarning>{s.description}</p>
                                        <div className="proc-tags">
                                            {s.tags.map((tag) => (
                                                <span key={tag} className="proc-tag">{tag}</span>
                                            ))}
                                        </div>
                                        <div className="proc-metric">
                                            <span className="proc-metric-value">{s.metric.value}</span>
                                            <span className="proc-metric-label">{s.metric.label}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}