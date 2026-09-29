-- Data-only: fix product name typos and a leaked "short description" label
-- in the imported catalog. Targeted REPLACEs, so admin-edited rows that no
-- longer contain the typo are left untouched.
-- Descriptions that only repeat the (pre-fix) name carry no copy; drop them first.
UPDATE "Product" SET "description" = NULL WHERE LOWER(TRIM("description")) = LOWER(TRIM("name"));
UPDATE "Product" SET "name" = REPLACE("name", 'Profesional ', 'Professional ') WHERE "name" LIKE '%Profesional %';
UPDATE "Product" SET "name" = REPLACE("name", 'Acvitating', 'Activating') WHERE "name" LIKE '%Acvitating%';
UPDATE "Product" SET "name" = REPLACE("name", 'Printems Leaf', 'Printemps Leaf') WHERE "name" LIKE '%Printems Leaf%';
UPDATE "Product" SET "name" = REPLACE("name", 'Cardamon', 'Cardamom') WHERE "name" LIKE '%Cardamon%';
UPDATE "Product" SET "name" = REPLACE("name", 'Hair Parfume', 'Hair Perfume') WHERE "name" LIKE '%Hair Parfume%';
UPDATE "Product" SET "name" = REPLACE("name", '  ', ' ') WHERE "name" LIKE '%  %';
UPDATE "Product" SET "description" = TRIM(SUBSTR("description", INSTR("description", 'Pershkrim i shkurter:') + LENGTH('Pershkrim i shkurter:')))
  WHERE "description" LIKE '%Pershkrim i shkurter:%';
