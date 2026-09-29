import Image from "next/image";
import type { BrandSlug } from "@/lib/brands";
import type { HeroContent, HeroVariant } from "@/lib/data/shop";
import { BannerLinkTracker } from "./BannerLinkTracker";

function Arrow() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1">
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Three treatments from the design (full-bleed / split / video-style pan).
// Each brand picks one via ShopContent.heroVariant (lib/data/shop.ts) —
// production doesn't need the design's live style switcher, just the styles.
export function Hero({
  brand,
  variant,
  content,
}: {
  brand: BrandSlug;
  variant: HeroVariant;
  content: HeroContent;
}) {
  if (variant === "split") {
    return (
      <section className="grid grid-cols-1 items-stretch md:grid-cols-2">
        <div className="relative min-h-[420px]">
          <Image src={content.image} alt="" fill priority sizes="50vw" className="object-cover" />
        </div>
        <div className="flex animate-rise flex-col justify-center bg-[var(--surface-muted)] px-6 py-16 sm:px-12 sm:py-24 lg:px-16">
          <span className="flex items-center gap-3 text-[11px] tracking-[0.28em] text-[var(--brand-accent)] uppercase before:h-px before:w-8 before:bg-current">
            {content.eyebrow}
          </span>
          <h1 className="mt-5 font-display text-5xl leading-[0.95] font-light tracking-tight sm:text-6xl lg:text-7xl">
            {content.title}
          </h1>
          <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-neutral-600">
            {content.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <BannerLinkTracker
              href={`/${brand}/shop`}
              bannerId="hero_split"
              label={content.cta}
              brand={brand}
              className="group btn-pill bg-[var(--brand-accent)] text-[var(--brand-accent-foreground)] shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
            >
              {content.cta}
              <Arrow />
            </BannerLinkTracker>
            <BannerLinkTracker
              href={`/${brand}/shop`}
              bannerId="hero_split"
              label={content.secondary}
              brand={brand}
              className="group btn-pill border border-neutral-900/15 bg-white/60 text-neutral-900 hover:border-neutral-900"
            >
              {content.secondary}
            </BannerLinkTracker>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "video") {
    return (
      <section className="relative h-[min(80vh,700px)] overflow-hidden bg-neutral-900">
        {content.video ? (
          <>
            {/* motion-reduce users get the poster frame, not an autoplaying video */}
            <video
              className="absolute inset-0 hidden h-full w-full object-cover motion-safe:block"
              src={content.video}
              poster={content.image}
              autoPlay
              loop
              muted
              playsInline
            />
            <Image
              src={content.image}
              alt=""
              fill
              sizes="100vw"
              className="absolute inset-0 hidden object-cover motion-reduce:block"
            />
          </>
        ) : (
          <div className="motion-safe:animate-[pan_22s_ease-in-out_infinite] absolute -inset-[6%]">
            <Image src={content.image} alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/70" />
        <div className="relative flex h-full max-w-3xl animate-rise flex-col items-start justify-center px-6 text-white sm:px-16">
          <span className="flex items-center gap-3 text-[11px] tracking-[0.28em] opacity-85 uppercase before:h-px before:w-8 before:bg-current">{content.eyebrow}</span>
          <h1 className="mt-5 font-display text-6xl leading-[0.92] font-light tracking-tight sm:text-8xl">
            {content.title}
          </h1>
          <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed opacity-85">{content.body}</p>
          <BannerLinkTracker
            href={`/${brand}/shop`}
            bannerId="hero_video"
            label={content.cta}
            brand={brand}
            className="group btn-pill mt-9 bg-white text-neutral-900 hover:bg-[var(--brand-accent)] hover:text-[var(--brand-accent-foreground)]"
          >
            {content.cta}
            <Arrow />
          </BannerLinkTracker>
        </div>
      </section>
    );
  }

  // full
  return (
    <section className="relative h-[min(78vh,680px)] overflow-hidden bg-neutral-200">
      <Image src={content.image} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/5 to-black/55" />
      <div className="relative flex h-full animate-rise flex-col items-center justify-end px-6 pb-16 text-center text-white sm:pb-20">
        <span className="flex items-center gap-3 text-[11px] tracking-[0.28em] opacity-90 uppercase before:h-px before:w-8 before:bg-current after:h-px after:w-8 after:bg-current">{content.eyebrow}</span>
        <h1 className="mt-5 font-display text-6xl leading-[0.92] font-light tracking-tight sm:text-8xl">
          {content.title}
        </h1>
        <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed opacity-90">{content.body}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <BannerLinkTracker
            href={`/${brand}/shop`}
            bannerId="hero_full"
            label={content.cta}
            brand={brand}
            className="group btn-pill bg-white text-neutral-900 hover:bg-[var(--brand-accent)] hover:text-[var(--brand-accent-foreground)]"
          >
            {content.cta}
            <Arrow />
          </BannerLinkTracker>
          <BannerLinkTracker
            href={`/${brand}/shop`}
            bannerId="hero_full"
            label={content.secondary}
            brand={brand}
            className="group btn-pill border border-white/50 text-white backdrop-blur-sm hover:bg-white/15"
          >
            {content.secondary}
          </BannerLinkTracker>
        </div>
      </div>
    </section>
  );
}
