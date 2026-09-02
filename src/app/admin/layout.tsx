import { Geist, Geist_Mono } from "next/font/google";
import { auth, signOut } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = { title: "Hair Couture Admin" };

// /admin is a separate top-level segment from [locale] (not localized, no
// next-intl) — there's no shared src/app/layout.tsx, so this is the actual
// root layout for everything under /admin and has to own <html>/<body>
// itself, same as [locale]/layout.tsx does for the storefront.
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  async function logout() {
    "use server";
    await signOut({ redirectTo: "/admin/login" });
  }

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full">
        {!session ? (
          // /admin/login renders its own minimal page — middleware already
          // redirects any other unauthenticated request to it before it
          // reaches here.
          children
        ) : (
          <div className="flex min-h-screen flex-col bg-neutral-50 sm:flex-row">
            {/* sticky + h-screen (not min-h-screen) so the sidebar tracks the
                viewport, not the tallest sibling — a long product/order list
                no longer stretches it. Collapsed behind a hamburger on
                mobile (AdminSidebar's own state), always open on desktop. */}
            <AdminSidebar
              signOutForm={
                <form action={logout}>
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded px-3 py-2 text-left text-sm text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
                  >
                    Sign out
                  </button>
                </form>
              }
            />
            <main className="min-w-0 flex-1 overflow-x-auto px-4 py-6 sm:px-8 sm:py-8">
              <div className="mx-auto max-w-6xl">{children}</div>
            </main>
          </div>
        )}
      </body>
    </html>
  );
}
