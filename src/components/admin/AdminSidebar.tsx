"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Hand-rolled — 3 icons isn't worth a dependency. Plain stroke SVGs,
// currentColor so they pick up the active/inactive text color for free.
function DashboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1.5" y="1.5" width="6" height="6" rx="1" />
      <rect x="8.5" y="1.5" width="6" height="6" rx="1" />
      <rect x="1.5" y="8.5" width="6" height="6" rx="1" />
      <rect x="8.5" y="8.5" width="6" height="6" rx="1" />
    </svg>
  );
}

function ProductsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1.5 4.5 8 1.5l6.5 3v7L8 14.5l-6.5-3z" strokeLinejoin="round" />
      <path d="M1.5 4.5 8 7.5l6.5-3M8 7.5v7" strokeLinejoin="round" />
    </svg>
  );
}

function OrdersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 1.5h10v13l-2-1.3-1.5 1.3-1.5-1.3-1.5 1.3-1.5-1.3-2 1.3z" strokeLinejoin="round" />
      <path d="M5.5 5h5M5.5 8h5M5.5 11h3" strokeLinecap="round" />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      {open ? <path d="M5 5l10 10M15 5 5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
    </svg>
  );
}

const links = [
  { href: "/admin", label: "Dashboard", exact: true, Icon: DashboardIcon },
  { href: "/admin/products", label: "Products", Icon: ProductsIcon },
  { href: "/admin/orders", label: "Orders", Icon: OrdersIcon },
];

export function AdminSidebar({ signOutForm }: { signOutForm: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <aside className="flex shrink-0 flex-col border-b border-neutral-200 bg-white sm:sticky sm:top-0 sm:h-screen sm:w-56 sm:border-b-0 sm:border-r">
      <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4 sm:py-5">
        <div>
          <span className="text-sm font-semibold tracking-tight">Hair Couture</span>
          <div className="text-xs text-neutral-500">Admin</div>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="cursor-pointer rounded p-1.5 text-neutral-600 hover:bg-neutral-100 sm:hidden"
        >
          <HamburgerIcon open={open} />
        </button>
      </div>

      <div className={`flex-1 flex-col sm:flex ${open ? "flex" : "hidden"}`}>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {links.map(({ href, label, exact, Icon }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 rounded px-3 py-2 text-sm transition-colors ${
                  active ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                <Icon />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-neutral-200 p-3">{signOutForm}</div>
      </div>
    </aside>
  );
}
