"use client";

import { useEffect, useRef, useCallback } from "react";
import OptimizedImage from './OptimizedImage';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: "01", name: "WAPilot",   category: "SaaS Platform",      skills: ["React 19", "Node.js"],      accent: "#00e5ff", image: "/assets/projects/WAPilot.png",  link: "https://app.wapilot.net" },
  { id: "02", name: "Rasayl",    category: "Multi-Role Platform", skills: ["Next.js", "PostgreSQL"],    accent: "#c084fc", image: "/assets/projects/rasayel.png",  link: "https://rasayl.nodejs.puiux.org/ar" },
  { id: "03", name: "SKYS",      category: "Hotel Booking",       skills: ["Next.js", "API"],          accent: "#2dd4bf", image: "/assets/projects/skys.png",     link: "https://skys-front-puiux.vercel.app/en" },
  { id: "04", name: "Nawan",     category: "E-Commerce",          skills: ["Next.js", "Redux"],        accent: "#34d399", image: "/assets/projects/nawan.png",    link: "https://nawan.co/ar" },
  { id: "05", name: "Arkit",     category: "Architecture Docs",   skills: ["Next.js", "TypeScript"],   accent: "#fb923c", image: "/assets/projects/arkit.png",    link: "https://arkit-three.vercel.app/ar" },
  { id: "06", name: "Faturti",   category: "Invoicing SAAS",      skills: ["React.js", "REST API"],    accent: "#60a5fa", image: "/assets/projects/faturti.png",  link: "https://faturti-mhr.com/login" },
  { id: "07", name: "Al-Milhem", category: "Portfolio",           skills: ["Next.js", "GSAP"],         accent: "#a78bfa", image: "/assets/projects/almlhem.png",  link: "https://nodejs2.al-milhem-frontend.nodejs2.nodejs2.puiux.org/ar" },
  { id: "08", name: "Aqar Corp", category: "Real Estate",         skills: ["Next.js", "Maps API"],     accent: "#f59e0b", image: "/assets/projects/aqar.png",     link: "https://aqarcorp.com" },
];

const scrollConstants = {
  ZOOM_START:  0.18,
  CIRCLE_PEAK: 0.46,
  REVEAL_AT:   0.50,
};

export default function ProjectsSection() {
  const pinContainerRef = useRef(null);
  const viewportRef     = useRef(null);
  const trackRef        = useRef(null);
  const progressRef     = useRef(null);
  const labelRef        = useRef(null);
  const contentRef      = useRef(null);
  const introRef        = useRef(null);
  const introLabelRef   = useRef(null);
  const introTextRef    = useRef(null);

  const isDesktop = useCallback(() => window.innerWidth > 1024, []);
  const isMobile  = useCallback(() => window.innerWidth <= 640, []);
  const getDistance = useCallback(() => {
    const track    = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return 0;
    return track.scrollWidth - viewport.offsetWidth;
  }, []);

  useEffect(() => {
    const track     = trackRef.current;
    const container = pinContainerRef.current;
    const content   = contentRef.current;
    const intro     = introRef.current;
    const introLabel = introLabelRef.current;
    const introText  = introTextRef.current;

    // ── Initial states ─────────────────────────────────────────────
    gsap.set(content, { opacity: 0, pointerEvents: "none" });
    gsap.set(intro, {
      xPercent: -50,
      yPercent: -50,
      left: "50%",
      top: isMobile() ? "9%" : "35%",
      position: "absolute",
      width: "100%",
    });
    gsap.set(introLabel, { opacity: 0, y: 18, letterSpacing: "0.48em" });
    gsap.set(introText,  { opacity: 0, y: 32, skewX: 4 });

    // ── Entrance animation ──────────────────────────────────────────
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
      }
    });
    entranceTl
      .to(introLabel, { opacity: 1, y: 0, letterSpacing: "0.28em", duration: 0.9,  ease: "power3.out" })
      .to(introText,  { opacity: 1, y: 0, skewX: 0,               duration: 1.05, ease: "power4.out" }, "-=0.55");

    // ── Content stagger refs ────────────────────────────────────────
    const headingEl  = content.querySelector(".proj-heading");
    const metaEl     = content.querySelector(".proj-meta");
    const progressEl = content.querySelector(".scroll-progress-wrap");
    const viewportEl = content.querySelector(".proj-viewport");

    const getScrollLength = () => {
      const horizDist = isDesktop() ? getDistance() : window.innerHeight * 2;
      return horizDist + window.innerHeight * 1.5;
    };

    // ── Master ScrollTrigger Timeline ───────────────────────────────
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${getScrollLength()}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // 1. Zoom and fade out intro
    masterTl.to(intro, {
      scale: 3,
      opacity: 0,
      duration: 1,
      ease: "power2.in"
    });

    // 2. Reveal content
    masterTl.to(content, {
      opacity: 1,
      pointerEvents: "auto",
      duration: 0.1
    }, "-=0.2");
    masterTl.fromTo([headingEl, metaEl, progressEl, viewportEl], 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: "power3.out" },
      "-=0.1"
    );

    // 3. Horizontal scroll (desktop)
    if (isDesktop()) {
      masterTl.to(track, {
        x: () => -getDistance(),
        ease: "none",
        duration: 4, // Take up the rest of the scroll space
        onUpdate: function() {
          const hp = this.progress();
          if (progressRef.current) progressRef.current.style.width = `${hp * 100}%`;
          if (labelRef.current) {
            const idx = Math.min(projects.length - 1, Math.floor(hp * projects.length));
            labelRef.current.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;
          }
        }
      }, "+=0.2"); // slight pause before scrolling starts
    }

    // ── Image parallax (desktop) ────────────────────────────────────
    if (isDesktop()) {
      gsap.utils.toArray(".card-img").forEach((img) => {
        gsap.fromTo(img, { scale: 1.15 }, {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${getScrollLength()}`,
            scrub: 2,
            invalidateOnRefresh: true,
          },
        });
      });
    }

    return () => {
      entranceTl.kill();
      masterTl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        /* ── Container ── */
        .pin-container {
          background: #0a0e14;
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* ── Intro overlay ── */
        .proj-intro {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 16px;
          pointer-events: none;
          z-index: 2;
          will-change: transform, opacity;
          transform-origin: center center;
          text-align: center;
          padding: 0 24px;
        }
        .proj-intro-label {
          font-size: clamp(16px, 2vw, 24px);
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #00e5ff;
          font-weight: 600;
        }
        .proj-intro-text {
          font-family: 'Epilogue', sans-serif;
          font-size: clamp(40px, 6.5vw, 110px);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.04em;
          line-height: 1;
          text-align: center;
          margin: 0;
          will-change: opacity, transform;
        }
        .proj-intro-text em {
          font-style: italic;
          font-weight: 400;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.5);
        }

        /* ── Content ── */
        .proj-content-wrapper { will-change: opacity; }

        .proj-header {
          padding: 48px 72px 24px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .proj-heading {
          font-family: 'Epilogue', sans-serif;
          font-size: clamp(36px, 5.5vw, 80px);
          font-weight: 900;
          color: #fff;
          line-height: 0.95;
          letter-spacing: -0.04em;
          margin: 0;
          will-change: opacity, transform;
        }
        .proj-heading em {
          font-style: italic;
          font-weight: 400;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255,255,255,0.4);
        }
        .proj-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          padding-bottom: 6px;
          will-change: opacity, transform;
        }
        .proj-count {
          font-size: 11px;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          font-weight: 600;
        }
        .proj-hint {
          font-size: 11px;
          color: rgba(255,255,255,0.25);
          display: flex;
          align-items: center;
          gap: 8px;
          letter-spacing: 0.08em;
        }
        .proj-hint::before {
          content: '';
          width: 28px;
          height: 1px;
          background: rgba(255,255,255,0.2);
          display: inline-block;
        }

        /* ── Progress bar ── */
        .scroll-progress-wrap {
          padding: 0 72px 28px;
          display: flex;
          align-items: center;
          gap: 16px;
          will-change: opacity, transform;
        }
        .scroll-progress-bar {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
          border-radius: 2px;
          overflow: hidden;
        }
        .scroll-progress-fill {
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #00e5ff, #2563eb);
          transition: width 0.08s linear;
        }
        .scroll-progress-label {
          font-size: 11px;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.3);
          min-width: 48px;
          text-align: right;
          font-weight: 600;
        }

        /* ── Viewport & Track ── */
        .proj-viewport {
          overflow: hidden;
          padding: 0 72px 72px;
          will-change: opacity, transform;
        }
        .proj-track {
          display: flex;
          gap: 20px;
          width: max-content;
          will-change: transform;
          align-items: flex-start;
        }

        /* ── CARD (Horizontal Layout) ── */
        .proj-card {
          /* Wide horizontal card */
          width: clamp(560px, 48vw, 720px);
          border-radius: 20px;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          cursor: pointer;
          flex-shrink: 0;
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          transition: border-color 0.4s, transform 0.4s;
        }
        .proj-card:hover {
          border-color: rgba(255,255,255,0.14);
          transform: translateY(-4px);
        }
        .proj-card:nth-child(even) { margin-top: 40px; }

        /* ── Image (left half) ── */
        .card-img-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: unset;
          min-height: 260px;
        }
        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .proj-card:hover .card-img { transform: scale(1.07); }

        /* Number badge */
        .card-num {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 2;
          font-size: 11px;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.9);
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(10px);
          padding: 5px 10px;
          border-radius: 100px;
          font-weight: 700;
        }

        /* Category badge */
        .card-category {
          position: absolute;
          bottom: 14px;
          left: 14px;
          z-index: 2;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #000;
          padding: 5px 12px;
          border-radius: 100px;
        }

        /* ── Body (right half) ── */
        .card-body {
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 16px;
          min-height: 260px;
        }

        .card-body-top {}

        .card-name {
          font-family: 'Epilogue', sans-serif;
          font-size: clamp(20px, 2vw, 28px);
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.03em;
          margin: 0 0 10px;
          line-height: 1.1;
        }
        .card-category-text {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 18px;
        }
        .card-divider {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin-bottom: 16px;
        }
        .card-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .skill-tag {
          font-size: 11px;
          letter-spacing: 0.06em;
          color: rgba(255,255,255,0.4);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px;
          padding: 4px 12px;
          transition: color 0.25s, border-color 0.25s, background 0.25s;
          font-weight: 500;
        }
        .proj-card:hover .skill-tag {
          color: rgba(255,255,255,0.75);
          border-color: rgba(255,255,255,0.18);
        }

        /* ── Arrow + link ── */
        .card-body-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }
        .card-accent-line {
          width: 32px;
          height: 2px;
          border-radius: 1px;
          transition: width 0.3s ease;
        }
        .proj-card:hover .card-accent-line { width: 48px; }

        .card-arrow {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.35);
          font-size: 15px;
          text-decoration: none;
          transition: background 0.3s, color 0.3s, transform 0.3s, border-color 0.3s;
          flex-shrink: 0;
        }
        .proj-card:hover .card-arrow {
          background: #00e5ff;
          color: #000;
          transform: rotate(45deg);
          border-color: #00e5ff;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .proj-header { padding: 48px 32px 28px; }
          .scroll-progress-wrap { padding: 0 32px 24px; }
          .proj-viewport { overflow: visible; padding: 0 20px 64px; }
          .proj-track {
            display: grid;
            grid-template-columns: 1fr;
            gap: 16px;
            width: 100%;
            transform: none !important;
          }
          .proj-card {
            width: 100%;
            grid-template-columns: 220px 1fr;
          }
          .proj-card:nth-child(even) { margin-top: 0; }
          .proj-hint { display: none; }
        }
        @media (max-width: 640px) {
          .proj-header { padding: 40px 20px 20px; flex-direction: column; align-items: flex-start; }
          .proj-meta { align-items: flex-start; }
          .scroll-progress-wrap { padding: 0 20px 20px; }
          .proj-viewport { padding: 0 20px 48px; }
          .proj-card {
            grid-template-columns: 1fr;
          }
          .card-img-wrap { min-height: 200px; }
          .card-body { padding: 24px 20px; min-height: auto; }
        }
      `}</style>

      <div id="portfolio" className="pin-container" ref={pinContainerRef} suppressHydrationWarning>

        {/* ── Intro overlay ── */}
        <div className="proj-intro" ref={introRef} suppressHydrationWarning>
          <span className="proj-intro-label" ref={introLabelRef} suppressHydrationWarning>Our Work</span>
          <h2 className="proj-intro-text" ref={introTextRef} suppressHydrationWarning>
            Selected <em>Works</em>
          </h2>
        </div>

        {/* ── Main content ── */}
        <div className="proj-content-wrapper" ref={contentRef} suppressHydrationWarning>

          <div className="proj-header" suppressHydrationWarning>
            <h2 className="proj-heading" suppressHydrationWarning>
              Selected<em>Works</em>
            </h2>
            <div className="proj-meta">
              <span className="proj-count">
                {String(projects.length).padStart(2, "0")} Projects
              </span>
              <span className="proj-hint">Scroll to explore</span>
            </div>
          </div>

          <div className="scroll-progress-wrap">
            <div className="scroll-progress-bar">
              <div className="scroll-progress-fill" ref={progressRef} />
            </div>
            <span className="scroll-progress-label" ref={labelRef}>
              01 / {String(projects.length).padStart(2, "0")}
            </span>
          </div>

          <div className="proj-viewport" ref={viewportRef} suppressHydrationWarning>
            <div className="proj-track" ref={trackRef} suppressHydrationWarning>
              {projects.map((p) => (
                <article className="proj-card" key={p.id} suppressHydrationWarning>

                  {/* LEFT — Image */}
                  <a href={p.link} target="_blank" rel="noreferrer" className="card-img-wrap" aria-label={`View ${p.name}`}>
                    <span className="card-num">{p.id}</span>
                    <span className="card-category" style={{ background: p.accent }}>
                      {p.category}
                    </span>
                    <OptimizedImage
                      className="card-img"
                      src={p.image}
                      alt={p.name}
                      width={360}
                      height={280}
                      sizes="(max-width: 768px) 100vw, 35vw"
                      quality={85}
                    />
                  </a>

                  {/* RIGHT — Body */}
                  <div className="card-body" suppressHydrationWarning>
                    <div className="card-body-top" suppressHydrationWarning>
                      <h3 className="card-name" suppressHydrationWarning>{p.name}</h3>
                      <p className="card-category-text" suppressHydrationWarning>{p.category}</p>
                      <div className="card-divider" />
                      <div className="card-skills">
                        {p.skills.map((s) => (
                          <span className="skill-tag" key={s}>{s}</span>
                        ))}
                      </div>
                    </div>

                    <div className="card-body-bottom">
                      <div className="card-accent-line" style={{ background: p.accent }} />
                      <a href={p.link} target="_blank" rel="noreferrer" className="card-arrow" aria-label={`Open ${p.name}`}>
                        ↗
                      </a>
                    </div>
                  </div>

                </article>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}