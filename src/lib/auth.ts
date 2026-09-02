// Single-admin auth (skills/auth.md): one credentials login checked against
// env vars, session in Auth.js's httpOnly cookie — no user table, no
// localStorage token. Swap for a real User table + multiple admins later
// without touching how /admin checks the session.
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { isRateLimited, recordFailedAttempt, clearAttempts } from "@/lib/rate-limit";

class TooManyAttemptsError extends CredentialsSignin {
  code = "too_many_attempts";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email;
        const password = credentials?.password;
        if (typeof email !== "string" || typeof password !== "string") return null;

        // 5 failed attempts / 15 min per email — the login form has no
        // brute-force protection otherwise, which is not acceptable for
        // something reachable on the public internet.
        const rateLimitKey = email.toLowerCase();
        if (isRateLimited(rateLimitKey)) throw new TooManyAttemptsError();

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminHashB64 = process.env.ADMIN_PASSWORD_HASH_B64;
        if (!adminEmail || !adminHashB64) return null;
        // Base64-encoded in .env — the raw hash's $-sequences get corrupted
        // by Next.js's env-var interpolation otherwise (see .env comments).
        const adminHash = Buffer.from(adminHashB64, "base64").toString("utf8");

        if (email.toLowerCase() !== adminEmail.toLowerCase()) {
          recordFailedAttempt(rateLimitKey);
          return null;
        }
        const valid = await bcrypt.compare(password, adminHash);
        if (!valid) {
          recordFailedAttempt(rateLimitKey);
          return null;
        }

        clearAttempts(rateLimitKey);
        return { id: "admin", email: adminEmail, name: "Admin" };
      },
    }),
  ],
});
