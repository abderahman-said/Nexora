"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import type { HeroBackgroundProps } from "./types";
import { APP_CONSTANTS } from "@/lib/constants";

export default function HeroBackground({ glowRef }: HeroBackgroundProps) {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Video autoplay prevented:", err);
      });
    }
  }, []);

  return (
    <>
      {/* Preload الفيديو الأساسي (mp4) عشان يشتغل مع كل المتصفحات */}
      <link rel="preload" as="video" href={APP_CONSTANTS.VIDEO.HERO_MP4} type="video/mp4" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className={`absolute inset-0 scale-105 transition-opacity duration-700 ${isVideoReady ? "opacity-0" : "opacity-100"
            }`}
        >
          <Image
            src="/assets/hero_poster.webp"
            alt="Nexora Solutions Hero"
            fill
            priority
            fetchPriority="high"
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
          preload="auto"
          onLoadedData={() => setIsVideoReady(true)}
          onPlaying={() => setIsVideoReady(true)}
          onError={(e) =>
            console.error("Video element error:", e.currentTarget.error)
          }
          className={`w-full h-full object-cover scale-105 pointer-events-none transition-opacity duration-700 ${isVideoReady ? "opacity-80" : "opacity-0"
            }`}
        >
          {/* WebM (VP9): الأسرع والأخف حجماً لمعظم المتصفحات الحديثة */}
          <source
            src={APP_CONSTANTS.VIDEO.HERO_WEBM}
            type="video/webm"
            onError={() => console.error("webm source failed to load")}
          />
          {/* MP4 (H.264): كبديل للمتصفحات اللي مش بتدعم WebM زي Safari */}
          <source
            src={APP_CONSTANTS.VIDEO.HERO_MP4}
            type="video/mp4"
            onError={() => console.error("mp4 source failed to load")}
          />
        </video>

        <div className="absolute inset-0 bg-slate-900/10 dark:hidden pointer-events-none" />
        <div className="hidden dark:block absolute inset-0 bg-blue-950/40 pointer-events-none" />
      </div>

      <div
        className="
          absolute
          left-[-1px]
          right-[-1px]
          bottom-[-1px]
          h-[55%]
          pointer-events-none
          z-[2]
          bg-[linear-gradient(180deg,rgba(248,250,252,0)_0%,rgba(248,250,252,0.6)_50%,rgba(248,250,252,1)_85%,rgba(248,250,252,1)_100%)]
          dark:bg-[linear-gradient(180deg,rgba(9,13,22,0)_0%,rgba(9,13,22,0.7)_50%,rgba(9,13,22,1)_85%,rgba(9,13,22,1)_100%)]
        "
      />



      <div
        ref={glowRef}
        aria-hidden="true"
        className="
                    hidden md:block absolute top-0 left-0 w-[600px] h-[600px] rounded-full
                    pointer-events-none
                    [will-change:transform]
                    bg-[radial-gradient(circle,rgba(37,99,235,0.12)_0%,rgba(2,132,199,0.06)_40%,transparent_70%)]
                "
      />
    </>
  );
}