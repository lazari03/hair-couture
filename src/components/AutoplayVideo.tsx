"use client";

import { useEffect, useRef } from "react";

// Muted, looping background video that actually starts on phones.
// - Starts playback explicitly once mounted instead of relying on the
//   autoplay attribute alone.
// - If the browser refuses (iOS Low Power Mode, data saver, strict autoplay
//   policies), it retries on the visitor's first tap/scroll, and again when
//   the tab becomes visible.
// - Phones get `mobileSrc` (lighter encode) when given; the source is set
//   on the client, so a phone never downloads the desktop file.
// The poster shows until the first frame is ready.
export function AutoplayVideo({
  src,
  mobileSrc,
  poster,
  className,
}: {
  src: string;
  mobileSrc?: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const isPhone = window.matchMedia("(max-width: 767px)").matches;
    const chosen = mobileSrc && isPhone ? mobileSrc : src;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    if (video.getAttribute("src") !== chosen) {
      video.src = chosen;
      video.load();
    }

    const tryPlay = () => {
      if (!video.paused) return;
      video.play().catch(() => {
        // Blocked for now — the interaction/visibility listeners retry.
      });
    };

    const onInteract = () => tryPlay();
    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    const opts = { passive: true } as const;
    window.addEventListener("touchstart", onInteract, opts);
    window.addEventListener("scroll", onInteract, opts);
    window.addEventListener("click", onInteract);
    document.addEventListener("visibilitychange", onVisible);
    video.addEventListener("canplay", tryPlay);
    tryPlay();

    return () => {
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("click", onInteract);
      document.removeEventListener("visibilitychange", onVisible);
      video.removeEventListener("canplay", tryPlay);
    };
  }, [src, mobileSrc]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden
    />
  );
}
