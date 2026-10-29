-- balmainhair.com's "Locks of Legacy" campaign collection (fetched
-- 2026-10-29): the 7 limited-edition Midnight Black / Legacy accessories plus
-- the haircare range it features. Added as a category so the Balmain hero's
-- "Discover the legacy" button can open it (/balmain/shop?category=...).
-- Category is a JSON array (or a bare name on older rows); appended, never
-- replaced, and skipped where it's already there.
UPDATE "Product"
SET "category" = CASE
  WHEN "category" LIKE '[%' THEN json_insert("category", '$[#]', 'Locks of Legacy')
  ELSE json_array("category", 'Locks of Legacy')
END
WHERE "brand" = 'balmain'
  AND "category" NOT LIKE '%"Locks of Legacy"%'
  AND "name" IN (
    'Limited Edition Pinces à Cheveux Extra Small Midnight Black',
    'Limited Edition Pinces à Cheveux Medium Midnight Black',
    'Limited Edition legacy Spa Brush',
    'Limited Edition Midnight Black Barrette',
    'Limited Edition Midnight Black Clip',
    'Limited Edition Midnight Black Headband',
    'Limited Edition Midnight Black Slides Pins',
    'Leave-In Conditioner',
    'Texturizing Salt Spray',
    'Matt Paste',
    'Moisturizing Styling Cream',
    'Styling Gel Maximum Hold',
    'Volume Conditioner',
    'Sun Protection Spray',
    'Illuminating Mask Silver Pearl 200ml',
    'Texturizing Volume Spray',
    'Couleurs Couture Conditioner',
    'Silk Perfume 200ml',
    'Thermal Protection Spray',
    'Session Spray Strong',
    'Ash Toner',
    'Argan Moisturizing Elixir',
    'Dry Shampoo',
    'Revitalizing Shampoo',
    'Moisturizing Conditioner',
    '5 Weeks Enriching Hair Treatment',
    'Overnight Repair Serum',
    'Moisturizing Shampoo'
  );
