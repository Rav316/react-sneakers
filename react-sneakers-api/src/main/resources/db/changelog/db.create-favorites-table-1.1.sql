DROP TABLE favorites;

CREATE TABLE favorites
(
    sneaker_id int REFERENCES sneaker(id) ON DELETE CASCADE ,
    user_id int REFERENCES users(id) ON DELETE CASCADE ,
    PRIMARY KEY (sneaker_id, user_id)
)