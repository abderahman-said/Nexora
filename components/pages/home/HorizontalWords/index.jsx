'use client';

import React, { useRef } from 'react';
import { useHorizontalWordsGSAP } from './useHorizontalWordsGSAP';
import { StartArrow, EndArrow, Stickers } from './Decorations';

const HorizontalWords = () => {
    const sectionRef = useRef(null);
    const relativeRef = useRef(null);
    const arrowSvgRef = useRef(null);
    const arrowEndSvgRef = useRef(null);
    const stickerWatchRef = useRef(null);
    const stickerCursorRef = useRef(null);
    const stickerPhoneRef = useRef(null);
    const lettersRef = useRef([]);
    lettersRef.current = [];

    const addLetterRef = (el) => {
        if (el && !lettersRef.current.includes(el)) {
            lettersRef.current.push(el);
        }
    };

    useHorizontalWordsGSAP({
        sectionRef, relativeRef, arrowSvgRef, arrowEndSvgRef,
        stickerWatchRef, stickerCursorRef, stickerPhoneRef, lettersRef
    });

    const text = "We craft premium digital experiences";

    return (
        <section
            ref={sectionRef}
            className="content-section relative w-full h-screen max-[768px]:min-h-[600px] bg-[var(--bg-color)] overflow-hidden"
        >
            <div
                ref={relativeRef}
                className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap flex items-center
                px-[25vw] max-[1024px]:px-[15vw] max-[768px]:px-[10vw] max-[480px]:px-[5vw]"
            >
                <div className="w-full relative">
                    <StartArrow arrowSvgRef={arrowSvgRef} />
                    <Stickers
                        stickerWatchRef={stickerWatchRef}
                        stickerCursorRef={stickerCursorRef}
                        stickerPhoneRef={stickerPhoneRef}
                    />
                    <EndArrow arrowEndSvgRef={arrowEndSvgRef} />

                    <h2
                        className="gsap-managed display relative z-[2] whitespace-nowrap lowercase m-0 leading-none
                        text-[9vw] max-[1024px]:text-[8vw] max-[768px]:text-[6vw] max-[480px]:text-[5.5vw]
                        font-[1000] max-[768px]:font-[800] text-slate-900 dark:text-white"
                        aria-label={text}
                        suppressHydrationWarning
                    >
                        {text.split("").map((char, i) =>
                            char === " " ? (
                                <React.Fragment key={i}> </React.Fragment>
                            ) : (
                                <div
                                    key={i}
                                    ref={addLetterRef}
                                    className="relative inline-block text-slate-900 dark:text-white"
                                    aria-hidden="true"
                                    suppressHydrationWarning
                                >
                                    {char}
                                </div>
                            )
                        )}
                    </h2>
                </div>
            </div>

            <div
                className="absolute left-1/2 top-1/2 z-20 w-max text-center flex flex-col items-center
                [transform:translate(-50%,9em)] max-[768px]:[transform:translate(-50%,6em)]"
            >
                <div
                    className="m-0
                    max-w-[40em] max-[1024px]:max-w-[35em] max-[768px]:max-w-[90vw]
                    text-[1.3rem] max-[1024px]:text-[1.1rem] max-[768px]:text-[0.9rem] max-[480px]:text-[0.85rem]
                    leading-[1.4] max-[768px]:leading-[1.3]
                    font-[500]
                    max-[768px]:px-[20px] max-[480px]:px-[15px]
                    text-slate-600 dark:text-slate-300"
                >
                    We are a passionate team of software engineers and system architects dedicated<br />
                    to building resilient digital infrastructure. By blending scalable architectures<br />
                    with clean, efficient code, we develop robust products that scale seamlessly.
                </div>
            </div>
        </section>
    );
};

export default HorizontalWords;