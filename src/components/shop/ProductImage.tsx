"use client";

import { useState } from "react";
import Image from "next/image";

// Product photo with a skeleton: a pulsing placeholder fills the slot until
// the image has actually loaded (onLoad), then the photo fades in. Used by
// every product card and the product page, so it applies to all shops and
// any product added later. Images go through next/image (resized to the
// rendered size, AVIF/WebP, quality 85 — see next.config.ts).
export function ProductImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <>
      {state !== "loaded" && (
        <div
          aria-hidden
          className={`absolute inset-0 bg-neutral-200/70 ${state === "loading" ? "motion-safe:animate-pulse" : ""}`}
        />
      )}
      <div className={`absolute inset-0 transition-opacity duration-500 ${state === "loaded" ? "opacity-100" : "opacity-0"}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={85}
          priority={priority}
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
          className={className}
        />
      </div>
    </>
  );
}
