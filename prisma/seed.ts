// One-time seed: the products that used to be hardcoded in lib/data/shop.ts,
// now rows in the database. Re-run anytime with `npx prisma db seed` — it
// clears and re-inserts, so it's safe to run repeatedly in dev.
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const products = [
  // balmain
  { brand: "balmain", name: "Double Hair Set 40cm", category: "Hair Accessories", price: 295, badge: "New" },
  { brand: "balmain", name: "Elegance Clip-In Weft", category: "Hair Accessories", price: 340, badge: null },
  { brand: "balmain", name: "Backstage Volume Spray", category: "Hair Care", price: 38, badge: null },
  { brand: "balmain", name: "Silk Perfume Shampoo", category: "Hair Care", price: 42, badge: null },
  { brand: "balmain", name: "Golden Styling Brush", category: "Styling Tools", price: 89, badge: "Limited" },
  { brand: "balmain", name: "Couture Curling Wand", category: "Styling Tools", price: 210, badge: null },
  { brand: "balmain", name: "Fill-In Extensions 55cm", category: "Hair Accessories", price: 420, badge: null },
  { brand: "balmain", name: "Leave-In Conditioning Mist", category: "Hair Care", price: 34, badge: null },
  // eloure
  { brand: "eloure", name: "Everyday Cream Shampoo", category: "Care Collection", price: 24, badge: null },
  { brand: "eloure", name: "Slip Conditioner 300ml", category: "Care Collection", price: 26, badge: null },
  { brand: "eloure", name: "Refill Pouch — Shampoo", category: "Care Collection", price: 16, badge: "Refill" },
  { brand: "eloure", name: "Scalp Serum Nº2", category: "Treatments & Sets", price: 32, badge: "New" },
  { brand: "eloure", name: "Soft Hold Cream", category: "Styling Collection", price: 21, badge: null },
  { brand: "eloure", name: "Weekly Repair Mask", category: "Treatments & Sets", price: 29, badge: null },
  { brand: "eloure", name: "Refill Pouch — Conditioner", category: "Care Collection", price: 18, badge: "Refill" },
  { brand: "eloure", name: "Wide Tooth Comb", category: "Styling Collection", price: 14, badge: null },
  // eau-de-1974
  { brand: "eau-de-1974", name: "Nº1974 Eau de Parfum 50ml", category: "Sensorial Beauty", price: 145, badge: null },
  { brand: "eau-de-1974", name: "Vetiver Blanc 50ml", category: "Sensorial Beauty", price: 145, badge: "New" },
  { brand: "eau-de-1974", name: "Discovery Set — Six Vials", category: "Sensorial Beauty", price: 45, badge: null },
  { brand: "eau-de-1974", name: "Ambre Papier 100ml", category: "Sensorial Beauty", price: 195, badge: null },
  { brand: "eau-de-1974", name: "Archive Candle 220g", category: "Sensorial Lifestyle", price: 68, badge: null },
  { brand: "eau-de-1974", name: "Room Spray — Fig Leaf", category: "Sensorial Lifestyle", price: 54, badge: null },
  { brand: "eau-de-1974", name: "Néroli 74 100ml", category: "Sensorial Beauty", price: 195, badge: "Limited" },
  { brand: "eau-de-1974", name: "Travel Refill 10ml", category: "Sensorial Beauty", price: 38, badge: null },
  { brand: "eau-de-1974", name: "Sensorial Shine Oil 100ml", category: "Sensorial Hair Care", price: 58, badge: null },
];

async function main() {
  await prisma.product.deleteMany();
  await prisma.product.createMany({ data: products });
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
