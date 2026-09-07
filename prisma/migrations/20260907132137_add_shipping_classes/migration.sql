-- CreateTable
CREATE TABLE "ShippingClass" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "fee" REAL NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brand" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "couponCode" TEXT,
    "subtotal" REAL NOT NULL,
    "discount" REAL NOT NULL DEFAULT 0,
    "total" REAL NOT NULL,
    "shippingClassId" TEXT,
    "shippingClassName" TEXT NOT NULL DEFAULT '',
    "shippingFee" REAL NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Order" ("address", "brand", "city", "country", "couponCode", "createdAt", "discount", "email", "firstName", "id", "lastName", "phone", "postalCode", "status", "subtotal", "total") SELECT "address", "brand", "city", "country", "couponCode", "createdAt", "discount", "email", "firstName", "id", "lastName", "phone", "postalCode", "status", "subtotal", "total" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE INDEX "Order_brand_idx" ON "Order"("brand");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- Default shipping classes, so existing (already-deployed, non-empty)
-- databases get these on `prisma migrate deploy` too — seed.ts only runs
-- against a genuinely fresh/empty volume (docker-entrypoint.sh), which
-- production is not.
INSERT INTO "ShippingClass" ("id", "name", "fee", "active", "sortOrder", "updatedAt") VALUES
  ('shipclass-tirana', 'Tirana', 250, true, 0, CURRENT_TIMESTAMP),
  ('shipclass-other-al', 'Other Cities in Albania', 350, true, 1, CURRENT_TIMESTAMP);

