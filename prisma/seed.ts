// Seed: real product data for all 3 brands, mixed provenance:
//  - Balmain: scraped from balmainhair.com's public Shopify /products.json
//    (2026-09-01) — names, prices, descriptions, images.
//  - Eloure: the brand's own official WooCommerce export (2026-09-02) for
//    name/price/ml/category — real RRPs, not scraped estimates — with
//    images matched by name to maisoneloure.com's live Shopify catalog
//    (3 bundle sets not yet listed live have no photo, falls back to the
//    category placeholder).
//  - eaude1974.com has no storefront API (distributor/reseller model, no
//    published D2C pricing) — names/descriptions/images scraped from its
//    product pages, prices estimated by category and flagged as such.
// Re-run anytime with `npm run db:seed` — it clears and re-inserts, so it's
// safe to run repeatedly in dev. Images already downloaded to
// public/assets/products/<brand>/*.
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import seedData from "./seed-data.json";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// Demo coupons — swap/extend via `npm run db:studio` until there's a
// dedicated admin CRUD for these (progress.md next-up).
const coupons = [
  { code: "WELCOME10", type: "percent", value: 10 },
  { code: "SAVE20", type: "percent", value: 20 },
];

// Demo orders — fictional customers (same placeholder-data convention as
// lib/data/shop.ts's mockAccount), 2 per brand, built from that brand's
// actual seeded products so the line items are real. Exists so /admin/orders
// isn't empty on a fresh clone; delete freely once real orders come in.
const demoCustomers = [
  { firstName: "Alexandra", lastName: "Meier", email: "a.meier@example.com", phone: "+41 79 000 00 00", address: "Bahnhofstrasse 21", city: "Zürich", postalCode: "8001", country: "Switzerland" },
  { firstName: "Lucas", lastName: "Bernard", email: "l.bernard@example.com", phone: "+33 6 12 34 56 78", address: "12 Rue de Rivoli", city: "Paris", postalCode: "75001", country: "France" },
  { firstName: "Sofia", lastName: "Rossi", email: "s.rossi@example.com", phone: "+39 340 123 4567", address: "Via Montenapoleone 8", city: "Milan", postalCode: "20121", country: "Italy" },
  { firstName: "Noah", lastName: "de Vries", email: "n.devries@example.com", phone: "+31 6 1234 5678", address: "Kalverstraat 45", city: "Amsterdam", postalCode: "1012", country: "Netherlands" },
  { firstName: "Emma", lastName: "Fischer", email: "e.fischer@example.com", phone: "+49 151 23456789", address: "Kurfürstendamm 100", city: "Berlin", postalCode: "10709", country: "Germany" },
  { firstName: "Oliver", lastName: "Smith", email: "o.smith@example.com", phone: "+44 7700 900123", address: "221 Baker Street", city: "London", postalCode: "NW1 6XE", country: "United Kingdom" },
];

async function seedOrders() {
  await prisma.order.deleteMany();
  let customerIndex = 0;

  for (const brand of ["balmain", "eloure", "eau-de-1974"]) {
    const products = await prisma.product.findMany({ where: { brand }, take: 6 });
    if (products.length === 0) continue;

    for (let i = 0; i < 2; i++) {
      const customer = demoCustomers[customerIndex % demoCustomers.length];
      customerIndex++;

      const lineCount = i === 0 ? 2 : 1;
      const lines = products.slice(i * 2, i * 2 + lineCount).length
        ? products.slice(i * 2, i * 2 + lineCount)
        : products.slice(0, lineCount);
      const items = lines.map((p) => ({
        productId: p.id,
        name: p.name,
        variant: "Standard",
        price: p.price,
        qty: i === 0 ? 1 : 2,
      }));
      const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
      const coupon = i === 0 ? coupons[customerIndex % coupons.length] : null;
      const discount = coupon ? subtotal * (coupon.value / 100) : 0;

      await prisma.order.create({
        data: {
          brand,
          ...customer,
          couponCode: coupon?.code ?? null,
          subtotal,
          discount,
          total: subtotal - discount,
          status: i === 0 ? "fulfilled" : "pending",
          items: { create: items },
        },
      });
    }
  }
  console.log("Seeded 6 demo orders (2 per brand).");
}

// No real stock counts exist yet (nothing to scrape — brand sites don't
// publish inventory). Badge "Limited" products start low, everything else
// gets a plausible default; correct via /admin/products once real numbers
// exist.
const productsWithStock = seedData.map((p) => ({
  ...p,
  stock: p.badge === "Limited" ? 6 : 30,
}));

async function main() {
  await prisma.product.deleteMany();
  await prisma.product.createMany({ data: productsWithStock });
  console.log(`Seeded ${seedData.length} products (real data from balmainhair.com, maisoneloure.com, eaude1974.com).`);

  await prisma.coupon.deleteMany();
  await prisma.coupon.createMany({ data: coupons });
  console.log(`Seeded ${coupons.length} coupons: ${coupons.map((c) => c.code).join(", ")}.`);

  await seedOrders();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
