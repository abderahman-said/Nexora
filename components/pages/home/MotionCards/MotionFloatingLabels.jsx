import React from 'react';

export function MotionFloatingLabels({ labelsRef }) {
    return (
        <div ref={labelsRef} className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
            <div className="js-floating-label absolute py-[0.1vw] px-[0.5vw] rounded-full rounded-bl-none z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-auto bg-[#efbbd8] top-[31%] left-[30%]">
                <p className="js-floating-text pointer-events-none m-0 font-sans text-[1rem] font-[450] text-brand-dark">pixel perfect precision</p>
            </div>
            <div className="js-floating-label absolute py-[0.1vw] px-[0.5vw] rounded-full rounded-bl-none z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-auto bg-[#f4825c] top-[69%] left-[48%]">
                <p className="js-floating-text pointer-events-none m-0 font-sans text-[1rem] font-[450] text-brand-dark">performance is a priority</p>
            </div>
            <div className="js-floating-label absolute py-[0.1vw] px-[0.5vw] rounded-full rounded-bl-none z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-auto bg-[#dcec9d] top-[46%] left-[89%]">
                <p className="js-floating-text pointer-events-none m-0 font-sans text-[1rem] font-[450] text-brand-dark">user experience = everything</p>
            </div>
        </div>
    );
}
