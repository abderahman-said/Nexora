"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { APP_CONSTANTS } from "@/lib/constants";

export default function HeroBackground() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const attemptPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure WebKit & iOS muted autoplay requirements are strictly set on DOM element
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    if (video.paused) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setVideoError(false);
            setIsVideoLoaded(true);
          })
          .catch((err) => {
            console.warn("Autoplay deferred by browser policy:", err);
          });
      }
    } else if (video.currentTime > 0) {
      setIsVideoLoaded(true);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Critical WebKit & iOS autoplay configuration attributes
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("x5-playsinline", "true");

    // Immediate playback attempt
    attemptPlay();

    // Event handlers for video element events
    const handlePlaying = () => {
      setVideoError(false);
      setIsVideoLoaded(true);
    };

    const handleCanPlay = () => {
      attemptPlay();
    };

    video.addEventListener("loadedmetadata", handleCanPlay);
    video.addEventListener("loadeddata", handleCanPlay);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("canplaythrough", handleCanPlay);
    video.addEventListener("playing", handlePlaying);

    // Immediate retries on user interaction or page visibility change
    const handleUserInteraction = () => {
      attemptPlay();
    };

    const events = [
      "touchstart",
      "touchend",
      "mousedown",
      "mousemove",
      "pointerdown",
      "scroll",
      "click",
      "keydown",
      "pageshow",
      "visibilitychange",
      "focus"
    ];

    events.forEach((evt) => {
      window.addEventListener(evt, handleUserInteraction, { passive: true });
    });

    // Smart polling retry loop for initial network buffering delay
    let retryCount = 0;
    const maxRetries = 24; // 24 * 250ms = 6 seconds retry window for network load
    const intervalId = setInterval(() => {
      retryCount++;
      if (video && !video.paused && video.currentTime > 0) {
        setIsVideoLoaded(true);
        clearInterval(intervalId);
      } else if (retryCount > maxRetries) {
        clearInterval(intervalId);
      } else {
        attemptPlay();
      }
    }, 250);

    return () => {
      clearInterval(intervalId);
      video.removeEventListener("loadedmetadata", handleCanPlay);
      video.removeEventListener("loadeddata", handleCanPlay);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("canplaythrough", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);

      events.forEach((evt) => {
        window.removeEventListener(evt, handleUserInteraction);
      });
    };
  }, [attemptPlay]);

  // IntersectionObserver: Pause when scrolled far out of view, resume when back in view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          attemptPlay();
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      },
      { threshold: 0.01, rootMargin: "100px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [attemptPlay]);

  const handleVideoError = (
    event: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    const video = event.currentTarget;
    console.error("Hero video error:", video.error);
    setVideoError(true);
    setIsVideoLoaded(false);
  };

  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Poster image (always visible underneath until video renders) */}
        <div
          className={`absolute inset-0 scale-105 transition-opacity duration-700 ${
            isVideoLoaded && !videoError ? "opacity-0" : "opacity-100"
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
          ref={(el) => {
            videoRef.current = el;
            if (el) {
              el.muted = true;
              el.defaultMuted = true;
              el.playsInline = true;
            }
          }}
          autoPlay
          muted
          loop
          playsInline
          {...{
            "webkit-playsinline": "true",
            "x5-playsinline": "true",
            "x5-video-player-type": "h5-page",
            "x5-video-player-fullscreen": "true"
          }}
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          onError={handleVideoError}
          className={`absolute inset-0 w-full h-full object-cover scale-105 pointer-events-none transition-opacity duration-700 ${
            videoError ? "opacity-0" : "opacity-80"
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