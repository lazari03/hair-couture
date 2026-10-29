-- Restores the 7 Locks of Legacy accessories on databases that don't have
-- them (the live DB lost them after its first seed, so the collection page
-- was empty). Same data as prisma/seed-data.json: prices in ALL, official
-- descriptions, product images, in stock. Skipped wherever a Balmain
-- product with that name already exists, so it never duplicates.
INSERT INTO "Product" ("id", "brand", "name", "category", "price", "badge", "description", "imageUrl", "inStock", "createdAt", "updatedAt")
SELECT 'legacy-restore-1', 'balmain', 'Limited Edition Pinces à Cheveux Extra Small Midnight Black', '["Hair Accessories","New","Locks of Legacy"]', 7200, 'Limited', 'Handcrafted cellulose acetate Pince àCheveuxExtra Small in a refined Midnight Black shade, finished with the signature 18K gold-plated “B” logo for a timeless and elegant look.

• Strong, flexible and gentle on hair and scalp
• Extra small size ideal for fine sections and detail styling
• Lightweight and compact design
• Limited Edition

## Details
The Limited Edition Pinces à Cheveux Extra Small Midnight Black is handcrafted from high-quality cellulose acetate and designed in a deep midnight black shade with a subtle reflective pattern that catches the light from different angles. This layered effect adds depth and dimension to the compact design while maintaining a refined and timeless appearance.

Its extra small size makes it ideal for securing fine sections of hair or creating subtle, precise styling accents. The strong yet flexible material ensures a comfortable and secure hold, while remaining gentle on the hair and scalp. Lightweight and compact, the clip is perfect for effortless styling throughout the day. Finished with the signature 18K gold-plated “B” logo, it adds a polished and sophisticated touch to any hairstyle.', '/assets/products/balmain/limited-edition-pinces-a-cheveux-extra-small-midnight-black.jpg', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM "Product" WHERE "brand" = 'balmain' AND "name" = 'Limited Edition Pinces à Cheveux Extra Small Midnight Black');
INSERT INTO "Product" ("id", "brand", "name", "category", "price", "badge", "description", "imageUrl", "inStock", "createdAt", "updatedAt")
SELECT 'legacy-restore-2', 'balmain', 'Limited Edition Pinces à Cheveux Medium Midnight Black', '["Hair Accessories","New","Locks of Legacy"]', 11100, 'Limited', 'Handcrafted cellulose acetate Pince àCheveuxMedium in a refined Midnight Black shade, finished with the signature 18K gold-plated “B” logo for a timeless and elegant look.

• Strong, flexible and gentle on hair and scalp
• Medium size suitable for versatile styling
• Limited Edition

## Details
The Limited Edition Pinces à Cheveux Medium Midnight Black is handcrafted from high-quality cellulose acetate and designed in a deep midnight black shade with a subtle reflective pattern that catches the light from different angles. This layered effect adds depth and dimension to the clip while maintaining a refined and timeless appearance

The medium size offers versatility, making it suitable for a wide range of hairstyles, from effortless half-up looks to more structured updos. The strong yet flexible material ensures a comfortable and secure hold throughout the day, while remaining gentle on the hair and scalp. Finished with the signature 18K gold-plated “B” logo, the clip adds a polished and sophisticated accent to any hairstyle..', '/assets/products/balmain/limited-edition-pinces-a-cheveux-medium-midnight-black-c4-26.jpg', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM "Product" WHERE "brand" = 'balmain' AND "name" = 'Limited Edition Pinces à Cheveux Medium Midnight Black');
INSERT INTO "Product" ("id", "brand", "name", "category", "price", "badge", "description", "imageUrl", "inStock", "createdAt", "updatedAt")
SELECT 'legacy-restore-3', 'balmain', 'Limited Edition legacy Spa Brush', '["Styling Tools","New","Locks of Legacy"]', 9500, 'Limited', 'Luxury Spa Brush with 100% boar bristles designed to create a smooth, high-gloss finish. The unique bristle structure helps distribute natural oils from roots to ends for healthy-looking hair.

• Limited edition
• Ideal for all hair types, including thin / fine hair
• Creates a high gloss professional finish

## Details
The Limited Edition Legacy Spa Brush is crafted with 100% boar bristles to enhance the natural shine and condition of the hair. The bristle structure helps distribute the hair’s natural oils evenly from roots to ends, supporting a smooth and polished finish. Designed for daily use, the brush glides effortlessly through the hair while remaining gentle on both hair and scalp. This limited edition, in a striking transformative teal shade, brings a subtle touch of luxury to any hair care ritual.', '/assets/products/balmain/limited-edition-legacy-spa-brush-c4-26.jpg', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM "Product" WHERE "brand" = 'balmain' AND "name" = 'Limited Edition legacy Spa Brush');
INSERT INTO "Product" ("id", "brand", "name", "category", "price", "badge", "description", "imageUrl", "inStock", "createdAt", "updatedAt")
SELECT 'legacy-restore-4', 'balmain', 'Limited Edition Midnight Black Barrette', '["Hair Accessories","New","Locks of Legacy"]', 44000, 'Limited', 'Limited Edition Midnight Black Crown Barrette designed to add a bold and playful touch to half-up styles and modern updos.

• 18K gold-plated and Lead Glass
• Limited Edition
• Suitable for all hair types

## Details
The Limited Edition Midnight Black Barrette embodies timeless sophistication, featuring faceted lead glass that reflects light with a subtle, mysterious shimmer. Its deep midnight black lead glass brings refined contrast, adding a bold yet elegant statement to any hairstyle. Perfect for sleek ponytails, chic updos or to elevate everyday looks with a touch of modern luxury.', '/assets/products/balmain/limited-edition-midnight-black-barrette-c4-26.jpg', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM "Product" WHERE "brand" = 'balmain' AND "name" = 'Limited Edition Midnight Black Barrette');
INSERT INTO "Product" ("id", "brand", "name", "category", "price", "badge", "description", "imageUrl", "inStock", "createdAt", "updatedAt")
SELECT 'legacy-restore-5', 'balmain', 'Limited Edition Midnight Black Clip', '["Hair Accessories","New","Locks of Legacy"]', 29000, 'Limited', '18K gold-plated Limited Edition Midnight Black Clip featuring faceted lead glass stones in a feather-inspired design that reflects light from every angle.

• 18K gold-plated and Lead Glass
• Limited Edition
• Suitable for all hair types

## Details
The Limited Edition Midnight Black Clip is crafted with faceted lead glass stones that capture and reflect the light from every angle, creating a refined midnight black brilliance. The feather-inspired design enhances this effect, allowing the light to subtly move across the surface for a dynamic and elegant finish.

Its compact yet striking silhouette offers a versatile styling accent, adding depth, shine and a touch of modern luxury to any hairstyle. Designed to be both decorative and functional, the clip provides a secure hold while elevating the overall look with understated sophistication.', '/assets/products/balmain/limited-edition-midnight-black-clip-c4-26.jpg', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM "Product" WHERE "brand" = 'balmain' AND "name" = 'Limited Edition Midnight Black Clip');
INSERT INTO "Product" ("id", "brand", "name", "category", "price", "badge", "description", "imageUrl", "inStock", "createdAt", "updatedAt")
SELECT 'legacy-restore-6', 'balmain', 'Limited Edition Midnight Black Headband', '["Hair Accessories","New","Locks of Legacy"]', 65000, 'Limited', 'Handcrafted 18K gold-plated headband with polished lead glass stones, adding a sophisticated statement to any hairstyle.

• 18K gold-plated and Lead Glass
• Limited Edition
• Suitable for all hair types

## Details
A sophisticated statement hair accessory. The small, handcrafted 18K gold-plated headband features polished lead glass stones that beautifully catch and reflect the light. Inspired by Midnight Black, it embodies modern elegance and timeless luxury. Includes a polishing cloth to keep the accessory in perfect condition.', '/assets/products/balmain/limited-edition-midnight-black-headband-c4-26.jpg', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM "Product" WHERE "brand" = 'balmain' AND "name" = 'Limited Edition Midnight Black Headband');
INSERT INTO "Product" ("id", "brand", "name", "category", "price", "badge", "description", "imageUrl", "inStock", "createdAt", "updatedAt")
SELECT 'legacy-restore-7', 'balmain', 'Limited Edition Midnight Black Slides Pins', '["Hair Accessories","New","Locks of Legacy"]', 26000, 'Limited', 'Set oftwo 18K gold-plated slide pins with faceted lead glass stones, adding a refined and versatile accent to any hairstyle.

• 18K gold-plated and Lead Glass
• Limited Edition
• Suitable for all hair types

## Details
The Limited Edition Midnight Black Duo Slide Pins consist of a refined set of two 18K gold-plated hair pins, each adorned with faceted lead glass stones and the signature Balmain “B” logo. Designed to catch and reflect the light, the pins add a subtle yet sophisticated accent to any hairstyle.

The duo can be worn together for a more defined look or separately for a minimal and understated finish. Lightweight and easy to style, the pins provide a secure hold while enhancing both daily and evening hairstyles with a touch of modern elegance.', '/assets/products/balmain/limited-edition-midnight-black-slides-c4-26.jpg', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM "Product" WHERE "brand" = 'balmain' AND "name" = 'Limited Edition Midnight Black Slides Pins');
