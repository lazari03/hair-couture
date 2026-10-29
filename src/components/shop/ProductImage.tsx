"use client";

import { useState } from "react";
import Image from "next/image";

// Product photo with a skeleton: a grey pulsing skeleton fills the slot until
// the image has actually loaded (onLoad), then the photo fades in. No image
// (or one that fails) keeps the skeleton — there's no placeholder photo.
// Used by product cards, the product page, cart and checkout, so it applies
// to all shops and any product added later. Images go through next/image (resized to the
// rendered size, AVIF/WebP, quality 85 — see next.config.ts).
export function ProductImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  src: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [state, setState] = useState<"loading" | "loaded" | "error">("loading");

  return (
    <>
      {(state !== "loaded" || !src) && (
        <div aria-hidden className="absolute inset-0 bg-neutral-200/70 motion-safe:animate-pulse" />
      )}
      {src && state !== "error" && (
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
      )}
    </>
  );
}
