-- Official product copy from each brand's own site, fetched 2026-10-01:
-- balmainhair.com (+ balmainhaircouture.com for items only on the US store),
-- maisoneloure.com and eaude1974.com. Plain text with light structure the
-- product page renders: "## Heading" lines and "• " bullet lists.
-- Matched on the seeded name and on its typo-corrected form (Profesional ->
-- Professional, Hair Parfume -> Hair Perfume, ...) that the old
-- 20260929120000_fix_product_copy migration applied on some databases.
-- Products not on any official site keep their current copy, minus the
-- leaked "Pershkrim i shkurter:" label and descriptions that only repeat
-- the product name.
UPDATE "Product" SET "description" = TRIM(SUBSTR("description", INSTR("description", 'Pershkrim i shkurter:') + LENGTH('Pershkrim i shkurter:'))) WHERE "description" LIKE '%Pershkrim i shkurter:%';
UPDATE "Product" SET "description" = NULL WHERE LOWER(TRIM("description")) = LOWER(TRIM("name"));

UPDATE "Product" SET "description" = 'Intense nourishing shampoo that provides hydration and revitalization for pure and healthy hair. Gently cleanses scalp and hair while adding moisture. Contains UV-Filters to shield the hair against UV radiation and enhances colour retention.

The water-based formula easily spreads the shampoo through the hair and does not weigh the hair down after rinsing. The active ingredient, Provitamin B5 helps to balance hair moisture levels, supports hair elasticity and flexibility. It helps to calm irritated and sensitive scalp, softens the hair and creates brilliant shine. The extra boost of B vitamins thickens the hair and stimulates hair growth.' WHERE "brand" = 'balmain' AND "name" IN ('Moisturizing Shampoo');
UPDATE "Product" SET "description" = 'Highly nourishing conditioner for natural or colour-treated hair. Soothes, protects, detangles and revitalizes the hair. UV-Filters protect the hair against UV radiation and improve colour retention. Gives shine and manageability.

• Nutrition for healthy looking hair
• Creates shiny, soft and smooth hair
• Eliminates frizz

## Details
Lightweight conditioner enriched with pure organic Argan oil to smoothen the hair. Argania Spinosa Kernel Oil, better known as Argan Oil, originates from Morocco and comes from argan tree fruits. It absorbs easily, adds shine and protects damaged hair. The creamy formula nourishes the hair strands and leaves a lightweight touch. Results in soft manageable hair to ensure effortless detangling while brushing to avoid breakage of the hair. Infused with Pro-Vitamin B5 to improve moisture retention and hair elasticity, it softens the hair and creates brilliant shine. Gives the hair the ultimate vitamin boost, which thickens the hair and stimulates hair growth.

## Ingredients
Aqua,Cetearyl Alcohol, Behentrimonium Chloride, Glycerin, Isopromethyl Silsesquioxane Copolymer, Stearamidopropyl Dimethylamine, Argania Spinosa Kernel Oil, Silk Amino Acids, Panthenol, Polyquaternium-53, Dimethylpabamidopropyl Lauryldimonium Tosylate, Ethylhexyl Methoxycinnamate, Polyquaternium-10, Trideceth-5, Parfum, Hydroxyethylcellulose, Phenoxyethanol, Ethylglycerin, Lactic Acid.' WHERE "brand" = 'balmain' AND "name" IN ('Moisturizing Conditioner');
UPDATE "Product" SET "description" = 'Smoothing shampoo that cleanses the scalp and hair whilst lifting flat, fine and thin hair. Gently removes access oils and sebum that normally weighs the hair down. Strengthens the hair fiber to enhance texture and body. Designed to create ultra-voluminous hair. The advanced formula leaves the hair cuticles open and strengthens each strand, which results in fuller and thicker looking hair. The rich blend of oils and amino acids protects the hair against UV-rays to prevent damage and split ends. Leaves the hair moisturized, soft and with a natural glow.' WHERE "brand" = 'balmain' AND "name" IN ('Volume Shampoo');
UPDATE "Product" SET "description" = 'A gentle, lightweight conditioner. Moisturizes and adds volume to thin, fine hair. Nourishes and repairs from within for deep strength. Creates bouncy, shiny, and fuller-looking hair.

• Daily conditioner
• Adds volume without adding weight
• Enhances hair texture

## Details
A body-building moisturizer that lifts thin, fine hair. Enhances natural shine and leaves the hair detangled and frizz-free. Replenishes structure from root to tip, restoring texture and body. Formulated with Silk Protein and Argan Oil to support optimal moisture retention in each hair cell, resulting in stronger, healthier-looking hair. Protects from UV rays to prevent damage and maintain a vibrant appearance.

## Ingredients
Aqua, Cetearyl Alcohol, Glyceryl Stearate, Stearamidopropyl Dimethylamine, Argania Spinosa Kernel Oil, Silk Amino Acids, Panthenol, Dimethylpabamidopropyl Lauryldimonium Tosylate, Propylene Glycol Stearate, Sodium Cocoyl Amino Acids, Potassium Dimethicone PEG-7 Panthenyl Phosphate, Behenoyl PG-Trimonium Chloride, Quaternium-80, Amodimethicone, C11-15 Pareth-7, Laureth-9, Glycerin, Trideceth-12, Ethylhexyl Methoxycinnamate, Ceteareth-20, Phenoxyethanol, Ethylhexylglycerin, Polyquaternium-37, Propylene Glycol Dicaprylate/Dicaprate, PPG-1 Trideceth-6, Parfum, Citric Acid.' WHERE "brand" = 'balmain' AND "name" IN ('Volume Conditioner');
UPDATE "Product" SET "description" = 'An intense replenishing treatment that strengthens and rebuilds the hair from within. The enhanced formula includes a fine selection of vitamins E, F and P and Cashmere Protein. The combination of these vitamins result in smooth and soft hair. Vitamin E boosts the hair and revitalizes the strands. Vitamin F cherishes the scalp; it acts as a conditioner for the skin. Vitamin P works as a repairing agent to restore dry and damaged hair. Cashmere proteins gives a luxuriously soft feeling and makes hair stronger since cashmere proteins support the natural protein in the hair. Cashmere is fine in texture yet strong and lightweight; it leaves the hair bouncy and manageable.

Ingredients

Aqua/Water, Sodium Coceth Sulfate, Cocamidopropyl, Betaine, Peg-200 Hydrogenated Glyceryl Palmate, Peg/Ppg-14/4 Dimethicone, Plyquaternium-7, Distearyl Ether, Dicaprylyl Ether, Sodium Laureth Sulfate, Guar Hydroxypropyltrimonium Chloride, Plyquaternium-10, Xanthan Gum, Peg-7 Glyceryl Cocoate, Peg-4 Distearyl Ether, Lactobacillus/Wasabia Japonica Root Ferment Extract, Lactobacillus/Phoenix Dactylifera Fruit Ferment Extract, Hamamelis Virginiana Leaf Extract/Witch Hazel Leaf Extract, Rice Amino Acids, Hydrolyzed Wool, Glycerin, Sorbitol, Lecithin, Retinyl Palmitate, Panthenol, Silanetriol Melaninate, Polyperfluoroethoxymethoxy Difluoroethyl Peg Phosphate, Superoxide Dismutase, Tocopheryl Acetate, Glyceryl Linoleate, Glyceryl Linoleate Diatomaceous Earth, Sodium Chloride, Citric Acid, Sodium Benzoate, Ethylhexylglycerin, Phenoxyethanol, Parfum/Fragrance.' WHERE "brand" = 'balmain' AND "name" IN ('Revitalizing Shampoo');
UPDATE "Product" SET "description" = 'A rich conditioner that locks in moisture to strengthen the hair strands, protects against environmental damages and replenishes lost radiance. Gives intense hydration to the hair and eliminates flyaways. Infused with Vitamin E, F and P, Cashmere and AC Colorplex. The ultimate ingredients for shiny, healthy and lustrous locks. Vitamin E, F and P gives the hair an ultimate energy boost. The vitamins protect the scalp and repairs the hair from root to end. The Cashmere protein gives the hair a luxurious and soft feeling and makes the hair manageable. AC Colorplex is a complex made of melanin and the root of the Japanese Wasabi. It contains an anti-fading agent that protects the hair from UV-rays and prevents the hair from fading or altering colour.

Ingredients

Petrolatum, Kaolin, Polysorbate 20, Cera Flava, Parfum, Argania Spinosa Kernel Oil, Silk Amino Acids, Panthenol, Hydrogenated Olive Oil, Olive Oil (Olea Europaea), Olive Oil Unsaponifiables.' WHERE "brand" = 'balmain' AND "name" IN ('Revitalizing Conditioner');
UPDATE "Product" SET "description" = 'Specially designed to restore dull, dry and damaged hair. Revitalizes from the inside and gives the hair the nutrition it craves. The ultimate energy boost to deeply strengthen and rebuild the hair fiber. Argania Spinosa Kernel Oil, better known as Argan Oil, absorbs into the hair easily and revitalizes chemically treated, damaged and dry hair. Vitamin E, F and P revives the hair, protects sensitive scalp and support rebuilding the hair fiber deeply from within. Cashmere protein supports the natural protein in hair and leaves the hair bouncy and manageable. Creates ultimate soft yet strong hair. AC Colorplex, a mixture of melanin and the root of Japanese wasabi, protects the hair from UV-rays and stimulates colour retention. The perfect combination of ingredients for revitalized and lustrous locks.' WHERE "brand" = 'balmain' AND "name" IN ('Revitalizing Mask');
UPDATE "Product" SET "description" = 'Restoring and gently cleansing shampoo for coloured, damaged and over-processed hair. Enriched with a unique blend of Argan Elixir, Silk and Cashmere protein to deeply nourish and strengthen the hair. UV-shields enhance colour longevity.

• Deeply nourishes
• Colour protection
• Repairing agent

## Details
The Balmain Couleurs Couture Shampoo is the ultimate restoring treatment for colour-treated, damaged and over processed hair. It enhances colour longevity, repairs, strengthens, and revives the hair deeply from within. Healthy and repaired hair increases colour longevity. Long-term benefits arise from the carefully selected key ingredients Argan Elixir, Silk-, and Cashmere protein are enhanced with Quinoa Seed- and Cocos Oil. This unique combination of ingredients will deeply strengthen and moisturizes the hair. Leaves the hair incredibly soft and makes it easy to detangle.

## Ingredients
Aqua, Sodium Laureth Sulfate, Cocamidopropyl, Hydroxysultaine, Cocamidopropyl Betaine, Polysorbate 20, Glycerin, Sodium Lauroyl Methyl Isethionate, Glycol Distearate, Betaine, PEG-40 Hydrogenated Castor Oil, Hydrolyzed Keratin, Silk Amino Acids, Argania Spinosa Kernel Oil, Helianthus Annuus Seed Oil, Macadamia Ternifolia Seed Oil, Cocos Nucifera Oil, Glycine Soja Oil, Gardenia Tahitensis Flower Extract, Rosmarinus Officinalis Leaf Extract, Chenopodium Quinoa Seed Extract, Tocopherol, Aloe Barbadensis Leaf Juice, Sodium Hyaluronate, Tocopheryl Acetate, Panthenol, Pantolactone, Allantoin, Guar Hydroxypropyltrimonium Chloride, Polyquaternium-53, Amodimethicone/Morpholinomethyl Silsesquioxane, Trideceth-5, Dimethylpabamidopropyl Lauryldimonium Tosylate, Benzophenone-4, Parfum, Phenoxyethanol, Sodium Benzoate, Benzoic Acid, Acrylates Crosspolymer-4, PEG/PPG-15/15 Dimethicone, Iodopropynyl Butylcarbamate, Trisodium Ethylenediamine Disuccinate, PEG-150 Pentaerythrityl Tetrastearate, PEG-6 Caprylic/Capric Glycerides, Sodium Chloride, Sodium Hydroxide, Lactic Acid, Laureth 4, Sorbic Acid, Dimethicone, PCA Dimethicone Crosspolymer, Butylene Glycol, Caprylyl Clycol, Hexylene Glycol, Citric Acid.' WHERE "brand" = 'balmain' AND "name" IN ('Couleurs Couture Shampoo');
UPDATE "Product" SET "description" = 'Intense moisturizing conditioner for coloured, damaged and over-processed hair. Nourishes, detangles and strengthens the hair deeply from within. Enriched with a unique blend of Argan Elixir, Silk and Cashmere protein for soft and shiny hair.

• Deeply nourishes
• Promotes colour longevity
• Smooth and manageable strands

## Details
The Couleurs Couture Conditioner of Balmain Hair is perfect for colour-treated, damaged or over processed hair. The carefully selected ingredients Argan Elixir, Silk- and Cashmere protein are enhanced with Quinoa Seed- and Cocos Oil. They repair and strengthen the hair deeply from within. The advanced formula moisturizes the hair and leaves the hair smooth and without frizz. Cashmere Protein (Hydrolyzed Keratin) is a hair-identical protein. It strengthens the cohesion of hair and improves the ease of combing through the hair while avoiding breakage.

## Ingredients
Aqua, Cetyl Alcohol, Glycerin, Behentrimonium Chloride, Betaine, Ethylhexyl Palmitate, Hydrolyzed Keratin, Silk Amino Acids, Argania Spinosa Kernel Oil, Helianthus Annuus Seed Oil, Macadamia Ternifolia Seed Oil, Cocos Nucifera Oil, Glycine Soja Oil, Gardenia Tahitensis Flower Extract, Rosmarinus Officinalis Leaf Extract, Chenopodium Quinoa Seed Extract, Tocopherol, Aloe Barbadensis Leaf Juice, Sodium Hyaluronate, Tocopheryl Acetate, Panthenol, Silicone Quaternium-16, Isopropyl Alcohol, Undeceth-11, Butyloctanol, Undeceth-5, Iodopropynyl Butylcarbamate, Polyquaternium-53, Dipropylene Glycol, Polysilicone-19, Ethylhexyl Methoxycinnamate, Hydroxyethylcellulose, Phenoxyethanol, Ethylhexylglycerin, Lactic Acid, Benzoic Acid, Sodium Benzoate, Parfum, Pantolactone, Allantoin, Citric Acid, Sorbic Acid.' WHERE "brand" = 'balmain' AND "name" IN ('Couleurs Couture Conditioner');
UPDATE "Product" SET "description" = 'The unique Couleurs Couture colour care collection is specially designed for colour-treated, damaged and over-processed hair. The Couleurs Couture Care Collection promotes colour longevity, repairs, strengthens and revives the hair deeply from within. The advanced formula is enriched with highest quality ingredients and signature fragrance.' WHERE "brand" = 'balmain' AND "name" IN ('Couleurs Couture Mask');
UPDATE "Product" SET "description" = 'Illuminating cleansing shampoo for blonde and silver hair. The pure violet pigments correct brassiness and yellow tones. For shinier hair with a vibrant crystal grey color.

• Perfect for bleached blonde, grey or hair with highlights
• Corrects warm and brassy tones
• Brightens the hair

## Details
Bleached blonde or highlighted hair is high-maintenance and requires continual touch-ups. To counteract unwanted warm tones, deeply pigmented violet enriched products are required in between colour services. The Balmain Illuminating Shampoo Silver Pearl banishes brassiness and leaves the hair cleansed and hydrated. The violet pigment enriched shampoo counteracts unwanted warm (yellow) tones. The silver shampoo gently cleanses while providing optimal hydration to the hair. Reduces appearance of discoloration and adds shine. Especially developed for cool blonde or grey hair. Infused with the signature blend of Argan Elixir and Silk Protein to repair the hair from within.

## Ingredients
Aqua, MEA-Lauryl Sulfate, PEG-18 Glyceryl Oleate/Cocoate, Cocamidopropylamine Oxide, Glycerin, Butylene Glycol, PEG-4 Rapeseedamide, PEG-7 Glyceryl Cocoate, Polyquaternium-44, Glycol Distearate, Glycereth-2 Cocoate, Sodium Laureth Sulfate, Tetrasodium EDTA, Benzophenone-4, Ethylhexylglycerin, Sodium Benzoate, Phenoxyethanol, Iodopropynyl Butylcarbamate, Citric Acid, Parfum, CI 60730.' WHERE "brand" = 'balmain' AND "name" IN ('Illuminating Shampoo Silver Pearl');
UPDATE "Product" SET "description" = 'Bleached blonde or highlighted hair is high-maintenance and requires continual touch-ups. To counteract unwanted warm tones, deeply pigmented violet enriched products are required in between colour services. The Balmain Illuminating Shampoo White Pearl, enriched with pure violet pigments, helps to refract unwanted warm tones and brightens the hair colour. The silver shampoo gently cleanses, while providing optimal hydration to the hair. Especially developed for ash blonde and highlighted hair. Infused with the signature blend of Argan Elixir and Silk Protein to repair the hair from within.

Ingredients

Aqua, MEA-Lauryl Sulfate, PEG-18 Glyceryl Oleate/Cocoate, Cocamidopropylamine Oxide, Glycerin, Butylene Glycol, PEG-4 Rapeseedamide, PEG-7 Glyceryl Cocoate, Polyquaternium-44, Glycol Distearate, Glycereth-2 Cocoate, Sodium Laureth Sulfate, Tetrasodium EDTA, Benzophenone-4, Ethylhexylglycerin, Sodium Benzoate, Phenoxyethanol, Iodopropynyl Butylcarbamate, Citric Acid, Parfum, CI 60730, Basic Violet 16.' WHERE "brand" = 'balmain' AND "name" IN ('Illuminating Shampoo White Pearl');
UPDATE "Product" SET "description" = 'An iconic, rich hair serum for an intensive overnight repair treatment. The unique concentrated formula repairs and strengthens the hair. Enriched with natural oils and extracts, the serum reduces visible signs of damaged hair. Protects the hair against frizz and split ends.

• Multiple possible hair routines
• Enriched with natural oils and extracts
• Reduces visible signs of dull or damaged hair

## Details
The Overnight Repair Serum of Balmain Hair improves manageability and smoothens the hair. The blend of natural oils and extracts penetrates deeply into the hair to boost and restore the hair from within. Use as a treatment for ultimate results. Contains Argania Spinosa Kernel Oil, which adds shine, softness and protects damaged hair. It renews treated, coloured and dry hair. Contains thermal and UV protection to protect the hair and hair colour. Vitamins are well known essentials that also mandatory in hair care. The Balmain Overnight Repair Serum contains vitamin B (Salvia Hispanica Seed Oil – also known as Chia Seed Oil) and Vitamin E (Tocopherol). The blend of Helianthus Annuus Seed Oil, Cocos Nucifera Oil, Chenopodium Quinoa Seed Extrac and Gardenia Tahitensis Flower Extract is added to smoothen, repair and condition the hair. For quick absorption of the oils and a non-greasy feeling after using the product, Macadamia Ternifolia Seed Oil is added to the formula. Antioxidants (Glycine Soja Oil and Rosmarinus Officinalis Leaf Extract) help to fight against premature aging of hair. It prevents from hair loss and provide hair growth.

## Ingredients
Argania Spinosa Kernel Oil, Helianthus Annuus Seed Oil, Salvia Hispanica Seed Oil (Chia Seed Oil), Macadamia Ternifolia Seed Oil, Glycine Soja Oil, Cocos Nucifera Oil, Chenopodium Quinoa Seed Extract, Gardenia Tahitensis Flower Extract, Rosmarinus Officinalis Leaf Extract, Tocopherol.' WHERE "brand" = 'balmain' AND "name" IN ('Overnight Repair Serum');
UPDATE "Product" SET "description" = 'This soft, lightweight, versatile lotion helps to revitalize and restore hair to its most youthful, radiant appearance. Seals hair cuticles, gives body and elasticity while reconstructing the hair fiber. The Balmain 5 Week Enriching Hair Treatment is designed as complete service. All 5 tubes (5x20ml) are designed for a single use application.

• Silk Protein for optimal hydration
• Regeneration and revitalization within 5 weeks
• Reconstructs the hair fiber

## Details
The haircare treatment for regeneration and revitalization within 5 weeks. The two active ingredients in the Balmain formula: Silk Protein and Succinic Acid seal the hair cuticles, give body and elasticity while reconstructing the hair fiber for healthy hair with a luminous shine. Silk Protein is an active ingredient that ensures optimal hydration within the hair. Scientifically Silk Protein and the hair’s natural proteins are almost identical. Silk Protein contains 17 of the 19 amino acids of natural hair. The ingredient reconstructs damaged protein chains within the hair in the most natural way. Resulting in soft, strengthened and revitalized hair. To reinforce the power of Silk, the formula is enriched with Succinic Acid. Succinic Acid is a natural ingredient derived from Amber stones that penetrates deeply into the hair. It helps to deliver the Silk Protein and creates a protective layer around each individual protein chain.The combination of these two effective and active ingredients creates a long lasting reconstruction of the hair.

## Ingredients
Aqua/Water, Betaine, Cetearyl Alcohol, Amodimethicone/ Morpholinomethyl Silsesquioxane Copolymer, Succinic Acid, Behentrimonium Chloride, ehenamidopropyl Dimethylamine, Hydrolyzed Silk, Argania Spinosa Kernel Oil, Glycolic Acid, Guar Hydroxypropyltrimonium Chloride, Stearamidopropyl Dimethylamine, Glycerin, Trideceth-5, Lactic Acid, Isopropyl Alcohol, Phenoxyethanol, Ethylhexylglycerin, Propylene Glycol, Parfum/Fragrance, Linalool, Limonene.' WHERE "brand" = 'balmain' AND "name" IN ('5 Weeks Enriching Hair Treatment');
UPDATE "Product" SET "description" = 'A richly scented hair perfume perfumed with the intense oriental, woody fragrance of Balmain Homme that combines the invigorating citric freshness of Bergamot with the woody aspect of dry Sandalwood.

• Signature Balmain Homme Fragrance
• Infused with Silk Protein and Argan Elixir
• Cabin proof size

## Details
The Balmain Homme Hair Perfume combines the invigorating citric freshness of Bergamot with the woody aspect of dry Sandalwood. Infused with Silk Protein and Argan Elixir to nourish, repair and protect the hair, providing care and a long lasting scent. Suitable for all hair types, this new hair perfume is packaged in an exquisite, heavy-glass bottle with a masculine aroma that leaves behind an irresistible trail of the woody aspects of Sandalwood. The hair fragrance instantly brings a scent to the hair. The unique blend of the finest key notes ensure an uplifting experience and smooths flyaway hair. With top notes of Bergamot, Grapefruit, Tangerine, Middle/Heart notes of Olibanum, Black Pepper, Lavender and base notes of Patchouli, Vetiver, Amber, Sandalwood.

## Ingredients
Alcohol Denat, Parfume, Aqua, Benzoic Acid, Hydrolyced Silk, Argania Spinoza Kernel Oil, Ethylhexyl methoxycinnamate.' WHERE "brand" = 'balmain' AND "name" IN ('Homme Hair Parfume', 'Homme Hair Perfume');
UPDATE "Product" SET "description" = 'Balmain Homme: A New Era in a Modern Gentlemen’s Grooming Routine.
A high-end luxury collection of grooming products made exclusively for men. Perfumed with the intense amber, woody fragrance of Balmain Homme that combines the invigorating citric freshness of Bergamot with the woody aspect of dry Sandalwood.' WHERE "brand" = 'balmain' AND "name" IN ('Balmain Homme Hair & Body Wash');
UPDATE "Product" SET "description" = 'When men get older they often suffer from thinning hair concerns. While there is nothing to do about genetics, the Balmain Homme Bodyfying care line helps to stimulate hair growth and make the hair feel denser and lifted.' WHERE "brand" = 'balmain' AND "name" IN ('Balmain Homme Gift Set');
UPDATE "Product" SET "description" = 'Rejuvenating pure organic argan oil infused with a unique blend of oils and minerals. Hydrates, moisturizes and softens the hair. The hair oil increases the hair’s elasticity and natural shine. Revives dry, damaged hair, split ends and reduces frizz.

• Provides a luminous shine
• Hydrates
• Soothes damaged hair

## Details
Argan oil, obtained from the kernels of the Moroccan Argan tree, is a natural anti-ageing ingredient that repairs and protects damaged hair from environmental extremes and creates lustrous-looking shine. The Balmain Argan Elixir''s is extremely rich in vitamins (particularly Vitamin E) and is unrivalled by any product in providing its unique blend of natural oils, minerals and fatty acids. The argan oil fights frizz and adds a brilliant shine. Enriched with the signature blend of Silk Protein and Argan Elixir and infused with the iconic Balmain signature fragrance.

## Ingredients
Cyclopentasiloxane, Dimethiconol, Argania Spinoza Kernel Oil, Trimethylsiloxyphenyl Dimethicone, Silk Amino Acids, Ethylhexyl Methoxycinnamate, Perfume.' WHERE "brand" = 'balmain' AND "name" IN ('Argan Moisturizing Elixir');
UPDATE "Product" SET "description" = 'Lightweight, leave-in conditioner. Detangles, nourishes hair and scalp and smoothens hair cuticles. Gives body, shine and conditioning throughout the day. With protective UV-filters to protect against UV-rays.

• Close the hair cuticles
• UV protection for lasting colour
• Nourishing effect

## Details
Infused with Argan Elixir and Silk Protein to restore the hair. The Leave in Conditioning Spray of Balmain Hair helps to eliminate tangled hair, frizz and dry ends. The nurturing leave-in spray is designed for hair that is in need for some extra care without losing volume. Leaves the hair repaired and conditioned throughout the day. Repairs the hair cuticles and protects against breakage. This mist is infused with Balmain Hair''s Signature Fragrance to leave the hair with a refreshing fragrance.

## Ingredients
Aqua, Glycerin, Argania Spinosa Kernel Extract, Silk Amino Acids, Panthenol, Niacinamide, Tocopheryl Acetate, Sodium Cocoyl Amino Acids, Potassium Dimethicone PEG-7 Panthenyl Phosphate, Amodimethicone, C11-15 Pareth-7, C12-16 Pareth-9, Trideceth-12, Butylene Glycol, PEG-40 Hydrogenated Castor Oil, Polysorbate 20, Ethylhexyl Methoxycinnamate, Cetrimonium Chloride, Phenoxyethanol, Ethylhexylglycerin, Parfum, Citric Acid.' WHERE "brand" = 'balmain' AND "name" IN ('Leave-In Conditioner');
UPDATE "Product" SET "description" = 'The lightweight, ultra-fine spray creates a thermal shield that protects the hair from the heat of a hair dryer, flat iron or curling iron. The formula provides a brilliant finish. Prevents moisture loss and increases shine.

• Heat protection up to 220 ° C | 428 ° F
• Prevents frizz and split ends
• Non-aggravating formula

## Details
The Thermal Protection Spray protects the hair against the heat of styling tools (up to 220 ° C | 428 ° F). Helps strengthening the hair and fights against breakage for both natural and dyed hair. The Pro Vitamin B5 and Silk Protein enriched formula nourishes, repairs and strengthens the hair. The Thermal Protection Spray has an anti-tangle and hair softening effect that ensures styling tools to glide easily through the hair, resulting in soft hair with a beautiful shine.

## Ingredients
Aqua, Alcohol Denat., PEG-12 Dimethicone, Butylene Glycol, Sodium Laneth-40 Maleate/Styrene Sulfonate Copolymer, Hydrolyzed Vegetable Protein PG-propyl Silanetriol, Silk Amino Acids, Argania Spinosa Kernel Extract, VP/VA Copolymer, Polysorbate 20, PEG-40 Hydrogenated Castor Oil, Ethylhexyl Methoxycinnamate, Benzophenone-4, Panthenol, Parfum, Phenoxyethanol, Potassium Sorbate, Benzoic Acid, EDTA, Sodium Hydroxide, CI 16255.' WHERE "brand" = 'balmain' AND "name" IN ('Thermal Protection Spray');
UPDATE "Product" SET "description" = 'The formula enriched with protective UVA and UVB filters helps to nourish and condition sun, sea or chlorine exposed hair. Prevents hair colour fading and keratin damage. For soft and strong hair with a luminous shine.

• Double acting formula; protects and nourishes intensely
• Provides colour retention
• Detangles and adds shine

## Details
The UVA rays cause the colour to fade and the UVB rays are responsible for hair protein loss which causes damage. The Balmain Sun Protection Spray formula is enriched with protective UVA and UVB filters which helps to nourish hair exposed to sun, sea or chlorine. In addition, the moisturizing formula works as a leave in spray which will leave the hair feeling soft and shiny during and after a sunny day at the beach.

## Ingredients
Aqua, Glycerin, Silk Amino Acids, Argania Spinosa Kernel Extract, Ethylhexyl Methoxycinnamate, Benzophenone-4, Tocopheryl Acetate, Panthenol, Niacinamide, Sodium Cocoyl Amino Acids, Potassium Dimethicone PEG-7 Panthenyl Phosphate, Cetrimonium Chloride, PEG-40 Hydrogenated Castor Oil, Polysorbate 20, Amodimethicone, -C11-15 -Pareth-7, C12-16 Pareth-9, -Trideceth-12, -Butylene Glycol, Phenoxyethanol, Ethyl-hexyl--glycerin, Parfum, Citric Acid, CI 42090, CI 47005, CI 61570.' WHERE "brand" = 'balmain' AND "name" IN ('Sun Protection Spray');
UPDATE "Product" SET "description" = 'Sea salt based styling spray. Adds definition, texture and body. Gives the hair a flexible hold and control. Enriched with Silk Protein and Argan Oil to ensure the moisture balance. Humidity resistant.

• Provides structure and grip
• Create textured beach waves
• Preserves the moisture balance

## Details
Create a fresh summer look with the Balmain Texturizing Salt Spray. The formula is blended with Sea Salt to add body and a matt finish. The Sea Salt results in more definition and creates texture. The Texturizing Salt Spray reduces frizz and is humidity resistant. It gives the hair the moisture balance it needs. Protect damaged, dry and weak hair against external influences.

## Ingredients
Aqua, Alcohol Denat., Sorbitol, Polyacrylate-22, Sodium Chloride (Sea Salt), Silk Amino Acids, Panthenol, Glycerin, Ethylhexyl Methoxycinnamate, Parfum, CI 13015, CI 16255.' WHERE "brand" = 'balmain' AND "name" IN ('Texturizing Salt Spray');
UPDATE "Product" SET "description" = 'A versatile spray that gives the hair a lift from the roots for extra volume. The product provides long-lasting volume and texture in the hair in no time. Instantly revitalizes the hair. Suitable for everyday use.

• Direct volume at the roots
• Strong fixation
• Long lasting effect

## Details
A versatile spray that gives the hair a lift from the roots for extra volume. The product provides long-lasting volume and texture in the hair in no time. Instantly revitalizes the hair. Suitable for everyday use. The ingredients Silk Protein and Argan Oil stimulate the moisture balance and ensure optimal moisture retention in the hair cell. They protect damaged, dry and weak hair against external influences. The Care Line is enriched with the signature Balmain fragrance.

## Ingredients
Butane, Alcohol Denat., Isobutane, Propane, VP/VA Copolymer, Aluminum Starch Octenylsuccinate, Silica, Solanum Tuberosum (Potato)Starch, Cocotrimonium Methosulfate, Aqua, Tocopherol, Benzophenone-4, Parfum.' WHERE "brand" = 'balmain' AND "name" IN ('Texturizing Volume Spray');
UPDATE "Product" SET "description" = 'Due to the unique structure of curls, humidity easily gets in resulting in unwanted volume and a frizzy, undefined, dull look. The lightweight Curl Cream of Balmain Hair defines curls and tames frizz without flattening texture. The Curl Cream protects the hair against heat styling and the UV filters protect the hair against UV-rays. The formula hydrates the hair resulting in natural curls with a lightweight, natural hold that last all day.

Ingredients

Aqua, Cyclopentasiloxane, Cetearyl Alcohol, Glycerin, Polysorbate 60, Myristyl Alcohol, Polyquaternium-10, Gossypium Herbaceum Seed Oil, Pvp, Polyquaternium-22, Aloe Barbadensis Leaf Juice, Pentaerythrityl Tetra-Di-T-Butyl Hydroxyhydrocinnamate, Tocopheryl Acetate, Sodium Acetate, Sodium Chloride, Isopropyl Alcohol, Phenoxyethanol, Ethylhexylglycerin, Parfum' WHERE "brand" = 'balmain' AND "name" IN ('Curl Cream');
UPDATE "Product" SET "description" = 'The Balmain Volume Mousse Strong provides volume and nourishes the hair. In addition, the Volume Mousse repairs the damaged and static hair. The formula gives maximum volume and thickens the hair while providing a long-lasting hold without leaving unwanted residue or weighing the hair down. The Volume Mousse Strong is therefore perfect for making fine hair look thick, voluminous and giving it more flexibility and body. Enriched with the brands signature scent.

Ingredients

Ingrediënten: Aqua, Polyquaternium- 11, Butane, Propane, Isobutane, Polyquaternium-16, Bisamino PEG/PPG-41/3 Aminoethyl PG-Propyl Dimethicone, Silk Amino Acids, Hydrolyzed Vegetable Protein PG-Propyl Silanetriol, Panthenol, Zingiber Officinale (Ginger) Root Extract, Butylene Glycol, Betaine, PEG-12 Dimethicone, Aloe Barbadensis, Anthemis Nobilis, Propylene Glycol,' WHERE "brand" = 'balmain' AND "name" IN ('Volume Mousse Strong');
UPDATE "Product" SET "description" = 'Perfect base for any hairstyle. Provides body, tames frizz and moisturizes the hair. Gives a perfect hold while styling, curling or blow drying the hair. Adds volume, shine and a reworkable hold.

• Daily moisturizer for your hair
• Reduces frizziness
• Reduces blow-dry time

## Details
The Moisturizing Styling Cream is a soft and light cream that protects the hair from damage and provides a perfect base before using a styling (hot)tool. Full of protein and Argan Elixir. It leaves the hair smoother and nourished. Leaves the hair easy to comb, soft and shiny. The formula is defined as a pre-treatment before styling it with a curling wand, straightener, or blow dryer. The nourishing cream tames frizz and protects the hair from further damage. Lightly infused with the brand’s signature fragrance scent, it leaves a great smell to the hair.

## Ingredients
Aqua, Propylene Glycol, Cetyl Alcohol, Ethylhexyl Palmitate, Glyceryl Stearate, Ceteareth-20, Argania Spinosa Kernel Oil, Silk Amino Acids, Panthenol, Tocopheryl Acetate, Hydrolyzed Vegetable Protein PG-propyl Silanetriol, Cetrimonium Chloride, Polyquaternium-7, Ethylhexyl Methoxycinnamate, Dimethicone, Polyquaternium-37, Propylene Glycol Dicaprylate/Dicaprate, PPG-1 Trideceth-6, Parfum, Phenoxyethanol, Ethylhexylglycerin, Potassium Sorbate, Disodium EDTA' WHERE "brand" = 'balmain' AND "name" IN ('Moisturizing Styling Cream');
UPDATE "Product" SET "description" = 'Create long-lasting volume with the Styling Powder of Balmain Hair. The perfect product to boost any hairstyle without weighing it down. Restyle throughout the day without adding any additional product.
The Styling Powder works perfect for creating texture in braids and updo’s, adds volume and definition.

Ingredients

Aqua, Silica Silylate, Pvp, Vp/Va Copolymer, Alcohol, Sodium Benzoate, Citric Acid.' WHERE "brand" = 'balmain' AND "name" IN ('Styling Powder');
UPDATE "Product" SET "description" = 'A lightweight, versatile styling gel with maximum, long-lasting hold for wet or dry hairstyles. Washes out easily due to the water-based formula. The perfect formulation for powerful catwalk inspired looks.

• Long-lasting hold
• Wet or dry hair looks
• Non-flexible

## Details
The clear and non-sticky formula of the Balmain Styling Gel Maximum Hold is perfect for hairstyles that desire a long-lasting hold. Shapes easily in wet and dry hair. Enhances shine and hydrates each hair strand. Ideal for short to medium hairstyles but also excellent to tame fly-aways when creating a ponytail. The lightweight styling gel has a neat and durable finish. Argan Elixir and Silk Protein restore dry and damaged hair.

## Ingredients
Aqua, Alcohol Denat, VP/VA Copolymer, Polyquaternium-69, Propanediol, PVP, PEG-40 Hydrogenated Castor Oil, Argania Spinosa Kernel Oil, Silk Amino Acids, Panthenol, Polysorbate 20, Parfum, Pantolactone, Phenoxyethanol, Ethylhexylglycerin, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Benzophenone-4, Benzoic Acid, Tetrasodium EDTA, Aminomethyl Propanol, Citric Acid.' WHERE "brand" = 'balmain' AND "name" IN ('Styling Gel Maximum Hold');
UPDATE "Product" SET "description" = 'Create the perfect sleek finished look with the Shine Wax of Balmain Paris Hair Couture. Restyle your hair throughout the day if desired. Helps to sculpt and define each hair strand and leaves the hair with a brilliant shine. For hydrated, controlled and nourished hair.The ingredients Silk Protein and Argan Oil stimulate optimal moisture retention within the hair cell. They repair and protect damaged, dry and weak hair from environmental extremes. Invigorated with the signature Balmain fragrance.' WHERE "brand" = 'balmain' AND "name" IN ('Shine Wax');
UPDATE "Product" SET "description" = 'This strong clay creates an ultimate defined, natural look with a matt finish. The clay delivers a firm hold that remains dry and workable throughout the day. The Argan Elixir restores natural shine and nourishes dry and damaged hair. The Silk Protein will benefit to rebuild the hair fiber and good-looking hair. Delicately infused with the brand’s signature fragrance, to leave the hair with a delicious scent.

Ingredients

Petrolatum, Kaolin, Polysorbate 20, Cera Flava, Parfum, Argania Spinosa Kernel Oil, Silk Amino Acids, Panthenol, Hydrogenated Olive Oil, Olive Oil (Olea Europaea), Olive Oil Unsaponifiables.' WHERE "brand" = 'balmain' AND "name" IN ('Matt Clay Strong');
UPDATE "Product" SET "description" = 'Instantly refreshing dry cleansing spray. The Dry Shampoo absorbs oils and excess sebum while lifting the roots and adding volume. Extends the blowout life and creates matt textured, full-bodied hair.

• Refreshes the hair
• Absorbs oils and cleans the scalp
• Enriched with the signature Balmain Hair fragrance

## Details
The Dry Shampoo of Balmain Hair is especially designed to instantly refresh greasy, oily hair. This multipurpose product, enriched with the signature blend of Argan Elixir and Silk Protein, cleanses the hair while working as a volume booster. The cleansing spray absorbs dirt while leaving the hair with a "just washed" feeling. The lightweight formula lifts the hair from the root to create the ultimate backcomb result. The Signature Fragrance infused formula wipes out unwanted odors and leaves the hair with a subtle refreshing scent.

## Ingredients
Butane, Isobutane, Alcohol Denat, Propane, Solanum Tuberosum (potato) Starch, Aluminium Starch octenylsuccinate, Aqua, cocotrimonium Methosulfate, Hydrated Silica, Benzophenone-4, Perfume.' WHERE "brand" = 'balmain' AND "name" IN ('Dry Shampoo');
UPDATE "Product" SET "description" = 'The Balmain Session Spray Medium is a lightweight hair spray that provides the hair with a workable texture. This hairspray will keep the hair in place without stiffness. The spray helps hinder the hair-drying effects of the sun.

This quick, flexible hairspray preserves the elasticity and movability of the hair whilst offering long-lasting control. The spray is humid resistant, protects the hair from UV-damage and brushes out easily. Besides having enough fixation strength, this session spray does not weigh the hair down and does not leave the hair with a sticky finish.

Lightly infused with the brand’s signature fragrance, the Session Spray Medium does not have a strong chemical smell and leaves the beautifully scented.

## Ingredients
Alcohol Denat., Dimethyl Ether, Octylacrylamide/Acrylates/Butylaminoethyl Methacrylate Copolymer, Acrylates Copolymer, Silk Amino Acids, Aminomethyl Propanol, PEG-12 Dimethicone, Panthenol, Benzophenone-4, Parfum.' WHERE "brand" = 'balmain' AND "name" IN ('Session Spray Medium');
UPDATE "Product" SET "description" = 'Stronghold hairspray perfect for controlling, fixating and finishing. Gives shine and body without leaving the hair crunchy or stiff. Humidity resistant

• Long-lasting styling spray
• Use for keeping in shape, fixing and finishing
• Long-term control

## Details
The Session Spray Strong provides an extreme long lasting hold. This spray locks the hair into place and handles movement and humidity. It contains UV-damage-preventing extracts that protect the hair from the sun. The product will not leave any residue to the hair while washing out. Due to the high-performance texture, it allows hairstyles to last all day while not compressing the hair. The infused signature foundation scent of Balmain Hair Couture provides a refreshing sensation while using the spray.

## Ingredients
Dimethyl Ether, Alcohol Denat., Octylacrylamide/Acrylates/ Butylaminoethyl Methacrylate Copolymer, Acrylates Copolymer, Silk Amino Acids, Aminomethyl Propanol, PEG-12 Dimethicone, Panthenol, Benzophenone-4, Parfum.' WHERE "brand" = 'balmain' AND "name" IN ('Session Spray Strong');
UPDATE "Product" SET "description" = 'Finishing shine spray infused with silk protein and pure organic Argan Oil. Provides a lightweight, long-lasting silk finish. Detangles, repairs and protects the hair against external damage.

• Refreshing scent for the hair
• Enriched with Argan and Silk Protein
• Gives the hair a shiny finish

## Details
The Balmain Hair Silk Perfume is a nourishing hair spray that leaves a soft and silk finish. The formula is enriched with pure Argan Oil and Silk Protein to stimulate the moisture balance and ensure optimal moisture retention to the hair. These ingredients protect damaged, dry and weak hair against external influences and gives the hair a long-lasting silky shine. The signature Balmain Hair fragrance is formulated with star anise, tarragon, pinewood, peach blossom, raspberry, orange blossom, gardenia, jasmine, cloves, rose, apricot, ylang-ylang, vanilla, lilac, sandalwood, with musk and balsamic. This fragrance will make the hair smell refreshed and will be released by the natural movement of the hair throughout the day.

## Ingredients
Cyclopentasiloxane, Dimethicone, Argania Spinoza Kernel Oil, Silk Amino Acids, Simmondsia Chinensis (Jojoba) Seed Oil, Prunus Amygdalus Dulcis Oil, Ethylhexyl Methoxycinnamate, Parfum.' WHERE "brand" = 'balmain' AND "name" IN ('Silk Perfume 200ml');
UPDATE "Product" SET "description" = 'Natural matt finishing paste with reworkable hold and smooth texture. Provides texture and definition to the hair and leaves the hair with a matt finish. The non-sticky formula feels smooth and tames frizzy hair.

• Remouldable hold
• Matt finish, natural look
• Signature Balmain fragrance

## Details
The Matt Paste infused with Castor Oil protects the hair from outside while maintaining a sleek texture. The non-sticky styling paste holds the hair into place without getting greasy throughout the day. The strong formula holds the hair in place during the day. Due to the water-based formula the paste is easy to wash out without leaving residue on the scalp. The Argan Oil in this product restores dry and damaged hair. Suitable for all hair types.

## Ingredients
Aqua, Petrolatum, Kaolin, Microcristallina Cera, Trilaureth-4 Phosphate, VP/VA Copolymer, Ceteareth-30, PEG-40 Hydrogenated Castor Oil, Glycerin, Cera Flava, Hydrogenated Coco-Glycerides, Sodium Benzoate, Argania Spinosa Kernel Oil, Silk Amino Acids, Panthenol, Polyquaternium-55, PEG-7 Glyceryl Cocoate, Caprylic/Capric Triglyceride, Parfum, Dimethicone, Polyacrylamide, C13-14 Isoparaffin, Laureth-7, Citric Acid.' WHERE "brand" = 'balmain' AND "name" IN ('Matt Paste');
UPDATE "Product" SET "description" = 'This 14 karat gold plated Tail Comb is ideal for (back)combing and parting the hair. The fine teeth give an exceptionally precise result.

• 14K gold plated
• Professional Tail Comb
• Pointed handle for creating partings

## Details
Balmain Paris Hair Couture has developed a unique Golden Comb Collection, plated with 14-karat gold. The collection consists of three specific combs that are ideal for professional use. This professional Gold Tail Comb is ideal for arranging strands for smooth finish. The fine teeth and thin ends give an exceptionally precise result. In addition, the Tail Comb is perfect for teasing the hair for a more voluminous look.' WHERE "brand" = 'balmain' AND "name" IN ('14k Gold Plated Tail Comb');
UPDATE "Product" SET "description" = 'The 14K gold-plated professional Cutting Comb has rounded teeth for precise cutting and straight sides for a clean result. Designed according to the highest quality standards.

• 14 karat gold plated
• Professional cutting comb
• Straight teeth for precision work

## Details
A special tribute to the craft of hairdressing. Designed with rounded teeth the Limited Edition 14K gold-plated professional Cutting Comb is perfect for precise cutting. The comb is designed according to the highest quality standards. The Cutting Comb is made with wide teeth for low tension and fine teeth for precision control, which is perfect for short hair, medium hair and long hair.' WHERE "brand" = 'balmain' AND "name" IN ('14k Gold Plated Cutting Comb');
UPDATE "Product" SET "description" = 'The Professional 14k gold plated Styling Comb is designed with wide teeth. Suitable for detangling and styling the hair. Gives texture and shine and makes the hair less frizzy. The wide teeth are perfect for detangling wet hair without pulling out or breaking hair.

• 14 karat gold plated
• Professional Styling Comb
• Gives hair body and shine

## Details
The Balmain Hair Gold Styling Comb is one of the three combs from the unique Golden Comb Collection. The comb is designed with wide teeth which glide smoothly through the hair. It is perfect for detangling and styling the hair. The professional Styling Comb has a unique shape that is suitable for every hair type. The comb gives texture and shine and makes the hair less frizzy. The wide teeth are perfect for detangling wet hair without pulling out or breaking hair. In addition, the Styling Comb is perfect for combing out curls to create a more soft looking wavy curls. Designed according to the highest quality standards.' WHERE "brand" = 'balmain' AND "name" IN ('14k Gold Plated Styling Comb');
UPDATE "Product" SET "description" = 'Detangling Spa Brush with flexible nylon bristles. The flexibility of the bristles is specially designed for pain-free detangling, while the soft bristles massage the scalp to stimulate circulation. Perfect for all hair types, wigs and hair with extensions.

• Nylon bristles
• Prevents hair breakage and damage
• Detangles the hair without pulling the hair

## Details
The cushion-based nylon bristles glide easily through the hair. The bristles are strong enough to brush through knots, yet flexible enough to be gentle on the scalp. Regular brushing creates strength, suppleness, seals the hair cuticle and produces healthy shine and beautiful hair. Because of the flexible bristles, this hairbrush is ideal for hair with hair extensions. The Detangling Spa Brush glides easily through the hair without damaging the bonds. The black rubber cushion has eight rings of nylon bristles that move easily through the hair. In addition it has a comfortable grip because of its curved, matt coated handle.' WHERE "brand" = 'balmain' AND "name" IN ('Detangling SPA Brush');
UPDATE "Product" SET "description" = 'Luxury Spa Brush with 100% boar bristles specially designed for a high gloss finish. The unique structure of the boar bristles distributes the natural oils from the roots to the ends. Perfect to loosen curls and create soft waves.

• 100% boar bristles
• Ideal for all hair types, including thin / fine hair
• Creates a high gloss professional finish

## Details
Boar hair brushes are known for creating healthy and shiny hair without using any styling products. The board bristles create natural properties which help to condition the hair by spreading the oils from roots to ends. In addition the bristles repair dry hair and add shine. Use the brush to brush through tight curls to create endless soft waves. The greatest benefit of the boar bristle is that it does not damages the hair while brushing. It will not tear, split and break the hair. Instead it prevents the build-up oils on the scalp. In addition the brush stimulates the scalp and increases blood flow which leads to hair growth.' WHERE "brand" = 'balmain' AND "name" IN ('Luxury SPA Brush');
UPDATE "Product" SET "description" = 'Professional All Purpose Spa Brush with a blend of nylon bristles and 100% boar bristles. The unique structure of the boar bristles distributes the natural oils from the roots to the ends.

• Mix of 100% boar hair and nylon bristles
• For hair with extensions, thick hair and medium to long hair
• Detangles the hair without pulling the hair

## Details
For the past decade, boar hair brushes have been used to create healthy and shiny hair without styling products. The natural properties of the boar bristles help condition the hair by spreading the oils from roots to ends. Natural oils act as an anti-frizz serum that repair dry hair and add shine. The boar bristles and nylon bristles stimulate the scalp and help detangle the hair. Regular brushing with the All Purpose Spa Brush prevents the build-up of oils on the scalp which makes the hair greasy. It stimulates the scalp and increases blood flow, improving hair growth. The black rubber base contains boar hair and nylon bristles that move easily through the hair. The curved matt coated handle offers a better and comfortable grip.' WHERE "brand" = 'balmain' AND "name" IN ('All Purpose SPA Brush');
UPDATE "Product" SET "description" = 'The Ceramic Round Brush XL with a 43mm diameter is designed with an extra-long barrel. This brush is perfect for blow-drying large sections of hair in one go. With ergonomic, seamless handle and large round holes to maximize airflow.

• Unique design with extreme long barrel
• Prevents frizzy hair
• Ideal for blow drying large sections

## Details
The Balmain Ceramic Round Brush XL is the largest round brush and is therefore suitable for long and/or thick hair. The brush has an extra-long barrel which makes it easily to blow-dry large sections of hair quickly, enhancing drying time. The ceramic coating barrel is designed to spread the heat evenly to create more shine, volume and dry the hair fast due to its negative ion technology. The bristles help to smoothen the flyaways for a long lasting silky finish. With ergonomic, seamless handle and large round holes to optimize the air flow in the brush. Perfect to use in combination with the Professional Blowdryer and Thermal Protection Spray.' WHERE "brand" = 'balmain' AND "name" IN ('Profesional Ceramic Round Brush 43mm xl', 'Professional Ceramic Round Brush 43mm xl');
UPDATE "Product" SET "description" = 'The Ceramic Round Brush is designed with ceramic coating. The coating gives of negative ions that close the hair cuticles, maintain the natural moisture balance and prevent frizz. The ceramic coating ensures a quick and even distribution of heat, which shortens the drying time. The brush has small vents to circulate the air freely in the brush which results in to creating silky soft hair. The ergonomic, seamless handle provides better control and effortless styling.The 53mm barrel is suitable for blow drying long to extra-long hair or to create volume in medium length hair. Perfect to use in combination with the Professional Blowdryer and Thermal Protection Spray.' WHERE "brand" = 'balmain' AND "name" IN ('Profesional Ceramic Round Brush 53mm', 'Professional Ceramic Round Brush 53mm');
UPDATE "Product" SET "description" = 'The Ceramic Round Brush provides volume, body and healthy looking hair. With a diameter of 43mm the brush is suitable for blow-drying medium to long hair or to create volume in medium length hair.

• Negative ion technology
• Distributes the heat from the hair dryer
• Ideal for medium length hair

## Details
The Balmain Hair Couture Ceramic Round Brush gives of negative ions which seals the hair, closes cuticles and leaves the hair smooth. The ceramic coating barrel is designed to spread the heat evenly to create more shine, volume and dry the hair fast due to its negative ion technology. The bristles help to smoothen the flyaways for a long lasting silky finish. With ergonomic, seamless handle and large round holes to optimize the air flow in the brush. The brush has a diameter of 43mm and is suitable for blow drying long to extra-long hair or to create volume in medium length hair.' WHERE "brand" = 'balmain' AND "name" IN ('Profesional Ceramic Round Brush 43mm', 'Professional Ceramic Round Brush 43mm');
UPDATE "Product" SET "description" = 'Professional round brush with ceramic coating. The brush is designed with a 33mm diameter and is suitable for creating more volume or a high-gloss finish in short to medium hair.

• Negative ion technology
• Distributes the heat from the hair dryer
• Ceramic coated barrel

## Details
The Balmain Hair Couture Ceramic Round Brush 33mm is the perfect tool for creating more volume or for creating a silky finish to the hair. The ceramic barrel gives of negative ions which seal the hair, close off damaged cuticles and smooth out the split ends. The small openings in the barrel supports a perfect circulation of the airflow which results in hair with a high-gloss finish. Spreads the heat evenly resulting in to creating more shine and volume to the hair while drying quickly. The bristles smoothen the flyaways giving it a longlasting sleek finish. To provide better control and effortless styling the brush is ergonomically designed.' WHERE "brand" = 'balmain' AND "name" IN ('Profesional Ceramic Round Brush 33mm', 'Professional Ceramic Round Brush 33mm');
UPDATE "Product" SET "description" = 'A high-end luxury collection of grooming products made exclusively for men. Perfumed with the intense amber, woody fragrance of Balmain Homme that combines the invigorating citric freshness of Bergamot with the woody aspect of dry Sandalwood.' WHERE "brand" = 'balmain' AND "name" IN ('Profesional Ceramic Round Brush 25mm', 'Professional Ceramic Round Brush 25mm');
UPDATE "Product" SET "description" = 'Over the last decades boar hair brushes have been used to create shiny, healthy hair without styling products. The natural properties of the boar hair bristles help to condition the hair by carrying sebum from the scalp to the end of the hair shaft. Sebum works like a natural anti-frizz serum that repairs dry hair and adds lustrous shine.

The Golden Spa Brush features boar hair bristles and longer nylon bristles that stimulate the scalp and help to detangle the hair while allowing the boar bristles to distribute the sebum. Regular brushing with the Silver Spa Brush prevents oil build-up at the scalp which makes the hair look greasy, reducing the frequency of washing. It stimulates the scalp and increases the blood flow to the hair follicles, which can improve hair growth.' WHERE "brand" = 'balmain' AND "name" IN ('Golden Spa Brush');
UPDATE "Product" SET "description" = 'Over the last decades boar hair brushes have been used to create shiny, healthy hair without styling products. The natural properties of the boar hair bristles help to condition the hair by carrying sebum from the scalp to the end of the hair shaft. Sebum works like a natural anti-frizz serum that repairs dry hair and adds lustrous shine.The Silver Spa Brush features boar hair bristles and longer nylon bristles that stimulate the scalp and help to detangle the hair while allowing the boar bristles to distribute the sebum. Regular brushing with the Silver Spa Brush prevents oil build-up at the scalp which makes the hair look greasy, reducing the frequency of washing. It stimulates the scalp and increases the blood flow to the hair follicles, which can improve hair growth.' WHERE "brand" = 'balmain' AND "name" IN ('Silver Spa Brush');
UPDATE "Product" SET "description" = 'The professional Lightweight Hairdryer with DC motor and AC fan gives a powerful airflow for super-fast drying. The ergonomic design with rubberized finish ensures a comfortable hold and better grip while styling while representing the Balmain colours with its matt black surface and golden details.

• DC Motor + AC Fan (lightweight DC motor with strong AC fan)
• 2 speed & 3 temperature controls
• 3  meter Professional Cord

## Details
The built-in ionic generator creates millions of negative ion particles. The ionic technology allows these particles to seal cuticles, infuse moisture, rehydrate, eliminate frizz and provides a silk and smooth result. Equipped with 2 speeds and 3 precise heat settings (including cool shot function), the hair dryer helps prevent heat damage to protect natural shine. Features a 3-meter professional power cord for flexible styling.' WHERE "brand" = 'balmain' AND "name" IN ('Profesional Blowdryer', 'Professional Blowdryer');
UPDATE "Product" SET "description" = 'The Balmain Professional Ceramic Curling Wand 25mm is created to provide perfect medium sized curls. The ultimate styling tool to create shiny and frizz free bouncy curls. The ceramic barrel technology distributes the heat evenly to protect the hair from getting damaged. The Curling Iron is designed without a clamp to avoid any kinks in the hair.

• Ceramic Wand for faster heat distribution and consistent heat
• Various heat settings from 80-230 ° c / 176-446 ° f
• Protective cool tip for comfortable styling

## Details
The Balmain Professional Ceramic Curling Wand is designed for professional stylists. The Curling Wand provides the ultimate styling surface and creates bouncy and shiny curls. The ceramic barrel technology provides an even heat distribution to prevent damaged hair. The 25mm wand is the most popular barrel size due to its versatility, because it is suitable for short, medium and long hair. The wand creates easy textured waves, spiral curls, defined curls, vintage waves and natural-looking curls. It is also perfect for creating full-bodied curls and waves, flipped ends and loose curls. Compared to the larger 32mm Curling Wand, this wand creates tighter and more defined curls. The Ceramic Curling Wand is designed with a protective cool tip that provides a surface to be able to secure the hair in place while curling the hair. Shuts off automatically after 60 minutes of inactivity. Note: Includes a heat resistant mat, 4 hair clips and a storage bag' WHERE "brand" = 'balmain' AND "name" IN ('Profesional Ceramic Curling Wand 25mm', 'Professional Ceramic Curling Wand 25mm');
UPDATE "Product" SET "description" = 'A small handcrafted claw clip made from durable cellulose acetate and designed with the Balmain’s signature 14K gold plated “B” logo. The extremely strong yet flexible material is hypoallergenic and gentle to the hair and scalp. The small-sized hair clamp is perfect for thin, fine hair and can easily sweep loose tresses out of the face.

• Handmade hair accessory
• Designed with 18K Gold Plated logo emblem
• Perfect for fine, thin hair

## Details
Inspired by the house’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair created “Les Accessoires”, a luxury hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The small claw clip of Balmain Hair is especially designed for thin, fine hair and easily sweeps loose tresses out of the face or neck area.' WHERE "brand" = 'balmain' AND "name" IN ('Pince a Cheveux Small White');
UPDATE "Product" SET "description" = 'A small handcrafted claw clip made from durable cellulose acetate and designed with the Balmain’s signature 14K gold plated “B” logo. The extremely strong yet flexible material is hypoallergenic and gentle to the hair and scalp. The small-sized hair clamp is perfect for thin, fine hair and can easily sweep loose tresses out of the face.

• Handmade hair accessory
• Designed with 18K Gold Plated logo emblem
• Perfect for fine, thin hair or to pull a few strands from the face

## Details
Inspired by the house’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair created “Les Accessoires”, a luxury hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The small claw clip of Balmain Hair is especially designed for thin, fine hair and easily sweeps loose tresses out of the face or neck area.' WHERE "brand" = 'balmain' AND "name" IN ('Pince a Cheveux Small Black');
UPDATE "Product" SET "description" = 'A small handcrafted claw clip made from durable cellulose acetate and designed with the Balmain’s signature 14K gold plated “B” logo. The extremely strong yet flexible material is hypoallergenic and gentle to the hair and scalp. The small-sized hair clamp is perfect for thin, fine hair and can easily sweep loose tresses out of the face.

• Handmade hair accessory
• Designed with 18K Gold Plated logo emblem
• Perfect for fine, thin hair

## Details
Inspired by the house’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair created “Les Accessoires”, a luxury hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The small claw clip of Balmain Hair is especially designed for thin, fine hair and easily sweeps loose tresses out of the face or neck area.' WHERE "brand" = 'balmain' AND "name" IN ('Pince a Cheveux Small Tortoiseshell');
UPDATE "Product" SET "description" = 'A medium-sized handcrafted claw clip made from durable cellulose acetate designed with the Balmain’s signature 18K gold plated “B” logo. The extremely strong yet flexible material is hypoallergenic and gentle to the hair and scalp. The medium size is highly versatile for a wide range of hairstyles and perfect for a messy bun, french twist or half updo.

• Handmade hair accessory
• Designed with 18K gold plated logo emblem
• Perfect for normal to thick hair

## Details
Inspired by Balmain’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Paris Hair Couture created “Les Accessoires”, a luxury hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The medium-sized claw clip of Balmain Hair is designed for normal to thick hair and easily holds a bun or twist.' WHERE "brand" = 'balmain' AND "name" IN ('Pince a Cheveux Medium White');
UPDATE "Product" SET "description" = 'A medium-sized handcrafted claw clip made from durable cellulose acetate designed with the Balmain’s signature 18K gold plated “B” logo. The extremely strong yet flexible material is hypoallergenic and gentle to the hair and scalp. The large clip is especially designed for normal to thick and long hair and works as a real statement piece when clipped into the hair.

• Handmade hair accessory
• Designed with 18K gold plated logo emblem
• Perfect for normal to thick hair

## Details
Inspired by Balmain’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair Couture created “Les Accessoires”, an iconic hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The medium-sized claw clip of Balmain Hair is an essential French hair accessory especially designed for long, thick hair. The large claw clip easily holds all hair together and provides perfect grip for normal to thick hair.' WHERE "brand" = 'balmain' AND "name" IN ('Pince a Cheveux Medium Black');
UPDATE "Product" SET "description" = 'A medium-sized handcrafted claw clip made from durable cellulose acetate designed with the Balmain’s signature 18K gold plated “B” logo. The extremely strong yet flexible material is hypoallergenic and gentle to the hair and scalp. The medium size is highly versatile for a wide range of hairstyles and perfect for a messy bun, french twist or half updo.

• Handmade in France
• Designed with 18K gold plated logo emblem
• Perfect for normal to thick hair

## Details
Inspired by Balmain’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Paris Hair Couture created “Les Accessoires”, a luxury hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The medium-sized claw clip of Balmain Hair is designed for normal to thick hair and easily holds a bun or twist.' WHERE "brand" = 'balmain' AND "name" IN ('Pince a Cheveux Medium Tortoiseshell');
UPDATE "Product" SET "description" = 'A large handcrafted claw clip made from durable cellulose acetate designed with the Balmain’s signature 18K gold plated “B” logo. The extremely strong yet flexible material is hypoallergenic and gentle to the hair and scalp. The large clip is especially designed for thick and long hair and works as a real statement piece when clipped into the hair.

• Handmade hair accessory
• Designed with 18K Gold Plated logo emblem
• Perfect for long, thick hair

## Details
Inspired by Balmain’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair Couture created “Les Accessoires”, an iconic hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The large claw clip of Balmain Hair Couture is an essential French hair accessory especially designed for long, thick hair. The large claw clip easily holds all hair together and provides perfect grip on long, thick hair.' WHERE "brand" = 'balmain' AND "name" IN ('Pince a Cheveux Large White');
UPDATE "Product" SET "description" = 'A large handcrafted claw clip made from durable cellulose acetate designed with the Balmain’s signature 18K gold plated “B” logo. The extremely strong yet flexible material is hypoallergenic and gentle to the hair and scalp. The large clip is especially designed for thick and long hair and works as a real statement piece when clipped into the hair.

• Handmade hair accessory
• Designed with 18K Gold Plated logo emblem
• Perfect for long, thick hair

## Details
Inspired by Balmain’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair Couture created “Les Accessoires”, an iconic hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The large claw clip of Balmain Hair is an essential French hair accessory especially designed for long, thick hair. The large claw clip easily holds all hair together and provides perfect grip on long, thick hair.' WHERE "brand" = 'balmain' AND "name" IN ('Pince a Cheveux Large Black');
UPDATE "Product" SET "description" = 'A large handcrafted claw clip made from durable cellulose acetate designed with the Balmain’s signature 18K gold plated “B” logo. The extremely strong yet flexible material is hypoallergenic and gentle to the hair and scalp. The large clip is especially designed for thick and long hair and works as a real statement piece when clipped into the hair.

• Handmade hair accessory
• Designed with 18K Gold Plated logo emblem
• Perfect for long, thick hair

## Details
Inspired by Balmain’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair created “Les Accessoires”, an iconic hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The large claw clip of Balmain Hair is an essential French hair accessory especially designed for long, thick hair. The large claw clip easily holds all hair together and provides perfect grip on long, thick hair.' WHERE "brand" = 'balmain' AND "name" IN ('Pince a Cheveux Large Tortoiseshell');
UPDATE "Product" SET "description" = 'A handcrafted hair elastic made from durable cellulose acetate designed with the Balmain’s signature 18K gold plated “B” logo. The extremely strong yet flexible material is hypoallergenic and gentle to the hair and scalp. The hair elastic is specially designed to accentuate one of the iconic Balmain hairstyles: the ponytail.

• Handmade hair accessory
• With 18k gold-plated Balmain ''''B''''
• Accentuates ponytails

## Details
Inspired by Balmain’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair created “Les Accessoires”, a luxury hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The Elastique pour Cheveux of Balmain Hair is an accent piece that adds an eye-catcing element to every ponytail. Featuring a thick, non-damaging elastic band, the ponytail holder is a simple solution for a sophisticated style. Details
Dimensions: Length: 6,00 cm / Width: 3,00 cm / Height: 2,80 cm' WHERE "brand" = 'balmain' AND "name" IN ('Elastique Pour Cheveux White');
UPDATE "Product" SET "description" = 'A handcrafted hair elastic made from durable cellulose acetate designed with the Balmain’s signature 18K gold plated “B” logo. The extremely strong yet flexible material is hypoallergenic and gentle to the hair and scalp. The hair elastic is specially designed to accentuate one of the iconic Balmain hairstyles: the ponytail.

• Handmade hair accessory
• With 18k gold-plated Balmain ''''B''''
• Accentuates ponytails

## Details
Inspired by Balmain’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair created “Les Accessoires”, a luxury hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The Elastique pour Cheveux of Balmain Hair is an accent piece that adds an eye-catcing element to every ponytail. Featuring a thick, non-damaging elastic band, the ponytail holder is a simple solution for a sophisticated style.' WHERE "brand" = 'balmain' AND "name" IN ('Elastique Pour Cheveux Black');
UPDATE "Product" SET "description" = 'A handcrafted hair elastic made from durable cellulose acetate designed with the Balmain’s signature 18K gold plated “B” logo. The extremely strong yet flexible material is hypoallergenic and gentle to the hair and scalp. The hair elastic is specially designed to accentuate one of the iconic Balmain hairstyles: the ponytail.

• Handmade hair accessory
• With 18k gold-plated Balmain ''''B''''
• Accentuates ponytails

## Details
Inspired by Balmain’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair created “Les Accessoires”, a luxury hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The Elastique pour Cheveux of Balmain Hair is an accent piece that adds an eye-catcing element to every ponytail. Featuring a thick, non-damaging elastic band, the ponytail holder is a simple solution for a sophisticated style. Details
Dimensions: Length: 6,00 cm / Width: 3,00 cm / Height: 2,80 cm' WHERE "brand" = 'balmain' AND "name" IN ('Elastique Pour Cheveux Tortoiseshell');
UPDATE "Product" SET "description" = 'A medium hair barrette made from durable cellulose acetate designed with the Balmain’s signature 18K gold plated “B” logo. The extremely strong yet flexible material is hypoallergenic and gentle to the hair and scalp. The hair accessory features a high quality genuine French clip underneath the barrette to ensure perfect grip on the hair and can be worn to hold hair back from the face, adorn a ponytail or enhance an up-do.

• Handcrafted hair accessory
• Designed with 18K gold plated logo emblem
• Perfect for fine and normal hair

## Details
Inspired by Balmain’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair created “Les Accessoires”, an iconic hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The medium hair barrette of Balmain Hair complements a wide range of styles and is an easy way to elevate your look. Create a half-updo or low ponytail with it or just use it as an adornment.' WHERE "brand" = 'balmain' AND "name" IN ('Barrette Pour Cheveux Medium White');
UPDATE "Product" SET "description" = 'A medium hair barrette made from durable cellulose acetate designed with the Balmain’s signature 14K gold plated “B” logo. The extremely strong yet flexible material is hypoallergenic and gentle to the hair and scalp. The hair accessory features a high quality genuine French clip underneath the barrette to ensure perfect grip on the hair and can be worn to hold hair back from the face, adorn a ponytail or enhance an up-do.

• Handcrafted hair accessory
• Designed with 18K gold plated logo emblem
• Perfect for fine and normal hair

## Details
Inspired by Balmain’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair created “Les Accessoires”, an iconic hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The medium hair barrette of Balmain Hair complements a wide range of styles and is an easy way to elevate your look. Create a half-updo or low ponytail with it or just use it as an adornment.' WHERE "brand" = 'balmain' AND "name" IN ('Barrette Pour Cheveux Medium Black');
UPDATE "Product" SET "description" = 'A medium hair barrette made from durable cellulose acetate designed with the Balmain’s signature 18K gold plated “B” logo. The extremely strong yet flexible material is hypoallergenic and gentle to the hair and scalp. The hair accessory features a high quality genuine French clip underneath the barrette to ensure perfect grip on the hair and can be worn to hold hair back from the face, adorn a ponytail or enhance an up-do.

• Handcrafted hair accessory
• Designed with 18K gold plated logo emblem
• Perfect for fine and normal hair

## Details
Inspired by Balmain’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair created “Les Accessoires”, an iconic hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The medium hair barrette of Balmain Hair complements a wide range of styles and is an easy way to elevate your look. Create a half-updo or low ponytail with it or just use it as an adornment.' WHERE "brand" = 'balmain' AND "name" IN ('Barrette Pour Cheveux Medium Tortoiseshell');
UPDATE "Product" SET "description" = 'A large hair barrette made from durable cellulose acetate designed with the Balmain’s signature 18K gold plated “B” logo. The extremely strong yet flexible material is hypoallergenic and gentle to the hair and scalp. The hair accessory features a high quality genuine French clip underneath the barrette to ensure perfect grip on the hair. The hair clip is especially designed for normal to thick hair and can be worn as a real statement hairpiece to hold hair back from the face, adorn a ponytail or enhance an up-do.

• Handcrafted hair accessory
• Designed with 18K gold plated logo emblem
• Perfect for normal to thick hair

## Details
Inspired by Balmain’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair created “Les Accessoires”, a luxury hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The large hair barrette of Balmain Hair is especially designed to hold a large amount of hair and complements a wide range of styles. Create a half-updo or low ponytail with it or just use it as an adornment.' WHERE "brand" = 'balmain' AND "name" IN ('Barrette Pour Cheveux Large White');
UPDATE "Product" SET "description" = 'A large hair barrette made from durable cellulose acetate designed with the Balmain’s signature 14K gold plated “B” logo. The extremely strong yet flexible material is hypoallergenic and gentle to the hair and scalp. The hair accessory features a high quality genuine French clip underneath the barrette to ensure perfect grip on the hair. The hair clip is especially designed for normal to thick hair and can be worn as a real statement hairpiece to hold hair back from the face, adorn a ponytail or enhance an up-do.

• Handcrafted hair accessory
• Designed with 18K gold plated logo emblem
• Perfect for normal to thick hair

## Details
Inspired by Balmain’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair created “Les Accessoires”, a luxury hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The large hair barrette of Balmain Hair is especially designed to hold a large amount of hair and complements a wide range of styles. Create a half-updo or low ponytail with it or just use it as an adornment. Details' WHERE "brand" = 'balmain' AND "name" IN ('Barrette Pour Cheveux Large Black');
UPDATE "Product" SET "description" = 'A large hair barrette made from durable cellulose acetate designed with the Balmain’s signature 18K gold plated “B” logo. The extremely strong yet flexible material is hypoallergenic and gentle to the hair and scalp. The hair accessory features a high quality genuine French clip underneath the barrette to ensure perfect grip on the hair. The hair clip is especially designed for normal to thick hair and can be worn as a real statement hairpiece to hold hair back from the face, adorn a ponytail or enhance an up-do.

• Handcrafted hair accessory
• Designed with 18K gold plated logo emblem
• Perfect for normal to thick hair

## Details
Inspired by Balmain’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair created “Les Accessoires”, a luxury hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The large hair barrette of Balmain Hair is especially designed to hold a large amount of hair and complements a wide range of styles. Create a half-updo or low ponytail with it or just use it as an adornment.' WHERE "brand" = 'balmain' AND "name" IN ('Barrette Pour Cheveux Large Tortoiseshell');
UPDATE "Product" SET "description" = 'When men get older they often suffer from thinning hair concerns. While there is nothing to do about genetics, the Balmain Homme Bodyfying care line helps to make the hair feel denser and lifted.' WHERE "brand" = 'balmain' AND "name" IN ('Balmain Homme Bodyfying Shampoo 250ml');
UPDATE "Product" SET "description" = 'Daily thickening conditioner specially designed for men with thinning hair concerns. Densifies the hair fiber and stimulates hair growth. Perfumed with the intense amber, woody fragrance of Balmain Homme.

• Densifies the hair fiber
• Stimulates hair growth
• for thinning hair

## Details
When men get older they often suffer from thinning hair concerns. While there is nothing to do about genetics, the Balmain Homme Bodyfying care line helps to stimulate hair growth and make the hair feel denser and lifted. Perfumed with the intense amber, woody fragrance of Balmain Homme.

## Ingredients
Aqua, Cetyl Alcohol, PPG-3 Myristyl Ether, Propylheptyl Caprylate, Glycerin, Behentrimonium Chloride, Polyquaternium-110, Parfum, Stearamidopropyl Dimethylamine, Caffeine, Biotinyl Tripeptide-1, Apigenin, Oleanolic Acid, Silk Amino Acids, Hydrolyzed Keratin, Argania Spinosa Kernel Oil, Salicylic Acid, Piroctone Olamine, Butylene Glycol, PPG-26-Buteth-26, PEG-40 Hydrogenated Castor Oil, Ethylhexyl Methoxycinnamate, Isopropyl Alcohol, Benzyl Salicylate, Hydroxyethylcellulose, Phenoxyethanol, Ethylhexylglycerin, Menthol, Benzoic Acid, Sorbic Acid, Citric Acid.' WHERE "brand" = 'balmain' AND "name" IN ('Balmain Homme Bodyfying Conditioner 250ml');
UPDATE "Product" SET "description" = 'Brightening spa treatment with pure violet pigments for blonde and silver hair. Corrects brassiness and leaves the hair with a vibrant crystal cool blonde or grey colour. Enriched with a powerful blend of Succinic Acid, Argan Elixir, Silk- and Cashmere Protein to strengthen and protect the hair structure.

• Corrects brassiness and yellow tones
• Maintains a silver and crystal grey colour
• Perfect to use in between colour services

## Details
Bleached blonde or highlighted hair is high-maintenance and requires continual touch-ups. To counteract unwanted warm tones, deeply pigmented violet enriched products are required in between colour services. The Balmain Hair Illuminating line enriched with pure violet pigments, helps to refract unwanted warm tones and brighten the hair colour. The Illuminating Mask Silver Pearl deeply nourishes the hair while maintaining the crystal grey colour of the hair. Especially developed for ash blonde and highlighted hair. Infused with the signature blend of Argan Elixir and Silk Protein to repair the hair from within.

## Ingredients
Aqua, Cetearyl Alcohol, Behentrimonium Chloride, Glycerin, PPG-3 Myristyl Ether, Betaine, Dimethicone, Propylene Glycol, Argania Spinosa Kernel Oil, PCA Dimethicone Crosspolymer, Hydrolyzed Keratin, Silk Amino Acids, Helianthus Annuus Seed Oil, Macadamia Ternifolia Seed Oil, Cocos Nucifera Oil, Glycine Soja Oil, Gardenia Tahitensis Flower Extract, Rosmarinus Officinalis Leaf Extract, Chenopodium Quinoa Seed Extract, Tocopherol, Polysilicone-19, Polyacrylamidopropyltrimonium Chloride, Dipalmitoylethyl Hydroxyethylmonium Methosulfate, Linoleamidopropyl PG-Dimonium Chloride Phosphate Dimethicone, Panthenol, Quaternium-91, Cetrimonium Methosulfate, Ethylhexyl Methoxycinnamate, Ceteareth-20, Dipropylene Glycol, Pantolactone, Basic Red 76, Basic Blue 99, Quaternium-80, Butylene Glycol, Parfum, Benzyl Alcohol, Caprylyl Glycol, Hexylene Glycol, Polysorbate 20, Isopropyl Alcohol, Benzoic Acid, Phenoxyethanol, Ethylhexylglycerin, Succinic Acid, Citric Acid, Sorbic Acid, Dehydroacetic Acid' WHERE "brand" = 'balmain' AND "name" IN ('Illuminating Mask Silver Pearl 200ml');
UPDATE "Product" SET "description" = 'Bleached blonde or highlighted hair is high-maintenance and requires continual touch-ups. To counteract unwanted warm tones, deeply pigmented violet enriched products are required in between colour services. The Balmain Hair Illuminating line enriched with pure violet pigments, helps to refract unwanted warm tones and brighten the hair colour. The Illuminating Mask deeply nourishes the hair while maintaining the cool blonde colour of the hair. Especially developed for ash blonde and highlighted hair. Infused with the signature blend of Argan Elixir and Silk Protein to repair the hair from within.' WHERE "brand" = 'balmain' AND "name" IN ('Illuminating Mask White Pearl 200ml');
UPDATE "Product" SET "description" = 'When men get older they often suffer from thinning hair concerns. While there is nothing to do about genetics, the Balmain Homme Bodyfying care line helps to stimulate hair growth and make the hair feel denser and lifted.

Ingredients

Aqua, Alcohol Denat., Butylene Glycol, PEG-40 Hydrogenated Castor Oil, Propanediol, Caffeine, Biotinyl Tripeptide-1, Apigenin, Oleanolic Acid, Silk Amino Acids, Hydrolyzed Keratin, Argania Spinosa Kernel Oil, Piroctone Olamine, Salicylic Acid, Menthol, Cetrimonium Chloride, Hydroxyethylcellulose, PPG-26-Buteth-26, Parfum, Benzyl Salicylate, Limonene, Phenoxyethanol, Benzoic Acid, Sorbic Acid.' WHERE "brand" = 'balmain' AND "name" IN ('Activating Scalp Treatment', 'Acvitating Scalp Treatment');
UPDATE "Product" SET "description" = 'Specially designed for hair that is in need for extra nourishment. Replenishes dry, brittle and over-processed hair. Leaves the hair shiny and with a luxurious soft feeling from root to end. The Argania Spinosa Kernel Oil (Argan Oil) absorbs into the hair easily and gives rich moisture to the hair without weighing the hair down. It protects the hair and illuminates frizz. The Pro-Vitamin B5 improves moisture retention, the hair elasticity and flexibility. It balances hair moisture levels, calms irritated and sensitive scalps. Improves hair manageability and evens out brittle hair ends. Weekly use supports healthier hair and stimulates hair growth.' WHERE "brand" = 'balmain' AND "name" IN ('Moisturizing Repair Mask');
UPDATE "Product" SET "description" = 'A compact brush with a mix of nylon bristles and 100% boar bristles. Ideal for on-the-go use and perfect for healthy, shiny hair.

• Travel size
• Suitable for extensions, thick & (medium) long hair
• Prevents an oily scalp and promotes hair growth

## Details
For the past decade, boar hair brushes have been used to create healthy and shiny hair without styling products. The natural properties of the boar bristles help condition the hair by spreading the oils from roots to ends. Natural oils act as an anti-frizz serum that repair dry hair and add shine. The boar bristles and nylon bristles stimulate the scalp and help detangle the hair. Regular brushing with the All Purpose Spa Brush prevents the build-up of oils on the scalp which makes the hair greasy. It stimulates the scalp and increases blood flow, improving hair growth. The black rubber base contains boar hair and nylon bristles that move easily through the hair. The curved matt coated handle offers a better and comfortable grip.' WHERE "brand" = 'balmain' AND "name" IN ('Mini All Purpose Brush');
UPDATE "Product" SET "description" = 'An extra small, handmade claw clip made of durable black cellulose acetate. Designed with a sophisticated ivory coloured edge and the house''s signature 18K gold-plated "B" logo. The extremely strong yet flexible material is hypoallergenic and gentle on the hair and scalp. The revolutionary clip mechanism provides perfect grip and prevents the hair accessory from slipping out of the hair. Perfect for all hair types.

• Handmade in France
• 18K Gold-plated emblem
• Perfect for thin and fine hair

## Details
Inspired by Balmain’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair created “Les Accessoires”, an iconic hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections.' WHERE "brand" = 'balmain' AND "name" IN ('Pince à Cheveux Extra Small Black/White');
UPDATE "Product" SET "description" = 'A medium-sized handcrafted claw clip made from durable cellulose acetate designed with the Balmain’s signature 18K gold plated “B” logo. The extremely strong yet flexible material is hypoallergenic and gentle to the hair and scalp. Features a sophisticated white ivory edge. The medium clip is specially designed for normal to thick hair and can be used for pulling back the hair into various laid-back hairstyles.

• 18K Gold-plated emblem
• Hypoallergenic hair accessory
• Perfect for normal to thick hair

## Details
Inspired by Balmain’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair created “Les Accessoires”, an iconic hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The medium claw clip of Balmain Hair is an essential French hair accessory especially designed for normal to thick hair. The medium claw clip easily holds all hair together and provides perfect grip on normal to thick hair. Details
Dimensions: Length: 9,30 cm / Width: 3,50 cm / Height: 4,50 cm' WHERE "brand" = 'balmain' AND "name" IN ('Pince à Cheveux Medium Black/White');
UPDATE "Product" SET "description" = 'A large, handcrafted claw clip made of durable cellulose acetate, designed with Balmain''s signature 18K gold-plated "B" logo. The extremely strong yet flexible material is hypoallergenic and gentle on the hair and scalp. Featuring a sophisticated ivory white colour on the edges. The large clip is specially designed for thick and long hair and can be used for pulling back the hair into various laid-back hairstyles.

• 18K Gold-plated emblem
• Hypoallergenic hair accessory
• Perfect for long, thick hair

## Details
Inspired by Balmain’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair created “Les Accessoires”, an iconic hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The large claw clip of Balmain Hair is an essential French hair accessory especially designed for long, thick hair. The large claw clip easily holds all hair together and provides perfect grip on long, thick hair.' WHERE "brand" = 'balmain' AND "name" IN ('Pince à Cheveux Large Black/White');
UPDATE "Product" SET "description" = 'The Ginger 1974 Hair Perfume blends spicy ginger, invigorating fir balsam, rich gourmand notes, soft suede, and clean white musk to create a unique, warm, and irresistible fragrance. It leaves the hair smelling perfect all day while nourishing and protecting.

• Unisex fragrance
• Nourish and Protect
• Deep sensual spicy and sensual amber

## Details
Each hair perfume is designed to provide a unique and alluring scent that will enhance your hair''s essence while nourishing and protecting it. The hair perfume Ginger 1974 is an alluring hair fragrance featuring a blend of spicy ginger, invigorating fir balsam, rich gourmand notes, soft suede, and clean white musk. It''s perfect for those who embrace their mysterious and sensual sides. They are confident, sophisticated individuals who enjoy indulging in luxurious and unique fragrances. With its spicy, gourmand, and sensual accords, it''s the perfect choice for those who want to leave an enigmatic and alluring impression wherever they go.

## Ingredients
Alcohol Denat, Parfum, Aqua, Benzoic Acid, Limonene, Linalool, Hydrolyzed Silk, Isoeugenol, Geraniol, Citral, CI 17200, Argania Spinosa Kernel Oil, Ci 14700, Ethylhexyl Methoxycinnamate' WHERE "brand" = 'balmain' AND "name" IN ('Hair Parfume Ginger 15ml', 'Hair Perfume Ginger 15ml');
UPDATE "Product" SET "description" = 'The Cardamom 1974 Hair Perfume features a blend of cardamom, lemon, vanilla, and blackcurrant, creating a unique combination that offers a warm, sweet, and uplifting fragrance. It will leave the hair smelling perfect all day long while nourishing, repairing, and protecting it.

• Unisex fragrance
• Nourish and Protect
• Flowery vanilla with some rose undertones

## Details
Each hair perfume is designed to provide a unique and alluring scent that will enhance your hair''s essence while nourishing and protecting it. The hair perfume Cardamom 1974 is a delicate hair mist with the perfect blend of rich cardamom, fresh lemon, comforting vanilla, and fruity blackcurrant. A unisex fragrance with a slightly more feminine side. It’s perfect for those who appreciate complexity, sophistication, and a balanced fragrance. With its harmonious blend of freshness, warmth, and sensuality, this perfume is a perfect choice for those who seek an exquisite and captivating scent experience.

## Ingredients
Alcohol Denat, Parfum, Aqua, Benzoic Acid, Limonene, Linalool, Hydrolyzed Silk, Citral, Eugenol, Citronellol, CI 19140, Argania Spinosa Kernel Oil, CI 14700, Ethylhexyl Methoxycinnamate.' WHERE "brand" = 'balmain' AND "name" IN ('Hair Parfume Cardamon 15ml', 'Hair Perfume Cardamom 15ml');
UPDATE "Product" SET "description" = 'The Vetiver 1974 Hair Perfume features a blend of grapefruit, delicate florals, earthy vetiver, grounding cedarwood, and nourishing balsams, creating a unique combination that offers a bright, fresh, and grounding fragrance. It will leave the hair smelling perfect all day long while nourishing, repairing, and protecting it.

• Unisex fragrance
• Nourish and Protect
• Sharp, fresh, and sweet

## Details
Each hair perfume is designed to provide a unique and alluring scent that will enhance your hair''s essence while nourishing and protecting it. The hair perfume Vetiver 1974 is an invigorating hair mist crafted with a blend of grapefruit, delicate florals, earthy vetiver, grounding cedarwood, and nourishing balsams. It’s perfect for those who embrace their confident and charismatic nature, appreciates elegance and refinement, and enjoys the interplay of vibrant freshness, floral grace, and warm sensuality. A unisex scent with a slightly more masculine side This perfume complements their personality and adds a touch of enchantment to their everyday life.

## Ingredients
Alcohol Denat, Parfum, Aqua, Benzoic Acid, Limonene, Benzyl Benzoate, Coumarin, Citronellol, Linalool, Hydrolyzed Silk, Geraniol, Citral, Eugenol, CI 42090, CI 14700, Argania Spinoza Kernel Oil, Ethylhexyl Methoxycinnamate' WHERE "brand" = 'balmain' AND "name" IN ('Hair Parfume Vetiver 15ml', 'Hair Perfume Vetiver 15ml');
UPDATE "Product" SET "description" = 'The Revitalizing Care Set contains three products from the Revitalizing Care Line that provide an intensely nourishing treatment and care of the hair. It includes the Revitalizing Shampoo, Conditioner and Mask. The revitalizing formula strengthens and restores hair vitality from within without weighing down the hair. The formula is paraben free and suitable for dry, damaged and over-treated hair. Enriched with the signature Balmain fragrance, this Revitalizing Care set provides the ultimate spa experience and deeply nourished, shiny locks.' WHERE "brand" = 'balmain' AND "name" IN ('Revitalizing Care Set');
UPDATE "Product" SET "description" = 'The Limited Edition Printemps Leaf Barrette is a charming accessory inspired by the natural world. With its elegant design and 18K gold plating, it beautifully represents the delicate shapes of leaves and vines. This versatile barrette is a perfect addition to any outfit, whether styled with casual tousled locks or used to enhance a polished updo. Ideal for various occasions, it offers a unique touch for those wanting to elevate their style. Simply slide it in to add a refined detail to any look.

Details

Dimensions: Length: 8,90 cm / Width: 1,10 cm / Height: 3,60 cm' WHERE "brand" = 'balmain' AND "name" IN ('Printemps Leaf Barrette', 'Printems Leaf Barrette');
UPDATE "Product" SET "description" = 'The Balmain Homme Sculpting Wax is perfect for creating hairlooks with a natural matt finish and a medium hold. The light weight formula helps to sculpt and densify each hair strand to have a voluminous hairlook as a result.

Ingredients

Aqua, Ceteareth-30. Cera Flava, Petrolatum, VP/VA Copolymer, Microcrystalline Wax, Propylene Glycol, Parfum, Paraffinum Liquidum, Isopropyl Myristate, Glycerin, Lanolin, Cetearyl Alcohol, PVP, Hydrolyzed Keratin, Silk Amino Acids, Piroctone Olamine, Phenoxyethanol, Ethylhexylglycerin, Sodium Polyacrylate, Hydrogenated Polydecene, Benzyl Salicylate, Citronellol, Coumarin, Limonene, Linalool, Trideceth-6, Sorbic Acid, Benzoic Acid' WHERE "brand" = 'balmain' AND "name" IN ('Sculpting Wax 100 ml');
UPDATE "Product" SET "description" = 'The Balmain Hair Couture professional backcomb brush is made of 100% boar hair. The narrow brush is ideal for teasing the hair without making knots. Designed with a pointed handle to easily section the hair. The natural properties of the boar hair bristles help to condition the hair by carrying sebum from the scalp to the end of the hair shaft. Sebum works like a natural anti-frizz serum that repairs dry hair and adds lustrous shine.' WHERE "brand" = 'balmain' AND "name" IN ('Boar Hair Backcomb Brush');
UPDATE "Product" SET "description" = 'The Cardamom 1974 Hair Perfume features a blend of cardamom, lemon, vanilla, and blackcurrant, creating a unique combination that offers a warm, sweet, and uplifting fragrance. It will leave the hair smelling perfect all day long while nourishing, repairing, and protecting it.

• Unisex fragrance
• Nourish and Protect
• Flowery vanilla with some rose undertones

## Details
Each hair perfume is designed to provide a unique and alluring scent that will enhance your hair''s essence while nourishing and protecting it. The hair perfume Cardamom 1974 is a delicate hair mist with the perfect blend of rich cardamom, fresh lemon, comforting vanilla, and fruity blackcurrant. A unisex fragrance with a slightly more feminine side. It’s perfect for those who appreciate complexity, sophistication, and a balanced fragrance. With its harmonious blend of freshness, warmth, and sensuality, this perfume is a perfect choice for those who seek an exquisite and captivating scent experience.

## Ingredients
Alcohol Denat, Parfum, Aqua, Benzoic Acid, Limonene, Linalool, Hydrolyzed Silk, Citral, Eugenol, Citronellol, CI 19140, Argania Spinosa Kernel Oil, CI 14700, Ethylhexyl Methoxycinnamate.' WHERE "brand" = 'balmain' AND "name" IN ('Hair Parfume Cardamon 100ml', 'Hair Perfume Cardamom 100ml');
UPDATE "Product" SET "description" = 'A hair lightener enriched with violet hues to create permanent ash blonde tones in highlighted, blonde or color-treated hair. The leave-in formula with deep purple tone, improves clarity and tone and reduces unwanted brassy tones.

• Neutralises yellow and warm tones in the hair
• Permanent effect
• Non-aggravating, leave-in formula

## Ingredients
Aqua, Alcohol Denat., Peg-7 Glyceryl Cocoate, Glycerin, Argania Spinosa Kernel Extract, Silk Amino Acids, Panthenol, Stearamidopropyl Dimethylamine, Cetrimonium Chloride, Ethylhexyl Methoxycinnamate, Benzophenone-4, Butylene Glycol, Parfum, Lactic Acid, Phenoxyethanol, Ethylhexylglycerin, Basic Blue 99, Basic Red 51, Benzoic Acid' WHERE "brand" = 'balmain' AND "name" IN ('Ash Toner');
UPDATE "Product" SET "description" = 'An extra small, handcrafted claw clip with Balmain''s 18K gold-plated "B" logo, made from durable hypoallergenic cellulose acetate. The Pince à cheveux Extra Small Tortoise is ideal for thin to fine hair and can easily sweep loose tresses away from the face.

• 18K gold-plated emblem
• Hypoallergenic hair accessory
• Perfect for thin and fine hair

## Details
Inspired by Balmain’s rich couture heritage and crafted using only the finest materials, artisans, and designs, Balmain Hair created ''Les Accessoires,'' an iconic hair accessory line. The hairpieces in the ''Les Accessoires'' collection are entirely handcrafted using traditional techniques, each featuring the signature golden detailing—a design element consistent across all Balmain Paris collections. The Pince à Cheveux Extra Small Tortoise features a unique elastic system in the clip that ensures the accessory stays firmly in place, preventing slipping. The elastic also ensures that the hair is pressed together, further preventing the clip from slipping. Therefore, the clip is suitable for all hair types, both thin and thick. The extra small claw clip by Balmain Hair is an essential French hair accessory, specifically designed for thin, fine hair, effortlessly sweeping loose tresses away from the face. Details Dimensions: Length: 4 cm / Width: 2,70 cm / Height: 3 cm' WHERE "brand" = 'balmain' AND "name" IN ('Pince a Cheveux XS Tortoise');
UPDATE "Product" SET "description" = 'The Limited Edition Pince à Cheveux Extra Small Pearl is inspired by the timeless elegance of the Anniversary pearl pattern. This hair clip is handcrafted using traditional techniques and adorned with Balmain''s signature 18K gold-plated "B" logo. Made from durable cellulose acetate, the clip is both flexible and gentle on your hair and scalp. It features a unique elastic system inside that ensures the clip stays securely in place. The extra small clip is specially designed for all hair types and can be used for pulling back the hair into various laid-back hairstyles.

Details

Dimensions: Length: 4 cm / Width: 2,70 cm / Height: 3 cm' WHERE "brand" = 'balmain' AND "name" IN ('Pince a Cheveux XS Pearl');
UPDATE "Product" SET "description" = 'The Limited Edition Pince à Cheveux Medium Pearl is inspired by the timeless elegance of the Anniversary pearl pattern. This hair clip is handcrafted using traditional techniques and adorned with Balmain''s signature 18K gold-plated "B" logo. Made from durable cellulose acetate, the clip is both flexible and gentle on your hair and scalp. It features a unique elastic system inside that ensures the clip stays securely in place, regardless of your hair type. Ideal for normal to thick hair, this clip makes it easy to create elegant updos or a classic French twist.

Details

Dimensions: Length: 9,30 cm / Width: 3,50 cm / Height: 4,50 cm' WHERE "brand" = 'balmain' AND "name" IN ('Pince a Cheveux Medium Pearl');
UPDATE "Product" SET "description" = 'A medium, handcrafted claw clip made of durable cellulose acetate, designed with Balmain''s signature 18K gold-plated "B" logo. The extremely strong yet flexible material is hypoallergenic and gentle on the hair and scalp. The combination of different colors adds a unique and dynamic element to your overall look. The medium clip is specially designed for normal to thick hair and can be used for pulling back the hair into various laid-back hairstyles.

• 18K Gold-plated emblem
• Hypoallergenic hair accessory
• Perfect for normal to thick hair

## Details
Inspired by Balmain’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair Couture created “Les Accessoires”, an iconic hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The medium claw clip of Balmain Hair is an essential French hair accessory especially designed for normal to thick hair. The medium claw clip easily holds all hair together and provides perfect grip on normal to thick hair.' WHERE "brand" = 'balmain' AND "name" IN ('Pince a Cheveux Medium White Black');
UPDATE "Product" SET "description" = 'A large, handcrafted claw clip made of durable cellulose acetate, designed with Balmain''s signature 18K gold-plated "B" logo. The extremely strong yet flexible material is hypoallergenic and gentle on the hair and scalp. The combination of a white body with a black edge creates a striking contrast, which can add a touch of elegance and sophistication to various hairstyles. The large clip is specially designed for thick and long hair and can be used for pulling back the hair into various laid-back hairstyles.

• 18K Gold-plated emblem
• Hypoallergenic hair accessory
• Perfect for long, thick hair

## Details
Inspired by Balmain’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair created “Les Accessoires”, an iconic hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections. The large claw clip of Balmain Hair is an essential French hair accessory especially designed for long, thick hair. The large claw clip easily holds all hair together and provides perfect grip on long, thick hair.' WHERE "brand" = 'balmain' AND "name" IN ('Pince a Cheveux Large White Black');
UPDATE "Product" SET "description" = 'An oversized handcrafted claw clip made from durable cellulose acetate, featuring Balmain''s signature 18K gold-plated ''B'' logo. It showcases a sophisticated white clip with a black edge. Specifically designed for long and thick hair, it''s perfect for securing hair in a messy bun or a high ponytail.

• Revolutionary clip mechanism
• Holds 3x more hair
• For long and thick hair

## Details
The Pince à Cheveux Imperiale is perfect for securing a messy bun or a high ponytail, specifically designed for long and thick hair as it holds three times more hair than the Balmain Hair Pince à Cheveux Large. This claw clip features a revolutionary mechanism: a unique elastic system inside the clip ensures that the accessory stays firmly in place without slipping. The elastic effectively gathers the hair together, preventing the clip from sliding. Therefore, the clip is suitable for all hair types, whether thin or thick. Additionally, the closure is elegantly concealed with acetate material. Details Dimensions: Length: 6,50 cm / Width: 5 cm / Height: 4,80 cm' WHERE "brand" = 'balmain' AND "name" IN ('Pince a Cheveux Imperiale White/Black');
UPDATE "Product" SET "description" = 'An oversized handcrafted claw clip made from durable cellulose acetate, featuring Balmain''s signature 18K gold-plated ''B'' logo. It showcases a sophisticated white ivory edge. Specifically designed for long and thick hair, it''s perfect for securing hair in a messy bun or a high ponytail.

• Revolutionary clip mechanism
• Holds 3x more hair
• For long and thick hair

## Details
The Pince à Cheveux Imperiale is perfect for securing a messy bun or a high ponytail, specifically designed for long and thick hair as it holds three times more hair than the Balmain Hair Pince à Cheveux Large. This claw clip features a revolutionary mechanism: a unique elastic system inside the clip ensures that the accessory stays firmly in place without slipping. The elastic effectively gathers the hair together, preventing the clip from sliding. Therefore, the clip is suitable for all hair types, whether thin or thick. Additionally, the closure is elegantly concealed with acetate material. Details Dimensions: Length: 6,50 cm / Width: 5 cm / Height: 4,80 cm' WHERE "brand" = 'balmain' AND "name" IN ('Pince a Cheveux Imperiale Black/White');
UPDATE "Product" SET "description" = 'An oversized handcrafted claw clip made from durable cellulose acetate, featuring Balmain''s signature 18K gold-plated ''B'' logo in the color tortoise shell. Specifically designed for long and thick hair, it''s perfect for securing hair in a messy bun or a high ponytail

• Revolutionary clip mechanism
• Holds 3x more hair
• For long and thick hair

## Details
The Pince à Cheveux Imperiale is perfect for securing a messy bun or a high ponytail, specifically designed for long and thick hair as it holds three times more hair than the Balmain Hair Pince à Cheveux Large. This claw clip features a revolutionary mechanism: a unique elastic system inside the clip ensures that the accessory stays firmly in place without slipping. The elastic effectively gathers the hair together, preventing the clip from sliding. Therefore, the clip is suitable for all hair types, whether thin or thick. Additionally, the closure is elegantly concealed with acetate material. Details Dimensions: Length: 6,50 cm / Width: 5 cm / Height: 4,80 cm' WHERE "brand" = 'balmain' AND "name" IN ('Pince a Cheveux Imperiale Tortoise');
UPDATE "Product" SET "description" = '## Details
This headband is handmade from high-quality Napa leather and embellished with the iconic 18K gold-plated signature element. The interior is lined with soft nubuck leather for an elegant finish and added grip to keep the headband in place throughout the day. The puffed silhouette adds a sophisticated touch to any hairstyle, making it a versatile and stylish accessory for various occasions, from casual outings to formal events.

Details

Dimensions: Length: 17,50 cm / Width: 7 cm / Height: 18,50cm' WHERE "brand" = 'balmain' AND "name" IN ('White Puffed Leather Headband FW24');
UPDATE "Product" SET "description" = 'A small handcrafted headband made from durable cellulose acetate designed with the Balmain’s signature 18K gold plated “B” logo. Featuring a sophisticated ivory white colour on the edges. The extremely strong yet flexible material is hypoallergenic and gentle to the hair and scalp.

• 18K Gold-Plated emblem
• Gentle on the hair and scalp
• Perfect for all hair types

## Details
The handcrafted headbands are made of durable cellulose acetate and designed with Balmain''s signature 18K gold-plated ''B'' logo. This extremely strong yet flexible material is hypoallergenic and gentle on the hair and scalp. Moreover, they feature an anti-slip system to ensure a secure fit while worn. These headbands effortlessly complement both casual and dressy outfits, instantly elevating your overall style with a delicate, feminine look.' WHERE "brand" = 'balmain' AND "name" IN ('Acetate Headband Black/White');
UPDATE "Product" SET "description" = 'A small handcrafted headband made from durable cellulose acetate designed with the Balmain’s signature 18K gold plated “B” logo. Featuring a sophisticated black colour on the edges. The extremely strong yet flexible material is hypoallergenic and gentle to the hair and scalp.

• 18K Gold-plated emblem
• Gentle on the hair and scalp
• Perfect for all hair types

## Details
The handcrafted headbands are made of durable cellulose acetate and designed with Balmain''s signature 18K gold-plated ''B'' logo. This extremely strong yet flexible material is hypoallergenic and gentle on the hair and scalp. Moreover, they feature an anti-slip system to ensure a secure fit while worn. These headbands effortlessly complement both casual and dressy outfits, instantly elevating your overall style with a delicate, feminine look.' WHERE "brand" = 'balmain' AND "name" IN ('Acetate Headband White/Black');
UPDATE "Product" SET "description" = 'A small handcrafted headband, colored in tortoise shell, is made from durable cellulose acetate and designed with Balmain''s signature 18K gold-plated ''B'' logo. The extremely strong yet flexible material is hypoallergenic and gentle on the hair and scalp.

• 18K Gold-plated emblem
• Gentle on the hair and scalp
• Perfect for all hair types

## Details
The handcrafted headbands are made of durable cellulose acetate and designed with Balmain''s signature 18K gold-plated ''B'' logo. This extremely strong yet flexible material is hypoallergenic and gentle on the hair and scalp. Moreover, they feature an anti-slip system to ensure a secure fit while worn. These headbands effortlessly complement both casual and dressy outfits, instantly elevating your overall style with a delicate, feminine look.' WHERE "brand" = 'balmain' AND "name" IN ('Acetate Headband Tortoise');
UPDATE "Product" SET "description" = 'The Cardamom 1974 Hair Perfume features a blend of cardamom, lemon, vanilla, and blackcurrant, creating a unique combination that offers a warm, sweet, and uplifting fragrance. It will leave the hair smelling perfect all day long while nourishing, repairing, and protecting it.

• Unisex fragrance
• Nourish and Protect
• Flowery vanilla with some rose undertones

## Details
Each hair perfume is designed to provide a unique and alluring scent that will enhance your hair''s essence while nourishing and protecting it. The hair perfume Cardamom 1974 is a delicate hair mist with the perfect blend of rich cardamom, fresh lemon, comforting vanilla, and fruity blackcurrant. A unisex fragrance with a slightly more feminine side. It’s perfect for those who appreciate complexity, sophistication, and a balanced fragrance. With its harmonious blend of freshness, warmth, and sensuality, this perfume is a perfect choice for those who seek an exquisite and captivating scent experience.

## Ingredients
Alcohol Denat, Parfum, Aqua, Benzoic Acid, Limonene, Linalool, Hydrolyzed Silk, Citral, Eugenol, Citronellol, CI 19140, Argania Spinosa Kernel Oil, CI 14700, Ethylhexyl Methoxycinnamate.' WHERE "brand" = 'balmain' AND "name" IN ('Hair Parfume Cardamon 100 ml', 'Hair Perfume Cardamom 100 ml');
UPDATE "Product" SET "description" = 'Inspired by the subtle shimmer of the night sky, this barrette pairs modern design with understated elegance. Made of durable hypoallergenic cellulose acetate in an elegant sapphire blue, the barrette offers lasting resilience with a gentle sparkle. It features a sleek gold-tone clasp to hold your hair securely in place and is adorned with the iconic 18K gold-plated Balmain ''B'' logo. Its versatile sapphire hue complements any ensemble, whether casual or formal.

Details

Dimensions: Length 1,70 cm / Width: 9,20cm / Height: 1,20cm' WHERE "brand" = 'balmain' AND "name" IN ('Barrette Pour Cheveux Medium Cosmic Sapphire');
UPDATE "Product" SET "description" = 'The Moisturizing Care Set is ideal for keeping your hair moisturized. This set consists of the Moisturizing Shampoo, Conditioner, and Mask to help replenish moisture, improve softness, and boost overall hair health. It also includes a Scalp Massage Tool to promote healthy hair growth and relaxation.

Including scalp massage tool

Three full-size Moisturizing products

Nourishes dry and damaged hair' WHERE "brand" = 'balmain' AND "name" IN ('Moisturizing Care Set');
UPDATE "Product" SET "description" = 'Handcrafted cellulose acetate Pince àCheveuxExtra Small in a refined Midnight Black shade, finished with the signature 18K gold-plated “B” logo for a timeless and elegant look.

• Strong, flexible and gentle on hair and scalp
• Extra small size ideal for fine sections and detail styling
• Lightweight and compact design
• Limited Edition

## Details
The Limited Edition Pinces à Cheveux Extra Small Midnight Black is handcrafted from high-quality cellulose acetate and designed in a deep midnight black shade with a subtle reflective pattern that catches the light from different angles. This layered effect adds depth and dimension to the compact design while maintaining a refined and timeless appearance.

Its extra small size makes it ideal for securing fine sections of hair or creating subtle, precise styling accents. The strong yet flexible material ensures a comfortable and secure hold, while remaining gentle on the hair and scalp. Lightweight and compact, the clip is perfect for effortless styling throughout the day. Finished with the signature 18K gold-plated “B” logo, it adds a polished and sophisticated touch to any hairstyle.' WHERE "brand" = 'balmain' AND "name" IN ('Limited Edition Pinces à Cheveux Extra Small Midnight Black');
UPDATE "Product" SET "description" = 'Handcrafted cellulose acetate Pince àCheveuxMedium in a refined Midnight Black shade, finished with the signature 18K gold-plated “B” logo for a timeless and elegant look.

• Strong, flexible and gentle on hair and scalp
• Medium size suitable for versatile styling
• Limited Edition

## Details
The Limited Edition Pinces à Cheveux Medium Midnight Black is handcrafted from high-quality cellulose acetate and designed in a deep midnight black shade with a subtle reflective pattern that catches the light from different angles. This layered effect adds depth and dimension to the clip while maintaining a refined and timeless appearance

The medium size offers versatility, making it suitable for a wide range of hairstyles, from effortless half-up looks to more structured updos. The strong yet flexible material ensures a comfortable and secure hold throughout the day, while remaining gentle on the hair and scalp. Finished with the signature 18K gold-plated “B” logo, the clip adds a polished and sophisticated accent to any hairstyle..' WHERE "brand" = 'balmain' AND "name" IN ('Limited Edition Pinces à Cheveux Medium Midnight Black');
UPDATE "Product" SET "description" = 'Luxury Spa Brush with 100% boar bristles designed to create a smooth, high-gloss finish. The unique bristle structure helps distribute natural oils from roots to ends for healthy-looking hair.

• Limited edition
• Ideal for all hair types, including thin / fine hair
• Creates a high gloss professional finish

## Details
The Limited Edition Legacy Spa Brush is crafted with 100% boar bristles to enhance the natural shine and condition of the hair. The bristle structure helps distribute the hair’s natural oils evenly from roots to ends, supporting a smooth and polished finish. Designed for daily use, the brush glides effortlessly through the hair while remaining gentle on both hair and scalp. This limited edition, in a striking transformative teal shade, brings a subtle touch of luxury to any hair care ritual.' WHERE "brand" = 'balmain' AND "name" IN ('Limited Edition legacy Spa Brush');
UPDATE "Product" SET "description" = 'Limited Edition Midnight Black Crown Barrette designed to add a bold and playful touch to half-up styles and modern updos.

• 18K gold-plated and Lead Glass
• Limited Edition
• Suitable for all hair types

## Details
The Limited Edition Midnight Black Barrette embodies timeless sophistication, featuring faceted lead glass that reflects light with a subtle, mysterious shimmer. Its deep midnight black lead glass brings refined contrast, adding a bold yet elegant statement to any hairstyle. Perfect for sleek ponytails, chic updos or to elevate everyday looks with a touch of modern luxury.' WHERE "brand" = 'balmain' AND "name" IN ('Limited Edition Midnight Black Barrette');
UPDATE "Product" SET "description" = '18K gold-plated Limited Edition Midnight Black Clip featuring faceted lead glass stones in a feather-inspired design that reflects light from every angle.

• 18K gold-plated and Lead Glass
• Limited Edition
• Suitable for all hair types

## Details
The Limited Edition Midnight Black Clip is crafted with faceted lead glass stones that capture and reflect the light from every angle, creating a refined midnight black brilliance. The feather-inspired design enhances this effect, allowing the light to subtly move across the surface for a dynamic and elegant finish.

Its compact yet striking silhouette offers a versatile styling accent, adding depth, shine and a touch of modern luxury to any hairstyle. Designed to be both decorative and functional, the clip provides a secure hold while elevating the overall look with understated sophistication.' WHERE "brand" = 'balmain' AND "name" IN ('Limited Edition Midnight Black Clip');
UPDATE "Product" SET "description" = 'Handcrafted 18K gold-plated headband with polished lead glass stones, adding a sophisticated statement to any hairstyle.

• 18K gold-plated and Lead Glass
• Limited Edition
• Suitable for all hair types

## Details
A sophisticated statement hair accessory. The small, handcrafted 18K gold-plated headband features polished lead glass stones that beautifully catch and reflect the light. Inspired by Midnight Black, it embodies modern elegance and timeless luxury. Includes a polishing cloth to keep the accessory in perfect condition.' WHERE "brand" = 'balmain' AND "name" IN ('Limited Edition Midnight Black Headband');
UPDATE "Product" SET "description" = 'Set oftwo 18K gold-plated slide pins with faceted lead glass stones, adding a refined and versatile accent to any hairstyle.

• 18K gold-plated and Lead Glass
• Limited Edition
• Suitable for all hair types

## Details
The Limited Edition Midnight Black Duo Slide Pins consist of a refined set of two 18K gold-plated hair pins, each adorned with faceted lead glass stones and the signature Balmain “B” logo. Designed to catch and reflect the light, the pins add a subtle yet sophisticated accent to any hairstyle.

The duo can be worn together for a more defined look or separately for a minimal and understated finish. Lightweight and easy to style, the pins provide a secure hold while enhancing both daily and evening hairstyles with a touch of modern elegance.' WHERE "brand" = 'balmain' AND "name" IN ('Limited Edition Midnight Black Slides Pins');
UPDATE "Product" SET "description" = '## Details
The Limited Edition Acetate Headband is handcrafted from high-quality acetate, a solid yet flexible material that makes the accessory hypoallergenic and gentle on the hair and scalp. Featuring an anti-slip system to ensure a secure fit while being worn and the black Balmain logo on the side of the headband. This headband not only boasts durability but also showcases a sleek and polished finish, making it a versatile accessory that complements any outfit.

Details

Dimensions: Length:' WHERE "brand" = 'balmain' AND "name" IN ('Limited Edition Acetate Headband Large FW24');
UPDATE "Product" SET "description" = '## Details
This headband is handmade from high-quality Napa leather and embellished with the iconic 18K gold-plated signature element. The interior is lined with soft nubuck leather for an elegant finish and added grip to keep the headband in place throughout the day. The puffed silhouette adds a sophisticated touch to any hairstyle, making it a versatile and stylish accessory for various occasions, from casual outings to formal events.

Details

Dimensions: Length: 17,50 cm / Width: 7 cm / Height: 18,50cm' WHERE "brand" = 'balmain' AND "name" IN ('Limited Edition White Leather Puffed Headband');
UPDATE "Product" SET "description" = '## Details
Inspired by the house’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair Couture created a luxury hair accessory line. Every single hair jewel within the collection is entirely handcrafted by using traditional techniques and features the signature golden detailing.' WHERE "brand" = 'balmain' AND "name" IN ('Gold Plated Hair Slide Logo');
UPDATE "Product" SET "description" = '## Details
Inspired by the house’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair Couture created a luxury hair accessory line. Every single hair jewel within the collection is entirely handcrafted by using traditional techniques and features the signature golden detailing.' WHERE "brand" = 'balmain' AND "name" IN ('Limited Edition Pont des Arts Hair Clip Large FW22');
UPDATE "Product" SET "description" = '## Details
Inspired by the house’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair Couture created a luxury hair accessory line. Every single hair jewel within the collection is entirely handcrafted by using traditional techniques and features the signature golden detailing.' WHERE "brand" = 'balmain' AND "name" IN ('Limited Edition Headband FW22');
UPDATE "Product" SET "description" = '## Details
Inspired by the house’s rich couture heritage and relying on nothing but the finest materials, craftsmen and design, Balmain Hair created “Les Accessoires”, a luxury hair accessory line. The hairpieces in the “Les Accessoires” collection are entirely handcrafted by using traditional techniques. Every single item in this collection features the signature golden detailing. This returning design element can be found in all Balmain Paris collections.' WHERE "brand" = 'balmain' AND "name" IN ('Riviera Headband Cognac Large');
UPDATE "Product" SET "description" = '## Details
The Silver Headband is one of Balmain Hair ''s essential hair accessories. The headband is handcrafted and made from the finest quality Napa leather, embellished with an 18K gold-plated logo. To provide extra grip on the hair, the inside of the hairband has been designed with nubuck. This statement piece transforms the simplest of hairstyles into classy looks.
A polishing cloth is included to keep the accessory in good condition.' WHERE "brand" = 'balmain' AND "name" IN ('Leather Headband Large Silver');
UPDATE "Product" SET "description" = '## Details
The medium-sized Barrette Pour Cheveux is a stunning and luxurious hair accessory that is sure to elevate any hairstyle. Handcrafted with the utmost care and attention to detail, it becomes a truly special piece. Plated with 18k gold, the barrette exudes a beautiful and sophisticated shine that captures attention. Its slim and rectangular silhouette showcases an elegant and modern design, making it perfect for half updo''s. It also includes a polishing cloth to help keep the accessory in perfect condition.' WHERE "brand" = 'balmain' AND "name" IN ('Barrette Pour Cheveux Medium Silver/Gold');
UPDATE "Product" SET "description" = 'Perfect for traveling and backstage work. Provides quick effortless straightening and easy curls and waves. The advanced titanium floating plate technology gives the hair a silky, shiny and healthy finish.

• Lightweight, travel size straightener
• Portable straightener
• 3 preset heat settings (ranging from 160°C /320°F to 200 °C/ 392 °F)

## Details
The lightweight Cordless Straightener is the perfect tool for quick, effortless straightening and easy curls and waves. The advanced titanium floating plate technology delivers the ultimate styling results with a smooth, polished and healthy finish. Heats up to 200 °C/ 392 F. Advanced titanium floating plate technology glides easily through the hair and provides for constant and even heat distribution. Contains LED with different colours to indicate the temperature (Blue LED indicates 160°C/320°F, Green LED indicates 180°C/356°F, Red LED indicates 200°C/ 392°F). Note: The tool switches off automatically after 30 minutes. Weighs 247 grams (including case: 622 grams).' WHERE "brand" = 'balmain' AND "name" IN ('Limited Edition Cordless Straightener');
UPDATE "Product" SET "description" = '## Details
The Limited Edition Pearl Hair Clip is an 18K gold-plated hair clip inspired by Balmain''s iconic runway looks. The clip''s mechanism spreads hair inside, creating a full-bodied Balmain Hair ponytail. A symphony of pearls cascades gracefully along the clip''s curve, complementing various hair colours and making it an ideal accessory for all hair types.

Details

Dimensions: Length: 6 cm / Width: 1,50 cm / Height: 4,50 cm' WHERE "brand" = 'balmain' AND "name" IN ('Limited Edition Pearl Hair Clip Large FW24');
UPDATE "Product" SET "description" = 'Experience the allure of nature with the 18K gold-plated Printemps Leaf Slide. This delicate yet striking design, effortlessly enhances any hairstyle, whether you''re attending a special event or simply elevating your everyday ensemble.

• 18K gold-plated
• Limited Edition
• Suitable for all hair types

## Details
Embrace the beauty of nature with the exquisite 18K gold-plated Printemps Leaf Slide. This stunning hair accessory draws inspiration from the natural world, capturing the elegance and intricacy of flora. The refined leaf design with the iconic "B" logo reflects the delicate beauty of petals and leaves, making it a timeless addition to any hair accessory collection. Perfect for any occasion, this hair accessory is a must-have for those looking to bring a touch of nature’s elegance into their look. Details Dimensions: Length: 7,50 cm / Width: 0,50 cm / Height: 2 cm' WHERE "brand" = 'balmain' AND "name" IN ('Limited Edition Printemps Leaf Slide');
UPDATE "Product" SET "description" = 'Gentle cleansing meets advanced color preservation from the very first wash. This color protecting shampoo effectively removes impurities while helping maintain vibrancy, shine, and softness in color-treated hair.

• Helps preserve color vibrancy
• Protects against free radicals and UV exposure
• Reduces frizz and surface damage of the hair
• Improves the texture and strength of the strands

## Details
Preserve the brilliance of every shade. Éloure''s Color Protecting Shampoo gently cleanses while safeguarding color vibrancy and radiance after every wash. A fine formula containing Sunflower Seed Extract helps protect the hair fiber from UV exposure and free radicals and reduces color fading while maintaining softness and shine. Infused with Éloure''s signature fragrance, the hair is left smelling beautifully.

## Ingredients
Aqua, Sodium Lauroyl Sarcosinate, Glycerin, Cocamidopropyl Betaine, Sodium Cocoyl Isethionate, Capryloyl/Caproyl Methyl Glucamide, Glyceryl Oleate, Dioleyl Phosphate, Lauroyl/Myristoyl Methyl Glucamide, Oleth-5 Phosphate, Helianthus Annuus (Sunflower) Seed Extract, Guar Hydroxypropyltrimonium Chloride, Coco-Glucoside, Dicaprylyl Ether, Decyl Glucoside, Parfum, Benzyl Salicylate, Limonene, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Propylene Glycol, PEG-150 Pentaerythrityl Tetrastearate, PEG-6 Caprylic/Capric Glycerides, Butylene Glycol, Tocopherol, Hydrogenated Vegetable Glycerides Citrate, Sodium Benzoate, Potassium Sorbate, Benzoic Acid, Sodium Chloride, Citric Acid.' WHERE "brand" = 'eloure' AND "name" IN ('Colour Protecting Shampoo - 250 ml');
UPDATE "Product" SET "description" = 'A deeply nourishing shampoo that helps lock in moisture from the root, calming sensitivity while leaving the hair soft, supple, and beautifully balanced.

• Ensures deep, long-lasting hydration up to 72 hours
• Leaves the hair healthy and silky smooth
• Restores the scalp barrier
• Adds luminous shine without residue or heaviness

## Details
Cleanse with precision while nourishing hair to lasting radiance. Éloure''s Moisturizing Shampoo hydrates the hair and scalp, supporting long-term moisture balance. A delicate infusion of Red Poppy Extract and Pentavitin helps soothe the scalp, strengthen the scalp barrier, and lock in hydration for soft, healthy-looking hair. Paired with our refined fragrance, this shampoo leaves hair clean, luminous, and silky smooth.

## Ingredients
Aqua, Glycerin, Sodium Lauroyl Sarcosinate, Cocamidopropyl Betaine, Sodium Cocoyl Isethionate, Capryloyl/Caproyl Methyl Glucamide, Coco-Glucoside, Glyceryl Oleate, Lauroyl/Myristoyl Methyl Glucamide, Papaver Rhoeas Petal Extract, Citric Acid, Saccharide Isomerate, Guar Hydroxypropyltrimonium Chloride, Sodium Chloride, Propylene Glycol, Potassium Sorbate, Sodium Benzoate, Parfum, Benzyl Salicylate, Limonene, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Sodium Citrate, Hydrogenated Vegetable Glycerides Citrate, Tocopherol.' WHERE "brand" = 'eloure' AND "name" IN ('Moisturizing Shampoo - 250 ml');
UPDATE "Product" SET "description" = 'A lightweight cleansing shampoo that builds body and lift while strengthening fine hair, leaving it fuller, refreshed, and visibly thicker without residue or heaviness.

• Adds visible volume and lift to all hair types
• Infused with Pea Peptides to thicken the hair fiber up to 14%
• Gently cleanses without weighing the hair down
• Niacinamide hydrates the hair from within and supports the scalp

## Details
Delivers effortless volume from the very first wash. Éloure''s Volumizing Shampoo gently removes impurities while enhancing body, strength, and movement. A formula enriched with Niacinamide and Pea Peptides helps strengthen the hair fiber, support scalp health, and visibly increase strand thickness. Designed for fine hair, it delivers airy volume and natural fullness without buildup, leaving the hair light, and beautifully balanced, finished with Éloure''s signature fragrance.

## Ingredients
Aqua, Sodium C14-16 Olefin Sulfonate, Cocamidopropyl Betaine, Coco-Betaine, Glycerin, Niacinamide, Pisum Sativum (Pea) Peptide, Capryloyl/Caproyl Methyl Glucamide, Lauroyl/Myristoyl Methyl Glucamide, Sodium Methyl Cocoyl Taurate, Sodium Cocoyl Isethionate, Guar Hydroxypropyltrimonium Chloride, Polyquaternium-67, Propylene Glycol, Allantoin, Sodium Chloride, Potassium Sorbate, Sodium Benzoate, Citric Acid, Parfum, Benzyl Salicylate, Limonene, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Decyl Glucoside, Sorbeth-230 Tetraoleate, Leuconostoc/Radish Root Ferment Filtrate, Sorbitan Laurate.' WHERE "brand" = 'eloure' AND "name" IN ('Volumizing Shampoo - 250 ml');
UPDATE "Product" SET "description" = 'A gentle toning shampoo that neutralizes unwanted yellow tones while cleansing, strengthening, enhancing clarity and shine in blonde, silver, and grey hair.

• Contains plant-based proteins for deep repair
• Enhances brightness and colour clarity
• Gently cleanses without drying out the strands
• Leaves the hair soft, luminous, and balanced

## Details
Illuminate blonde and silver hair with refined tonal balance. Éloure''s Silver Shampoo is formulated with concentrated violet pigments to actively neutralize yellow and brassy tones, restoring cool clarity in blonde, silver, and grey hair. Plant-based proteins reinforce the hair fiber, while conditioning agents smooth the cuticle to enhance brightness and durability of tone. The gentle cleansing system prevents dryness, maintaining softness, strength, and consistent tonal balance with every wash.

## Ingredients
Aqua, Sodium Lauroyl Sarcosinate, Glycerin, Cocamidopropyl Hydroxysultaine, Cocamidopropyl Betaine, Capryloyl/Caproyl Methyl Glucamide, Coco-Glucoside, Glyceryl Oleate, Lauroyl/Myristoyl Methyl Glucamide, Sodium Chloride, Guar Hydroxypropyltrimonium Chloride, Hydrolyzed Vegetable Protein, Hydrolyzed Pea Protein, Acid Violet 43, Quaternium-80, Benzyl Alcohol, Propylene Glycol, Sodium Benzoate, Parfum, Benzyl Salicylate, Limonene, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Potassium Sorbate, Tocopherol, Hydrogenated Vegetable Glycerides Citrate, Citric Acid, PEG-150 Pentaerythrityl Tetrastearate, PEG-6 Caprylic/Capric Glycerides.' WHERE "brand" = 'eloure' AND "name" IN ('Silver Shampoo - 250 ml');
UPDATE "Product" SET "description" = 'Nourishment and protection unite in this color-protecting conditioner to smooth and detangle whilst preserving vibrancy, shine, and strength. Leaving the hair refined, soft, and beautifully scented.

• Helps preserve color vibrancy
• Smooths and seals the hair cuticle to reduce fading
• Protects against free radicals and UV exposure
• Enhances softness, manageability, and shine

## Details
Nourish and protect color-treated hair with refined care. Éloure''s Color Protecting Conditioner smooths and detangles the hair while helping to seal in color vibrancy. Infused with Abyssinian Oil Phytosterol Esters and Sunflower Seed Extract, it helps defend against premature fading, UV exposure, and environmental stress. Natura-Tec Abysoft smooths and refines the hair surface, leaving hair soft, luminous, and beautifully enhanced after every use.

## Ingredients
Aqua, Cetearyl Alcohol, Glycerin, Crambe Abyssinica Seed Oil Phytosterol Esters, Bis-(Isostearoyl/Oleoyl Isopropyl) Dimonium Methosulfate, Stearamidopropyl Dimethylamine, Dioleyl Phosphate, Oleth-5 Phosphate, Helianthus Annuus (Sunflower) Seed Extract, Polyquaternium-22, Polyquaternium-7, Quaternium-91, Cetrimonium Methosulfate, Hydroxyethylcellulose, Parfum, Benzyl Salicylate, Limonene, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Butylene Glycol, Sodium Benzoate, Potassium Sorbate, Phenoxyethanol, Ethylhexylglycerin, Citric Acid.' WHERE "brand" = 'eloure' AND "name" IN ('Colour Protecting Conditioner - 250 ml');
UPDATE "Product" SET "description" = 'Daily hydration and effortless softness are restored from the first use, as this nourishing conditioner replenishes moisture, smooths the hair fiber, and leaves the hair weightless, and easy to detangle.

• Provides deep, long-lasting hydration up to 72 hours
• Helps restore and protect the scalp barrier
• Smooths, softens, and improves manageability
• Adds natural shine without residue or buildup

## Details
Nourish every strand with refined hydration. Éloure''s Moisturizing Conditioner envelops the hair in moisture while maintaining lightness and movement. Infused with Red Poppy Extract, known for its soothing benefits, and Pentavitin, which binds moisture to the strands, this conditioner helps restore balance and softness with every use. Finished with Éloure''s signature fragrance, the hair is left feeling hydrated, polished, and effortlessly elegant.

## Ingredients
Aqua, Cetearyl Alcohol, Glycerin, Propylheptyl Caprylate, Bis-(Isostearoyl/Oleoyl Isopropyl) Dimonium Methosulfate, Shea Butter Ethyl Esters, Stearamidopropyl Dimethylamine, Papaver Rhoeas Petal Extract, Cetrimonium Methosulfate, Quaternium-91, Saccharide Isomerate, Parfum, Benzyl Salicylate, Limonene, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Ethylhexylglycerin, Citric Acid, Phenoxyethanol, Sodium Citrate.' WHERE "brand" = 'eloure' AND "name" IN ('Moisturizing Conditioner - 250 ml');
UPDATE "Product" SET "description" = 'Lightweight volume-boosting conditioner that strengthens fine hair, improves body and lift, leaving the strands soft, full, and weightless with natural movement.

• Enhances volume and lift without heaviness
• Infused with Pea Peptides to thicken the hair fiber up to 14%
• Improves the softness and manageability of the hair
• Niacinamide hydrates the hair from within and supports the scalp

## Details
Refined volume through weightless care. Éloure''s Volumizing Conditioner softens and detangles fine hair while maintaining natural lift and effortless movement. A formula enriched with Niacinamide and Pea Peptides helps strengthen the hair fiber and improve elasticity without weighing down the strands. Designed to deliver excellent conditioning, the hair is left supple, airy, and visibly fuller, with a polished, touchable finish enhanced by Éloure''s signature fragrance.

## Ingredients
Aqua, Cetyl Alcohol, Niacinamide, Pisum Sativum (Pea) Peptide, Quaternium-87, Behentrimonium Chloride, Propylheptyl Caprylate, C10-14 Alkyl Polypropanediol-3 Myristate, Stearamidopropyl Dimethylamine, Dipropylene Glycol, Citric Acid, Hydroxyethylcellulose, Phenoxyethanol, Parfum, Benzyl Salicylate, Limonene, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Ethylhexylglycerin, Propylene Glycol, Leuconostoc/Radish Root Ferment Filtrate.' WHERE "brand" = 'eloure' AND "name" IN ('Volumizing Conditioner - 250 ml');
UPDATE "Product" SET "description" = 'An intensive color-preserving treatment that deeply nourishes, smooths, and restores shine to color-treated hair while helping protect against fading and environmental stress.

• Helps preserve color vibrancy and luminosity
• Deeply nourishes and smooths the hair fiber
• Protects against environmental stress and fading
• Leaves hair soft, glossy, and visibly refined

## Details
Restore colour brilliance with luxurious care. Éloure''s Color Protecting Mask delivers intensive care while helping to maintain vibrancy and shine in color-treated hair. Infused with Abyssinian Oil Phytosterol Esters, Shea Butter, and Sunflower Seed Extract, it helps defend colour pigments against UV exposure and environmental stress. Natura-Tec Abysoft smooths and refines the hair surface, leaving hair deeply nourished, luminous, and beautifully enhanced after every treatment.

## Ingredients
Aqua, Cetearyl Alcohol, Glycerin, Crambe Abyssinica Seed Oil Phytosterol Esters, Quaternium-87, Butyrospermum Parkii Butter, Behentrimonium Chloride, Dioleyl Phosphate, Oleth-5 Phosphate, Helianthus Annuus (Sunflower) Seed Extract, Polyquaternium-22, Quaternium-91, Cetrimonium Methosulfate, Hydroxyethylcellulose, Propylene Glycol, Parfum, Benzyl Salicylate, Limonene, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Dipropylene Glycol, Butylene Glycol, Sodium Benzoate, Potassium Sorbate, Citric Acid, Sodium Hydroxide.' WHERE "brand" = 'eloure' AND "name" IN ('Colour Protecting Mask - 190 ml');
UPDATE "Product" SET "description" = 'Deep hydration and silky radiance are achieved after just one use. This hydrating hair mask nourishes every strand to its core and leaves the hair with a soft, brushable finish.

• Excellent for natural and color-treated hair
• Ensures deep, long-lasting hydration up to 72 hours
• Restores the scalp barrier
• Adds luminous shine without residue or heaviness

## Details
Nourish every strand to luminous vitality. Éloure''s Moisturizing Mask deeply infuses the hair and scalp with lasting hydration, leaving hair smooth, supple, and visibly conditioned. A refined blend of Red Poppy Extract and Pentavitin helps strengthen the scalp barrier, locks in hydration, and supports a healthy foundation for naturally beautiful hair. Paired with our exclusive fragrance, the moisturizing mask leaves the hair beautifully scented.

## Ingredients
Aqua, Cetearyl Alcohol, Glycerin, C10-14 Alkyl Polypropanediol-3 Myristate, Betaine, Behentrimonium Chloride, Butyrospermum Parkii Butter, Dipropylene Glycol, Papaver Rhoeas Petal Extract, Saccharide Isomerate, Bis-(Isostearoyl/Oleoyl Isopropyl) Dimonium Methosulfate, Parfum, Benzyl Salicylate, Limonene, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Phenoxyethanol, Guar Hydroxypropyltrimonium Chloride, Cetrimonium Chloride, Hydroxyethylcellulose, Ethylhexylglycerin, Citric Acid, Sodium Citrate.' WHERE "brand" = 'eloure' AND "name" IN ('Moisturizing Mask - 190 ml');
UPDATE "Product" SET "description" = 'An intensive toning treatment that neutralizes unwanted warm tones, while deeply nourishing blonde, silver, and grey hair, restoring softness, clarity and shine.

• Contains plant-based protein for deep repair
• Enhances cool-toned clarity and brightness
• Deeply nourishes and strengthens the hair fiber
• Leaves the hair soft, smooth, and visibly radiant

## Details
Refine tone while restoring the hair from within. Éloure''s Silver Mask is formulated with concentrated violet red and blue pigments to actively counteract yellow and warm tones while restoring cool clarity in blonde, silver, and grey hair. Plant-based proteins reinforce the hair fiber and improve resilience, while conditioning agents smooth the cuticle for enhanced shine and softness. The rich treatment deeply conditions without heaviness, leaving hair strong, luminous, and consistently cool-toned.

## Ingredients
Aqua, Cetearyl Alcohol, Glycerin, Propylene Glycol, Behentrimonium Chloride, Quaternium-87, Butyrospermum Parkii Butter, Hydrolyzed Vegetable Protein, Hydrolyzed Pea Protein, Polyquaternium-22, Quaternium-91, Cetrimonium Methosulfate, Quaternium-80, Dipropylene Glycol, Hydroxyethylcellulose, Basic Red 76, Basic Brown 17, HC Blue No. 16, Parfum, Benzyl Salicylate, Limonene, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Benzyl Alcohol, Sodium Benzoate, Potassium Sorbate, Dextrin, Sodium Chloride, Citric Acid.' WHERE "brand" = 'eloure' AND "name" IN ('Silver Mask - 190 ml');
UPDATE "Product" SET "description" = 'A concentrated repair serum that nourishes, strengthens, and restores damaged hair. Enhancing softness, shine, and resilience with versatile, multi-use care.

• Nourishes and repairs stressed and damaged hair
• Improves softness, strength, and elasticity of the strands
• Enhances shine and smoothness of the hair
• Can be used as treatment, pre-styling, or mask

## Details
Revitalize the hair through intensive care. Éloure''s Intense Repair Serum is formulated with a highly concentrated blend of nourishing oils to reinforce the hair fiber, improve elasticity, and reduce visible damage. Argan Oil, Broccoli Seed Oil, and Rosehip Extract work together to restore softness, enhance natural shine, and protect against ongoing stress. Designed for flexible use, it strengthens and smooths the hair without weight, leaving it resilient, polished, and visibly restored.

## Ingredients
Argania Spinosa Kernel Oil, Shea Butter Ethyl Esters, Brassica Oleracea Italica Seed Oil, Helianthus Annuus (Sunflower) Seed Oil, Parfum, Rosa Canina Fruit Extract, Benzyl Salicylate, Beta-Caryophyllene, Citral, Coumarin, Limonene, Linalool, Linalyl Acetate, Pinene, Rose Ketones, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Juniperus Virginiana Oil, Tocopherol.' WHERE "brand" = 'eloure' AND "name" IN ('Intense Repair Serum - 30 ml');
UPDATE "Product" SET "description" = 'An advanced weekly treatment that restores the strength, resilience, and vitality of the hair, fortifying bonds and strengthening the hair fiber from within.

• Helps repair and strengthen damaged hair bonds
• Improves the elasticity, body, and resilience of the hair
• Smooths and seals the hair cuticles
• Leaves the hair stronger, healthier, and revitalized

## Details
Reinforce hair at its foundation. Éloure''s Intense Bond-Repair Treatment is formulated to reinforce weakened and damaged hair at a structural level. A conditioning complex smooths and seals the cuticle, while rosehip extract and sunflower seed oil help nourish and protect the fiber. Used weekly, the treatment enhances strength, elasticity, and durability, leaving hair visibly healthier, smoother, and more resistant to damage.

## Ingredients
Aqua, Cetearyl Alcohol, Glycerin, Bis-(Isostearoyl/Oleoyl Isopropyl) Dimonium Methosulfate, Caprylic/Capric Triglyceride, Quaternium-87, Dipalmitoylethyl Hydroxyethylmonium Methosulfate, BIS-4-PCA Dimethicone, Hydroxypropylgluconamide, Hydroxypropylammonium Gluconate, Rosa Canina Fruit Extract, Quaternium-91, Cetrimonium Methosulfate, Polyquaternium-7, Amodimethicone/Morpholinomethyl Silsesquioxane Copolymer, Ceteareth-20, Helianthus Annuus (Sunflower) Seed Oil, Propylene Glycol, Butylene Glycol, Parfum, Benzyl Salicylate, Limonene, Linalyl Acetate, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Juniperus Virginiana Oil, Hydroxyethylcellulose, Disodium PEG-12 Dimethicone Sulfosuccinate, Tocopherol, Sodium Benzoate, Potassium Sorbate, Benzyl Alcohol, Tartaric Acid, Phenoxyethanol, Ethylhexylglycerin, Trideceth-5, Lactic Acid, Aminomethyl Propanol.' WHERE "brand" = 'eloure' AND "name" IN ('Intense Bond-Repair Treatment - 3x20 ml');
UPDATE "Product" SET "description" = 'A versatile root-lifting spray that delivers instant volume, texture,
and hold, creating effortless body and structure with a clean, weightless
finish.

• Instantly lifts the roots to create amplified volume
• Adds refined texture and grip without stiffness
• Provides a long-lasting, lightweight hold
• Leaves the hair full, airy, and beautifully touchable

## Details
Define volume with effortless texture. Éloure’s Texturizing Volume Spray delivers an instant lift and structure at the roots while maintaining natural movement in the strands. Our lightweight formula combines styling polymers with starch-based absorbers to create lasting volume, grip, and definition without heaviness, leaving the hair full-bodied, texturized, and effortlessly styled, finished with Éloure’s signature refined fragrance.

## Ingredients
Butane, Alcohol Denat., Isobutane, Propane, Aluminum Starch Octenylsuccinate, VP/VA Copolymer, Silica, Solanum Tuberosum Starch, Parfum, Tocopherol, Benzophenone-4, Aminomethyl Propanol, Aqua.' WHERE "brand" = 'eloure' AND "name" IN ('Texturizing Volume Spray - 200 ml');
UPDATE "Product" SET "description" = 'An instantly refreshing dry shampoo that absorbs excess oil, enhances volume, and restores a clean, matte finish, leaving hair fresh and revitalized between washes.

• Instantly refreshes hair between washes
• Absorbs product buildup, oils and impurities
• Creates matt textured, full-bodied hair
• Leaves a clean, matte finish without residue

## Details
Refresh hair with refined precision. Éloure''s Dry Shampoo instantly absorbs excess oil and impurities to revive the hair between washes. A lightweight formula uses Starch-Based Absorbers and Silica to refresh the scalp, restore volume, and create a clean, matte finish without visible residue. Ideal for extending blowouts or adding texture, it leaves hair feeling fresh, airy, soft and perfectly balanced, finished with Éloure''s signature fragrance.

## Ingredients
Butane, Isobutane, Alcohol Denat., Propane, Solanum Tuberosum Starch, Aluminum Starch Octenylsuccinate, Hydrated Silica, Isopropyl Myristate, Benzophenone-4.' WHERE "brand" = 'eloure' AND "name" IN ('Dry Shampoo - 300 ml');
UPDATE "Product" SET "description" = 'A luxurious strong hold finishing spray, perfect for long-lasting control, fixation and shape. Locks in body and shine while remaining humidity resistant.

• Strong, lasting hold without stiffness
• Protects shape, structure and finish
• Humidity resistant
• Professional performance, no residue

## Details
Lock in flawless hair. Éloure''s Session Spray Strong delivers a powerful, salon-level finish that keeps hair in place all day. The lightweight micro-fine mist forms a flexible yet firm hold, maintaining structure while leaving hair radiant and touchable. Paired with Éloure''s signature fragrance, this Session Spray Strong elevates every hair style with modern elegance.

## Ingredients
Alcohol Denat., Dimethyl Ether, Acrylates Copolymer, Octylacrylamide/Acrylates/Butylaminoethyl Methacrylate Copolymer, Aminomethyl Propanol, Aqua, PEG-12 Dimethicone, Benzophenone-4, Panthenol, Citric Acid.' WHERE "brand" = 'eloure' AND "name" IN ('Session Spray Strong - 300 ml');
UPDATE "Product" SET "description" = 'A luxurious, medium hold finishing spray that offers reworkable control and humidity resistance. Perfect for long-lasting, styled hair with a smooth, brushable finish.

• Medium, flexible hold without stiffness
• Preserves natural movement and elasticity
• Humidity resistant
• Brushable, touchable texture

## Details
Elevate the finishing ritual. Éloure''s Session Spray Medium is crafted for luxurious, everyday styling. It delivers a reworkable, elegant finish that maintains body and shine whilst allowing natural movement, creating sleek, polished elegance with every finish. Despite its medium hold, it keeps the hair light, soft, and easy to style. Infused with Éloure''s signature fragrance, the hair is left beautifully scented.

## Ingredients
Alcohol Denat., Dimethyl Ether, Acrylates Copolymer, Octylacrylamide/Acrylates/Butylaminoethyl Methacrylate Copolymer, Aminomethyl Propanol, PEG-12 Dimethicone, Aqua, Benzophenone-4, Panthenol, Citric Acid.' WHERE "brand" = 'eloure' AND "name" IN ('Session Spray Medium - 300 ml');
UPDATE "Product" SET "description" = 'A weightless volumizing mousse that delivers luxurious body and airy, long-lasting volume. Leaving the hair fuller, softly defined, and touchable without stiffness.

• Strengthens the hair fiber
• Boosts volume while maintaining a natural finish
• Lightweight texture, no residue or heaviness
• Ideal for fine hair looking for volume

## Details
Elevate your volume routine. Éloure''s Volumizing Mousse defines, thickens and revives the hair from root to end, giving a full-bodied, Parisian-inspired finish. Enriched with a refined blend of Wheat Protein and Rosemary Extract, it strengthens each strand, supports hair health, and enhances resilience. The result is airy, touchable volume, beautifully finished with Éloure''s signature fragrance.

## Ingredients
Aqua, Butane, Propane, Polyquaternium-11, Isobutane, Polyquaternium-16, Polysorbate 20, Laureth-4, Cetrimonium Chloride, Dipropylene Glycol, Bisamino PEG/PPG-41/3 Aminoethyl PG-Propyl Dimethicone, PEG-12 Dimethicone, Phenoxyethanol, Hydrolyzed Wheat Protein PG-Propyl Silanetriol, Benzophenone-4, Betaine, Ethylhexylglycerin, Rosmarinus Officinalis (Rosemary) Leaf Extract, Panthenol, Citric Acid, Sodium Benzoate, Sorbic Acid.' WHERE "brand" = 'eloure' AND "name" IN ('Volumizing Mousse Strong - 300 ml');
UPDATE "Product" SET "description" = 'A luxurious nourishing elixir that smooths, softens, and enhances shine while restoring suppleness and radiance to dry or stressed hair.

• Deeply nourishes and softens the hair
• Enhances shine and smoothness with each strand
• Improves elasticity and manageability
• Leaves the hair silky, luminous, and refined

## Details
Nourish hair with timeless elegance. Éloure''s Nourishing Argan Elixir combines Argan Oil and Sunflower Seed Oil to replenish lipids, improve elasticity, and restore softness. Vitamin E, Beta-Carotene, and Ascorbyl Palmitate provide antioxidant support, while lightweight silicones smooth the hair fiber and enhance shine. The concentrated elixir reduces dryness and frizz, leaving hair supple, luminous, and visibly polished without heaviness.

## Ingredients
Dimethicone, Isopropyl Palmitate, Parfum, Benzophenone-3, Argania Spinosa Kernel Oil, Tetramethyl Acetyloctahydronaphthalenes, Benzyl Salicylate, Citrus Limon Peel Oil, Limonene, Juniperus Virginiana Oil, Linalyl Acetate, Coumarin, Helianthus Annuus Seed Oil, Linalool, Pinene, Tocopherol, Citral, Beta-Caryophyllene, Rose Ketones, Beta-Carotene, Daucus Carota Sativa Root Extract, Daucus Carota Sativa Seed Oil, CI 26100, Ascorbyl Palmitate.' WHERE "brand" = 'eloure' AND "name" IN ('Nourishing Argan Elixir - 100 ml');
UPDATE "Product" SET "description" = 'A lightweight finishing mist that enhances shine, smooths the hair surface, and delivers a refined, glossy finish without weighing the hair down.

• Instantly reveals luminous shine
• Smooths the hair surface and refines flyaways
• Delivers a lightweight, non-greasy finish
• Refines the finish without residue

## Details
Complete the look with refined radiance. Éloure''s Soft Gloss Mist enhances natural shine while smoothing the hair surface for a luminous, refined finish. A lightweight formula blends conditioning oils for gloss-enhancing of the hair to reflect light without heaviness or buildup. Designed as a final touch, it softens flyaways and elevates the hair''s natural luminosity, leaving strands sleek, and elegantly radiant, finished with Éloure''s signature fragrance.

## Ingredients
Alcohol Denat., Phenyl Trimethicone, Ethylhexyl Palmitate, C10-14 Alkyl Polypropanediol-3 Myristate, Propylheptyl Caprylate, Parfum, Benzyl Salicylate, Coumarin, Limonene, Linalool, Linalyl Acetate, Pinene, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Juniperus Virginiana Oil.' WHERE "brand" = 'eloure' AND "name" IN ('Soft Gloss Mist - 200 ml');
UPDATE "Product" SET "description" = 'A sea salt-based styling spray that gives the hair body, beachy texture and natural volume. Delivers excellent definition while maintaining a flexible, effortless hold and control.

• Provides instant body and beach-textured definition
• Helps resist humidity for lasting style longevity
• Features a lightweight, clean finish with no residue
• Suitable for all hair types

## Details
Elevate every strand to effortless texture. Éloure''s Texturizing Salt Spray enhances movement and creates easy, luminous beach waves styled with airy volume. A refined formula enriched with Castor Oil and Pinene nourishes the strands while building texture and body, ideal for undone texture and lived-in hair. Infused with Éloure''s signature fragrance, the salt spray leaves the hair with an aura of timeless elegance.

## Ingredients
Aqua, Alcohol Denat., Sorbitol, AMP-Acrylates/Allyl Methacrylate Copolymer, VP/VA Copolymer, Sodium Chloride, PEG-40 Hydrogenated Castor Oil, Phenoxyethanol, Parfum, Benzyl Salicylate, Coumarin, Limonene, Linalool, Linalyl Acetate, Pinene, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Juniperus Virginiana Oil, Citric Acid, CI 13015, CI 16255.' WHERE "brand" = 'eloure' AND "name" IN ('Texturizing Salt Mist - 200 ml');
UPDATE "Product" SET "description" = 'A lightweight leave-in mist that detangles, hydrates, and smooths the hair. Delivering lasting softness, shine, and manageability without weight or residue.

• Instantly detangles and smooths the hair
• Provides lightweight, leave-in hydration
• Enhances softness and natural radiance
• Leaves the hair effortlessly manageable with refined frizz control

## Details
Nourish and protect with effortless lightness. Éloure''s Leave-In Conditioning Mist delivers instant hydration, detangling, and smoothness without weighing the hair down. The signature formula combines conditioning agents to soften the cuticle, reduce frizz, and enhance shine throughout the day, while glycerin and castor oil help hydrate and nourish from within. It refreshes lengths and improves manageability, leaving hair polished and refined. Infused with Éloure''s signature fragrance.

## Ingredients
Aqua, Glycerin, PEG-40 Hydrogenated Castor Oil, Amodimethicone, Cetrimonium Chloride, C11-15 Pareth-7, Polysorbate 20, Laureth-9, Trideceth-12, Phenoxyethanol, Ethylhexylglycerin, Parfum, Benzyl Salicylate, Coumarin, Limonene, Linalool, Linalyl Acetate, Pinene, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Juniperus Virginiana Oil, Acetic Acid, Citric Acid.' WHERE "brand" = 'eloure' AND "name" IN ('Leave-in Conditioning Mist - 200 ml');
UPDATE "Product" SET "description" = 'A weightless pre-styling mist designed to protect against heat while imparting smoothness, shine, and effortless control throughout styling.

• Shields the hair from heat styling damage
• Helps prevent moisture loss and dryness of the strands
• Enhances smoothness and shine of the hair
• A lightweight and non-sticky finish

## Details
Protect hair before every style. Éloure''s Heat Protection Mist creates a lightweight thermal shield that helps protect the hair against heat damage up to 220°C / 428°F during styling. The formula blends protective polymers and ferment-derived actives to reduce moisture loss, enhance smoothness, and support shine. Designed for use before thermal styling, it leaves the hair soft, controlled, and resilient without stiffness or buildup, finished with Éloure''s signature fragrance.

## Ingredients
Aqua, Alcohol Denat., Saccharomyces Cerevisiae Extract, VP/VA Copolymer, Polysorbate 20, PEG-40 Hydrogenated Castor Oil, Parfum, Benzyl Salicylate, Coumarin, Limonene, Linalool, Linalyl Acetate, Pinene, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Juniperus Virginiana Oil, Benzophenone-4, Leuconostoc/Radish Root Ferment Filtrate, CI 16255.' WHERE "brand" = 'eloure' AND "name" IN ('Heat Protection Mist - 200 ml');
UPDATE "Product" SET "description" = 'A lightweight curl cream to help define natural curls through deep hydration, leaving a touchable finish, without any residue.

• Ensured hydration days after rinsing
• Calms and restores the scalp barrier
• Adds luminous shine without any frizz
• Enhances the curl definition

## Details
Embrace the natural vitality of curls. Éloure''s Curl Cream activates, nourishes and defines curls, boosting body while leaving each strand luminous and hydrated. Enriched with glycerin to attract moisture, sunflower seed extract to nourish and enhance luminosity, and conditioning agents that smooth the hair fiber, it boosts body and bounce without heaviness. Curls are left supple, luminous, and beautifully defined, infused with Éloure''s signature fragrance of effortless elegance.

## Ingredients
Aqua, Isododecane, Glycerin, Cetearyl Alcohol, Guar Hydroxypropyltrimonium Chloride, Dipalmitoylethyl Hydroxyethylmonium Methosulfate, PVP, Butylene Glycol, Helianthus Annuus (Sunflower) Seed Extract, Ceteareth-20, Tocopheryl Acetate, Hydroxyethylcellulose, Hydrogenated Polydecene, Phenoxyethanol, Parfum, Benzyl Salicylate, Coumarin, Limonene, Linalool, Linalyl Acetate, Pinene, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Juniperus Virginiana Oil, Ethylhexylglycerin, Citric Acid.' WHERE "brand" = 'eloure' AND "name" IN ('Curl Cream - 150 ml');
UPDATE "Product" SET "description" = 'A nourishing styling cream with movable hold that hydrates, smooths, and controls frizz. Leaving the hair soft, defined and styled to perfection.

• Soft, long-lasting definition
• Smooths and conditions the hair
• Movable throughout the day
• A finish that is touchable, polished and fluid

## Details
The art of care and styling. Éloure''s Moisturizing Styling Cream delivers flexible hold while deeply hydrating and smoothing the hair. Crafted with a rich and nourishing formula, it helps maintain moisture balance, improves style longevity and reduces frizz. Naturally polished with a touchable and movable finish, infused with Éloure''s signature fragrance for a dreamy, alluring result.

## Ingredients
Aqua, Cetyl Alcohol, Propylene Glycol, Ethylhexyl Palmitate, Glyceryl Stearate, Ceteareth-20, Panthenol, Cetrimonium Chloride, Polyquaternium-7, Ethylhexyl Methoxycinnamate, Dimethicone, Polyquaternium-37, Propylene Glycol Dicaprylate/Dicaprate, PPG-1 Trideceth-6, Sorbitan Oleate, Acrylates/Stearyl Methacrylate Copolymer, Citric Acid, Parfum, Benzyl Salicylate, Coumarin, Limonene, Linalool, Linalyl Acetate, Pinene, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Juniperus Virginiana Oil, Phenoxyethanol, Ethylhexylglycerin.' WHERE "brand" = 'eloure' AND "name" IN ('Moisturizing Styling Cream - 150 ml');
UPDATE "Product" SET "description" = 'A high-performance styling gel that delivers maximum hold, definition, and control. Creating structured styles with long-lasting precision and a clean, polished finish.

• Delivers strong, long-lasting hold with uncompromising control
• Enhances structure and sharp definition
• Smooths frizz and refines flyaways
• Dries clean with a flake-free, residue-free finish

## Details
Lock in style with confident control. Éloure''s Styling Gel Strong delivers maximum hold and precise definition for sculpted, long-lasting styles. The formula blends advanced styling polymers with conditioning agents to enhance control while supporting shine and flexibility. Designed for wet or dry looks, it sets the hair without flaking or stiffness, leaving styles sharp, refined, and impeccably finished with Éloure''s signature fragrance.

## Ingredients
Aqua, Alcohol Denat., VP/VA Copolymer, Polyquaternium-69, Propanediol, PVP, PEG-40 Hydrogenated Castor Oil, Panthenol, Polysorbate 20, Phenoxyethanol, Ethylhexylglycerin, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Parfum, Benzyl Salicylate, Coumarin, Limonene, Linalool, Linalyl Acetate, Pinene, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Juniperus Virginiana Oil, Benzophenone-4, Tetrasodium EDTA, Aminomethyl Propanol, Citric Acid.' WHERE "brand" = 'eloure' AND "name" IN ('Styling Gel Strong - 150 ml');
UPDATE "Product" SET "description" = 'A reworkable styling pomade that delivers definition, control, and
high-shine polish. Creating sleek, refined styles with flexible hold and a
smooth, glossy finish.

• Adds high-gloss shine and definition to the hair
• Provides a flexible and reworkable hold
• Smooths and controls flyaways
• Leaves the hair polished without stiffness

## Details
Define style with luminous precision. Éloure''s High Gloss Pomade shapes and refines the hair while delivering a sleek, high-shine finish. The formula blends flexible styling polymers with gloss-enhancing silicones to provide control, definition, and reworkable hold without stiffness. Ideal for polished looks or smooth finishes, it leaves the hair controlled, glossy, and impeccably styled, finished with Éloure''s signature fragrance

## Ingredients
Aqua, Ceteareth-30, PEG-40 Hydrogenated Castor Oil, Propylene Glycol, Trimethylsiloxyphenyl Dimethicone, Dimethicone, Parfum, Glycerin, VP/VA Copolymer, Alcohol Denat., Triethyl Citrate, Caprylyl Glycol, Benzoic Acid, Citric Acid, Phenoxyethanol, Ethylhexylglycerin, Benzyl Salicylate, Beta-Caryophyllene, Citral, Coumarin, Limonene, Linalool, Linalyl Acetate, Pinene, Rose Ketones, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Juniperus Virginiana Oil.' WHERE "brand" = 'eloure' AND "name" IN ('High Gloss Pomade - 90 ml');
UPDATE "Product" SET "description" = 'A versatile styling paste that adds texture, definition, and control with a natural matte finish. Creating effortless styles without shine or stiffness.

• Provides texture and definition with a matte finish
• Delivers a flexible and reworkable hold
• Enhances the grip and separation of the hair
• Leaves the hair controlled and touchable

## Details
Sculpt texture with refined restraint. Éloure''s Matt Styling Paste delivers definition and control while maintaining a natural finish. The formula blends kaolin clay, waxes, and conditioning oils to add grip, structure, and separation without heaviness. Designed for reworkable styling, it allows effortless reshaping throughout the day, leaving hair textured, controlled, and naturally refined, finished with Éloure''s signature fragrance.

## Ingredients
Aqua, Cera Microcristallina, Kaolin, Cetearyl Alcohol, Butyrospermum Parkii Butter, Propylene Glycol, Propanediol, Simmondsia Chinensis Seed Oil, Caprylic/Capric Triglyceride, PVP, VP/VA Copolymer, Alcohol Denat., PEG-100 Stearate, Glyceryl Stearate, Parfum, Hydrogenated Vegetable Oil, Stearyl Stearate, Stearic Acid, Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer, Squalane, Polysorbate 60, Phenoxyethanol, Ethylhexylglycerin, Citric Acid, Benzyl Salicylate, Beta-Caryophyllene, Citral, Coumarin, Limonene, Linalool, Linalyl Acetate, Pinene, Rose Ketones, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Juniperus Virginiana Oil.' WHERE "brand" = 'eloure' AND "name" IN ('Matt Styling Paste - 90 ml');
UPDATE "Product" SET "description" = 'A refined hair perfume that delicately scents the hair while delivering lightweight hydration, softness, and shine for an elegant, long-lasting fragrance experience.

• Leaves hair beautifully scented
• Provides lightweight hydration and softness
• Enhances shine without residue
• Refreshes hair between washes

## Details
Embrace fragrance as a finishing ritual. Éloure''s Hair Perfume Elora is a captivating, comforting scent that wraps the hair in soft warmth and quiet sophistication. It opens fresh and slightly spicy, then melts into a creamy, milky tone with a subtle sweetness. The finish is smooth, addictive, and soft, leaving a cozy yet refined trail.

Our finely crafted care formula, enriched with panthenol, sunflower seed extract, and cranberry extract, helps maintain softness and shine while delivering subtle care and hydration. Designed to refresh and perfume without heaviness, it leaves hair delicately scented and effortlessly refined, finished with Éloure''s signature Parisian elegance.

## Ingredients
Alcohol Denat., Aqua, Parfum, Tetramethyl Acetyloctahydronaphthalenes, Panthenol, Helianthus Annuus (Sunflower) Seed Extract, Vaccinium Macrocarpon (Cranberry) Fruit Extract, Glycerin, Butylene Glycol, Potassium Sorbate, Sorbic Acid, Citric Acid, Benzyl Salicylate, Beta-Caryophyllene, Citral, Coumarin, Isoeugenyl Acetate, Limonene, Linalool, Linalyl Acetate, Pinene, Rose Ketones, Terpineol, Citrus Limon Peel Oil, Juniperus Virginiana Oil.' WHERE "brand" = 'eloure' AND "name" IN ('Hair Perfume Elora - 50 ml');
UPDATE "Product" SET "description" = 'A refined hair perfume that delicately scents the hair while delivering lightweight hydration, softness, and shine for an elegant, long-lasting fragrance experience.

• Leaves hair beautifully scented
• Provides lightweight hydration and softness
• Enhances shine without residue
• Refreshes hair between washes

## Details
Embrace fragrance as a finishing ritual. Éloure''s Hair Perfume Grace is a luminous, sun-kissed fragrance that feels like a warm light on freshly washed hair. It opens bright and uplifting, then melts into a soft, sweet creamy floral warmth before settling into a smooth, sensual finish that lingers beautifully with every movement.

Our finely crafted care formula, enriched with panthenol, sunflower seed extract, and cranberry extract, helps maintain softness and shine while delivering care and hydration. Designed to refresh and perfume without heaviness, it leaves hair delicately scented and effortlessly refined, finished with Éloure''s signature Parisian elegance.

## Ingredients
Alcohol Denat., Aqua, Parfum, Limonene, Panthenol, Helianthus Annuus (Sunflower) Seed Extract, Vaccinium Macrocarpon (Cranberry) Fruit Extract, Glycerin, Butylene Glycol, Potassium Sorbate, Sorbic Acid, Citric Acid, Benzyl Salicylate, Beta-Caryophyllene, Citral, Coumarin, Linalool, Linalyl Acetate, Pinene, Terpineol, Vanillin, Citrus Aurantium Peel Oil, Citrus Limon Peel Oil, Pogostemon Cablin Oil.' WHERE "brand" = 'eloure' AND "name" IN ('Hair Perfume Grace - 50 ml');
UPDATE "Product" SET "description" = 'A refined hair perfume that delicately scents the hair while delivering lightweight hydration, softness, and shine for an elegant, long-lasting fragrance experience.

• Leaves hair beautifully scented
• Provides lightweight hydration and softness
• Enhances shine without residue
• Refreshes hair between washes

## Details
Embrace fragrance as a finishing ritual. Éloure''s Hair Perfume Reflect is a fresh yet softly sensual fragrance that feels clean, luminous and effortlessly refined. It opens fresh, then unfolds into a delicate fruity-floral smell, and settles into a warm, musky-woody glow that lingers like sunlight on skin.

Our finely crafted care formula, enriched with panthenol, sunflower seed extract, and cranberry extract, helps maintain softness and shine while delivering care and hydration. Designed to refresh and perfume without heaviness, it leaves hair delicately scented and effortlessly refined, finished with Éloure''s signature Parisian elegance.

## Ingredients
Alcohol Denat., Aqua, Parfum, Tetramethyl Acetyloctahydronaphthalenes, Panthenol, Helianthus Annuus (Sunflower) Seed Extract, Vaccinium Macrocarpon (Cranberry) Fruit Extract, Glycerin, Butylene Glycol, Potassium Sorbate, Sorbic Acid, Citric Acid, Alpha Isomethyl Ionone, Benzyl Salicylate, Linalool, Linalyl Acetate.' WHERE "brand" = 'eloure' AND "name" IN ('Hair Perfume Reflect - 50 ml');
UPDATE "Product" SET "description" = 'A refined hair perfume that delicately scents the hair while delivering lightweight hydration, softness, and shine for an elegant, long-lasting fragrance experience.

• Leaves hair beautifully scented
• Provides lightweight hydration and softness
• Enhances shine without residue
• Refreshes hair between washes

## Details
Embrace fragrance as a finishing ritual. Éloure''s Hair Perfume Elora is a captivating, comforting scent that wraps the hair in soft warmth and quiet sophistication. It opens fresh and slightly spicy, then melts into a creamy, milky tone with a subtle sweetness. The finish is smooth, addictive, and soft, leaving a cozy yet refined trail.

Our finely crafted care formula, enriched with panthenol, sunflower seed extract, and cranberry extract, helps maintain softness and shine while delivering subtle care and hydration. Designed to refresh and perfume without heaviness, it leaves hair delicately scented and effortlessly refined, finished with Éloure''s signature Parisian elegance.

## Ingredients
Alcohol Denat., Aqua, Parfum, Tetramethyl Acetyloctahydronaphthalenes, Panthenol, Helianthus Annuus (Sunflower) Seed Extract, Vaccinium Macrocarpon (Cranberry) Fruit Extract, Glycerin, Butylene Glycol, Potassium Sorbate, Sorbic Acid, Citric Acid, Benzyl Salicylate, Beta-Caryophyllene, Citral, Coumarin, Isoeugenyl Acetate, Limonene, Linalool, Linalyl Acetate, Pinene, Rose Ketones, Terpineol, Citrus Limon Peel Oil, Juniperus Virginiana Oil.' WHERE "brand" = 'eloure' AND "name" IN ('Hair Perfume Elora (Travel Size) - 15 ml');
UPDATE "Product" SET "description" = 'A refined hair perfume that delicately scents the hair while delivering lightweight hydration, softness, and shine for an elegant, long-lasting fragrance experience.

• Leaves hair beautifully scented
• Provides lightweight hydration and softness
• Enhances shine without residue
• Refreshes hair between washes

## Details
Embrace fragrance as a finishing ritual. Éloure''s Hair Perfume Grace is a luminous, sun-kissed fragrance that feels like a warm light on freshly washed hair. It opens bright and uplifting, then melts into a soft, sweet creamy floral warmth before settling into a smooth, sensual finish that lingers beautifully with every movement.

Our finely crafted care formula, enriched with panthenol, sunflower seed extract, and cranberry extract, helps maintain softness and shine while delivering care and hydration. Designed to refresh and perfume without heaviness, it leaves hair delicately scented and effortlessly refined, finished with Éloure''s signature Parisian elegance.

## Ingredients
Alcohol Denat., Aqua, Parfum, Limonene, Panthenol, Helianthus Annuus (Sunflower) Seed Extract, Vaccinium Macrocarpon (Cranberry) Fruit Extract, Glycerin, Butylene Glycol, Potassium Sorbate, Sorbic Acid, Citric Acid, Benzyl Salicylate, Beta-Caryophyllene, Citral, Coumarin, Linalool, Linalyl Acetate, Pinene, Terpineol, Vanillin, Citrus Aurantium Peel Oil, Citrus Limon Peel Oil, Pogostemon Cablin Oil.' WHERE "brand" = 'eloure' AND "name" IN ('Hair Perfume Grace (Travel Size) - 15 ml');
UPDATE "Product" SET "description" = 'A refined hair perfume that delicately scents the hair while delivering lightweight hydration, softness, and shine for an elegant, long-lasting fragrance experience.

• Leaves hair beautifully scented
• Provides lightweight hydration and softness
• Enhances shine without residue
• Refreshes hair between washes

## Details
Embrace fragrance as a finishing ritual. Éloure''s Hair Perfume Reflect is a fresh yet softly sensual fragrance that feels clean, luminous and effortlessly refined. It opens fresh, then unfolds into a delicate fruity-floral smell, and settles into a warm, musky-woody glow that lingers like sunlight on skin.

Our finely crafted care formula, enriched with panthenol, sunflower seed extract, and cranberry extract, helps maintain softness and shine while delivering care and hydration. Designed to refresh and perfume without heaviness, it leaves hair delicately scented and effortlessly refined, finished with Éloure''s signature Parisian elegance.

## Ingredients
Alcohol Denat., Aqua, Parfum, Tetramethyl Acetyloctahydronaphthalenes, Panthenol, Helianthus Annuus (Sunflower) Seed Extract, Vaccinium Macrocarpon (Cranberry) Fruit Extract, Glycerin, Butylene Glycol, Potassium Sorbate, Sorbic Acid, Citric Acid, Alpha Isomethyl Ionone, Benzyl Salicylate, Linalool, Linalyl Acetate.' WHERE "brand" = 'eloure' AND "name" IN ('Hair Perfume Reflect (Travel Size) - 15 ml');
UPDATE "Product" SET "description" = 'A versatile root-lifting spray that delivers instant volume, texture,
and hold, creating effortless body and structure with a clean, weightless
finish.

• Instantly lifts the roots to create amplified volume
• Adds refined texture and grip without stiffness
• Provides a long-lasting, lightweight hold
• Leaves the hair full, airy, and beautifully touchable

## Details
Define volume with effortless texture. Éloure’s Texturizing Volume Spray delivers an instant lift and structure at the roots while maintaining natural movement in the strands. Our lightweight formula combines styling polymers with starch-based absorbers to create lasting volume, grip, and definition without heaviness, leaving the hair full-bodied, texturized, and effortlessly styled, finished with Éloure’s signature refined fragrance.

## Ingredients
Butane, Alcohol Denat., Isobutane, Propane, Aluminum Starch Octenylsuccinate, VP/VA Copolymer, Silica, Solanum Tuberosum Starch, Parfum, Tocopherol, Benzophenone-4, Aminomethyl Propanol, Aqua.' WHERE "brand" = 'eloure' AND "name" IN ('Texturizing Volume Spray (Travel Size) - 75 ml');
UPDATE "Product" SET "description" = 'A deeply nourishing shampoo that helps lock in moisture from the root, calming sensitivity while leaving the hair soft, supple, and beautifully balanced.

• Ensures deep, long-lasting hydration up to 72 hours
• Leaves the hair healthy and silky smooth
• Restores the scalp barrier
• Adds luminous shine without residue or heaviness

## Details
Cleanse with precision while nourishing hair to lasting radiance. Éloure''s Moisturizing Shampoo hydrates the hair and scalp, supporting long-term moisture balance. A delicate infusion of Red Poppy Extract and Pentavitin helps soothe the scalp, strengthen the scalp barrier, and lock in hydration for soft, healthy-looking hair. Paired with our refined fragrance, this shampoo leaves hair clean, luminous, and silky smooth.

## Ingredients
Aqua, Glycerin, Sodium Lauroyl Sarcosinate, Cocamidopropyl Betaine, Sodium Cocoyl Isethionate, Capryloyl/Caproyl Methyl Glucamide, Coco-Glucoside, Glyceryl Oleate, Lauroyl/Myristoyl Methyl Glucamide, Papaver Rhoeas Petal Extract, Citric Acid, Saccharide Isomerate, Guar Hydroxypropyltrimonium Chloride, Sodium Chloride, Propylene Glycol, Potassium Sorbate, Sodium Benzoate, Parfum, Benzyl Salicylate, Limonene, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Sodium Citrate, Hydrogenated Vegetable Glycerides Citrate, Tocopherol.' WHERE "brand" = 'eloure' AND "name" IN ('Moisturizing Shampoo (Travel Size) - 50 ml');
UPDATE "Product" SET "description" = 'Daily hydration and effortless softness are restored from the first use, as this nourishing conditioner replenishes moisture, smooths the hair fiber, and leaves the hair weightless, and easy to detangle.

• Provides deep, long-lasting hydration up to 72 hours
• Helps restore and protect the scalp barrier
• Smooths, softens, and improves manageability
• Adds natural shine without residue or buildup

## Details
Nourish every strand with refined hydration. Éloure''s Moisturizing Conditioner envelops the hair in moisture while maintaining lightness and movement. Infused with Red Poppy Extract, known for its soothing benefits, and Pentavitin, which binds moisture to the strands, this conditioner helps restore balance and softness with every use. Finished with Éloure''s signature fragrance, the hair is left feeling hydrated, polished, and effortlessly elegant.

## Ingredients
Aqua, Cetearyl Alcohol, Glycerin, Propylheptyl Caprylate, Bis-(Isostearoyl/Oleoyl Isopropyl) Dimonium Methosulfate, Shea Butter Ethyl Esters, Stearamidopropyl Dimethylamine, Papaver Rhoeas Petal Extract, Cetrimonium Methosulfate, Quaternium-91, Saccharide Isomerate, Parfum, Benzyl Salicylate, Limonene, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Ethylhexylglycerin, Citric Acid, Phenoxyethanol, Sodium Citrate.' WHERE "brand" = 'eloure' AND "name" IN ('Moisturizing Conditioner (Travel Size) - 50 ml');
UPDATE "Product" SET "description" = 'Deep hydration and silky radiance are achieved after just one use. This hydrating hair mask nourishes every strand to its core and leaves the hair with a soft, brushable finish.

• Excellent for natural and color-treated hair
• Ensures deep, long-lasting hydration up to 72 hours
• Restores the scalp barrier
• Adds luminous shine without residue or heaviness

## Details
Nourish every strand to luminous vitality. Éloure''s Moisturizing Mask deeply infuses the hair and scalp with lasting hydration, leaving hair smooth, supple, and visibly conditioned. A refined blend of Red Poppy Extract and Pentavitin helps strengthen the scalp barrier, locks in hydration, and supports a healthy foundation for naturally beautiful hair. Paired with our exclusive fragrance, the moisturizing mask leaves the hair beautifully scented.

## Ingredients
Aqua, Cetearyl Alcohol, Glycerin, C10-14 Alkyl Polypropanediol-3 Myristate, Betaine, Behentrimonium Chloride, Butyrospermum Parkii Butter, Dipropylene Glycol, Papaver Rhoeas Petal Extract, Saccharide Isomerate, Bis-(Isostearoyl/Oleoyl Isopropyl) Dimonium Methosulfate, Parfum, Benzyl Salicylate, Limonene, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Phenoxyethanol, Guar Hydroxypropyltrimonium Chloride, Cetrimonium Chloride, Hydroxyethylcellulose, Ethylhexylglycerin, Citric Acid, Sodium Citrate.' WHERE "brand" = 'eloure' AND "name" IN ('Moisturizing Mask (Travel Size) - 50 ml');
UPDATE "Product" SET "description" = 'A complete hydration ritual in travel size. Four refined essentials delivering long-lasting moisture, luminous softness and elegant fragrance in one elevated system.

• 72-hour hydration powered by advanced moisture-binding technology
• Supports the scalp barrier for balanced, healthy-looking hair
• Deep nourishment with weightless softness and luminous shine
• Signature fine fragrance for a lasting, elegant scent

## Details
A complete hydration ritual in travel size. Four refined essentials delivering long-lasting moisture, luminous softness and elegant fragrance in one elevated system.

The Radiant Ritual Travel Size brings Éloure''s signature hydration expertise into a refined, compact format. Designed to maintain softness, balance and luminous vitality. This four-step ritual delivers uncompromising performance in every application.

At the heart of the collection lies a moisture-binding complex that helps lock in hydration for up to 72 hours, supporting long-term moisture balance while preserving lightness and movement. Red Poppy Extract helps soothe the scalp and reinforce its natural barrier, creating the ideal foundation for resilient, healthy-looking hair.

The Moisturizing Shampoo gently purifies while preserving essential moisture. The Moisturizing Conditioner smooths and detangles with weightless refinement. The Moisturizing Mask delivers deeper nourishment, restoring suppleness and silky radiance from the first use.

Hair Perfume Elora completes the ritual, enveloping the hair in a soft, comforting scent layered with subtle freshness and creamy warmth. Enriched with conditioning ingredients, it enhances softness and shine while leaving behind an elegant, lasting fragrance impression.

A complete care ritual, thoughtfully curated in travel size without compromising performance or refinement.' WHERE "brand" = 'eloure' AND "name" IN ('Discovery Set');
UPDATE "Product" SET "description" = 'A deeply hydrating collection, created to enhance silky radiance. The Radiant Care Collection locks in moisture from the roots, smoothing the hair fiber and leaving hair soft, weightless, and effortlessly brushable.

This set contains:
• Moisturizing Shampoo 250ml
• Moisturizing Conditioner 250ml
• Moisturizing Mask 190ml

• Ensures deep, long-lasting hydration up to 72 hours
• Helps restore and protect the scalp barrier
• Adds luminous shine without residue or heaviness
• Smooths, softens, and improves manageability

## Details
Elevate your daily hair routine with hydration for lasting radiance. Éloure''s Radiant Care Collection replenishes moisture from scalp to the ends, helping support the scalp barrier while smoothing the hair fiber for strands that feel weightless, supple, and effortlessly brushable.

Powered by Red Poppy Extract and Pentavitin, the collection helps attract and retain moisture for lasting hydration. The Moisturizing Shampoo gently cleanses while hydrating the hair and scalp, followed by the Moisturizing Conditioner to restore balance and enhance softness. Complete the ritual with the Moisturizing Mask, an intensive treatment that envelops the hair in lasting moisture, leaving every strand visibly conditioned, smooth, and radiant.' WHERE "brand" = 'eloure' AND "name" IN ('The Radiant Care Collection');
UPDATE "Product" SET "description" = 'A volume-enhancing collection, created to elevate effortless body and luminous shine. The Volume & Glow Collection lifts the roots, creates effortless body, and enhances shine while leaving a long-lasting fragrance experience.

The Volume & Glow Collection contains:

• Soft Gloss Mist 200ml
• Texturizing Volume Spray 200ml
• Hair Perfume Elora 50ml

• Instantly lifts the roots to create amplified volume
• Smooths the hair surface and refines flyaways
• Leaves hair beautifully scented
• Enhances shine without residue

## Details
Define volume with refined radiance. Éloure’s Volume & Glow Collection lifts the roots, builds effortless body, and enhances natural shine for hair that appears full, luminous, and beautifully defined. Lightweight formulas provide lasting texture, grip, and movement without weighing the hair down or leaving buildup.

The Texturizing Volume Spray creates instant lift and full-bodied texture, while the Soft Gloss Mist smooths flyaways and enhances the hair''s natural luminosity with a weightless finish. Complete the ritual with Hair Perfume Elora, leaving the hair delicately scented with Éloure''s signature scent for an effortlessly polished finish.' WHERE "brand" = 'eloure' AND "name" IN ('The Volume & Glow Collection');
UPDATE "Product" SET "description" = 'A professionally crafted brush for smooth detangling, refined control and effortless styling.

• Flexible nylon bristles for gentle, effective detangling
• Cushioned base that adapts to the scalp, reducing tension
• Helps distribute natural oils for enhanced shine
• Beechwood handle designed for refined grip and precise control

## Details
Eloure''s signatures brush is designed to deliver a polished finish with precision and comfort.' WHERE "brand" = 'eloure' AND "name" IN ('Signature Brush');
UPDATE "Product" SET "description" = 'We bottled ”la dolce vita” of the sun-drenched shores of Capri. Get lost in the soft citrus breeze. EAU de Capri is like an enchanted water, giving vibrant energy. Imagine a wild scent of passion fruit meeting you at a hidden garden, with the warmth of sun-baked stone beneath your feet. It’s an escape. It resonates with the carefree, charming spirits that want to get lost in the golden sands of this iconic island.

## Details
Inspired by the Capri – Italian attitude and the stunning coast, our Hair Perfume captures the essence of a sun-drenched paradise. The journey begins with the crisp green apple, zesty lemon and a hint of black pepper. As the golden hour approaches, so does the heart of the scent: passion fruit, blackcurrant, soft and delicate Mediterranean floral. Finally, on the horizon, the base notes settle in with white musk, gourmand touches and smoky nuances, wrapping you in a sensual finish and the feeling of a slow sunset on your skin.

## Perfect for
For sun-chasers, dreamers and barefoot wanderers. EAU de Capri is made for a windswept soul that craves golden moments, unplanned cliff swims, and dancing under the skies that never go dark. Bring the vibes of Capri wherever you go!

## How to use
• Spray EAU de Capri Hair Perfume onto your hair, holding 15-20 cm away.
• Apply to dry hair for the best fragrance experience.
• Give your hair a flip to emit the irresistible scent.
• Reapply throughout the day as desired.

## Ingredients
Alcohol Denat., Parfum, Aqua, Benzoic Acid, Limonene, Linalool, Hydrolyzed Silk, Isoeugenol, Geraniol, Citral, CI 17200, Argania Spinosa Kernel Oil, CI 14700, Ethylhexyl Methoxycinnnamate.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('EAU de Capri Hair Perfume 50ml');
UPDATE "Product" SET "description" = 'Big energy, main character moment. EAU de Santorini is your all-inclusive pass to cliffsides of the Aegean Sea, bougainvillea-draped balconies and dance floors under the stars. With every sprits you’re not only freshening up — you’re stepping into a sun-drenched Greek daydream of blue-domed houses, olive gardens and cobblestone streets. Close your eyes and find yourself in the middle of an island romance where the nights are long, and the vibes are always vibrant. EAU de Santorini is breathtaking, just like the beauty of the island itself.

## Details
Opening with a flirt of lemon and juniper berries, and a pinch of black pepper, this scent is like golden hour in a bottle. It is bright, bold and just spicy enough to intrigue your next summer fling. The heart blooms. Imagine orris butter with the sun-warmed florals, together giving soft glam energy. And the finish? The notes of vetiver, cashmere, vanilla and white musk, enwrapping you in an EAU-so gentle sea breeze and awakening your senses with its sensual warmth.

## Perfect for
Enjoyers of late Mediterranean brunches are turning into magical boat parties. Those sending the texts saying: “come outside, we’re going to Los!”. EAU de Santorini is capturing that radiant, rooftop, sun-glow energy. One spritz, and you are the life of the party. The fragrance makes you cherish every moment.

## How to use
• Spray EAU de Santorini Hair Perfume onto your hair, holding 15-20 cm away.
• Apply to dry hair for the best fragrance experience.
• Give your hair a flip to emit the irresistible scent.
• Reapply throughout the day as desired.

## Ingredients
Alcohol Denat., Parfum, Aqua, Benzoic Acid, Limonene, Linalool, Hydrolyzed Silk, Isoeugenol, Geraniol, Citral, CI 17200, Argania Spinosa Kernel Oil, CI 14700, Ethylhexyl Methoxycinnnamate.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('EAU de Santorini Hair Perfume 50ml');
UPDATE "Product" SET "description" = 'Think ocean breeze meeting chic tennis courts. EAU de Hamptons is your VIP pass into the world of Gossip Girl and coastal luxury. Imagine the scent of wealthy summer-sea-kissed mornings, a whiff of spice and fresh blooming hydrangeas. It encapsulates pristine beaches and golden sunlight near extensive mansions — effortless sophistication mixed with salty ocean breeze.

## Details
Inspired by the Hamptons’ state of chic, it opens with a cool bergamot in a tango with warmer cardamom and ginger, making it a refreshing treat. The heart volleys in with sweet cinnamon and cumin, spinning in a garden party of soft florals. Finally, lingers with vetiver, cedar wood, amber, aromatic vanilla and white musk. It’s crisp. It’s spicy. It’s luxuriously nonchalant. If you are going for a casually fabulous vibe, EAU de Hamptons is delightfully on point.

## Perfect for
From your first iced oat latte to your last sip of evening rose, EAU de Hamptons keeps your hair fresh. It is your daily dose of breezy energy wrapped in a laid-back luxury. With its zing! Opening and cashmere-soft finish, it’s your go-to if you want to give off playful charm.

## How to use
• Spray EAU de Hamptons Hair Perfume onto your hair, holding 15-20 cm away.
• Apply to dry hair for the best fragrance experience.
• Give your hair a flip to emit the irresistible scent.
• Reapply throughout the day as desired.

## Ingredients
Alcohol Denat., Parfum, Aqua, Benzoic Acid, Limonene, Linalool, Hydrolyzed Silk, Isoeugenol, Geraniol, Citral, CI 17200, Argania Spinosa Kernel Oil, CI 14700, Ethylhexyl Methoxycinnnamate.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('EAU de Hamptons Hair Perfume 50ml');
UPDATE "Product" SET "description" = 'We bottled ”la dolce vita” of the sun-drenched shores of Capri. Get lost in the soft citrus breeze. EAU de Capri is like an enchanted water, giving vibrant energy. Imagine a wild scent of passion fruit meeting you at a hidden garden, with the warmth of sun-baked stone beneath your feet. It’s an escape. It resonates with the carefree, charming spirits that want to get lost in the golden sands of this iconic island.

## Details
Inspired by the Capri – Italian attitude and the stunning coast, our Hair Perfume captures the essence of a sun-drenched paradise. The journey begins with the crisp green apple, zesty lemon and a hint of black pepper. As the golden hour approaches, so does the heart of the scent: passion fruit, blackcurrant, soft and delicate Mediterranean floral. Finally, on the horizon, the base notes settle in with white musk, gourmand touches and smoky nuances, wrapping you in a sensual finish and the feeling of a slow sunset on your skin.

## Perfect for
For sun-chasers, dreamers and barefoot wanderers. EAU de Capri is made for a windswept soul that craves golden moments, unplanned cliff swims, and dancing under the skies that never go dark. Bring the vibes of Capri wherever you go!

## How to use
• Spray EAU de Capri Hair Perfume onto your hair, holding 15-20 cm away.
• Apply to dry hair for the best fragrance experience.
• Give your hair a flip to emit the irresistible scent.
• Reapply throughout the day as desired.

## Ingredients
Alcohol Denat., Parfum, Aqua, Benzoic Acid, Limonene, Linalool, Hydrolyzed Silk, Isoeugenol, Geraniol, Citral, CI 17200, Argania Spinosa Kernel Oil, CI 14700, Ethylhexyl Methoxycinnnamate.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('EAU de Capri Hair Perfume 15ml');
UPDATE "Product" SET "description" = 'Big energy, main character moment. EAU de Santorini is your all-inclusive pass to cliffsides of the Aegean Sea, bougainvillea-draped balconies and dance floors under the stars. With every sprits you’re not only freshening up — you’re stepping into a sun-drenched Greek daydream of blue-domed houses, olive gardens and cobblestone streets. Close your eyes and find yourself in the middle of an island romance where the nights are long, and the vibes are always vibrant. EAU de Santorini is breathtaking, just like the beauty of the island itself.

## Details
Opening with a flirt of lemon and juniper berries, and a pinch of black pepper, this scent is like golden hour in a bottle. It is bright, bold and just spicy enough to intrigue your next summer fling. The heart blooms. Imagine orris butter with the sun-warmed florals, together giving soft glam energy. And the finish? The notes of vetiver, cashmere, vanilla and white musk, enwrapping you in an EAU-so gentle sea breeze and awakening your senses with its sensual warmth.

## Perfect for
Enjoyers of late Mediterranean brunches are turning into magical boat parties. Those sending the texts saying: “come outside, we’re going to Los!”. EAU de Santorini is capturing that radiant, rooftop, sun-glow energy. One spritz, and you are the life of the party. The fragrance makes you cherish every moment.

## How to use
• Spray EAU de Santorini Hair Perfume onto your hair, holding 15-20 cm away.
• Apply to dry hair for the best fragrance experience.
• Give your hair a flip to emit the irresistible scent.
• Reapply throughout the day as desired.

## Ingredients
Alcohol Denat., Parfum, Aqua, Benzoic Acid, Limonene, Linalool, Hydrolyzed Silk, Isoeugenol, Geraniol, Citral, CI 17200, Argania Spinosa Kernel Oil, CI 14700, Ethylhexyl Methoxycinnnamate.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('EAU de Santorini Hair Perfume 15ml');
UPDATE "Product" SET "description" = 'Give your hair the ultimate hydration boost with our Hyaluronic Plump Hydrating Shampoo. Enriched with hyaluronic acid and plant-based keratin, this formula leaves your hair soft, shiny and revitalised without any heaviness. Ideal for all hair types, especially those needing extra shine and deep conditioning.

## Details
The Hyaluronic Plump Hydrating Shampoo is more than a cleanser – it’s a treatment giving you deep moisture with every wash. enriched with hyaluronic acid, panthenol, and vegetable keratin. No matter what your hair type is, it leaves your hair feeling weightlessly soft, visibly shinier with that extra bounce we all crave.

Hyaluronic acid locks in intense moisture, plumping each strand for the voluminous look, without the frizzy texture. It keeps your hair soft, smooth and gives your hair a lustrous appearance. Additionally it also works wonders on your scalp, helping to reduce dryness and flakiness.

Panthenol, or provitamin B5, penetrates deep into the hair, improving the elasticity and preventing damage. It reduces the split ends, giving your hair a natural gloss, making it shiny, healthy and easy to manage.

Vegetable keratin fills in the gaps in hair’s structure, reducing breakage from within. It enhances volume, without weighing hair down and provides a protective barrier against any following styling.

And then there’s the EAU de Capri energizing fragrance. Together the notes of green apple, kiwi and delicate flowers leave an essence of sun-drenched shores.

This shampoo is perfect for anyone looking to boost hydration, shine, and overall hair health. It’s gentle and renewing, ensuring your hair smells as refreshed as it feels.

## Perfect for
Whether your hair is curly, straight, wavy, or somewhere in between, the Hyaluronic Plump Hydrating Shampoo is the ultimate frizz saviour. A fresh coat of gloss with deep hydration is a transformative scent-sational treatment.

## How to use
• Start your treatment with Hyaluronic Plump Hydrating Shampoo. Massage in, feel the foam, and rinse for smooth, hydrated hair.
• Slather on the Hyaluronic Renew Hydrating Mask, leave for 5–10 minutes, then rinse to lock in all that juicy moisture
• Towel-dry, apply Hydrate & Shield Leave-in Conditioner, and voilà—frizz-free, smooth hair with zero rinse required!

## Ingredients
Water, Sodium C14-16 Olefin Sulfonate, Cocamidopropyl Betaine, Sodium Chloride, Sodium Lauroyl Methyl Isethionate, Benzyl Alcohol, Fragrance, Stearyl Dihydroxypropyldimonium Oligosaccharides, Polyquaternium-7, Hydroxypropyl Guar Hydroxypropyltrimonium Chloride, Sodium Benzoate, Propylene Glycol, Tocopheryl Acetate, Benzoic Acid, Citric Acid, Linalool, Linalyl Acetate, Panthenol, Acetyl Cedrene, Tetramethyl Acetyloctahydronaphthalenes, Sorbic Acid, Trisodium Ethylenediamine Disuccinate, Hydroxypropyltrimonium Corn/Wheat/Soy Amino Acids, Sodium Hyaluronate, Phenoxyethanol, Leuconostoc/Radish Root Ferment Filtrate.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('EAU de Capri Hyaluronic Plump Hydrating Shampoo 250ml');
UPDATE "Product" SET "description" = 'Give your hair the ultimate hydration boost with our Hyaluronic Plump Hydrating Shampoo. Enriched with hyaluronic acid and plant-based keratin, this formula leaves your hair soft, shiny and revitalised without any heaviness. Ideal for all hair types, especially those needing extra shine and deep conditioning.

## Details
The Hyaluronic Plump Hydrating Shampoo is more than a cleanser – it’s a treatment giving you deep moisture with every wash. enriched with hyaluronic acid, panthenol, and vegetable keratin. No matter what your hair type is, it leaves your hair feeling weightlessly soft, visibly shinier with that extra bounce we all crave.

Hyaluronic acid locks in intense moisture, plumping each strand for the voluminous look, without the frizzy texture. It keeps your hair soft, smooth and gives your hair a lustrous appearance. Additionally it also works wonders on your scalp, helping to reduce dryness and flakiness.

Panthenol, or provitamin B5, penetrates deep into the hair, improving the elasticity and preventing damage. It reduces the split ends, giving your hair a natural gloss, making it shiny, healthy and easy to manage.

Vegetable keratin fills in the gaps in hair’s structure, reducing breakage from within. It enhances volume, without weighing hair down and provides a protective barrier against any following styling.

And then there’s the EAU de Capri energizing fragrance. Together the notes of green apple, kiwi and delicate flowers leave an essence of sun-drenched shores.

This shampoo is perfect for anyone looking to boost hydration, shine, and overall hair health. It’s gentle and renewing, ensuring your hair smells as refreshed as it feels.

## Perfect for
Whether your hair is curly, straight, wavy, or somewhere in between, the Hyaluronic Plump Hydrating Shampoo is the ultimate frizz saviour. A fresh coat of gloss with deep hydration is a transformative scent-sational treatment.

## How to use
• Start your treatment with Hyaluronic Plump Hydrating Shampoo. Massage in, feel the foam, and rinse for smooth, hydrated hair.
• Slather on the Hyaluronic Renew Hydrating Mask, leave for 5–10 minutes, then rinse to lock in all that juicy moisture
• Towel-dry, apply Hydrate & Shield Leave-in Conditioner, and voilà—frizz-free, smooth hair with zero rinse required!

## Ingredients
Water, Sodium C14-16 Olefin Sulfonate, Cocamidopropyl Betaine, Sodium Chloride, Sodium Lauroyl Methyl Isethionate, Benzyl Alcohol, Fragrance, Stearyl Dihydroxypropyldimonium Oligosaccharides, Polyquaternium-7, Hydroxypropyl Guar Hydroxypropyltrimonium Chloride, Sodium Benzoate, Propylene Glycol, Tocopheryl Acetate, Benzoic Acid, Citric Acid, Linalool, Linalyl Acetate, Panthenol, Acetyl Cedrene, Tetramethyl Acetyloctahydronaphthalenes, Sorbic Acid, Trisodium Ethylenediamine Disuccinate, Hydroxypropyltrimonium Corn/Wheat/Soy Amino Acids, Sodium Hyaluronate, Phenoxyethanol, Leuconostoc/Radish Root Ferment Filtrate.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('EAU de Capri Hyaluronic Plump Hydrating Shampoo 750ml');
UPDATE "Product" SET "description" = 'Does your hair feel damaged, dry or frizzy? Give it the ultimate hydration with our Hyaluronic Renew Hydrating Mask. Packed with hyaluronic acid, panthenol, and aloe vera, it’ll leave your hair soft, shiny, and revived.

## Details
Time for a hair transformation with our Hyaluronic Renew Hydrating Mask! It has the dream combination of hyaluronic acid, panthenol and aloe vera, which together get rid of any dryness and damage.

Hyaluronic acid locks in all the moisture, keeping your hair hydrated and looking fresh. Panthenol adds shine and softness, making your hair feel smooth and healthy. Aloe vera calms and nourishes your scalp, giving your hair that fresh-from-the-salon finish.

If your hair’s dry, damaged or a little frizzy, this mask will work wonders. Paired with our Hyaluronic Shampoo, it’s a perfect solution for dehydrated hair. Plump & bloom in the scent of EAU de Capri and get that soft and shiny look!

## Perfect for
Our hyaluronic acid hair mask is suitable for all hair types. It deeply hydrates dry hair, smooths frizz, and repairs damage with aloe vera and panthenol. Even fine hair gains additional volume and elasticity without feeling heavy.

## How to use
• Cleanse your hair with Hyaluronic Plump Hydrating Shampoo and gently squeeze out excess water.
• Apply a quarter-size amount of the mask, focusing on mid-lengths and ends.
• Wait for 3–5 minutes while it works its hydrating magic.
• Rinse out the mask. Make sure there’s no residue left behind.

## Ingredients
Aqua, Cetearyl Alcohol, Behentrimonium Chloride, Isopentyldiol, Sorbitol, Cetyl Palmitate, Glycerin, Isopropyl Alcohol, Benzyl Alcohol, Parfum, Aloe Barbadensis Leaf Juice Powder, Benzoic Acid, Linalool, Linalyl Acetate, Panthenol, Acetyl Cedrene, Tetramethyl Acetyloctahydronaphthalenes, Sorbic Acid, Sodium Hydroxide, Sodium Hyaluronate, Phenoxyethanol.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('EAU de Capri Hyaluronic Renew Hydrating Mask 200ml');
UPDATE "Product" SET "description" = 'Does your hair feel damaged, dry or frizzy? Give it the ultimate hydration with our Hyaluronic Renew Hydrating Mask. Packed with hyaluronic acid, panthenol, and aloe vera, it’ll leave your hair soft, shiny, and revived.

## Details
Time for a hair transformation with our Hyaluronic Renew Hydrating Mask! It has the dream combination of hyaluronic acid, panthenol and aloe vera, which together get rid of any dryness and damage.

Hyaluronic acid locks in all the moisture, keeping your hair hydrated and looking fresh. Panthenol adds shine and softness, making your hair feel smooth and healthy. Aloe vera calms and nourishes your scalp, giving your hair that fresh-from-the-salon finish.

If your hair’s dry, damaged or a little frizzy, this mask will work wonders. Paired with our Hyaluronic Shampoo, it’s a perfect solution for dehydrated hair. Plump & bloom in the scent of EAU de Capri and get that soft and shiny look!

## Perfect for
Our hyaluronic acid hair mask is suitable for all hair types. It deeply hydrates dry hair, smooths frizz, and repairs damage with aloe vera and panthenol. Even fine hair gains additional volume and elasticity without feeling heavy.

## How to use
• Cleanse your hair with Hyaluronic Plump Hydrating Shampoo and gently squeeze out excess water.
• Apply a quarter-size amount of the mask, focusing on mid-lengths and ends.
• Wait for 3–5 minutes while it works its hydrating magic.
• Rinse out the mask. Make sure there’s no residue left behind.

## Ingredients
Aqua, Cetearyl Alcohol, Behentrimonium Chloride, Isopentyldiol, Sorbitol, Cetyl Palmitate, Glycerin, Isopropyl Alcohol, Benzyl Alcohol, Parfum, Aloe Barbadensis Leaf Juice Powder, Benzoic Acid, Linalool, Linalyl Acetate, Panthenol, Acetyl Cedrene, Tetramethyl Acetyloctahydronaphthalenes, Sorbic Acid, Sodium Hydroxide, Sodium Hyaluronate, Phenoxyethanol.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('EAU de Capri Hyaluronic Renew Hydrating Mask 750ml');
UPDATE "Product" SET "description" = 'Bring your curls to life with the Define & Bounce Texture and Curl Shampoo. Specially made for textured and curly hair, from soft waves to tight coils. This creamy formula deeply hydrates, reduces frizz and enhances curl definition. Enriched with nourishing oils and butters, it leaves curls soft, shiny and healthy. The perfect start to every curly hair routine.

## Details
Give your curls the love they deserve with the Define & Bounce Texture and Curl Shampoo. Designed for textured and curly hair, this gentle cleanser boosts hydration, smooths frizz and enhances curl retention while keeping your hair light and soft.

The nourishing blend of oils and butters wraps each curl in moisture, helping to retain shape and bounce even in humid conditions. This lush formula is lightweight, 100% vegan and free from unnecessary ingredients.

Phytokeratin, a plant-based protein from corn, wheat and soy, strengthens hair from within, improving elasticity and preventing breakage while maintaining the hair’s natural structure.

Infused with the fresh, breezy scent of EAU de Santorini, it turns every wash into a spa-like ritual.

## Perfect for
Ideal for curls that tend to frizz or lose shape, this shampoo restores vitality and shine. Suitable for textured, curly and wavy hair that craves hydration, bounce and smooth definition.

## How to use
• Start your treatment with the Define & Bounce Shampoo. Apply to wet or damp hair. rinse for healthy, hydrated curls.
• Gently massage the scalp to activate the formula and rinse througly afterwards.

## Ingredients
Aqua, Sodium C14-16 Olefin Sulfonate, Cocamide Dea, Cocamidopropyl Betaine, Benzyl Alcohol, Parfum, Sodium Chloride, Glycerin, Polyquaternium-7, Hydroxypropyl Guar Hydroxypropyltrimonium Chloride, Sodium Benzoate, Citric Acid, Tocopheryl Acetate, Hydrolyzed Corn Starch, Benzoic Acid, Hydroxypropyltrimonium Corn/Wheat/Soy Amino Acids, Linalool, Linalyl Acetate, Panthenol, Glycine Soja Oil, Acetyl Cedrene, Tetramethyl Acetyloctahydronaphthalenes, Sorbic Acid, Hydroxypropyltrimonium Inulin, Leuconostoc/Radish Root Ferment Filtrate, Gossypium Herbaceum Seed Oil, Helianthus Annuus Seed Oil, Mangifera Indica Seed Butter, Olea Europaea Fruit Oil, Persea Gratissima Oil, Prunus Amygdalus Dulcis Oil, Tocopherol.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('Define & Bounce Texture and Curl Shampoo 250ml');
UPDATE "Product" SET "description" = 'Bring your curls to life with the Define & Bounce Texture and Curl Shampoo. Specially made for textured and curly hair, from soft waves to tight coils. This creamy formula deeply hydrates, reduces frizz and enhances curl definition. Enriched with nourishing oils and butters, it leaves curls soft, shiny and healthy. The perfect start to every curly hair routine.

## Details
Give your curls the love they deserve with the Define & Bounce Texture and Curl Shampoo. Designed for textured and curly hair, this gentle cleanser boosts hydration, smooths frizz and enhances curl retention while keeping your hair light and soft.

The nourishing blend of oils and butters wraps each curl in moisture, helping to retain shape and bounce even in humid conditions. This lush formula is lightweight, 100% vegan and free from unnecessary ingredients.

Phytokeratin, a plant-based protein from corn, wheat and soy, strengthens hair from within, improving elasticity and preventing breakage while maintaining the hair’s natural structure.

Infused with the fresh, breezy scent of EAU de Santorini, it turns every wash into a spa-like ritual.

## Perfect for
Ideal for curls that tend to frizz or lose shape, this shampoo restores vitality and shine. Suitable for textured, curly and wavy hair that craves hydration, bounce and smooth definition.

## How to use
• Start your treatment with the Define & Bounce Shampoo. Apply to wet or damp hair. rinse for healthy, hydrated curls.
• Gently massage the scalp to activate the formula and rinse througly afterwards.

## Ingredients
Aqua, Sodium C14-16 Olefin Sulfonate, Cocamide Dea, Cocamidopropyl Betaine, Benzyl Alcohol, Parfum, Sodium Chloride, Glycerin, Polyquaternium-7, Hydroxypropyl Guar Hydroxypropyltrimonium Chloride, Sodium Benzoate, Citric Acid, Tocopheryl Acetate, Hydrolyzed Corn Starch, Benzoic Acid, Hydroxypropyltrimonium Corn/Wheat/Soy Amino Acids, Linalool, Linalyl Acetate, Panthenol, Glycine Soja Oil, Acetyl Cedrene, Tetramethyl Acetyloctahydronaphthalenes, Sorbic Acid, Hydroxypropyltrimonium Inulin, Leuconostoc/Radish Root Ferment Filtrate, Gossypium Herbaceum Seed Oil, Helianthus Annuus Seed Oil, Mangifera Indica Seed Butter, Olea Europaea Fruit Oil, Persea Gratissima Oil, Prunus Amygdalus Dulcis Oil, Tocopherol.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('Define & Bounce Texture and Curl Shampoo 750ml');
UPDATE "Product" SET "description" = 'Revive your curls with EAU’s Define & Renew Texture and Curl Mask. Enriched with nourishing oils, butters and 100% vegan formula, this hydrating hair mask for curly and textured hair delivers maximum moisture, shine and curl definition. This makes it the perfect match for any curly girl’s routine. Say goodbye to dryness and hello to soft, bouncy, and vibrant curls!

## Details
The Define & Renew Texture and Curl Mask is your go-to treatment for curl revival. This rich, creamy mask provides deep hydration for textured and curly hair, restoring softness, elasticity and curl definition with every use. The result: smooth, shiny curls that move naturally.

Phytokeratin strengthens and smooths from the inside out, improving elasticity for healthy, hydrated curls. It helps repair and protect curls from dryness and damage, leaving hair soft, light and full of life.

Infused with aloe vera and a blend of natural oils, like cocoa, almond, avocado and olive, this vegan formula is free from silicones, sulfates and parabens making this a curly girl-approved formula.

Scented with EAU de Santorini, it brings a fresh Mediterranean touch to every curl ritual. The ultimate nourishing mask for curly and textured hair.

## Perfect for
All curly and textured hair types. The Define & Renew Mask delivers intense hydration, smooths frizz and enhances curl definition. Even fine curls gain elasticity and shine without feeling weighted down.

## How to use
• Cleanse your hair with Define & Bounce Shampoo and gently squeeze out excess water.
• Apply a small amount of the mask to damp hair, focusing on mid-lengths and ends.
• Let it work its magic for 5–10 minutes.
• Rinse thoroughly, revealing soft and bouncy curls.

## Ingredients
Aqua, Cetearyl Alcohol, Behentrimonium Chloride, Isopentyldiol, Sorbitol, Glycerin, Isoamyl Laurate, Hydrolyzed Corn Starch, Benzyl Alcohol, Parfum, Glycine Soja Oil, Hydroxypropyltrimonium Inulin, Bht, Benzoic Acid, Linalool, Linalyl Acetate, Acetyl Cedrene, Tetramethyl Acetyloctahydronaphthalenes, Sorbic Acid, Hydroxypropyltrimonium Corn/Wheat/Soy Amino Acids, Sodium Hydroxide, Gossypium Herbaceum Seed Oil, Helianthus Annuus Seed Oil, Mangifera Indica Seed Butter, Olea Europaea Fruit Oil, Persea Gratissima Oil, Prunus Amygdalus Dulcis Oil, Leuconostoc/Radish Root Ferment Filtrate, Tocopherol' WHERE "brand" = 'eau-de-1974' AND "name" IN ('Define & Renew Texture and Curl Mask  200ml');
UPDATE "Product" SET "description" = 'Revive your curls with EAU’s Define & Renew Texture and Curl Mask. Enriched with nourishing oils, butters and 100% vegan formula, this hydrating hair mask for curly and textured hair delivers maximum moisture, shine and curl definition. This makes it the perfect match for any curly girl’s routine. Say goodbye to dryness and hello to soft, bouncy, and vibrant curls!

## Details
The Define & Renew Texture and Curl Mask is your go-to treatment for curl revival. This rich, creamy mask provides deep hydration for textured and curly hair, restoring softness, elasticity and curl definition with every use. The result: smooth, shiny curls that move naturally.

Phytokeratin strengthens and smooths from the inside out, improving elasticity for healthy, hydrated curls. It helps repair and protect curls from dryness and damage, leaving hair soft, light and full of life.

Infused with aloe vera and a blend of natural oils, like cocoa, almond, avocado and olive, this vegan formula is free from silicones, sulfates and parabens making this a curly girl-approved formula.

Scented with EAU de Santorini, it brings a fresh Mediterranean touch to every curl ritual. The ultimate nourishing mask for curly and textured hair.

## Perfect for
All curly and textured hair types. The Define & Renew Mask delivers intense hydration, smooths frizz and enhances curl definition. Even fine curls gain elasticity and shine without feeling weighted down.

## How to use
• Cleanse your hair with Define & Bounce Shampoo and gently squeeze out excess water.
• Apply a small amount of the mask to damp hair, focusing on mid-lengths and ends.
• Let it work its magic for 5–10 minutes.
• Rinse thoroughly, revealing soft and bouncy curls.

## Ingredients
Aqua, Cetearyl Alcohol, Behentrimonium Chloride, Isopentyldiol, Sorbitol, Glycerin, Isoamyl Laurate, Hydrolyzed Corn Starch, Benzyl Alcohol, Parfum, Glycine Soja Oil, Hydroxypropyltrimonium Inulin, Bht, Benzoic Acid, Linalool, Linalyl Acetate, Acetyl Cedrene, Tetramethyl Acetyloctahydronaphthalenes, Sorbic Acid, Hydroxypropyltrimonium Corn/Wheat/Soy Amino Acids, Sodium Hydroxide, Gossypium Herbaceum Seed Oil, Helianthus Annuus Seed Oil, Mangifera Indica Seed Butter, Olea Europaea Fruit Oil, Persea Gratissima Oil, Prunus Amygdalus Dulcis Oil, Leuconostoc/Radish Root Ferment Filtrate, Tocopherol' WHERE "brand" = 'eau-de-1974' AND "name" IN ('Define & Renew Texture and Curl Mask  750ml');
UPDATE "Product" SET "description" = 'Flat hair is not the vibe. Lift & Plump Volumizing Shampoo brings airy body, fresh movement and effortless lift without heaviness. Clean roots, soft lengths and that light, just stepped out into the Hamptons breeze feeling.

## Details
Some days call for volume that feels natural, not forced. Lift & Plump Volumizing Shampoo gently sweeps away buildup and excess oil while keeping hair light, flexible and full of life. The formula refreshes the scalp and creates lift at the roots, giving fine to normal hair the boost it has been waiting for.

This is not a volume that feels stiff or overstyled. It is a soft bounce, airy movement and hair that flows effortlessly. Lightweight conditioning ingredients smooths just enough to keep hair touchable and manageable, while Panthenol and Wheat Germ Extract help support strength and elasticity, so strands feel healthier with every wash.

The result is fresh, lifted hair that moves freely and catches the light. Clean but never stripped. Voluminous but never heavy.

Infused with the fresh, coastal aura of EAU de Hamptons, it turns your wash routine into a sensorial moment inspired by ocean air, relaxed confidence and effortless polish.

Light. Airy. Full of movement.

## Perfect for
Fine to normal hair that lacks volume and feels flat at the roots. Ideal for those who want airy lift, fresh movement and a clean, lightweight finish without heaviness. Perfect for everyday use and for anyone looking to create natural body with that effortless EAU de Hamptons vibe.

## How to use
• Apply to wet hair and focus on the scalp.
• Massage gently to create a light, refreshing lather and work through the lengths.
• Rinse thoroughly and repeat if desired for an extra fresh, airy feel.

## Ingredients
Aqua, Sodium C14-16 Olefin Sulfonate, Cocamide DEA, Cocamidopropyl Betaine, Parfum, Benzyl Alcohol, Propylene Glycol, Glycerin, Sodium Chloride, Tetramethyl Acetyloctahydronaphthalenes, Hydroxypropyl Guar Hydroxypropyltrimonium Chloride, Stearyl Dihydroxypropyldimonium Oligosaccharides, Polyquaternium-7, Citric Acid, Sodium Benzoate, Panthenol, Tocopheryl Acetate, Benzoic Acid, Citrus Limon (Lemon) Peel Oil, Limonene, Sorbic Acid, Juniperus Virginiana (Cedarwood) Oil, Coumarin, Linalool, Linalyl Acetate, Pogostemon Cablin (Patchouli) Oil, Pinene, Triticum Vulgare (Wheat) Germ Extract.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('Volume & Lift Shampoo 250ml - EAU de Hamptons');
UPDATE "Product" SET "description" = 'Flat hair is not the vibe. Lift & Plump Volumizing Shampoo brings airy body, fresh movement and effortless lift without heaviness. Clean roots, soft lengths and that light, just stepped out into the Hamptons breeze feeling.

## Details
Some days call for volume that feels natural, not forced. Lift & Plump Volumizing Shampoo gently sweeps away buildup and excess oil while keeping hair light, flexible and full of life. The formula refreshes the scalp and creates lift at the roots, giving fine to normal hair the boost it has been waiting for.

This is not a volume that feels stiff or overstyled. It is a soft bounce, airy movement and hair that flows effortlessly. Lightweight conditioning ingredients smooths just enough to keep hair touchable and manageable, while Panthenol and Wheat Germ Extract help support strength and elasticity, so strands feel healthier with every wash.

The result is fresh, lifted hair that moves freely and catches the light. Clean but never stripped. Voluminous but never heavy.

Infused with the fresh, coastal aura of EAU de Hamptons, it turns your wash routine into a sensorial moment inspired by ocean air, relaxed confidence and effortless polish.

Light. Airy. Full of movement.

## Perfect for
Fine to normal hair that lacks volume and feels flat at the roots. Ideal for those who want airy lift, fresh movement and a clean, lightweight finish without heaviness. Perfect for everyday use and for anyone looking to create natural body with that effortless EAU de Hamptons vibe.

## How to use
• Apply to wet hair and focus on the scalp.
• Massage gently to create a light, refreshing lather and work through the lengths.
• Rinse thoroughly and repeat if desired for an extra fresh, airy feel.

## Ingredients
Aqua, Sodium C14-16 Olefin Sulfonate, Cocamide DEA, Cocamidopropyl Betaine, Parfum, Benzyl Alcohol, Propylene Glycol, Glycerin, Sodium Chloride, Tetramethyl Acetyloctahydronaphthalenes, Hydroxypropyl Guar Hydroxypropyltrimonium Chloride, Stearyl Dihydroxypropyldimonium Oligosaccharides, Polyquaternium-7, Citric Acid, Sodium Benzoate, Panthenol, Tocopheryl Acetate, Benzoic Acid, Citrus Limon (Lemon) Peel Oil, Limonene, Sorbic Acid, Juniperus Virginiana (Cedarwood) Oil, Coumarin, Linalool, Linalyl Acetate, Pogostemon Cablin (Patchouli) Oil, Pinene, Triticum Vulgare (Wheat) Germ Extract.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('Volume & Lift Shampoo 750ml - EAU de Hamptons');
UPDATE "Product" SET "description" = 'Soft volume without weight. Lift & Boost Volumizing Conditioner detangles, smooths and enhances shine while maintaining natural lift and airy movement.

## Details
Volume should feel light, not heavy. Lift & Boost Volumizing Conditioner is designed to soften and smooth the lengths while preserving lift at the roots. The lightweight formula detangles effortlessly and enhances manageability without flattening fine to normal hair.

Instead of coating the hair, it conditions with a balanced system that keeps strands flexible and full of movement. Panthenol helps enhance softness and shine, while Wheat Germ Extract supports strength and elasticity, so hair feels healthier and more resilient over time.

The texture is light and creamy, easy to distribute and quick to rinse. After use, hair feels smooth, airy and refreshed with a maintained bounce and natural body.

Infused with the fresh, coastal aura of EAU de Hamptons, this conditioner turns your routine into a sensorial moment inspired by ocean air and effortless elegance.

Soft. Light. Effortlessly lifted.

## Perfect for
Fine to normal hair that needs softness and shine without losing volume. Ideal for those who want manageable lengths and lifted roots in one effortless step.

## How to use
• After shampooing, apply a small amount to mid lengths and ends.
• Distribute evenly using your fingers or a wide tooth comb to gently detangle.
• Leave on briefly, then rinse thoroughly to maintain lift and airy movement at the roots.

## Ingredients
Aqua, Cetearyl Alcohol, Behentrimonium Chloride, Isopentyldiol, Parfum, Cetyl Palmitate, Benzyl Alcohol, Isopropyl Alcohol, Glycerin, Propylene Glycol, Tetramethyl Acetyloctahydronaphthalenes, Hydroxyethylcellulose, Panthenol, Benzoic Acid, Citrus Limon Peel Oil, Sorbic Acid, Limonene, Juniperus Virginiana Oil, Coumarin, Linalool, Linalyl Acetate, Sodium Hydroxide, Pogostemon Cablin Oil, Pinene, Triticum Vulgare Germ Extract, Benzyl Benzoate, Beta Caryophyllene, Citral, Disodium Phosphate, Polysorbate 60, Sodium Phosphate.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('Volume & Lift Conditioner 750ml - EAU de Hamptons');
UPDATE "Product" SET "description" = 'Wake up your senses with the Capri Body Wash. Infused with hyaluronic acid to lock in moisture, it leaves your skin feeling fresh, soft and hydrated. A sparkling citrus escape inspired by sun-drenched Italian coastlines.

• Gentle, soft-foaming formula that hydrates without stripping the skin
• Hyaluronic acid that keeps skin balanced and refreshed
• Lightly scented with a fresh, citrus-inspired summer fragrance
• An everyday shower that feels like a mini getaway

## Details
Say hello to soft, hydrated skin with the EAU Body Wash – Capri edition. Infused with hyaluronic acid to help retain moisture, this soft-foaming formula deeply nourishes while cleansing gently.

Inspired by the vibrant freshness of Capri, this body wash awakens your senses with bright citrus notes and a clean, uplifting feel. Skin is left smooth, refreshed and lightly scented.

Packed with gentle, skin-loving ingredients, it cleanses without stripping, keeping your skin balanced and happy. Every shower feels like a sunny Mediterranean escape.

Turn your daily shower into a revitalising ritual. Perfect for a fresh start to your day or a post-sun refresh.

## Perfect for
All skin types looking for gentle hydration and your daily shower routine in need of a touch of Mediterranean freshness. Suitable for everyone and anyone craving soft, nourished skin.

## How to use
• Apply a small amount to wet skin.
• Massage into a soft, foamy lather.
• Rinse thoroughly and enjoy soft, lightly scented skin.

## Ingredients
Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Parfum, PEG-7 Glyceryl Cocoate, Sodium Hyaluronate, Benzyl Alcohol, Polyquaternium-7, Sodium Benzoate, Linalool, Linalyl Acetate, Acetyl Cedrene, Tetramethyl Acetyloctahydronaphthalenes, Citric Acid, Benzoic Acid, PEG-120 Methyl Glucose Dioleate, Sorbic Acid, Citrus Limon Peel Oil, Limonene, Pinene, Beta-Caryophyllene, Phenoxyethanol, Tocopherol.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('Hyaluronic Body wash - EAU de Capri 250ml');
UPDATE "Product" SET "description" = 'Wake up your senses with the Santorini Body Wash. Hydrating hyaluronic acid leaves your skin soft and refreshed. A luminous escape inspired by sunlit Greek islands.

• Gentle, soft-foaming formula that hydrates without stripping the skin
• Hyaluronic acid that keeps skin balanced and refreshed
• Lightly scented with a bright, sun-kissed Mediterranean fragrance
• An everyday shower that feels like a mini getaway

## Details
Say hello to soft, hydrated skin with the EAU Body Wash – Santorini edition. Powered by hyaluronic acid to lock in moisture, this gentle formula cleanses while keeping skin smooth and nourished.

Inspired by the bright, airy essence of Santorini, this fragrance blends citrus freshness with soft aromatic warmth. Skin feels refreshed, silky and delicately scented.

With skin-loving ingredients, it cleanses without stripping, maintaining a natural balance. Every shower becomes a light, sun-kissed escape.

Transform your daily routine into a refreshing ritual—perfect for warm days, post-beach moments or everyday indulgence.

## Perfect for
All skin types looking for gentle hydration and your daily shower routine in need of a touch of Mediterranean freshness. Suitable for everyone and anyone craving soft, nourished skin.

## How to use
• Apply a small amount to wet skin.
• Massage into a soft, foamy lather.
• Rinse thoroughly and enjoy soft, lightly scented skin.

## Ingredients
Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Parfum, PEG-7 Glyceryl Cocoate, Sodium Hyaluronate, Benzyl Alcohol, Polyquaternium-7, Sodium Benzoate, Citric Acid, Tetramethyl Acetyloctahydronaphthalenes, Linalyl Acetate, Benzoic Acid, Limonene, Pogostemon Cablin Oil, Linalool, Sorbic Acid, Citrus Aurantium Peel Oil, Pinene, Phenoxyethanol.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('Hyaluronic Body wash - EAU de Santorini 250ml');
UPDATE "Product" SET "description" = 'Wake up your senses with the Hamptons Body Wash. With hydrating hyaluronic acid, it leaves skin soft, fresh and balanced. A breezy coastal escape with a warm, woody elegance.

• Gentle, soft-foaming formula that hydrates without stripping the skin
• Hyaluronic acid that keeps skin balanced and refreshed
• Lightly scented with a soft, woody coastal fragrance
• An everyday shower that feels like a mini getaway

## Details
Say hello to soft, hydrated skin with the EAU Body Wash – Hamptons edition. Enriched with hyaluronic acid to maintain moisture balance, this soft-foaming formula cleanses gently while nourishing deeply.

Inspired by laid-back luxury and coastal air, Hamptons blends fresh citrus with soft woods for a refined, effortless scent. Skin feels clean, smooth and subtly perfumed.

Formulated with gentle ingredients, it cleanses without drying, making every shower a moment of calm indulgence.

Turn your everyday routine into a relaxed summer ritual—perfect after a long day or a quiet self-care moment.

## Perfect for
All skin types looking for gentle hydration and your daily shower routine in need of a touch of Mediterranean freshness. Suitable for everyone and anyone craving soft, nourished skin.

## How to use
• Apply a small amount to wet skin.
• Massage into a soft, foamy lather.
• Rinse thoroughly and enjoy soft, lightly scented skin.

## Ingredients
Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Parfum, PEG-7 Glyceryl Cocoate, Sodium Hyaluronate, Benzyl Alcohol, Tetramethyl Acetyloctahydronaphthalenes, Polyquaternium-7, Sodium Benzoate, Citric Acid, Benzoic Acid, Citrus Limon Peel Oil, PEG-120 Methyl Glucose Dioleate, Limonene, Juniperus Virginiana Oil, Coumarin, Linalool, Linalyl Acetate, Sorbic Acid, Pogostemon Cablin Oil, Pinene, Phenoxyethanol, Tocopherol.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('Hyaluronic Body wash - EAU de Hamptons 250ml');
UPDATE "Product" SET "description" = 'This hand cream gets it. Packed with Argan Oil, Shea Butter, Phytokeratin, and Allantoin, it’s all about hydration and keeping your hands soft and smooth. The derm-approved formula absorbs fast with no stickiness. Perfect for all skin types. t’s your go-to for nourished skin with a subtle EAU de Santorini vibe.

## Details
Let’s be real—dry hands are the worst. But don’t worry, this hand cream’s got your back with a blend of Argan Oil, Shea Butter, Phytokeratin, and Allantoin.

Argan Oil is your hydration hero, loaded with vitamin E and antioxidants to deeply nourish and protect your skin. Shea Butter, straight from the rich nuts of the African tree, locks in moisture and shields your hands from the elements. Phytokeratin, made from plant based proteins like wheat and soy, boosts hydration and strengthens your skin’s natural barrier, leaving your hands feeling soft and refreshed. And to top it off, Allantoin soothes sensitive skin, reduces irritation, and enhances smoothness.

With its fast absorbing, non greasy formula, this cream glides on effortlessly and leaves your hands feeling fresh and hydrated with no sticky residue. Plus, the elegant EAU de Santorini scent adds a touch of Mediterranean glamour to your routine, inspired by golden sunsets and effortless sophistication.

## Perfect for
The Hydrate and Protect Hand Cream is that little extra love your hands have been waiting for. Like a hydration superhero, it smooths rough patches, soothes dryness, and keeps your skin feeling soft and cared for. Whether it’s winter chill, endless hand washing, or just craving a silky-smooth moment, this cream’s got you.

## How to use
• Squeeze a little bit of cream into your palm (a little goes a long way!).
• Rub your hands together to warm it up and get it nice and smooth.
• Massage it all over your hands, focusing on dry spots like your knuckles and cuticles.
• Top up throughout the day, especially after washing your hands or being out in the cold

## Ingredients
Aqua, Glycerin, Paraffinum Liquidum, Cetearyl Alcohol, Dimethicone, Glyceryl Stearate, PEG-100 Stearate, Synthetic Beeswax, Phenoxyethanol, Parfum, PEG-30 Dipolyhydroxystearate, Allantoin, Butyrospermum Parkii Butter, Chlorphenesin, Tocopherol, Stearyl Dihydroxypropyldimonium Oligosaccharides, Helianthus Annuus Seed Oil, Argania Spinosa Kernel Oil, Propylene Glycol, Tetramethyl Acetyloctahydronaphthalenes, Linalyl Acetate, Hydroxypropyltrimonium Corn/Wheat/Soy Amino Acids, Limonene, Pogostemon Cablin Oil, Linalool, Citrus Aurantium Peel Oil, Sodium Hydroxide, Pinene, Citrus Limon Peel Oil, Beta-Caryophyllene, Leuconostoc/Radish Root Ferment Filtrate.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('Hydrate & Protect Hand Cream - EAU de Santorini 50ml');
UPDATE "Product" SET "description" = 'This hand cream gets it. Packed with Argan Oil, Shea Butter, Phytokeratin, and Allantoin, it’s all about hydration and keeping your hands soft and smooth. The derm-approved formula absorbs fast with no stickiness. Perfect for all skin types. It’s your go-to for nourished skin with a subtle EAU de Hamptons vibe.

## Details
Let’s be real—dry hands are the worst. But don’t worry, this hand cream’s got your back with a blend of Argan Oil, Shea Butter, Phytokeratin, and Allantoin.

Argan Oil is your hydration hero, loaded with vitamin E and antioxidants to deeply nourish and protect your skin. Shea Butter, straight from the rich nuts of the African tree, locks in moisture and shields your hands from the elements. Phytokeratin, made from plant based proteins like wheat and soy, boosts hydration and strengthens your skin’s natural barrier, leaving your hands feeling soft and refreshed. And to top it off, Allantoin soothes sensitive skin, reduces irritation, and enhances smoothness.

With its fast absorbing, non greasy formula, this cream glides on effortlessly and leaves your hands feeling fresh and hydrated with no sticky residue. Plus, the relaxed EAU de Hamptons scent wraps your hands in a breezy coastal vibe that feels fresh, effortless and easy to wear.

## Perfect for
The Hydrate and Protect Hand Cream is that little extra love your hands have been waiting for. Like a hydration superhero, it smooths rough patches, soothes dryness, and keeps your skin feeling soft and cared for. Whether it’s winter chill, endless hand washing, or just craving a silky-smooth moment, this cream’s got you.

## How to use
• Squeeze a little bit of cream into your palm (a little goes a long way!).
• Rub your hands together to warm it up and get it nice and smooth.
• Massage it all over your hands, focusing on dry spots like your knuckles and cuticles.
• Top up throughout the day, especially after washing your hands or being out in the cold

## Ingredients
Aqua, Glycerin, Paraffinum Liquidum, Cetearyl Alcohol, Dimethicone, Glyceryl Stearate, PEG-100 Stearate, Synthetic Beeswax, Phenoxyethanol, Parfum, PEG-30 Dipolyhydroxystearate, Allantoin, Butyrospermum Parkii Butter, Chlorphenesin, Tocopherol, Stearyl Dihydroxypropyldimonium Oligosaccharides, Tetramethyl Acetyloctahydronaphthalenes, Helianthus Annuus Seed Oil, Argania Spinosa Kernel Oil, Propylene Glycol, Citrus Limon Peel Oil, Hydroxypropyltrimonium Corn/Wheat/Soy Amino Acids, Limonene, Juniperus Virginiana Oil, Coumarin, Linalool, Linalyl Acetate, Sodium Hydroxide, Pogostemon Cablin Oil, Pinene, Benzyl Benzoate, Beta-Caryophyllene, Leuconostoc/Radish Root Ferment Filtrate.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('Hydrate & Protect Hand Cream - EAU de Hamptons 50ml');
UPDATE "Product" SET "description" = 'This hand cream gets it. Packed with Argan Oil, Shea Butter, Phytokeratin, and Allantoin, it’s all about hydration and keeping your hands soft and smooth. The derm-approved formula absorbs fast with no stickiness. Perfect for all skin types, it’s your go-to for nourished skin with a subtle EAU de Capri vibe.

## Details
Let’s be real—dry hands are the worst. But don’t worry, this hand cream’s got your back with a blend of Argan Oil, Shea Butter, Phytokeratin, and Allantoin.

Argan Oil is your hydration hero, loaded with vitamin E and antioxidants to deeply nourish and protect your skin. Shea Butter, straight from the rich nuts of the African tree, locks in moisture and shields your hands from the elements. Phytokeratin, made from plant-based proteins like wheat and soy, boosts hydration and strengthens your skin’s natural barrier, leaving your hands feeling soft and refreshed. And to top it off, Allantoin soothes sensitive skin, reduces irritation, and enhances smoothness.

With its fast-absorbing, non-greasy formula, this cream glides on effortlessly and leaves your hands feeling fresh and hydrated — no sticky residue here. Plus, the refreshing EAU de Capri scent adds a little Mediterranean magic to your routine.

## Perfect for
The Hydrate and Protect Hand Cream is that little extra love your hands have been waiting for. Like a hydration superhero, it smooths rough patches, soothes dryness, and keeps your skin feeling soft and cared for. Whether it’s winter chill, endless hand washing, or just craving a silky-smooth moment, this cream’s got you.

## How to use
• Squeeze a little bit of cream into your palm (a little goes a long way!).
• Rub your hands together to warm it up and get it nice and smooth.
• Massage it all over your hands, focusing on dry spots like your knuckles and cuticles.
• Top up throughout the day, especially after washing your hands or being out in the cold

## Ingredients
Aqua, Glycerin, Paraffinum Liquidum, Cetearyl Alcohol, Dimethicone, Glyceryl Stearate, PEG-100 Stearate, Synthetic Beeswax, Phenoxyethanol, Parfum, PEG-30 Dipolyhydroxystearate, Allantoin, BHT, Butyrospermum Parkii Butter, Chlorphenesin, Stearyl Dihydroxypropyldimonium Oligosaccharides, Linalool, Linalyl Acetate, Tocopheryl Acetate, Argania Spinosa Kernel Oil, Acetyl Cedrene, Tetramethyl Acetyloctahydronaphthalenes, Propylene Glycol, Hydroxypropyltrimonium Corn/Wheat/Soy Amino Acids, Sodium Hydroxide, Citrus Limon Peel Oil, Limonene, Pinene, Beta-Caryophyllene, Leuconostoc/Radish Root Ferment Filtrate, Tocopherol, Helianthus Annuus Seed Oil.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('EAU de Capri Hydrate & Protect Hand Cream 50ml');
UPDATE "Product" SET "description" = 'Feeling dehydrated? This lightweight formula with Hyaluronic Acid and Shea butter is the perfect solution for your skin! Suitable for all skin types, it hydrates, enhances elasticity and leaves your skin feeling EAU-mazingly soft and plump.

## Details
Pamper your skin with the Hyaluronic Glow Body Lotion, your everyday go-to for hydration and protection. With hyaluronic acid to lock in moisture and keep your skin plump and refreshed, this lotion also features shea butter, extracted from the nuts of the African tree, to nourish, protect and soften. It works as a shield for your skin from environmental stress, while keeping ageing, cracks and dryness at bay.

The texture? Non-sticky and lightweight. Perfect to leave your skin radiant, smooth, and subtly scented. Suitable for all skin types, the Hyaluronic Glow Body Lotion is your daily dose of glow in a bottle.

## Perfect for
Whatever your skin type, dryness doesn’t stand a chance! The Hyaluronic Glow Body Lotion is infused with hyaluronic acid to lock in moisture and shea butter to keep skin soft, smooth, and nourished. From dry, to sensitive, or normal skin — this formula has you covered!

## How to use
• Squeeze a generous amount of lotion into the palms of your hands.
• Massage the lotion onto damp skin right after a bath or shower, or whenever your skin craves deep hydration.
• Pay extra attention to dry areas like elbows and knees, then gently massage the lotion all over your body for soft, nourished skin.

## Ingredients
Aqua, Glycerin, Butyrospermum Parkii Butter, Caprylic/Capric Triglyceride, C13-15 Alkane, Glyceryl Stearate Citrate, Isopropyl Palmitate, Hydrogenated Vegetable Oil, Parfum, Phenoxyethanol, Cetearyl Alcohol, Glyceryl Stearate, Glycine Soja Oil, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Chlorphenesin, Linalool, Linalyl Acetate, Acetyl Cedrene, Xanthan Gum, Tetrasodium Glutamate Diacetate, Tetramethyl Acetyloctahydronaphthalenes, Sodium Hydroxide, Tocopherol, Helianthus Annuus Seed Oil, Sodium Hyaluronate, Citrus Limon Peel Oil, Limonene, Pinene, Beta-Caryophyllene, Gossypium Herbaceum Seed Oil, Mangifera Indica Seed Butter, Olea Europaea Fruit Oil, Persea Gratissima Oil, Prunus Amygdalus Dulcis Oil.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('EAU de Capri Hyaluronic Glow ​Body Lotion 200ml');
UPDATE "Product" SET "description" = 'Feeling dehydrated? This lightweight formula with Hyaluronic Acid and Shea butter is the perfect solution for your skin! Suitable for all skin types, it hydrates, enhances elasticity and leaves your skin feeling EAU-mazingly soft and plump.

## Details
Pamper your skin with the Hyaluronic Glow Body Lotion, your everyday go-to for hydration and protection. With hyaluronic acid to lock in moisture and keep your skin plump and refreshed, this lotion also features shea butter, extracted from the nuts of the African tree, to nourish, protect and soften. It works as a shield for your skin from environmental stress, while keeping ageing, cracks and dryness at bay.

The texture? Non-sticky and lightweight. Perfect to leave your skin radiant, smooth, and subtly scented. Suitable for all skin types, the Hyaluronic Glow Body Lotion is your daily dose of glow in a bottle.

## Perfect for
Whatever your skin type, dryness doesn’t stand a chance! The Hyaluronic Glow Body Lotion is infused with hyaluronic acid to lock in moisture and shea butter to keep skin soft, smooth, and nourished. From dry, to sensitive, or normal skin — this formula has you covered!

## How to use
• Squeeze a generous amount of lotion into the palms of your hands.
• Massage the lotion onto damp skin right after a bath or shower, or whenever your skin craves deep hydration.
• Pay extra attention to dry areas like elbows and knees, then gently massage the lotion all over your body for soft, nourished skin.

## Ingredients
Aqua, Glycerin, Butyrospermum Parkii Butter, Caprylic/Capric Triglyceride, C13-15 Alkane, Glyceryl Stearate Citrate, Isopropyl Palmitate, Hydrogenated Vegetable Oil, Parfum, Phenoxyethanol, Cetearyl Alcohol, Glyceryl Stearate, Glycine Soja Oil, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Chlorphenesin, Linalool, Linalyl Acetate, Acetyl Cedrene, Xanthan Gum, Tetrasodium Glutamate Diacetate, Tetramethyl Acetyloctahydronaphthalenes, Sodium Hydroxide, Tocopherol, Helianthus Annuus Seed Oil, Sodium Hyaluronate, Citrus Limon Peel Oil, Limonene, Pinene, Beta-Caryophyllene, Gossypium Herbaceum Seed Oil, Mangifera Indica Seed Butter, Olea Europaea Fruit Oil, Persea Gratissima Oil, Prunus Amygdalus Dulcis Oil.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('EAU de Santorini Hyaluronic Glow Body Lotion 200ml');
UPDATE "Product" SET "description" = 'Feeling dehydrated? This lightweight formula with Hyaluronic Acid and Shea butter is the perfect solution for your skin! Suitable for all skin types, it hydrates, enhances elasticity and leaves your skin feeling EAU-mazingly soft and plump.

## Details
Pamper your skin with the Hyaluronic Glow Body Lotion, your everyday go-to for hydration and protection. With hyaluronic acid to lock in moisture and keep your skin plump and refreshed, this lotion also features shea butter, extracted from the nuts of the African tree, to nourish, protect and soften. It works as a shield for your skin from environmental stress, while keeping ageing, cracks and dryness at bay.

The texture? Non-sticky and lightweight. Perfect to leave your skin radiant, smooth, and subtly scented. Suitable for all skin types, the Hyaluronic Glow Body Lotion is your daily dose of glow in a bottle.

## Perfect for
Whatever your skin type, dryness doesn’t stand a chance! The Hyaluronic Glow Body Lotion is infused with hyaluronic acid to lock in moisture and shea butter to keep skin soft, smooth, and nourished. From dry, to sensitive, or normal skin — this formula has you covered!

## How to use
• Squeeze a generous amount of lotion into the palms of your hands.
• Massage the lotion onto damp skin right after a bath or shower, or whenever your skin craves deep hydration.
• Pay extra attention to dry areas like elbows and knees, then gently massage the lotion all over your body for soft, nourished skin.

## Ingredients
Aqua, Glycerin, Butyrospermum Parkii Butter, Caprylic/Capric Triglyceride, C13-15 Alkane, Glyceryl Stearate Citrate, Isopropyl Palmitate, Hydrogenated Vegetable Oil, Parfum, Phenoxyethanol, Cetearyl Alcohol, Glyceryl Stearate, Glycine Soja Oil, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Chlorphenesin, Linalool, Linalyl Acetate, Acetyl Cedrene, Xanthan Gum, Tetrasodium Glutamate Diacetate, Tetramethyl Acetyloctahydronaphthalenes, Sodium Hydroxide, Tocopherol, Helianthus Annuus Seed Oil, Sodium Hyaluronate, Citrus Limon Peel Oil, Limonene, Pinene, Beta-Caryophyllene, Gossypium Herbaceum Seed Oil, Mangifera Indica Seed Butter, Olea Europaea Fruit Oil, Persea Gratissima Oil, Prunus Amygdalus Dulcis Oil.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('EAU de Hamptons Hyaluronic Glow Body Lotion 200ml');
UPDATE "Product" SET "description" = 'Your glow-to spray for warm days and long nights. This ultra-fine hair and body spray delivers a soft bronzed shimmer and sun-drenched Santorini scent in every spray. Perfect for both hair and skin, this EAUde1974 Glow & Shimmer Spray always know how to catch the light and shimmers all day long.

• Ultra-fine mist with soft bronzed shimmer
• Suitable for both hair and body
• Enhances natural skin tone and shine
• Lightweight, non-sticky finish
• Infused with the iconic EAU de Santorini scent
• Instant glow , instant summer mood

## Details
Glow on the go with EAU! The Glow & Shimmer Hair and Body Spray is your shortcut to that just-back-from-holiday feeling. Designed for both hair and skin, this ultra-fine shimmer spray adds a subtle, bronzy glow without feeling sticky, heavy, or overdone.

This lightweight shimmer spray enhances your natural skin tone and gives hair a soft, luminous sparkle. No glitter overload, just a smooth, sun-kissed shimmer that makes it look like you belong between the stars. Perfect for golden hours, warm summer nights and everything in between.

Infused with the fresh, sensual notes of EAU de Santorini, this shimmer spray turns every spritz into a mini coastal escape. Bright citrus, blooming floras and a salty sea breeze come together in a scent that feels warm and unmistakably EAU.

The Glow & Shimmer Spray is made for festivals, beach clubs, rooftop evenings or any day that could use a little extra shine.

## Perfect for
Anyone who loves hair and skin shimmer with zero effort. Ideal for summer days, nights out, festivals, beach clubs or whenever you want your hair and skin to look radiant, glossy, and sun kissed.

## How to use
• Shake well before use.
• Spray lightly onto hair, body, or both, from a 20-30 cm distance.
• Let the mist settle and enjoy endless shimmer.

## Ingredients
Butane, Alcohol Denat, Isobutane, Propane, Acrylates Copolymer, Glycerin, Mica, Parfum, Citrus, Aurantium Peel Oil, Limonene, Linalool, Linalyl Acetate, Pinene, Pogostemon Cablin Oil, Tetramethyl acetyloctahydronaphthalenes, CI 77491' WHERE "brand" = 'eau-de-1974' AND "name" IN ('Glow & Shimmer Hair and Body Spray');
UPDATE "Product" SET "description" = 'Get the beachy, textured look you crave with the Salt & Grip Volumizing Spray. Infused with nourishing extract, it adds body, tames frizz and gives you that fresh, matte finish.

## Details
Get the beachy, textured look you love—minus the sunburn. This mineral-rich sea salt spray adds natural texture and volume, giving your hair that carefree, beachy vibe with no hassle. It’s all about that effortless matte finish that looks like you just stepped out of the ocean.

Sunflower seed extract adds hydration to keep your hair soft and shiny, quinoa seed extract strengthens and protects your strands, and vitamin E boosts shine while keeping your hair healthy.

This spray takes care of frizz and flyaways, leaving your hair looking smooth and styled, but still soft to the touch. Plus, it’s easy to wash out or brush through whenever you’re done, making styling as simple as spray, scrunch, and go.

## Perfect for
Anyone wanting that “beachy, just stepped out of the ocean” look. This spray adds volume, smooth waves, and a matte finish—no frizz or crunch, just effortless texture.

## How to use
Give it a good shake—wake up those ingredients!

Spray onto damp or dry hair from about 20–30 cm away, covering roots to ends.

For added root lift, start blow-drying at the roots and work the hair upwards.

To get those easy, breezy beach waves, gently twist sections of your hair and blow-dry from roots to ends—letting the heat set the waves as you go.

## Ingredients
Ingredients: Aqua (Water), Sodium Chloride, Alcohol, PVP PEG-40 Hydrogenated Castor Oil, Magnesium Sulfate, Glycerin, Phenoxyethanol, Panthenol, Ethylhexyl Methoxycinnamate, Ethylhexyl Salicylate, Chenopodium Quinoa Seed Extract, Parfum (Fragrance), Linalool, Linalyl Acetate, Acetyl Cedrene, Tetramethyl Acetyloctahydronaphthalenes, Citrus Limon Peel Oil, Limonene, Pinene, Beta-Caryophyllene.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('EAU de Capri Salt & Grip Volumizing Spray 200ml');
UPDATE "Product" SET "description" = 'Say goodbye to dry, damaged hair with the Hydrate & Shield Leave-in Conditioner. Enriched with rice and wheat proteins, it strengthens your strands, while sunflower seed oil works its antioxidant magic. This lightweight formula keeps your hair silky soft, shiny and protected against heat and split ends.

## Details
Give your hair a moisturising treatment with the Hydrate & Shield Leave-in Conditioner – the secret weapon against dryness and damage. Formulated with rice and wheat proteins, it works from the inside out to repair, strengthen and boost elasticity. Together, the key ingredients make your hair stronger, more resilient, and less likely to break over time.

The sunflower seed oil is here to hydrate and lock in moisture, leaving your hair soft, sleek, and totally frizz-free. And let’s not forget it is the source of vitamin E – an antioxidant powerhouse protecting your hair from UV rays and pollution, while keeping it looking fresh and radiant till the next wash.

Ideal for all hair types, the Hydrate & Shield Leave-in Conditioner is perfect for daily use. Whether you’re combating frizz, repairing damage or just looking to keep your hair looking its best, this silken elixir has everything your locks need.

## Perfect for
The Hydrate & Shield Leave-in Conditioner is perfect for dry, frizzy, or damaged hair. It will hydrate, detangle and strengthen your strands, while adding shine and battling frizz. It’s the perfect everyday solution for soft, smooth, and protected hair.

## How to use
• After cleansing your hair with shampoo, towel-dry your hair to remove excess water.
• Work a generous amount into your hands and apply from mid-lengths to ends.
• Let it sit for 3–5 minutes while it works its magic. No need to rinse!

## Ingredients
Aqua, Alcohol Denat., Propylene Glycol, Dicaprylyl Ether, Cetearyl Alcohol, Behenamidopropyl Dimethylamine, Behentrimonium Chloride, Glycerin, Benzyl Alcohol, Lactic Acid, Parfum, Isopropyl Alcohol, Disodium EDTA, Hydroxypropyl Guar, Hydrolyzed Rice Protein, Benzoic Acid, Triticum Vulgare Protein, Tocopherol, Linalool, PEG-90M, Polyquaternium-10, Linalyl Acetate, Acetyl Cedrene, Tetramethyl Acetyloctahydronaphthalenes, Carbocysteine, Sorbic Acid, Serine, Helianthus Annuus Seed Oil, Phenoxyethanol, Citrus Limon Peel Oil, Limonene, Pinene, Beta-Caryophyllene, 1,2-Hexanediol, Caprylyl Glycol, Glutamic Acid.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('EAU de Capri Hydrate & Shield Leave-in Conditioner 125ml');
UPDATE "Product" SET "description" = 'Light as air, rich in care. The Define & Radiate Invisible Oil Extract is crafted to brings curls to life without weighing them down. It melts into textured and curly hair, smoothing frizz, enhancing natural curl shape, and leaving hair soft and silky. 100% vegan, natural ingredients and curly-girl approved.

## Details
The Define & Radiate Invisible Oil Extraxt is the new secret weapon for soft, frizz-free hair with a natural, bouncy feel. With 99% natural ingredients, it nourishes and protects while it brings out the best in your natural curl pattern.

Phytokeratin works from within to strengthen and restory elasticity, while a blend of oils like avocado, almond and cocoa, smoothen, soften and add a healthy shine. Together with aloe vera it hydrates, leaving every curl flexible and full of life.

Lightweight and non-greasy, this invisible oil melts into wet or dry hair, taming frizz and boosting curl definition. Finish your routine with the fres, breezy scent of EAU de Santorini bringing a touch of Mediterranean magic to your go-to curl routine.

## Perfect for
All textured and curly hair types, from soft waves to tight coils. Smooth, touchable curls, frizz controled and a subtle Mediterannean scent; everything a curly girl dreams of.

## How to use
• Apply a small amount to the palms of your hands and warm gently between your fingers.
• Distribute evenly through the mid-lengths and ends on wet or dry hair.
• No rinsing needd, let it absorb naturally.
• Enjoy soft, frizz free and bouncy curls.

## Ingredients
Prunus Amygdalus Dulcis Oil, Helianthus Annuus Seed Oil, Glycine Soja Oil, Argania Spinosa Kernel Oil, Parfum, Tocopherol, Linalool, Linalyl Acetate, Acetyl Cedrene, Tetramethyl Acetyloctahydronaphthalenes, Beta-sitosterol, Squalene, Gossypium Herbaceum Seed Oil, Mangifera Indica Seed Butter, Olea Europaea Fruit Oil, Persea Gratissima Oil, Citrus Limon Peel Oil, Limonene, Pinene, Beta-caryophyllene.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('Define & Radiate Invisible Oil Extract');
UPDATE "Product" SET "description" = 'Soft, bouncy and beautifully defines. This curl gel works with your natural texture to hydrate, strengthen and enhance every curl. No stiffness, no sticky residue, the perfect gel to finish every curly-girl routine.

## Details
Say hello to your new curl BFF! The Define & Bounce Texture and Curl Gel is a lightweight curl activator designed to enhance your hair’s natural bounce and curl pattern.

Phytokeratin strengthens from the inside out and is made from corn, wheat and soy amino acids, repairing and protecting curls. It improves texture and curl retention, giving your hair a natural bounce and definition

Aloe Vera provides deep moisture and smoothness so curls feel soft, manageable and healthy. Paired with a rich elixir of natural oils and butters, including cocoa, almond, avocado and olive, it wraps curls in softness while smoothing texture and taming flyway’s.

With 98% natural origin ingredients and formulated without sulfates or silicones, this gel feels clean, light and flexible. Scented with EAU de Santorini, it brings Mediterranean touch to your curl routine.

## Perfect for
Textured, curly or wavy hair in need of hydration, definition and frizz control. Perfect for anyone wanting soft, bouncy curls full of movement and shine.

## How to use
• Apply a small amount to mid-lengths and ends on damp hair.
• Distribute evenly using your fingers or a wide-tooth comb.
• Scrunch or twist curls to define shape.
• Let air dry or diffuse. No rinsing needed. Absorbs without residue, leaving curls soft, defined and full of movement.

## Ingredients
Aqua, Glycerin, Aloe Barbadensis Leaf Juice Powder, Hydrolyzed Corn Starch, Diutan Gum, Polyglyceryl-4 Caprate, Benzyl Alcohol, Parfum, Cannabis Sativa Seed Oil, Cocos Nucifera Oil, Argania Spinosa Kernel Oil, Glycine Soja Oil, Benzoic Acid, Hydroxypropyltrimonium Corn/Wheat/Soy Amino Acids, Linalool, Linalyl Acetate, Acetyl Cedrene, Tetramethyl Acetyloctahydronaphthalenes, Sorbic Acid, Hydroxypropyltrimonium Inulin, Sodium Hydroxide, Citrus Limon Peel Oil, Limonene, Pinene, Leuconostoc/Radish Root Ferment Filtrate, Tocopherol, Helianthus Annuus Seed Oil, Beta-caryophyllene, Gossypium Herbaceum Seed Oil, Mangifera Indica Seed Butter, Olea Europaea Fruit Oil, Persea Gratissima Oil, Prunus Amygdalus Dulcis Oil' WHERE "brand" = 'eau-de-1974' AND "name" IN ('Define & Activate Texture and Curl Gel');
UPDATE "Product" SET "description" = 'Humidity in the air? We prefer gloss in the hair.

Define & Smooth Spray is not just anti-frizz. it is daily care, hydration and breathable smoothing in one featherlight mist. It instantly refines texture, enhances shine and protects against humidity without stiffness, buildup or heat activation.

Smooth hair, the EAUde1974 way. Flexible. Hydrated. Naturally glossy.

## Details
Humidity doesn’t get to decide how your hair looks.

Define & Smooth Spray EAU de Santorini is your daily shortcut to polished, touchable hair that feels as good as it looks. This featherlight mist instantly refines texture, enhances natural shine and keeps frizz beautifully controlled without stiffness, buildup or heat styling.

But this is more than smoothing.

While it perfects the surface, it also cares beneath it. The formula helps reinforce and hydrate the hair fiber, keeping strands supple, flexible and visibly healthier over time. Instead of sealing hair in like a heavy coating, it creates a breathable veil that protects against humidity while allowing movement and softness.

The result?
Glossy lengths. Controlled texture. Effortless definition.

Hair that feels light, looks refined and stays beautifully smooth from morning coffee to sunset cocktails.

Infused with the elegant aura of EAU de Santorini, it turns your daily routine into a sensorial moment inspired by Mediterranean glamour.

Smooth. Hydrate. Strengthen.
No heat. No crunch. Just confidence.

## Perfect for
All hair types, especially dry or easily frizzy hair and hair that reacts to humidity. Ideal for those looking for a lightweight smoothing mist that combines styling performance with daily care benefits without feeling heavy.

## How to use
• Shake well before use.
• Spray evenly onto damp or dry hair, focusing on lengths and ends.
• Leave in and style as desired.
• Use daily or whenever hair needs hydration, refinement or frizz control.

## Ingredients
Aqua, PEG-40 Hydrogenated Castor Oil, Polysorbate 20, Parfum, Phenoxyethanol, Panthenol, Hydroxypropylgluconamide, Hydroxypropylammonium Gluconate, Dipropylene Glycol, Silicone Quaternium-18, Trideceth-6, Pentylene Glycol, Caprylic/Capric Triglyceride, Polysilicone-29, Glycerin, Trideceth-12, Sodium PCA, Sodium Lactate, Arginine, Aspartic Acid, PCA, Calendula Officinalis Flower Extract, Chamomilla Recutita Flower Extract, Citric Acid, Glycine, Alanine, Tartaric Acid, Serine, Benzyl Alcohol, Valine, Threonine, Isoleucine, Proline, Isochrysis Galbana Extract, Sodium Benzoate, Potassium Sorbate, Phenylalanine, Histidine, Bisabolol, Sorbic Acid.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('Define & Smooth Spray – EAU de Santorini 200ml');
UPDATE "Product" SET "description" = 'Discover the enchanting vibes of Santorini with our EAU de Santorini Hair Perfume Gift Set—ideal for treating a friend or indulging yourself! This set includes a full-size bottle and a 15ml travel companion, both inspired by Santorini’s stunning whitewashed cliffs and blue-domed churches. With its warm, spicy, and powdery notes, this fragrance captures the essence of island romance and will whisk you away to leisurely strolls under the Mediterranean sun.

## Details
Opening with a flirt of lemon and juniper berries, and a pinch of black pepper, this scent is like golden hour in a bottle. It is bright, bold and just spicy enough to intrigue your next summer fling. The heart blooms. Imagine orris butter with the sun-warmed florals, together giving soft glam energy. And the finish? The notes of vetiver, cashmere, vanilla and white musk, enwrapping you in an EAU-so gentle sea breeze and awakening your senses with its sensual warmth.

## Perfect for
Enjoyers of late Mediterranean brunches are turning into magical boat parties. Those sending the texts saying: “come outside, we’re going to Los!”. EAU de Santorini is capturing that radiant, rooftop, sun-glow energy. One spritz, and you are the life of the party. The fragrance makes you cherish every moment.

## Ingredients
Alcohol Denat., Parfum, Aqua, Benzoic Acid, Limonene, Linalool, Hydrolyzed Silk, Isoeugenol, Geraniol, Citral, CI 17200, Argania Spinosa Kernel Oil, CI 14700, Ethylhexyl Methoxycinnamate.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('EAU de Santorini Hair Perfume Giftset');
UPDATE "Product" SET "description" = 'A touch of Capri for your daily ritual. This set pairs healthy-looking hair with soft, nourished hands, all carried by the bright and uplifting notes of EAU de Capri.

## Details
Inspired by the Capri – Italian attitude and the stunning coast, our EAU de Capri Hair Perfume (50ml) captures the essence of a sun-drenched paradise. The journey begins with the crisp green apple, zesty lemon and a hint of black pepper. As the golden hour approaches, so does the heart of the scent: passion fruit, blackcurrant, soft and delicate Mediterranean floral. Finally, on the horizon, the base notes settle in with white musk, gourmand touches and smoky nuances, wrapping you in a sensual finish and the feeling of a slow sunset on your skin.

Complementing the fragrance is the Hydrate & Protect Hand Cream (50ml). Packed with Argan Oil, Shea Butter, Phytokeratin and Allantoin, it’s all about hydration and keeping your hands soft and smooth. The derm-approved formula absorbs quickly without any stickiness. Suitable for all skin types, it’s your go-to for nourished skin with a subtle EAU de Capri vibe.

## Perfect for
Sun-chasers and daydreamers who want hair that carries the brightness of Capri and hands that stay smooth through every salty swim, golden hour and midnight dance.

## How to use
Hair Perfume: Hold it 20-30 cm away, spritz on dry hair, and focus on the lengths. For extra vibes, spray on your brush before styling. Avoid the roots—keep it fresh, not greasy.

Hand Cream: Work a small amount into your hands, focusing on dry areas. Reapply as often as needed to keep them soft and smooth.

## Ingredients
EAU de Capri Hair Perfume 50ml: Alcohol Denat., Parfum, Aqua, Benzoic Acid, Limonene, Linalool, Hydrolyzed Silk, Isoeugenol, Geraniol, Citral, CI 17200, Argania Spinosa Kernel Oil, CI 14700, Ethylhexyl Methoxycinnnamate. Hydrate & Protect Hand Cream 50ml – EAU de Capri): Aqua, Glycerin, Paraffinum Liquidum, Cetearyl Alcohol, Dimethicone, Glyceryl Stearate, PEG-100 Stearate, Synthetic Beeswax, Phenoxyethanol, Parfum, PEG-30 Dipolyhydroxystearate, Allantoin, BHT, Butyrospermum Parkii Butter, Chlorphenesin, Stearyl Dihydroxypropyldimonium Oligosaccharides, Linalool, Linalyl Acetate, Tocopheryl Acetate, Argania Spinosa Kernel Oil, Acetyl Cedrene, Tetramethyl Acetyloctahydronaphthalenes, Propylene Glycol, Hydroxypropyltrimonium Corn/Wheat/Soy Amino Acids, Sodium Hydroxide, Citrus Limon Peel Oil, Limonene, Pinene, Beta-Caryophyllene, Leuconostoc/Radish Root Ferment Filtrate, Tocopherol, Helianthus Annuus Seed Oil.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('EAU de Capri Scent & Smooth Giftset');
UPDATE "Product" SET "description" = 'Give your hair the ultimate hydration it deserves with the Hydrate & Renew Giftset, featuring our Hyaluronic Plump Hydrating Shampoo, the Hydrate & Shield Leave-in Conditioner, and a complimentary Hyaluronic Renew Hydrating Mask. This trio, powered by hyaluronic acid, plant-based keratin, rice, wheat proteins, sunflower seed oil, and aloe vera, restores softness and shine while shielding against heat, split ends, and everyday damage. The hair feels weightless and renewed, perfect for all hair types that crave extra moisture and care.

## Details
Give your hair the ultimate hydration boost with the Hydrate & Renew Giftset, featuring three essentials that cleanse, protect, and renew your strands. Inside this set, you will find the Hyaluronic Plump Hydrating Shampoo, the Hydrate & Shield Leave-in Conditioner, and a complimentary Hyaluronic Renew Hydrating Mask, serving as a complete ritual for soft, shiny, and healthy-looking hair.

The Hyaluronic Plump Hydrating Shampoo is more than a cleanser, since it is enriched with hyaluronic acid, panthenol, and vegetable keratin, restoring the moisture, smoothing the strands, and leaving the hair weightlessly bouncy with luminous shine.

The Hydrate & Shield Leave-in Conditioner strengthens the hair with rice and wheat proteins, while sunflower seed oil provides lasting hydration and antioxidant protection against frizz, UV rays, and pollution.

On top of this, the Hyaluronic Renew Hydrating Mask delivers an intensive moisture boost with hyaluronic acid, panthenol, and aloe vera, soothing the scalp and repairing dry or damaged strands for a salon-like result.

Infused with the uplifting EAU de Capri fragrance, a blend of green apple, kiwi, and delicate florals, this Hydrate & Renew Giftset leaves your hair not only nourished and resilient, but also beautifully scented and refreshed.

## Perfect for
Imagine your hair being transformed – hydrated, smooth, and full of life. Whether your strands are dry, damaged, or frizz-prone, this trio works together to restore moisture, strengthen from within, and protect against heat. Suitable for all hair types, it is the ultimate daily indulgence for hair that looks radiant and carries the uplifting essence of EAU de Capri.

## How to use
• Begin your ritual with The Hyaluronic Plump Hydrating Shampoo by massaging it into your scalp and hair, and then rinse for soft hydrated strands.
• Next, treat your hair with Hyaluronic Renew Hydrating Mask by applying the product from roots to ends, and leave for 5 to 10 minutes to achieve deep moisture and shine.
• To finish your haircare ritual, work in the Hydrate & Shield Leave-in Conditioner to your towel-dried hair, no rinse needed. Your hair will be frizz-free, smooth, and look effortless.

## Ingredients
Hyaluronic Plump Hydrating Shampoo: Water, Sodium C14-16 Olefin Sulfonate, Cocamidopropyl Betaine, Sodium Chloride, Sodium Lauroyl Methyl Isethionate, Benzyl Alcohol, Fragrance, Stearyl Dihydroxypropyldimonium Oligosaccharides, Polyquaternium-7, Hydroxypropyl Guar Hydroxypropyltrimonium Chloride, Sodium Benzoate, Propylene Glycol, Tocopheryl Acetate, Benzoic Acid, Citric Acid, Linalool, Linalyl Acetate, Panthenol, Acetyl Cedrene, Tetramethyl Acetyloctahydronaphthalenes, Sorbic Acid, Trisodium Ethylenediamine Disuccinate, Hydroxypropyltrimonium Corn/Wheat/Soy Amino Acids, Sodium Hyaluronate, Phenoxyethanol, Leuconostoc/Radish Root Ferment Filtrate. Hyaluronic Renew Hydrating Mask: Aqua, Cetearyl Alcohol, Behentrimonium Chloride, Isopentyldiol, Sorbitol, Cetyl Palmitate, Glycerin, Isopropyl Alcohol, Benzyl Alcohol, Parfum, Aloe Barbadensis Leaf Juice Powder, Benzoic Acid, Linalool, Linalyl Acetate, Panthenol, Acetyl Cedrene, Tetramethyl Acetyloctahydronaphthalenes, Sorbic Acid, Sodium Hydroxide, Sodium Hyaluronate, Phenoxyethanol. Hydrate & Shield Leave-in Conditioner:Aqua, Alcohol Denat., Propylene Glycol, Dicaprylyl Ether, Cetearyl Alcohol, Behenamidopropyl Dimethylamine, Behentrimonium Chloride, Glycerin, Benzyl Alcohol, Lactic Acid, Parfum, Isopropyl Alcohol, Disodium EDTA, Hydroxypropyl Guar, Hydrolyzed Rice Protein, Benzoic Acid, Triticum Vulgare Protein, Tocopherol, Linalool, PEG-90M, Polyquaternium-10, Linalyl Acetate, Acetyl Cedrene, Tetramethyl Acetyloctahydronaphthalenes, Carbocysteine, Sorbic Acid, Serine, Helianthus Annuus Seed Oil, Phenoxyethanol, Citrus Limon Peel Oil, Limonene, Pinene, Beta-Caryophyllene, 1,2-Hexanediol, Caprylyl Glycol, Glutamic Acid.' WHERE "brand" = 'eau-de-1974' AND "name" IN ('EAU de Capri Hydrate & Renew Giftset');
