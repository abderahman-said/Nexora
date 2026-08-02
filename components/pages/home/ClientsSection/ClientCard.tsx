import React from 'react';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';
import type { ClientCardProps } from './types';

export function ClientCard({ client }: ClientCardProps) {
    return (
        <div
            className="
                group relative flex flex-col justify-between
                bg-white dark:bg-[#0c101d]
                border border-slate-200/90 dark:border-slate-800/90
                rounded-3xl p-5 pt-8
                shadow-xl shadow-slate-200/40 dark:shadow-none
                hover:border-blue-500/60 dark:hover:border-sky-400/60
                hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/20
                hover:-translate-y-2 hover:scale-[1.01]
                transition-all duration-500 ease-out
                h-full
            "
        >
            {/* Top Hover Inner Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

            {/* Card Header: Avatar Protruding */}
            <div className="relative z-10 flex items-end justify-between -mt-14 mb-4">

                {/* Avatar Photo with Quote Badge */}
                <div className="relative">
                    <div className="
                        w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden
                        border-[6px] border-white dark:border-[#0c101d]
                        bg-slate-100 dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/20
                        group-hover:border-blue-600 dark:group-hover:border-sky-400
                        transition-colors duration-300
                    ">
                        <Image
                            src={client.avatar}
                            alt={client.clientName}
                            width={88}
                            height={88}
                            loading="lazy"
                            decoding="async"
                            sizes="96px"
                            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                        />
                    </div>

                    {/* Circular Quote Badge */}
                    <div className="
                        absolute -bottom-3 left-1/2 -translate-x-1/2
                        w-8 h-8 rounded-full
                        bg-gradient-to-br from-blue-600 via-sky-500 to-indigo-600 text-white
                        flex items-center justify-center
                        shadow-lg shadow-blue-500/40
                        group-hover:shadow-xl group-hover:shadow-blue-500/60 group-hover:scale-110 group-hover:rotate-12
                        transition-all duration-500 ease-out z-20
                    ">
                        <span className="absolute inset-0 rounded-full bg-blue-500/40 animate-ping opacity-60 pointer-events-none" />
                        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-sky-400 opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-500 pointer-events-none" />
                        <Quote className="w-3.5 h-3.5 fill-current stroke-none rotate-180 relative z-10 transform transition-transform duration-500 ease-out group-hover:rotate-12 group-hover:scale-110" />
                    </div>
                </div>

                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 pb-2">
                    {Array.from({ length: client.rating || 5 }).map((_, starIdx) => (
                        <Star
                            key={starIdx}
                            className="w-4 h-4 fill-blue-600 text-blue-600 dark:fill-sky-400 dark:text-sky-400"
                        />
                    ))}
                </div>
            </div>

            {/* Testimonial Quote Comment */}
            <p className="relative z-10 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal my-4 text-left">
                {client.comment}
            </p>

            {/* Client Name & Role */}
            <div className="relative z-10 text-left pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-auto">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-300">
                    {client.clientName}
                </h3>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5">
                    {client.role}
                </p>
            </div>
        </div>
    );
}
