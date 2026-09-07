"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@/i18n/navigation";
import { CartCountBadge } from "@/components/shop/CartCountBadge";

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="m16 16 4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        d="M3 5h2l2.1 9.1a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L20 8H7.1"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <circle cx="10" cy="19" r="1.25" fill="currentColor" />
      <circle cx="17" cy="19" r="1.25" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        d="M5 5l14 14M19 5 5 19"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

interface MenuLink {
  label: string;
  href: string;
}

export function BrandMobileMenu({
  cartHref,
  cartLabel,
  searchHref,
  searchLabel,
  menuLinks,
  accentColor,
  saleColor,
}: {
  cartHref: string;
  cartLabel: string;
  searchHref: string;
  searchLabel: string;
  menuLinks: MenuLink[];
  accentColor: string;
  saleColor: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Portal target (document.body) only exists client-side; flip after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    const previousOverflow = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = "hidden";
    }

    if (open) window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <div className="flex items-center justify-end lg:hidden">
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="flex min-h-11 w-11 items-center justify-center border border-neutral-300 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-transform duration-200 active:scale-95"
        >
          <span className="flex flex-col gap-1.5">
            <span className={`h-0.5 w-4 bg-neutral-900 transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-4 bg-neutral-900 transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-4 bg-neutral-900 transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {mounted
        ? createPortal(
            <div
              className={`fixed inset-0 z-50 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
              aria-hidden={!open}
              style={{ "--brand-accent": accentColor, "--brand-sale": saleColor } as React.CSSProperties}
            >
              <button
                type="button"
                aria-label="Close menu overlay"
                onClick={() => setOpen(false)}
                className={`absolute inset-0 bg-black/30 backdrop-blur-[3px] transition-opacity duration-300 ${
                  open ? "opacity-100" : "opacity-0"
                }`}
              />

              <aside
                className={`absolute inset-0 flex h-full w-full flex-col bg-white shadow-[0_30px_80px_rgba(0,0,0,0.2)] transition-transform duration-300 ease-out ${
                  open ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b border-neutral-100 bg-white px-5 py-4 sm:px-6">
                  <div>
                    <p className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase">Menu</p>
                    <p className="mt-1 text-sm text-neutral-900">Browse the shop</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="flex h-10 w-10 items-center justify-center border border-neutral-300 bg-white text-neutral-900 shadow-sm"
                    aria-label="Close menu"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="flex gap-3 border-b border-neutral-100 px-5 py-4 sm:px-6">
                  <Link href={searchHref} onClick={() => setOpen(false)} aria-label={searchLabel} className="inline-flex h-11 w-11 items-center justify-center border border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100">
                    <SearchIcon />
                  </Link>
                  <Link href={cartHref} onClick={() => setOpen(false)} aria-label={cartLabel} className="relative inline-flex h-11 w-11 items-center justify-center border border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100">
                    <CartIcon />
                    <span className="absolute -right-1 -top-1">
                      <CartCountBadge />
                    </span>
                  </Link>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
                  <p className="mb-3 text-[10px] tracking-[0.2em] text-neutral-500 uppercase">Categories</p>
                  <nav className="divide-y divide-neutral-100 border-y border-neutral-100">
                    {menuLinks.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={
                          item.label === "Sale"
                            ? "flex items-center justify-between py-4 text-[15px] font-medium text-[var(--brand-sale)] transition-colors"
                            : "flex items-center justify-between py-4 text-[15px] text-neutral-800 transition-colors hover:text-[var(--brand-accent)]"
                        }
                      >
                        <span>{item.label}</span>
                        <span className="text-xs tracking-[0.16em] text-neutral-400 uppercase">View</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </aside>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
