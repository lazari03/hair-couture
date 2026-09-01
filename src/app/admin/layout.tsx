import Link from "next/link";
import { auth, signOut } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // /admin/login renders its own minimal page — this shell is only for the
  // authenticated area (middleware already redirects unauthenticated
  // requests to /admin/login before they reach here).
  if (!session) return children;

  async function logout() {
    "use server";
    await signOut({ redirectTo: "/admin/login" });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center gap-6">
          <span className="text-sm font-semibold tracking-tight">Hair Couture Admin</span>
          <nav className="flex items-center gap-4 text-sm text-neutral-600">
            <Link href="/admin/products" className="hover:text-neutral-900">
              Products
            </Link>
          </nav>
        </div>
        <form action={logout}>
          <button type="submit" className="cursor-pointer text-sm text-neutral-500 hover:text-neutral-900">
            Sign out
          </button>
        </form>
      </header>
      <main className="flex-1 px-6 py-8">{children}</main>
    </div>
  );
}
