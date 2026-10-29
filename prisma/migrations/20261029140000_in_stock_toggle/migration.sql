-- Stock is an on/off switch now, not a unit count: products with stock left
-- stay in stock, sold-out ones (stock 0) start out of stock. The per-cart
-- stock reservations only existed to share out a unit count, so they go too.
ALTER TABLE "Product" ADD COLUMN "inStock" BOOLEAN NOT NULL DEFAULT true;
UPDATE "Product" SET "inStock" = CASE WHEN "stock" > 0 THEN true ELSE false END;
ALTER TABLE "Product" DROP COLUMN "stock";
DROP TABLE "StockReservation";
