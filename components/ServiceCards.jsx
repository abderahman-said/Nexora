'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
    {
        id: '01',
        title: 'Web App Development',
        description: 'High-performance web applications built with React 19, Next.js 15, and TypeScript. From SaaS platforms to complex dashboards.',
        features: ['React / Next.js', 'TypeScript', 'REST & GraphQL APIs', 'Real-time with Websockets'],
        icon: '🌐',
        accent: '#00e5ff',
        size: 'large',
    },
    {
        id: '02',
        title: 'Mobile Apps',
        description: 'Native-feel iOS and Android applications. Cross-platform with React Native.',
        features: ['React Native', 'iOS & Android', 'Push Notifications', 'Offline-first'],
        icon: '📱',
        accent: '#6366f1',
        size: 'small',
    },
    {
        id: '03',
        title: 'UI/UX Design',
        description: 'Awwwards-quality interfaces. From wireframes to pixel-perfect handoff.',
        features: ['Figma Design Systems', 'Prototyping', 'User Research', 'Accessibility (WCAG)'],
        icon: '✦',
        accent: '#2563eb',
        size: 'small',
    },
    {
        id: '04',
        title: 'Cloud & DevOps',
        description: 'Scalable cloud infrastructure. CI/CD pipelines. Zero-downtime deployments.',
        features: ['AWS / GCP', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Monitoring & Alerts'],
        icon: '☁',
        accent: '#10b981',
        size: 'small',
    },
    {
        id: '05',
        title: 'Custom Software',
        description: 'End-to-end custom software tailored exactly to your business logic and scale requirements.',
        features: ['System Architecture', 'API Development', 'Database Design', 'Maintenance & Support'],
        icon: '⚙',
        accent: '#f59e0b',
        size: 'small',
    },
];

export default function ServiceCards() {
    const sectionRef  = useRef(null);

    useEffect(() => {
        const ctx = gsap.context((self) => {
            // Headline reveal
            const heading = self.selector('.services-heading');
            gsap.fromTo(heading, 
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    }
                }
            );

            // Cards stagger reveal
            const cards = self.selector('.bento-card');
            gsap.fromTo(cards, 
                { opacity: 0, y: 50 },
                { 
                    opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 65%',
                    }
                }
            );

            // Mouse glow tracking per card
            cards.forEach(card => {
                const onMove = (e) => {
                    const rect = card.getBoundingClientRect();
                    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
                    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
                };
                card.addEventListener('mousemove', onMove);
                // Return a cleanup function for the event listener (handled on revert)
                return () => card.removeEventListener('mousemove', onMove);
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <style>{`
                .services-section {
                    position: relative;
                    width: 100%;
                    padding: 120px 60px;
                    background: #000;
                    border-top: 1px solid rgba(255,255,255,0.05);
                }
                .services-section::before {
                    content: '';
                    position: absolute;
                    bottom: -100px; left: -100px;
                    width: 500px; height: 500px;
                    background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%);
                    pointer-events: none;
                }
                .services-header {
                    max-width: 1200px;
                    margin: 0 auto 64px;
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 40px;
                    flex-wrap: wrap;
                }
                .services-label {
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
                .services-label::before {
                    content: '';
                    display: block;
                    width: 24px; height: 1px;
                    background: #00e5ff;
                }
                .services-heading {
                    font-family: 'Epilogue', sans-serif;
                    font-size: clamp(2rem, 4vw, 3.5rem);
                    font-weight: 900;
                    letter-spacing: -0.04em;
                    color: #fff;
                    line-height: 1.05;
                    overflow: hidden;
                }
                .services-sub {
                    font-size: 1rem;
                    color: rgba(255,255,255,0.45);
                    max-width: 360px;
                    line-height: 1.7;
                    flex-shrink: 0;
                }
                .bento-grid {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-template-rows: auto auto;
                    gap: 16px;
                }
                .bento-card {
                    position: relative;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 24px;
                    padding: 36px;
                    overflow: hidden;
                    transition: border-color 0.3s, background 0.3s, transform 0.3s;
                    cursor: default;
                }
                .bento-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(
                        300px circle at var(--mx, -300px) var(--my, -300px),
                        rgba(0,229,255,0.07),
                        transparent 60%
                    );
                    pointer-events: none;
                    border-radius: inherit;
                    opacity: 0;
                    transition: opacity 0.4s;
                }
                .bento-card:hover::before { opacity: 1; }
                .bento-card:hover {
                    border-color: rgba(255,255,255,0.12);
                    background: rgba(255,255,255,0.05);
                    transform: translateY(-4px);
                }
                .bento-card.card-large {
                    grid-column: span 2;
                    display: grid;
                    grid-template-columns: 1fr auto;
                    gap: 32px;
                    align-items: start;
                }
                .bento-card-number {
                    font-family: 'Epilogue', sans-serif;
                    font-size: 0.7rem;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    color: rgba(255,255,255,0.2);
                    margin-bottom: 20px;
                }
                .bento-card-icon {
                    width: 48px; height: 48px;
                    border-radius: 14px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 1.4rem;
                    margin-bottom: 20px;
                    border: 1px solid rgba(255,255,255,0.08);
                }
                .bento-card-title {
                    font-family: 'Epilogue', sans-serif;
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: #fff;
                    letter-spacing: -0.03em;
                    margin-bottom: 12px;
                }
                .bento-card-desc {
                    font-size: 0.875rem;
                    color: rgba(255,255,255,0.45);
                    line-height: 1.7;
                    margin-bottom: 24px;
                }
                .bento-card-features {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .bento-card-feature {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.5);
                    font-weight: 500;
                }
                .bento-card-feature::before {
                    content: '';
                    width: 4px; height: 4px;
                    border-radius: 50%;
                    background: var(--accent, #00e5ff);
                    flex-shrink: 0;
                }
                @media (max-width: 900px) {
                    .services-section { padding: 80px 24px; }
                    .bento-grid { grid-template-columns: 1fr; }
                    .bento-card.card-large { grid-column: span 1; grid-template-columns: 1fr; }
                    .services-header { flex-direction: column; align-items: flex-start; }
                }
            `}</style>

            <section id="services" ref={sectionRef} className="services-section" suppressHydrationWarning>
                <div className="services-header">
                    <div>
                        <div className="services-label">What We Do</div>
                        <h2 className="services-heading" suppressHydrationWarning>Our Core Capabilities</h2>
                    </div>
                    <p className="services-sub" suppressHydrationWarning>
                        End-to-end digital solutions designed for scale, performance, and conversion.
                    </p>
                </div>

                <div className="bento-grid">
                    {SERVICES.map((service, i) => (
                        <div
                            key={service.id}
                            className={`bento-card${service.size === 'large' ? ' card-large' : ''}`}
                            style={{ '--accent': service.accent }}
                            suppressHydrationWarning
                        >
                            <div>
                                <div className="bento-card-number">{service.id}</div>
                                <div className="bento-card-icon" style={{ background: `${service.accent}14` }}>
                                    {service.icon}
                                </div>
                                <h3 className="bento-card-title" suppressHydrationWarning>{service.title}</h3>
                                <p className="bento-card-desc" suppressHydrationWarning>{service.description}</p>
                            </div>
                            <ul className="bento-card-features" role="list">
                                {service.features.map(f => (
                                    <li key={f} className="bento-card-feature">{f}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
