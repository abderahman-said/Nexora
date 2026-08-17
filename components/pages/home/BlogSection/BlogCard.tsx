import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface BlogCardProps {
  post: {
    id: string;
    image: string;
    title: string;
    link: string;
  };
  readMoreText: string;
}

export function BlogCard({ post, readMoreText }: BlogCardProps) {
  return (
    <div
      className="group flex flex-col overflow-hidden hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex flex-col flex-1 pt-6 pb-2 px-1">
        <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 leading-relaxed">
          {post.title}
        </h3>
        
        <div className="mt-auto pt-2">
          <Link
            href={post.link}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-300"
          >
            <span>{readMoreText}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
