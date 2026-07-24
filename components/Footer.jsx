'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SOCIAL_ICONS, WIGGLE_CONFIG } from '@/lib/data';

function initWiggle(element, intensity) {
    const target = element.querySelector('[data-wiggle-target]') || element;
    gsap.set(target, { transformOrigin: 'center center' });
    let tween;
    const onEnter = () => { tween = gsap.to(target, { rotation: intensity, duration: 0.17, repeat: -1, yoyo: true, ease: 'steps(1)' }); };
    const onLeave = () => { if (tween) { tween.kill(); gsap.to(target, { rotation: 0, duration: 0.3, ease: 'power2.out' }); } };
    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    return () => { element.removeEventListener('mouseenter', onEnter); element.removeEventListener('mouseleave', onLeave); };
}

    export default function Footer() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // ─── Map link underline draw/undraw ───
        const footerMapLink = document.querySelector('.js-footer-map-link');
        if (footerMapLink) {
            const mapSvgPaths = footerMapLink.querySelectorAll('.js-draw-btn-path');
            mapSvgPaths.forEach(path => {
                const length = path.getTotalLength();
                gsap.set(path, { strokeDasharray: length, strokeDashoffset: 0 });
            });
            const onEnter = () => gsap.fromTo(mapSvgPaths, { strokeDashoffset: (i, el) => el.getTotalLength() }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1, overwrite: true });
            const onLeave = () => gsap.to(mapSvgPaths, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out', overwrite: true });
            footerMapLink.addEventListener('mouseenter', onEnter);
            footerMapLink.addEventListener('mouseleave', onLeave);
        }

        // ─── Credits pop-out ───
        const creditsWrapper = document.querySelector('.js-credits-wrapper');
        if (creditsWrapper) {
            const creditsBox = creditsWrapper.querySelector('.js-credits-box');
            const creditsItems = creditsBox.querySelectorAll('.js-credits-item');

            // Temporarily make the box visible to measure full dimensions
            gsap.set(creditsBox, { visibility: 'visible', width: 'auto', height: 'auto', opacity: 1 });
            const boxRect = creditsBox.getBoundingClientRect();
            const fullWidth = boxRect.width;
            const fullHeight = boxRect.height;
            const boxHeight = boxRect.height; // for text Y translation

            // Distance from box's final position down to behind the credits button
            const creditsBtn = creditsWrapper.querySelector('.js-footer-credits-btn');
            const startY = creditsBtn.offsetHeight + 15;

            // Set precise initial states for box and text
            // Box starts collapsed rather than 0 scale
            gsap.set(creditsBox, { visibility: 'hidden', width: 0, height: 0, opacity: 0, y: startY });
            gsap.set(creditsItems, { y: boxHeight });

            const onEnter = () => {
                gsap.set(creditsBox, { visibility: 'visible' });
                gsap.killTweensOf(creditsBox);
                gsap.killTweensOf(creditsItems);

                // Box physically grows to full dimensions instead of scaling
                gsap.to(creditsBox, { width: fullWidth, height: fullHeight, opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' });

                // Text slides up smoothly, slightly delayed
                gsap.to(creditsItems, { y: 0, duration: 0.5, stagger: 0.04, ease: 'power3.out', delay: 0.1 });
            };

            const onLeave = () => {
                gsap.killTweensOf(creditsBox);
                gsap.killTweensOf(creditsItems);

                // Box physically shrinks to 0x0
                gsap.to(creditsBox, {
                    width: 0, height: 0, opacity: 0, y: startY, duration: 0.35, ease: 'power3.in',
                    onComplete: () => gsap.set(creditsBox, { visibility: 'hidden' })
                });

                // Text sits perfectly still while the box begins crushing it, 
                // and then slowly slides back down in reverse order (`stagger: -0.03`) so the rightmost column clears first
                gsap.to(creditsItems, { y: boxHeight, duration: 0.4, ease: 'power3.in', stagger: -0.03, delay: 0.1 });
            };

            creditsWrapper.addEventListener('mouseenter', onEnter);
            creditsWrapper.addEventListener('mouseleave', onLeave);
        }

        // ─── Footer sticker pop-up on scroll ───
        const footerStickers = gsap.utils.toArray('.js-footer-sticker');
        const stickerRotations = [12, -10, 8, -12, 10, -8];
        gsap.set(footerStickers, { scale: 0, opacity: 0, transformOrigin: 'center bottom' });
        footerStickers.forEach((sticker, i) => gsap.set(sticker, { rotation: stickerRotations[i % stickerRotations.length] }));

        gsap.to(footerStickers, {
            scale: 1, opacity: 1,
            rotation: (i) => stickerRotations[i % stickerRotations.length] * 0.7,
            duration: 0.7, ease: 'back.out(1.7)', stagger: 0.12,
            scrollTrigger: {
                trigger: '#js-footer-stickers',
                start: 'top 80%',
                toggleActions: 'play none none reverse' // Play on enter, reverse on leave up
            }
        });

        // ─── Sticker cursor-velocity push ───
        footerStickers.forEach((sticker, i) => {
            const baseRotation = stickerRotations[i % stickerRotations.length] * 0.7;
            const PROXIMITY_RADIUS = 180, STRENGTH = 4, MAX_PUSH = 55, MIN_SPEED = 3;
            let prevX = 0, prevY = 0;
            const clamp = (v, max) => Math.max(-max, Math.min(max, v));

            const onMove = (e) => {
                const dx = e.clientX - prevX, dy = e.clientY - prevY;
                prevX = e.clientX; prevY = e.clientY;
                const rect = sticker.getBoundingClientRect();
                const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
                const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
                const onSticker = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
                const speed = Math.hypot(dx, dy);

                // Disable proximity push if the mouse is hovering over the open credits popup box
                const isOverCreditsBox = e.target.closest('.js-credits-box') !== null;

                if (!onSticker && !isOverCreditsBox && dist < PROXIMITY_RADIUS && speed > MIN_SPEED) {
                    const falloff = 1 - (dist / PROXIMITY_RADIUS);
                    const pushX = clamp(dx * STRENGTH * falloff, MAX_PUSH);
                    const pushY = clamp(dy * STRENGTH * falloff, MAX_PUSH);
                    gsap.killTweensOf(sticker);
                    gsap.to(sticker, { x: pushX, y: pushY, rotation: baseRotation + pushX * 0.25, duration: 0.18, ease: 'power3.out' });
                    gsap.to(sticker, { x: 0, y: 0, rotation: baseRotation, duration: 1.1, ease: 'elastic.out(1, 0.35)', delay: 0.18 });
                }
            };
            document.addEventListener('mousemove', onMove);
            // No cleanup stored here to match original behaviour (lives for page lifetime)
        });

        // ─── Wiggle on footer interactive elements ───
        const wiggleTargets = [
            { selector: '.js-job-heading', key: 'jobHeading' },
            { selector: '.js-footer-map-link span', key: 'googleMap' },
            { selector: '.js-email', key: 'email' },
            { selector: '.js-whatsapp', key: 'whatsapp' },
            { selector: '.js-credits-name', key: 'socials' }, // Added wiggle target for names using social intensity
        ];
        wiggleTargets.forEach(({ selector, key }) => {
            document.querySelectorAll(selector).forEach(el => initWiggle(el, WIGGLE_CONFIG[key]));
        });

        // ─── Social icon wiggle ───
        document.querySelectorAll('.js-single-social').forEach(el => initWiggle(el, WIGGLE_CONFIG.socials));

    }, []);

    return (
        <div className="bg-[#03081f] rounded-[20px] pt-[80px] px-[40px] pb-[40px] relative overflow-hidden min-h-[95vh] flex flex-col justify-between">
            <div className="flex justify-between gap-[40px] relative z-[5]">
                {/* Jobs */}
                <div className="flex-1 flex flex-col gap-[15px] text-white">
                    <span className="inline-block font-epilogue py-[8px] px-[15px] bg-white text-black items-center rounded-[20px] rounded-bl-[1px] text-[1rem] font-[450] w-fit lowercase cursor-[url('/assets/Cursor_SVG/cursor-text.svg')_12_12,auto]">availability</span>
                    <h3 className="js-job-heading font-epilogue text-[2.2rem] font-[800] leading-[1.1] tracking-[-1px] cursor-[url('/assets/Cursor_SVG/cursor-pointer.svg')_12_12,pointer]">open for opportunities</h3>
                </div>
                {/* Office */}
                <div className="flex-1 flex flex-col gap-[15px] text-white">
                    <span className="inline-block font-epilogue py-[8px] px-[15px] bg-white text-black items-center rounded-[20px] rounded-bl-[1px] text-[1rem] font-[450] w-fit lowercase cursor-[url('/assets/Cursor_SVG/cursor-text.svg')_12_12,auto]">location</span>
                    <address className="font-epilogue not-italic text-[2rem] font-[1000] leading-[1.2] cursor-[url('/assets/Cursor_SVG/cursor-text.svg')_12_12,auto]">
                        Mansoura, Egypt<br />
                        Available for remote work
                    </address>
                    <a href="https://www.google.com/maps/place/Mansoura,+Egypt" target="_blank" rel="noopener noreferrer" className="js-footer-map-link text-white no-underline text-[1.1rem] font-[600] w-fit pb-[4px] mt-[10px] relative flex flex-col">
                        <span className="cursor-[url('/assets/Cursor_SVG/cursor-pointer.svg')_12_12,pointer]">Google Maps</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 169 10" fill="none" className="w-[40%] h-auto mt-[2px]">
                            <path className="js-draw-btn-path" d="M1 6.5661C56.3941 3.06082 112.187 1.20095 168 0.999878" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25"></path>
                            <path className="js-draw-btn-path" d="M32.1313 8.63371C68.2147 6.92799 104.462 6.13378 140.695 6.25107" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25"></path>
                        </svg>
                    </a>
                </div>
                {/* Contact */}
                <div className="flex-1 flex flex-col gap-[15px] text-white">
                    <span className="inline-block font-epilogue py-[8px] px-[15px] bg-white text-black items-center rounded-[20px] rounded-bl-[1px] text-[1rem] font-[450] w-fit lowercase cursor-[url('/assets/Cursor_SVG/cursor-text.svg')_12_12,auto]">contact</span>
                    <a href="mailto:abdorady6500@gmail.com" className="js-email text-[2rem] font-[900] text-white no-underline tracking-[-0.5px] w-fit inline-block cursor-[url('/assets/Cursor_SVG/cursor-pointer.svg')_12_12,pointer]">abdorady6500@gmail.com</a>
                    <a href="https://wa.me/201552323225" target="_blank" rel="noopener noreferrer" className="js-whatsapp text-[2.2rem] font-[800] -mt-[10px] text-white no-underline w-fit inline-block cursor-[url('/assets/Cursor_SVG/cursor-pointer.svg')_12_12,pointer]">send me a whatsapp*</a>
                    <p className="text-[1rem] opacity-80 leading-[1.4] cursor-[url('/assets/Cursor_SVG/cursor-text.svg')_12_12,auto]">*feel free to message me anytime!</p>
                    <div className="flex gap-[25px] mt-[1px]" id="footer-socials">
                        {SOCIAL_ICONS.map(({ href, label, svg }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="js-single-social text-white w-[50px] h-[50px] flex items-center justify-center cursor-[url('/assets/Cursor_SVG/cursor-pointer.svg')_12_12,pointer] [&>svg]:w-full [&>svg]:h-full w-inline-block"
                                aria-label={label}
                                dangerouslySetInnerHTML={{ __html: svg }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Big TRUUS wordmark */}
            <div className="relative w-full mt-[50px]">
                <div className="w-full text-white text-center pointer-events-none select-none -mb-[70px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1368 304" fill="none" className="w-[104.9%] h-auto -ml-[2.5%]">
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M64.5673 100.333L31.6022 100.333C24.1418 100.333 16.8004 98.0158 10.8622 93.4291C5.80406 89.5263 1.12647 83.6199 0.175091 74.889C-1.70387 57.6445 11.6947 57.4031 32.9262 57.4031C35.4235 57.4031 37.9288 57.5399 40.4262 57.5399L86.8136 57.5399L109.615 15.8972C109.615 15.8972 114.189 5.43627 132.424 1.33235C139.988 -0.373589 147.821 -0.397729 155.439 1.01048C155.439 1.01048 185.566 7.69745 174.586 32.0956L163.217 56.3892L254.446 56.3892C271.055 56.3892 280.284 72.2094 272.126 83.3061C271.919 83.5877 271.729 83.8855 271.483 84.151C256.483 100.583 216.764 100.341 216.764 100.341L143.191 100.341L110.915 164.869C107.68 171.315 105.286 178.179 103.986 185.292C101.512 198.827 101.941 217.472 119.874 225.269C149.557 238.169 187.128 198.666 187.128 198.666L279.816 113.257C287.585 106.103 296.766 100.655 306.819 97.6215C321.335 93.2359 340.3 92.8416 352.414 113.063C352.414 113.063 376.515 109.507 388.677 108.203C405.286 106.417 422.657 109.129 428.793 128.103C434.93 147.078 420.778 161.997 420.778 161.997L385.482 200.976C385.482 200.976 369.935 217.174 378.64 222.952C386.473 228.158 420.746 236.157 468.592 188.318C478.17 179 492.805 162.584 499.155 154.344C512.118 37.518 547.485 91.9565 591.803 106.127C591.803 106.127 612.734 110.818 599.779 135.048L571.785 185.309C569.644 189.155 567.995 193.275 567.044 197.58C565.569 204.219 565.252 212.901 571.285 218.333C571.285 218.333 591.193 237.058 635.123 192.881L673.503 151.882C679.711 145.251 687.226 139.988 695.646 136.746C703.035 133.897 711.954 132.231 720.62 135.04C720.62 135.04 743.191 138.403 741.138 175.524L741.138 198.658C741.138 198.658 738.815 235.32 790.157 203.285C790.157 203.285 826.349 183.353 866.529 131.563C866.529 131.563 885.477 101.733 927.361 104.928C931.682 105.258 935.955 106.191 939.951 107.897C945.588 110.311 952.509 113.981 954.69 123.613C955.142 125.593 954.824 129.721 951.796 134.927L949.956 138.379C944.74 148.18 940.522 154.497 935.036 164.145C931.349 170.631 928.21 176.916 923.286 187.039C919.893 194.015 909.705 213.577 924.658 220.634C942.782 229.188 969.317 209.546 983.936 195.182L1022.69 154.698C1022.69 154.698 1048.13 124.595 1070.57 133.881C1070.57 133.881 1098.1 141.63 1092.23 189.404C1092.23 189.404 1089.15 213.843 1102.49 217.166C1115.81 220.49 1153.32 214.728 1189.12 181.309C1217.27 155.028 1232.86 135.032 1238.25 127.685C1241.32 123.5 1244.71 119.565 1248.47 116.025C1259.64 105.507 1281.5 89.6792 1308.21 94.5315C1313.57 95.5052 1318.34 98.6757 1321.04 103.48C1324.2 109.121 1325.75 118.141 1319.07 131.571C1319.07 131.571 1389.65 190.515 1360.11 239.15C1340.13 272.046 1292.06 299.341 1252.7 303.719C1230.75 306.157 1202.42 292.332 1195.96 278.484C1195.96 278.484 1190.99 269.825 1199.38 261.134C1210.63 249.482 1224.45 239.158 1224.45 239.158C1224.45 239.158 1247.56 222.316 1266.65 236.004C1268.57 237.38 1270.69 238.45 1272.92 239.182C1278.6 241.057 1286.83 241.299 1285.74 226.324C1285.27 219.87 1283.17 213.658 1279.85 208.138C1274.18 198.723 1265.18 187.296 1255.24 179C1255.24 179 1129.85 317.342 1048.92 283.102C1048.92 283.102 1022.53 272.987 1020.41 229.888C1020.41 229.888 939.674 301.61 891.605 301.61C843.537 301.61 825.628 275.088 822.068 241.46C822.068 241.46 753.466 291.198 710.361 291.198C679.829 291.198 674.05 271.998 667.041 228.73C667.041 228.73 594.222 308.957 529.108 299.293C463.994 289.628 469.837 242.61 469.837 242.61C469.837 242.61 396.201 306.39 330.762 302.761C330.762 302.761 294.895 302.544 283.177 277.751C272.768 255.743 282.678 236.801 295.434 218.317C311.711 194.731 315.952 190.555 315.952 190.555C315.952 190.555 330.072 174.823 323.928 168.579C318.355 162.914 308.135 168.482 300.58 174.115C295.886 177.616 291.621 181.671 287.784 186.113C269.866 206.858 176.814 308.667 81.1292 302.761C-25.3773 296.187 25.2121 177.213 36.6762 154.698"
                            fill="currentColor"></path>
                    </svg>
                </div>

                {/* Stickers */}
                <div id="js-footer-stickers" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                    <div className="js-footer-sticker absolute w-[130px] h-auto pointer-events-auto left-[20%] bottom-[45%] -rotate-[20deg]">
                        <img src="/assets/Footer-Sticker SVG/footer-sticker-smiley.svg" width="100%" alt="" data-scroll-animation-target="" aria-hidden="true" />
                    </div>
                    <div className="js-footer-sticker absolute w-[130px] h-auto pointer-events-auto left-[45%] bottom-[30%] -rotate-[15deg]">
                        <img src="/assets/Footer-Sticker SVG/footer-sticker-heart.svg" width="100%" alt="" data-scroll-animation-target="" aria-hidden="true" />
                    </div>
                    <div className="js-footer-sticker absolute w-[130px] h-auto pointer-events-auto left-[55%] bottom-0 rotate-[10deg]">
                        <img src="/assets/Footer-Sticker SVG/footer-sticker-hands.svg" width="100%" alt="" data-scroll-animation-target="" aria-hidden="true" />
                    </div>
                    <div className="js-footer-sticker absolute w-[130px] h-auto pointer-events-auto left-[60%] bottom-[55%] rotate-0">
                        <img src="/assets/Footer-Sticker SVG/footer-sticker-100.svg" width="100%" alt="" data-scroll-animation-target="" aria-hidden="true" />
                    </div>
                    <div className="js-footer-sticker absolute w-[130px] h-auto pointer-events-auto right-[8%] bottom-[15%] rotate-[5deg]">
                        <img src="/assets/Footer-Sticker SVG/footer-sticker-camera.svg" width="100%" alt="" aria-hidden="true" />
                    </div>
                    <div className="js-footer-sticker absolute w-[150px] h-auto pointer-events-auto -left-[1%] bottom-[15%] -rotate-[10deg]">
                        <img src="/assets/Footer-Sticker SVG/footer-sticker-boom.svg" width="100%" alt="" data-scroll-animation-target="" aria-hidden="true" />
                    </div>
                </div>

                {/* Bottom row: credits */}
                <div className="absolute bottom-0 left-0 w-full flex justify-between items-end pointer-events-none z-10">
                    <div></div>
                    <div className="js-credits-wrapper relative pointer-events-auto -mr-[25px] -mb-[25px] z-[100] before:content-[''] before:absolute before:bottom-0 before:-left-[10px] before:-right-[10px] before:h-[calc(100%+25px)] before:pointer-events-auto">
                        <div className="js-credits-box absolute bottom-[calc(100%+15px)] right-0 bg-black rounded-[12px] opacity-0 invisible origin-bottom-right border-[3px] border-white pointer-events-auto overflow-hidden z-[1] box-border flex justify-end items-end">
                            <div className="flex gap-[38px] py-[27px] px-[32px] whitespace-nowrap w-max h-max">
                                <div className="js-credits-item flex flex-col gap-[4px]">
                                    <div className="overflow-visible"><span className="inline-block text-white text-[1.3rem] font-[950] pb-[10px] font-epilogue">code by</span></div>
                                    <div className="overflow-visible"><a href="#" className="js-credits-name inline-block text-white text-[1.1rem] font-[450] font-epilogue opacity-90 no-underline cursor-[url('/assets/Cursor_SVG/cursor-pointer.svg')_12_12,pointer]" data-wiggle-target="true">Abdelrahman</a></div>
                                </div>
                            </div>
                        </div>
                        <a href="#" className="js-footer-credits-btn bg-black font-epilogue text-white py-[3px] px-[12px] rounded-[20px] rounded-bl-[1px] no-underline text-[1rem] pointer-events-auto tracking-[0.5px] inline-block relative z-[2] cursor-[url('/assets/Cursor_SVG/cursor-pointer.svg')_12_12,pointer]">credits</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
