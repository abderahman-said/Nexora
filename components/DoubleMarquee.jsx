'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brands, colors } from '@/lib/data';

// ─── Shuffle helpers ─────────────────────────────────────────────────────────
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function shuffleNoAdjacentSrc(array) {
    const arr = shuffleArray([...array]);
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].src === arr[i - 1].src) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j].src !== arr[i - 1].src) { [arr[i], arr[j]] = [arr[j], arr[i]]; break; }
            }
        }
    }
    if (arr[arr.length - 1].src === arr[0].src) {
        for (let j = 1; j < arr.length - 1; j++) {
            if (arr[j].src !== arr[0].src && arr[j].src !== arr[arr.length - 2].src) {
                [arr[arr.length - 1], arr[j]] = [arr[j], arr[arr.length - 1]]; break;
            }
        }
    }
    return arr;
}

function assignColorsNoAdjacent(count, colorPool) {
    const result = [];
    for (let i = 0; i < count; i++) {
        const prev = i > 0 ? result[i - 1] : null;
        const seamColor = i === count - 1 ? result[0] : null;
        const available = colorPool.filter(c => c !== prev && c !== seamColor);
        const pool = available.length > 0 ? available : colorPool.filter(c => c !== prev);
        result.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    return result;
}

function buildMarqueeItems(isMobile) {
    const tracks = [[], []];
    for (let t = 0; t < 2; t++) {
        const shuffledBrands = shuffleNoAdjacentSrc(brands);
        const assignedColors = assignColorsNoAdjacent(shuffledBrands.length, colors);
        const items = shuffledBrands.map((brand, i) => ({ brand, color: assignedColors[i] }));
        tracks[t] = isMobile ? items : [...items, ...items]; // duplicate for seamless loop
    }
    return tracks;
}

export default function DoubleMarquee() {
    const [tracks, setTracks] = useState([[], []]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const mobile = window.matchMedia('(max-width: 768px)').matches;
        setIsMobile(mobile);
        setTracks(buildMarqueeItems(mobile));

        // Arrow path animation
        gsap.set('.js-marquee-path path', { strokeDashoffset: 1000 });

        const marqueeTl = gsap.timeline({
            scrollTrigger: {
                trigger: '#marquee-section',
                start: 'top 70%',
                toggleActions: 'play none none reverse' // Allow replaying on scroll out/in
            }
        });

        marqueeTl
            .to('.js-marquee-underline', { scaleX: 1, opacity: 1, duration: 1, ease: 'power2.out' })
            .to('.js-marquee-hand', { scale: 1, opacity: 1, rotation: -10, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.5')
            .to('.js-marquee-path path', { strokeDashoffset: 0, duration: 1.5, ease: 'power2.out' }, '-=0.3');

        return () => {
            ScrollTrigger.getAll().forEach(t => { if (t.vars.trigger === '#marquee-section') t.kill(); });
        };
    }, []);

    return (
        <div className="relative min-h-screen bg-brand-light px-[60px] py-[40px] flex justify-between items-center gap-[60px] z-[1]" id="marquee-section">
            {/* Left: Text + Blob */}
            <div className="flex-1 relative flex justify-center items-center max-w-[600px]">
                <div className="relative z-[5] text-left">
                    <h2 className="font-epilogue text-[4rem] font-[1000] leading-[0.95] tracking-[-2px] text-brand-dark mb-[120px] mr-[50px] cursor-[url('/assets/Cursor_SVG/cursor-text.svg')_12_12,auto]">
                        proud to have<br />worked <span className="font-times italic font-normal relative">with:</span>
                    </h2>
                    <svg xmlns="http://www.w3.org/2000/svg" className="js-marquee-underline absolute top-[7.5rem] right-[7.8rem] w-[100px] h-auto text-brand-dark z-[6] scale-x-0 opacity-0 origin-left" viewBox="0 0 132 5" fill="none">
                        <path d="M1 2.08377C44.3458 3.90451 87.9791 5.71442 131 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className="absolute top-[55%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-[420px] h-[500px] z-[1]">
                    <img src="/assets/Marquee-blob SVG/marquee-blob.svg" className="absolute w-full h-full z-[1]" alt="" aria-hidden="true" />
                    <div className="absolute w-full h-full z-[2]">
                        <div className="js-marquee-hand absolute bottom-[18%] left-[68%] w-[90px] h-auto -translate-x-1/2 scale-0 -rotate-[20deg] opacity-0 z-[2]">
                            <img src="/assets/Marquee-blob SVG/marquee-hand.svg" width="100%" alt="" aria-hidden="true" />
                        </div>
                        <div className="js-marquee-path absolute bottom-[3%] left-[70%] w-[350px] h-auto text-brand-dark rotate-[190deg] -scale-x-100 z-[1]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 386 127" fill="none">
                                <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="[stroke-dasharray:1000] [stroke-dashoffset:1000]" />
                                <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="[stroke-dasharray:1000] [stroke-dashoffset:1000]" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Two scrolling columns */}
            <div className="flex-none flex gap-[5px] h-[850px] relative overflow-hidden w-[500px] mr-[80px]">
                {tracks.map((trackItems, colIndex) => (
                    <div key={colIndex} className="flex-1 relative overflow-hidden before:content-[''] before:absolute before:left-0 before:right-0 before:h-[100px] before:z-[2] before:pointer-events-none before:top-0 before:bg-gradient-to-b before:from-brand-light before:to-transparent after:content-[''] after:absolute after:left-0 after:right-0 after:h-[100px] after:z-[2] after:pointer-events-none after:bottom-0 after:bg-gradient-to-t after:from-brand-light after:to-transparent">
                        <div className={`flex flex-col gap-[10px] ${colIndex === 0 ? 'animate-marquee-up' : 'animate-marquee-down'}`}>
                            {trackItems.map((item, i) => (
                                <div key={i} className="w-[90%] h-[240px] rounded-[10px] flex items-center justify-center" data-brand={item.brand.name} style={{ backgroundColor: item.color }}>
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <div className="absolute top-0 left-0 w-full h-full -z-[1]"></div>
                                        <img src={item.brand.src} loading="lazy" alt={item.brand.name} className="w-full h-auto object-contain" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
