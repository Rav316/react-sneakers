ALTER TABLE sneaker
ADD COLUMN sneaker_type_id int REFERENCES sneaker_type(id) ;