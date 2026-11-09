import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { brands } from "@/lib/brands";
import { parseProductCategories } from "@/lib/product-categories";

// GET /api/admin/products/export[?brand=<slug>] → CSV download of every
// product (or one brand's). Admin only — the proxy skips /api, so the
// session is checked here, same as the upload route.
export async function GET(req: Request) {
  const session = await auth();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const brandParam = new URL(req.url).searchParams.get("brand");
  const brand = brandParam && brands.some((b) => b.slug === brandParam) ? brandParam : null;

  const products = await prisma.product.findMany({
    where: brand ? { brand } : undefined,
    orderBy: [{ brand: "asc" }, { createdAt: "asc" }],
  });

  const header = ["id", "brand", "name", "categories", "price", "inStock", "badge", "description", "imageUrl", "createdAt", "updatedAt"];
  const rows = products.map((p) => [
    p.id,
    p.brand,
    p.name,
    parseProductCategories(p.category).join("; "),
    p.price,
    p.inStock ? "yes" : "no",
    p.badge,
    p.description,
    p.imageUrl,
    p.createdAt.toISOString(),
    p.updatedAt.toISOString(),
  ]);

  // BOM so Excel opens UTF-8 (ë, ç) correctly; CRLF per RFC 4180.
  const csv = "﻿" + [header, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n") + "\r\n";
  const date = new Date().toISOString().slice(0, 10);
  const filename = `products-${brand ?? "all"}-${date}.csv`;

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  let s = String(value);
  // Neutralise spreadsheet formula injection (=, +, -, @ at cell start).
  if (/^[=+\-@\t\r]/.test(s) && typeof value === "string") s = `'${s}`;
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
