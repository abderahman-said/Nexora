import React from "react";
import Image from "next/image";

export function ConvergenceActors({ manRef, robotRef }) {
    return (
        <>
            <div
                ref={manRef}
                className="absolute top-0 w-full h-[45vh] lg:h-[45vh] lg:max-h-[500px] xl:h-[50vh] xl:max-h-none flex flex-col justify-end items-center z-20 will-change-transform opacity-0"
                suppressHydrationWarning
            >
                <div className="relative w-80 md:w-96 lg:w-[500px] aspect-[3/4]" suppressHydrationWarning>
                    <Image
                        src="/manupgoingdown.png"
                        alt="Saudi Man"
                        fill
                        className="object-contain object-bottom drop-shadow-2xl"
                        priority
                    />
                </div>
            </div>

            <div
                ref={robotRef}
                className="absolute bottom-0 w-full h-[45vh] lg:h-[45vh] lg:max-h-[500px] xl:h-[50vh] xl:max-h-none flex flex-col justify-start items-center z-20 will-change-transform opacity-0"
                suppressHydrationWarning
            >
                <div className="relative w-104 md:w-lg lg:w-[650px] aspect-[3/4]" suppressHydrationWarning>
                    <Image
                        src="/robotdowngoingup.png"
                        alt="Robot"
                        fill
                        className="object-contain object-top drop-shadow-2xl"
                        priority
                    />
                </div>
            </div>
        </>
    );
}
