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

async function main() {
  await prisma.product.deleteMany();
  await prisma.product.createMany({ data: seedData });
  console.log(`Seeded ${seedData.length} products (real data from balmainhair.com, maisoneloure.com, eaude1974.com).`);

  await prisma.coupon.deleteMany();
  await prisma.coupon.createMany({ data: coupons });
  console.log(`Seeded ${coupons.length} coupons: ${coupons.map((c) => c.code).join(", ")}.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
