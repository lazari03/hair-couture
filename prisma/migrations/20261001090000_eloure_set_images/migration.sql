-- Official photos (maisoneloure.com) for the two Éloure sets that were showing
-- the category placeholder. Only fills rows that still have no image, so an
-- image set in the admin is never overwritten.
UPDATE "Product" SET "imageUrl" = '/assets/products/eloure/the-radiant-care-collection.jpg' WHERE "brand" = 'eloure' AND "name" = 'The Radiant Care Collection' AND ("imageUrl" IS NULL OR "imageUrl" = '');
UPDATE "Product" SET "imageUrl" = '/assets/products/eloure/the-volume-glow-collection.jpg' WHERE "brand" = 'eloure' AND "name" = 'The Volume & Glow Collection' AND ("imageUrl" IS NULL OR "imageUrl" = '');
