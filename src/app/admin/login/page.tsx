import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  async function login(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: "/admin/products",
      });
    } catch (e) {
      if (e instanceof AuthError) redirect("/admin/login?error=1");
      throw e;
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">Admin login</h1>
      <p className="mb-7 text-sm text-neutral-500">Hair Couture — manage products</p>
      <form action={login} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm">
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="username"
            className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          Password
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="min-h-11 border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-900"
          />
        </label>
        {error && <p className="text-sm text-red-600">Invalid email or password.</p>}
        <button
          type="submit"
          className="mt-2 min-h-11 cursor-pointer bg-neutral-900 text-sm font-medium text-white hover:opacity-90"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
