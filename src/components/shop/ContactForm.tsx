"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { submitContact } from "@/lib/actions/contact";
import type { BrandSlug } from "@/lib/brands";

export function ContactForm({ brand }: { brand: BrandSlug }) {
  const t = useTranslations("contact");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const result = await submitContact({ brand, ...form });
    setPending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-light">{t("successTitle")}</h2>
        <p className="mt-2 text-sm text-neutral-600">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex max-w-md flex-col gap-3">
      <input
        required
        placeholder={t("name")}
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
      />
      <input
        required
        type="email"
        placeholder={t("email")}
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
      />
      <textarea
        required
        rows={5}
        placeholder={t("message")}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 min-h-[52px] cursor-pointer bg-[var(--brand-accent)] font-inherit text-xs tracking-widest text-white uppercase hover:opacity-90 disabled:opacity-50"
      >
        {pending ? t("sending") : t("send")}
      </button>
    </form>
  );
}
