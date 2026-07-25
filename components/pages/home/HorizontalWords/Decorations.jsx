export function StartArrow({ arrowSvgRef }) {
    return (
        <svg
            ref={arrowSvgRef}
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            viewBox="0 0 386 127"
            fill="none"
            className="absolute bottom-full left-1/2
            w-[23.75em] max-[1024px]:w-[18em] max-[768px]:w-[12em] max-[480px]:w-[10em]
            [transform:translate(-160%,-35%)] max-[768px]:[transform:translate(-140%,-30%)]
            text-blue-500/80"
        >
            <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
    )
}

export function EndArrow({ arrowEndSvgRef }) {
    return (
        <svg
            ref={arrowEndSvgRef}
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            viewBox="0 0 140 127"
            fill="none"
            className="absolute top-1/2 left-full
            w-[8.4375em] max-[1024px]:w-[6em] max-[768px]:w-[4em] max-[480px]:w-[3.5em]
            [transform:translate(50%)]
            text-blue-500/80"
        >
            <path d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.437 125.078L99.6875 107.891" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.438 125.078L137.969 110.234" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
    )
}

export function Stickers({ stickerWatchRef, stickerCursorRef, stickerPhoneRef }) {
    return (
        <>
            <div
                ref={stickerWatchRef}
                className="absolute top-1/2 z-10
                w-[4.5em] max-[1024px]:w-[3.5em] max-[768px]:w-[3em] max-[480px]:w-[2.5em]
                left-[17.5%] max-[768px]:left-[20%]
                [transform:translate(-50%,-110%)] max-[768px]:[transform:translate(-50%,-90%)]
                text-[#0284c7] drop-shadow-[0_0_15px_rgba(2,132,199,0.3)]"
                aria-hidden="true"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
            </div>
            <div
                ref={stickerCursorRef}
                className="absolute top-1/2 left-1/2 z-10
                w-[5em] max-[1024px]:w-[4em] max-[768px]:w-[3.5em] max-[480px]:w-[3em]
                [transform:translate(-50%,30%)] max-[768px]:[transform:translate(-50%,25%)]
                text-[#7c3aed] drop-shadow-[0_0_15px_rgba(124,58,237,0.3)]"
                aria-hidden="true"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
            </div>
            <div
                ref={stickerPhoneRef}
                className="absolute top-1/2 z-10
                w-[4.5em] max-[1024px]:w-[3.5em] max-[768px]:w-[3em] max-[480px]:w-[2.5em]
                left-[79%] max-[768px]:left-[85%]
                [transform:translate(-50%,-100%)] max-[768px]:[transform:translate(-50%,-80%)]
                text-[#2563eb] drop-shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                aria-hidden="true"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                    <path d="M12 2l2.4 7.6h8l-6.4 4.7 2.4 7.7-6.4-4.7-6.4 4.7 2.4-7.7-6.4-4.7h8z"></path>
                </svg>
            </div>
        </>
    )
}
