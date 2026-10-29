-- Prices move from EUR to Albanian Lek (ALL) at a flat 1 EUR = 100 ALL
-- (25 EUR -> 2.500 ALL), rounded to whole lek. Shipping fees were already
-- in ALL and stay as they are.
UPDATE "Product" SET "price" = ROUND("price" * 100);

-- Percent coupons are unit-free; only fixed-amount ones convert.
UPDATE "Coupon" SET "value" = ROUND("value" * 100) WHERE "type" = 'fixed';

-- Past orders convert too, so admin totals/revenue stay in one currency.
-- Order.total now includes the shipping fee (both ALL); older orders kept
-- shipping out of the EUR total, so it's added here.
UPDATE "OrderItem" SET "price" = ROUND("price" * 100);
UPDATE "Order" SET
  "subtotal" = ROUND("subtotal" * 100),
  "discount" = ROUND("discount" * 100),
  "total" = ROUND("total" * 100) + "shippingFee";
