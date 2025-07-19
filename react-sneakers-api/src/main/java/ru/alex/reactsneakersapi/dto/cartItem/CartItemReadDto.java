package ru.alex.reactsneakersapi.dto.cartItem;

import java.math.BigDecimal;

public record CartItemReadDto(
        Integer id,
        String name,
        String imageUrl,
        BigDecimal price,
        Integer size,
        Integer quantity
) {
}
