"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { APP_CONSTANTS } from "@/lib/constants";

export default function HeroBackground() {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    // Important for iOS Safari autoplay
    video.muted = true;
    video.playsInline = true;

    const handleReady = () => {
      setVideoError(false);
      setIsVideoReady(true);
    };

    // If video is already buffering/ready
    if (video.readyState >= 2 && !video.paused) {
      handleReady();
    }

    const playVideo = async () => {
      try {
        video.muted = true;
        await video.play();
        handleReady();
      } catch (error) {
        console.warn("Video autoplay prevented:", error);
      }
    };

    // Try immediately
    playVideo();

    // Extra attempt after the browser has initialized the video
    const timeout = window.setTimeout(() => {
      if (video.paused) {
        playVideo();
      }
    }, 300);

    // iOS Low Power Mode / Gesture restriction fallback: attempt play on user interaction
    const handleUserInteraction = () => {
      if (video.paused) {
        playVideo();
      }
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
    };

    window.addEventListener("touchstart", handleUserInteraction, { passive: true });
    window.addEventListener("click", handleUserInteraction, { passive: true });
    window.addEventListener("scroll", handleUserInteraction, { passive: true });

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
    };
  }, []);

  const handleVideoReady = () => {
    setVideoError(false);
    setIsVideoReady(true);
  };

  const handleVideoError = (
    event: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    const video = event.currentTarget;

    console.error("Hero video failed:", {
      error: video.error,
      code: video.error?.code,
      message: video.error?.message,
      src: video.currentSrc,
    });

    setVideoError(true);
    setIsVideoReady(false);
  };

  return (
    <>
      {/* Preload the MP4 hero video */}
      <link
        rel="preload"
        as="video"
        href={APP_CONSTANTS.VIDEO.HERO_MP4}
        type="video/mp4"
      />

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Poster / fallback */}
        <div
          className={`absolute inset-0 scale-105 transition-opacity duration-700 ${
            isVideoReady && !videoError
              ? "opacity-0"
              : "opacity-100"
          }`}
        >
          <Image
            src="/assets/hero_poster.webp"
            alt="Nexora Solutions Hero"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Hero Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          onLoadedMetadata={handleVideoReady}
          onLoadedData={handleVideoReady}
          onCanPlay={handleVideoReady}
          onPlaying={handleVideoReady}
          onTimeUpdate={() => {
            if (!isVideoReady && !videoError) {
              handleVideoReady();
            }
          }}
          onError={handleVideoError}
          className={`absolute inset-0 w-full h-full object-cover scale-105 pointer-events-none transition-opacity duration-700 ${
            isVideoReady && !videoError
              ? "opacity-80"
              : "opacity-0"
          }`}
        >
          {/* H.264 MP4 - primary / best iOS compatibility */}
          <source
            src={APP_CONSTANTS.VIDEO.HERO_MP4}
            type="video/mp4"
          />

          {/* WebM - fallback for browsers that support it */}
          <source
            src={APP_CONSTANTS.VIDEO.HERO_WEBM}
            type="video/webm"
          />
        </video>

        {/* Light mode overlay */}
        <div className="absolute inset-0 bg-slate-900/10 dark:hidden pointer-events-none" />

        {/* Dark mode overlay */}
        <div className="hidden dark:block absolute inset-0 bg-blue-950/40 pointer-events-none" />
      </div>

      {/* Bottom fade */}
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

      {/* Static Background glow */}
      <div
        aria-hidden="true"
        className="
          hidden
          md:block
          absolute
          top-1/4
          start-1/4
          w-[600px]
          h-[600px]
          rounded-full
          pointer-events-none
          bg-[radial-gradient(circle,rgba(37,99,235,0.10)_0%,rgba(2,132,199,0.05)_40%,transparent_70%)]
        "
      />
    </>
  );
}