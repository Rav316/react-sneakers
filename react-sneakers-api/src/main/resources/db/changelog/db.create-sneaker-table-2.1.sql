ALTER TABLE sneaker
ALTER COLUMN price TYPE numeric(10,2)
USING ROUND(price, 2);
