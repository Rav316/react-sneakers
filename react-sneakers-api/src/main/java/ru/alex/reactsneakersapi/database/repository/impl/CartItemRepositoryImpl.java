package ru.alex.reactsneakersapi.database.repository.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;
import ru.alex.reactsneakersapi.database.repository.CartItemRepositoryCustom;
import ru.alex.reactsneakersapi.dto.cartItem.CartItemCreateDto;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CartItemRepositoryImpl implements CartItemRepositoryCustom {
    private final NamedParameterJdbcTemplate jdbcTemplate;
    @Override
    public void addToCartBatch(List<CartItemCreateDto> cartItems, Integer userId) {
        String sql = """
                INSERT INTO cart_item(sneaker_item_id, user_id, quantity)
                VALUES (:sneakerItemId, :userId, :quantity)
                ON CONFLICT DO NOTHING
                """;
        MapSqlParameterSource[] batchParams = cartItems.stream()
                .map(item -> new MapSqlParameterSource()
                        .addValue("sneakerItemId", item.sneakerItem())
                        .addValue("quantity", item.quantity())
                        .addValue("userId", userId))
                .toArray(MapSqlParameterSource[]::new);
        jdbcTemplate.batchUpdate(sql, batchParams);
    }
}
