import Image from "next/image";
import type { BrandSlug } from "@/lib/brands";
import type { HeroContent, HeroVariant } from "@/lib/data/shop";
import { BannerLinkTracker } from "./BannerLinkTracker";
import { AutoplayVideo } from "@/components/AutoplayVideo";

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
        <div className="flex flex-col justify-center bg-[#faf9f7] px-6 py-16 sm:px-11 sm:py-20">
          <span className="text-[11px] tracking-[0.22em] text-[var(--brand-accent)] uppercase">
            {content.eyebrow}
          </span>
          <h1 className="mt-4 text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
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
              className="inline-flex min-h-11 items-center bg-[var(--brand-accent)] px-7 text-xs tracking-widest text-white uppercase hover:opacity-90"
            >
              {content.cta}
            </BannerLinkTracker>
            <BannerLinkTracker
              href={`/${brand}/shop`}
              bannerId="hero_split"
              label={content.secondary}
              brand={brand}
              className="inline-flex min-h-11 items-center border-b border-neutral-900 px-1 text-xs tracking-widest uppercase hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
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
          <AutoplayVideo
            className="absolute inset-0 h-full w-full object-cover"
            src={content.video}
            mobileSrc={content.mobileVideo}
            poster={content.image}
          />
        ) : (
          <div className="motion-safe:animate-[pan_22s_ease-in-out_infinite] absolute -inset-[6%]">
            <Image src={content.image} alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/70" />
        <div className="relative flex h-full max-w-3xl flex-col items-start justify-center px-6 text-white sm:px-16">
          <span className="text-[11px] tracking-[0.22em] opacity-80 uppercase">{content.eyebrow}</span>
          <h1 className="mt-4 text-5xl leading-none font-light tracking-tight sm:text-7xl">
            {content.title}
          </h1>
          <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed opacity-85">{content.body}</p>
          <BannerLinkTracker
            href={`/${brand}/shop`}
            bannerId="hero_video"
            label={content.cta}
            brand={brand}
            className="mt-8 inline-flex min-h-11 items-center bg-white px-7 text-xs tracking-widest text-neutral-900 uppercase hover:bg-[var(--brand-accent)] hover:text-white"
          >
            {content.cta}
          </BannerLinkTracker>
        </div>
      </section>
    );
  }

  // full — balmainhair.com's campaign hero: copy on the left over the image,
  // serif uppercase title, one CTA.
  return (
    <section className="relative h-[min(78vh,680px)] overflow-hidden bg-neutral-950">
      <Image src={content.image} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent md:via-black/10" />
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white md:w-1/2">
        {content.eyebrow && (
          <span className="mb-4 text-[11px] tracking-[0.22em] opacity-85 uppercase">{content.eyebrow}</span>
        )}
        <h1 className="font-serif text-4xl leading-tight tracking-wide uppercase sm:text-5xl">{content.title}</h1>
        <p className="mt-6 max-w-[46ch] text-[15px] leading-relaxed whitespace-pre-line opacity-95">
          <RichText text={content.body} />
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <BannerLinkTracker
            href={`/${brand}${content.href ?? "/shop"}`}
            bannerId="hero_full"
            label={content.cta}
            brand={brand}
            className="inline-flex min-h-12 items-center bg-black px-7 text-xs tracking-widest text-white uppercase hover:bg-white hover:text-black"
          >
            {content.cta}
          </BannerLinkTracker>
          {content.secondary && (
            <BannerLinkTracker
              href={`/${brand}/shop`}
              bannerId="hero_full"
              label={content.secondary}
              brand={brand}
              className="inline-flex min-h-12 items-center border border-white/60 px-7 text-xs tracking-widest text-white uppercase hover:bg-white/15"
            >
              {content.secondary}
            </BannerLinkTracker>
          )}
        </div>
      </div>
    </section>
  );
}

// Copy from messages can mark a phrase as *emphasis* (rendered italic).
function RichText({ text }: { text: string }) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : part,
  );
}
