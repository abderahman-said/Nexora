'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TECH_ROW_1 = [
    { name: 'React', color: '#61dafb' },
    { name: 'Next.js', color: '#fff' },
    { name: 'TypeScript', color: '#3178c6' },
    { name: 'GSAP', color: '#0ae448' },
    { name: 'Tailwind CSS', color: '#06b6d4' },
    { name: 'Node.js', color: '#68a063' },
    { name: 'Redux', color: '#764abc' },
    { name: 'React Native', color: '#61dafb' },
];
const TECH_ROW_2 = [
    { name: 'AWS', color: '#ff9900' },
    { name: 'Docker', color: '#2496ed' },
    { name: 'PostgreSQL', color: '#336791' },
    { name: 'MongoDB', color: '#4db33d' },
    { name: 'Figma', color: '#f24e1e' },
    { name: 'Git', color: '#f05032' },
    { name: 'React Query', color: '#ff4154' },
    { name: 'Framer Motion', color: '#bb4be0' },
];

function MarqueeRow({ items, direction = 1 }) {
    const trackRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const tween = gsap.to(track, {
            xPercent: direction > 0 ? -50 : 0,
            ease: 'none',
            duration: 24,
            repeat: -1,
        });

        if (direction < 0) {
            gsap.set(track, { xPercent: -50 });
            gsap.to(track, {
                xPercent: 0,
                ease: 'none',
                duration: 28,
                repeat: -1,
            });
        }

        // Pause/speed up on scroll velocity
        let rafId;
        let currentScale = 1;

        const tick = () => {
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        return () => {
            tween.kill();
            cancelAnimationFrame(rafId);
        };
    }, [direction]);

    const doubled = [...items, ...items];

    return (
        <div style={{ overflow: 'hidden', width: '100%' }}>
            <div ref={trackRef} style={{ display: 'flex', width: 'max-content', willChange: 'transform' }}>
                {doubled.map((item, i) => (
                    <div key={i} className="tech-chip" style={{ '--chip-color': item.color }}>
                        <span className="tech-chip-dot" />
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function CrossedBanners() {
    const sectionRef = useRef(null);
    const headRef    = useRef(null);

    useEffect(() => {
        gsap.from(headRef.current, {
            opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        });
    }, []);

    return (
        <>
            <style>{`
                .tech-section {
                    position: relative;
                    width: 100%;
                    padding: 120px 0;
                    background: #000;
                    border-top: 1px solid rgba(255,255,255,0.05);
                    overflow: hidden;
                }
                .tech-section::before {
                    content: '';
                    position: absolute;
                    top: 50%; left: 50%;
                    transform: translate(-50%, -50%);
                    width: 600px; height: 600px;
                    background: radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%);
                    pointer-events: none;
                }
                .tech-header {
                    text-align: center;
                    margin-bottom: 64px;
                    padding: 0 24px;
                }
                .tech-label {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.7rem;
                    font-weight: 600;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: #00e5ff;
                    margin-bottom: 20px;
                }
                .tech-label::before {
                    content: '';
                    display: block;
                    width: 24px; height: 1px;
                    background: #00e5ff;
                }
                .tech-heading {
                    font-size: clamp(1.75rem, 3vw, 2.75rem);
                    font-weight: 900;
                    letter-spacing: -0.04em;
                    color: #fff;
                }
                .tech-tracks {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .tech-chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px 24px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 100px;
                    margin: 0 8px;
                    white-space: nowrap;
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: rgba(255,255,255,0.65);
                    transition: border-color 0.3s, color 0.3s;
                    flex-shrink: 0;
                }
                .tech-chip:hover {
                    border-color: var(--chip-color, rgba(255,255,255,0.2));
                    color: var(--chip-color, #fff);
                }
                .tech-chip-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: var(--chip-color, #00e5ff);
                    flex-shrink: 0;
                }
                .tech-fade-left {
                    position: absolute;
                    top: 0; left: 0; bottom: 0;
                    width: 120px;
                    background: linear-gradient(to right, #000, transparent);
                    z-index: 2;
                    pointer-events: none;
                }
                .tech-fade-right {
                    position: absolute;
                    top: 0; right: 0; bottom: 0;
                    width: 120px;
                    background: linear-gradient(to left, #000, transparent);
                    z-index: 2;
                    pointer-events: none;
                }
                .tech-marquee-wrapper {
                    position: relative;
                    padding: 8px 0;
                }
            `}</style>

            <section id="tech" ref={sectionRef} className="tech-section container mx-auto">
                <div className="tech-header" ref={headRef} suppressHydrationWarning>
                    <div className="tech-label" suppressHydrationWarning>Technology</div>
                    <h2 className="tech-heading" suppressHydrationWarning>Our Tech Stack</h2>
                </div>

                <div className="tech-tracks">
                    <div className="tech-marquee-wrapper" dir="ltr">
                        <div className="tech-fade-left" />
                        <div className="tech-fade-right" />
                        <MarqueeRow items={TECH_ROW_1} direction={1} />
                    </div>
                    <div className="tech-marquee-wrapper">
                        <div className="tech-fade-left" />
                        <div className="tech-fade-right" />
                        <MarqueeRow items={TECH_ROW_2} direction={-1} />
                    </div>
                </div>
            </section>
        </>
    );
}