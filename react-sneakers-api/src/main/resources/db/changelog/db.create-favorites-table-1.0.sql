CREATE TABLE favorites
(
    sneaker_id int REFERENCES sneaker(id),
    user_id int REFERENCES users(id),
    PRIMARY KEY (sneaker_id, user_id)
)