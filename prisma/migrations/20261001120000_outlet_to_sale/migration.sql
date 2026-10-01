-- Outlet is no longer a category: discounted stock lives under Sale only.
-- Product.category is a JSON array string (or a bare name on older rows);
-- swap "Outlet" for "Sale" in place (a row ending up with "Sale" twice is
-- harmless: parseProductCategories dedupes on read).
UPDATE "Product" SET "category" = REPLACE("category", '"Outlet"', '"Sale"') WHERE "category" LIKE '%"Outlet"%';
UPDATE "Product" SET "category" = 'Sale' WHERE "category" = 'Outlet';
