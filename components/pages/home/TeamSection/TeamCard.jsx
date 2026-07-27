import React from 'react';
import { Plus } from 'lucide-react';
import Image from 'next/image';

export function TeamCard({ member }) {
    return (
        <div
            className="
                group relative flex flex-col items-center text-center
                bg-white dark:bg-[#0c101d]
                border border-slate-200/90 dark:border-slate-800/90
                rounded-3xl p-5
                shadow-xl shadow-slate-200/40 dark:shadow-none
                hover:border-blue-500/60 dark:hover:border-sky-400/60
                hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/20
                hover:-translate-y-2 hover:scale-[1.01]
                transition-all duration-500 ease-out
                overflow-hidden
            "
        >
            {/* ── Top Hover Mesh Overlay ── */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

            {/* ── Image Container ── */}
            <div className="relative w-full rounded-2xl overflow-hidden aspect-[4/3] mb-5 bg-slate-100 dark:bg-slate-900 group/img">
                <Image
                    src={member.image}
                    alt={member.name}
                    width={600}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="w-full h-full object-cover object-top group-hover/img:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Floating Plus Action Button */}
                <div
                    className="
                        absolute bottom-3 right-3
                        w-9 h-9 rounded-full
                        bg-gradient-to-br from-blue-600 via-sky-500 to-indigo-600 text-white
                        flex items-center justify-center
                        shadow-lg shadow-blue-500/40
                        group-hover:scale-110 group-hover:rotate-90
                        transition-all duration-300 ease-out z-10
                    "
                >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                </div>
            </div>

            {/* ── Member Details ── */}
            <div className="relative z-10 space-y-1 pb-2">
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-300">
                    {member.name}
                </h3>
                <p className="text-xs font-semibold text-blue-600 dark:text-sky-400">
                    {member.role}
                </p>
            </div>
        </div>
    );
}
