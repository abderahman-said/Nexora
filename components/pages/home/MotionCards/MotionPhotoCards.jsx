import React from 'react';
import Image from 'next/image';

export function MotionPhotoCards({ cardsRef }) {
    return (
        <div ref={cardsRef} className="relative flex items-center justify-center w-full h-full z-[2]">
            <div className="js-card relative w-[18vw] h-[12vw] rounded-md overflow-clip shadow-[0_8px_30px_rgba(0,0,0,0.15)] shrink-0 -rotate-[6deg] -mr-[2vw] z-[1]">
                <div className="w-full h-full bg-[#d9d2cb] rounded-md overflow-hidden">
                    <Image
                        src="/assets/1.png"
                        width={600}
                        height={400}
                        alt="Project showcase 1"
                        className="w-full h-full object-cover object-top"
                    />
                </div>
            </div>

            <div className="js-card relative w-[18vw] h-[12vw] rounded-md overflow-clip shadow-[0_8px_30px_rgba(0,0,0,0.15)] shrink-0 rotate-[6deg] -mr-[2vw] z-[2] -left-[2rem] -bottom-[3rem]">
                <div className="w-full h-full bg-[#d9d2cb] rounded-md overflow-hidden">
                    <Image
                        src="/assets/2.png"
                        width={600}
                        height={400}
                        alt="Project showcase 2"
                        className="w-full h-full object-cover object-top"
                    />
                </div>
            </div>

            <div className="js-card relative w-[18vw] h-[12vw] rounded-md overflow-clip shadow-[0_8px_30px_rgba(0,0,0,0.15)] shrink-0 -rotate-[6deg] -mr-[2vw] z-[3] -left-[3rem]">
                <div className="w-full h-full bg-[#d9d2cb] rounded-md overflow-hidden">
                    <Image
                        src="/assets/3.png"
                        width={600}
                        height={400}
                        alt="Project showcase 3"
                        className="w-full h-full object-cover object-top"
                    />
                </div>
            </div>

            <div className="js-card relative w-[18vw] h-[12vw] rounded-md overflow-clip shadow-[0_8px_30px_rgba(0,0,0,0.15)] shrink-0 rotate-[4deg] -mr-[2vw] z-[4] -left-[3.5rem] -bottom-[2rem]">
                <div className="w-full h-full bg-[#d9d2cb] rounded-md overflow-hidden">
                    <Image
                        src="/assets/4.png"
                        width={600}
                        height={400}
                        alt="Project showcase 4"
                        className="w-full h-full object-cover object-top"
                    />
                </div>
            </div>
        </div>
    );
}
