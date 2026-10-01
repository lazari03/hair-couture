-- Follow-up to align_official_categories for databases that ran the old
-- 20260929120000_fix_product_copy migration (since removed from the repo),
-- which corrected typos in product names (Profesional -> Professional,
-- Hair Parfume -> Hair Perfume, ...). Same updates, matched on the corrected
-- names; a no-op where the names were never changed. Still only rows on their
-- original seeded category.

UPDATE "Product" SET "category" = '["Hair Care","Gifts"]' WHERE "brand" = 'balmain' AND "name" = 'Hair Perfume Vetiver 15ml' AND "category" = 'Hair Care';
UPDATE "Product" SET "category" = '["Hair Care","Bestsellers"]' WHERE "brand" = 'balmain' AND "name" = 'Homme Hair Perfume' AND "category" = 'Hair Care';
