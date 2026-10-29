-- Customer-facing order numbers. Existing orders are numbered in the order
-- they were placed, starting at #1001; new ones get max + 1 (createOrder).
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
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
INSERT INTO "new_Order" ("number", "address", "brand", "city", "country", "couponCode", "createdAt", "discount", "email", "firstName", "id", "lastName", "phone", "postalCode", "shippingClassId", "shippingClassName", "shippingFee", "status", "subtotal", "total") SELECT 1000 + ROW_NUMBER() OVER (ORDER BY "createdAt", "id"), "address", "brand", "city", "country", "couponCode", "createdAt", "discount", "email", "firstName", "id", "lastName", "phone", "postalCode", "shippingClassId", "shippingClassName", "shippingFee", "status", "subtotal", "total" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_number_key" ON "Order"("number");
CREATE INDEX "Order_brand_idx" ON "Order"("brand");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

