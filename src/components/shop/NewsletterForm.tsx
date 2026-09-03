"use client";

import { useState } from "react";
import { subscribeToNewsletter } from "@/lib/actions/newsletter";
import { trackNewsletterSignup } from "@/lib/analytics/events";
import type { BrandSlug } from "@/lib/brands";

export function NewsletterForm({
  brand,
  placeholder,
  cta,
}: {
  brand: BrandSlug;
  placeholder: string;
  cta: string;
}) {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const result = await subscribeToNewsletter(email);
    setPending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    trackNewsletterSignup(brand);
    setDone(true);
    setEmail("");
  }

  if (done) {
    return <p className="text-sm text-neutral-400">Thanks — you&apos;re on the list.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex border-b border-neutral-600 focus-within:border-white">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="min-h-11 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
        />
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 text-xs tracking-widest text-white uppercase hover:opacity-70 disabled:opacity-40"
        >
          {pending ? "…" : cta}
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </form>
  );
}
