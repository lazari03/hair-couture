// Singleton PrismaClient — Next.js dev hot-reload re-evaluates modules on
// every edit, so without caching on `global` you'd exhaust SQLite's
// connection pool in minutes. Standard Next.js + Prisma pattern.
// Prisma 7 requires an explicit driver adapter (no more implicit
// connection-string engine) — better-sqlite3 for local SQLite.
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
