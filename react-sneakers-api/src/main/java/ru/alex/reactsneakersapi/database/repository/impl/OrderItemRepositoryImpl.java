package ru.alex.reactsneakersapi.database.repository.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import ru.alex.reactsneakersapi.database.repository.OrderItemRepositoryCustom;
import ru.alex.reactsneakersapi.dto.orderItem.OrderItemCreateDto;

import java.util.List;

@Component
@RequiredArgsConstructor
public class OrderItemRepositoryImpl implements OrderItemRepositoryCustom {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Override
    public void createOrderItemsBatch(Integer orderId, List<OrderItemCreateDto> orderItems) {
        String sql = """
                INSERT INTO order_item(order_id, sneaker_item_id, quantity)
                VALUES
                (:orderId, :sneakerItemId, :quantity)
                """;

        MapSqlParameterSource[] batchParams = orderItems.stream()
                .map(item -> new MapSqlParameterSource()
                        .addValue("orderId", orderId)
                        .addValue("sneakerItemId", item.sneakerItem())
                        .addValue("quantity", item.quantity()))
                .toArray(MapSqlParameterSource[]::new);
        jdbcTemplate.batchUpdate(sql, batchParams);

    }

}
