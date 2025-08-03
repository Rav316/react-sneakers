ALTER TABLE order_item
ADD CONSTRAINT fk_order_item_orders FOREIGN KEY(order_id)
REFERENCES orders;