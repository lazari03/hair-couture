-- Locks of Legacy is only the 7 limited-edition Midnight Black / Legacy
-- accessories; the haircare products shown further down balmainhair.com's
-- collection page aren't part of it. Removes the tag the previous migration
-- added to everything else (it was appended last, as ',"Locks of Legacy"').
UPDATE "Product"
SET "category" = REPLACE("category", ',"Locks of Legacy"', '')
WHERE "brand" = 'balmain'
  AND "category" LIKE '%,"Locks of Legacy"%'
  AND "name" NOT IN (
    'Limited Edition Pinces à Cheveux Extra Small Midnight Black',
    'Limited Edition Pinces à Cheveux Medium Midnight Black',
    'Limited Edition legacy Spa Brush',
    'Limited Edition Midnight Black Barrette',
    'Limited Edition Midnight Black Clip',
    'Limited Edition Midnight Black Headband',
    'Limited Edition Midnight Black Slides Pins'
  );
