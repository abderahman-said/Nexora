import React, { useRef } from 'react';

export function ServiceCard({ service, index }) {
    const cardRef = useRef(null);

    return (
        <div
            ref={cardRef}
            data-service-card
            data-index={index}
            className={`service-card p-6 group relative cursor-default overflow-hidden rounded-[28px] bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 ${service.size === 'large'
                    ? ' col-span-2 max-[900px]:col-span-1'
                    : ''
                }`}
            style={{ '--accent': service.accent }}
            suppressHydrationWarning
        >
            {/* glass layer */}
            <div className="service-card-inner absolute inset-0 rounded-[inherit] bg-white/80 dark:bg-slate-900/80 backdrop-blur-[2px]" />

            {/* mouse glow */}
            <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background:
                        'radial-gradient(350px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--accent) 15%, transparent), transparent 65%)',
                }}
            />

            {/* top accent line – animated by GSAP */}
            <div
                className="service-card-line absolute left-8 top-0 h-px w-0 rounded-full"
                style={{ background: `linear-gradient(90deg, var(--accent), transparent)` }}
            />

            {/* content */}
            <div
                className={`relative z-10 flex h-full flex-col p-8${service.size === 'large' ? ' sm:flex-row sm:gap-10' : ''
                    }`}
            >
                {/* left / main */}
                <div className="flex flex-col flex-1">
                    {/* number badge */}
                    <div className="mb-6 flex items-center gap-3">
                        <span
                            className="inline-flex items-center justify-center rounded-xl px-3 py-1 text-[0.65rem] font-black tracking-[0.2em] uppercase"
                            style={{
                                background: `color-mix(in srgb, var(--accent) 12%, transparent)`,
                                color: 'var(--accent)',
                                border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                            }}
                        >
                            {service.id}
                        </span>
                        <div
                            className="h-px flex-1 opacity-20"
                            style={{ background: `linear-gradient(90deg, var(--accent), transparent)` }}
                        />
                    </div>

                    {/* icon */}
                    <div
                        className="service-icon mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
                        style={{
                            background: `color-mix(in srgb, var(--accent) 10%, transparent)`,
                            border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
                            boxShadow: `0 0 24px color-mix(in srgb, var(--accent) 12%, transparent)`,
                        }}
                    >
                        {React.createElement(service.icon, { className: "w-6 h-6", style: { color: 'var(--accent)' } })}
                    </div>

                    {/* title */}
                    <h3
                        className="mb-3 text-[1.35rem] font-black leading-tight tracking-[-0.03em] text-slate-900 dark:text-white"
                        suppressHydrationWarning
                    >
                        {service.title}
                    </h3>

                    {/* description */}
                    <p
                        className="mb-auto text-sm leading-[1.75] text-slate-600 dark:text-slate-300 font-medium"
                        suppressHydrationWarning
                    >
                        {service.description}
                    </p>
                </div>

                {/* features list */}
                <ul
                    className={`flex flex-col gap-2.5 ${service.size === 'large' ? 'mt-8 sm:mt-0 sm:w-52 sm:flex-shrink-0 sm:justify-center' : 'mt-6'}`}
                    role="list"
                >
                    {service.features.map((f, i) => (
                        <li
                            key={f}
                            data-feature={i}
                            className="service-feature flex items-center gap-3 text-[0.78rem] font-semibold text-slate-600 dark:text-slate-300"
                        >
                            <span
                                className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                                style={{ background: 'var(--accent)', boxShadow: `0 0 6px var(--accent)` }}
                            />
                            {f}
                        </li>
                    ))}
                </ul>
            </div>

            {/* bottom-right corner glow */}
            <div
                className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: `color-mix(in srgb, var(--accent) 25%, transparent)` }}
            />
        </div>
    );
}
